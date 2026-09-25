import Image from "next/image";
import Reveal from "./Reveal";

const CREDENTIALS = [
  {
    icon: "🎓",
    title: "৪০তম বিসিএস (সাধারণ শিক্ষা ক্যাডার)",
    desc: "মেধার সর্বোচ্চ স্বীকৃতি নিয়ে বাংলাদেশ শিক্ষা ক্যাডারে কর্মরত।",
  },
  {
    icon: "🏛️",
    title: "প্রভাষক, চৌদ্দগ্রাম সরকারি কলেজ",
    desc: "HSC English ও ICT বিভাগের নিয়মিত পাঠদান ও শিক্ষার্থীদের পরিচর্যা।",
  },
  {
    icon: "📚",
    title: "চট্টগ্রাম বিশ্ববিদ্যালয় (CU)",
    desc: "উচ্চশিক্ষা সম্পন্ন করে শিক্ষকতা পেশায় দীর্ঘ ৮+ বছরের বাস্তব অভিজ্ঞতা।",
  },
  {
    icon: "🎯",
    title: "১০,০০০+ শিক্ষার্থীর আস্থা",
    desc: "বোর্ড পরীক্ষায় অসংখ্য শিক্ষার্থীকে A+ ও সফল ফলাফল অর্জনে দিকনির্দেশনা।",
  },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-14 sm:py-18">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* ছবি কলাম — প্রফেশনাল মিনিমাল ফ্রেম */}
        <Reveal className="flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="overflow-hidden rounded-2xl border border-sky-200/80 bg-white p-2 shadow-sm">
              <Image
                src="/images/ahsan-about.webp"
                alt="Md. Ahsan Ullah — ডেস্কে কর্মরত অবস্থায়"
                width={900}
                height={1104}
                className="h-auto w-full rounded-xl object-cover select-none"
              />
              <div className="mt-2.5 rounded-lg bg-sky-50/70 p-3 text-center">
                <p className="font-display text-sm font-bold text-sky-950">মোঃ আহসান উল্লাহ</p>
                <p className="text-xs font-semibold text-sky-700">
                  প্রতিষ্ঠাতা ও প্রধান মেন্টর, Ahsan&apos;s Learning Academy
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* পরিচিতি ও ফিলোসফি কলাম */}
        <Reveal delay={100}>
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            শিক্ষক পরিচিতি ও দর্শন
          </span>

          <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-sky-950 sm:text-3xl lg:text-4xl">
            সঠিক দিকনির্দেশনায় প্রতিটি শিক্ষার্থীই প্রতিভাবান
          </h2>

          <p className="mt-3 text-xs leading-relaxed text-ink-800/90 sm:text-sm">
            আমি মোঃ আহসান উল্লাহ, চৌদ্দগ্রাম সরকারি কলেজের HSC English ও ICT বিষয়ের প্রভাষক
            এবং ৪০তম বিসিএস (সাধারণ শিক্ষা) ক্যাডারের একজন সদস্য। গত ৮ বছর ধরে শিক্ষার্থীদের খুব
            কাছ থেকে দেখেছি—ইংরেজি কিংবা আইসিটিতে ভয়ের মূল কারণ হলো মুখস্থ করার প্রবণতা।
          </p>
          <p className="mt-2 text-xs leading-relaxed text-ink-800/90 sm:text-sm">
            আমার প্রতিষ্ঠিত <span className="font-bold text-sky-900">&quot;Ahsan&apos;s Learning Academy&quot;</span>-র
            মূল লক্ষ্য শিক্ষার্থীদের মুখস্থের চাপমুক্ত রেখে বাস্তব উদাহরণ, লজিক এবং নিয়মিত মূল্যায়নের
            মাধ্যমে প্রতিটি বিষয়ে পারদর্শী করে তোলা।
          </p>

          {/* অর্জনের আধুনিক কার্ড গ্রিড */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {CREDENTIALS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-sky-100 bg-white p-3.5 shadow-sm transition-all hover:border-sky-300"
              >
                <span className="text-lg">{item.icon}</span>
                <h3 className="mt-1.5 text-xs font-bold text-sky-950 sm:text-sm">{item.title}</h3>
                <p className="mt-0.5 text-[11px] text-ink-800/75 leading-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
