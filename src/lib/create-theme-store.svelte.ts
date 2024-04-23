interface CreateThemeStoreConfig {
  attribute?: 'class' | `data-${string}`;
  storageKey?: string;
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
    const systemPreference = config?.systemPreference ?? true;
    const nonce = config?.nonce ?? '';

    return {
      attribute,
      storageKey,
      systemPreference,
      nonce,
    };
  });

  let theme = $state<'dark' | 'light' | 'system'>('system');

  function init() {
    $effect.pre(function assignThemeScript() {
      const script = document.createElement('script');

      script.async = true;
      script.nonce = nonce;

      /* use this vscode extension for highlighting: Tobermory.es6-string-html */
      script.innerHTML = /* javascript */ `
        (function(){
          
        })();
      `;

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    });

    $effect.pre(function assignCorrectTheme() {
      theme = parseTheme(localStorage.getItem(storageKey));
    });

    $effect(function handleThemeChanges() {
      const reEnableTransitionStyles = disableTransitionStyles();

      const originalTheme = theme;
      const resolvedTheme =
        originalTheme === 'system'
          ? matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : originalTheme;

      if (attribute === 'class') {
        const removeClass = resolvedTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.classList.remove(removeClass);
        document.documentElement.classList.add(resolvedTheme);
      } else {
        document.documentElement.setAttribute(attribute, resolvedTheme);
      }

      localStorage.setItem(storageKey, originalTheme);
      document.documentElement.style.colorScheme = resolvedTheme;
      reEnableTransitionStyles();
    });

    $effect(function handleSystemPreference() {
      if (!systemPreference) return;

      const mediaQuery = matchMedia('(prefers-color-scheme: dark)');

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
    set theme(value: 'dark' | 'light' | 'system') {
      theme = value;
    },
    init,
  };
}

function parseTheme(value: string | null) {
  if (value?.toLocaleLowerCase().trim() === 'dark') return 'dark';
  if (value?.toLocaleLowerCase().trim() === 'light') return 'light';
  return 'system';
}

function disableTransitionStyles() {
  const style = document.createElement('style');

  style.innerHTML = /* css */ `
    * {
      -webkit-transition: none !important;
      -moz-transition: none !important;
      -o-transition: none !important;
      transition: none !important;
    }
  `;

  document.head.appendChild(style);

  return function reEnableTransitionStyles() {
    document.head.removeChild(style);
  };
}
