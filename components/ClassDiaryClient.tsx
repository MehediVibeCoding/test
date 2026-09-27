"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import type { ClassDiaryEntry } from "@/lib/academyData";

type ClassDiaryClientProps = {
  entries: ClassDiaryEntry[];
};

const ALL_LABEL = "সব ব্যাচ";

export default function ClassDiaryClient({ entries }: ClassDiaryClientProps) {
  const batchTabs = useMemo(() => {
    const uniqueBatches = Array.from(new Set(entries.map((e) => e.batch).filter(Boolean)));
    return [ALL_LABEL, ...uniqueBatches];
  }, [entries]);

  const [selected, setSelected] = useState(ALL_LABEL);

  const filtered = useMemo(
    () => (selected === ALL_LABEL ? entries : entries.filter((e) => e.batch === selected)),
    [entries, selected]
  );

  return (
    <section id="class-diary" className="relative px-6 py-20 sm:px-8 sm:py-28 lg:px-12 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* ১. সেকশন হেডার */}
        <Reveal className="mb-12 text-center sm:mb-16">
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
            ডিজিটাল ক্লাস ডায়েরি
          </span>
          <h2 className="mt-3.5 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[40px]">
            আজকের ক্লাস ডায়েরি ও বাড়ির কাজ
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-[15px] leading-[1.8] text-ink-800/80 sm:text-base">
            ক্লাসে যা পড়ানো হয়েছে ভুলে গেছো? এখানে প্রতিদিনের ক্লাসের মূল টপিক, সারসংক্ষেপ ও হোমওয়ার্ক স্লাইড খুব সহজেই খুঁজে পাবে।
          </p>
        </Reveal>

        {/* ২. ব্যাচ ফিল্টার পিলস (মডার্ন ক্যাপসুল সুইচ) */}
        <Reveal className="mb-10 flex flex-wrap justify-center gap-2.5" delay={80}>
          {batchTabs.map((batch) => {
            const isActive = selected === batch;
            return (
              <button
                key={batch}
                onClick={() => setSelected(batch)}
                className={`rounded-full px-5 py-2 font-body text-xs sm:text-[13px] font-bold transition-all active:scale-95 ${
                  isActive
                    ? "bg-sky-600 text-white shadow-sm"
                    : "border border-sky-100 bg-sky-50/50 text-sky-950 hover:bg-sky-100/70"
                }`}
              >
                {batch}
              </button>
            );
          })}
        </Reveal>

        {/* ৩. ক্লাস ডায়েরি প্রিমিয়াম কার্ড গ্রিড */}
        {filtered.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-sky-100 bg-sky-50/40 p-10 text-center">
            <p className="font-body text-base font-bold text-sky-950">এই ব্যাচের কোনো ডায়েরি পাওয়া যায়নি</p>
            <p className="mt-1 font-body text-xs text-ink-800/70">শীঘ্রই পরবর্তী ক্লাসের নোট হালনাগাদ করা হবে।</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((entry) => (
              <Reveal key={entry.id}>
                <article className="group flex h-full flex-col justify-between rounded-3xl border border-sky-100 bg-white p-7 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5">
                  <div>
                    {/* তারিখ ও ব্যাচ ট্যাগ */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 font-body text-xs font-bold text-sky-800">
                        <svg className="h-3.5 w-3.5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{entry.date}</span>
                      </span>

                      {entry.batch && (
                        <span className="rounded-full bg-slate-100 px-3 py-0.5 font-body text-xs font-medium text-slate-600">
                          {entry.batch}
                        </span>
                      )}
                    </div>

                    {/* ক্লাসের মূল বিষয়বস্তু */}
                    <h3 className="mt-5 font-body text-lg font-black leading-snug text-sky-950 sm:text-[19px]">
                      {entry.topic}
                    </h3>

                    {/* ক্লাসের সারসংক্ষেপ ও হোমওয়ার্ক */}
                    <p className="mt-3 font-body text-sm leading-[1.75] text-ink-800/85 line-clamp-3">
                      {entry.note}
                    </p>
                  </div>

                  {/* লেকচার স্লাইড পিল বাটন */}
                  <div className="mt-7 border-t border-sky-100/80 pt-4">
                    <a
                      href={entry.slideUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/50 py-2.5 text-center font-body text-xs font-bold text-sky-900 transition-all hover:border-sky-600 hover:bg-sky-600 hover:text-white active:scale-95 sm:text-sm"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>লেকচার স্লাইড ও হ্যান্ডনোট দেখুন</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
