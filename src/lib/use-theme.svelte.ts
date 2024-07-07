import { getContext } from 'svelte';
import type { CreateThemeContextReturn } from './create-theme-context.svelte.js';
import { parseTheme } from './parse-theme.js';
import type { Theme } from './types.js';

/**
 * @example
 * ```svelte
 * <script>
 *  import { useTheme } from 'svelte-os-themes';
 *
 *  let theme = useTheme();
 *
 *  $inspect(theme.value);
 * </script>
 *
 * <button
 *  type="button"
 *  onclick={function () {
 *    theme.value = 'light';
 *  }}
 * >
 *  Light
 * </button>
 * <button
 *  type="button"
 *  onclick={function () {
 *    theme.value = 'dark';
 *  }}
 * >
 *  Dark
 * </button>
 * <button
 *  type="button"
 *  onclick={function () {
 *    theme.value = 'system';
 *  }}
 * >
 *  System
 * </button>
 * ```
 */
export function useTheme() {
  const context = getContext<CreateThemeContextReturn>('theme');

  return {
    get value(): Theme {
      return context.theme;
    },
    set value(theme: Theme | null | undefined) {
      if (context) {
        const v = parseTheme(theme);

        if (v) {
          context.theme = v;
        }
      }
    },
  };
}
