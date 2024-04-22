interface Theme {
  label?: string;
  value: string;
  colorScheme: 'light' | 'dark' | 'system';
}

export interface CreateThemeProps {
  themes?: Theme[];
  attribute?: 'class' | `data-${string}`;
  storageKey?: string;
  systemPreference?: boolean;
  nonce?: string;
}

export type CreateThemeReturn = ReturnType<typeof createTheme>;

export function createTheme(props: CreateThemeProps) {
  const {
    /**/
    themes,
    attribute,
    storageKey,
    systemPreference,
    nonce,
  } = $derived.by(() => {
    const themes = normalizeThemes(props.themes);
    const attribute = props.attribute ?? 'class';
    const storageKey = props.storageKey ?? 'theme';
    const systemPreference = props.systemPreference ?? true;
    const nonce = props.nonce ?? '';

    return {
      themes,
      attribute,
      storageKey,
      systemPreference,
      nonce,
    };
  });

  let theme = $state<string | null>(null);

  return {
    get themes() {
      return themes;
    },
    get attribute() {
      return attribute;
    },
    get storageKey() {
      return storageKey;
    },
    get systemPreference() {
      return systemPreference;
    },
    get nonce() {
      return nonce;
    },
    get theme() {
      return theme;
    },
    set theme(value: string | null) {
      theme = value;
    },
  };
}

function normalizeThemes(themes: Theme[] = []) {
  if (themes.length <= 0) {
    const defaultThemes: Theme[] = [
      {
        label: 'System',
        value: 'system',
        colorScheme: 'system',
      },
      {
        label: 'Light',
        value: 'light',
        colorScheme: 'light',
      },
      {
        label: 'Dark',
        value: 'dark',
        colorScheme: 'dark',
      },
    ];

    return defaultThemes;
  }

  return themes.map((o) => {
    const label = o.label ?? o.value;

    return {
      ...o,
      label,
    };
  });
}
