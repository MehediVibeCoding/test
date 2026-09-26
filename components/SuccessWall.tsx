import Reveal from "./Reveal";
import { getSuccessToppers } from "@/lib/academyData";

// ডাটাবেজ সাময়িক ফাঁকা থাকলে ডেমো ফলব্যাক
const FALLBACK_TOPPERS = [
  {
    id: "f1",
    name: "সাদিয়া তাসনিম",
    batch: "HSC 2025",
    result: "GPA 5.00",
    subject: "English A+, ICT A+",
    college: "চৌদ্দগ্রাম সরকারি কলেজ",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "f2",
    name: "রাফিদ হাসান",
    batch: "HSC 2025",
    result: "GPA 5.00",
    subject: "English A+",
    college: "চৌদ্দগ্রাম সরকারি কলেজ",
    photoUrl: null,
  },
  {
    id: "f3",
    name: "তানজিলা আক্তার",
    batch: "HSC 2024",
    result: "GPA 5.00",
    subject: "ICT A+",
    college: "চৌদ্দগ্রাম আদর্শ মহিলা কলেজ",
    photoUrl: null,
  },
  {
    id: "f4",
    name: "সাকিব মাহমুদ",
    batch: "HSC 2024",
    result: "GPA 4.92",
    subject: "English A+",
    college: "কাশিনগর ডিগ্রি কলেজ",
    photoUrl: null,
  },
];

export default async function SuccessWall() {
  const dbToppers = await getSuccessToppers();
  const toppers = dbToppers.length > 0 ? dbToppers : FALLBACK_TOPPERS;

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
          {toppers.map((student, i) => (
            <Reveal key={student.id || i} delay={i * 80}>
              <div className="hover-lift flex h-full flex-col items-center rounded-2xl border border-sky-100 bg-white p-5 text-center shadow-sm transition-all hover:border-sky-300">
                {/* বৃত্তাকার ছবি ফ্রেম */}
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-sky-300/80 bg-sky-50 text-sky-600 shadow-xs">
                  {student.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={student.photoUrl}
                      alt={student.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-[22px] font-black text-sky-700">
                      {student.name.slice(0, 1)}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm font-bold text-sky-950">{student.name}</p>
                <p className="text-[11px] font-semibold text-sky-700">{student.batch}</p>

                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60">
                    🏆 {student.result}
                  </span>
                  <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-700 border border-sky-200/60">
                    {student.subject}
                  </span>
                </div>

                <p className="mt-3 w-full border-t border-sky-100/80 pt-2.5 text-[11px] text-ink-800/70 truncate" title={student.college}>
                  🏛️ {student.college}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
