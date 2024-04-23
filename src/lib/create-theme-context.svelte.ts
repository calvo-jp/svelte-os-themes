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
      theme = parseTheme(localStorage.getItem(storageKey), fallback);
    },
    themeChanged() {
      const html = document.documentElement;

      html.classList.add('__no_transition__');

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

      localStorage.setItem(storageKey, originalTheme);

      setTimeout(() => {
        html.classList.remove('__no_transition__');
      }, 1);
    },
    osThemeChanged() {
      if (!system) return;

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
    get theme() {
      return theme;
    },
    set theme(value: Theme) {
      theme = value;
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

const style = `
  <style>
    .__no_transition__,
    .__no_transition__ *,
    .__no_transition__ *::after,
    .__no_transition__ *::before {
      -webkit-transition: none !important;
      -moz-transition: none !important;
      -o-transition: none !important;
      transition: none !important;
    }
  </style>
`;

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
      let h = document.documentElement;
      let q = window.matchMedia('(prefers-color-scheme: dark)')
      let s = localStorage.getItem(k)?.toLowerCase().trim();

      let l = [
        'dark',
        'light',
        'system'
      ];

      let v = l.includes(s) ? s : f;
      let t = v === 'system' ? q.matches ? 'dark' : 'light' : v;

      if (a === 'class') {
        h.classList.remove(t === 'dark' ? 'light' : 'dark');
        h.classList.add(t);
      } else {
        h.setAttribute(a, t);
      }

      localStorage.setItem(k, v);

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
