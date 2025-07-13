<script lang="ts" module>
  import type {CreateThemeOptions} from './createTheme.svelte.js';

  export interface ThemeProviderProps extends CreateThemeOptions {
    children?: Snippet;
  }
</script>

<script lang="ts">
  import {setContext, type Snippet} from 'svelte';
  import {createTheme, type CreateThemeReturn} from './createTheme.svelte.js';

  let {children, ...props}: ThemeProviderProps = $props();

  let theme = createTheme(props);
  let script = createTheme.script(props);
  let style = createTheme.style(props);

  setContext<CreateThemeReturn>('theme', theme);
</script>

<svelte:head>
  {@html style.value}
  {@html script.value}
</svelte:head>

{@render children?.()}
