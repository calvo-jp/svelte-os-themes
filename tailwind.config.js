/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      data: {
        selected: 'selected',
      },
    },
  },
  plugins: [],
};
