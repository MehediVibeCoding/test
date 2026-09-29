"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import { useApp } from "@/context/AppContext";
import type { ClassDiaryEntry } from "@/lib/academyData";

type ClassDiaryClientProps = {
  entries: ClassDiaryEntry[];
};

export default function ClassDiaryClient({ entries }: ClassDiaryClientProps) {
  const { language } = useApp();
  // হোমপেজে সর্বদা সর্বশেষ ৩টি ক্লাস ডায়েরি কার্ড
  const displayEntries = entries.slice(0, 3);

  return (
    <section
      id="class-diary"
      className="relative px-6 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-white dark:bg-[#070f1a] overflow-hidden transition-colors"
    >
      {/* ব্যাকগ্রাউন্ড এডুকেশন অ্যাকসেন্ট ডুডলস */}
      <EduDoodles variant="section" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-8 sm:mb-12">
          {/* টপ ব্যাজ */}
          <span className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900/60 px-4 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
            {language === "bn" ? "ডিজিটাল ক্লাস ডায়েরি" : "Digital Class Diary"}
          </span>

          {/* শিরোনাম ও 'সবগুলো দেখুন' বাটন */}
          <div className="mt-3 flex items-center justify-between gap-4">
            <h2 className="font-body text-2xl font-black tracking-tight text-sky-950 dark:text-white sm:text-4xl lg:text-[38px] leading-tight">
              {language === "bn" ? "আজকের ক্লাস ডায়েরি" : "Today's Class Diary"}
            </h2>

            <Link
              href="/class-diary"
              className="btn-gradient inline-flex shrink-0 items-center justify-center rounded-full px-5 py-2 font-body text-xs font-bold text-white shadow-sm transition-all active:scale-95 sm:px-6 sm:py-2.5 sm:text-sm"
            >
              {language === "bn" ? "সবগুলো দেখুন" : "View All Entries"}
            </Link>
          </div>

          {/* সাবটাইটেল */}
          <p className="mt-2.5 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 dark:text-slate-300 sm:text-[15px]">
            {language === "bn"
              ? "প্রতিদিনের ক্লাসের মূল বিষয়বস্তু, লেকচার নোট ও গুরুত্বপূর্ণ শিট সহজে খুঁজে নাও।"
              : "Access daily classroom lecture summaries, fundamental concepts, and essential lecture notes."}
          </p>
        </Reveal>

        {/* ৩টি ক্লাস ডায়েরি কার্ড গ্রিড */}
        {displayEntries.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-sky-50/40 dark:bg-slate-900/60 p-8 text-center">
            <p className="font-body text-base font-bold text-sky-950 dark:text-white">
              {language === "bn" ? "শীঘ্রই নতুন ক্লাস নোট প্রকাশিত হবে" : "New class notes will be published soon"}
            </p>
            <p className="mt-1 font-body text-xs text-ink-800/70 dark:text-slate-400">
              {language === "bn" ? "নিয়মিত ক্লাসের আপডেট দেখতে চোখ রাখুন।" : "Stay tuned for regular classroom updates."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayEntries.map((entry, i) => (
              <Reveal key={entry.id} delay={(i % 3) * 90}>
                <article className="group flex h-full flex-col justify-between rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/80 p-6 sm:p-8 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-xl hover:shadow-sky-950/5">
                  <div>
                    {/* তারিখ ও ব্যাচ ট্যাগ */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 rounded-full border border-sky-200/80 dark:border-sky-800 bg-sky-50 dark:bg-sky-950 px-3 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
                        <svg className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 2 2z" />
                        </svg>
                        <span>{entry.date}</span>
                      </span>

                      {entry.batch && (
                        <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-0.5 font-body text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {entry.batch}
                        </span>
                      )}
                    </div>

                    {/* ক্লাসের মূল বিষয়বস্তু */}
                    <h3 className="mt-5 font-body text-lg font-black leading-snug text-sky-950 dark:text-white transition-colors group-hover:text-sky-600 dark:group-hover:text-sky-400 sm:text-[19px] line-clamp-2">
                      <Link href={`/class-diary/${entry.id}`}>
                        {entry.topic}
                      </Link>
                    </h3>

                    {/* ক্লাসের সারসংক্ষেপ নোট */}
                    <p className="mt-2.5 font-body text-sm leading-[1.75] text-ink-800/85 dark:text-slate-300 line-clamp-3">
                      {entry.note}
                    </p>
                  </div>

                  {/* একক বিস্তারিত পেজের বাটন */}
                  <div className="mt-6 border-t border-sky-100/80 dark:border-slate-800 pt-4">
                    <Link
                      href={`/class-diary/${entry.id}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-200/80 dark:border-sky-800 bg-sky-50/50 dark:bg-slate-800/60 py-2.5 text-center font-body text-xs font-bold text-sky-900 dark:text-sky-200 transition-all hover:border-sky-600 hover:bg-sky-600 hover:text-white active:scale-95 sm:text-sm"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>
                        {language === "bn" ? "লেকচার শিট ও নোট দেখুন" : "View Lecture Sheet & Notes"}
                      </span>
                    </Link>
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
