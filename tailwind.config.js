/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['Helvetica Neue', 'sans-serif'],
        firago: ['Firago', 'sans-serif'],
      },
      colors: {
        primary: '#F93B1D',
        primaryHover: '#DF3014',
        secondary: 'rgba(2, 21, 38, 0.5)',
        text: '#021526',
        secondaryText: 'rgba(2, 21, 38, 0.7)',
        placeholder: 'rgba(2, 21, 38, 0.4)',
        listingTitleText: '#1A1A1F',
        filterText: '#2D3648',
        silver: '#808A93',
        emptyText: 'rgba(2, 21, 38, 0.8)',
        border: '#DBDBDB',
        delete: '#676E76',
        valid: '#45A849',
        error: '#F93B1D',
        selected: '#F3F3F3',
        overlay: 'rgba(2, 21, 38, 0.34)',
      },
      boxShadow: {
        cardShadow: '5px 5px 12px 0px rgba(2, 21, 38, 0.08)',
        modalShadow: '5px 5px 4px 0px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
