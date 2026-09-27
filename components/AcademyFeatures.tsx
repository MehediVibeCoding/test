import Reveal from "./Reveal";

const FEATURES = [
  {
    num: "০১",
    title: "দুর্বল শিক্ষার্থীদের বিশেষ নার্সিং",
    desc: "যাদের বেসিক দুর্বল বা ক্লাসের পড়া বুঝতে সময় লাগে, তাদের জন্য আলাদা রিভিশন ও বিশেষ যত্ন নিয়ে সহজে প্রতিটি টপিক বুঝিয়ে দেওয়া হয়।",
    tag: "স্পেশাল কেয়ার",
    icon: (
      <svg className="h-6 w-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    num: "০২",
    title: "সাপ্তাহিক বোর্ড স্ট্যান্ডার্ড মডেল টেস্ট",
    desc: "প্রতি সপ্তাহে পড়ানো টপিকের ওপর বোর্ড স্ট্যান্ডার্ড পরীক্ষা নেওয়া হয় এবং স্যার নিজে প্রতিটি খাতা মূল্যায়ন করে ব্যক্তিগত ভুলগুলো ধরিয়ে দেন।",
    tag: "সাপ্তাহিক মূল্যায়ন",
    icon: (
      <svg className="h-6 w-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    num: "০৩",
    title: "স্যারের সরাসরি পাঠদান, কোনো প্রক্সি নয়",
    desc: "কোনো জুনিয়র বা সহকারী শিক্ষক নয়—প্রতিটি ব্যাচের প্রতিটি ক্লাস, বোর্ড প্রশ্ন সমাধান ও ডাউট সলভ স্যার নিজে পরিচালনা করেন।",
    tag: "১০০% অথেনটিক",
    icon: (
      <svg className="h-6 w-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    num: "০৪",
    title: "ডিজিটাল ক্লাস ডায়েরি ও হ্যান্ডনোট",
    desc: "ক্লাসে যা পড়ানো হয়, তার বিস্তারিত সারসংক্ষেপ ও হোমওয়ার্ক ওয়েবসাইটে তুলে দেওয়া হয়। ফলে কোনো শিক্ষার্থী ক্লাস মিস করলেও পিছিয়ে পড়ে না।",
    tag: "স্মার্ট লার্নিং",
    icon: (
      <svg className="h-6 w-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    num: "০৫",
    title: "সীমিত আসন ও পড়াশোনার অনুকূল পরিবেশ",
    desc: "গাদাগাদি করে অতিরিক্ত শিক্ষার্থী না নিয়ে প্রতিটি ব্যাচে নির্দিষ্ট আসন রাখা হয়, যাতে ক্লাসরুমে সবার প্রতি সর্বোচ্চ ব্যক্তিগত মনোযোগ দেওয়া সম্ভব হয়।",
    tag: "শৃঙ্খলিত ব্যাচ",
    icon: (
      <svg className="h-6 w-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    num: "০৬",
    title: "অভিভাবকদের সাথে নিয়মিত ফিডব্যাক",
    desc: "শিক্ষার্থীর উপস্থিতি, পরীক্ষার ফলাফল ও ক্লাসের অগ্রগতি নিয়মিত অভিভাবকদের জানানো হয় যাতে বাসায়ও যথাযথ তদারকি নিশ্চিত থাকে।",
    tag: "অভিভাবক সংযোগ",
    icon: (
      <svg className="h-6 w-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

export default function AcademyFeatures() {
  return (
    <section id="why-us" className="relative bg-gradient-to-b from-sky-50/50 via-white to-white px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* ড্রিবল-স্টাইল সেকশন হেডার */}
        <Reveal className="mb-14 text-center sm:mb-18">
          <div className="inline-flex items-center gap-3 text-sky-700">
            <span className="text-xs font-bold tracking-widest text-sky-400">✦</span>
            <span className="font-body text-xs font-bold uppercase tracking-wider text-sky-800 sm:text-[13px]">
              আমাদের বিশেষত্ব
            </span>
            <span className="text-xs font-bold tracking-widest text-sky-400">✦</span>
          </div>
          <h2 className="mt-3.5 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[40px]">
            কেন আমাদের একাডেমিতে পড়বে?
          </h2>
          <p className="mx-auto mt-3.5 max-w-2xl font-body text-[15px] leading-[1.8] text-ink-800/80 sm:text-base">
            আমরা শুধু গতানুগতিক পড়াই না; প্রতিটি শিক্ষার্থীর শেখার ধরন বুঝে তাদের আন্তরিক যত্ন সহকারে বোর্ড পরীক্ষার সর্বোচ্চ ফলাফলের জন্য গড়ে তুলি।
          </p>
        </Reveal>

        {/* ৬টি মডার্ন ফিচার কার্ড গ্রিড (আন্তর্জাতিক টাইপোগ্রাফি ও সফট শ্যাডো সহ) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 60}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-sky-100 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-950/5">
                {/* ব্যাকগ্রাউন্ড সূক্ষ্ম নম্বর ওয়াটারমার্ক */}
                <span className="absolute -bottom-3 -right-2 font-body text-6xl font-black text-sky-50/60 select-none pointer-events-none transition-colors group-hover:text-sky-100/70">
                  {item.num}
                </span>

                <div className="relative z-10">
                  {/* টপ আইকন ও ট্যাগ ব্যাজ */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 transition-colors group-hover:bg-sky-600 group-hover:text-white">
                      {item.icon}
                    </div>
                    <span className="rounded-full border border-sky-100 bg-sky-50/80 px-3 py-1 font-body text-xs font-bold text-sky-800 transition-colors group-hover:bg-sky-100">
                      {item.tag}
                    </span>
                  </div>

                  {/* কার্ড শিরোনাম */}
                  <h3 className="mt-5 font-body text-base font-bold text-sky-950 sm:text-[17px]">
                    {item.title}
                  </h3>

                  {/* কার্ড বিবরণ (আন্তর্জাতিক স্ট্যান্ডার্ড ১৪.৫px ফন্ট সাইজ) */}
                  <p className="mt-2.5 font-body text-sm leading-[1.75] text-ink-800/80 sm:text-[14.5px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
