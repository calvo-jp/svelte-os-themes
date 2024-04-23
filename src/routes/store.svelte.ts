import { createThemeStore } from '$lib/create-theme-store.svelte.js';

export const themeStore = createThemeStore({
  themes: [
    {
      label: 'Hello Kitty',
      value: 'pink',
      colorScheme: 'light',
    },
    {
      label: 'Sailor Moon',
      value: 'yellow',
      colorScheme: 'light',
    },
    {
      label: 'Scooby Doo',
      value: 'brown',
      colorScheme: 'dark',
    },
  ],
});
