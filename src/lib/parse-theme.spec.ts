import { expect, test } from 'vitest';
import { parseTheme } from './parse-theme.js';

test('parseTheme', () => {
  expect(parseTheme(0, 'system')).toBe('system');
  expect(parseTheme(null, 'system')).toBe('system');
  expect(parseTheme(undefined, 'system')).toBe('system');
  expect(parseTheme(function () {}, 'system')).toBe('system');
  expect(parseTheme('unknown', 'system')).toBe('system');

  expect(parseTheme('dark')).toBe('dark');
  expect(parseTheme('light')).toBe('light');
  expect(parseTheme('system')).toBe('system');

  expect(parseTheme('unknown')).toBeUndefined();
});
