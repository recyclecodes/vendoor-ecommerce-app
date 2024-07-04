/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        "clash-display": ['"Clash Display Bold"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
