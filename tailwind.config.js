
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-green': '#D0FF49',
        'main-green-hover': '#BAE042',
        'custom-gray': '#474747',
        'custom-light': '#FAFAFA',
        'custom-orange': '#FF820F',
        'input_color': "#1f2124",
        'text-main_green': '#B7ED1D'
      },
      fontFamily: {
        gilroy: ["Gilroy"],
        gunterz: ["Gunterz"],
        montserrat: ["Montserrat"],
      },
      boxShadow: {
        'shadow-bottom': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
});