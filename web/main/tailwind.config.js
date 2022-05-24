const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        system: defaultTheme.fontFamily.sans,
      },
      colors: {
        primary: {
          50: '#FEF0E3',
          100: '#FEE9DA',
          200: '#FECDB6',
          300: '#FEAB92',
          400: '#FE8A77',
          500: '#FE554A',
          600: '#DA3639',
          700: '#B62534',
          800: '#93172E',
          900: '#790E2B',
        },
        secondary: {
          50: '#FEF3E1',
          100: '#FEEED8',
          200: '#FED9B1',
          300: '#FEBF8A',
          400: '#FDA66D',
          500: '#FD7C3D',
          600: '#D95A2C',
          700: '#B63C1E',
          800: '#922413',
          900: '#79130B',
        },
      },
    },
  },
  plugins: [],
};
