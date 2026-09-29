"use client";

import { useEffect, useState } from "react";
import * as m from "motion/react-m";
import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import { useShine } from "@/hooks/useShine";
import { useApp } from "@/context/AppContext";
import type { Batch } from "@/lib/academyData";

const SUBMISSION_LOCK_KEY = "ala_admission_locked_session";
const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

type BatchesClientProps = {
  batches: Batch[];
};

function BatchCardButton({
  batchName,
  isLocked,
  onSelect,
  btnText,
}: {
  batchName: string;
  isLocked: boolean;
  onSelect: (name: string) => void;
  btnText: string;
}) {
  const { ref, shineClass } = useShine<HTMLButtonElement>(!isLocked);

  return (
    <button
      ref={ref}
      disabled={isLocked}
      onClick={() => onSelect(batchName)}
      className={`w-full rounded-full py-3 text-center font-body text-xs sm:text-sm font-bold shadow-xs transition-all ${shineClass} ${
        isLocked
          ? "bg-slate-400 opacity-50 cursor-not-allowed pointer-events-none text-white"
          : "btn-gradient text-white active:scale-95"
      }`}
    >
      {btnText}
    </button>
  );
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function BatchesClient({ batches }: BatchesClientProps) {
  const [isLocked, setIsLocked] = useState(false);
  const { t } = useApp();

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

  function handleSelectBatch(batchName: string) {
    if (isLocked) return;

    const selectElem = document.querySelector<HTMLSelectElement>('select[name="batch"]');
    if (selectElem) {
      selectElem.value = batchName;
      selectElem.dispatchEvent(new Event("change", { bubbles: true }));
    }
    const admissionSection = document.getElementById("admission");
    if (admissionSection) {
      admissionSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section
      id="batches"
      className="relative px-6 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-gradient-to-b from-white via-sky-50/40 to-white dark:from-[#070f1a] dark:via-[#091b2e] dark:to-[#070f1a] overflow-hidden transition-colors"
    >
      {/* ব্যাকগ্রাউন্ড এডুকেশন অ্যাকসেন্ট ডুডলস */}
      <EduDoodles variant="section" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-10 text-center sm:mb-14">
          <span className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900/60 px-4 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
            {t.batches.tag}
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 dark:text-white sm:text-4xl lg:text-[38px]">
            {t.batches.title}
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 dark:text-slate-300 sm:text-[15px]">
            {t.batches.subtitle}
          </p>
        </Reveal>

        {/* প্রিমিয়াম ব্যাচ কার্ড গ্রিড */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {batches.map((batch) => (
            <m.div
              key={batch.id}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="group flex h-full flex-col justify-between rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/80 p-6 sm:p-8 shadow-xs backdrop-blur-sm transition-all hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-xl hover:shadow-sky-950/5"
            >
              <div>
                {/* টপ ব্যাজ ও কোহোর্ট ট্যাগ */}
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-sky-200/80 dark:border-sky-800 bg-sky-50 dark:bg-sky-950 px-3.5 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
                    {batch.badge}
                  </span>
                  <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-0.5 font-body text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {batch.targetCohort}
                  </span>
                </div>

                {/* ব্যাচের নাম */}
                <h3 className="mt-5 font-body text-lg font-black leading-snug text-sky-950 dark:text-white sm:text-[19px]">
                  {batch.name}
                </h3>

                {/* সময়সূচী ক্যাপসুল বক্স */}
                <div className="mt-3.5 flex items-center gap-2 rounded-2xl border border-sky-100 dark:border-sky-800/80 bg-sky-50/70 dark:bg-slate-800/60 px-3.5 py-2.5 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
                  <svg className="h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{batch.schedule}</span>
                </div>

                {/* ব্যাচ ফিচার তালিকা */}
                <ul className="mt-5 space-y-2.5 border-t border-sky-100/80 dark:border-sky-900/60 pt-4 font-body text-[13.5px] sm:text-sm text-ink-800/85 dark:text-slate-300">
                  {batch.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-sky-500 bg-white dark:bg-slate-900" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ২ ঘণ্টার লক সমন্বিত গ্রেডিয়েন্ট শাইন বাটন */}
              <div className="mt-7 border-t border-sky-100/80 dark:border-sky-900/60 pt-4">
                <BatchCardButton
                  batchName={batch.name}
                  isLocked={isLocked}
                  onSelect={handleSelectBatch}
                  btnText={t.batches.enrollBtn}
                />
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
