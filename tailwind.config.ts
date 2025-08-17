import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B5CF6",
          alt: "#A855F7",
        },
        secondary: {
          DEFAULT: "#EC4899",
          alt: "#F472B6",
        },
        accent: {
          DEFAULT: "#F59E0B",
        },
      },
      boxShadow: {
        glow: "0 10px 30px rgba(168,85,247,0.35)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;