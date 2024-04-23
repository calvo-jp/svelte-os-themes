import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      data: {
        selected: 'selected',
      },
      fontFamily: {
        sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
        mono: ["'Fira Code'", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
