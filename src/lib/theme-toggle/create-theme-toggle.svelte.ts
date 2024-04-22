export interface ThemeInput {
  label?: string;
  value: string;
  colorScheme: string;
}

export interface CreateThemeToggleProps {
  themes?: (ThemeInput | string)[];
  defaultTheme?: string;
  attribute?: 'class' | `data-${string}`;
  storageKey?: string;
  nonce?: string;
}

export type CreateThemeToggleReturn = ReturnType<typeof createThemeToggle>;

const defaultNonce = null;
const defaultAttribute = 'class';
const defaultStorageKey = 'theme';
const defaultThemes = [
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

export function createThemeToggle(props: CreateThemeToggleProps) {
  const config = $derived.by(() => {
    const themes = normalizeThemes(props.themes);
    const defaultTheme = props.defaultTheme ?? themes[0];
    const attribute = props.attribute ?? defaultAttribute;
    const storageKey = props.storageKey ?? defaultStorageKey;
    const nonce = props.nonce ?? defaultNonce;

    return {
      themes,
      defaultTheme,
      attribute,
      storageKey,
      nonce,
    };
  });

  let theme = $state(config.defaultTheme);

  function setTheme(value: string) {
    theme = value;
  }

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

function normalizeThemes(themes: (ThemeInput | string)[] = []) {
  if (themes.length <= 0) return defaultThemes;

  return themes.map((theme) => {
    if (typeof theme === 'string') {
      return {
        label: theme,
        value: theme,
        colorScheme: theme,
      };
    }

    return {
      label: theme.label ?? theme.value,
      value: theme.value,
      colorScheme: theme.colorScheme,
    };
  });
}
