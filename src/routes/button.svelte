<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { cx } from './cx.js';

  let {
    children,
    class: className,
    ...props
  }: SvelteHTMLElements['button'] = $props();
</script>

<button
  type="button"
  class={cx(
    'border h-11 w-full flex text-sm gap-2 items-center font-medium justify-center px-4 rounded',
    'transition-colors duration-200',

    'text-gray-600 border-gray-300',
    'data-selected:border-amber-500 data-selected:text-amber-500',

    'dark:text-gray-400 dark:border-gray-700',
    'dark:data-selected:border-amber-700 dark:data-selected:text-amber-700',
    className,
  )}
  {...props}
>
  {@render children?.()}
</button>
