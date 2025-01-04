import {useTheme, type UseThemeReturn} from '$lib/index.js';

const mockedUseThemeReturn: UseThemeReturn = {
  current: 'system',
  getTriggerProps: vi.fn().mockReturnValue({}),
};

const mockedContext: Record<string, unknown> = {
  theme: mockedUseThemeReturn,
};

const getContext = vi.hoisted(() => vi.fn().mockImplementation((key) => mockedContext[key]));

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
    expect(value).toBe(mockedUseThemeReturn);
    expect(getContext).toHaveBeenCalledWith('theme');
  });

  it('throws an error when context is not found', () => {
    mockedContext.theme = null;
    expect(() => useTheme()).toThrow();
  });
});
