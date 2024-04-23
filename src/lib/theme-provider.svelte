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
  $effect(context.effects.storageChanged);

  setContext('theme', context);
</script>

{@render children?.()}

<svelte:head>
  {@html context.script}
</svelte:head>

<!-- 
  @component

  @example
  ```svelte
  <script lang="ts">
    import ThemeProvider from 'svelte-os-themes';

    let { children } = $props();
  </script>

  <ThemeProvider
    fallback="system"
    attribute="class"
    storageKey="theme"
    colorScheme
    system
    nonce=""
  >
    {@render children()}
  </ThemeProvider>
  ```
-->
