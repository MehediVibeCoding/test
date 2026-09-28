"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import { useApp } from "@/context/AppContext";
import type { BlogPostSummary } from "@/lib/academyData";

// সফট প্যাস্টেল কালার ও ডার্ক মোড সাপোর্ট থিম
const BLOG_PASTEL_THEMES = [
  {
    cardBg: "bg-[#f0f9ff]/85 dark:bg-[#0c2238]/70 border-[#bae6fd]/70 dark:border-sky-800/40 hover:border-[#38bdf8]",
    badgeBg: "bg-[#e0f2fe] dark:bg-sky-900/80 text-[#0369a1] dark:text-sky-300 border border-[#bae6fd] dark:border-sky-700",
    btnStyle:
      "border-[#bae6fd] dark:border-sky-700 bg-[#e0f2fe]/90 dark:bg-sky-900/60 text-[#0369a1] dark:text-sky-300 group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7]",
    iconColor: "text-[#0284c7] dark:text-sky-400",
    titleHover: "group-hover:text-[#0284c7] dark:group-hover:text-sky-400",
  },
  {
    cardBg: "bg-[#ecfdf5]/85 dark:bg-[#0c261e]/70 border-[#a7f3d0]/70 dark:border-emerald-800/40 hover:border-[#34d399]",
    badgeBg: "bg-[#d1fae5] dark:bg-emerald-900/80 text-[#047857] dark:text-emerald-300 border border-[#a7f3d0] dark:border-emerald-700",
    btnStyle:
      "border-[#a7f3d0] dark:border-emerald-700 bg-[#d1fae5]/90 dark:bg-emerald-900/60 text-[#047857] dark:text-emerald-300 group-hover:bg-[#059669] group-hover:text-white group-hover:border-[#059669]",
    iconColor: "text-[#059669] dark:text-emerald-400",
    titleHover: "group-hover:text-[#059669] dark:group-hover:text-emerald-400",
  },
  {
    cardBg: "bg-[#fffbeb]/85 dark:bg-[#2b220d]/70 border-[#fde68a]/70 dark:border-amber-800/40 hover:border-[#fbbf24]",
    badgeBg: "bg-[#fef3c7] dark:bg-amber-900/80 text-[#b45309] dark:text-amber-300 border border-[#fde68a] dark:border-amber-700",
    btnStyle:
      "border-[#fde68a] dark:border-amber-700 bg-[#fef3c7]/90 dark:bg-amber-900/60 text-[#b45309] dark:text-amber-300 group-hover:bg-[#d97706] group-hover:text-white group-hover:border-[#d97706]",
    iconColor: "text-[#d97706] dark:text-amber-400",
    titleHover: "group-hover:text-[#d97706] dark:group-hover:text-amber-400",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const blogCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function BlogPreviewClient({ posts }: { posts: BlogPostSummary[] }) {
  const { t } = useApp();

  return (
    <section
      id="blog"
      className="relative px-6 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-white dark:bg-[#070f1a] overflow-hidden transition-colors"
    >
      {/* ব্যাকগ্রাউন্ড এডুকেশন অ্যাকসেন্ট ডুডলস */}
      <EduDoodles variant="section" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-8 sm:mb-12">
          {/* টপ ব্যাজ */}
          <span className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900/60 px-4 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
            {t.blog.tag}
          </span>

          {/* শিরোনাম ও 'সব ব্লগ দেখুন' বাটন */}
          <div className="mt-3 flex items-center justify-between gap-4">
            <h2 className="font-body text-2xl font-black tracking-tight text-sky-950 dark:text-white sm:text-4xl lg:text-[38px] leading-tight">
              {t.blog.title}
            </h2>

            <Link
              href="/blog"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-sky-200/80 dark:border-sky-800 bg-sky-50 dark:bg-slate-900 px-4 py-2 font-body text-xs font-bold text-sky-800 dark:text-sky-300 transition-all hover:border-sky-600 hover:bg-sky-600 hover:text-white active:scale-95 sm:px-6 sm:py-2.5 sm:text-sm shadow-xs"
            >
              {t.blog.viewAll}
            </Link>
          </div>

          {/* সাবটাইটেল */}
          <p className="mt-2.5 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 dark:text-slate-300 sm:text-[15px]">
            {t.blog.subtitle}
          </p>
        </Reveal>

        {/* ৩টি সফট প্যাস্টেল ব্লগ কার্ড গ্রিড */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post, i) => {
            const theme = BLOG_PASTEL_THEMES[i % BLOG_PASTEL_THEMES.length];

            return (
              <motion.div key={post.id} variants={blogCardVariants}>
                <Link
                  href={post.href}
                  className={`group flex h-full flex-col justify-between rounded-3xl border p-6 sm:p-8 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-950/5 ${theme.cardBg}`}
                >
                  <div>
                    {/* তারিখ ব্যাজ */}
                    <div className="flex items-center justify-between">
                      <span className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 font-body text-xs font-bold ${theme.badgeBg}`}>
                        <svg className={`h-3.5 w-3.5 ${theme.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{post.date}</span>
                      </span>
                    </div>

                    {/* ব্লগের শিরোনাম */}
                    <h3 className={`mt-5 font-body text-lg font-black leading-snug text-sky-950 dark:text-white transition-colors sm:text-[19px] line-clamp-2 ${theme.titleHover}`}>
                      {post.title}
                    </h3>

                    {/* সংক্ষিপ্ত ভূমিকা */}
                    <p className="mt-2.5 font-body text-sm leading-[1.75] text-ink-800/80 dark:text-slate-300 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* সম্পূর্ণ আর্টিকেল পড়ার বাটন */}
                  <div className="mt-6 border-t border-sky-100/80 dark:border-slate-700/60 pt-4">
                    <span
                      className={`inline-flex w-full items-center justify-center rounded-full border py-2.5 text-center font-body text-xs font-bold transition-all sm:text-sm ${theme.btnStyle}`}
                    >
                      {t.blog.readMore}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
                                           }
