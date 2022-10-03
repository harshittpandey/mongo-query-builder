/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{html,js,vue,tsx,ts}"],
  theme: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
