"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { optimizeImage } from "@/lib/image";

/**
 * শিক্ষকের ছবির স্লাইডার।
 * - মোবাইলে আঙুল দিয়ে ডানে-বামে সোয়াইপ (নেটিভ scroll-snap, তাই মসৃণ ও হালকা)
 * - ডেস্কটপে ডানে-বামে তীর বাটন, নিচে ডট ইন্ডিকেটর, কিবোর্ডের ← → কিও কাজ করে
 * - একটাই ছবি থাকলে তীর ও ডট দেখায় না
 *
 * ফ্রেমের অনুপাত ৪:৫ (পোর্ট্রেট)। সব ছবি এই ফ্রেমে object-cover হয়ে বসে।
 * আদর্শ সাইজ: ১০৮০×১৩৫০ px (ন্যূনতম ৮০০×১০০০ px)।
 */
export type Slide = {
  id: string;
  src: string;
  alt: string;
  /** Cloudinary ছবিতে অটো ফরম্যাট/কোয়ালিটি লাগাবে; স্থায়ী স্থানীয় ছবিতে false */
  optimize?: boolean;
};

export default function TeacherPhotoSlider({ slides }: { slides: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = slides.length;

  // স্ক্রল অবস্থান দেখে বর্তমান স্লাইড বের করা (সোয়াইপ ও বাটন দুই ক্ষেত্রেই ঠিক থাকে)
  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setIndex((prev) => (prev === i ? prev : Math.max(0, Math.min(count - 1, i))));
  }, [count]);

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const next = Math.max(0, Math.min(count - 1, i));
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    },
    [count]
  );

  useEffect(() => {
    // স্লাইড সংখ্যা কমলে ইনডেক্স ঠিক রাখা
    setIndex((prev) => Math.min(prev, Math.max(0, count - 1)));
  }, [count]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  }

  const multiple = count > 1;

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="শিক্ষকের ছবি"
      tabIndex={multiple ? 0 : -1}
      onKeyDown={multiple ? onKeyDown : undefined}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-2xl bg-gradient-to-b from-sky-50 to-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ touchAction: "pan-x pan-y" }}
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="aspect-[4/5] w-full shrink-0 snap-center"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.optimize ? optimizeImage(s.src, 900) : s.src}
              alt={s.alt}
              width={900}
              height={1125}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              className="h-full w-full select-none object-cover object-[50%_25%]"
            />
          </div>
        ))}
      </div>

      {multiple && (
        <>
          {/* ডেস্কটপ তীর বাটন (মোবাইলে সোয়াইপই যথেষ্ট, তাই লুকানো) */}
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label="আগের ছবি"
            className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sky-950 shadow-md ring-1 ring-sky-100 backdrop-blur transition-all hover:bg-white active:scale-90 disabled:pointer-events-none disabled:opacity-0 md:flex"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={index === count - 1}
            aria-label="পরের ছবি"
            className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sky-950 shadow-md ring-1 ring-sky-100 backdrop-blur transition-all hover:bg-white active:scale-90 disabled:pointer-events-none disabled:opacity-0 md:flex"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* ডট ইন্ডিকেটর */}
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-sky-950/40 px-2.5 py-1.5 backdrop-blur">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`ছবি ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
