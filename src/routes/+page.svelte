<script lang="ts">
  import {useTheme} from '$lib/index.js';
  import Button from './button.svelte';

  let theme = useTheme();
</script>

<svelte:head>
  <title>Svelte Themes</title>
</svelte:head>

<div class="min-h-dvh px-5 py-8 lg:py-12">
  <div class="max-w-sm mx-auto">
    <code
      class="text-xs block w-full p-4 rounded text-gray-600 font-mono bg-gray-50 dark:bg-gray-800/25 dark:text-gray-400"
    >
      <pre>{JSON.stringify($state.snapshot(theme), null, 2)}</pre>
    </code>

    <div class="mt-6 w-full space-y-4 lg:flex lg:max-w-lg lg:space-y-0 lg:gap-4">
      <Button {...theme.getTriggerProps({value: 'light'})}>
        {@render sun()}
        <span>Light</span>
      </Button>
      <Button {...theme.getTriggerProps({value: 'dark'})}>
        {@render moon()}
        <span>Dark</span>
      </Button>
      <Button {...theme.getTriggerProps({value: 'system'})}>
        {@render laptop()}
        <span>System</span>
      </Button>
    </div>
  </div>
</div>

{#snippet sun()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5">
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.66667"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
      />
    </g>
  </svg>
{/snippet}

{#snippet moon()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5">
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.66667"
      d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9"
    />
  </svg>
{/snippet}

{#snippet laptop()}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5">
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.66667"
    >
      <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
      <path d="M2 20h20" />
    </g>
  </svg>
{/snippet}
