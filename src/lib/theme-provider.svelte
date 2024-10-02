<script lang="ts" module>
  import type {CreateThemeProps, CreateThemeReturn} from './create-theme.svelte.js';

  export interface ThemeProviderProps extends CreateThemeProps {
    children?: Snippet<[CreateThemeReturn]>;
  }
</script>

<script lang="ts">
  import {setContext, type Snippet} from 'svelte';
  import {createTheme} from './create-theme.svelte.js';

  let {children, ...props}: ThemeProviderProps = $props();

  let theme = createTheme(props);
  let script = createTheme.script(props);
  let style = createTheme.style(props);

  setContext('theme', theme);
</script>

{@render children?.(theme)}

<svelte:head>
  {@html style.value}
  {@html script.value}
</svelte:head>
