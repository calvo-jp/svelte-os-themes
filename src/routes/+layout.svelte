<script lang="ts">
  import { ThemeToggleProvider } from '$lib/index.js';
  import '../app.css';

  let { children } = $props();
</script>

<ThemeToggleProvider>
  {@render children()}
</ThemeToggleProvider>
