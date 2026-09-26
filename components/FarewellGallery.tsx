"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";

// 🔧 placeholder মেমোরি — প্রতিটিতে পরে imageUrl যোগ করলেই আসল ছবি বসে যাবে,
// লেআউট/ফিল্টার/লাইটবক্স লজিক অপরিবর্তিত থাকবে।
const MEMORIES = [
  { id: 1, batch: "HSC 2025 বিদায় সংবর্ধনা", caption: "বিদায়ের ক্ষণে ভালোবাসার উপহার" },
  { id: 2, batch: "HSC 2025 বিদায় সংবর্ধনা", caption: "বোর্ড পরীক্ষার আগের শেষ মোটিভেশন ক্লাস" },
  { id: 3, batch: "HSC 2025 বিদায় সংবর্ধনা", caption: "একসাথে শেষ গ্রুপ ছবি" },
  { id: 4, batch: "HSC 2026 বিদায় উৎসব", caption: "ফুল দিয়ে বরণ, চোখে জমে থাকা কৃতজ্ঞতা" },
  { id: 5, batch: "HSC 2026 বিদায় উৎসব", caption: "সিনিয়রদের হাতে স্মৃতি উপহার" },
  { id: 6, batch: "ক্লাসরুম মোমেন্টস", caption: "পরীক্ষার ফল প্রকাশের আনন্দঘন মুহূর্ত" },
  { id: 7, batch: "ক্লাসরুম মোমেন্টস", caption: "গ্রুপ স্টাডি ও আড্ডার ফাঁকে" },
  { id: 8, batch: "HSC 2026 বিদায় উৎসব", caption: "শিক্ষক-শিক্ষার্থীর আন্তরিক বন্ধন" },
];

const FILTERS = ["সব স্মৃতি", "HSC 2025 বিদায় সংবর্ধনা", "HSC 2026 বিদায় উৎসব", "ক্লাসরুম মোমেন্টস"];

export default function FarewellGallery() {
  const [selected, setSelected] = useState("সব স্মৃতি");
  const [activeMemory, setActiveMemory] = useState<(typeof MEMORIES)[number] | null>(null);

  const filtered = useMemo(
    () =>
      selected === "সব স্মৃতি"
        ? MEMORIES
        : MEMORIES.filter((m) => m.batch === selected),
    [selected]
  );

  return (
    <section
      id="memories"
      className="relative overflow-hidden px-4 py-16 sm:py-20"
      style={{
        background:
          "radial-gradient(circle at 15% 15%, rgba(56,189,248,0.10) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(2,132,199,0.08) 0%, transparent 55%), #0a1f33",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-8 text-center">
          <span className="inline-flex rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-sky-300">
            বিদায় সংবর্ধনা ও স্মৃতি
          </span>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            যে মুহূর্তগুলো আমাদের গর্বিত করে
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-sky-100/75 leading-relaxed">
            বিদায় অনুষ্ঠানের আবেগঘন মুহূর্ত, শিক্ষকের সাথে শিক্ষার্থীদের বন্ধন — একেকটা ছবি
            বলে দেয় এই একাডেমিতে কতটা যত্ন নিয়ে পড়ানো হয়।
          </p>
        </Reveal>

        {/* ব্যাচভিত্তিক ফিল্টার */}
        <Reveal className="mb-8 flex flex-wrap justify-center gap-2" delay={80}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setSelected(f)}
              className={`hover-lift rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                selected === f
                  ? "bg-sky-400 text-sky-950"
                  : "bg-white/10 text-sky-100 hover:bg-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        {/* ইন্টারঅ্যাক্টিভ কার্ড গ্রিড — ক্লিক করলে ফুলস্ক্রিন লাইটবক্সে বড় হয়ে দেখাবে */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {filtered.map((memory, i) => (
            <Reveal key={memory.id} delay={i * 60}>
              <button
                onClick={() => setActiveMemory(memory)}
                className="group relative flex aspect-square w-full flex-col justify-end overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.03] text-left transition-transform duration-300 hover:-translate-y-1 hover:border-sky-300/50"
              >
                <div className="absolute inset-0 flex items-center justify-center text-sky-200/50 transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v14H4z" opacity="0" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
                <div className="relative z-10 bg-gradient-to-t from-sky-950/90 via-sky-950/30 to-transparent p-2.5 sm:p-3">
                  <p className="text-[10px] font-semibold leading-snug text-white sm:text-[11px]">
                    {memory.caption}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ফুলস্ক্রিন লাইটবক্স */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMemory(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-sky-950 shadow-2xl"
            >
              <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-white/10 to-white/[0.02] text-sky-200/60">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <circle cx="12" cy="13" r="3.4" />
                </svg>
                <span className="text-xs font-semibold">ছবি শীঘ্রই যুক্ত হবে</span>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-xs font-bold text-sky-300">{activeMemory.batch}</p>
                <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                  {activeMemory.caption}
                </p>
              </div>
              <button
                onClick={() => setActiveMemory(null)}
                aria-label="বন্ধ করুন"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
