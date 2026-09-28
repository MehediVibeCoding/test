"use client";

import { useState, useMemo } from "react";
import { optimizeImage } from "@/lib/image";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";

// ডাটাবেজ ফাঁকা থাকলে ডেমো ফলব্যাক ছবি
const FALLBACK_PHOTOS = [
  {
    id: "m1",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "m2",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m3",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m4",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "m5",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m6",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
];

type ShowcasePhoto = { id: string; imageUrl: string };

// ছবি সার্ভার থেকে (ISR ক্যাশ সহ) prop হিসেবে আসে — ব্রাউজারে আলাদা ডাটাবেজ কল বা
// ফলব্যাক-ছবি ঝলকানি নেই। ডাটাবেজ ফাঁকা থাকলে ডেমো ছবি দেখায়।
export default function RealClassroomShowcase({ photos: dbPhotos = [] }: { photos?: ShowcasePhoto[] }) {
  const photos: ShowcasePhoto[] = dbPhotos.length > 0 ? dbPhotos : FALLBACK_PHOTOS;
  const [currentIndex, setCurrentIndex] = useState(0);

  // প্রতি ৩টি ছবি নিয়ে একটি করে স্লাইড সেট তৈরি (১টি ১৬:৯ টপ + ২টি বটম স্প্লিট)
  const slides = useMemo(() => {
    const chunks: { top: string; bottom1: string; bottom2: string }[] = [];
    for (let i = 0; i < photos.length; i += 3) {
      const top = photos[i]?.imageUrl || FALLBACK_PHOTOS[0].imageUrl;
      const bottom1 = photos[i + 1]?.imageUrl || photos[0]?.imageUrl || FALLBACK_PHOTOS[1].imageUrl;
      const bottom2 = photos[i + 2]?.imageUrl || photos[1]?.imageUrl || FALLBACK_PHOTOS[2].imageUrl;
      chunks.push({ top, bottom1, bottom2 });
    }
    return chunks.length > 0 ? chunks : [{
      top: FALLBACK_PHOTOS[0].imageUrl,
      bottom1: FALLBACK_PHOTOS[1].imageUrl,
      bottom2: FALLBACK_PHOTOS[2].imageUrl,
    }];
  }, [photos]);

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section id="campus-life" className="relative px-4 py-10 sm:px-8 sm:py-14 lg:py-16 lg:px-12 bg-white">
      <div className="mx-auto max-w-5xl">
        {/* সেকশন হেডার ও ডেস্কটপ স্লাইডার কন্ট্রোল */}
        <Reveal className="mb-6 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
                রিয়েল ক্লাসরুম
              </span>
              <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[38px] leading-tight">
                আমাদের ক্লাসরুম ও একাডেমি লাইফ
              </h2>
              <p className="mt-2 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 sm:text-[15px]">
                আমাদের প্রতিদিনের ক্লাসরুম, পড়াশোনার পরিবেশ এবং শিক্ষার্থীদের যত্নের বাস্তব মুহূর্ত।
              </p>
            </div>

            {/* ডেস্কটপ স্লাইডার নেভিগেশন অ্যারো */}
            {totalSlides > 1 && (
              <div className="hidden sm:flex items-center gap-2 self-end">
                <button
                  onClick={prevSlide}
                  aria-label="পূর্ববর্তী ছবি"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-900 transition-all hover:bg-sky-600 hover:text-white active:scale-95 shadow-xs"
                >
                  ←
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="পরবর্তী ছবি"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 bg-sky-50 text-sky-900 transition-all hover:bg-sky-600 hover:text-white active:scale-95 shadow-xs"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {/* 🎯 ১টি ১৬:৯ টপ ছবি + ২টি বটম স্প্লিট ছবি (কোনো ক্যাপশন ছাড়া সম্পূর্ণ ক্লিন) */}
        <Reveal delay={80}>
          <div className="relative">
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
                {/* ১. টপ ১৬:৯ সাইজের বড় হিরো ছবি */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-sky-100 bg-slate-100 shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={optimizeImage(currentSlide.top, 1200)}
 loading="lazy"
 decoding="async"
                    alt="Classroom Main View"
                    className="h-full w-full object-cover select-none"
                    draggable={false}
                  />
                </div>

                {/* ২. নিচে সমান দুই ভাগে বিভক্ত ২টি ছবি */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-sky-100 bg-slate-100 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={optimizeImage(currentSlide.bottom1, 800)}
 loading="lazy"
 decoding="async"
                      alt="Classroom Sub View 1"
                      className="h-full w-full object-cover select-none"
                      draggable={false}
                    />
                  </div>

                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-sky-100 bg-slate-100 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={optimizeImage(currentSlide.bottom2, 800)}
 loading="lazy"
 decoding="async"
                      alt="Classroom Sub View 2"
                      className="h-full w-full object-cover select-none"
                      draggable={false}
                    />
                  </div>
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
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === idx
                        ? "w-6 bg-sky-600"
                        : "w-2 bg-sky-200 hover:bg-sky-300"
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
