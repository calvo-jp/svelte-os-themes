<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import {
    createThemeToggle,
    type CreateThemeToggleProps,
  } from './create-theme-toggle.svelte.js';
  import { DARK_MODE_QUERY } from './utils.js';

  interface Props extends CreateThemeToggleProps {
    children?: Snippet;
  }

  let { children, ...props }: Props = $props();
  let context = createThemeToggle(props);

  setContext('svelte-theme-toggle/context', context);

  $effect.pre(function assignCorrectTheme() {
    const localStorageValue = localStorage.getItem('theme');
  });

  $effect(function handleThemeChange() {
    const html = document.documentElement;
  });

  $effect(function watchThemeChanges() {
    const html = document.documentElement;
    const mediaQueryList = window.matchMedia(DARK_MODE_QUERY);

    const handler = (e: MediaQueryListEvent) => {};

    mediaQueryList.addEventListener('change', handler);

    return () => {
      mediaQueryList.removeEventListener('change', handler);
    };
  });
</script>

{#if children}
  {@render children()}
{/if}
