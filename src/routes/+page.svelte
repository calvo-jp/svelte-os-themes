<script lang="ts">
  import {useTheme} from '$lib/index.js';
  import Button from './Button.svelte';
  import LaptopIcon from './LaptopIcon.svelte';
  import MoonIcon from './MoonIcon.svelte';
  import SunIcon from './SunIcon.svelte';

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
      <pre>{JSON.stringify(theme, null, 2)}</pre>
    </code>

    <div class="mt-6 w-full space-y-4 lg:flex lg:max-w-lg lg:space-y-0 lg:gap-4">
      <Button {...theme.getTriggerProps({value: 'light'})}>
        <SunIcon />
        <span>Light</span>
      </Button>
      <Button {...theme.getTriggerProps({value: 'dark'})}>
        <MoonIcon />
        <span>Dark</span>
      </Button>
      <Button {...theme.getTriggerProps({value: 'system'})}>
        <LaptopIcon />
        <span>System</span>
      </Button>
    </div>
  </div>
</div>
