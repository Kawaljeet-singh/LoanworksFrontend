module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#008ba8",
          100: "#d6f6ff",
          200: "#dcf5fe",
          engage: "#9ec003",
          "engage-light": "#ccf0f5",
        },
        red: {
          500: "#e44141",
        },
        secondary: {
          engage: "#00b6ec",
          50: "#edebfb",
          100: "#d7d8ea",
          200: "#cacbe3",
          300: "#bcbedc",
          400: "#afb1d5",
          500: "#a1a3ce",
          550: "#aeaad5",
          600: "#0088a6",
        },
        "client-col": {
          100: "#031634",
          200: "#eeb11b",
          300: "#294480",
          400: "#f3c555",
          500: "#4a5568",
        },
        qb: {
          black: {
            100: "#a7a7a7",
            200: "#848484",
            300: "#666666",
            500: "#4f5961",
            600: "#333333",
          },
          purple: {
            100: "#efeefc",
          },
        },

        "client-bg-heading": {
          100: "#2C343F",
        },
        "progress-bar": "#b5da14",
        "step-bar": "#c7c7c7",

        green: "#9ffde1",
        "black-checkbox": "#797979",
        "gray-fill": "#e2e2e2",
        "text-area-fill": "#f2f2f2",
      },
      fontFamily: {
        avenir: ["Avenir"],
        "avenir-medium": [
          "Avenir-Medium",
          "Avenir Medium",
          "Avenir Book",
          "Avenir",
          "sans-serif",
        ],
        "avenir-book": ["Avenir-Book", "Avenir Book", "Avenir", "sans-serif"],
      },
      fontSize: {
        "22px": "1.375rem",
        "10px": "0.625rem",
      },
      dropShadow: {
        primary: "0px 0px 5px rgba(0, 0, 0, 0.35)",
        secondary: "0px 0px 3px rgba(0, 0, 0, 0.25)",
        tertiary: "0px 0px 3px rgba(0, 0, 0, 0.35)",
        "sub-shadow": "0px 1px 2px rgba(0, 0, 0, 0.35)",
        header: "0px 1px 2px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        logo: "url('/loanWorksLogo.png')",
      },
      spacing: {
        4.5: "1.125rem",
        6.5: "26px",
        7.5: "30px",
        8.5: "34px",
        12.5: "50px",
        13: "52px",
        15: "60px",
        17.5: "70px",
        18: "72px",
        19.5: "78px",
        21.5: "86px",
        22.5: "90px",
        25: "100px",
        26: "104px",
        30: "120px",
        31: "124px",
      },
      borderRadius: {
        3: "3px",
        5: "5px",
        10: "10px",
      },
      maxWidth: {
        638: "638px",
      },
    },
  },
  prefix: "tw-",
  plugins: [require("@tailwindcss/typography")],
};
