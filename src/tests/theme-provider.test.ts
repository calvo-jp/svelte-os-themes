import {render} from '@testing-library/svelte';
import {userEvent} from '@testing-library/user-event';
import Component from './theme-provider.svelte';

describe("'ThemeProvider' is properly working", () => {
  it('renders its children', async () => {
    const ui = render(Component);

    expect(await ui.findByRole('button', {name: 'Enable light mode'})).toBeInTheDocument();
    expect(await ui.findByRole('button', {name: 'Enable dark mode'})).toBeInTheDocument();
    expect(await ui.findByRole('button', {name: 'Enable system mode'})).toBeInTheDocument();
  });
});

describe('Theme store is properly working', () => {
  it('can change theme to dark mode', async () => {
    const ui = render(Component);
    const user = userEvent.setup();

    await user.click(await ui.findByRole('button', {name: 'Enable dark mode'}));

    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.getItem('theme')).toBe('dark');
  });

  it('can change theme to light mode', async () => {
    const ui = render(Component);
    const user = userEvent.setup();

    await user.click(await ui.findByRole('button', {name: 'Enable light mode'}));

    expect(document.documentElement).toHaveClass('light');
    expect(window.localStorage.getItem('theme')).toBe('light');
  });

  it('can change theme to system mode', async () => {
    const ui = render(Component);
    const user = userEvent.setup();

    await user.click(await ui.findByRole('button', {name: 'Enable system mode'}));

    expect(document.documentElement).toHaveClass('dark');
    expect(window.localStorage.getItem('theme')).toBe('system');
  });

  it('can set nonce for script and style', async () => {
    render(Component, {nonce: 'nonce'});

    expect(document.querySelector(`script[nonce='nonce']`)).toBeDefined();
    expect(document.querySelector(`style[nonce='nonce']`)).toBeDefined();
  });

  it('can set custom localStorage key', async () => {
    const ui = render(Component, {storageKey: 'customKey'});

    const user = userEvent.setup();

    await user.click(await ui.findByRole('button', {name: 'Enable system mode'}));

    expect(window.localStorage.getItem('customKey')).toBe('system');
  });

  it('can set custom document attribute besides class', async () => {
    const ui = render(Component, {attribute: 'data-theme'});
    const user = userEvent.setup();

    await user.click(await ui.findByRole('button', {name: 'Enable light mode'}));

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('adds color scheme to document', async () => {
    const ui = render(Component);
    const user = userEvent.setup();

    await user.click(await ui.findByRole('button', {name: 'Enable dark mode'}));
    expect(document.documentElement).toHaveStyle({colorScheme: 'dark'});

    await user.click(await ui.findByRole('button', {name: 'Enable light mode'}));
    expect(document.documentElement).toHaveStyle({colorScheme: 'light'});
  });

  it('can set fallback theme', async () => {
    render(Component, {fallback: 'light'});
    expect(document.documentElement).toHaveClass('light');
    expect(window.localStorage.getItem('theme')).toBe('light');
  });

  it.todo('should sync system theme if enabled');
  it.todo('should sync theme for multiple browser tabs');
});
