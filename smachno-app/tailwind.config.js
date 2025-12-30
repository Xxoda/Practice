/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        accent: '#FF4D2D',
        dark: '#111111',
        light: '#F7F7F7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        handwritten: ['"Patrick Hand"', 'cursive'],
      },
      borderRadius: {
        'card': '12px',
      }
    },
  },
  plugins: [],
}