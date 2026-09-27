"use client";

import Reveal from "./Reveal";
import type { Batch } from "@/lib/academyData";

type BatchesClientProps = {
  batches: Batch[];
};

export default function BatchesClient({ batches }: BatchesClientProps) {
  function handleSelectBatch(batchName: string) {
    const selectElem = document.querySelector<HTMLSelectElement>('select[name="batch"]');
    if (selectElem) {
      selectElem.value = batchName;
      selectElem.dispatchEvent(new Event("change", { bubbles: true }));
    }
    const admissionSection = document.getElementById("admission");
    if (admissionSection) {
      admissionSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section id="batches" className="relative px-6 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-gradient-to-b from-white via-sky-50/40 to-white">
      <div className="mx-auto max-w-7xl">
        {/* সেকশন হেডার ও পারফেক্ট ২-লাইনের সাবটাইটেল */}
        <Reveal className="mb-10 text-center sm:mb-14">
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
            অফলাইন ও প্রাইভেট ব্যাচ
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[38px]">
            চলমান ব্যাচসমূহ (HSC 27 ও HSC 28)
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 sm:text-[15px]">
            তোমার সুবিধামতো ব্যাচ নির্বাচন করে আসন নিশ্চিত করো। প্রতিটি ব্যাচে নির্দিষ্ট সংখ্যক শিক্ষার্থী নিয়ে যত্নসহকারে পড়ানো হয়।
          </p>
        </Reveal>

        {/* প্রিমিয়াম ব্যাচ কার্ড গ্রিড */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {batches.map((batch, i) => (
            <Reveal key={batch.id} delay={i * 60}>
              <div className="group flex h-full flex-col justify-between rounded-3xl border border-sky-100 bg-white p-6 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5">
                <div>
                  {/* টপ ব্যাজ ও কোহোর্ট ট্যাগ */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-sky-200/80 bg-sky-50 px-3.5 py-1 font-body text-xs font-bold text-sky-800">
                      {batch.badge}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-0.5 font-body text-xs font-medium text-slate-600">
                      {batch.targetCohort}
                    </span>
                  </div>

                  {/* ব্যাচের নাম */}
                  <h3 className="mt-5 font-body text-lg font-black leading-snug text-sky-950 sm:text-[19px]">
                    {batch.name}
                  </h3>

                  {/* সময়সূচী ক্যাপসুল বক্স */}
                  <div className="mt-3.5 flex items-center gap-2 rounded-2xl border border-sky-100 bg-sky-50/70 px-3.5 py-2.5 font-body text-xs font-bold text-sky-800">
                    <svg className="h-4 w-4 shrink-0 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{batch.schedule}</span>
                  </div>

                  {/* ব্যাচ ফিচার তালিকা (সূক্ষ্ম রিং-বুলেট পয়েন্ট সহ) */}
                  <ul className="mt-5 space-y-2.5 border-t border-sky-100/80 pt-4 font-body text-[13.5px] sm:text-sm text-ink-800/85">
                    {batch.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-sky-500 bg-white" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ক্লিন পিল বাটন */}
                <div className="mt-7 border-t border-sky-100/80 pt-4">
                  <button
                    onClick={() => handleSelectBatch(batch.name)}
                    className="w-full rounded-full bg-sky-600 py-3 text-center font-body text-xs font-bold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-95 sm:text-sm"
                  >
                    ভর্তি ফরম পূরণ করো
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
