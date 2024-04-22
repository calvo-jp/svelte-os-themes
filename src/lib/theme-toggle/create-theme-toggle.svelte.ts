interface Theme {
  label?: string;
  value: string;
  colorScheme: 'light' | 'dark' | 'system';
}

export interface CreateThemeToggleProps {
  themes?: Theme[];
  attribute?: 'class' | `data-${string}`;
  storageKey?: string;
  systemPreference?: boolean;
  nonce?: string;
}

export type CreateThemeToggleReturn = ReturnType<typeof createThemeToggle>;

export function createThemeToggle(props: CreateThemeToggleProps) {
  const config = $derived.by(() => {
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

  const theme = $state();

  function setTheme() {}

  return {
    get theme() {
      return theme;
    },
    setTheme,
    get __config() {
      return config;
    },
  };
}

function normalizeThemes(themes: Theme[] = []) {
  if (themes.length <= 0) {
    return [
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
    ] as Theme[];
  }

  return themes.map((o) => {
    const label = o.label ?? o.value;

    return {
      ...o,
      label,
    };
  });
}
