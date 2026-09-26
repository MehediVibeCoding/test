"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";
import type { FarewellMemory } from "@/lib/academyData";

const ALL_LABEL = "সব স্মৃতি";

export default function FarewellGalleryClient({
  memories,
}: {
  memories: FarewellMemory[];
}) {
  const [selected, setSelected] = useState(ALL_LABEL);
  const [activeMemory, setActiveMemory] = useState<FarewellMemory | null>(null);

  // ডাটাবেজ থেকে আসা স্মৃতিগুলোর ব্যাচ ট্যাগ দিয়ে স্বয়ংক্রিয় ফিল্টার তৈরি
  const filters = useMemo(() => {
    const uniqueTags = Array.from(new Set(memories.map((m) => m.batch).filter(Boolean)));
    return [ALL_LABEL, ...uniqueTags];
  }, [memories]);

  const filtered = useMemo(
    () => (selected === ALL_LABEL ? memories : memories.filter((m) => m.batch === selected)),
    [memories, selected]
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
          {filters.map((f) => (
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
            <Reveal key={memory.id || i} delay={i * 60}>
              <button
                onClick={() => setActiveMemory(memory)}
                className="group relative flex aspect-square w-full flex-col justify-end overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.03] text-left transition-transform duration-300 hover:-translate-y-1 hover:border-sky-300/50"
              >
                {memory.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={memory.imageUrl}
                    alt={memory.caption}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sky-200/50">
                    📷
                  </div>
                )}
                <div className="relative z-10 bg-gradient-to-t from-sky-950/90 via-sky-950/40 to-transparent p-2.5 sm:p-3">
                  <span className="block text-[9px] font-bold text-sky-300">
                    {memory.batch}
                  </span>
                  <p className="text-[10.5px] font-semibold leading-snug text-white sm:text-[11.5px] line-clamp-2">
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
              <div className="flex aspect-square w-full items-center justify-center bg-black/40 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeMemory.imageUrl}
                  alt={activeMemory.caption}
                  className="h-full w-full object-contain"
                />
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
