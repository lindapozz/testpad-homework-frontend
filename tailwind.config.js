// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#ff3333',
      },
      height: {
        300: '300px',
        500: '500px',
        400: '400px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
