import Image from "next/image";
import Reveal from "./Reveal";

const CREDENTIALS = [
  {
    title: "৪০তম বিসিএস (সাধারণ শিক্ষা ক্যাডার)",
    desc: "মেধার সর্বোচ্চ স্বীকৃতি নিয়ে বাংলাদেশ শিক্ষা ক্যাডারে কর্মরত।",
    icon: (
      <svg className="h-5 w-5 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    title: "প্রভাষক, চৌদ্দগ্রাম সরকারি কলেজ",
    desc: "কলেজে নিয়মিত পাঠদান ও শিক্ষার্থীদের পরিচর্যায় দীর্ঘদিনের অভিজ্ঞতা।",
    icon: (
      <svg className="h-5 w-5 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "চট্টগ্রাম বিশ্ববিদ্যালয় (CU)",
    desc: "উচ্চশিক্ষা সম্পন্ন করে শিক্ষকতা পেশায় দীর্ঘ ৮+ বছরের বাস্তব অভিজ্ঞতা।",
    icon: (
      <svg className="h-5 w-5 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "১০,০০০+ শিক্ষার্থীর আস্থা",
    desc: "বোর্ড পরীক্ষায় অসংখ্য শিক্ষার্থীকে A+ ও সফল ফলাফল অর্জনে দিকনির্দেশনা।",
    icon: (
      <svg className="h-5 w-5 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* ছবি কলাম — প্রফেশনাল মিনিমাল ফ্রেম */}
        <Reveal className="flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white p-2.5 shadow-sm">
              <Image
                src="/images/ahsan-about.webp"
                alt="Md. Ahsan Ullah — ডেস্কে কর্মরত অবস্থায়"
                width={900}
                height={1104}
                className="h-auto w-full rounded-2xl object-cover select-none"
              />
              <div className="mt-3 rounded-xl bg-sky-50/70 p-3.5 text-center">
                <p className="font-body text-sm font-bold text-sky-950">মোঃ আহসান উল্লাহ</p>
                <p className="font-body text-xs font-semibold text-sky-700">
                  প্রতিষ্ঠাতা ও প্রধান মেন্টর, Ahsan&apos;s Learning Academy
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* পরিচিতি ও দর্শন কলাম */}
        <Reveal delay={100}>
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            শিক্ষক পরিচিতি ও দর্শন
          </span>

          <h2 className="mt-3.5 font-body text-2xl font-black leading-tight text-sky-950 sm:text-3xl lg:text-4xl">
            সঠিক দিকনির্দেশনায় প্রতিটি শিক্ষার্থীই প্রতিভাবান
          </h2>

          <p className="mt-3.5 font-body text-xs leading-relaxed text-ink-800/90 sm:text-sm">
            আমি মোঃ আহসান উল্লাহ, চৌদ্দগ্রাম সরকারি কলেজের একজন প্রভাষক এবং ৪০তম বিসিএস
            (সাধারণ শিক্ষা) ক্যাডারের একজন সদস্য। বিগত ৮ বছর ধরে HSC শিক্ষার্থীদের ইংরেজি ও
            আইসিটি বিষয়ে পাঠদান করিয়ে আসছি—এই সময়ে খুব কাছ থেকে দেখেছি, ইংরেজি কিংবা আইসিটিতে ভয়ের মূল কারণ হলো মুখস্থ করার প্রবণতা।
          </p>
          <p className="mt-2.5 font-body text-xs leading-relaxed text-ink-800/90 sm:text-sm">
            আমার প্রতিষ্ঠিত <span className="font-bold text-sky-900">&quot;Ahsan&apos;s Learning Academy&quot;</span>-র
            মূল লক্ষ্য শিক্ষার্থীদের মুখস্থের চাপমুক্ত রেখে বাস্তব উদাহরণ, লজিক এবং নিয়মিত মূল্যায়নের
            মাধ্যমে প্রতিটি বিষয়ে পারদর্শী করে তোলা।
          </p>

          {/* অর্জনের আধুনিক কার্ড গ্রিড (SVG আইকন সহ) */}
          <div className="mt-7 grid gap-3.5 sm:grid-cols-2">
            {CREDENTIALS.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-sky-100 bg-white p-4 shadow-xs transition-all hover:border-sky-300 hover:shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 transition-colors group-hover:bg-sky-100">
                  {item.icon}
                </div>
                <h3 className="mt-2.5 font-body text-xs font-bold text-sky-950 sm:text-sm">{item.title}</h3>
                <p className="mt-1 font-body text-[11.5px] leading-relaxed text-ink-800/75">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
