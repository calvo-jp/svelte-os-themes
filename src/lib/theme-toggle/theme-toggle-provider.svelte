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

  $effect.pre(() => {
    const src = ``;

    const script = document.createElement('script');

    script.src = src;
    script.async = true;
    script.nonce = props.nonce;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  });
</script>

{#if children}
  {@render children()}
{/if}
