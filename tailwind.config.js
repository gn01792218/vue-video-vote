/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
    },
    safelist:['animate-[slide-right_1s_ease-in-out]','animate-[fade-in-down_1s_ease-in-out]']
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}
