/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["*.html", "./**/*.html", "./**/*.js"],

  theme: {
    extend: {
      colors: {
        customGrey: "#F5F5F5",
        customBlue: "#EAF8FF",
        customPink: "#FFE4E9",
        customGreen: "#CAFFF5",
      },
      fontFamily: {
        kreon: ["Kreon", "serif"],
        poppins: ["Poppins", "sans-serif"],
        inika: ["Inika", "sans-serif"],
        inder: ["Inder", "sans-serif"],
      },
      height: {
        450: "450px", // Legger til en ny høydeverdi
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".classActive": {
          textDecoration: "underline",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
