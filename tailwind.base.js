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
        blend: {
          100: 'rgba(255, 255, 255, 0.1)',
          500: 'rgba(255, 255, 255, 0.5)',
          50: 'rgba(255, 255, 255, .05)',
        },
        red: {
          500: 'rgb(239 68 68);',
        },
        gray: colors.gray,
        orange: {
          500: '#f97316',
        },
        blue: {
          500: '#3b82f6',
          700: '#1d4ed8',
        },
      },
    },
  },
};
