# Svelte Themes

## Installation

```bash
npm install svelte-themes
```

## Usage

```svelte
<!-- +layout.svelte -->
<script>
  import { ThemeProvider } from 'svelte-themes';

  let { children } = $props();
</script>

<ThemeProvider>
  {@render children()}
</ThemeProvider>
```

```svelte
<!-- +page.svelte -->
<script>
  import { useTheme } from 'svelte-themes';

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
