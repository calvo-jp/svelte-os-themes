# Svelte Theme Store

## Installation

```bash
npm install svelte-theme-store
```

## Usage

- create a theme store

```ts
// lib/theme-store.svelte.ts
import { createThemeStore } from 'svelte-theme-store';

export const themeStore = createThemeStore();
```

- initialize

```svelte
<!-- +layout.svelte -->
<script>
  import { themeStore } from '$lib/theme-store.svelte';

  themeStore.init();
</script>
```

- use store

```svelte
<!-- +page.svelte -->
<script>
  import { themeStore } from '$lib/theme-store.svelte';
</script>

<button
  onclick={function () {
    themeStore.theme = 'light';
  }}
>
  Light
</button>
<button
  onclick={function () {
    themeStore.theme = 'dark';
  }}
>
  Dark
</button>
<button
  onclick={function () {
    themeStore.theme = 'system';
  }}
>
  System
</button>
```
