<script lang="ts">
  import { setContext, type Snippet } from 'svelte';
  import { createTheme, type CreateThemeProps } from './create-theme.svelte.js';

  const darkModeQuery = '(prefers-color-scheme: dark)';

  interface Props extends CreateThemeProps {
    children?: Snippet;
  }

  let { children, ...props }: Props = $props();
  let context = createTheme(props);

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

  setContext('context', context);
</script>

{#if children}
  {@render children()}
{/if}
