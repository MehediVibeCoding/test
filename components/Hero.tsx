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
  hidden: { opacity: 0, y: 35, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// টেক্সট কলামের প্যারেন্ট স্ট্যাগার সিকোয়েন্স
const textContainerVariants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.25, staggerChildren: 0.09 },
  },
};

// প্রতিটি টেক্সট লাইন ফেড + স্লাইড-আপ
const lineVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  const [isLocked, setIsLocked] = useState(false);
  const { language, t } = useApp();

  // ভিউপোর্ট-অ্যাওয়ার ঝিলিক অ্যানিমেশন হুক
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
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 bg-gradient-to-b from-[#def1fe] via-[#f0f7fe] to-white dark:from-[#071322] dark:via-[#091a2e] dark:to-[#070f1a] transition-colors"
    >
      {/* ১. ব্যাকগ্রাউন্ড এডুকেশন ডুডলস (হালকা ৯% অপাসিটি) */}
      <EduDoodles variant="hero" />

      {/* ব্যাকগ্রাউন্ড সফট গ্লো আভা */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-[700px] rounded-full bg-gradient-to-br from-sky-400/20 via-sky-300/10 to-transparent blur-3xl dark:from-sky-500/10 dark:via-sky-400/5" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-6 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10 lg:px-12">
        {/* ২. টেক্সট কন্টেন্ট কলাম */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="show"
          className="order-2 text-center md:order-1 md:text-left -mt-2 sm:mt-0"
        >
          {/* সমান পুরুত্বের মসৃণ বোল্ড ইটালিক টাইপোগ্রাফি (কোনো অসমান চিকন টান ছাড়া) */}
          <motion.h1
            variants={lineVariants}
            className="font-display font-black italic tracking-tight text-sky-950 dark:text-white text-3xl xs:text-4xl sm:text-5xl lg:text-6xl leading-[1.15]"
          >
            {t.hero.teacherName}
          </motion.h1>

          <motion.div variants={lineVariants} className="mt-3.5 space-y-1">
            <p className="font-body text-sm font-bold text-sky-900 dark:text-sky-300 sm:text-base">
              {t.hero.roleTitle}
            </p>
            <p className="font-body text-xs font-semibold text-sky-800/90 dark:text-sky-400 sm:text-sm">
              {t.hero.designation}
            </p>
          </motion.div>

          <motion.p
            variants={lineVariants}
            className="mx-auto mt-4 max-w-lg font-body text-xs sm:text-sm leading-relaxed text-ink-800/85 dark:text-slate-300 md:mx-0"
          >
            {t.hero.heroSubtitle}
          </motion.p>

          {/* স্ট্যাটাস কাউন্টার (বাংলা/ইংরেজি ভাষা অনুযায়ী) */}
          <motion.div
            variants={lineVariants}
            className="mx-auto mt-6 flex max-w-md justify-center gap-6 border-y border-sky-200/60 dark:border-sky-800/60 py-3.5 sm:gap-8 md:mx-0 md:justify-start"
          >
            <div>
              <p className="font-body text-xl font-black text-sky-950 dark:text-white sm:text-2xl">
                {language === "bn" ? (
                  <CountUp end={8} suffix="+ বছর" duration={1300} delay={600} />
                ) : (
                  "8+ Years"
                )}
              </p>
              <p className="font-body text-[11px] font-semibold text-ink-800/70 dark:text-slate-400">
                {t.hero.statExpLabel}
              </p>
            </div>
            <div>
              <p className="font-body text-xl font-black text-sky-950 dark:text-white sm:text-2xl">
                {language === "bn" ? (
                  <CountUp end={10000} suffix="+" grouped duration={1700} delay={700} />
                ) : (
                  "10,000+"
                )}
              </p>
              <p className="font-body text-[11px] font-semibold text-ink-800/70 dark:text-slate-400">
                {t.hero.statStudentsLabel}
              </p>
            </div>
            <div>
              <p className="font-body text-xl font-black text-sky-950 dark:text-white sm:text-2xl">
                {language === "bn" ? (
                  <CountUp end={100} suffix="%" duration={1300} delay={800} />
                ) : (
                  "100%"
                )}
              </p>
              <p className="font-body text-[11px] font-semibold text-ink-800/70 dark:text-slate-400">
                {t.hero.statSyllabusLabel}
              </p>
            </div>
          </motion.div>

          {/* ৩. অ্যাকশন বাটনসমূহ (তীর চিহ্ন ছাড়া সফট গ্রেডিয়েন্ট + ঝিলিক অ্যানিমেশন) */}
          <motion.div
            variants={lineVariants}
            className="mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:justify-start"
          >
            <ScrollLink
              targetId="admission"
              className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 font-body text-xs sm:text-sm font-bold text-white shadow-sm transition-all ${shineClass} ${
                isLocked
                  ? "bg-slate-400 opacity-50 cursor-not-allowed pointer-events-none"
                  : "btn-gradient active:scale-95"
              }`}
            >
              <span ref={shineRef as any}>{t.hero.enrollCta}</span>
            </ScrollLink>

            <Link
              href="/class-diary"
              className="inline-flex items-center justify-center rounded-full border border-sky-200/90 dark:border-sky-800 bg-white/90 dark:bg-slate-900/90 px-7 py-3.5 font-body text-xs sm:text-sm font-bold text-sky-950 dark:text-white shadow-xs transition-all hover:bg-sky-50 dark:hover:bg-slate-800 active:scale-95"
            >
              {t.hero.diaryCta}
            </Link>
          </motion.div>
        </motion.div>

        {/* ৪. ছবির কলাম (রেফারেন্স-স্টাইল অর্গানিক আর্চ ফ্রেম ও বটম-ফেড ইন্টিগ্রেশন) */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          className="order-1 flex justify-center md:order-2 relative"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px]">
            {/* ছবির পেছনের অর্গানিক কার্ভ ফ্রেম (রেফারেন্স ডিজাইনের মতো ডাবল ব্যাকড্রপ আর্চ) */}
            <div className="hero-arch-frame absolute inset-x-2 -inset-y-3 z-0 transition-all scale-105 border border-sky-200/60 dark:border-sky-700/30" />

            {/* ভেতরের সফট সার্কুলার রিং ইলিমেন্ট */}
            <div className="absolute -top-3 -right-3 h-20 w-20 rounded-full border-2 border-dashed border-sky-300/40 dark:border-sky-500/20 pointer-events-none animate-spin-slow" />
            
            {/* স্যারের ছবি (নিচের সোজা কাটা দাগ মুছে দিয়ে মসৃণভাবে ফ্রেমে ব্লেন্ড করা) */}
            <div className="relative z-10 overflow-hidden pt-3">
              <Image
                src="/images/ahsan-hero.webp"
                alt="Md. Ahsan Ullah — Founder & Mentor, Ahsan's Learning Academy"
                width={900}
                height={1350}
                priority
                className="relative z-10 h-auto w-full object-contain select-none [mask-image:linear-gradient(to_bottom,black_70%,transparent_97%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_97%)]"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ৫. রেফারেন্স-স্টাইল অর্গানিক কার্ভড কাট-আউট ওয়েভ ডিভাইডার (হিরো থেকে পরের সেকশনে মসৃণ ট্রানজিশন) */}
      <div className="absolute inset-x-0 bottom-0 z-10 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 68"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 lg:h-14 text-white dark:text-[#070f1a] fill-current"
        >
          <path d="M0,32 C280,68 520,12 840,48 C1120,78 1320,24 1440,36 L1440,68 L0,68 Z" />
        </svg>
      </div>
    </section>
  );
}
