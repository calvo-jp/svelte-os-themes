<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import {
    createThemeToggle,
    type CreateThemeToggleProps,
  } from './create-theme-toggle.svelte.js';

  interface Props extends CreateThemeToggleProps {
    children?: Snippet;
  }

  let { children, ...props }: Props = $props();
  let context = createThemeToggle(props);

  setContext('theme-toggle', context);
</script>

{#if children}
  {@render children()}
{/if}
