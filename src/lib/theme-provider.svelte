<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import {
    createThemeContext,
    type CreateThemeContextConfig,
  } from './create-theme-context.svelte.js';

  interface Props extends CreateThemeContextConfig {
    children?: Snippet;
  }

  let { children, ...props }: Props = $props();
  let context = createThemeContext(props);

  $effect(context.effects.setup);
  $effect(context.effects.themeChanged);
  $effect(context.effects.osThemeChanged);

  setContext('theme', context);
</script>

{@render children?.()}

<svelte:head>
  {@html context.script}
</svelte:head>
