import Reveal from "./Reveal";

// 🔧 demo batch data — replace schedule/seat info once confirmed
const BATCHES = [
  {
    name: "HSC English (Batch 28)",
    schedule: "শনি, সোম, বুধ — বিকাল ৪টা",
    focus: "Reading + Writing Part, MCQ থেকে Theme পর্যন্ত সম্পূর্ণ সিলেবাস",
  },
  {
    name: "HSC ICT (Batch 28)",
    schedule: "রবি, মঙ্গল, বৃহস্পতি — সন্ধ্যা ৬টা",
    focus: "Logic Gate, Database, Programming Fundamentals সহ সম্পূর্ণ সিলেবাস",
  },
  {
    name: "Combined Batch",
    schedule: "সপ্তাহে ৬ দিন",
    focus: "English ও ICT একসাথে — যারা দুটো বিষয়েই গাইডলাইন চায়",
  },
];

export default function Batches() {
  return (
    <section id="batches" className="bg-sky-100/50 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-sky-950 md:text-3xl">
            চলমান ব্যাচসমূহ
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-ink-800">
            তোমার সুবিধামতো ব্যাচ বেছে নাও, বিস্তারিত জেনে ভর্তি হও।
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {BATCHES.map((batch, i) => (
            <Reveal key={batch.name} delay={i * 100}>
              <div className="glass-panel hover-lift h-full p-6 hover:shadow-glass">
                <h3 className="font-display text-lg font-semibold text-sky-950">
                  {batch.name}
                </h3>
                <p className="mt-2 text-sm text-sky-700">{batch.schedule}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-800">{batch.focus}</p>
                <a
                  href="#admission"
                  className="btn-glow mt-5 inline-block rounded-full bg-sky-600 px-5 py-2 text-sm font-medium text-white hover:bg-sky-700"
                >
                  ভর্তি হও
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
