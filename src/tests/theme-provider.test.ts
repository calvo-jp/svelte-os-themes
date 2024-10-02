import {cleanup, render} from '@testing-library/svelte';
import {userEvent} from '@testing-library/user-event';
import type {ComponentType, SvelteComponent} from 'svelte';
import type {CreateThemeProps} from '../lib/create-theme.svelte.js';
import Component from './theme-provider.svelte';

function renderComponent(props?: CreateThemeProps) {
  return render<SvelteComponent<CreateThemeProps>>(
    Component as unknown as ComponentType<SvelteComponent<CreateThemeProps>>,
    {props},
  );
}

describe('ThemeProvider is properly working', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders its children', async () => {
    const {findByRole} = renderComponent();

    expect(await findByRole('button', {name: 'Enable light mode'})).toBeInTheDocument();
    expect(await findByRole('button', {name: 'Enable dark mode'})).toBeInTheDocument();
    expect(await findByRole('button', {name: 'Enable system mode'})).toBeInTheDocument();
  });
});

describe('Theme store is properly working', () => {
  afterEach(() => {
    cleanup();
  });

  it('can change theme to dark mode', async () => {
    const {getByRole} = renderComponent();
    const {click} = userEvent.setup();

    await click(getByRole('button', {name: 'Enable dark mode'}));

    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.getItem('theme')).toBe('dark');
  });

  it('can change theme to light mode', async () => {
    const {getByRole} = renderComponent();
    const {click} = userEvent.setup();

    await click(getByRole('button', {name: 'Enable light mode'}));

    expect(document.documentElement).toHaveClass('light');
    expect(window.localStorage.getItem('theme')).toBe('light');
  });

  it('can change theme to system mode', async () => {
    const {getByRole} = renderComponent();
    const {click} = userEvent.setup();

    await click(getByRole('button', {name: 'Enable system mode'}));

    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.getItem('theme')).toBe('system');
  });

  it('can set nonce for script and style', async () => {
    renderComponent({nonce: 'nonce'});

    expect(document.querySelector(`script[nonce='nonce']`)).toBeDefined();
    expect(document.querySelector(`style[nonce='nonce']`)).toBeDefined();
  });

  it('can set custom localStorage key', async () => {
    const {getByRole} = renderComponent({storageKey: 'customKey'});

    const {click} = userEvent.setup();

    await click(getByRole('button', {name: 'Enable system mode'}));

    expect(window.localStorage.getItem('customKey')).toBe('system');
  });

  it('can set custom document attribute besides class', async () => {
    const {getByRole} = renderComponent({attribute: 'data-theme'});
    const {click} = userEvent.setup();

    await click(getByRole('button', {name: 'Enable light mode'}));

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('adds color scheme to document', async () => {
    const {getByRole} = renderComponent();
    const {click} = userEvent.setup();

    await click(getByRole('button', {name: 'Enable dark mode'}));
    expect(document.documentElement).toHaveStyle({colorScheme: 'dark'});

    await click(getByRole('button', {name: 'Enable light mode'}));
    expect(document.documentElement).toHaveStyle({colorScheme: 'light'});
  });

  it('can set fallback theme', async () => {
    renderComponent({fallback: 'light'});
    expect(document.documentElement).toHaveClass('light');
    expect(window.localStorage.getItem('theme')).toBe('light');
  });

  it.todo('should sync system theme if enabled');
  it.todo('should sync theme for multiple browser tabs');
});
