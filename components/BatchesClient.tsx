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

const EASE = [0.16, 1, 0.3, 1] as const;

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16 } },
};

// "টাইমটেবিল শিট" — কার্ডটি ওপর থেকে নিচে গুটানো কাগজের মতো খুলে যায়
// (শেষে নেগেটিভ ইনসেট, যাতে হোভারের ছায়া কাটা না পড়ে)
const sheetVariants = {
  hidden: { opacity: 0, y: 26, clipPath: "inset(0% 0% 100% 0% round 24px)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(-12% -12% -12% -12% round 24px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

// কার্ডের মাথার নীল রেখা বাম থেকে ডানে আঁকা হয়
const barVariants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, delay: 0.3, ease: EASE } },
};

// ঘড়ির আইকন ঘুরে বসে, সময়সূচী ক্যাপসুল পাশ থেকে স্লাইড করে আসে
const clockVariants = {
  hidden: { opacity: 0, rotate: -200, scale: 0.5 },
  show: { opacity: 1, rotate: 0, scale: 1, transition: { type: "spring" as const, stiffness: 140, damping: 14, delay: 0.5 } },
};
const scheduleVariants = {
  hidden: { opacity: 0, x: -22 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.42, ease: EASE } },
};

// ফিচার তালিকা: একটার পর একটা "টিক" পড়ে (চেকলিস্ট টিক-অফ)
const listVariants = {
  hidden: {},
  show: { transition: { delayChildren: 0.6, staggerChildren: 0.11 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};
const tickCircleVariants = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { type: "spring" as const, stiffness: 420, damping: 16 } },
};
const tickPathVariants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 0.35, delay: 0.12, ease: "easeOut" as const } },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 240, damping: 18, delay: 1 } },
};

function handleSpot(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

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
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {batches.map((batch) => (
            <m.div
              key={batch.id}
              variants={sheetVariants}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              onMouseMove={handleSpot}
              className="batch-spot group relative flex h-full flex-col justify-between rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/80 p-6 sm:p-8 shadow-xs backdrop-blur-sm transition-all hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-xl hover:shadow-sky-950/5"
            >
              {/* মাথার অ্যাকসেন্ট রেখা */}
              <m.div
                variants={barVariants}
                aria-hidden="true"
                className="absolute left-7 right-7 top-0 h-[3px] origin-left rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400"
              />
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
                <m.div
                  variants={scheduleVariants}
                  className="mt-3.5 flex items-center gap-2 rounded-2xl border border-sky-100 dark:border-sky-800/80 bg-sky-50/70 dark:bg-slate-800/60 px-3.5 py-2.5 font-body text-xs font-bold text-sky-800 dark:text-sky-300"
                >
                  <m.svg variants={clockVariants} className="h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </m.svg>
                  <span>{batch.schedule}</span>
                </m.div>

                {/* ব্যাচ ফিচার তালিকা */}
                <m.ul variants={listVariants} className="mt-5 space-y-2.5 border-t border-sky-100/80 dark:border-sky-900/60 pt-4 font-body text-[13.5px] sm:text-sm text-ink-800/85 dark:text-slate-300">
                  {batch.features.map((feat) => (
                    <m.li key={feat} variants={itemVariants} className="flex items-start gap-2.5">
                      <m.span
                        variants={tickCircleVariants}
                        className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-sky-500 shadow-sm shadow-sky-500/30"
                      >
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="white" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
                          <m.path variants={tickPathVariants} d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                      </m.span>
                      <span className="leading-relaxed">{feat}</span>
                    </m.li>
                  ))}
                </m.ul>
              </div>

              {/* ২ ঘণ্টার লক সমন্বিত গ্রেডিয়েন্ট শাইন বাটন */}
              <m.div variants={ctaVariants} className="mt-7 border-t border-sky-100/80 dark:border-sky-900/60 pt-4">
                <BatchCardButton
                  batchName={batch.name}
                  isLocked={isLocked}
                  onSelect={handleSelectBatch}
                  btnText={t.batches.enrollBtn}
                />
              </m.div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
