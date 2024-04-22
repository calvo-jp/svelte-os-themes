export interface CreateThemeToggleProps {
  /**
   * @default
   * ['light', 'dark']
   */
  themes?: Record<string, string> | string[];
  /**
   * @default 'system'
   */
  defaultTheme?: string;
  /**
   * @default 'class'
   */
  attribute?: 'class' | `data-${string}`;
  /**
   * @default 'theme'
   */
  storageKey?: string;
}

export type CreateThemeToggleReturn = ReturnType<typeof createThemeToggle>;

export function createThemeToggle(props: CreateThemeToggleProps) {
  return {};
}
