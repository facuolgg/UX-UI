/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./script.js"
  ],
  theme: {
    screens: {
      'sm': '375px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          dark: '#172554',
          light: '#2563EB',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          card: '#F8FAFC',
        },
        content: {
          DEFAULT: '#0F172A',
          secondary: '#475569',
        },
        stroke: {
          DEFAULT: '#E2E8F0',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
