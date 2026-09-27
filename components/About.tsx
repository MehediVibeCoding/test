import Image from "next/image";
import Reveal from "./Reveal";

const HIGHLIGHT_CREDENTIALS = [
  {
    title: "৪০তম বিসিএস (সাধারণ শিক্ষা ক্যাডার) ও প্রভাষক",
    subtitle: "চৌদ্দগ্রাম সরকারি কলেজ",
    desc: "মেধার সর্বোচ্চ স্বীকৃতি ও সরকারি কলেজে পাঠদানের প্রত্যক্ষ অভিজ্ঞতা নিয়ে প্রতিটি ক্লাসে সঠিক গাইডলাইন।",
    badge: "বিসিএস ক্যাডার",
    icon: (
      <svg className="h-6 w-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    title: "চট্টগ্রাম বিশ্ববিদ্যালয় (CU)",
    subtitle: "উচ্চশিক্ষা ও শিক্ষকতা দর্শন",
    desc: "দীর্ঘ ৮+ বছর ধরে HSC শিক্ষার্থীদের জন্য সহজ ভাষায় আধুনিক ও বাস্তবসম্মত শিক্ষাপদ্ধতি।",
    badge: "৮+ বছর অভিজ্ঞতা",
    icon: (
      <svg className="h-6 w-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "১০,০০০+ শিক্ষার্থীর আস্থা ও সাফল্য",
    subtitle: "বোর্ড পরীক্ষার ধারাবাহিক A+",
    desc: "মুখস্থের চাপমুক্ত করে লজিক্যাল ও নিয়মিত মূল্যায়নের মাধ্যমে দুর্বল শিক্ষার্থীদেরও মেধার সর্বোচ্চ বিকাশ।",
    badge: "ধারাবাহিক সাফল্য",
    icon: (
      <svg className="h-6 w-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
      {/* ১. ড্রিবল-স্টাইল সেকশন হেডার ও ডিভাইডার */}
      <Reveal className="mb-14 text-center sm:mb-18">
        <div className="inline-flex items-center gap-3 text-sky-700">
          <span className="text-xs font-bold tracking-widest text-sky-400">✦</span>
          <span className="font-body text-xs font-bold uppercase tracking-wider text-sky-800 sm:text-[13px]">
            শিক্ষক পরিচিতি ও দর্শন
          </span>
          <span className="text-xs font-bold tracking-widest text-sky-400">✦</span>
        </div>
        <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[40px] leading-tight">
          সঠিক দিকনির্দেশনায় প্রতিটি শিক্ষার্থীই প্রতিভাবান
        </h2>
      </Reveal>

      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ২. বাম পাশে: টিচার পোর্টফোলিও শোকেস (আর্চ ও ফ্লোটিং চিপ আর্কিটেকচার) */}
        <Reveal className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md">
            {/* সফট ব্যাকড্রপ আভা */}
            <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-sky-200/50 via-sky-100/30 to-white/0 blur-xl" />

            {/* মূল ছবি কন্টেইনার */}
            <div className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-white p-3 shadow-lg shadow-sky-950/5">
              {/* ফ্লোটিং ভেরিফাইড ব্যাজ চিপ */}
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3.5 py-1.5 shadow-md backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                <span className="font-body text-[11.5px] font-bold text-sky-950">
                  ৪০তম বিসিএস (শিক্ষা ক্যাডার)
                </span>
              </div>

              <div className="overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-sky-50 to-white">
                <Image
                  src="/images/ahsan-about.webp"
                  alt="Md. Ahsan Ullah — ডেস্কে কর্মরত অবস্থায়"
                  width={900}
                  height={1104}
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02] select-none"
                />
              </div>

              {/* নিচের মার্জিত ইনফো কার্ড */}
              <div className="mt-3.5 rounded-2xl bg-gradient-to-r from-sky-50 via-sky-50/80 to-white p-4 text-center border border-sky-100/80">
                <p className="font-body text-base font-black tracking-tight text-sky-950 sm:text-lg">
                  মোঃ আহসান উল্লাহ
                </p>
                <p className="mt-0.5 font-body text-xs font-bold text-sky-700 sm:text-[13px]">
                  প্রতিষ্ঠাতা ও প্রধান মেন্টর, Ahsan&apos;s Learning Academy
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ৩. ডানপাশে: বেন্টো-স্টাইল দর্শন ও অর্জন লেআউট */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* ফিলোসফি স্টেটমেন্ট কার্ড (আন্তর্জাতিক স্ট্যান্ডার্ড ১৫-১৬px বডি ফন্ট) */}
          <Reveal delay={80}>
            <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-white via-white to-sky-50/40 p-6 shadow-xs sm:p-8">
              <div className="flex items-center gap-2 text-sky-600 mb-3">
                <svg className="h-6 w-6 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <span className="font-body text-xs font-bold uppercase tracking-wider text-sky-800">
                  শিক্ষকতার মূল দর্শন
                </span>
              </div>
              <p className="font-body text-[15px] leading-[1.8] text-ink-800 sm:text-base">
                আমি মোঃ আহসান উল্লাহ, চৌদ্দগ্রাম সরকারি কলেজের প্রভাষক এবং ৪০তম বিসিএস (সাধারণ শিক্ষা) ক্যাডারের একজন সদস্য। विगत ৮ বছর ধরে HSC শিক্ষার্থীদের জন্য ইংরেজি ও আইসিটি বিষয়ের বিশেষায়িত প্রাইভেট পরিচালনা করছি।
              </p>
              <p className="mt-3 font-body text-[15px] leading-[1.8] text-ink-800 sm:text-base">
                আমার প্রতিষ্ঠিত <span className="font-bold text-sky-950">&quot;Ahsan&apos;s Learning Academy&quot;</span>-র মূল লক্ষ্য মুখস্থ করার গতানুগতিক ভয় দূর করে—লজিক, বাস্তবধর্মী উদাহরণ ও নিবিড় ক্লাসরুম নার্সিংয়ের মাধ্যমে শিক্ষার্থীদের মেধার সর্বোচ্চ বিকাশ ঘটানো।
              </p>
            </div>
          </Reveal>

          {/* বেন্টো ক্রেডেনশিয়াল কার্ডসমূহ */}
          <div className="grid gap-4 sm:grid-cols-1">
            {HIGHLIGHT_CREDENTIALS.map((item, idx) => (
              <Reveal key={item.title} delay={120 + idx * 60}>
                <div className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-sky-100 bg-white p-5 sm:p-6 shadow-xs transition-all duration-300 hover:border-sky-300 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 transition-colors group-hover:bg-sky-100/80">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-body text-[15.5px] font-black text-sky-950 sm:text-base">
                          {item.title}
                        </h3>
                        <span className="rounded-full bg-sky-50 px-2.5 py-0.5 font-body text-[11px] font-bold text-sky-700 border border-sky-200/60">
                          {item.badge}
                        </span>
                      </div>
                      <p className="mt-1 font-body text-[13.5px] leading-relaxed text-ink-800/80">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
