<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import {
    createThemeToggle,
    type CreateThemeToggleProps,
  } from './create-theme-toggle.svelte.js';

  const darkModeQuery = '(prefers-color-scheme: dark)';

  interface Props extends CreateThemeToggleProps {
    children?: Snippet;
  }

  let { children, ...props }: Props = $props();
  let context = createThemeToggle(props);

  $effect.pre(function assignCorrectTheme() {
    const localStorageValue = localStorage.getItem('theme');
  });

  $effect(function handleThemeChange() {
    const html = document.documentElement;
  });

  $effect(function watchThemeChanges() {
    const html = document.documentElement;
    const mediaQueryList = window.matchMedia(darkModeQuery);

    const handler = (e: MediaQueryListEvent) => {};

    mediaQueryList.addEventListener('change', handler);

    return () => {
      mediaQueryList.removeEventListener('change', handler);
    };
  });

  setContext('svelte-theme-toggle/context', context);
</script>

{#if children}
  {@render children()}
{/if}
