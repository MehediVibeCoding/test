import Link from "next/link";
import type { Metadata } from "next";
import { getAllClassDiaryEntries } from "@/lib/academyData";
import Footer from "@/components/Footer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "সকল ক্লাস ডায়েরি ও লেকচার নোট | Ahsan's Learning Academy",
  description:
    "HSC English ও ICT-র প্রতিদিনের ক্লাসের সারসংক্ষেপ, বিষয়ের মূল পয়েন্ট ও গুরুত্বপূর্ণ লেকচার শিটের সম্পূর্ণ আর্কাইভ।",
};

export default async function AllClassDiaryPage() {
  const entries = await getAllClassDiaryEntries();

  return (
    <main className="min-h-screen bg-[#f8fafc] text-ink-800">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ১. ভাঙচুর রেফারেন্স স্টাইল টপ হেডার কার্ড (ন্যাভবার ছাড়া সম্পূর্ণ ক্লিন) */}
        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-b from-[#e0f2fe]/60 via-white to-white p-6 shadow-xs sm:p-8">
          {/* টপ বার: হোমপেজে ফিরে যান বাটন ও মোট সংখ্যা */}
          <div className="flex items-center justify-between gap-4 border-b border-sky-100/80 pb-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white px-4 py-2 font-body text-xs font-bold text-sky-950 shadow-xs transition-all hover:bg-sky-50 active:scale-95 sm:px-5 sm:py-2.5 sm:text-[13px]"
            >
              <svg className="h-4 w-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>হোমপেজে ফিরে যান</span>
            </Link>

            <span className="font-body text-xs font-semibold text-slate-500">
              মোট ক্লাস নোট: {entries.length}টি
            </span>
          </div>

          {/* হেডার টাইটেল ও সার্কুলার ডায়েরি আইকন */}
          <div className="mt-6 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 shadow-xs">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 className="font-body text-xl font-black text-sky-950 sm:text-2xl lg:text-3xl">
                সকল ক্লাস ডায়েরি ও লেকচার নোট
              </h1>
              <p className="mt-1 font-body text-xs sm:text-sm font-semibold text-sky-700">
                প্রতিদিনের ক্লাসের মূল আলোচনা, নোট ও লেকচার শিটের সম্পূর্ণ তালিকা
              </p>
            </div>
          </div>
        </div>

        {/* ২. ক্লাস ডায়েরি আর্কাইভ গ্রিড (সর্বশেষ প্রকাশিত ক্রমানুসারে) */}
        {entries.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-sky-100 bg-white p-12 text-center shadow-xs max-w-md mx-auto">
            <p className="font-body text-base font-bold text-sky-950">শীঘ্রই নতুন ক্লাস নোট প্রকাশিত হবে</p>
            <p className="mt-1 font-body text-xs text-ink-800/70">নিয়মিত ক্লাসের আপডেট দেখতে চোখ রাখুন।</p>
            <Link
              href="/"
              className="mt-5 inline-block rounded-full bg-sky-600 px-6 py-2.5 font-body text-xs font-bold text-white hover:bg-sky-700 transition-all"
            >
              হোমপেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="group flex h-full flex-col justify-between rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5"
              >
                <div>
                  {/* তারিখ ও ব্যাচ ট্যাগ */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-sky-50 px-3.5 py-1 font-body text-xs font-bold text-sky-800">
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
                  <h2 className="mt-5 font-body text-lg font-black leading-snug text-sky-950 transition-colors group-hover:text-sky-700 sm:text-[19px] line-clamp-2">
                    <Link href={`/class-diary/${entry.id}`}>
                      {entry.topic}
                    </Link>
                  </h2>

                  {/* ক্লাসের সারসংক্ষেপ নোট */}
                  <p className="mt-2.5 font-body text-sm leading-[1.75] text-ink-800/80 line-clamp-3">
                    {entry.note}
                  </p>
                </div>

                {/* একক বিস্তারিত পেজের বাটন */}
                <div className="mt-6 border-t border-sky-100/80 pt-4">
                  <Link
                    href={`/class-diary/${entry.id}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sky-200/80 bg-sky-50/50 py-2.5 text-center font-body text-xs font-bold text-sky-900 transition-all group-hover:border-sky-600 group-hover:bg-sky-600 group-hover:text-white sm:text-sm"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>লেকচার শিট ও নোট দেখুন</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
              }
