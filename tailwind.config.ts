import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        bone: "#f5f1e8",
        acid: "#d4b06a",
        gold: "#c8a96a",
        navy: "#07111f",
        military: "#243223",
        stone: "#a6a39b",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.06em",
      },
    },
  },
  plugins: [],
};

export default config;
