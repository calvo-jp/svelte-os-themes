<script lang="ts">
  import ThemeProvider from '$lib/theme-provider.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<ThemeProvider>
  {@render children()}
</ThemeProvider>
