import { Playfair_Display, DM_Sans, Hind_Siliguri } from "next/font/google";

// Headings — same premium serif used across Vangcur (vangcur.com)
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Body copy (Latin characters) — same pairing as Vangcur
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Bengali text — headings and body both fall back to this for Bengali glyphs
export const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});
