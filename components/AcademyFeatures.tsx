import Reveal from "./Reveal";

const FEATURES = [
  {
    title: "দুর্বল শিক্ষার্থীদের বিশেষ নার্সিং",
    desc: "যাদের বেসিক দুর্বল বা ক্লাসের পড়া বুঝতে সময় লাগে, তাদের জন্য আলাদা রিভিশন ও বিশেষ যত্ন নিয়ে সহজে প্রতিটি বিষয় বুঝিয়ে দেওয়া হয়।",
    tag: "স্পেশাল কেয়ার",
    cardBg: "bg-[#f0f9ff]/80 border-[#bae6fd]/60 hover:border-[#38bdf8]",
    badgeBg: "bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd]",
  },
  {
    title: "সাপ্তাহিক বোর্ড স্ট্যান্ডার্ড মডেল টেস্ট",
    desc: "প্রতি সপ্তাহে পড়ানো টপিকের ওপর বোর্ড স্ট্যান্ডার্ড পরীক্ষা নেওয়া হয় এবং স্যার নিজে প্রতিটি খাতা মূল্যায়ন করে ব্যক্তিগত ভুলগুলো ধরিয়ে দেন।",
    tag: "সাপ্তাহিক মূল্যায়ন",
    cardBg: "bg-[#f5f3ff]/80 border-[#ddd6fe]/60 hover:border-[#a78bfa]",
    badgeBg: "bg-[#ede9fe] text-[#6d28d9] border border-[#ddd6fe]",
  },
  {
    title: "স্যারের সরাসরি পাঠদান, কোনো প্রক্সি নয়",
    desc: "কোনো জুনিয়র বা সহকারী শিক্ষক নয়—প্রতিটি ব্যাচের প্রতিটি ক্লাস, বোর্ড প্রশ্ন সমাধান ও ডাউট সলভ স্যার নিজে পরিচালনা করেন।",
    tag: "১০০% অথেনটিক",
    cardBg: "bg-[#ecfdf5]/80 border-[#a7f3d0]/60 hover:border-[#34d399]",
    badgeBg: "bg-[#d1fae5] text-[#047857] border border-[#a7f3d0]",
  },
  {
    title: "ডিজিটাল ক্লাস ডায়েরি ও হ্যান্ডনোট",
    desc: "ক্লাসে যা পড়ানো হয়, তার বিস্তারিত সারসংক্ষেপ ও হোমওয়ার্ক ওয়েবসাইটে তুলে দেওয়া হয়। ফলে কোনো শিক্ষার্থী ক্লাস মিস করলেও পিছিয়ে পড়ে না।",
    tag: "স্মার্ট লার্নিং",
    cardBg: "bg-[#ecfeff]/80 border-[#a5f3fc]/60 hover:border-[#22d3ee]",
    badgeBg: "bg-[#cffafe] text-[#0e7490] border border-[#a5f3fc]",
  },
  {
    title: "সীমিত আসন ও পড়াশোনার অনুকূল পরিবেশ",
    desc: "গাদাগাদি করে অতিরিক্ত শিক্ষার্থী না নিয়ে প্রতিটি ব্যাচে নির্দিষ্ট আসন রাখা হয়, যাতে ক্লাসরুমে সবার প্রতি সর্বোচ্চ ব্যক্তিগত মনোযোগ দেওয়া সম্ভব হয়।",
    tag: "শৃঙ্খলিত ব্যাচ",
    cardBg: "bg-[#fffbeb]/80 border-[#fde68a]/60 hover:border-[#fbbf24]",
    badgeBg: "bg-[#fef3c7] text-[#b45309] border border-[#fde68a]",
  },
  {
    title: "অভিভাবকদের সাথে নিয়মিত ফিডব্যাক",
    desc: "শিক্ষার্থীর উপস্থিতি, পরীক্ষার ফলাফল ও ক্লাসের অগ্রগতি নিয়মিত অভিভাবকদের জানানো হয় যাতে বাসায়ও যথাযথ তদারকি নিশ্চিত থাকে।",
    tag: "অভিভাবক সংযোগ",
    cardBg: "bg-[#fff1f2]/80 border-[#fecdd3]/60 hover:border-[#fb7185]",
    badgeBg: "bg-[#ffe4e6] text-[#be123c] border border-[#fecdd3]",
  },
];

export default function AcademyFeatures() {
  return (
    <section id="why-us" className="relative px-6 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* সেকশন হেডার ও পারফেক্ট ২-লাইনের সাবটাইটেল */}
        <Reveal className="mb-10 text-center sm:mb-14">
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
            আমাদের বিশেষত্ব
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[38px]">
            কেন আমাদের একাডেমিতে পড়বে?
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 sm:text-[15px]">
            আমরা শুধু গতানুগতিক পড়াই না; প্রতিটি শিক্ষার্থীর শেখার ধরন বুঝে যত্ন নিয়ে বোর্ড পরীক্ষার সর্বোচ্চ ফলাফলের জন্য গড়ে তুলি।
          </p>
        </Reveal>

        {/* ৬টি আইকন-মুক্ত সফট প্যাস্টেল কার্ড গ্রিড */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 60}>
              <div
                className={`hover-lift flex h-full flex-col justify-between rounded-3xl border p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${item.cardBg}`}
              >
                <div>
                  {/* কার্ডের শুরুর ট্যাগ পিল */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex rounded-full px-3 py-1 font-body text-xs font-bold ${item.badgeBg}`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* কার্ড শিরোনাম */}
                  <h3 className="mt-5 font-body text-base font-bold leading-snug text-sky-950 sm:text-[17.5px]">
                    {item.title}
                  </h3>

                  {/* কার্ড বিবরণ */}
                  <p className="mt-2.5 font-body text-[13.5px] leading-[1.75] text-ink-800/85 sm:text-[14px]">
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
