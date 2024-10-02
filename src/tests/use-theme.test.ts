import {useTheme} from '$lib/use-theme.svelte.js';

const mockCreateThemeValue = {};
const mockContext: Record<string, unknown> = {
  theme: mockCreateThemeValue,
};

const getContext = vi.hoisted(() =>
  vi.fn((key) => {
    return mockContext[key];
  }),
);

vi.mock('svelte', async () => {
  const module = await vi.importActual('svelte');

  return {
    ...module,
    getContext,
  };
});

describe("'useTheme' is working", () => {
  it('returns stored context', () => {
    const value = useTheme();
    expect(value).toBe(mockCreateThemeValue);
    expect(getContext).toHaveBeenCalledWith('theme');
  });

  it('throws an error when context is not found', () => {
    mockContext.theme = null;
    expect(() => useTheme()).toThrow();
  });
});
