# Svelte OS Themes

[Svelte](https://svelte.dev/) 5 theme helper.

## Installation

```bash
npm install svelte-os-themes
```

## Usage

```svelte
<!-- +layout.svelte -->
<script>
  import {ThemeProvider} from 'svelte-os-themes';

  let {children} = $props();
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
  import {useTheme} from 'svelte-os-themes';

  let theme = useTheme();

  $inspect(theme.current);
</script>

<button
  type="button"
  onclick={function () {
    theme.current = 'light';
  }}
>
  Light
</button>
<button
  type="button"
  onclick={function () {
    theme.current = 'dark';
  }}
>
  Dark
</button>
<button
  type="button"
  onclick={function () {
    theme.current = 'system';
  }}
>
  System
</button>
```

## API

### ThemeProvider

- `fallback`

  The default theme to use when no theme is set in storage.

  accepted values: `'light'`, `'dark'`, `'system'`<br/>
  default value: `'system'`

- `attribute`

  The attribute to set on the `html` element.

  accepted values: `'class'`, `'data-<string>'`<br/>
  default value: `'class'`

- `storageKey`

  The key to use when storing the theme in `localStorage`.

  accepted values: `<string>`<br/>
  default value: `'theme'`

- `system`

  Whether to change theme when os theme changes.

  accepted values: `true`, `false`<br/>
  default value: `false`

- `colorScheme`

  Whether to add/update the `html`'s `color-scheme`.

  accepted values: `true`, `false`<br/>
  default value: `true`

- `nonce`

  The nonce to use for script.

  accepted values: `<string>`<br/>
  default value:

### useTheme

`useTheme` does not accept any arguments and returns an object with the following properties:

- `current`

  Returns the current theme when used as a getter and sets the theme when used as a setter.

  ```svelte
  <script>
    import {useTheme} from 'svelte-os-themes';

    let theme = useTheme();
  </script>

  <div>Current Theme: {theme.current}</div>

  <button
    type="button"
    onclick={function () {
      theme.current = 'light';
    }}
  >
    Light
  </button>
  <button
    type="button"
    onclick={function () {
      theme.current = 'light';
    }}
  >
    Dark
  </button>
  <button
    type="button"
    onclick={function () {
      theme.current = 'light';
    }}
  >
    System
  </button>
  ```

- `getTriggerProps`

  Returns attributes for button to be used to trigger a particular theme. eg:

  ```svelte
  <script>
    import {useTheme} from 'svelte-os-themes';

    let theme = useTheme();
  </script>

  <button {...theme.getTriggerProps({value: 'light'})}>Light</button>
  <button {...theme.getTriggerProps({value: 'dark'})}>Dark</button>
  <button {...theme.getTriggerProps({value: 'system'})}>System</button>
  ```

  or set value to auto

  ```svelte
  <script>
    import {useTheme} from 'svelte-os-themes';

    let theme = useTheme();
  </script>

  <button
    {...theme.getTriggerProps({
      value: 'auto',
      sequence: ['light', 'dark'],
    })}
  >
    {#if theme.current === 'light'}
      Go dark
    {:else if theme.current === 'dark'}
      Go light
    {/if}
  </button>
  ```

### parseTheme

`parseTheme` is a helper function that parses any value into a valid theme. See example below

```js
console.log(parseTheme('LIGHT')); // 'light'
console.log(parseTheme('invalid')); // undefined
console.log(parseTheme('invalid', 'dark')); // 'dark'
```
