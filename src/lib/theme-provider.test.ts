import {cleanup, render} from '@testing-library/svelte';
import {userEvent} from '@testing-library/user-event';
import type {ComponentType, SvelteComponent} from 'svelte';
import type {CreateThemeProps} from './create-theme.svelte.js';
import ThemeProvider from './theme-provider.test.svelte';

function renderComponent(props?: CreateThemeProps) {
  return render<SvelteComponent<CreateThemeProps>>(
    ThemeProvider as unknown as ComponentType<SvelteComponent<CreateThemeProps>>,
    {props},
  );
}

describe('ThemeProvider', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children', async () => {
    const {findByRole} = renderComponent();

    expect(await findByRole('button', {name: 'Enable light mode'})).toBeInTheDocument();
    expect(await findByRole('button', {name: 'Enable dark mode'})).toBeInTheDocument();
    expect(await findByRole('button', {name: 'Enable system mode'})).toBeInTheDocument();
  });

  it('can change theme to dark mode', async () => {
    const {getByRole} = renderComponent();
    const {click} = userEvent.setup();

    await click(getByRole('button', {name: 'Enable dark mode'}));

    expect(document.documentElement).toHaveClass('dark');
  });

  it('can change theme to light mode', async () => {
    const {getByRole} = renderComponent();
    const {click} = userEvent.setup();

    await click(getByRole('button', {name: 'Enable light mode'}));

    expect(document.documentElement).toHaveClass('light');
  });

  it('can change theme to system mode', async () => {
    const {getByRole} = renderComponent();
    const {click} = userEvent.setup();

    await click(getByRole('button', {name: 'Enable system mode'}));

    expect(document.documentElement).toHaveClass('dark');
  });

  it('can set nonce for script and style', async () => {
    renderComponent({nonce: 'nonce'});

    expect(document.querySelector(`script[nonce='nonce']`)).toBeDefined();
    expect(document.querySelector(`style[nonce='nonce']`)).toBeDefined();
  });

  it.skip('can set custom localStorage key', async () => {
    const {getByRole} = renderComponent({storageKey: 'customKey'});

    const {click} = userEvent.setup();

    await click(getByRole('button', {name: 'Enable system mode'}));

    expect(localStorage.getItem('customKey')).toBe('system');
  });

  it('can set custom document attribute besides class', async () => {
    const {getByRole} = renderComponent({attribute: 'data-theme'});
    const {click} = userEvent.setup();

    await click(getByRole('button', {name: 'Enable system mode'}));

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('adds color scheme to document', async () => {
    const {getByRole} = renderComponent();
    const {click} = userEvent.setup();

    await click(getByRole('button', {name: 'Enable dark mode'}));
    expect(document.documentElement).toHaveStyle({colorScheme: 'dark'});

    await click(getByRole('button', {name: 'Enable light mode'}));
    expect(document.documentElement).toHaveStyle({colorScheme: 'light'});
  });

  it.skip('can set fallback theme', async () => {
    renderComponent({fallback: 'light'});
    expect(document.documentElement).toHaveClass('light');
  });

  it.todo('should sync system theme if enabled');
  it.todo('should sync theme for multiple browser tabs');
});
