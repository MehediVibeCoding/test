"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import ScrollLink from "./ScrollLink";
import CountUp from "./CountUp";
import EduDoodles from "./EduDoodles";
import { useShine } from "@/hooks/useShine";
import { useApp } from "@/context/AppContext";

const SUBMISSION_LOCK_KEY = "ala_admission_locked_session";
const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

// ছবির কলাম অ্যানিমেশন
const imageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// টেক্সট কলামের প্যারেন্ট স্ট্যাগার সিকোয়েন্স
const textContainerVariants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.15, staggerChildren: 0.07 },
  },
};

// প্রতিটি টেক্সট লাইন ফেড + স্লাইড-আপ
const lineVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
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
      className="relative overflow-hidden min-h-[100svh] flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-0 bg-gradient-to-b from-[#def1fe] via-[#eaf4fe] to-[#cce6fd] dark:from-[#071322] dark:via-[#091a2e] dark:to-[#0c243e] transition-colors"
    >
      {/* ১. ব্যাকগ্রাউন্ড এডুকেশন ডুডলস */}
      <EduDoodles variant="hero" />

      {/* ব্যাকগ্রাউন্ড সফট গ্লো আভা */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[380px] w-[700px] rounded-full bg-gradient-to-br from-sky-400/20 via-sky-300/10 to-transparent blur-3xl dark:from-sky-500/10 dark:via-sky-400/5" />

      <div className="relative z-10 mx-auto my-auto max-w-7xl w-full items-center grid gap-6 sm:gap-8 md:grid-cols-[1.05fr_0.95fr] lg:grid-cols-[1.1fr_0.9fr] md:gap-10 lg:gap-14 px-6 sm:px-8 lg:px-12 py-4 sm:py-6">
        {/* ২. টেক্সট কন্টেন্ট কলাম (মার্জিত ডেক্সটপ স্কেল) */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="show"
          className="order-2 text-center md:order-1 md:text-left"
        >
          {/* সমান পুরুত্বের মার্জিত বোল্ড ইটালিক টাইপোগ্রাফি */}
          <motion.h1
            variants={lineVariants}
            className="font-display font-black italic tracking-tight text-sky-950 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-[38px] lg:text-[46px] xl:text-[52px] leading-[1.14]"
          >
            {t.hero.teacherName}
          </motion.h1>

          <motion.div variants={lineVariants} className="mt-2.5 space-y-0.5 sm:space-y-1">
            <p className="font-body text-xs sm:text-[13.5px] md:text-sm font-bold text-sky-900 dark:text-sky-300">
              {t.hero.roleTitle}
            </p>
            <p className="font-body text-[11px] sm:text-xs font-semibold text-sky-800/90 dark:text-sky-400">
              {t.hero.designation}
            </p>
          </motion.div>

          <motion.p
            variants={lineVariants}
            className="mx-auto mt-3 max-w-lg font-body text-xs sm:text-[13px] leading-relaxed text-ink-800/85 dark:text-slate-300 md:mx-0"
          >
            {t.hero.heroSubtitle}
          </motion.p>

          {/* স্ট্যাটাস কাউন্টার */}
          <motion.div
            variants={lineVariants}
            className="mx-auto mt-4 sm:mt-5 flex max-w-md justify-center gap-5 border-y border-sky-300/60 dark:border-sky-800/60 py-2.5 sm:gap-7 md:mx-0 md:justify-start"
          >
            <div>
              <p className="font-body text-lg sm:text-xl font-black text-sky-950 dark:text-white md:text-2xl">
                {language === "bn" ? (
                  <CountUp end={8} suffix="+ বছর" duration={1300} delay={600} />
                ) : (
                  "8+ Years"
                )}
              </p>
              <p className="font-body text-[10.5px] font-semibold text-ink-800/70 dark:text-slate-400">
                {t.hero.statExpLabel}
              </p>
            </div>
            <div>
              <p className="font-body text-lg sm:text-xl font-black text-sky-950 dark:text-white md:text-2xl">
                {language === "bn" ? (
                  <CountUp end={10000} suffix="+" grouped duration={1700} delay={700} />
                ) : (
                  "10,000+"
                )}
              </p>
              <p className="font-body text-[10.5px] font-semibold text-ink-800/70 dark:text-slate-400">
                {t.hero.statStudentsLabel}
              </p>
            </div>
            <div>
              <p className="font-body text-lg sm:text-xl font-black text-sky-950 dark:text-white md:text-2xl">
                {language === "bn" ? (
                  <CountUp end={100} suffix="%" duration={1300} delay={800} />
                ) : (
                  "100%"
                )}
              </p>
              <p className="font-body text-[10.5px] font-semibold text-ink-800/70 dark:text-slate-400">
                {t.hero.statSyllabusLabel}
              </p>
            </div>
          </motion.div>

          {/* ৩. অ্যাকশন বাটনসমূহ */}
          <motion.div
            variants={lineVariants}
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start"
          >
            <ScrollLink
              targetId="admission"
              className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 sm:px-7 sm:py-3 font-body text-xs sm:text-sm font-bold text-white shadow-sm transition-all ${shineClass} ${
                isLocked
                  ? "bg-slate-400 opacity-50 cursor-not-allowed pointer-events-none"
                  : "btn-gradient active:scale-95"
              }`}
            >
              <span ref={shineRef as any}>{t.hero.enrollCta}</span>
            </ScrollLink>

            <Link
              href="/class-diary"
              className="inline-flex items-center justify-center rounded-full border border-sky-200/90 dark:border-sky-800 bg-white/90 dark:bg-slate-900/90 px-6 py-2.5 sm:px-7 sm:py-3 font-body text-xs sm:text-sm font-bold text-sky-950 dark:text-white shadow-xs transition-all hover:bg-sky-50 dark:hover:bg-slate-800 active:scale-95"
            >
              {t.hero.diaryCta}
            </Link>
          </motion.div>
        </motion.div>

        {/* ৪. ছবির কলাম (মোবাইলে ও ডেক্সটপে বড় ও প্রোপোরশনেট সাইজ) */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          className="order-1 flex justify-center md:order-2 relative"
        >
          <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[530px] xl:max-w-[570px] flex justify-center items-center">
            {/* সফট ব্যাকগ্রাউন্ড আভা */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-t from-sky-400/25 via-sky-200/15 to-transparent blur-3xl pointer-events-none dark:from-sky-500/20" />

            {/* স্যারের সার্কেল আর্ট ছবি */}
            <Image
              src="/images/ahsan-hero.webp"
              alt="Md. Ahsan Ullah — Founder & Mentor, Ahsan's Learning Academy"
              width={1080}
              height={1080}
              priority
              className="relative z-10 h-auto w-full object-contain select-none transition-all drop-shadow-xl"
            />
          </div>
        </motion.div>
      </div>

      {/* ৫. নিচে নোঙর করা অর্গানিক ওয়েভ কাটআউট (নিচের সেকশন উঁকি মারা বন্ধ রাখবে) */}
      <div className="relative z-10 w-full overflow-hidden leading-none pointer-events-none -mt-4 sm:-mt-6">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 lg:h-16 text-white dark:text-[#070f1a] fill-current"
        >
          <path d="M0,42 C320,85 580,12 920,62 C1200,98 1360,30 1440,46 L1440,90 L0,90 Z" />
        </svg>
      </div>
    </section>
  );
}
