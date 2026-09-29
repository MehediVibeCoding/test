import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি | Ahsan's Learning Academy",
  description:
    "Ahsan's Learning Academy কীভাবে শিক্ষার্থী ও অভিভাবকদের তথ্য সংগ্রহ, ব্যবহার ও সংরক্ষণ করে তার বিস্তারিত নির্দেশিকা।",
};

export default function PrivacyPolicyPage() {
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="font-body text-xl font-black text-sky-950 dark:text-white sm:text-2xl lg:text-3xl">
                গোপনীয়তা নীতি (Privacy Policy)
              </h1>
              <p className="mt-1 font-body text-xs sm:text-sm font-semibold text-sky-700 dark:text-sky-300">
                শিক্ষার্থী ও অভিভাবকদের তথ্যের নিরাপত্তা ও গোপনীয়তা নির্দেশিকা
              </p>
            </div>
          </div>
        </div>

        {/* ২. সেগমেন্টেড বিষয়ভিত্তিক কার্ডসমূহ (রেফারেন্স আর্কিটেকচার) */}
        <div className="mt-6 space-y-5">
          {/* কার্ড ১: এই নীতিটি কেন */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold text-xs">
                ০১
              </div>
              <h2 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                এই নীতিটি কেন
              </h2>
            </div>
            <p className="mt-3.5 font-body text-xs sm:text-[14px] leading-[1.8] text-ink-800/85 dark:text-slate-300">
              এই ওয়েবসাইট (Ahsan&apos;s Learning Academy) ভর্তি ফরম ও মতামত ফরমের মাধ্যমে শিক্ষার্থী ও অভিভাবকদের কিছু প্রাথমিক তথ্য সংগ্রহ করে। এই তথ্যগুলো ঠিক কী উদ্দেশ্যে নেওয়া হয়, কীভাবে সংরক্ষণ করা হয় এবং কীভাবে ব্যবহার করা হয়—তা শিক্ষার্থীদের ও অভিভাবকদের স্পষ্ট জানাতে এই নীতি প্রকাশ করা হলো।
            </p>
          </div>

          {/* কার্ড ২: কী কী তথ্য সংগ্রহ করা হয় */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold text-xs">
                ০২
              </div>
              <h2 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                কী কী তথ্য সংগ্রহ করা হয়
              </h2>
            </div>
            <ul className="mt-4 space-y-2.5 font-body text-xs sm:text-[14px] leading-relaxed text-ink-800/85 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                <span><b className="text-sky-950 dark:text-white">ভর্তি ফরমের মাধ্যমে:</b> শিক্ষার্থীর পূর্ণ নাম, কলেজের নাম, কলেজ রোল, বিভাগ/গ্রুপ, নির্বাচিত ব্যাচ, শিক্ষার্থীর মোবাইল নম্বর ও অভিভাবকের মোবাইল নম্বর।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                <span><b className="text-sky-950 dark:text-white">মতামত/রিভিউ ফরমের মাধ্যমে:</b> নাম, ভূমিকা (শিক্ষার্থী/অভিভাবক), ব্যাচ বা শিক্ষাবর্ষ এবং পড়ার অভিজ্ঞতা সম্পর্কে বক্তব্য।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                <span><b className="text-sky-950 dark:text-white">ব্রাউজারে সাময়িকভাবে (localStorage):</b> আবেদন বা রিভিউ জমা দেওয়ার পর ব্যবহারকারীর নিজের ডিভাইসে কনফার্মেশন সামারি মনে রাখার জন্য ব্যবহৃত হয়।</span>
              </li>
            </ul>
          </div>

          {/* কার্ড ৩: তথ্যগুলো কী কাজে ব্যবহার করা হয় */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold text-xs">
                ০৩
              </div>
              <h2 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                তথ্যগুলো কী কাজে ব্যবহার করা হয়
              </h2>
            </div>
            <ul className="mt-4 space-y-2.5 font-body text-xs sm:text-[14px] leading-relaxed text-ink-800/85 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                <span>ভর্তি আবেদন যাচাই করে ব্যাচ ও ক্লাসের সময়সূচী নিশ্চিত করতে যোগাযোগ করা।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                <span>শিক্ষার্থীর ক্লাসের উপস্থিতি ও সাপ্তাহিক মডেল টেস্টের ফলাফল অভিভাবকদের অবহিত করা।</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                <span>অনুমোদনের পর ওয়েবসাইটে মতামত বা রিভিউ প্রদর্শন করা (এক্ষেত্রে ফোন নম্বর বা ব্যক্তিগত সংবেদনশীল তথ্য কখনোই প্রকাশ করা হয় না)।</span>
              </li>
            </ul>
          </div>

          {/* কার্ড ৪: তথ্য সংরক্ষণ ও নিরাপত্তা */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold text-xs">
                ০৪
              </div>
              <h2 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                তথ্য সংরক্ষণ ও নিরাপত্তা
              </h2>
            </div>
            <p className="mt-3.5 font-body text-xs sm:text-[14px] leading-[1.8] text-ink-800/85 dark:text-slate-300">
              সংগ্রহ করা তথ্য সম্পূর্ণ নিরাপদ ডাটাবেজে সংরক্ষিত থাকে এবং শুধুমাত্র একাডেমি পরিচালনার প্রয়োজনে ব্যবহৃত হয়। এই তথ্য কোনো বাণিজ্যিক উদ্দেশ্যে তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করা হয় না।
            </p>
          </div>

          {/* কার্ড ৫: অভিভাবকদের সাথে সংযোগ */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold text-xs">
                ০৫
              </div>
              <h2 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                অভিভাবকদের সাথে সংযোগ
              </h2>
            </div>
            <p className="mt-3.5 font-body text-xs sm:text-[14px] leading-[1.8] text-ink-800/85 dark:text-slate-300">
              যেহেতু আমাদের অধিকাংশ শিক্ষার্থী উচ্চমাধ্যমিক (HSC) পর্যায়ের, তাই তাদের নিয়মিত ক্লাসরুম প্রগ্রেস ও মডেল টেস্টের ফলাফল নিয়মিতভাবে অভিভাবকদের অবহিত রাখা হয়।
            </p>
          </div>

          {/* কার্ড ৬: তথ্য পরিবর্তন বা মুছে ফেলার অধিকার */}
          <div className="rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold text-xs">
                ০৬
              </div>
              <h2 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                তথ্য পরিবর্তন বা মুছে ফেলার অধিকার
              </h2>
            </div>
            <p className="mt-3.5 font-body text-xs sm:text-[14px] leading-[1.8] text-ink-800/85 dark:text-slate-300">
              কোনো শিক্ষার্থী বা অভিভাবক জমা দেওয়া তথ্য সংশোধন বা ওয়েবসাইট থেকে মুছে ফেলতে চাইলে সরাসরি আমাদের হটলাইনে (+880 1845-435539) অথবা সরাসরি লার্নিং সেন্টারে যোগাযোগ করলে দ্রুত ব্যবস্থা নেওয়া হবে।
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
