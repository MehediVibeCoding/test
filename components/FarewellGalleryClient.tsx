"use client";

import { useMemo, useState, useEffect } from "react";
import { optimizeImage } from "@/lib/image";
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
  const [currentIndex, setCurrentIndex] = useState(0);

  // "ক্লাসরুম মোমেন্টস" ট্যাগটি ফিল্টার তালিকা থেকে বাদ দিয়ে শুধুমাত্র বিদায় ব্যাচ ট্যাগ রাখা
  const filters = useMemo(() => {
    const uniqueTags = Array.from(
      new Set(
        memories
          .map((m) => m.batch)
          .filter((b) => b && !b.includes("ক্লাসরুম মোমেন্টস"))
      )
    );
    return [ALL_LABEL, ...uniqueTags];
  }, [memories]);

  // নির্বাচিত ট্যাগ অনুযায়ী ফিল্টার করা মেমোরি তালিকা (ক্লাসরুম মোমেন্টস বাদ)
  const filteredMemories = useMemo(() => {
    const baseList = memories.filter(
      (m) => !m.batch || !m.batch.includes("ক্লাসরুম মোমেন্টস")
    );
    if (selected === ALL_LABEL) return baseList;
    return baseList.filter((m) => m.batch === selected);
  }, [memories, selected]);

  // ফিল্টার পরিবর্তন হলে স্লাইড ইনডেক্স ০ তে রিসেট
  useEffect(() => {
    setCurrentIndex(0);
  }, [selected]);

  // প্রতি ৩টি ছবি নিয়ে ১টি করে স্লাইড সেট তৈরি (১টি ১৬:৯ টপ + ২টি বটম স্প্লিট)
  const slides = useMemo(() => {
    const chunks: { top: string; bottom1: string; bottom2: string }[] = [];
    for (let i = 0; i < filteredMemories.length; i += 3) {
      const top = filteredMemories[i]?.imageUrl || "";
      const bottom1 =
        filteredMemories[i + 1]?.imageUrl || filteredMemories[0]?.imageUrl || "";
      const bottom2 =
        filteredMemories[i + 2]?.imageUrl || filteredMemories[1]?.imageUrl || "";
      if (top) {
        chunks.push({ top, bottom1, bottom2 });
      }
    }
    return chunks.length > 0
      ? chunks
      : [
          {
            top: filteredMemories[0]?.imageUrl || "",
            bottom1: filteredMemories[1]?.imageUrl || filteredMemories[0]?.imageUrl || "",
            bottom2: filteredMemories[2]?.imageUrl || filteredMemories[0]?.imageUrl || "",
          },
        ];
  }, [filteredMemories]);

  const totalSlides = slides.length;

  const nextSlide = () => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section
      id="memories"
      className="relative px-4 py-10 sm:px-8 sm:py-14 lg:py-16 lg:px-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 15% 15%, rgba(56,189,248,0.12) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(2,132,199,0.10) 0%, transparent 55%), #0a1f33",
      }}
    >
      <div className="mx-auto max-w-5xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-6 text-center sm:mb-8">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1 font-body text-xs font-bold text-sky-300">
            বিদায় সংবর্ধনা ও স্মৃতি
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-[38px] leading-tight">
            যে মুহূর্তগুলো আমাদের গর্বিত করে
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-body text-[14px] leading-[1.7] text-sky-100/75 sm:text-[15px]">
            বিদায় অনুষ্ঠানের আবেগঘন মুহূর্ত এবং শিক্ষকের সাথে শিক্ষার্থীদের আন্তরিক বন্ধন।
          </p>
        </Reveal>

        {/* ব্যাচ ফিল্টার বোতামসমূহ (ক্লাসরুম মোমেন্টস ছাড়া) */}
        <Reveal className="mb-6 flex flex-wrap items-center justify-center gap-2" delay={80}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelected(f)}
              className={`rounded-full px-4 py-1.5 font-body text-xs font-bold transition-all ${
                selected === f
                  ? "bg-sky-400 text-sky-950 shadow-xs"
                  : "bg-white/10 text-sky-100 hover:bg-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        {/* ১টি ১৬:৯ টপ ছবি + ২টি বটম স্প্লিট ছবি (কোনো ক্যাপশন ছাড়া সম্পূর্ণ ক্লিন) */}
        <Reveal delay={100}>
          <div className="relative">
            {/* ডেস্কটপ নেভিগেশন কন্ট্রোল */}
            {totalSlides > 1 && (
              <div className="hidden sm:flex items-center justify-end gap-2 mb-3">
                <button
                  onClick={prevSlide}
                  aria-label="পূর্ববর্তী ছবি"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-sky-400 hover:text-sky-950 active:scale-95"
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="পরবর্তী ছবি"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-sky-400 hover:text-sky-950 active:scale-95"
                >
                  →
                </button>
              </div>
            )}

            {/* স্লাইড কনটেন্ট (মোবাইল টাচ সোয়াইপ সহ) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40) nextSlide();
                  else if (info.offset.x > 40) prevSlide();
                }}
                className="space-y-3 sm:space-y-4 touch-pan-y"
              >
                {/* ১. টপ ১৬:৯ হিরো ছবি */}
                {currentSlide?.top && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-sky-950/60 shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={optimizeImage(currentSlide.top, 1200)}
 loading="lazy"
 decoding="async"
                      alt="Farewell Memory Top"
                      className="h-full w-full object-cover select-none"
                      draggable={false}
                    />
                  </div>
                )}

                {/* ২. নিচে সমান দুই ভাগে বিভক্ত ২টি ছবি */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {currentSlide?.bottom1 && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/15 bg-sky-950/60 shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={optimizeImage(currentSlide.bottom1, 800)}
 loading="lazy"
 decoding="async"
                        alt="Farewell Memory Sub 1"
                        className="h-full w-full object-cover select-none"
                        draggable={false}
                      />
                    </div>
                  )}

                  {currentSlide?.bottom2 && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/15 bg-sky-950/60 shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={optimizeImage(currentSlide.bottom2, 800)}
 loading="lazy"
 decoding="async"
                        alt="Farewell Memory Sub 2"
                        className="h-full w-full object-cover select-none"
                        draggable={false}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ডট পেজিনেশন ইন্ডিকেটর */}
            {totalSlides > 1 && (
              <div className="mt-5 flex items-center justify-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Memory Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === idx
                        ? "w-6 bg-sky-400"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
