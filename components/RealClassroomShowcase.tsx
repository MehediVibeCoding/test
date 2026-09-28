"use client";

import { useState, useMemo } from "react";
import { optimizeImage } from "@/lib/image";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import { useApp } from "@/context/AppContext";

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

export default function RealClassroomShowcase({ photos: dbPhotos = [] }: { photos?: ShowcasePhoto[] }) {
  const { language } = useApp();
  const photos: ShowcasePhoto[] = dbPhotos.length > 0 ? dbPhotos : FALLBACK_PHOTOS;
  const [currentIndex, setCurrentIndex] = useState(0);

  // প্রতি ৩টি ছবি নিয়ে একটি করে স্লাইড সেট তৈরি
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
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section id="campus-life" className="relative px-4 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-white dark:bg-[#070f1a] overflow-hidden transition-colors">
      {/* ব্যাকগ্রাউন্ড এডুকেশন অ্যাকসেন্ট ডুডলস */}
      <EduDoodles variant="section" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-8 text-center sm:mb-12">
          <span className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900/60 px-4 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
            {language === "bn" ? "রিয়েল ক্লাসরুম" : "Real Classroom"}
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 dark:text-white sm:text-4xl lg:text-[38px] leading-tight">
            {language === "bn" ? "আমাদের ক্লাসরুম ও একাডেমি লাইফ" : "Our Classroom & Academy Life"}
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 dark:text-slate-300 sm:text-[15px]">
            {language === "bn"
              ? "আমাদের প্রতিদিনের ক্লাসরুম, পড়াশোনার পরিবেশ এবং শিক্ষার্থীদের যত্নের বাস্তব মুহূর্ত।"
              : "Authentic moments inside our classrooms, active learning environment, and personalized student care."}
          </p>
        </Reveal>

        {/* স্লাইডার কন্টেইনার (ডেস্কটপে মার্জিনের বাইরে বাটন ও মোবাইলে বাটন ছাড়া) */}
        <Reveal delay={80}>
          <div className="relative">
            {/* ১. বাম পাশের নেভিগেশন তীর বাটন (শুধু ডেস্কটপে এবং ছবির বাইরে ফাঁকা মার্জিনে) */}
            {totalSlides > 1 && (
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="hidden md:flex absolute md:-left-14 lg:-left-16 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-sky-200 dark:border-sky-800 bg-white/90 dark:bg-slate-900/90 text-sky-950 dark:text-white shadow-xl backdrop-blur-md transition-all hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 hover:scale-110 active:scale-95"
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
                className="hidden md:flex absolute md:-right-14 lg:-right-16 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-sky-200 dark:border-sky-800 bg-white/90 dark:bg-slate-900/90 text-sky-950 dark:text-white shadow-xl backdrop-blur-md transition-all hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 hover:scale-110 active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* স্লাইড কনটেন্ট (টাচ সোয়াইপ সহ) */}
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
                {/* টপ ১৬:৯ হিরো ছবি */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-sky-100 dark:border-sky-900 bg-slate-100 dark:bg-slate-800 shadow-xs">
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

                {/* নিচে সমান দুই ভাগে বিভক্ত ২টি ছবি */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-sky-100 dark:border-sky-900 bg-slate-100 dark:bg-slate-800 shadow-xs">
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

                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-sky-100 dark:border-sky-900 bg-slate-100 dark:bg-slate-800 shadow-xs">
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

            {/* ডট পেজিনেশন */}
            {totalSlides > 1 && (
              <div className="mt-6 flex items-center justify-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === idx
                        ? "w-6 bg-sky-600 dark:bg-sky-400"
                        : "w-2 bg-sky-200 dark:bg-slate-700 hover:bg-sky-300"
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
