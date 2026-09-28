"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";

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

export default function Footer() {
  const { language, theme, toggleLanguage, toggleTheme, t } = useApp();

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.whyUs, href: "#why-us" },
    { label: t.nav.batches, href: "#batches" },
    { label: t.nav.classDiary, href: "/class-diary" },
    { label: t.nav.videos, href: "#videos" },
    { label: t.nav.enrollBtn, href: "#admission" },
  ];

  return (
    <footer className="relative bg-[#0a1f33] dark:bg-[#06111e] px-6 pt-16 pb-12 sm:px-8 sm:pt-20 lg:px-12 text-slate-100 transition-colors">
      {/* টপ সূক্ষ্ম ডিভাইডার আভা */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl gap-10 sm:gap-12 md:grid-cols-12">
        {/* ১. ব্র্যান্ড পরিচিতি ও সোশ্যাল আইকন (স্কাই-ব্লু থিমে রূপান্তরিত) */}
        <div className="md:col-span-5 flex flex-col items-start">
          <p className="font-body text-xl font-black tracking-tight text-white sm:text-2xl">
            Ahsan&apos;s Learning Academy
          </p>
          <p className="mt-1.5 font-body text-xs font-bold text-sky-400">
            {t.footer.brandTag}
          </p>
          <p className="mt-4 max-w-sm font-body text-xs sm:text-[13.5px] leading-[1.8] text-slate-300">
            {t.footer.vision}
          </p>

          {/* স্কাই-ব্লু থিম সোশ্যাল লিংকস */}
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/40 bg-sky-500/10 text-sky-400 shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:border-sky-400 hover:bg-sky-500 hover:text-white active:scale-95"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ২. দরকারি লিংকসমূহ */}
        <div className="md:col-span-3">
          <p className="font-body text-sm font-bold tracking-wide text-white sm:text-base">
            {t.footer.quickLinks}
          </p>
          <ul className="mt-4 space-y-2.5 font-body text-xs sm:text-[13.5px] text-slate-300">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-sky-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ৩. ক্যাম্পাস ও যোগাযোগ */}
        <div className="md:col-span-4">
          <p className="font-body text-sm font-bold tracking-wide text-white sm:text-base">
            {t.footer.campusContact}
          </p>
          <ul className="mt-4 space-y-3.5 font-body text-xs sm:text-[13.5px] text-slate-300">
            <li className="flex items-start gap-3">
              <svg className="h-4 w-4 shrink-0 text-sky-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="leading-relaxed">{t.location.address}</span>
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
                {language === "bn" ? "WhatsApp এ মেসেজ দিন" : "Message on WhatsApp"}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ফুটার কন্ট্রোল বার ও ডেভেলপার ক্রেডিট */}
      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row">
        {/* কপিরাইট, পলিসি ও ডেভেলপার ক্রেডিট */}
        <div className="flex flex-col items-center gap-2 sm:items-start text-center sm:text-left">
          <p>© {new Date().getFullYear()} Ahsan&apos;s Learning Academy. {t.footer.rights}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11.5px]">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              {t.footer.privacy}
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="transition-colors hover:text-white">
              {t.footer.terms}
            </Link>
            <span className="text-white/20">|</span>
            <span>
              {t.footer.developedBy}{" "}
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

        {/* ভাষা ও থিম বাটন (গ্লোবাল স্টেট সিঙ্ক) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 font-body text-xs text-sky-300 transition-all hover:bg-sky-500/20 active:scale-95"
          >
            <span>{language === "bn" ? "Language: English" : "Language: বাংলা"}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 font-body text-xs text-sky-300 transition-all hover:bg-sky-500/20 active:scale-95"
          >
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
