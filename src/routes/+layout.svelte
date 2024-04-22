<script lang="ts">
  import '../app.css';

  import { ThemeToggleProvider } from '$lib/index.js';

  let { children } = $props();
</script>

<ThemeToggleProvider
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
</ThemeToggleProvider>
