/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        firago: ['Firago', 'sans-serif'],
      },
      colors: {
        primary: '#F93B1D',
        secondary: 'rgba(2, 21, 38, 0.5)',
        text: '#021526',
        border: '#DBDBDB',
        delete: '#676E76',
        valid: '#45A849',
        error: '#F93B1D',
        selected: '#F3F3F3',
      },
    },
  },
  plugins: [],
};
