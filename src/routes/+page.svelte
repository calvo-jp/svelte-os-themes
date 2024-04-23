<script lang="ts">
  import { themeStore } from './store.svelte.js';

  function dataAttr(guard?: boolean) {
    return guard ? '' : undefined;
  }

  function cx(...classes: (string | undefined)[]) {
    return classes.filter(Boolean).join(' ');
  }

  let buttonStyle = cx(
    'border h-10 w-32 flex text-sm items-center font-medium justify-center px-4 rounded',
    'transition-colors duration-200',

    'text-gray-600 border-gray-300',
    'data-selected:border-amber-500 data-selected:text-amber-500',

    'dark:text-gray-400 dark:border-gray-700',
    'dark:data-selected:border-amber-700 dark:data-selected:text-amber-700',
  );
</script>

<svelte:head>
  <title>Svelte Theme Toggle</title>
</svelte:head>

<div class="flex gap-2.5 p-5">
  <button
    type="button"
    onclick={() => {
      themeStore.theme = 'light';
    }}
    class={buttonStyle}
    data-selected={dataAttr(themeStore.theme === 'light')}
  >
    Light
  </button>
  <button
    type="button"
    onclick={() => {
      themeStore.theme = 'dark';
    }}
    class={buttonStyle}
    data-selected={dataAttr(themeStore.theme === 'dark')}
  >
    Dark
  </button>
  <button
    type="button"
    onclick={() => {
      themeStore.theme = 'system';
    }}
    class={buttonStyle}
    data-selected={dataAttr(themeStore.theme === 'system')}
  >
    System
  </button>
</div>
