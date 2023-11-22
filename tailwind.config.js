/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [],
};
