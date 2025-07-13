<script lang="ts">
  import {ThemeProvider} from '$lib/index.js';
  import '../app.css';

  let {children} = $props();
</script>

<ThemeProvider>
  {@render children()}
</ThemeProvider>
