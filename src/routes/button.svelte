<script lang="ts">
  import type {SvelteHTMLElements} from 'svelte/elements';

  let {children, class: className, ...props}: SvelteHTMLElements['button'] = $props();
</script>

<button
  type="button"
  class={[
    'border',
    'h-11',
    'w-full',
    'flex',
    'text-sm',
    'gap-2',
    'items-center',
    'font-medium',
    'justify-center',
    'px-4',
    'rounded',
    'transition-colors',
    'duration-1000',
    'text-gray-600',
    'border-gray-300',
    'data-on:border-amber-500',
    'data-on:text-amber-500',
    'dark:text-gray-400',
    'dark:border-gray-700',
    'dark:data-on:border-amber-700',
    'dark:data-on:text-amber-700',
    className,
  ]}
  {...props}
>
  {@render children?.()}
</button>
