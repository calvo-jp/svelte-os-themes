<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import type { CreateThemeToggleReturn } from './create-theme-toggle.svelte.js';
  import type { Assign } from './types.js';
  import useThemeToggle from './use-theme-toggle.svelte.js';

  interface ThemeToggleProps {
    children: Snippet<[context: CreateThemeToggleReturn]>;
  }

  interface Props
    extends Assign<SvelteHTMLElements['button'], ThemeToggleProps> {}

  let { children, onclick, ...props }: Props = $props();
  let context = useThemeToggle();
</script>

<button
  type="button"
  onclick={(e) => {
    onclick?.(e);

    // TODO
  }}
  {...props}
>
  {#if children}
    {@render children(context)}
  {/if}
</button>
