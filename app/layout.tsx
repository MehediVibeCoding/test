import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="bn">
      <head>
        {/*
          All fonts are now loaded via a plain <link> tag (browser-side),
          NOT next/font/google. next/font/google fetches Google Fonts at
          BUILD time, and Google occasionally returns a URL shape Next.js
          can't parse yet, which crashed the Vercel build with:
          "TypeError: Cannot read properties of null (reading '1')"
          (see https://github.com/vercel/next.js/issues/99114 — open bug).
          A <link> tag loads fonts from the visitor's browser instead, so
          the build never talks to Google Fonts and can't fail this way.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap"
        />

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
