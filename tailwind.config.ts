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
        "neutral-clr": "#DBA362",
        "ok-clr": "#12B76A",
        "warning-clr": "#F04438",
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

      height: {
        240: "60rem",
      },

      width: {
        90: "22.5rem",
      },

      borderRadius: {
        "4px": "0.25rem",
      },

      padding: {
        "4.5": "1.125rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
