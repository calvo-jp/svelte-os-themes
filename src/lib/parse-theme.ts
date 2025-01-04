import type {Theme} from './create-theme.svelte.js';

/**
 * Parses string to theme
 *
 * @example
 * ```ts
 * console.log(parseTheme('LIGHT')); // 'light'
 * console.log(parseTheme('invalid')); // undefined
 * console.log(parseTheme('invalid', 'dark')); // 'dark'
 * ```
 */
export function parseTheme(value: unknown, fallback: Theme): Theme;
export function parseTheme(value: unknown): Theme | undefined;
export function parseTheme(value: unknown, fallback?: Theme) {
  if (typeof value !== 'string') return fallback;

  value = value.toLowerCase().trim();

  if (value === 'dark') return 'dark';
  if (value === 'light') return 'light';
  if (value === 'system') return 'system';

  return fallback;
}
