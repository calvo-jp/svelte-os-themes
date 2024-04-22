<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { CreateThemeToggleReturn } from './create-theme-toggle.svelte.js';
  import useThemeToggle from './use-theme-toggle.svelte.js';

  interface Props {
    children: Snippet<[context: CreateThemeToggleReturn]>;
  }

  let { children }: Props = $props();
  let context = useThemeToggle();
</script>

{@render children(context)}
