import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },

      colors: {
        "primary-cta": "#1570EF",
        "total-return": "#845EBC",
        "total-products": "#DBA362",
        "in-stock": "#12B76A",
        "out-of-stock": "#F04438",
        "border-color": "#F0F1F3",
        heading: "#383E49",
        "sub-heading": "#5D6679",
        "body-color": "#858D9D",
        "modal-clr": "rgba(208,211,217,0.3)",
      },

      fontSize: {
        "display-sm": ["1.875rem", "2.375rem"],
        "display-xs": ["1.5rem", "2rem"],
        xl: ["1.125rem", "1.875rem"],
        lg: ["1.125rem", "1.75rem"],
        md: ["1rem", "1.5rem"],
        sm: ["0.875rem", "1.25rem"],
      },

      borderRadius: {
        1: "0.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
