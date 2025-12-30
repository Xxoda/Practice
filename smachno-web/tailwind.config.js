/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF4D2D',
        secondary: '#00C2A8',
        dark: '#111111',
        light: '#F7F7F7',
      },
      fontFamily: {
        hand: ['"Patrick Hand"', 'cursive'],
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
