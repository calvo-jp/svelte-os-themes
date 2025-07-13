import {getContext} from 'svelte';
import {ThemeContextError} from './ThemeContextError.js';
import type {CreateThemeReturn} from './createTheme.svelte.js';

export interface UseThemeReturn extends CreateThemeReturn {}

export function useTheme(): UseThemeReturn {
  const context = getContext<CreateThemeReturn>('theme');
  if (!context) throw new ThemeContextError("'useTheme' must be used within a 'ThemeProvider'");
  return context;
}
