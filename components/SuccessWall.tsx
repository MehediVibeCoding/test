import Reveal from "./Reveal";

// 🔧 placeholder কৃতি শিক্ষার্থী — পরে ছবি (photoUrl) যোগ করলেই বৃত্তাকার ফ্রেমে বসে যাবে
const TOPPERS = [
  { name: "নাম শীঘ্রই যুক্ত হবে", batch: "HSC 2025", result: "GPA 5.00", subject: "English A+", college: "কলেজ/বিশ্ববিদ্যালয়ের নাম" },
  { name: "নাম শীঘ্রই যুক্ত হবে", batch: "HSC 2025", result: "GPA 5.00", subject: "ICT A+", college: "কলেজ/বিশ্ববিদ্যালয়ের নাম" },
  { name: "নাম শীঘ্রই যুক্ত হবে", batch: "HSC 2024", result: "GPA 5.00", subject: "English A+, ICT A+", college: "কলেজ/বিশ্ববিদ্যালয়ের নাম" },
  { name: "নাম শীঘ্রই যুক্ত হবে", batch: "HSC 2024", result: "GPA 4.92", subject: "ICT A+", college: "কলেজ/বিশ্ববিদ্যালয়ের নাম" },
];

export default function SuccessWall() {
  return (
    <section id="results" className="bg-sky-100/30 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            সাফল্যের গল্প
          </span>
          <h2 className="mt-3 text-2xl font-bold text-sky-950 sm:text-3xl lg:text-4xl">
            কৃতি শিক্ষার্থীদের দেয়াল
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-ink-800/80 leading-relaxed">
            গত ব্যাচের যারা এই একাডেমি থেকে পড়ে ভালো ফলাফল অর্জন করেছে, তাদের নিয়েই আমাদের
            প্রকৃত গর্ব।
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOPPERS.map((student, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="hover-lift flex h-full flex-col items-center rounded-2xl border border-sky-100 bg-white p-5 text-center shadow-sm transition-all hover:border-sky-300">
                {/* বৃত্তাকার ছবি প্লেসহোল্ডার */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-sky-300/70 bg-sky-50 text-sky-400">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
                  </svg>
                </div>

                <p className="mt-3 text-sm font-bold text-sky-950">{student.name}</p>
                <p className="text-[11px] font-semibold text-sky-700">{student.batch}</p>

                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                    {student.result}
                  </span>
                  <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-700">
                    {student.subject}
                  </span>
                </div>

                <p className="mt-3 border-t border-sky-100/80 pt-2.5 text-[11px] text-ink-800/60">
                  {student.college}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
