<script lang="ts">
  import type {CreateThemeProps} from './create-theme.svelte.js';
  import ThemeProvider from './theme-provider.svelte';

  let {...props}: CreateThemeProps = $props();
</script>

<ThemeProvider {...props}>
  {#snippet children(o)}
    <button
      type="button"
      onclick={() => {
        o.value = 'light';
      }}
      data-testid="light-mode-trigger"
    >
      Light
    </button>
    <button
      type="button"
      onclick={() => {
        o.value = 'dark';
      }}
      data-testid="dark-mode-trigger"
    >
      Dark
    </button>
    <button
      type="button"
      onclick={() => {
        o.value = 'system';
      }}
      data-testid="system-mode-trigger"
    >
      System
    </button>
  {/snippet}
</ThemeProvider>
