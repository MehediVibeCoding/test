import localFont from "next/font/local";

// Headings — same premium serif used across Vangcur (vangcur.com)
// Weights needed: 600, 700
export const playfairDisplay = localFont({
  src: [
    {
      path: "./fonts/playfair-display/PlayfairDisplay-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/playfair-display/PlayfairDisplay-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

// Body copy (Latin characters) — same pairing as Vangcur
// Weights needed: 400, 500, 600, 700
export const dmSans = localFont({
  src: [
    {
      path: "./fonts/dm-sans/DMSans-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/dm-sans/DMSans-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/dm-sans/DMSans-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/dm-sans/DMSans-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

// Bengali text — headings and body both fall back to this for Bengali glyphs
// Weights needed: 400, 500, 600, 700
export const hindSiliguri = localFont({
  src: [
    {
      path: "./fonts/hind-siliguri/HindSiliguri-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/hind-siliguri/HindSiliguri-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/hind-siliguri/HindSiliguri-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/hind-siliguri/HindSiliguri-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bengali",
  display: "swap",
});
