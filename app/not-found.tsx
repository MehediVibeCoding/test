import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4 text-center">
      <div className="w-full max-w-md rounded-3xl border border-sky-100 bg-white p-8 shadow-xl sm:p-10">
        {/* ৪-০-৪ বড় টেক্সট */}
        <div className="font-display font-black text-6xl sm:text-7xl text-sky-300/80 select-none">
          ৪০৪
        </div>

        {/* হেডিং ও বার্তা */}
        <h1 className="mt-3 font-body text-xl font-black text-sky-950 sm:text-2xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mt-2.5 font-body text-xs sm:text-sm leading-relaxed text-ink-800/80">
          আপনি যে লিংকটিতে প্রবেশের চেষ্টা করছেন তা হয়তো সরিয়ে ফেলা হয়েছে অথবা ইউআরএলটি ভুল লেখা হয়েছে।
        </p>

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-sky-600 px-6 py-2.5 font-body text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-95"
          >
            হোমপেজে ফিরে যান
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-sky-200/80 bg-sky-50 px-6 py-2.5 font-body text-xs sm:text-sm font-bold text-sky-900 transition-all hover:bg-sky-100 active:scale-95"
          >
            সকল ব্লগ দেখুন
          </Link>
        </div>
      </div>
    </main>
  );
}
