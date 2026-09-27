import Link from "next/link";
import type { Metadata } from "next";
import { getAllPublishedBlogPosts } from "@/lib/academyData";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "সকল ব্লগ ও স্টাডি গাইডলাইন | Ahsan's Learning Academy",
  description:
    "HSC English ও ICT প্রস্তুতি, সিলেবাস বিশ্লেষণ ও পরীক্ষার টিপস নিয়ে মোঃ আহসান উল্লাহ স্যারের সকল আর্টিকেল।",
};

export default async function AllBlogPage() {
  const posts = await getAllPublishedBlogPosts();

  return (
    <main className="min-h-screen bg-[#f8fafc] text-ink-800">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ১. ভাঙচুর রেফারেন্স স্টাইল টপ হেডার কার্ড (ন্যাভবার ছাড়া সম্পূর্ণ ক্লিন) */}
        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-b from-[#e0f2fe]/60 via-white to-white p-6 shadow-xs sm:p-8">
          {/* টপ বার: হোমপেজে ফিরে যান বাটন */}
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
              মোট আর্টিকেল: {posts.length}টি
            </span>
          </div>

          {/* হেডার টাইটেল ও সার্কুলার আইকন */}
          <div className="mt-6 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 shadow-xs">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div>
              <h1 className="font-body text-xl font-black text-sky-950 sm:text-2xl lg:text-3xl">
                সকল ব্লগ ও আর্টিকেল
              </h1>
              <p className="mt-1 font-body text-xs sm:text-sm font-semibold text-sky-700">
                ইংরেজি ও আইসিটির গুরুত্বপূর্ণ টপিক, বোর্ড প্রশ্ন সমাধান ও সহজ টেকনিক নিয়ে দিকনির্দেশনা
              </p>
            </div>
          </div>
        </div>

        {/* ২. প্রিমিয়াম ব্লগ গ্রিড */}
        {posts.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-sky-100 bg-white p-12 text-center shadow-xs max-w-md mx-auto">
            <p className="font-body text-base font-bold text-sky-950">শীঘ্রই নতুন ব্লগ প্রকাশিত হবে</p>
            <p className="mt-1 font-body text-xs text-ink-800/70">নিয়মিত চোখ রাখুন এবং ক্লাসের নোটগুলো দেখতে থাকুন।</p>
            <Link
              href="/"
              className="mt-5 inline-block rounded-full bg-sky-600 px-6 py-2.5 font-body text-xs font-bold text-white hover:bg-sky-700 transition-all"
            >
              হোমপেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex h-full flex-col justify-between rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5"
              >
                <div>
                  {/* কভার ইমেজ (যদি থাকে) */}
                  {post.coverImageUrl && (
                    <div className="mb-5 overflow-hidden rounded-2xl aspect-video w-full bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* তারিখ ব্যাজ (SVG আইকন সহ) */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-sky-50 px-3.5 py-1 font-body text-xs font-bold text-sky-800">
                      <svg className="h-3.5 w-3.5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{post.date}</span>
                    </span>
                  </div>

                  {/* আর্টিকেল শিরোনাম */}
                  <h2 className="mt-4 font-body text-lg font-black leading-snug text-sky-950 transition-colors group-hover:text-sky-700 sm:text-[19px] line-clamp-2">
                    <Link href={post.href}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* সংক্ষিপ্ত বিবরণ */}
                  <p className="mt-2.5 font-body text-sm leading-[1.75] text-ink-800/80 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* সম্পূর্ণ আর্টিকেল পড়ার বাটন */}
                <div className="mt-6 border-t border-sky-100/80 pt-4">
                  <Link
                    href={post.href}
                    className="inline-flex w-full items-center justify-center rounded-full border border-sky-200/80 bg-sky-50/50 py-2.5 text-center font-body text-xs font-bold text-sky-900 transition-all group-hover:border-sky-600 group-hover:bg-sky-600 group-hover:text-white sm:text-sm"
                  >
                    সম্পূর্ণ আর্টিকেল পড়ুন
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
