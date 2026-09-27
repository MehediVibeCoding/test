import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ahsansir.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0284c7",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ahsan's Learning Academy | HSC English & ICT",
    template: "%s | Ahsan's Learning Academy",
  },
  description:
    "HSC শিক্ষার্থীদের জন্য ইংরেজি ও আইসিটি বিষয়ে Md. Ahsan Ullah-এর প্রাইভেট গাইডলাইন — প্রভাষক, চৌদ্দগ্রাম সরকারি কলেজ ও ৪০তম বিসিএস (সাধারণ শিক্ষা ক্যাডার)।",
  keywords: [
    "HSC English",
    "HSC ICT",
    "Md. Ahsan Ullah",
    "Ahsan's Learning Academy",
    "চৌদ্দগ্রাম সরকারি কলেজ",
    "HSC Private Batch",
    "এইচএসসি ইংরেজি",
    "এইচএসসি আইসিটি",
    "কুমিল্লা",
  ],
  authors: [{ name: "Md. Ahsan Ullah", url: siteUrl }],
  creator: "Md. Ahsan Ullah",
  publisher: "Ahsan's Learning Academy",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ahsan's Learning Academy | HSC English & ICT",
    description:
      "উচ্চমাধ্যমিক শিক্ষার্থীদের ইংরেজি ও আইসিটি বিষয়ে মৌলিক ধারণা স্পষ্টকরণ এবং বোর্ড পরীক্ষার সর্বোচ্চ প্রস্তুতির জন্য একটি নির্ভরযোগ্য ও আধুনিক শিক্ষা প্ল্যাটফর্ম।",
    url: siteUrl,
    siteName: "Ahsan's Learning Academy",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/images/ahsan-about.webp",
        width: 900,
        height: 1104,
        alt: "Md. Ahsan Ullah — Ahsan's Learning Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahsan's Learning Academy | HSC English & ICT",
    description:
      "এইচএসসি শিক্ষার্থীদের জন্য ইংরেজি ও আইসিটি বিষয়ে মোঃ আহসান উল্লাহ স্যারের বিশেষায়িত প্রাইভেট কেয়ার।",
    images: ["/images/ahsan-about.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Google Search Rich Snippet JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      "name": "Ahsan's Learning Academy",
      "url": siteUrl,
      "logo": `${siteUrl}/images/ahsan-about.webp`,
      "description":
        "উচ্চমাধ্যমিক শিক্ষার্থীদের ইংরেজি ও আইসিটি বিষয়ে মৌলিক ধারণা স্পষ্টকরণ এবং বোর্ড পরীক্ষার সর্বোচ্চ প্রস্তুতির জন্য বিশেষায়িত একাডেমি।",
      "telephone": "+8801845435539",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "কলেজ রোড, চৌদ্দগ্রাম সরকারি কলেজ সংলগ্ন",
        "addressLocality": "চৌদ্দগ্রাম",
        "addressRegion": "কুমিল্লা",
        "addressCountry": "BD",
      },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": "Md. Ahsan Ullah",
      "jobTitle": "Lecturer & 40th BCS Cadre",
      "worksFor": {
        "@id": `${siteUrl}/#organization`,
      },
      "alumniOf": "University of Chittagong",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&text=%E0%A7%A6%E0%A7%A7%E0%A7%A8%E0%A7%A9%E0%A7%AA%E0%A7%AB%E0%A7%AC%E0%A7%AD%E0%A7%AE%E0%A7%AF&display=swap"
        />
        {/* Google Rich Snippets Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
