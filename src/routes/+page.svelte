<script lang="ts">
  import { useTheme } from '$lib/index.js';

  let theme = useTheme();

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
      theme.value = 'light';
    }}
    class={buttonStyle}
    data-selected={dataAttr(theme.value === 'light')}
  >
    Light
  </button>
  <button
    type="button"
    onclick={() => {
      theme.value = 'dark';
    }}
    class={buttonStyle}
    data-selected={dataAttr(theme.value === 'dark')}
  >
    Dark
  </button>
  <button
    type="button"
    onclick={() => {
      theme.value = 'system';
    }}
    class={buttonStyle}
    data-selected={dataAttr(theme.value === 'system')}
  >
    System
  </button>
</div>
