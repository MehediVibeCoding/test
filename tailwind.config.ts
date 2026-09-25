import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          950: "#0a1f33",
          700: "#0369a1",
          600: "#0ea5e9",
          400: "#38bdf8",
          100: "#e0f2fe",
        },
        cloud: {
          50: "#f5fafd",
        },
        ink: {
          800: "#1e293b",
        },
      },
      fontFamily: {
        display: ["Sora", "Noto Sans Bengali", "sans-serif"],
        body: ["Inter", "Noto Sans Bengali", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(14,165,233,0.15)",
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
};

export default config;
