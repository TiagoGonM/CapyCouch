/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B5BEC5",
        secondary: "#53beff",
        accent: "#c4853a",
        foreground: "#cddbe5",
      },
    },
  },
  plugins: [],
};
