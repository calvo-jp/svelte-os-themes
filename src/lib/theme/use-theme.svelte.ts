import { getContext } from 'svelte';
import type { CreateThemeReturn } from './create-theme.svelte.js';

export default function useTheme() {
  return getContext<CreateThemeReturn>('context');
}
