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
    <section id="batches" className="bg-sky-100/30 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            অফলাইন ও প্রাইভেট ব্যাচ
          </span>
          <h2 className="mt-3 text-2xl font-bold text-sky-950 sm:text-3xl lg:text-4xl">
            চলমান ব্যাচসমূহ (HSC 27 ও HSC 28)
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-ink-800/80 leading-relaxed">
            তোমার সুবিধামতো ব্যাচ নির্বাচন করে আগে থেকেই আসন নিশ্চিত করো। প্রতিটি ব্যাচে নির্দিষ্ট
            সংখ্যক শিক্ষার্থী নিয়ে অত্যন্ত যত্নসহকারে পড়ানো হয়।
          </p>
        </Reveal>

        {/* ৬টি ব্যাচ কার্ড গ্রিড (কোনো নীল ৩ডি শ্যাডো নেই, সাধারণ সফট শ্যাডো) */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {batches.map((batch, i) => (
            <Reveal key={batch.id} delay={i * 60}>
              <div className="hover-lift flex h-full flex-col justify-between rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition-all hover:border-sky-300">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-700">
                      {batch.badge}
                    </span>
                    <span className="text-[11px] font-medium text-ink-800/60">{batch.targetCohort}</span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-sky-950">
                    {batch.name}
                  </h3>

                  <p className="mt-2 text-xs font-semibold text-sky-700 flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {batch.schedule}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-sky-100/80 pt-3 text-xs text-ink-800/85">
                    {batch.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-1.5">
                        <span className="font-bold text-sky-600">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* সাধারণ মার্জিত ফ্ল্যাট বাটন (কোনো কৃত্রিম গ্লো নেই) */}
                <div className="mt-5 border-t border-sky-100/80 pt-3">
                  <button
                    onClick={() => handleSelectBatch(batch.name)}
                    className="w-full rounded-xl bg-sky-600 py-2.5 text-center text-xs sm:text-sm font-bold text-white transition-colors hover:bg-sky-700"
                  >
                    ভর্তি ফরম পূরণ করো →
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
