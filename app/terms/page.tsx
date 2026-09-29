import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ব্যবহারের শর্তাবলী | Ahsan's Learning Academy",
  description: "Ahsan's Learning Academy ওয়েবসাইট ব্যবহার ও শিক্ষামূলক সেবা গ্রহণের নিয়ম ও শর্তাবলী।",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#dff1fd] via-[#eaf5fe] to-[#d3e9fc] dark:from-[#071322] dark:via-[#091a2e] dark:to-[#0c243e] text-ink-800 dark:text-slate-200">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ১. ভাঙচুর রেফারেন্স স্টাইল টপ হেডার কার্ড (ন্যাভবার ছাড়া সম্পূর্ণ ক্লিন) */}
        <div className="overflow-hidden rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-gradient-to-b from-[#e0f2fe]/60 dark:from-sky-900/40 via-white dark:via-slate-900 to-white dark:to-slate-900 p-6 shadow-xs sm:p-8">
          {/* টপ বার: ফিরে যান বাটন ও সর্বশেষ আপডেট তারিখ */}
          <div className="flex items-center justify-between gap-4 border-b border-sky-100/80 dark:border-sky-900/60 pb-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 dark:border-sky-800 bg-white dark:bg-slate-900/85 px-4 py-2 font-body text-xs font-bold text-sky-950 dark:text-white shadow-xs transition-all hover:bg-sky-50 dark:hover:bg-slate-800 active:scale-95 sm:px-5 sm:py-2.5 sm:text-[13px]"
            >
              <svg className="h-4 w-4 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>ফিরে যান</span>
            </Link>

            <span className="font-body text-xs font-semibold text-slate-500 dark:text-slate-400">
              সর্বশেষ আপডেট: সেপ্টেম্বর ২০২৬
            </span>
          </div>

          {/* হেডার টাইটেল ও সার্কুলার আইকন */}
          <div className="mt-6 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 shadow-xs">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="font-body text-xl font-black text-sky-950 dark:text-white sm:text-2xl lg:text-3xl">
                ব্যবহারের শর্তাবলী (Terms & Conditions)
              </h1>
              <p className="mt-1 font-body text-xs sm:text-sm font-semibold text-sky-700 dark:text-sky-300">
                ওয়েবসাইট ব্যবহার ও শিক্ষামূলক সেবা গ্রহণের সাধারণ নিয়মাবলী
              </p>
            </div>
          </div>
        </div>

        {/* ২. সেগমেন্টেড বিষয়ভিত্তিক শর্তাবলী কার্ডসমূহ */}
        <div className="mt-6 space-y-5">
          {/* কার্ড ১: ওয়েবসাইট সম্পর্কে */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold text-xs">
                ০১
              </div>
              <h2 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                ওয়েবসাইট সম্পর্কে
              </h2>
            </div>
            <p className="mt-3.5 font-body text-xs sm:text-[14px] leading-[1.8] text-ink-800/85 dark:text-slate-300">
              এই ওয়েবসাইট (Ahsan&apos;s Learning Academy) মোঃ আহসান উল্লাহ পরিচালিত প্রাইভেট ব্যাচ ও লার্নিং সেন্টারের ক্লাস রুটিন, দৈনন্দিন ক্লাস ডায়েরি, ভিডিও লেকচার ও ভর্তি সংক্রান্ত সেবা শিক্ষার্থীদের সহজে পৌঁছে দেওয়ার জন্য নির্মিত একটি ব্যক্তিগত প্ল্যাটফর্ম।
            </p>
          </div>

          {/* কার্ড ২: শিক্ষামূলক কনটেন্টের ব্যবহার */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold text-xs">
                ০২
              </div>
              <h2 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                শিক্ষামূলক কনটেন্টের ব্যবহার
              </h2>
            </div>
            <p className="mt-3.5 font-body text-xs sm:text-[14px] leading-[1.8] text-ink-800/85 dark:text-slate-300">
              এই ওয়েবসাইটে প্রকাশিত ক্লাস নোট, ভিডিও ক্লাস, স্লাইড ও স্টাডি ব্লগ শুধুমাত্র শিক্ষার্থীদের ব্যক্তিগত পড়াশোনা ও মেধা বিকাশের জন্য উন্মুক্ত। পূর্বানুমতি ছাড়া কোনো কনটেন্ট বাণিজ্যিকভাবে পুনরুৎপাদন বা বিক্রি করা নিষিদ্ধ।
            </p>
          </div>

          {/* কার্ড ৩: ভর্তি আবেদন ও আসন নিশ্চিতকরণ */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold text-xs">
                ০৩
              </div>
              <h2 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                ভর্তি আবেদন ও আসন নিশ্চিতকরণ
              </h2>
            </div>
            <p className="mt-3.5 font-body text-xs sm:text-[14px] leading-[1.8] text-ink-800/85 dark:text-slate-300">
              ওয়েবসাইটে ভর্তি ফরম পূরণ করলেই স্বয়ংক্রিয়ভাবে ক্লাসের আসন চূড়ান্ত হয় না। আবেদন জমা দেওয়ার পর একাডেমি কর্তৃপক্ষ সরাসরি শিক্ষার্থী বা অভিভাবকের সাথে যোগাযোগ করে ক্লাসের সময়সূচী ও ব্যাচ নিশ্চিত করে থাকে। সঠিক ও হালনাগাদ তথ্য প্রদান করা আবেদনকারীর দায়িত্ব।
            </p>
          </div>

          {/* কার্ড ৪: মতামত ও রিভিউ প্রকাশ */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold text-xs">
                ০৪
              </div>
              <h2 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                মতামত ও রিভিউ প্রকাশ
              </h2>
            </div>
            <p className="mt-3.5 font-body text-xs sm:text-[14px] leading-[1.8] text-ink-800/85 dark:text-slate-300">
              শিক্ষার্থী বা অভিভাবক কর্তৃক জমাকৃত মতামত ও ফিডব্যাক পর্যালোচনার পর ওয়েবসাইটে প্রকাশ করা হয়। যেকোনো বিভ্রান্তিকর, কুরুচিপূর্ণ বা অপ্রাসঙ্গিক বার্তা প্রকাশ না করার পূর্ণ অধিকার একাডেমি কর্তৃপক্ষের রয়েছে।
            </p>
          </div>

          {/* কার্ড ৫: বহিঃসংযোগ (External Links) */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold text-xs">
                ০৫
              </div>
              <h2 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                বহিঃসংযোগ (External Links)
              </h2>
            </div>
            <p className="mt-3.5 font-body text-xs sm:text-[14px] leading-[1.8] text-ink-800/85 dark:text-slate-300">
              আমাদের ওয়েবসাইটে গুগল ম্যাপস, ইউটিউব বা ফেসবুকের লিংক সংযুক্ত থাকতে পারে। ওই সকল প্ল্যাটফর্মের নিজস্ব ব্যবহারের শর্তাবলী ও নীতিমালার জন্য সংশ্লিষ্ট প্ল্যাটফর্ম দায়ী।
            </p>
          </div>

          {/* কার্ড ৬: শর্তাবলীর পরিবর্তন ও যোগাযোগ */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold text-xs">
                ০৬
              </div>
              <h2 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                শর্তাবলীর পরিবর্তন ও যোগাযোগ
              </h2>
            </div>
            <p className="mt-3.5 font-body text-xs sm:text-[14px] leading-[1.8] text-ink-800/85 dark:text-slate-300">
              প্রয়োজন অনুযায়ী যেকোনো সময় এই ব্যবহারের শর্তাবলী হালনাগাদ করা হতে পারে। কোনো প্রশ্ন বা তথ্যের জন্য সরাসরি আমাদের ফোন বা হোয়াটসঅ্যাপ নম্বরে (+880 1845-435539) যোগাযোগ করা যাবে।
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
