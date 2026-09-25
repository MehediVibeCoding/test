"use client";

import { useState } from "react";

// 🔧 placeholder nav links — adjust paths once real pages exist
const NAV_LINKS = [
  { label: "হোম", href: "/" },
  { label: "পরিচিতি", href: "/about" },
  { label: "ব্যাচসমূহ", href: "/batches" },
  { label: "ক্লাস ডায়েরি", href: "/class-diary" },
  { label: "ব্লগ", href: "/blog" },
  { label: "যোগাযোগ", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-4 md:mx-auto md:max-w-5xl">
      <nav className="glass-panel flex items-center justify-between px-5 py-3">
        <a href="/" className="flex items-center gap-2 font-display font-semibold text-sky-950">
          {/* 🔧 replace with real logo image */}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 text-white text-sm">
            AL
          </span>
          <span className="hidden sm:inline">Ahsan&apos;s Learning Academy</span>
        </a>

        <ul className="hidden md:flex items-center gap-6 text-sm text-ink-800">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-sky-600 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/admission"
          className="hidden md:inline-block rounded-full bg-sky-600 px-5 py-2 text-sm font-medium text-white hover:bg-sky-700 transition-colors"
        >
          ভর্তি হও
        </a>

        <button
          aria-label="মেনু খুলুন"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-sky-950"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="glass-panel mt-2 flex flex-col gap-1 p-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-ink-800 hover:bg-sky-100"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/admission"
            className="mt-2 rounded-full bg-sky-600 px-4 py-2 text-center text-sm font-medium text-white"
          >
            ভর্তি হও
          </a>
        </div>
      )}
    </header>
  );
}
