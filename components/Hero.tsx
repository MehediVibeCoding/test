"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ScrollLink from "./ScrollLink";
import CountUp from "./CountUp";

// ছবির কলাম: নিচ থেকে স্মুথলি স্লাইড-আপ হয়ে আসবে
const imageVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// টেক্সট কলামের প্যারেন্ট স্ট্যাগার সিকোয়েন্স
const textContainerVariants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.35, staggerChildren: 0.1 },
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

// হেডলাইন "Md. Ahsan Ullah" টেক্সট ওয়াইপ রিভিল
const headlineWipeVariants = {
  hidden: { clipPath: "inset(0 0 0 100%)", opacity: 0 },
  show: {
    clipPath: "inset(0 0 0 0%)",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-12 sm:pt-32 md:pt-36 md:pb-16"
      style={{
        background:
          "radial-gradient(ellipse 65% 50% at 5% 20%, rgba(56, 189, 248, 0.35) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 95% 35%, rgba(14, 165, 233, 0.25) 0%, transparent 65%), linear-gradient(180deg, #def1fe 0%, #f0f7fe 65%, #ffffff 100%)",
      }}
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-6 sm:px-8 md:grid-cols-[1.1fr_0.9fr] lg:px-12">
        {/* ১. টেক্সট কন্টেন্ট কলাম */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="show"
          className="order-2 text-center md:order-1 md:text-left"
        >
          <motion.h1
            variants={headlineWipeVariants}
            className="font-body text-3xl font-black tracking-tight text-sky-950 sm:text-5xl lg:text-6xl"
            style={{ willChange: "clip-path, opacity" }}
          >
            Md. Ahsan Ullah
          </motion.h1>

          <motion.div variants={lineVariants} className="mt-3 space-y-1">
            <p className="font-body text-sm font-bold text-sky-900 sm:text-base">
              প্রতিষ্ঠাতা ও মেন্টর — Ahsan&apos;s Learning Academy
            </p>
            <p className="font-body text-xs font-semibold text-sky-800 sm:text-sm">
              প্রভাষক, চৌদ্দগ্রাম সরকারি কলেজ · ৪০তম বিসিএস (সাধারণ শিক্ষা ক্যাডার)
            </p>
          </motion.div>

          <motion.p
            variants={lineVariants}
            className="mx-auto mt-4 max-w-lg font-body text-xs leading-relaxed text-ink-800/90 sm:text-sm md:mx-0"
          >
            ইংরেজি ও আইসিটির মতো গুরুত্বপূর্ণ বিষয়ে HSC শিক্ষার্থীদের ভীতি দূর করে বাস্তবধর্মী টেকনিক,
            নিয়মিত প্র্যাকটিস ও সঠিক গাইডলাইনের মাধ্যমে বোর্ড পরীক্ষায় সর্বোচ্চ ফলাফল অর্জনে
            আন্তরিকভাবে সহায়তা করা হয়।
          </motion.p>

          {/* স্ট্যাটাস কাউন্টার */}
          <motion.div
            variants={lineVariants}
            className="mx-auto mt-6 flex max-w-md justify-center gap-6 border-y border-sky-200/60 py-3.5 sm:gap-8 md:mx-0 md:justify-start"
          >
            <div>
              <p className="font-body text-xl font-black text-sky-950 sm:text-2xl">
                <CountUp end={8} suffix="+ বছর" duration={1300} delay={600} />
              </p>
              <p className="font-body text-[11px] font-medium text-ink-800/70">শিক্ষকতা অভিজ্ঞতা</p>
            </div>
            <div>
              <p className="font-body text-xl font-black text-sky-950 sm:text-2xl">
                <CountUp
                  end={10000}
                  suffix="+"
                  grouped
                  duration={1700}
                  delay={700}
                />
              </p>
              <p className="font-body text-[11px] font-medium text-ink-800/70">শিক্ষার্থীকে পাঠদান</p>
            </div>
            <div>
              <p className="font-body text-xl font-black text-sky-950 sm:text-2xl">
                <CountUp end={100} suffix="%" duration={1300} delay={800} />
              </p>
              <p className="font-body text-[11px] font-medium text-ink-800/70">বোর্ড সিলেবাস কেয়ার</p>
            </div>
          </motion.div>

          {/* অ্যাকশন বাটনসমূহ (সিগনেচার স্কাই-ব্লু + পিউর হোয়াইট পিল বাটন) */}
          <motion.div
            variants={lineVariants}
            className="mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:justify-start"
          >
            <ScrollLink
              targetId="admission"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 font-body text-xs font-bold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-95 sm:text-sm"
            >
              প্রাইভেট ব্যাচে ভর্তি হও →
            </ScrollLink>
            <ScrollLink
              targetId="class-diary"
              className="inline-flex items-center justify-center rounded-full border border-sky-200/80 bg-white px-6 py-3 font-body text-xs font-bold text-sky-950 shadow-xs transition-all hover:bg-sky-50 active:scale-95 sm:text-sm"
            >
              আজকের ক্লাস নোট দেখো
            </ScrollLink>
          </motion.div>
        </motion.div>

        {/* ২. ছবির কলাম */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          className="order-1 flex justify-center md:order-2"
        >
          <div className="relative w-full max-w-[290px] sm:max-w-[350px] md:max-w-[420px]">
            <Image
              src="/images/ahsan-hero.webp"
              alt="Md. Ahsan Ullah — প্রতিষ্ঠাতা ও মেন্টর, Ahsan's Learning Academy"
              width={900}
              height={1350}
              priority
              className="h-auto w-full object-contain select-none [mask-image:linear-gradient(to_bottom,black_85%,transparent_99%)] [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_99%)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
