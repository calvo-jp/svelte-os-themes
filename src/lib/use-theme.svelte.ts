import {getContext} from 'svelte';
import type {CreateThemeReturn} from './create-theme.svelte.js';

export function useTheme() {
  const context = getContext<CreateThemeReturn>('theme');
  return context;
}
