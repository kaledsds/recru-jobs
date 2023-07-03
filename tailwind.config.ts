import { type Config } from "tailwindcss";

export default {
  daisyui: {
    themes: ["night", "winter"],
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {},
  },
  plugins: [require("daisyui")],
} satisfies Config;
