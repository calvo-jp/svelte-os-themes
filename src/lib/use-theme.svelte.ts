import { getContext } from 'svelte';
import type {
  CreateThemeContextReturn,
  Theme,
} from './create-theme-context.svelte.js';

export default function useTheme() {
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
