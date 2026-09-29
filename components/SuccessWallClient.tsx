"use client";

import * as m from "motion/react-m";
import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import { optimizeImage } from "@/lib/image";
import { useApp } from "@/context/AppContext";
import type { SuccessTopper } from "@/lib/academyData";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const topperCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function SuccessWallClient({ toppers }: { toppers: SuccessTopper[] }) {
  const { t } = useApp();

  return (
    <section
      id="results"
      className="relative px-4 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-sky-100/30 dark:bg-[#081728]/60 overflow-hidden transition-colors"
    >
      {/* ব্যাকগ্রাউন্ড এডুকেশন অ্যাকসেন্ট ডুডলস */}
      <EduDoodles variant="section" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-8 text-center sm:mb-12">
          <span className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900/60 px-4 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
            {t.successWall.tag}
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 dark:text-white sm:text-4xl lg:text-[38px]">
            {t.successWall.title}
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 dark:text-slate-300 sm:text-[15px]">
            {t.successWall.subtitle}
          </p>
        </Reveal>

        {/* কৃতি শিক্ষার্থী কার্ড গ্রিড */}
        {toppers.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900 p-8 text-center shadow-xs">
            <p className="font-body text-base font-bold text-sky-950 dark:text-white">{t.successWall.emptyText}</p>
            <p className="mt-1 font-body text-xs text-ink-800/70 dark:text-slate-400">{t.successWall.emptySubtext}</p>
          </div>
        ) : (
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {toppers.map((student, i) => (
              <m.div key={student.id || i} variants={topperCardVariants}>
                <div className="group flex h-full flex-col items-center justify-between rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 text-center shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-xl hover:shadow-sky-950/5">
                  <div className="flex flex-col items-center w-full">
                    {/* বৃত্তাকার ছবি ফ্রেম */}
                    <div className="relative mb-3.5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-sky-200 dark:border-sky-700 bg-slate-100 dark:bg-slate-800 shadow-sm transition-transform duration-300 group-hover:scale-105">
                      {student.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={optimizeImage(student.photoUrl, 400)}
                          loading="lazy"
                          decoding="async"
                          alt={student.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
                          <svg className="h-11 w-11 text-slate-400 dark:text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.686 2 6 4.686 6 8c0 2.242 1.233 4.195 3.057 5.228C5.467 14.52 3 17.95 3 22h18c0-4.05-2.467-7.48-6.057-8.772C16.767 12.195 18 10.242 18 8c0-3.314-2.686-6-6-6zm0 2c2.206 0 4 1.794 4 4 0 1.488-.813 2.784-2.016 3.483L12 12.6l-1.984-1.117C8.813 10.784 8 9.488 8 8c0-2.206 1.794-4 4-4zm0 10.5c3.86 0 7 2.467 7 5.5H5c0-3.033 3.14-5.5 7-5.5z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* নাম ও ব্যাচ */}
                    <h3 className="font-body text-[15px] font-black tracking-tight text-sky-950 dark:text-white">
                      {student.name}
                    </h3>
                    <p className="font-body text-[11px] font-bold text-sky-700 dark:text-sky-300 mt-0.5">
                      {student.batch}
                    </p>

                    {/* রেজাল্ট ব্যাজ */}
                    <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                      <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 font-body text-[11px] font-black text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        🏆 {student.result}
                      </span>
                      <span className="rounded-lg bg-sky-50 dark:bg-sky-950/80 px-2.5 py-0.5 font-body text-[11px] font-bold text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                        {student.subject}
                      </span>
                    </div>
                  </div>

                  {/* কলেজ নাম */}
                  <p className="mt-4 w-full border-t border-sky-100/80 dark:border-slate-800 pt-2.5 font-body text-[11.5px] font-medium text-ink-800/75 dark:text-slate-300 truncate" title={student.college}>
                    🏛️ {student.college}
                  </p>
                </div>
              </m.div>
            ))}
          </m.div>
        )}
      </div>
    </section>
  );
                }
