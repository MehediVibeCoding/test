"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "পরিচিতি", href: "#about" },
  { label: "কেন একাডেমি", href: "#why-us" },
  { label: "ব্যাচসমূহ", href: "#batches" },
  { label: "ক্লাস ডায়েরি", href: "#class-diary" },
  { label: "ভিডিও", href: "#videos" },
  { label: "যোগাযোগ", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<"bn" | "en">("bn");

  // স্ক্রল ডিটেকশন
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // মোবাইল মেনু চলাকালীন ব্যাকগ্রাউন্ড স্ক্রল বন্ধ রাখা
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ডার্ক মোড টগল হ্যান্ডলার
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // ভাষা পরিবর্তন হ্যান্ডলার (ডেমো টগল)
  const toggleLanguage = () => {
    setLang(lang === "bn" ? "en" : "bn");
  };

  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-2 sm:px-6 sm:pt-3">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-3.5 py-2.5 transition-all duration-300 sm:px-5 sm:py-3 ${
          scrolled
            ? "border-sky-200/80 bg-white/90 shadow-sm backdrop-blur-md"
            : "border-sky-100/60 bg-white/70 shadow-sm backdrop-blur-sm"
        }`}
      >
        {/* ব্র্যান্ড লোগো ও নাম (মোবাইলেও পরিচ্ছন্নভাবে দেখাবে) */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-700 to-sky-500 font-bold text-white shadow-sm">
            AU
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-sky-950 sm:text-base">
              Ahsan&apos;s Academy
            </span>
            <span className="text-[10px] font-medium text-sky-700 leading-none">
              HSC English &amp; ICT
            </span>
          </div>
        </a>

        {/* ডেক্সটপ মেনু লিংক */}
        <ul className="hidden items-center gap-5 text-sm font-medium text-ink-800 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-sky-600 focus:outline-none"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ডানদিকের কন্ট্রোল: থিম, ভাষা ও ভর্তি বাটন */}
        <div className="flex items-center gap-2">
          {/* ভাষা পরিবর্তন বাটন */}
          <button
            onClick={toggleLanguage}
            title="ভাষা পরিবর্তন / Switch Language"
            className="flex h-8 items-center gap-1 rounded-lg border border-sky-100 bg-sky-50/80 px-2 text-xs font-semibold text-sky-900 transition-colors hover:bg-sky-100"
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

          {/* লাইট / ডার্ক মোড টগল বাটন */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-sky-100 bg-sky-50/80 text-sky-800 transition-colors hover:bg-sky-100"
          >
            {isDark ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* ভর্তি ফরম বাটন (ডেক্সটপ) */}
          <a
            href="#admission"
            className="hidden rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700 sm:inline-block"
          >
            ভর্তি হও
          </a>

          {/* মোবাইল আধুনিক স্টাইলিশ ৩-ডট/মেনু বাটন */}
          <button
            aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-sky-200/80 bg-white text-sky-950 shadow-sm transition-colors hover:bg-sky-50 lg:hidden"
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <span
                className={`block h-1 w-1 rounded-full bg-sky-950 transition-all duration-300 ${
                  open ? "scale-125 bg-red-600" : ""
                }`}
              />
              <span
                className={`block h-1 w-1 rounded-full bg-sky-950 transition-all duration-300 ${
                  open ? "scale-125 bg-red-600" : ""
                }`}
              />
              <span
                className={`block h-1 w-1 rounded-full bg-sky-950 transition-all duration-300 ${
                  open ? "scale-125 bg-red-600" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* মোবাইল ড্রয়ার মেনু */}
      <div
        className={`mt-2 overflow-hidden rounded-2xl border border-sky-100 bg-white/95 shadow-md backdrop-blur-md transition-all duration-300 lg:hidden ${
          open ? "max-h-96 opacity-100 p-4" : "pointer-events-none max-h-0 opacity-0 p-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-ink-800 transition-colors hover:bg-sky-50 hover:text-sky-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#admission"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-xl bg-sky-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
          >
            ভর্তি ফর্ম পূরণ করো
          </a>
        </div>
      </div>
    </header>
  );
}
