"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as m from "motion/react-m";
import ScrollLink from "./ScrollLink";
import CountUp from "./CountUp";
import EduDoodles from "./EduDoodles";
import { useShine } from "@/hooks/useShine";
import { useApp } from "@/context/AppContext";

const SUBMISSION_LOCK_KEY = "ala_admission_locked_session";
const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

const EASE = [0.16, 1, 0.3, 1] as const;

// ছবির কলাম: নিচ থেকে উঠে এসে সার্কেলের মতো খুলে যায়
const imageVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.9, clipPath: "circle(38% at 50% 55%)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: "circle(78% at 50% 55%)",
    transition: { duration: 1.05, ease: EASE, opacity: { duration: 0.6 } },
  },
};

// টেক্সট কলামের স্ট্যাগার সিকোয়েন্স
const textContainerVariants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.11 } },
};

// নামের প্রতিটি শব্দ মাস্কের নিচ থেকে উঠে আসে
const wordVariants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

// সাধারণ লাইন: ফেড + ওপরে ওঠা
const lineVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// স্ট্যাট বার: বাম থেকে ডানে উইপ করে খোলে, ভেতরের সংখ্যাগুলো একে একে ওঠে
const statsBarVariants = {
  hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
  show: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.85, ease: EASE, staggerChildren: 0.12, delayChildren: 0.25 },
  },
};
const statItemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// বাটন: স্প্রিং পপ
const buttonsVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};

export default function Hero() {
  const [isLocked, setIsLocked] = useState(false);
  const { language, t } = useApp();

  // ভিউপোর্ট-অ্যাওয়ার ঝিলিক অ্যানিমেশন হুক
  const { ref: shineRef, shineClass } = useShine<HTMLAnchorElement>(!isLocked);

  // ২ ঘণ্টার লক সেশন চেক
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SUBMISSION_LOCK_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const elapsed = Date.now() - parsed.timestamp;
        if (elapsed < TWO_HOURS_IN_MS && parsed.data) {
          setIsLocked(true);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  return (
    <section
      className="relative overflow-hidden min-h-[100svh] md:h-[100svh] md:min-h-[540px] flex flex-col justify-between pt-20 sm:pt-24 lg:pt-24 pb-0 bg-gradient-to-b from-[#def1fe] via-[#eaf4fe] to-[#cce6fd] dark:from-[#071322] dark:via-[#091a2e] dark:to-[#0c243e] transition-colors"
    >
      {/* ১. ব্যাকগ্রাউন্ড এডুকেশন ডুডলস */}
      <EduDoodles variant="hero" />

      {/* ব্যাকগ্রাউন্ড সফট গ্লো আভা */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[380px] w-[700px] rounded-full bg-gradient-to-br from-sky-400/20 via-sky-300/10 to-transparent blur-3xl dark:from-sky-500/10 dark:via-sky-400/5" />

      <div className="relative z-10 mx-auto my-auto max-w-7xl w-full items-center grid gap-5 sm:gap-8 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:gap-16 px-5 sm:px-8 lg:px-12 pt-2 pb-10 sm:py-4">
        {/* ২. টেক্সট কন্টেন্ট কলাম (মার্জিত ডেক্সটপ স্কেল) */}
        <m.div
          variants={textContainerVariants}
          initial="hidden"
          animate="show"
          className="order-2 text-center md:order-1 md:text-left"
        >
          {/* সমান পুরুত্বের মার্জিত বোল্ড ইটালিক টাইপোগ্রাফি */}
          <m.h1
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="font-display font-black italic tracking-tight text-sky-950 dark:text-white text-[30px] sm:text-[38px] md:text-[40px] lg:text-[clamp(36px,7.5svh,56px)] leading-[1.12]"
          >
            {t.hero.teacherName.split(" ").map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom pb-[0.12em] pr-[0.1em] mr-[0.16em] last:mr-[-0.1em]"
              >
                <m.span variants={wordVariants} className="inline-block">
                  {word}
                </m.span>
              </span>
            ))}
          </m.h1>

          <m.div variants={lineVariants} className="mt-3 space-y-1 lg:mt-4">
            <p className="font-body text-[14px] sm:text-[15px] lg:text-[clamp(14.5px,2.6svh,17px)] leading-snug font-bold text-sky-900 dark:text-sky-300">
              {t.hero.roleTitle}
            </p>
            <p className="font-body text-[12.5px] sm:text-[13.5px] lg:text-[clamp(13px,2.3svh,15px)] leading-snug font-semibold text-sky-800/90 dark:text-sky-400">
              {t.hero.designation}
            </p>
          </m.div>

          <m.p
            variants={lineVariants}
            className="mx-auto mt-4 max-w-xl font-body text-[14px] sm:text-[15px] lg:text-[clamp(14px,2.5svh,16.5px)] leading-relaxed text-ink-800/85 dark:text-slate-300 md:mx-0"
          >
            {t.hero.heroSubtitle}
          </m.p>

          {/* স্ট্যাটাস কাউন্টার */}
          <m.div
            variants={statsBarVariants}
            className="mx-auto mt-5 lg:mt-[clamp(14px,3svh,24px)] grid max-w-md lg:max-w-lg grid-cols-3 gap-2 sm:gap-6 border-y border-sky-300/60 dark:border-sky-800/60 py-3 lg:py-[clamp(8px,1.8svh,16px)] text-center md:mx-0 md:text-left"
          >
            <m.div variants={statItemVariants}>
              <p className="font-body text-[19px] sm:text-2xl lg:text-[clamp(22px,4.2svh,28px)] font-black leading-tight text-sky-950 dark:text-white">
                <CountUp end={8} suffix={language === "bn" ? "+ বছর" : "+ Years"} bn={language === "bn"} duration={2400} delay={700} />
              </p>
              <p className="mt-0.5 font-body text-[11px] sm:text-xs lg:text-[13px] leading-tight font-semibold text-ink-800/70 dark:text-slate-400">
                {t.hero.statExpLabel}
              </p>
            </m.div>
            <m.div variants={statItemVariants}>
              <p className="font-body text-[19px] sm:text-2xl lg:text-[clamp(22px,4.2svh,28px)] font-black leading-tight text-sky-950 dark:text-white">
                <CountUp end={10000} suffix="+" grouped bn={language === "bn"} duration={2400} delay={700} />
              </p>
              <p className="mt-0.5 font-body text-[11px] sm:text-xs lg:text-[13px] leading-tight font-semibold text-ink-800/70 dark:text-slate-400">
                {t.hero.statStudentsLabel}
              </p>
            </m.div>
            <m.div variants={statItemVariants}>
              <p className="font-body text-[19px] sm:text-2xl lg:text-[clamp(22px,4.2svh,28px)] font-black leading-tight text-sky-950 dark:text-white">
                <CountUp end={100} suffix="%" bn={language === "bn"} duration={2400} delay={700} />
              </p>
              <p className="mt-0.5 font-body text-[11px] sm:text-xs lg:text-[13px] leading-tight font-semibold text-ink-800/70 dark:text-slate-400">
                {t.hero.statSyllabusLabel}
              </p>
            </m.div>
          </m.div>

          {/* ৩. অ্যাকশন বাটনসমূহ */}
          <m.div
            variants={buttonsVariants}
            className="mt-6 lg:mt-[clamp(16px,3.5svh,32px)] grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center md:justify-start"
          >
            <ScrollLink
              targetId="admission"
              className={`inline-flex items-center justify-center rounded-full px-4 py-3 sm:px-8 sm:py-3.5 min-h-[48px] lg:min-h-[clamp(42px,6svh,50px)] lg:py-2 text-center font-body text-[13.5px] sm:text-[15px] leading-tight font-bold text-white shadow-md transition-all ${shineClass} ${
                isLocked
                  ? "bg-slate-400 opacity-50 cursor-not-allowed pointer-events-none"
                  : "btn-gradient btn-pulse active:scale-95"
              }`}
            >
              <span ref={shineRef as any}>{t.hero.enrollCta}</span>
            </ScrollLink>

            <Link
              href="/class-diary"
              className="inline-flex items-center justify-center rounded-full px-4 py-3 sm:px-8 sm:py-3.5 min-h-[48px] lg:min-h-[clamp(42px,6svh,50px)] lg:py-2 text-center font-body text-[13.5px] sm:text-[15px] leading-tight font-bold border border-sky-200/90 dark:border-sky-800 bg-white/90 dark:bg-slate-900/90 text-sky-950 dark:text-white shadow-xs transition-all hover:bg-sky-50 dark:hover:bg-slate-800 active:scale-95"
            >
              {t.hero.diaryCta}
            </Link>
          </m.div>
        </m.div>

        {/* ৪. ছবির কলাম (মোবাইলে ও ডেক্সটপে বড় ও প্রোপোরশনেট সাইজ) */}
        <m.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          className="order-1 flex justify-center md:order-2 relative"
        >
          <div className="relative w-full max-w-[370px] sm:max-w-[440px] md:w-auto md:max-w-full flex justify-center items-center">
            {/* সফট ব্যাকগ্রাউন্ড আভা */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-t from-sky-400/25 via-sky-200/15 to-transparent blur-3xl pointer-events-none dark:from-sky-500/20" />

            {/* স্যারের সার্কেল আর্ট ছবি */}
            <Image
              src="/images/ahsan-hero.webp"
              alt="Md. Ahsan Ullah — Founder & Mentor, Ahsan's Learning Academy"
              width={1170}
              height={1126}
              priority
              sizes="(max-width: 768px) 100vw, 560px"
              className="relative z-10 h-auto w-full md:w-auto md:max-w-full md:max-h-[min(600px,calc(100svh_-_13.5rem))] object-contain select-none transition-all drop-shadow-xl"
            />
          </div>
        </m.div>
      </div>

      {/* ৫. নিচে নোঙর করা অর্গানিক ওয়েভ কাটআউট (নিচের সেকশন উঁকি মারা বন্ধ রাখবে) */}
      <div className="relative z-10 w-full overflow-hidden leading-none pointer-events-none mt-0 sm:-mt-2">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-10 lg:h-12 text-white dark:text-[#070f1a] fill-current"
        >
          <path d="M0,42 C320,85 580,12 920,62 C1200,98 1360,30 1440,46 L1440,90 L0,90 Z" />
        </svg>
      </div>
    </section>
  );
}
