"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import { useApp } from "@/context/AppContext";

const FEATURES_DATA = [
  {
    titleBn: "দুর্বল শিক্ষার্থীদের বিশেষ নার্সিং",
    titleEn: "Special Care for Struggling Students",
    descBn: "যাদের বেসিক দুর্বল বা ক্লাসের পড়া বুঝতে সময় লাগে, তাদের জন্য আলাদা রিভিশন ও বিশেষ যত্ন নিয়ে সহজে প্রতিটি বিষয় বুঝিয়ে দেওয়া হয়।",
    descEn: "Personalized revision sessions and tailored guidance to strengthen foundational gaps for every student.",
    tagBn: "স্পেশাল কেয়ার",
    tagEn: "Special Care",
    cardBg: "bg-[#f0f9ff]/80 dark:bg-[#0c2238]/70 border-[#bae6fd]/60 dark:border-sky-800/40 hover:border-[#38bdf8]",
    badgeBg: "bg-[#e0f2fe] dark:bg-sky-900/80 text-[#0369a1] dark:text-sky-300 border border-[#bae6fd] dark:border-sky-700",
  },
  {
    titleBn: "সাপ্তাহিক বোর্ড স্ট্যান্ডার্ড মডেল টেস্ট",
    titleEn: "Weekly Board-Standard Model Tests",
    descBn: "প্রতি সপ্তাহে পড়ানো টপিকের ওপর বোর্ড স্ট্যান্ডার্ড পরীক্ষা নেওয়া হয় এবং স্যার নিজে প্রতিটি খাতা মূল্যায়ন করে ব্যক্তিগত ভুলগুলো ধরিয়ে দেন।",
    descEn: "Rigorous weekly evaluations strictly aligned with HSC board standards, evaluated directly by Sir.",
    tagBn: "সাপ্তাহিক মূল্যায়ন",
    tagEn: "Weekly Evaluation",
    cardBg: "bg-[#f5f3ff]/80 dark:bg-[#1a1636]/70 border-[#ddd6fe]/60 dark:border-indigo-900/40 hover:border-[#a78bfa]",
    badgeBg: "bg-[#ede9fe] dark:bg-indigo-950/80 text-[#6d28d9] dark:text-indigo-300 border border-[#ddd6fe] dark:border-indigo-800",
  },
  {
    titleBn: "স্যারের সরাসরি পাঠদান, কোনো প্রক্সি নয়",
    titleEn: "Direct Mentorship by Sir — 0% Proxy",
    descBn: "কোনো জুনিয়র বা সহকারী শিক্ষক নয়—প্রতিটি ব্যাচের প্রতিটি ক্লাস, বোর্ড প্রশ্ন সমাধান ও ডাউট সলভ স্যার নিজে পরিচালনা করেন।",
    descEn: "Every single lecture, board question breakdown, and doubt-clearing session is conducted directly by Sir.",
    tagBn: "১০০% অথেনটিক",
    tagEn: "100% Authentic",
    cardBg: "bg-[#ecfdf5]/80 dark:bg-[#0c261e]/70 border-[#a7f3d0]/60 dark:border-emerald-900/40 hover:border-[#34d399]",
    badgeBg: "bg-[#d1fae5] dark:bg-emerald-950/80 text-[#047857] dark:text-emerald-300 border border-[#a7f3d0] dark:border-emerald-800",
  },
  {
    titleBn: "ডিজিটাল ক্লাস ডায়েরি ও হ্যান্ডনোট",
    titleEn: "Digital Class Diary & Handnotes",
    descBn: "ক্লাসে যা পড়ানো হয়, তার বিস্তারিত সারসংক্ষেপ ও হোমওয়ার্ক ওয়েবসাইটে তুলে দেওয়া হয়। ফলে কোনো শিক্ষার্থী ক্লাস মিস করলেও পিছিয়ে পড়ে না।",
    descEn: "Comprehensive digital class summaries and homework archives ensure absent students never fall behind.",
    tagBn: "স্মার্ট লার্নিং",
    tagEn: "Smart Learning",
    cardBg: "bg-[#ecfeff]/80 dark:bg-[#0a272e]/70 border-[#a5f3fc]/60 dark:border-cyan-900/40 hover:border-[#22d3ee]",
    badgeBg: "bg-[#cffafe] dark:bg-cyan-950/80 text-[#0e7490] dark:text-cyan-300 border border-[#a5f3fc] dark:border-cyan-800",
  },
  {
    titleBn: "সীমিত আসন ও পড়াশোনার অনুকূল পরিবেশ",
    titleEn: "Limited Batch Seats & Optimal Environment",
    descBn: "গাদাগাদি করে অতিরিক্ত শিক্ষার্থী না নিয়ে প্রতিটি ব্যাচে নির্দিষ্ট আসন রাখা হয়, যাতে ক্লাসরুমে সবার প্রতি সর্বোচ্চ ব্যক্তিগত মনোযোগ দেওয়া সম্ভব হয়।",
    descEn: "Strictly limited student intake per cohort to preserve an interactive, disciplined learning atmosphere.",
    tagBn: "শৃঙ্খলিত ব্যাচ",
    tagEn: "Disciplined Cohorts",
    cardBg: "bg-[#fffbeb]/80 dark:bg-[#2b220d]/70 border-[#fde68a]/60 dark:border-amber-900/40 hover:border-[#fbbf24]",
    badgeBg: "bg-[#fef3c7] dark:bg-amber-950/80 text-[#b45309] dark:text-amber-300 border border-[#fde68a] dark:border-amber-800",
  },
  {
    titleBn: "অভিভাবকদের সাথে নিয়মিত ফিডব্যাক",
    titleEn: "Regular Parent Feedback & Reporting",
    descBn: "শিক্ষার্থীর উপস্থিতি, পরীক্ষার ফলাফল ও ক্লাসের অগ্রগতি নিয়মিত অভিভাবকদের জানানো হয় যাতে বাসায়ও যথাযথ তদারকি নিশ্চিত থাকে।",
    descEn: "Consistent attendance and exam score updates communicated to guardians to ensure structured home revision.",
    tagBn: "অভিভাবক সংযোগ",
    tagEn: "Guardian Sync",
    cardBg: "bg-[#fff1f2]/80 dark:bg-[#2d1217]/70 border-[#fecdd3]/60 dark:border-rose-900/40 hover:border-[#fb7185]",
    badgeBg: "bg-[#ffe4e6] dark:bg-rose-950/80 text-[#be123c] dark:text-rose-300 border border-[#fecdd3] dark:border-rose-800",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const card3DVariants = {
  hidden: {
    opacity: 0,
    rotateY: 28,
    y: 35,
    scale: 0.94,
  },
  show: {
    opacity: 1,
    rotateY: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function AcademyFeatures() {
  const { language, t } = useApp();

  return (
    <section
      id="why-us"
      className="relative px-6 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-white dark:bg-[#070f1a] overflow-hidden transition-colors"
    >
      {/* ব্যাকগ্রাউন্ড এডুকেশন অ্যাকসেন্ট ডুডলস */}
      <EduDoodles variant="section" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-10 text-center sm:mb-14">
          <span className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900/60 px-4 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
            {t.whyUs.tag}
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 dark:text-white sm:text-4xl lg:text-[38px]">
            {t.whyUs.title}
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 dark:text-slate-300 sm:text-[15px]">
            {t.whyUs.subtitle}
          </p>
        </Reveal>

        {/* ৩ডি পার্সপেক্টিভ ফ্লিপ কার্ড গ্রিড */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [perspective:1200px]"
        >
          {FEATURES_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              variants={card3DVariants}
              whileHover={{ y: -4, scale: 1.015, transition: { duration: 0.25 } }}
              className={`flex h-full flex-col justify-between rounded-3xl border p-6 sm:p-7 shadow-xs backdrop-blur-sm transition-shadow hover:shadow-lg ${item.cardBg}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div>
                {/* কার্ডের শুরুর ট্যাগ পিল */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex rounded-full px-3 py-1 font-body text-xs font-bold ${item.badgeBg}`}>
                    {language === "bn" ? item.tagBn : item.tagEn}
                  </span>
                </div>

                {/* কার্ড শিরোনাম */}
                <h3 className="mt-5 font-body text-base font-bold leading-snug text-sky-950 dark:text-white sm:text-[17.5px]">
                  {language === "bn" ? item.titleBn : item.titleEn}
                </h3>

                {/* কার্ড বিবরণ */}
                <p className="mt-2.5 font-body text-[13.5px] leading-[1.75] text-ink-800/85 dark:text-slate-300 sm:text-[14px]">
                  {language === "bn" ? item.descBn : item.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
