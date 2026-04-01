module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bluePrimary: "#0B486B",
        cvButtonPrimary: "#5E1B00",
        cvButtonSecondary: "#D48F74",
        grayPrimary: "#BABABA",
      },
      fontFamily: {
        sans: ['Exo', 'sans-serif'],
        orbitron: ["Orbitron", "sans-serif"]
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotate360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        slideInFromRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn .2s ease',
        tilt: 'tilt 3s infinite ease-in-out',
        float: 'float 3s infinite ease-in-out',
        rotate360: 'rotate360 1s linear infinite',
        slideInFromRight: 'slideInFromRight .5s ease',
        slideInFromLeft: 'slideInFromLeft .5s ease',
      },
      dropShadow: {
        'red': '10px 10px 10px #622529',
        'white': '10px 10px 10px #FFFFFF',
        'darkGray': '10px 10px 10px #1F2937',
      },
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        ':root': {
          '--grayPrimary': theme('colors.grayPrimary'),
          '--cvButtonPrimary': theme('colors.cvButtonPrimary'),
          '--cvButtonSecondary': theme('colors.cvButtonSecondary'),
        },
      });
    }
  ],
};
