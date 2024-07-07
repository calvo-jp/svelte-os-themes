import { parseTheme } from './parse-theme.js';
import type { Theme } from './types.js';

export interface CreateThemeContextConfig {
  /**
   * @default 'system'
   */
  fallback?: Theme;
  /**
   * @default 'class'
   */
  attribute?: 'class' | `data-${string}`;
  /**
   * @default 'theme'
   */
  storageKey?: string;
  /**
   * @default true
   */
  system?: boolean;
  /**
   * @default true
   */
  colorScheme?: boolean;
  nonce?: string;
}

export type CreateThemeContextReturn = ReturnType<typeof createThemeContext>;

export function createThemeContext(config?: CreateThemeContextConfig) {
  const {
    /**/
    fallback,
    attribute,
    storageKey,
    colorScheme,
    system,
    nonce,
  } = $derived.by(() => {
    const fallback = config?.fallback ?? 'system';
    const attribute = config?.attribute ?? 'class';
    const storageKey = config?.storageKey ?? 'theme';
    const colorScheme = config?.colorScheme ?? true;
    const system = config?.system ?? true;
    const nonce = config?.nonce;

    return {
      fallback,
      attribute,
      storageKey,
      colorScheme,
      system,
      nonce,
    };
  });

  let theme = $state<Theme>(fallback);

  const style = $derived(buildStyle({ nonce }));
  const script = $derived(
    buildScript({
      nonce,
      fallback,
      attribute,
      storageKey,
      colorScheme,
    }),
  );

  const effects = $derived({
    setup() {
      theme = parseTheme(window.localStorage.getItem(storageKey), fallback);
    },
    themeChanged() {
      const html = document.documentElement;

      html.classList.add('svelte-os-themes__no-transition');

      const originalTheme = theme;
      const resolvedTheme =
        originalTheme === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : originalTheme;

      if (attribute === 'class') {
        const removeClass = resolvedTheme === 'dark' ? 'light' : 'dark';

        html.classList.remove(removeClass);
        html.classList.add(resolvedTheme);
      } else {
        html.setAttribute(attribute, resolvedTheme);
      }

      if (colorScheme) html.style.colorScheme = resolvedTheme;

      window.localStorage.setItem(storageKey, originalTheme);

      setTimeout(() => {
        html.classList.remove('svelte-os-themes__no-transition');
      }, 1);
    },
    osThemeChanged() {
      if (!system) return function noop() {};

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      function handler(e: MediaQueryListEvent) {
        theme = e.matches ? 'dark' : 'light';
      }

      mediaQuery.addEventListener('change', handler);

      return () => {
        mediaQuery.removeEventListener('change', handler);
      };
    },
    storageChanged() {
      function handler(e: StorageEvent) {
        if (e.key === storageKey) {
          theme = parseTheme(e.newValue, fallback);
        }
      }

      window.addEventListener('storage', handler);

      return () => {
        window.removeEventListener('storage', handler);
      };
    },
  });

  return {
    get theme(): Theme {
      return theme;
    },
    set theme(value: Theme | null | undefined) {
      theme = value ?? fallback;
    },
    get effects() {
      return effects;
    },
    get script() {
      return script;
    },
    get style() {
      return style;
    },
  };
}

function buildStyle({ nonce }: { nonce?: string }) {
  return `
  <style ${assignNonce(nonce)}>
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
  `;
}

function buildScript({
  nonce,
  fallback,
  attribute,
  storageKey,
  colorScheme,
}: {
  nonce?: string;
  fallback: Theme;
  attribute: string;
  storageKey: string;
  colorScheme: boolean;
}) {
  return `
  <script ${assignNonce(nonce)}>
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
      '${storageKey}',
      '${attribute}',
      '${fallback}',
      ${colorScheme},
    );
  </script>
  `;
}

function assignNonce(nonce?: string) {
  return nonce ? `nonce="${nonce}"` : '';
}
