<script lang="ts">
  import {ThemeProvider} from '$lib/index.js';
  import '../app.css';

  let {children} = $props();
</script>

<ThemeProvider attribute="data-theme" storageKey="svelte-os-themes">
  {@render children()}
</ThemeProvider>
