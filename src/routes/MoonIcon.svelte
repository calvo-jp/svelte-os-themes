<script lang="ts">
  import type {SvelteHTMLElements} from 'svelte/elements';

  const {...props}: SvelteHTMLElements['svg'] = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" {...props}>
  <path
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9"
  />
</svg>
