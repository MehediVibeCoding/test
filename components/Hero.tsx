"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ScrollLink from "./ScrollLink";
import CountUp from "./CountUp";

// ছবির কলাম: মোবাইলে নিচ থেকে স্লাইড-আপ হয়ে সবার আগে আসবে
const imageVariants = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// টেক্সট কলামের প্যারেন্ট — ছবির অ্যানিমেশন প্রায় শেষ হওয়ার পর একে একে (স্ট্যাগার) শুরু হবে
const textContainerVariants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.42, staggerChildren: 0.12 },
  },
};

// টেক্সট কলামের প্রতিটি লাইন (ট্যাগলাইন, ডেজিগনেশন, বিবরণ, কাউন্টার, বাটন) ফেড + স্লাইড-আপ
const lineVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// হেডলাইনের জন্য আলাদা "ডান থেকে বামে রিভিল" — clip-path wipe দিয়ে টেক্সটটা
// ডানপাশ থেকে ধীরে ধীরে উন্মোচিত (reveal) হয়ে আসে
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
      className="relative -mt-[58px] overflow-hidden px-4 pt-[74px] pb-6 sm:-mt-[68px] sm:pt-[90px] md:pb-10"
      style={{
        background:
          "radial-gradient(ellipse 65% 50% at 5% 30%, rgba(56, 189, 248, 0.35) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 95% 45%, rgba(14, 165, 233, 0.30) 0%, transparent 65%), linear-gradient(180deg, #e0f2fe 0%, #f0f7fe 55%, #ffffff 100%)",
      }}
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-8">

        {/* টেক্সট কন্টেন্ট কলাম (ডেস্কটপে বাঁয়ে, মোবাইলে ছবির নিচে) —
            মোবাইলে DOM-অর্ডার অনুযায়ী ছবির অ্যানিমেশন শেষ হওয়ার পরে এটা শুরু হয় */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate="show"
          className="order-2 text-center md:order-1 md:text-left"
        >
          <motion.p
            variants={lineVariants}
            className="font-display text-xs sm:text-sm font-bold tracking-wide text-sky-700"
          >
            Better Learning, Brighter Future
          </motion.p>

          <motion.h1
            variants={headlineWipeVariants}
            className="mt-1 text-3xl font-bold leading-tight text-sky-950 sm:text-5xl lg:text-6xl"
            style={{ willChange: "clip-path, opacity" }}
          >
            Md. Ahsan Ullah
          </motion.h1>

          <motion.div variants={lineVariants} className="mt-2.5 space-y-1">
            <p className="text-sm sm:text-base font-bold text-sky-900">
              Founder &amp; CEO — Ahsan&apos;s Learning Academy
            </p>
            <p className="text-xs sm:text-sm font-semibold text-sky-800">
              প্রভাষক (HSC English &amp; ICT), চৌদ্দগ্রাম সরকারি কলেজ · ৪০তম বিসিএস (সাধারণ শিক্ষা ক্যাডার)
            </p>
          </motion.div>

          <motion.p
            variants={lineVariants}
            className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-ink-800/90 sm:text-sm md:mx-0"
          >
            ইংরেজি ও আইসিটির মতো গুরুত্বপূর্ণ বিষয়গুলোতে শিক্ষার্থীদের ভীতি দূর করে বাস্তবধর্মী
            টেকনিক, নিয়মিত প্র্যাকটিস ও সঠিক গাইডলাইনের মাধ্যমে বোর্ড পরীক্ষায় নিশ্চিত A+ অর্জনের
            পরিপূর্ণ সহায়ক একাডেমি।
          </motion.p>

          {/* স্ট্যাটাস কাউন্টার — স্ক্রলে/লোডে দৃশ্যমান হওয়া মাত্র ০ থেকে গুণে গুণে আটকে যায় */}
          <motion.div
            variants={lineVariants}
            className="mx-auto mt-5 flex max-w-md justify-center gap-6 border-y border-sky-200/60 py-3 sm:gap-8 md:mx-0 md:justify-start"
          >
            <div>
              <p className="text-xl font-bold text-sky-950 sm:text-2xl">
                <CountUp end={8} suffix="+ বছর" duration={1300} delay={700} />
              </p>
              <p className="text-[11px] text-ink-800/70">শিক্ষকতা অভিজ্ঞতা</p>
            </div>
            <div>
              <p className="text-xl font-bold text-sky-950 sm:text-2xl">
                <CountUp
                  end={10000}
                  suffix="+"
                  grouped
                  duration={1700}
                  delay={800}
                />
              </p>
              <p className="text-[11px] text-ink-800/70">শিক্ষার্থীকে পাঠদান</p>
            </div>
            <div>
              <p className="text-xl font-bold text-sky-950 sm:text-2xl">
                <CountUp end={100} suffix="%" duration={1300} delay={900} />
              </p>
              <p className="text-[11px] text-ink-800/70">বোর্ড সিলেবাস কেয়ার</p>
            </div>
          </motion.div>

          {/* অ্যাকশন বাটনসমূহ — দুটোই এখন ক্রিস্টাল গ্লাস + স্প্রিং ট্যাপ অ্যানিমেশন,
              URL-এ # যোগ না করে স্মুথ স্ক্রল করে */}
          <motion.div
            variants={lineVariants}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start"
          >
            <ScrollLink
              targetId="admission"
              className="crystal-btn-solid inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-xs sm:text-sm font-bold"
            >
              প্রাইভেট ব্যাচে ভর্তি হও →
            </ScrollLink>
            <ScrollLink
              targetId="class-diary"
              className="crystal-btn inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold"
            >
              আজকের ক্লাস নোট দেখো
            </ScrollLink>
          </motion.div>
        </motion.div>

        {/* ছবির কলাম — মোবাইলে সবার আগে নিচ থেকে স্লাইড-আপ হয়ে আসে */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          className="order-1 flex justify-center md:order-2"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px]">
            <Image
              src="/images/ahsan-hero.webp"
              alt="Md. Ahsan Ullah — Founder & CEO, Ahsan's Learning Academy"
              width={900}
              height={1350}
              priority
              className="h-auto w-full object-contain select-none [mask-image:linear-gradient(to_bottom,black_82%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_82%,transparent_98%)]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
