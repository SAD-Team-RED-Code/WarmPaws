module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#ec4899", // pink-500 for light
          secondary: "#7c3aed", // purple-600 for light
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#be185d", // darker pink for dark
          secondary: "#5b21b6", // darker purple for dark
        },
      },
    ],
  },
};
