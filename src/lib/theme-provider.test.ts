/* eslint-disable @typescript-eslint/no-explicit-any */

import {cleanup, render} from '@testing-library/svelte';
import {userEvent} from '@testing-library/user-event';
import ThemeProvider from './theme-provider.test.svelte';

describe('ThemeProvider', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children', async () => {
    const {findByTestId} = render(ThemeProvider as any);

    expect(await findByTestId('light-mode-trigger')).toBeInTheDocument();
    expect(await findByTestId('dark-mode-trigger')).toBeInTheDocument();
    expect(await findByTestId('system-mode-trigger')).toBeInTheDocument();
  });

  it('can change theme to dark mode', async () => {
    const {getByTestId} = render(ThemeProvider as any, {props: {}});
    const {click} = userEvent.setup();

    await click(getByTestId('dark-mode-trigger'));

    expect(document.documentElement).toHaveClass('dark');
  });

  it('can change theme to light mode', async () => {
    const {getByTestId} = render(ThemeProvider as any, {props: {}});
    const {click} = userEvent.setup();

    await click(getByTestId('light-mode-trigger'));

    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('can change theme to system mode', async () => {
    const {getByTestId} = render(ThemeProvider as any, {props: {}});
    const {click} = userEvent.setup();

    await click(getByTestId('system-mode-trigger'));

    expect(document.documentElement).toHaveClass('dark');
  });

  it('can set nonce for script and style', async () => {
    render(ThemeProvider as any, {props: {nonce: 'nonce'}});

    expect(document.querySelector(`script[nonce='nonce']`)).toBeDefined();
    expect(document.querySelector(`style[nonce='nonce']`)).toBeDefined();
  });

  it.skip('can set custom localStorage key', async () => {
    const {getByTestId} = render(ThemeProvider as any, {props: {storageKey: 'storageKey'}});
    const {click} = userEvent.setup();

    await click(getByTestId('dark-mode-trigger'));

    expect(localStorage.getItem('custom-theme')).toBe('dark');
  });

  it('can set custom document attribute besides class', async () => {
    const {getByTestId} = render(ThemeProvider as any, {props: {attribute: 'data-theme'}});
    const {click} = userEvent.setup();

    await click(getByTestId('dark-mode-trigger'));

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it.skip('can set fallback theme', async () => {
    render(ThemeProvider as any, {props: {fallback: 'light'}});
    expect(document.documentElement).toHaveClass('light');
  });

  it.todo('sync theme for multiple browser tabs');
});
