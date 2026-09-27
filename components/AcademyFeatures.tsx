import Reveal from "./Reveal";

const FEATURES = [
  {
    title: "দুর্বল শিক্ষার্থীদের বিশেষ নার্সিং",
    desc: "যাদের বেসিক দুর্বল বা ক্লাসের পড়া বুঝতে সময় লাগে, তাদের জন্য আলাদা রিভিশন ও বিশেষ যত্ন নিয়ে সহজে প্রতিটি বিষয় বুঝিয়ে দেওয়া হয়।",
    tag: "স্পেশাল কেয়ার",
    cardBg: "bg-[#f0f9ff]/80 border-[#bae6fd]/60 hover:border-[#38bdf8]",
    iconBg: "bg-[#e0f2fe] text-[#0284c7]",
    badgeBg: "bg-[#e0f2fe] text-[#0369a1]",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "সাপ্তাহিক বোর্ড স্ট্যান্ডার্ড মডেল টেস্ট",
    desc: "প্রতি সপ্তাহে পড়ানো টপিকের ওপর বোর্ড স্ট্যান্ডার্ড পরীক্ষা নেওয়া হয় এবং স্যার নিজে প্রতিটি খাতা মূল্যায়ন করে ব্যক্তিগত ভুলগুলো ধরিয়ে দেন।",
    tag: "সাপ্তাহিক মূল্যায়ন",
    cardBg: "bg-[#f5f3ff]/80 border-[#ddd6fe]/60 hover:border-[#a78bfa]",
    iconBg: "bg-[#ede9fe] text-[#7c3aed]",
    badgeBg: "bg-[#ede9fe] text-[#6d28d9]",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "স্যারের সরাসরি পাঠদান, কোনো প্রক্সি নয়",
    desc: "কোনো জুনিয়র বা সহকারী শিক্ষক নয়—প্রতিটি ব্যাচের প্রতিটি ক্লাস, বোর্ড প্রশ্ন সমাধান ও ডাউট সলভ স্যার নিজে পরিচালনা করেন।",
    tag: "১০০% অথেনটিক",
    cardBg: "bg-[#ecfdf5]/80 border-[#a7f3d0]/60 hover:border-[#34d399]",
    iconBg: "bg-[#d1fae5] text-[#059669]",
    badgeBg: "bg-[#d1fae5] text-[#047857]",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "ডিজিটাল ক্লাস ডায়েরি ও হ্যান্ডনোট",
    desc: "ক্লাসে যা পড়ানো হয়, তার বিস্তারিত সারসংক্ষেপ ও হোমওয়ার্ক ওয়েবসাইটে তুলে দেওয়া হয়। ফলে কোনো শিক্ষার্থী ক্লাস মিস করলেও পিছিয়ে পড়ে না।",
    tag: "স্মার্ট লার্নিং",
    cardBg: "bg-[#ecfeff]/80 border-[#a5f3fc]/60 hover:border-[#22d3ee]",
    iconBg: "bg-[#cffafe] text-[#0891b2]",
    badgeBg: "bg-[#cffafe] text-[#0e7490]",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "সীমিত আসন ও পড়াশোনার অনুকূল পরিবেশ",
    desc: "গাদাগাদি করে অতিরিক্ত শিক্ষার্থী না নিয়ে প্রতিটি ব্যাচে নির্দিষ্ট আসন রাখা হয়, যাতে ক্লাসরুমে সবার প্রতি সর্বোচ্চ ব্যক্তিগত মনোযোগ দেওয়া সম্ভব হয়।",
    tag: "শৃঙ্খলিত ব্যাচ",
    cardBg: "bg-[#fffbeb]/80 border-[#fde68a]/60 hover:border-[#fbbf24]",
    iconBg: "bg-[#fef3c7] text-[#d97706]",
    badgeBg: "bg-[#fef3c7] text-[#b45309]",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "অভিভাবকদের সাথে নিয়মিত ফিডব্যাক",
    desc: "শিক্ষার্থীর উপস্থিতি, পরীক্ষার ফলাফল ও ক্লাসের অগ্রগতি নিয়মিত অভিভাবকদের জানানো হয় যাতে বাসায়ও যথাযথ তদারকি নিশ্চিত থাকে।",
    tag: "অভিভাবক সংযোগ",
    cardBg: "bg-[#fff1f2]/80 border-[#fecdd3]/60 hover:border-[#fb7185]",
    iconBg: "bg-[#ffe4e6] text-[#e11d48]",
    badgeBg: "bg-[#ffe4e6] text-[#be123c]",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

export default function AcademyFeatures() {
  return (
    <section id="why-us" className="relative px-6 py-20 sm:px-8 sm:py-28 lg:px-12 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* ক্লিন ও স্বাভাবিক সেকশন হেডার */}
        <Reveal className="mb-14 text-center sm:mb-18">
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
            আমাদের বিশেষত্ব
          </span>
          <h2 className="mt-3.5 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[40px]">
            কেন আমাদের একাডেমিতে পড়বে?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-[15px] leading-[1.8] text-ink-800/80 sm:text-base">
            আমরা শুধু গতানুগতিক পড়াই না; প্রতিটি শিক্ষার্থীর শেখার ধরন বুঝে তাদের আন্তরিক যত্ন সহকারে বোর্ড পরীক্ষার সর্বোচ্চ ফলাফলের জন্য গড়ে তুলি।
          </p>
        </Reveal>

        {/* ৬টি সফট প্যাস্টেল কার্ড গ্রিড (কোনো বড় ওয়াটারমার্ক ছাড়া প্রফেশনাল আর্কিটেকচার) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 60}>
              <div
                className={`hover-lift flex h-full flex-col justify-between rounded-3xl border p-6 sm:p-7 shadow-xs transition-all duration-300 ${item.cardBg}`}
              >
                <div>
                  {/* আইকন ও ব্যাজ */}
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <span className={`rounded-full px-3 py-1 font-body text-[11.5px] font-bold ${item.badgeBg}`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* কার্ড শিরোনাম */}
                  <h3 className="mt-5 font-body text-base font-bold text-sky-950 sm:text-[17px]">
                    {item.title}
                  </h3>

                  {/* কার্ড বিবরণ */}
                  <p className="mt-2.5 font-body text-sm leading-[1.75] text-ink-800/80">
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
