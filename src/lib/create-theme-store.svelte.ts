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
      script.innerHTML = `
      (function(k, a) {
        let h = document.documentElement;
        let q = window.matchMedia('(prefers-color-scheme: dark)')
        let s = localStorage.getItem(k)?.toLowerCase().trim();
        let l = ['light', 'dark'];
        let v = l.includes(v) ? v : 'system';
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
      `;

      document.head.prepend(script);
    });

    $effect.pre(function assignCorrectTheme() {
      theme = parseTheme(localStorage.getItem(storageKey));
    });

    $effect(function handleThemeChanges() {
      const html = document.documentElement;
      const head = document.head;

      const style = document.createElement('style');
      style.innerHTML = noTransitionStyle;
      head.appendChild(style);

      const originalTheme = theme;
      const resolvedTheme =
        originalTheme === 'system'
          ? matchMedia('(prefers-color-scheme: dark)').matches
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

const noTransitionStyle =
  '*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;transition:none!important;}';
