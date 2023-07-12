/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        120: "500px",
        890: "840px",
      },
      height: {
        120: "400px",
      },
      colors: {
        navbargray: {
          DEFAULT: "#24222f",
        },
        cardgray: {
          DEFAULT: "#11101a",
        },
        landingmodalbg: {
          DEFAULT: "#222030",
        },
        smbgprofile: {
          DEFAULT: "#171623",
        },
        searchmodalbg: {
          DEFAULT: "#12101a",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
