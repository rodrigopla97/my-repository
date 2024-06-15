/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bluePrimary: "#0B486B",
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
      },
      animation: {
        tilt: 'tilt 3s infinite ease-in-out',
        float: 'float 3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
