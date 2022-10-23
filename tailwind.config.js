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
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
      },
      backgroundColor: {
        primary: "var(--primary-background)",
        secondary: "var(--secondary-background)",
      },
      borderColor: {
        primary: "var(--primary-border-color)",
        secondary: "var(--secondary-border-color)",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
