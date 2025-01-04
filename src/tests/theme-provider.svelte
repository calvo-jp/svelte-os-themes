<script lang="ts">
  import {ThemeProvider, type ThemeProviderProps} from '$lib/index.js';

  let {...props}: ThemeProviderProps = $props();
</script>

<ThemeProvider {...props}>
  {#snippet children(o)}
    <button {...o.getTriggerProps({value: 'light'})}>Light</button>
    <button {...o.getTriggerProps({value: 'dark'})}>Dark</button>
    <button {...o.getTriggerProps({value: 'system'})}>System</button>
  {/snippet}
</ThemeProvider>
