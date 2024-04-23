# Svelte OS Themes

Easier theme switching for `Svelte` and `SvelteKit` apps.

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

## API

### ThemeProvider

- `fallback`

  The default theme to use when no theme is set in storage.

  _accepted values:_ `'light'`, `'dark'`, `'system'`<br/>
  _default value:_ `'system'`

- `attribute`

  The attribute to set on the `html` element.

  _accepted values:_ `'class'`, `'data-<string>'`<br/>
  _default value:_ `'class'`

- `storageKey`

  The key to use when storing the theme in `localStorage`.

  _accepted values:_ `<string>`<br/>
  _default value:_ `'theme'`

- `system`

  Whether to change theme when os theme changes.

  _accepted values:_ `true`, `false`<br/>
  _default value:_ `true`

- `colorScheme`

  Whether to add/update the `html`'s `color-scheme`.

  _accepted values:_ `true`, `false`<br/>
  _default value:_ `true`

- `nonce`

  The nonce to use for script.

  _accepted values:_ `<string>`<br/>
  _default value:_ `''`

### useTheme

`useTheme` does not accept any arguments and returns an object with the following properties:

- `value`

  Returns the current theme when used as a getter and sets the theme when used as a setter.
