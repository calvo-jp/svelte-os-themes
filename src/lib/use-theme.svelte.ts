import {getContext} from 'svelte';
import type {CreateThemeReturn} from './create-theme.svelte.js';

export interface UseThemeReturn extends CreateThemeReturn {}

export function useTheme(): UseThemeReturn {
  const context = getContext<CreateThemeReturn>('theme');

  if (!context) {
    const e = new Error();
    e.name = 'ContextError';
    e.message = "'useTheme' must be used within a 'ThemeProvider'";
    Error.captureStackTrace?.(e, useTheme);
    throw e;
  }

  return context;
}
