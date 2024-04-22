<script lang="ts">
  import { ThemeProvider } from '$lib/index.js';
  import '../app.css';

  let { children } = $props();
</script>

<ThemeProvider
  themes={[
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
  ]}
>
  {@render children()}
</ThemeProvider>
