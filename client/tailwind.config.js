/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
        colors: {
            primary: "#fff",
            secondary: "#0d2137",
            secondary_fade: "#133253",
            accent: "#ff8e2b",
            tertiary: "#2e77ae",
            text: "#555",
          },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

