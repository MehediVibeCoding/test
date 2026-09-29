"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import ScrollLink from "./ScrollLink";
import { useApp } from "@/context/AppContext";

const SUBMISSION_LOCK_KEY = "ala_admission_locked_session";
const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const { language, theme, toggleLanguage, toggleTheme, t } = useApp();

  // মোবাইল মেনু খোলা অবস্থায় বডি স্ক্রল লক
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ২ ঘণ্টার লক সেশন চেক (ভর্তি বাটন ডিসেবল্ড করার জন্য)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SUBMISSION_LOCK_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const elapsed = Date.now() - parsed.timestamp;
        if (elapsed < TWO_HOURS_IN_MS && parsed.data) {
          setIsLocked(true);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  const navLinks = [
    { label: t.nav.about, id: "about" },
    { label: t.nav.whyUs, id: "why-us" },
    { label: t.nav.batches, id: "batches" },
    { label: t.nav.classDiary, id: "class-diary", href: "/class-diary" },
    { label: t.nav.videos, id: "videos" },
    { label: t.nav.contact, id: "contact" },
  ];

  return (
    <header className="absolute top-0 inset-x-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-5 pb-2 sm:px-8 lg:px-12">
        {/* ১. বাম পাশে: একাডেমি লোগো/নাম ও স্লোগান */}
        <ScrollLink
          targetId="top"
          className="flex flex-col items-center group cursor-pointer leading-tight text-center"
        >
          <span className="font-body text-base font-black tracking-tight text-sky-950 dark:text-white transition-colors group-hover:text-sky-600 dark:group-hover:text-sky-400 sm:text-lg leading-tight">
            Ahsan&apos;s Learning Academy
          </span>
          <span className="font-body italic text-[11px] font-bold tracking-wide text-sky-700 dark:text-sky-300 sm:text-xs -mt-0.5 leading-tight">
            {t.footer.brandTag}
          </span>
        </ScrollLink>

        {/* ২. মাঝখানে: ডেস্কটপ মেনু লিংকসমূহ */}
        <nav className="hidden items-center gap-7 text-[13.5px] font-bold text-sky-950 dark:text-slate-200 lg:flex">
          {navLinks.map((link) =>
            link.href ? (
              <Link
                key={link.id}
                href={link.href}
                className="transition-colors hover:text-sky-600 dark:hover:text-sky-400 focus:outline-none"
              >
                {link.label}
              </Link>
            ) : (
              <ScrollLink
                key={link.id}
                targetId={link.id}
                className="transition-colors hover:text-sky-600 dark:hover:text-sky-400 focus:outline-none"
              >
                {link.label}
              </ScrollLink>
            )
          )}
        </nav>

        {/* ৩. ডানপাশে: মিনিমাল আইকন ক্যাপসুল + ভর্তি বাটন */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* স্লিক মিনিমাল পিল টগল ফ্রেম */}
          <div className="flex items-center gap-1.5 rounded-full border border-sky-200/80 dark:border-sky-800/80 bg-white/80 dark:bg-slate-900/80 p-1.5 shadow-xs backdrop-blur-md">
            {/* ভাষা পরিবর্তন বাটন (গ্লোব) */}
            <button
              onClick={toggleLanguage}
              aria-label="Language Toggle"
              title={language === "bn" ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
              className="flex h-7 px-2 items-center justify-center gap-1 rounded-full text-xs font-bold text-sky-950 dark:text-sky-200 transition-all hover:bg-sky-100/70 dark:hover:bg-slate-800"
            >
              <svg className="h-3.5 w-3.5 text-sky-700 dark:text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <span>{language === "bn" ? "EN" : "বাং"}</span>
            </button>

            <span className="h-3.5 w-px bg-sky-200 dark:bg-sky-800" />

            {/* লাইট / ডার্ক মোড টগল আইকন */}
            <button
              onClick={toggleTheme}
              aria-label="Theme Toggle"
              title={theme === "dark" ? "Light Mode" : "Dark Mode"}
              className="flex h-7 w-7 items-center justify-center rounded-full text-sky-950 dark:text-sky-200 transition-all hover:bg-sky-100/70 dark:hover:bg-slate-800"
            >
              {theme === "dark" ? (
                <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

          {/* ব্র্যান্ড ভর্তি বাটন (ডেস্কটপ - ২ ঘণ্টার লক সমন্বিত) */}
          <ScrollLink
            targetId="admission"
            noRipple
            className={`hidden rounded-full px-5 py-2 font-body text-xs font-bold shadow-xs sm:inline-flex sm:items-center sm:justify-center transition-all ${
              isLocked
                ? "bg-slate-400 text-white opacity-50 cursor-not-allowed pointer-events-none"
                : "btn-gradient text-white active:scale-95"
            }`}
          >
            {t.nav.enrollBtn}
          </ScrollLink>

          {/* মোবাইল মেনু বাটন */}
          <button
            aria-label={open ? "Close Menu" : "Open Menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-200/80 dark:border-sky-800 bg-white/80 dark:bg-slate-900/80 text-sky-950 dark:text-white shadow-xs backdrop-blur-md lg:hidden transition-all active:scale-90"
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
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 top-full mt-2 overflow-hidden rounded-3xl border border-sky-100 dark:border-sky-900 bg-white/95 dark:bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) =>
                link.href ? (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 font-body text-sm font-bold text-sky-950 dark:text-slate-100 transition-colors hover:bg-sky-50 dark:hover:bg-slate-800"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <ScrollLink
                    key={link.id}
                    targetId={link.id}
                    onNavigate={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 font-body text-sm font-bold text-sky-950 dark:text-slate-100 transition-colors hover:bg-sky-50 dark:hover:bg-slate-800"
                  >
                    {link.label}
                  </ScrollLink>
                )
              )}
              <ScrollLink
                targetId="admission"
                onNavigate={() => setOpen(false)}
                noRipple
                className={`mt-3 flex items-center justify-center rounded-full py-3 text-center font-body text-sm font-bold shadow-sm ${
                  isLocked
                    ? "bg-slate-400 text-white opacity-50 cursor-not-allowed pointer-events-none"
                    : "btn-gradient text-white active:scale-95"
                }`}
              >
                {t.nav.enrollBtn}
              </ScrollLink>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
