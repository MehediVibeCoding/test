import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
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
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-dm-sans)", "'Noto Sans Bengali'", "var(--font-bengali)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(14,165,233,0.15)",
        "spring-hover": "0 10px 24px rgba(14, 165, 233, 0.28)",
      },
      maxWidth: {
        prose: "65ch",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(.16,1,.3,1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      // টাচ ডিভাইসে হোভার আটকে থাকা রোধ করতে শুধুমাত্র রিয়েল মাউস পয়েন্টারে হোভার চালু রাখা
      addVariant("hover", "@media (hover: hover) and (pointer: fine) { &:hover }");
      addVariant(
        "group-hover",
        "@media (hover: hover) and (pointer: fine) { :merge(.group):hover & }"
      );
      addVariant(
        "peer-hover",
        "@media (hover: hover) and (pointer: fine) { :merge(.peer):hover ~ & }"
      );
    }),
  ],
};

export default config;
