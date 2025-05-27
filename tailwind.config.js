/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,,jsx,tsx}",
    "./cms/**/*.tsx",
    "./src/app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'xxsm': '300px',
      'xs': '350px',
      'xsm': '450px',
      'sm': '540px',
      'md': '767px',
      'lg': '992px',
      'xl': '1200px',
      'xxl': '1400px'
    },
    fontFamily: {
      'sans': ['Montserrat', 'sans-serif'],
      'robo': ['Montserrat', 'sans-serif'],
      'serif': ['ui-serif', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif'],
    },
    extend: {
      maxWidth: {
        '1/12': '8.333333333%',
        '1/2': '50%',
        '2/3': '66.666666667%',
        '5/6': '83.333333333%'
      },
      gradient: {
        'wealtho': 'linear-gradient(172deg, #035782 3.89%, #018E94 82.92%)',
      },
      boxShadow: {
        'large': '0 20px 25px -15px rgba(0, 0, 0, 0.3)'
      },
      height: {
        '128': '26rem',
        '144': '36rem',
      },
      fontSize: {
        tiny: "0.625rem",
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      colors: {
        'custom-green': 'rgba(1, 200, 169, 0.2)',
        'custom-light': 'rgba(235, 250, 245, 0.2)',
        button: "var(--color-button-text)",
        primary: {
          customColor: '#0CBAB8',
          lighter: '#ebf8ff',
          light: "#4599E0",
          DEFAULT: "#0082B2",
          new: "#3182ce",
          dark: "#892b64",
          black: "#4a5568",
          blue: '#035782',
          orange: '#FF7300',
          "blue-dark": "rgba(0,102,153,1)",
          "sky-blue": "rgba(0,201,167,1)",
          button: "#FF7300",
        },
        brand: {
          blue: '#0A5783',
          "sky-blue": "#18A19A",
        },

        secondary: "var(--color-secondary)",


      },
      backgroundImage: theme => ({
        'custom-gradient-Interestsection': `linear-gradient(180deg, ${theme('colors.custom-green')} 16.15%, ${theme('colors.custom-light')} 100%)`,
      }),
      flex: {
        '5/6': "0 0 83.3333333333%",
        '2/3': "0 0 66.6666666667%",
        '1/12': "0 0 8.333333333%"
      },
      transformOrigin: {
        "0": "0%",
      },
      zIndex: {
        "-1": "-1",
        "1": "1",
      },
      animation: {
        'icon-line-tip': 'icon-line-tip 0.75s ease-out',
        'icon-line-long': 'icon-line-long 0.75s ease-out',
        'pulse-scale': 'pulse-scale 1s ease-in-out infinite',
      },
      keyframes: {
        'icon-line-tip': {
          '0%': { width: '0', left: '1px', top: '19px' },
          '54%': { width: '0', left: '1px', top: '19px' },
          '70%': { width: '50px', left: '-8px', top: '37px' },
          '84%': { width: '17px', left: '21px', top: '48px' },
          '100%': { width: '25px', left: '14px', top: '45px' },
        },
        'icon-line-long': {
          '0%': { width: '0', right: '46px', top: '54px' },
          '65%': { width: '0', right: '46px', top: '54px' },
          '84%': { width: '55px', right: '0px', top: '35px' },
          '100%': { width: '47px', right: '8px', top: '38px' },
        },
        'pulse-scale': { // Added
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        
      },
    },
  },
  plugins: [],
};
