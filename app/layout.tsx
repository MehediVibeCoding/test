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
      <body>{children}</body>
    </html>
  );
}
