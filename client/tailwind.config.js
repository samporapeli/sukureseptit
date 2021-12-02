const colors = require('tailwindcss/colors')


module.exports = {
  purge: [
    './src/**/*.js',
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "ruskee": "#6D3D14",
        "vihree": "#337357",
        "kulta": "#D58936",
        "beige": "#BA9593", 
        "valkoinen": "#F4F3EE"

      }
    },
    fontFamily: {
      Castoro: ["Castoro, sans-serif" ],
    },
    container: {
      center: true,
      padding: "1rem",
      screens:{
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],



}
