"use client";

import { useMemo, useState, useEffect } from "react";
import { optimizeImage } from "@/lib/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import type { FarewellMemory } from "@/lib/academyData";
import { useApp } from "@/context/AppContext";

export default function FarewellGalleryClient({
  memories,
}: {
  memories: FarewellMemory[];
}) {
  const { t } = useApp();
  const allLabel = t.memories.allTag;
  const [selected, setSelected] = useState(allLabel);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ভাষা পরিবর্তনের সাথে সিঙ্ক
  useEffect(() => {
    setSelected(allLabel);
  }, [allLabel]);

  // ফিল্টার তালিকা (ক্লাসরুম মোমেন্টস বাদ)
  const filters = useMemo(() => {
    const uniqueTags = Array.from(
      new Set(
        memories
          .map((m) => m.batch)
          .filter((b) => b && !b.includes("ক্লাসরুম মোমেন্টস"))
      )
    );
    return [allLabel, ...uniqueTags];
  }, [memories, allLabel]);

  // নির্বাচিত ট্যাগ অনুযায়ী ফিল্টার করা মেমোরি
  const filteredMemories = useMemo(() => {
    const baseList = memories.filter(
      (m) => !m.batch || !m.batch.includes("ক্লাসরুম মোমেন্টস")
    );
    if (selected === allLabel) return baseList;
    return baseList.filter((m) => m.batch === selected);
  }, [memories, selected, allLabel]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selected]);

  // প্রতি ৩টি ছবি নিয়ে ১টি স্লাইড
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
      className="relative px-4 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 overflow-hidden bg-[#0a1f33] dark:bg-[#06111e]"
      style={{
        background:
          "radial-gradient(circle at 15% 15%, rgba(56,189,248,0.12) 0%, transparent 55%), radial-gradient(circle at 85% 85%, rgba(2,132,199,0.10) 0%, transparent 55%), #0a1f33",
      }}
    >
      {/* ব্যাকগ্রাউন্ড এডুকেশন ডুডলস (দুই পাশের ফাঁকা নীল জায়গায়) */}
      <EduDoodles variant="section" className="opacity-15 text-sky-400" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-6 text-center sm:mb-8">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1 font-body text-xs font-bold text-sky-300">
            {t.memories.tag}
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-[38px] leading-tight">
            {t.memories.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-body text-[14px] leading-[1.7] text-sky-100/75 sm:text-[15px]">
            {t.memories.subtitle}
          </p>
        </Reveal>

        {/* ব্যাচ ফিল্টার বোতামসমূহ */}
        <Reveal from="fade" className="mb-8 flex flex-wrap items-center justify-center gap-2" delay={80}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelected(f)}
              className={`rounded-full px-4 py-1.5 font-body text-xs font-bold transition-all active:scale-95 ${
                selected === f
                  ? "bg-sky-400 text-sky-950 shadow-xs"
                  : "bg-white/10 text-sky-100 hover:bg-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        {/* ছবির গ্যালারি কন্টেইনার (ডেস্কটপে মার্জিনের বাইরে বাটন ও মোবাইলে বাটন ছাড়া) */}
        <Reveal from="zoom" delay={100}>
          <div className="relative">
            {/* ১. বাম পাশের নেভিগেশন তীর বাটন (শুধু ডেস্কটপে এবং ছবির বাইরে ফাঁকা মার্জিনে) */}
            {totalSlides > 1 && (
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="hidden md:flex absolute md:-left-14 lg:-left-16 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-sky-900/60 text-white shadow-xl backdrop-blur-md transition-all hover:bg-sky-500 hover:border-sky-400 hover:scale-110 active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* ২. ডান পাশের নেভিগেশন তীর বাটন (শুধু ডেস্কটপে এবং ছবির বাইরে ফাঁকা মার্জিনে) */}
            {totalSlides > 1 && (
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="hidden md:flex absolute md:-right-14 lg:-right-16 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-sky-900/60 text-white shadow-xl backdrop-blur-md transition-all hover:bg-sky-500 hover:border-sky-400 hover:scale-110 active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* স্লাইড কনটেন্ট (টাচ সোয়াইপ সমর্থিত) */}
            <AnimatePresence mode="wait">
              <m.div
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
                {/* টপ ১৬:৯ হিরো ছবি */}
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

                {/* নিচে সমান দুই ভাগে বিভক্ত ২টি ছবি */}
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
              </m.div>
            </AnimatePresence>

            {/* ডট পেজিনেশন */}
            {totalSlides > 1 && (
              <div className="mt-6 flex items-center justify-center gap-1.5">
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
