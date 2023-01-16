// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        red: '#ff3333',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
