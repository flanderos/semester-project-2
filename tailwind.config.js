/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        customGrey: "#F5F5F5",
        customBlue: "#EAF8FF",
        customPink: "#FFEEF1",
      },
      fontFamily: {
        sans: ["Inika"],
      },
    },
  },
  plugins: [],
};
