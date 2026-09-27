"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // এরর কনসোলে লগ করা
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4 text-center">
      <div className="w-full max-w-md rounded-3xl border border-sky-100 bg-white p-8 shadow-xl sm:p-10">
        {/* এরর আইকন */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* এরর বার্তা */}
        <h1 className="font-body text-xl font-black text-sky-950 sm:text-2xl">
          তথ্য লোড করতে সাময়িক সমস্যা হয়েছে
        </h1>
        <p className="mt-2.5 font-body text-xs sm:text-sm leading-relaxed text-ink-800/80">
          ইন্টারনেট সংযোগ বা সার্ভারের সাময়িক বিঘ্নের কারণে পেজটি প্রস্তুত করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
        </p>

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-full bg-sky-600 px-6 py-2.5 font-body text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-95"
          >
            পুনরায় চেষ্টা করুন
          </button>
          <Link
            href="/"
            className="rounded-full border border-sky-200/80 bg-sky-50 px-6 py-2.5 font-body text-xs sm:text-sm font-bold text-sky-900 transition-all hover:bg-sky-100 active:scale-95"
          >
            হোমপেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
