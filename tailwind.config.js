/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F93B1D',
        text: '#021526',
        secondary: 'rgba(2, 21, 38, 0.5)',
        border: '#DBDBDB',
        delete: '#676E76',
        valid: '#45A849',
        error: '#F93B1D',
      },
    },
  },
  plugins: [],
};
