/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  fontFamily: {
    Poppins: ["Poppins, sans-serif"],
  },
  theme: {
    extend: {
      colors: {
        primary: "hsl(280,100%,60%)",
        ourblack: "#111111",
        ourborder: "#222222",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.black"),
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
