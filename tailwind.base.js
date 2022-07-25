const colors = require('tailwindcss/colors');

module.exports = {
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      light: '#5eead4',
      dark: '#0f766e',
      white: '#ffffff',
      black: '#000000',
      background: '#003341',
      muted: 'rgba(255,255,255,.5)',
    },
    fontFamily: {
      sans: ["'Inter', sans-serif"],
    },
    extend: {
      spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
      colors: {
        transparent: `transparent`,
        blend: {
          100: 'rgba(255, 255, 255, 0.1)',
          500: 'rgba(255, 255, 255, 0.5)',
          50: 'rgba(255, 255, 255, .05)',
        },
        red: {
          100: colors.red['100'],
          500: colors.red['500'],
        },
        gray: colors.gray,
        orange: {
          500: colors.orange['500'],
        },
        blue: {
          500: colors.blue['500'],
          600: colors.blue['600'],
          700: colors.blue['700'],
        },
      },
    },
  },
};
