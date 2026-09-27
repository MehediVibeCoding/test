"use client";

import { useEffect, useState } from "react";
import ScrollLink from "./ScrollLink";

const NAV_LINKS = [
  { label: "পরিচিতি", id: "about" },
  { label: "কেন একাডেমি", id: "why-us" },
  { label: "ব্যাচসমূহ", id: "batches" },
  { label: "ক্লাস ডায়েরি", id: "class-diary" },
  { label: "ভিডিও", id: "videos" },
  { label: "যোগাযোগ", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<"bn" | "en">("bn");

  // মোবাইল মেনু খোলা থাকলে ব্যাকগ্রাউন্ড স্ক্রল লক রাখা
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ডার্ক মোড টগল হ্যান্ডলার
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", !isDark);
  };

  // ভাষা পরিবর্তন হ্যান্ডলার
  const toggleLanguage = () => {
    setLang(lang === "bn" ? "en" : "bn");
  };

  return (
    <header className="absolute top-0 inset-x-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-6 pb-2 sm:px-8 lg:px-12">
        {/* ১. বাম পাশে: একাডেমির নাম ও স্লোগান (হিরো ব্যাকগ্রাউন্ডের ওপর সরাসরি) */}
        <ScrollLink targetId="top" className="flex flex-col text-left group">
          <span className="font-body text-base font-black tracking-tight text-sky-950 transition-colors group-hover:text-sky-700 sm:text-lg">
            Ahsan&apos;s Learning Academy
          </span>
          <span className="font-body text-[11px] font-semibold tracking-wide text-sky-800/80 sm:text-xs">
            Better Learning, Brighter Future
          </span>
        </ScrollLink>

        {/* ২. মাঝখানে: ডেক্সটপ মেনু লিংকসমূহ */}
        <nav className="hidden items-center gap-7 text-[13.5px] font-semibold text-sky-950 lg:flex">
          {NAV_LINKS.map((link) => (
            <ScrollLink
              key={link.id}
              targetId={link.id}
              className="transition-colors hover:text-sky-600 focus:outline-none"
            >
              {link.label}
            </ScrollLink>
          ))}
        </nav>

        {/* ৩. ডানপাশে: ক্যাপসুল সুইচার + স্কাই-ব্লু ভর্তি বাটন */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* ভাষা ও ডার্ক মোড ক্যাপসুল */}
          <div className="flex items-center gap-1 rounded-full border border-sky-200/80 bg-white/70 p-1 shadow-xs backdrop-blur-sm">
            <button
              onClick={toggleLanguage}
              aria-label="ভাষা পরিবর্তন করুন"
              title="ভাষা পরিবর্তন / Switch Language"
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-sky-950 transition-all hover:bg-sky-100/70"
            >
              <svg
                className="h-3.5 w-3.5 text-sky-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              <span>{lang === "bn" ? "বাং" : "EN"}</span>
            </button>

            <span className="h-3 w-px bg-sky-200" />

            <button
              onClick={toggleTheme}
              aria-label="থিম পরিবর্তন করুন"
              title="থিম পরিবর্তন করুন"
              className="flex h-7 w-7 items-center justify-center rounded-full text-sky-950 transition-all hover:bg-sky-100/70"
            >
              {isDark ? (
                <svg className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="h-4 w-4 text-sky-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* ব্র্যান্ড স্কাই-ব্লু বাটন */}
          <ScrollLink
            targetId="admission"
            className="hidden rounded-full bg-sky-600 px-6 py-2.5 font-body text-xs font-bold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-95 sm:inline-flex sm:items-center sm:justify-center"
          >
            ভর্তি হও
          </ScrollLink>

          {/* মোবাইল মেনু বাটন */}
          <button
            aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 text-sky-950 lg:hidden shadow-xs"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {open && (
        <div className="absolute inset-x-0 top-full bg-white/95 px-6 py-5 shadow-lg backdrop-blur-md border-b border-sky-100 lg:hidden">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <ScrollLink
                key={link.id}
                targetId={link.id}
                onNavigate={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 font-body text-sm font-semibold text-sky-950 transition-colors hover:bg-sky-50"
              >
                {link.label}
              </ScrollLink>
            ))}
            <ScrollLink
              targetId="admission"
              onNavigate={() => setOpen(false)}
              className="mt-2 flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-center font-body text-sm font-bold text-white shadow-sm hover:bg-sky-700"
            >
              ভর্তি হও
            </ScrollLink>
          </div>
        </div>
      )}
    </header>
  );
}
