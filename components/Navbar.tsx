"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

  // মোবাইল মেনু খোলা অবস্থায় বডি স্ক্রল লক
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ডার্ক মোড টগল
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark", !isDark);
  };

  // ভাষা পরিবর্তন টগল
  const toggleLanguage = () => {
    setLang(lang === "bn" ? "en" : "bn");
  };

  return (
    <header className="absolute top-0 inset-x-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-5 pb-2 sm:px-8 lg:px-12">
        {/* ১. বাম পাশে: টাইট স্পেসিং ও মাঝ বরাবর অ্যালাইন করা নাম ও ইটালিক স্লোগান */}
        <ScrollLink targetId="top" className="flex flex-col items-center text-center group cursor-pointer leading-tight">
          <span className="font-body text-base font-black tracking-tight text-sky-950 transition-colors group-hover:text-sky-700 sm:text-lg leading-tight">
            Ahsan&apos;s Learning Academy
          </span>
          <span className="font-display italic text-[11px] font-semibold tracking-wide text-sky-700 sm:text-xs -mt-0.5 leading-tight">
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

        {/* ৩. ডানপাশে: মিনিমাল আইকন ক্যাপসুল + স্কাই-ব্লু ভর্তি বাটন */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* স্লিক মিনিমাল পিল টগল ফ্রেম */}
          <div className="flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-white/80 p-1.5 shadow-xs backdrop-blur-sm">
            {/* ভাষা পরিবর্তন আইকন (গ্লোব) */}
            <button
              onClick={toggleLanguage}
              aria-label="ভাষা পরিবর্তন করুন / Switch Language"
              title="Switch Language"
              className="flex h-7 w-7 items-center justify-center rounded-full text-sky-950 transition-all hover:bg-sky-100/70"
            >
              <svg className="h-4 w-4 text-sky-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </button>

            <span className="h-3.5 w-px bg-sky-200" />

            {/* লাইট / ডার্ক মোড টগল আইকন */}
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
                    strokeWidth={1.8}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="h-4 w-4 text-sky-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* ব্র্যান্ড স্কাই-ব্লু ভর্তি বাটন (ডেস্কটপ) */}
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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-200/80 bg-white/80 text-sky-950 shadow-xs backdrop-blur-sm lg:hidden transition-all active:scale-90"
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 top-full mt-2 overflow-hidden rounded-3xl border border-sky-100 bg-white/95 p-6 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <ScrollLink
                  key={link.id}
                  targetId={link.id}
                  onNavigate={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 font-body text-sm font-bold text-sky-950 transition-colors hover:bg-sky-50 active:bg-sky-100"
                >
                  {link.label}
                </ScrollLink>
              ))}
              <ScrollLink
                targetId="admission"
                onNavigate={() => setOpen(false)}
                className="mt-3 flex items-center justify-center rounded-full bg-sky-600 py-3.5 text-center font-body text-sm font-bold text-white shadow-sm hover:bg-sky-700 active:scale-95"
              >
                ভর্তি হও
              </ScrollLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
