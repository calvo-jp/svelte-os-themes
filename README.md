# Svelte OS Themes

## Installation

```bash
npm install svelte-os-themes
```

## Usage

```svelte
<!-- +layout.svelte -->
<script>
  import { ThemeProvider } from 'svelte-os-themes';

  let { children } = $props();
</script>

<ThemeProvider
  fallback="system"
  attribute="class"
  storageKey="theme"
  colorScheme={true}
  system={true}
  nonce=""
>
  {@render children()}
</ThemeProvider>
```

```svelte
<!-- +page.svelte -->
<script>
  import { useTheme } from 'svelte-os-themes';

  let theme = useTheme();
</script>

<button
  type="button"
  onclick={function () {
    theme.value = 'light';
  }}
  data-selected={theme.value === 'light'}
>
  Light
</button>
<button
  type="button"
  onclick={function () {
    theme.value = 'dark';
  }}
  data-selected={theme.value === 'dark'}
>
  Dark
</button>
<button
  type="button"
  onclick={function () {
    theme.value = 'system';
  }}
  data-selected={theme.value === 'system'}
>
  System
</button>
```
