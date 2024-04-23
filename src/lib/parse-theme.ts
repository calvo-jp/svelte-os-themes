import type { Theme } from './types.js';

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
