/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{html,js,vue,tsx,ts}"],
  theme: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
      width: {
        100: "100px",
        200: "200px",
        300: "300px",
        400: "400px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
