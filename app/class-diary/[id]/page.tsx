import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getClassDiaryEntryById } from "@/lib/academyData";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const entry = await getClassDiaryEntryById(id);

  if (!entry) {
    return { title: "ক্লাস ডায়েরি পাওয়া যায়নি | Ahsan's Learning Academy" };
  }

  return {
    title: `${entry.topic} | আজকের ক্লাস ডায়েরি`,
    description: entry.note || `${entry.batch} এর ক্লাস লেকচার নোট ও শিট।`,
  };
}

export default async function SingleClassDiaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = await getClassDiaryEntryById(id);

  if (!entry) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-ink-800">
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ১. টপ হেডার কার্ড (ন্যাভবার ছাড়া ক্লিন ফিরে যান বাটন, তারিখ ও ব্যাচ) */}
        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-b from-[#e0f2fe]/60 via-white to-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sky-100/80 pb-5">
            <Link
              href="/class-diary"
              className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white px-4 py-2 font-body text-xs font-bold text-sky-950 shadow-xs transition-all hover:bg-sky-50 active:scale-95 sm:px-5 sm:py-2.5 sm:text-[13px]"
            >
              <svg className="h-4 w-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>সব ক্লাস ডায়েরিতে ফিরে যান</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-sky-50 px-3.5 py-1 font-body text-xs font-bold text-sky-800">
                <svg className="h-3.5 w-3.5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{entry.date}</span>
              </span>

              {entry.batch && (
                <span className="rounded-full bg-slate-100 px-3 py-1 font-body text-xs font-medium text-slate-700">
                  {entry.batch}
                </span>
              )}
            </div>
          </div>

          {/* লেকচারের মূল শিরোনাম */}
          <h1 className="mt-6 font-body text-2xl font-black leading-tight text-sky-950 sm:text-3xl lg:text-4xl">
            {entry.topic}
          </h1>
        </div>

        {/* ২. লেকচার নোট ও শিট কন্টেন্ট কার্ড */}
        <div className="mt-6 rounded-3xl border border-sky-100 bg-white p-6 shadow-xs sm:p-10">
          {/* লেকচার নোট */}
          <div className="space-y-4 font-body text-[15px] sm:text-base leading-[1.9] text-ink-800/90 whitespace-pre-line">
            {entry.note ? (
              entry.note
            ) : (
              <p className="text-muted italic">এই ক্লাসের কোনো অতিরিক্ত নোট যুক্ত করা হয়নি।</p>
            )}
          </div>

          {/* স্লাইড বা গুগল ড্রাইভ পিডিএফ লিংক বক্স (যদি থাকে) */}
          {entry.slideUrl && (
            <div className="mt-8 rounded-2xl border border-sky-200 bg-sky-50/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body text-sm font-bold text-sky-950">ক্লাস লেকচার শিট ও প্রেজেন্টেশন</p>
                  <p className="font-body text-xs text-sky-800">সম্পূর্ণ শিট বা স্লাইড অনলাইনে দেখতে ক্লিক করুন</p>
                </div>
              </div>

              <a
                href={entry.slideUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-sky-600 px-6 py-2.5 font-body text-xs font-bold text-white shadow-xs transition-all hover:bg-sky-700 active:scale-95"
              >
                <span>স্লাইড ওপেন করুন</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          )}

          {/* সবার শেষে ডানপাশে স্যারের মার্জিত ইটালিক সিগনেচার */}
          <div className="mt-12 border-t border-sky-100/80 pt-6 flex flex-col items-end text-right">
            <span className="font-display italic text-lg sm:text-xl font-black text-sky-950 tracking-wide">
              — Md. Ahsan Ullah
            </span>
            <span className="font-body text-xs font-semibold text-sky-700 mt-0.5">
              Ahsan&apos;s Learning Academy
            </span>
          </div>
        </div>
      </article>

      {/* ফুটার */}
      <Footer />
    </main>
  );
            }
