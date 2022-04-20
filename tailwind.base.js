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
    fontSize: {
      xs: '.75rem',
      xl: '1.2rem',
      '4xl': '2rem',
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
        orange: {
          500: '#ea580c',
        },
        blue: {
          500: '#4287f5',
        },
      },
    },
  },
}
