/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        "open-sans": "'Open Sans', sans-serif",
      },
      backgroundImage: {
        "landing-1": "url('../../imgs/01.jpg')",
      },
    },
  },
  plugins: [],
};
