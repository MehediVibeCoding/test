"use client";

import { useEffect, useState } from "react";

// Anchor links match the actual section ids on the page (single-page site)
const NAV_LINKS = [
  { label: "পরিচিতি", href: "#about" },
  { label: "ব্যাচসমূহ", href: "#batches" },
  { label: "ক্লাস ডায়েরি", href: "#class-diary" },
  { label: "ভিডিও", href: "#videos" },
  { label: "ব্লগ", href: "#blog" },
  { label: "যোগাযোগ", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Prevent background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-4 z-50 mx-4 md:mx-auto md:max-w-5xl">
      <nav className="glass-panel-premium flex items-center justify-between px-5 py-3">
        <a href="#" className="flex items-center gap-2 font-display font-semibold text-sky-950">
          {/* 🔧 replace with real logo image */}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 text-sm text-white">
            AL
          </span>
          <span className="hidden sm:inline">Ahsan&apos;s Learning Academy</span>
        </a>

        <ul className="hidden items-center gap-6 text-sm text-ink-800 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-sky-600">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#admission"
          className="btn-glow hidden rounded-full bg-sky-600 px-5 py-2 text-sm font-medium text-white hover:bg-sky-700 md:inline-block"
        >
          ভর্তি হও
        </a>

        <button
          aria-label={open ? "মেনু বন্ধ করো" : "মেনু খুলো"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-sky-950 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "top-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "top-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* mobile menu */}
      <div
        className={`glass-panel-premium mt-2 overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 p-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm text-ink-800 transition-colors hover:bg-sky-100"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#admission"
            onClick={() => setOpen(false)}
            className="btn-glow mt-2 rounded-full bg-sky-600 px-4 py-2.5 text-center text-sm font-medium text-white"
          >
            ভর্তি হও
          </a>
        </div>
      </div>
    </header>
  );
}
