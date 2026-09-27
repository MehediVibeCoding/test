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
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<"bn" | "en">("bn");

  // স্ক্রল ডিটেকশন — স্ক্রল করলে হালকা বটম-বর্ডার/ব্লার যোগ হবে, নাহলে বার সম্পূর্ণ ফ্ল্যাট/স্বচ্ছ
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
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
    document.documentElement.classList.toggle("dark", !isDark);
  };

  // ভাষা পরিবর্তন হ্যান্ডলার (ডেমো টগল)
  const toggleLanguage = () => {
    setLang(lang === "bn" ? "en" : "bn");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "border-b border-sky-100 bg-white/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* বাম পাশে: শুধু একাডেমির নাম ও তার নিচে স্লোগান — কোনো লোগো নেই */}
        <ScrollLink targetId="top" className="flex flex-col leading-tight">
          <span className="text-sm font-bold text-sky-950 sm:text-base">
            Ahsan&apos;s Learning Academy
          </span>
          <span className="text-[10px] font-semibold tracking-wide text-sky-700 sm:text-[11px]">
            Better Learning, Brighter Future
          </span>
        </ScrollLink>

        {/* মাঝখানে: ডেক্সটপ মেনু লিংক */}
        <ul className="hidden items-center gap-6 text-sm font-medium text-ink-800 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <ScrollLink
                targetId={link.id}
                className="transition-colors hover:text-sky-600 focus:outline-none"
              >
                {link.label}
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* ডানদিকে: ভাষা/থিম আইকন (ব্যাকগ্রাউন্ড ছাড়া) + একটিমাত্র সলিড ভর্তি বাটন */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* ভাষা পরিবর্তন — শুধু আইকন, কোনো বক্স/ব্যাকগ্রাউন্ড নেই */}
          <button
            onClick={toggleLanguage}
            aria-label="ভাষা পরিবর্তন করুন"
            title="ভাষা পরিবর্তন / Switch Language"
            className="flex items-center gap-1 text-sky-700 transition-colors hover:text-sky-900"
          >
            <svg
              className="h-[18px] w-[18px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <span className="hidden text-xs font-semibold sm:inline">
              {lang === "bn" ? "বাং" : "EN"}
            </span>
          </button>

          {/* লাইট / ডার্ক মোড টগল — শুধু আইকন, কোনো বক্স/ব্যাকগ্রাউন্ড নেই */}
          <button
            onClick={toggleTheme}
            aria-label="থিম পরিবর্তন করুন"
            className="text-sky-700 transition-colors hover:text-sky-900"
          >
            {isDark ? (
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* ভর্তি ফরম বাটন (ডেক্সটপ/ট্যাব) — একটিমাত্র সলিড কালার বাটন */}
          <ScrollLink
            targetId="admission"
            className="crystal-btn-solid hidden rounded-xl px-4 py-2 text-xs font-bold sm:inline-flex sm:items-center sm:justify-center"
          >
            ভর্তি হও
          </ScrollLink>

          {/* মোবাইল হ্যামবার্গার মেনু বাটন — কোনো বক্স/বর্ডার নেই */}
          <button
            aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center text-sky-950 lg:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      <div
        className={`overflow-hidden bg-white/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          open
            ? "max-h-96 border-b border-sky-100 opacity-100"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
          {NAV_LINKS.map((link) => (
            <ScrollLink
              key={link.id}
              targetId={link.id}
              onNavigate={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink-800 transition-colors hover:bg-sky-50 hover:text-sky-700"
            >
              {link.label}
            </ScrollLink>
          ))}
          {/* শুধু ছোট মোবাইলে (যেখানে টপ বারে বাটনটা দেখা যায় না) ড্রপডাউনেও বাটন দেখানো হচ্ছে */}
          <ScrollLink
            targetId="admission"
            onNavigate={() => setOpen(false)}
            className="crystal-btn-solid mt-1 flex items-center justify-center rounded-xl px-4 py-2.5 text-center text-sm font-bold sm:hidden"
          >
            ভর্তি হও
          </ScrollLink>
        </div>
      </div>
    </header>
  );
}
