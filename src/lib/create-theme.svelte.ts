import type {HTMLButtonAttributes} from 'svelte/elements';
import {parseTheme} from './parse-theme.js';
import type {Theme} from './types.js';

export interface CreateThemeProps {
  fallback?: Theme;
  attribute?: 'class' | `data-${string}`;
  storageKey?: string;
  system?: boolean;
  colorScheme?: boolean;
  nonce?: string;
}

interface TriggerProps {
  value: Theme;
}

export interface CreateThemeReturn {
  get value(): Theme;
  set value(value: Theme | null | undefined);
  getTriggerProps(props: TriggerProps): HTMLButtonAttributes;
}

const defaultProps = {
  fallback: 'system',
  attribute: 'class',
  storageKey: 'theme',
  system: true,
  colorScheme: true,
} satisfies CreateThemeProps;

export function createTheme(props: CreateThemeProps): CreateThemeReturn {
  const config = $derived({
    ...defaultProps,
    ...props,
  });

  let theme = $state(config.fallback);

  function getTriggerProps(props: TriggerProps): HTMLButtonAttributes {
    return {
      type: 'button',
      onclick() {
        theme = props.value;
      },
      'aria-label': 'Enable %s mode'.replace('%s', props.value),
      'data-state': theme === props.value ? 'on' : 'off',
    };
  }

  $effect(function setup() {
    theme = parseTheme(window.localStorage.getItem(config.storageKey), config.fallback);
  });

  $effect(function themeChanged() {
    const html = document.documentElement;

    html.classList.add('svelte-os-themes__no-transition');

    const originalTheme = theme;
    const resolvedTheme =
      originalTheme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : originalTheme;

    if (config.attribute === 'class') {
      const removeClass = resolvedTheme === 'dark' ? 'light' : 'dark';

      html.classList.remove(removeClass);
      html.classList.add(resolvedTheme);
    } else {
      html.setAttribute(config.attribute, resolvedTheme);
    }

    if (config.colorScheme) html.style.colorScheme = resolvedTheme;

    window.localStorage.setItem(config.storageKey, originalTheme);

    setTimeout(() => {
      html.classList.remove('svelte-os-themes__no-transition');
    }, 1);
  });

  $effect(function osThemeChanged() {
    if (!config.system) return function noop() {};

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function handler(e: MediaQueryListEvent) {
      theme = e.matches ? 'dark' : 'light';
    }

    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  });

  $effect(function storageChanged() {
    function handler(e: StorageEvent) {
      if (e.key === config.storageKey) {
        theme = parseTheme(e.newValue, config.fallback);
      }
    }

    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('storage', handler);
    };
  });

  return {
    get value(): Theme {
      return theme;
    },
    set value(newTheme: Theme | null | undefined) {
      if (newTheme) {
        theme = newTheme;
      } else {
        theme = config.fallback;
      }
    },
    getTriggerProps,
  };
}

createTheme.style = function (props: CreateThemeProps) {
  const config = $derived({
    ...defaultProps,
    ...props,
  });

  const value = $derived(`
  <style ${assignNonce(config.nonce)}>
    .svelte-os-themes__no-transition,
    .svelte-os-themes__no-transition *,
    .svelte-os-themes__no-transition *::after,
    .svelte-os-themes__no-transition *::before {
      -webkit-transition: none !important;
      -moz-transition: none !important;
      -o-transition: none !important;
      transition: none !important;
    }
  </style>
  `);

  return {
    get value() {
      return value;
    },
  };
};

createTheme.script = function (props: CreateThemeProps) {
  const config = $derived({
    ...defaultProps,
    ...props,
  });

  const value = $derived(`
  <script ${assignNonce(config.nonce)}>
    (function(k, a, f, c) {
      const h = document.documentElement;
      const q = window.matchMedia('(prefers-color-scheme: dark)')
      const s = window.localStorage.getItem(k)?.toLowerCase().trim();

      const l = [
        'dark',
        'light',
        'system'
      ];

      const v = l.includes(s) ? s : f;
      const t = v === 'system' ? q.matches ? 'dark' : 'light' : v;

      if (a === 'class') {
        h.classList.remove(t === 'dark' ? 'light' : 'dark');
        h.classList.add(t);
      } else {
        h.setAttribute(a, t);
      }

      window.localStorage.setItem(k, v);

      if (c) h.style.colorScheme = t;
    })(
      '${config.storageKey}',
      '${config.attribute}',
      '${config.fallback}',
      ${config.colorScheme},
    );
  </script>
  `);

  return {
    get value() {
      return value;
    },
  };
};

function assignNonce(nonce?: string) {
  return nonce ? `nonce="${nonce}"` : '';
}