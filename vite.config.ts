import {sveltekit} from '@sveltejs/kit/vite';
import {svelteTesting} from '@testing-library/svelte/vite';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit(),
    svelteTesting({
      autoCleanup: true,
      resolveBrowser: true,
    }),
  ],
  server: {
    port: 3000,
  },
  test: {
    watch: false,
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
    passWithNoTests: true,
  },
});
