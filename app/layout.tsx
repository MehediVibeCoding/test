import type { Metadata } from "next";
import "./globals.css";
import { playfairDisplay, dmSans, hindSiliguri } from "./fonts";

export const metadata: Metadata = {
  title: "Ahsan's Learning Academy | HSC English & ICT",
  description:
    "HSC English ও ICT বিষয়ে Md. Ahsan Ullah-এর গাইডলাইন — চৌদ্দগ্রাম সরকারি কলেজ, 40th BCS (General) Education Cadre।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${playfairDisplay.variable} ${dmSans.variable} ${hindSiliguri.variable}`}
    >
      <head>
        {/*
          Digit-only font override — same technique as vangcur.com.
          Loads Noto Sans Bengali but the `text=` param subsets it down to just
          the ten Bengali digits (০-৯), which makes Google generate a
          `unicode-range` on the @font-face limited to those characters. That
          unicode-range means this font is ONLY ever picked for digits — every
          other Bengali character keeps falling through to Hind Siliguri.
          Must stay listed BEFORE var(--font-bengali) in the font-family
          stacks (see tailwind.config.ts `body` and globals.css) or digits
          fall back to Hind Siliguri's less legible numerals again.
        */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&text=%E0%A7%A6%E0%A7%A7%E0%A7%A8%E0%A7%A9%E0%A7%AA%E0%A7%AB%E0%A7%AC%E0%A7%AD%E0%A7%AE%E0%A7%AF&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
