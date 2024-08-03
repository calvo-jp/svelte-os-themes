// @ts-check
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.svelte'],
        svelteConfig,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals['shared-node-browser'],
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'svelte/no-at-html-tags': 'off',
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin,
      },
    },
  },
  {
    ignores: [
      /**/
      'dist',
      '.svelte-kit',
      'node_modules',
      'pnpm-lock.yaml',
      'package-lock.json',
    ],
  },
);
