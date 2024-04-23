export type Theme = 'dark' | 'light' | 'system';

export interface CreateThemeContextConfig {
  attribute?: 'class' | `data-${string}`;
  storageKey?: string;
  systemPreference?: boolean;
  nonce?: string;
}

export type CreateThemeContextReturn = ReturnType<typeof createThemeContext>;

export function createThemeContext(config?: CreateThemeContextConfig) {
  const {
    /**/
    attribute,
    storageKey,
    systemPreference,
    nonce,
  } = $derived.by(() => {
    const attribute = config?.attribute ?? 'class';
    const storageKey = config?.storageKey ?? 'theme';
    const systemPreference = config?.systemPreference ?? true;
    const nonce = config?.nonce ?? '';

    return {
      attribute,
      storageKey,
      systemPreference,
      nonce,
    };
  });

  let theme = $state<Theme>('system');

  const script = $derived(
    buildScript({
      nonce,
      attribute,
      storageKey,
    }),
  );

  const effects = $derived({
    setup() {
      theme = getLocalStorageTheme(storageKey);
    },
    themeChanged() {
      const html = document.documentElement;
      const head = document.head;

      const style = document.createElement('style');
      style.innerHTML = noTransitionStyle;
      head.appendChild(style);

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

      localStorage.setItem(storageKey, originalTheme);
      html.style.colorScheme = resolvedTheme;

      setTimeout(() => {
        head.removeChild(style);
      }, 1);
    },
    osThemeChanged() {
      if (!systemPreference) return;

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      function handler(e: MediaQueryListEvent) {
        theme = e.matches ? 'dark' : 'light';
      }

      mediaQuery.addEventListener('change', handler);

      return () => {
        mediaQuery.removeEventListener('change', handler);
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
  };
}

function getLocalStorageTheme(key: string): Theme {
  const value = localStorage.getItem(key);
  if (value?.toLocaleLowerCase().trim() === 'dark') return 'dark';
  if (value?.toLocaleLowerCase().trim() === 'light') return 'light';
  return 'system';
}

function buildScript({
  nonce,
  attribute,
  storageKey,
}: {
  nonce: string;
  attribute: string;
  storageKey: string;
}) {
  return `
  <script nonce="${nonce}">
    (function(k, a) {
      let h = document.documentElement;
      let q = window.matchMedia('(prefers-color-scheme: dark)')
      let s = localStorage.getItem(k)?.toLowerCase().trim();

      let l = [
        'dark',
        'light',
        'system'
      ];

      let v = l.includes(s) ? s : 'system';
      let t = v === 'system' ? q.matches ? 'dark' : 'light' : v;

      if (a === 'class') {
        h.classList.remove(t === 'dark' ? 'light' : 'dark');
        h.classList.add(t);
      } else {
        h.setAttribute(a, t);
      }

      localStorage.setItem(k, v);
      h.style.colorScheme = t;
    })(
      '${storageKey}',
      '${attribute}',
    );
  </script>
  `;
}

const noTransitionStyle =
  '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;transition:none!important;}';
