const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  darkMode: 'class',
  theme: {
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
          500: 'rgba(255, 255, 255, 0.5)',
          50: 'rgba(255, 255, 255, .05)',
        },
        gray: {
          50: '#F4F4F4',
          100: '#f0f0f0',
          200: '#C9C9C9',
          300: '#A9A9A9',
          400: '#2E2E30',
          500: '#282828',
          600: '#242424',
          700: '#161616',
          800: '#121212',
          900: '#0C0C0C',
        },
      },
    },
  },
  plugins: [],
};
