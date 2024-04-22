import { getContext } from 'svelte';
import type { CreateThemeToggleReturn } from './create-theme-toggle.svelte.js';

export default function useThemeToggle() {
  return getContext<CreateThemeToggleReturn>('svelte-theme-toggle/context');
}
