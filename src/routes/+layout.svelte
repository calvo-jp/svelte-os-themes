<script lang="ts">
  import { createThemeStore } from '$lib/index.js';
  import '../app.css';

  let { children } = $props();

  let store = createThemeStore({
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
</script>

{@render children()}
