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

      theme = storageTheme;
    });

    $effect(function handleThemeChanges() {
      const originalTheme = theme;
      const resolvedTheme =
        originalTheme === 'system'
          ? matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : originalTheme;

      if (attribute === 'class') {
        document.documentElement.classList.remove();
        document.documentElement.classList.add(resolvedTheme);
      } else {
        document.documentElement.setAttribute(attribute, resolvedTheme);
      }

      localStorage.setItem(storageKey, originalTheme);
      document.documentElement.style.colorScheme = resolvedTheme;
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
