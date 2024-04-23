<script lang="ts">
  import { useTheme } from '$lib/index.js';
  import Button from './button.svelte';
  import { cx } from './cx.js';
  import { dataAttr } from './data-attr.js';

  let theme = useTheme();
</script>

<svelte:head>
  <title>Svelte Themes</title>
</svelte:head>

<div class="min-h-dvh px-5 py-12 flex flex-col justify-center">
  <div
    class={cx(
      'w-56 text-sm p-4 mx-auto rounded-sm text-gray-600 font-mono bg-gray-50',
      'dark:bg-gray-800/25 dark:text-gray-400',
    )}
  >
    <pre>{JSON.stringify($state.snapshot(theme), null, 2)}</pre>
  </div>

  <div
    class="mt-8 w-full max-w-sm mx-auto space-y-4 lg:flex lg:max-w-lg lg:space-y-0 lg:gap-4"
  >
    <Button
      onclick={() => {
        theme.value = 'light';
      }}
      data-selected={dataAttr(theme.value === 'light')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="w-5 h-5"
      >
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
      <span>Light</span>
    </Button>
    <Button
      onclick={() => {
        theme.value = 'dark';
      }}
      data-selected={dataAttr(theme.value === 'dark')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="w-5 h-5"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.66667"
          d="M12 3a6 6 0 0 0 9 9a9 9 0 1 1-9-9"
        />
      </svg>
      <span>Dark</span>
    </Button>
    <Button
      onclick={() => {
        theme.value = 'system';
      }}
      data-selected={dataAttr(theme.value === 'system')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="w-5 h-5"
      >
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
      <span> System </span>
    </Button>
  </div>
</div>
