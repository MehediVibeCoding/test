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
        // Playfair Display for Latin headings, Hind Siliguri covers Bengali glyphs
        display: ["var(--font-display)", "var(--font-bengali)", "serif"],
        // DM Sans for Latin body copy, Hind Siliguri covers Bengali glyphs
        body: ["var(--font-dm-sans)", "var(--font-bengali)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(14,165,233,0.15)",
      },
      maxWidth: {
        prose: "65ch",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(.16,1,.3,1)",
      },
    },
  },
  plugins: [],
};

export default config;
