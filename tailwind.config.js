/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#f2e3ce",
        background: "#f0d2a8",
        "button-bg": "#5e4020",
        accent: "#2d4d14",
      },
      space: {
        "5/6": "83.33%",
      },
      inset: {
        "4/5": "80%",
      },
    },
  },
  plugins: [],
};
