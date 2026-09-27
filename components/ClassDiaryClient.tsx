"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import type { ClassDiaryEntry } from "@/lib/academyData";

type ClassDiaryClientProps = {
  entries: ClassDiaryEntry[];
};

export default function ClassDiaryClient({ entries }: ClassDiaryClientProps) {
  // হোমপেজে শুধুমাত্র HSC 26 ও HSC 27 ব্যাচের সহজ ফিল্টার
  const [selectedCohort, setSelectedCohort] = useState<"all" | "26" | "27">("all");

  // হোমপেজে প্রদর্শনের জন্য ফিল্টার করা সর্বশেষ ৩টি ক্লাস ডায়েরি
  const displayEntries = useMemo(() => {
    let list = entries;

    if (selectedCohort === "26") {
      list = entries.filter((e) => e.batch.includes("26") || e.batch.includes("২৬"));
    } else if (selectedCohort === "27") {
      list = entries.filter((e) => e.batch.includes("27") || e.batch.includes("২৭"));
    }

    // রিসেন্ট পাবলিশ অনুযায়ী সবসময় শীর্ষ ৩টি কার্ড
    return list.slice(0, 3);
  }, [entries, selectedCohort]);

  return (
    <section id="class-diary" className="relative px-6 py-10 sm:px-8 sm:py-14 lg:py-16 lg:px-12 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* ১. সেকশন হেডার (কোনো বাড়ির কাজ শব্দ ছাড়া) */}
        <Reveal className="mb-8 sm:mb-12">
          {/* টপ ব্যাজ */}
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
            ডিজিটাল ক্লাস ডায়েরি
          </span>

          {/* হেডার ও ডানপাশের 'সবগুলো দেখুন →' বাটন */}
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[38px] leading-tight">
                আজকের ক্লাস ডায়েরি
              </h2>
              <p className="mt-2 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 sm:text-[15px]">
                প্রতিদিনের ক্লাসের মূল বিষয়বস্তু, লেকচার নোট ও গুরুত্বপূর্ণ শিট সহজে খুঁজে নাও।
              </p>
            </div>

            {/* ডানপাশে সব ডায়েরি দেখার নীল বাটন */}
            <Link
              href="/class-diary"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-sky-600 px-6 py-2.5 font-body text-xs font-bold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-95 sm:text-sm self-start sm:self-auto"
            >
              <span>সবগুলো দেখুন</span>
              <span>→</span>
            </Link>
          </div>
        </Reveal>

        {/* ২. ব্যাচ ফিল্টার বোতামসমূহ (এইচএসসি ২৬ ও এইচএসসি ২৭) */}
        <Reveal className="mb-8 flex items-center gap-2" delay={80}>
          <button
            onClick={() => setSelectedCohort("all")}
            className={`rounded-full px-4 py-1.5 font-body text-xs font-bold transition-all ${
              selectedCohort === "all"
                ? "bg-sky-950 text-white shadow-xs"
                : "border border-sky-100 bg-sky-50/60 text-sky-900 hover:bg-sky-100"
            }`}
          >
            সকল ব্যাচ
          </button>
          <button
            onClick={() => setSelectedCohort("26")}
            className={`rounded-full px-4 py-1.5 font-body text-xs font-bold transition-all ${
              selectedCohort === "26"
                ? "bg-sky-950 text-white shadow-xs"
                : "border border-sky-100 bg-sky-50/60 text-sky-900 hover:bg-sky-100"
            }`}
          >
            এইচএসসি ২৬
          </button>
          <button
            onClick={() => setSelectedCohort("27")}
            className={`rounded-full px-4 py-1.5 font-body text-xs font-bold transition-all ${
              selectedCohort === "27"
                ? "bg-sky-950 text-white shadow-xs"
                : "border border-sky-100 bg-sky-50/60 text-sky-900 hover:bg-sky-100"
            }`}
          >
            এইচএসসি ২৭
          </button>
        </Reveal>

        {/* ৩. সর্বশেষ ৩টি ক্লাস ডায়েরি কার্ড গ্রিড */}
        {displayEntries.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-sky-100 bg-sky-50/40 p-8 text-center">
            <p className="font-body text-base font-bold text-sky-950">এই ব্যাচের কোনো ক্লাস নোট পাওয়া যায়নি</p>
            <p className="mt-1 font-body text-xs text-ink-800/70">শীঘ্রই পরবর্তী ক্লাসের ডায়েরি হালনাগাদ করা হবে।</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayEntries.map((entry) => (
              <Reveal key={entry.id}>
                <article className="group flex h-full flex-col justify-between rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5">
                  <div>
                    {/* তারিখ ও ব্যাচ ট্যাগ */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 font-body text-xs font-bold text-sky-800">
                        <svg className="h-3.5 w-3.5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 2 2z" />
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
                    <h3 className="mt-5 font-body text-lg font-black leading-snug text-sky-950 transition-colors group-hover:text-sky-700 sm:text-[19px] line-clamp-2">
                      {entry.topic}
                    </h3>

                    {/* ক্লাসের সারসংক্ষেপ নোট */}
                    <p className="mt-2.5 font-body text-sm leading-[1.75] text-ink-800/85 line-clamp-3">
                      {entry.note}
                    </p>
                  </div>

                  {/* ডেডিকেটেড ক্লাস ডায়েরি বিস্তারিত পেজের লিংক বাটন */}
                  <div className="mt-6 border-t border-sky-100/80 pt-4">
                    <Link
                      href={`/class-diary/${entry.id}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/50 py-2.5 text-center font-body text-xs font-bold text-sky-900 transition-all hover:border-sky-600 hover:bg-sky-600 hover:text-white active:scale-95 sm:text-sm"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>লেকচার শিট ও নোট দেখুন</span>
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
