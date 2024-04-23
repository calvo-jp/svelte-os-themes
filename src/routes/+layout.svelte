<script lang="ts">
  import '../app.css';
  import { themeStore } from './store.svelte.js';

  let { children } = $props();

  themeStore.init();
</script>

{@render children()}
