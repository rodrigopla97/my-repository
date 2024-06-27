module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bluePrimary: "#0B486B",
        redPrimary: "#E13035",
        grayPrimary: "#BABABA",
      },
      fontFamily: {
        sans: ['Exo', 'sans-serif'],
        orbitron: ["Orbitron", "sans-serif"]
      },
      keyframes: {
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
      },
      animation: {
        tilt: 'tilt 3s infinite ease-in-out',
        float: 'float 3s infinite ease-in-out',
        rotate360: 'rotate360 1s linear infinite',
      },
      dropShadow: {
        'red': '10px 10px 10px #E13035',
        'white': '10px 10px 10px #FFFFFF',
      },
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        ':root': {
          '--blue-primary': theme('colors.bluePrimary'),
        },
      });
    }
  ],
};
