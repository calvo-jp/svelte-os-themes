type Theme = 'dark' | 'light' | 'system';

interface CreateThemeStoreConfig {
  attribute?: 'class' | `data-${string}`;
  storageKey?: string;
  colorScheme?: boolean;
  systemPreference?: boolean;
  nonce?: string;
}

export function createThemeStore(config?: Partial<CreateThemeStoreConfig>) {
  const {
    /**/
    attribute,
    storageKey,
    systemPreference,
    nonce,
  } = $derived.by(() => {
    const attribute = config?.attribute ?? 'class';
    const storageKey = config?.storageKey ?? 'theme';
    const colorScheme = config?.colorScheme ?? true;
    const systemPreference = config?.systemPreference ?? true;
    const nonce = config?.nonce ?? '';

    return {
      attribute,
      storageKey,
      colorScheme,
      systemPreference,
      nonce,
    };
  });

  let theme = $state<Theme>('system');

  function init() {
    $effect.pre(function assignThemeScript() {
      const script = document.createElement('script');

      script.nonce = nonce;
      script.async = true;
      script.innerHTML = ``;

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    });

    $effect.pre(function assignCorrectTheme() {
      const storageTheme = parseTheme(localStorage.getItem(storageKey));

      if (storageTheme) {
        theme = storageTheme;
      }
    });

    $effect(function handleThemeChanges() {
      const root = document.documentElement;

      if (theme === 'system') {
        //
      } else {
        if (attribute === 'class') {
          root.classList.remove();
          root.classList.add(theme);
        } else {
          root.setAttribute(attribute, theme);
        }
      }

      localStorage.setItem(storageKey, theme);
      root.style.colorScheme = theme;
    });

    $effect(function handleSystemPreference() {
      if (!systemPreference) return;

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      function handler(e: MediaQueryListEvent) {
        if (e.matches) {
          theme = 'dark';
        } else {
          theme = 'light';
        }
      }

      mediaQuery.addEventListener('change', handler);

      return () => {
        mediaQuery.removeEventListener('change', handler);
      };
    });
  }

  return {
    get theme() {
      return theme;
    },
    set theme(value: Theme) {
      theme = value;
    },
    init,
  };
}

function parseTheme(value: string | null) {
  if (value?.toLocaleLowerCase() === 'dark') return 'dark';
  if (value?.toLocaleLowerCase() === 'light') return 'light';
  if (value?.toLocaleLowerCase() === 'system') return 'system';
  return null;
}
