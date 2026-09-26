"use client";

import { useState } from "react";

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
  { label: "দৈনন্দিন ক্লাস ডায়েরি", href: "#class-diary" },
  { label: "ভিডিও লেকচার", href: "#videos" },
  { label: "প্রাইভেট ব্যাচে ভর্তি", href: "#admission" },
];

export default function Footer() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<"bn" | "en">("bn");

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleLanguage = () => {
    setLang(lang === "bn" ? "en" : "bn");
  };

  return (
    <footer className="relative bg-sky-950 px-4 pb-10 pt-16 text-cloud-50">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        {/* ব্র্যান্ড পরিচিতি ও ভিশন */}
        <div className="md:col-span-2">
          <p className="text-xl font-bold text-white">
            Ahsan&apos;s Learning Academy
          </p>
          <p className="mt-2 font-display text-xs font-semibold text-sky-400">
            Better Learning, Brighter Future
          </p>
          <p className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-sky-100/80">
            ৪০তম বিসিএস (সাধারণ শিক্ষা ক্যাডার) কর্মকর্তা ও চৌদ্দগ্রাম সরকারি কলেজের প্রভাষক
            মোঃ আহসান উল্লাহ স্যারের প্রত্যক্ষ তত্ত্বাবধানে HSC English ও ICT-র আধুনিক ও সফল
            প্রস্তুতির প্ল্যাটফর্ম।
          </p>

          {/* সোশ্যাল লিংকস */}
          <div className="mt-5 flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-sky-100 transition-all hover:bg-sky-600 hover:text-white"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* দরকারি লিংকসমূহ */}
        <div className="text-xs sm:text-sm text-sky-100/80">
          <p className="font-bold text-white">প্রয়োজনীয় লিংক</p>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* সরাসরি যোগাযোগ */}
        <div className="text-xs sm:text-sm text-sky-100/80">
          <p className="font-bold text-white">ক্যাম্পাস ও যোগাযোগ</p>
          <ul className="mt-3 space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="text-sky-400">📍</span>
              <span>কলেজ রোড, চৌদ্দগ্রাম সরকারি কলেজ সংলগ্ন, চৌদ্দগ্রাম, কুমিল্লা</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-sky-400">📞</span>
              <a href="tel:+8801845435539" className="hover:text-white">
                +880 1845-435539
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">💬</span>
              <a
                href="https://wa.me/8801845435539"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp এ মেসেজ দিন
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ফুটার কন্ট্রোল বার (ভাষা পরিবর্তন, থিম মোড ও কপিরাইট) */}
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-sky-100/70 sm:flex-row">
        <p>© {new Date().getFullYear()} Ahsan&apos;s Learning Academy. সর্বস্বত্ব সংরক্ষিত।</p>

        {/* ল্যাঙ্গুয়েজ ও থিম বাটন */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 rounded-md border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white hover:bg-white/10"
          >
            <span>🌐</span>
            <span>{lang === "bn" ? "Language: বাংলা" : "Language: English"}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 rounded-md border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white hover:bg-white/10"
          >
            <span>{isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
