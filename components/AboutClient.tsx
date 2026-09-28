"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import TeacherPhotoSlider, { type Slide } from "./TeacherPhotoSlider";
import { useApp } from "@/context/AppContext";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideCardVariants = {
  hidden: { opacity: 0, x: 25 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function AboutClient({ slides }: { slides: Slide[] }) {
  const { t } = useApp();

  const credentials = [
    {
      title: t.about.cuTitle,
      desc: t.about.cuDesc,
      icon: (
        <svg className="h-6 w-6 text-sky-700 dark:text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    {
      title: t.about.expTitle,
      desc: t.about.expDesc,
      icon: (
        <svg className="h-6 w-6 text-sky-700 dark:text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: t.about.studentsTitle,
      desc: t.about.studentsDesc,
      icon: (
        <svg className="h-6 w-6 text-sky-700 dark:text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-12 bg-white dark:bg-[#070f1a] overflow-hidden transition-colors"
    >
      {/* ব্যাকগ্রাউন্ড এডুকেশন অ্যাকসেন্ট ডুডলস */}
      <EduDoodles variant="section" />

      <div className="relative z-10">
        {/* সেকশন হেডার */}
        <Reveal className="mb-12 text-center sm:mb-16">
          <span className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900/60 px-4 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
            {t.about.tag}
          </span>
          <h2 className="mt-3.5 font-body text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-sky-950 dark:text-white leading-tight">
            {t.about.headline}
          </h2>
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* বাম পাশে: শিক্ষকের ছবি ফ্রেম */}
          <Reveal className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="overflow-hidden rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/80 p-3 shadow-xs backdrop-blur-sm">
                <TeacherPhotoSlider slides={slides} />

                {/* ছবির নিচের পরিচিতি */}
                <div className="mt-3 rounded-2xl bg-sky-50/70 dark:bg-slate-800/60 p-3.5 text-center border border-sky-100/70 dark:border-slate-700/60">
                  <p className="font-body text-base font-black text-sky-950 dark:text-white">
                    {t.hero.teacherName}
                  </p>
                  <p className="mt-0.5 font-body text-xs font-semibold text-sky-700 dark:text-sky-300">
                    {t.about.founderTitle}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ডানপাশে: বক্তব্য স্টেটমেন্ট ও সাইড-স্লাইড ক্রেডেনশিয়াল কার্ড */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* বক্তব্য কার্ড */}
            <Reveal delay={80}>
              <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-sky-50/30 dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs backdrop-blur-sm">
                <p className="font-body text-[15px] leading-[1.8] text-ink-800 dark:text-slate-200 sm:text-base">
                  {t.about.bioP1}
                </p>
                <p className="mt-3 font-body text-[15px] leading-[1.8] text-ink-800 dark:text-slate-200 sm:text-base">
                  {t.about.bioP2}
                </p>
              </div>
            </Reveal>

            {/* সাইড-স্লাইড ক্রেডেনশিয়াল কার্ড গ্রিড */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-4 sm:grid-cols-1"
            >
              {credentials.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={slideCardVariants}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="group flex items-start gap-4 rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/80 p-5 sm:p-6 shadow-xs backdrop-blur-sm transition-all hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 dark:bg-slate-800 transition-colors group-hover:bg-sky-100 dark:group-hover:bg-sky-900/50">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-[15.5px] font-black text-sky-950 dark:text-white sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-body text-[13.5px] leading-relaxed text-ink-800/80 dark:text-slate-300">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
          }
