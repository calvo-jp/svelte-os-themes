<script lang="ts">
  import type {SvelteHTMLElements} from 'svelte/elements';

  const {...props}: SvelteHTMLElements['svg'] = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" {...props}>
  <g
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
  >
    <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
    <path d="M2 20h20" />
  </g>
</svg>
