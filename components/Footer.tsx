"use client";

import { useState } from "react";
import Link from "next/link";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M13 9h2V6h-2c-1.7 0-3 1.3-3 3v2H8v3h2v7h3v-7h2.2l.8-3H13V9z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M21 8.5s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.3 5.3 12 5.3 12 5.3s-3.3 0-6.1.2c-.4.1-1.3.1-2.1.9C3.2 7 3 8.5 3 8.5S2.8 10.2 2.8 12v1.9c0 1.8.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9 1.7.2 7 .2 7 .2s3.3 0 6.1-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5V12c0-1.8-.2-3.5-.2-3.5zM10 15V9l5 3-5 3z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/8801845435539",
    path: "M12 3a9 9 0 00-7.8 13.4L3 21l4.7-1.2A9 9 0 1012 3zm4.7 12.8c-.2.5-1.1 1-1.5 1.1-.4.1-.9.1-1.4-.1-.3-.1-.8-.3-1.3-.5-2.3-.9-3.8-3.3-3.9-3.4-.1-.2-.9-1.3-.9-2.4s.6-1.7.8-1.9c.2-.2.5-.3.6-.3h.5c.1 0 .3 0 .5.4.2.5.6 1.6.7 1.7 0 .1.1.3 0 .4-.1.2-.1.3-.2.4-.1.2-.2.3-.3.4-.1.1-.2.2-.1.4.2.3.6.9 1.2 1.5.8.7 1.5.9 1.7 1 .2.1.3.1.4 0 .1-.1.5-.6.6-.8.2-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.1.4.3 0 .1 0 .5-.2 1z",
  },
];

const NAV_LINKS = [
  { label: "শিক্ষক পরিচিতি", href: "#about" },
  { label: "কেন আমাদের একাডেমি", href: "#why-us" },
  { label: "চলমান ব্যাচসমূহ", href: "#batches" },
  { label: "দৈনন্দিন ক্লাস ডায়েরি", href: "/class-diary" },
  { label: "ভিডিও লেকচার", href: "#videos" },
  { label: "প্রাইভেট ব্যাচে ভর্তি", href: "#admission" },
];

export default function Footer() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<"bn" | "en">("bn");

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", !isDark);
  };

  const toggleLanguage = () => {
    setLang(lang === "bn" ? "en" : "bn");
  };

  return (
    <footer className="relative bg-sky-950 px-6 pt-16 pb-12 sm:px-8 sm:pt-20 lg:px-12 text-slate-100">
      {/* টপ সূক্ষ্ম ডিভাইডার আভা */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl gap-10 sm:gap-12 md:grid-cols-12">
        {/* ১. ব্র্যান্ড পরিচিতি ও ভিশন (একাডেমিক টোন) */}
        <div className="md:col-span-5 flex flex-col items-start">
          <p className="font-body text-xl font-black tracking-tight text-white sm:text-2xl">
            Ahsan&apos;s Learning Academy
          </p>
          <p className="mt-1.5 font-body text-xs font-bold text-sky-400">
            Better Learning, Brighter Future
          </p>
          <p className="mt-4 max-w-sm font-body text-xs sm:text-[13.5px] leading-[1.8] text-slate-300">
            উচ্চমাধ্যমিক শিক্ষার্থীদের ইংরেজি ও আইসিটি বিষয়ে মৌলিক ধারণা স্পষ্টকরণ এবং বোর্ড পরীক্ষার সর্বোচ্চ প্রস্তুতির জন্য একটি নির্ভরযোগ্য ও আধুনিক শিক্ষা প্ল্যাটফর্ম।
          </p>

          {/* সোশ্যাল লিংকস */}
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-sky-400 hover:bg-sky-600 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ২. দরকারি লিংকসমূহ */}
        <div className="md:col-span-3">
          <p className="font-body text-sm font-bold tracking-wide text-white sm:text-base">
            প্রয়োজনীয় লিংক
          </p>
          <ul className="mt-4 space-y-2.5 font-body text-xs sm:text-[13.5px] text-slate-300">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-sky-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ৩. ক্যাম্পাস ও যোগাযোগ (নো-ইমোজি, শার্প SVG আইকন) */}
        <div className="md:col-span-4">
          <p className="font-body text-sm font-bold tracking-wide text-white sm:text-base">
            ক্যাম্পাস ও যোগাযোগ
          </p>
          <ul className="mt-4 space-y-3.5 font-body text-xs sm:text-[13.5px] text-slate-300">
            <li className="flex items-start gap-3">
              <svg className="h-4 w-4 shrink-0 text-sky-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="leading-relaxed">কলেজ রোড, চৌদ্দগ্রাম সরকারি কলেজ সংলগ্ন, চৌদ্দগ্রাম, কুমিল্লা</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="h-4 w-4 shrink-0 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+8801845435539" className="transition-colors hover:text-white">
                +880 1845-435539
              </a>
            </li>
            <li className="flex items-center gap-3">
              <svg className="h-4 w-4 shrink-0 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3a9 9 0 00-7.8 13.4L3 21l4.7-1.2A9 9 0 1012 3zm4.7 12.8c-.2.5-1.1 1-1.5 1.1-.4.1-.9.1-1.4-.1-.3-.1-.8-.3-1.3-.5-2.3-.9-3.8-3.3-3.9-3.4-.1-.2-.9-1.3-.9-2.4s.6-1.7.8-1.9c.2-.2.5-.3.6-.3h.5c.1 0 .3 0 .5.4.2.5.6 1.6.7 1.7 0 .1.1.3 0 .4-.1.2-.1.3-.2.4-.1.2-.2.3-.3.4-.1.1-.2.2-.1.4.2.3.6.9 1.2 1.5.8.7 1.5.9 1.7 1 .2.1.3.1.4 0 .1-.1.5-.6.6-.8.2-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.1.4.3 0 .1 0 .5-.2 1z" />
              </svg>
              <a
                href="https://wa.me/8801845435539"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-emerald-300"
              >
                WhatsApp এ মেসেজ দিন
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ফুটার কন্ট্রোল বার ও ডেভেলপার ক্রেডিট */}
      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
        {/* কপিরাইট, পলিসি ও ডেভেলপার ক্রেডিট */}
        <div className="flex flex-col items-center gap-2 sm:items-start text-center sm:text-left">
          <p>© {new Date().getFullYear()} Ahsan&apos;s Learning Academy. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11.5px]">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              গোপনীয়তা নীতি
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="transition-colors hover:text-white">
              ব্যবহারের শর্তাবলী
            </Link>
            <span className="text-white/20">|</span>
            <span>
              Developed by{" "}
              <a
                href="https://www.facebook.com/share/19hpNhp7Tx/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-sky-400 transition-colors hover:text-sky-300 hover:underline"
              >
                Mehedi
              </a>
            </span>
          </div>
        </div>

        {/* ভাষা ও থিম বাটন */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-body text-xs text-slate-200 transition-all hover:bg-white/10 active:scale-95"
          >
            <span>{lang === "bn" ? "Language: বাংলা" : "Language: English"}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-body text-xs text-slate-200 transition-all hover:bg-white/10 active:scale-95"
          >
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
