import type {HTMLButtonAttributes} from 'svelte/elements';
import {parseTheme} from './parseTheme.js';
import type {Theme} from './types.js';

export interface CreateThemeOptions {
  /**
   * @description The fallback theme to use when no theme is set in localStorage.
   * @default 'system'
   */
  fallback?: Theme;
  /**
   * @description The attribute used to set the theme on the `<html>` element.
   * @default 'class'
   */
  attribute?: 'class' | `data-${string}`;
  /**
   * @description The key used to store the theme in localStorage.
   * @default 'theme'
   */
  storageKey?: string;
  /**
   * @description Whether to listen for changes in the OS theme.
   * @default false
   */
  system?: boolean;
  /**
   * @description Whether to set the `color-scheme` CSS property on the `<html>` element.
   * @default true
   */
  colorScheme?: boolean;
  styleNonce?: string;
  scriptNonce?: string;
}

export type ThemeTriggerProps =
  | {value: Theme}
  | {
      value: 'auto';
      /**
       * @default
       * ['light', 'dark', 'system']
       */
      sequence?: Theme[];
    };

export interface CreateThemeReturn {
  get current(): Theme;
  set current(value: Theme | null | undefined);
  getTriggerProps(props: ThemeTriggerProps): HTMLButtonAttributes;
}

const defaultOptions = {
  fallback: 'system',
  attribute: 'class',
  storageKey: 'theme',
  system: false,
  colorScheme: true,
} satisfies CreateThemeOptions;

export function createTheme(options: CreateThemeOptions): CreateThemeReturn {
  const config = $derived({
    ...defaultOptions,
    ...options,
  });

  let theme = $state(config.fallback);

  function getTriggerProps(props: ThemeTriggerProps): HTMLButtonAttributes {
    if (props.value !== 'auto') {
      return {
        type: 'button',
        onclick() {
          theme = props.value;
        },
        'aria-label': 'Enable %s mode'.replace('%s', props.value),
        'data-state': theme === props.value ? 'on' : 'off',
        'data-value': props.value,
      };
    }

    const defaultSequence: Theme[] = [
      /**/
      'light',
      'dark',
      'system',
    ];

    const sequence = props.sequence?.length ? props.sequence : defaultSequence;
    const currIndex = sequence.indexOf(theme);
    const nextIndex = currIndex + 1 < sequence.length ? currIndex + 1 : 0;
    const nextTheme = sequence[nextIndex];

    return {
      type: 'button',
      onclick() {
        theme = nextTheme;
      },
      'aria-label': 'Enable %s mode'.replace('%s', nextTheme),
      'data-value': props.value,
    };
  }

  $effect(() => {
    theme = parseTheme(window.localStorage.getItem(config.storageKey), config.fallback);
  });

  $effect(() => {
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

  $effect(() => {
    if (!config.system) return function noop() {};

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      theme = e.matches ? 'dark' : 'light';
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  });

  $effect(() => {
    const handleChange = (e: StorageEvent) => {
      if (e.key === config.storageKey) {
        theme = parseTheme(e.newValue, config.fallback);
      }
    };

    window.addEventListener('storage', handleChange);

    return () => {
      window.removeEventListener('storage', handleChange);
    };
  });

  return {
    get current(): Theme {
      return theme;
    },
    set current(newTheme: Theme | null | undefined) {
      if (newTheme) {
        theme = newTheme;
      } else {
        theme = config.fallback;
      }
    },
    getTriggerProps,
  };
}

createTheme.style = function (props: CreateThemeOptions) {
  const config = $derived({
    ...defaultOptions,
    ...props,
  });

  const value = $derived(`
  <style ${assignNonce(config.styleNonce)}>
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

createTheme.script = function (props: CreateThemeOptions) {
  const config = $derived({
    ...defaultOptions,
    ...props,
  });

  const value = $derived(`
  <script ${assignNonce(config.scriptNonce)}>
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
