import { getContext } from 'svelte';
import type { CreateThemeContextReturn } from './create-theme-context.svelte.js';
import type { Theme } from './types.js';

export function useTheme() {
  const context = getContext<CreateThemeContextReturn>('theme');

  return {
    get value() {
      return context.theme;
    },
    set value(theme: Theme) {
      if (context) {
        context.theme = theme;
      }
    },
  };
}
