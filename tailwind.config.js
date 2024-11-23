/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'primary': '#f2e3ce',
        'background': '#f0d2a8',
        'button-bg': '#5e4020',
        'accent': '#2d4d14',
      },
    },
  },
  plugins: [],
}

