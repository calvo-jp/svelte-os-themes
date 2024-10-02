<script lang="ts">
  import type {CreateThemeProps} from './create-theme.svelte.js';
  import ThemeProvider from './theme-provider.svelte';

  let {...props}: CreateThemeProps = $props();

  $inspect({props});
</script>

<ThemeProvider {...props}>
  {#snippet children(o)}
    <button {...o.getTriggerProps({value: 'light'})}>Light</button>
    <button {...o.getTriggerProps({value: 'dark'})}>Dark</button>
    <button {...o.getTriggerProps({value: 'system'})}>System</button>
  {/snippet}
</ThemeProvider>
