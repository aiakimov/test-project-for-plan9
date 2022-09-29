/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  content: [],
  theme: {
    colors: {
      'text': {
          light: '#0d9488',
          default: '#0f766e',
          dark: '#134e4a',
      },
      'bg': {
        light: '#f0fdfa',
        dark: '#ccfbf1',
      },
    },
    extend: {
      fontFamily: {
        'sans': 'Montserrat, sans-serif',
      },
    },
  },
  plugins: [],
}
