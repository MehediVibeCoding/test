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
        // Playfair Display — opt-in accent only (e.g. small taglines), never the default heading font
        display: ["var(--font-display)", "serif"],
        // DM Sans for Latin text; digit-only Noto Sans Bengali (linked in layout.tsx,
        // unicode-range restricted to ০-৯) must stay listed BEFORE var(--font-bengali)
        // so Bengali numerals stay legible.
        body: ["var(--font-dm-sans)", "'Noto Sans Bengali'", "var(--font-bengali)", "sans-serif"],
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
