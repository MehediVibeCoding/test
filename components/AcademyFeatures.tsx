import Reveal from "./Reveal";

const FEATURES = [
  {
    icon: "🎯",
    title: "দুর্বল শিক্ষার্থীদের বিশেষ নার্সিং",
    desc: "যাদের বেসিক দুর্বল বা ক্লাসের পড়া বুঝতে সময় লাগে, তাদের জন্য আলাদা রিভিশন ও বিশেষ যত্ন নিয়ে সহজে কনসেপ্ট বুঝিয়ে দেওয়া হয়।",
    tag: "স্পেশাল কেয়ার",
  },
  {
    icon: "📝",
    title: "সাপ্তাহিক বোর্ড স্ট্যান্ডার্ড মডেল টেস্ট",
    desc: "প্রতি সপ্তাহে পড়ানো টপিকের ওপর বোর্ড স্ট্যান্ডার্ড পরীক্ষা নেওয়া হয় এবং স্যার নিজে প্রতিটি খাতা মূল্যায়ন করে ভুলগুলো ধরিয়ে দেন।",
    tag: "মূল্যায়ন",
  },
  {
    icon: "👨‍🏫",
    title: "বিসিএস ক্যাডার শিক্ষকের সরাসরি পাঠদান",
    desc: "কোনো জুনিয়র বা সহকারী শিক্ষক নয়—প্রতিটি ব্যাচের প্রতিটি ক্লাস এবং ডাউট সলভ সরাসরি বিসিএস ক্যাডার প্রভাষক স্যার নিজে পরিচালনা করেন।",
    tag: "১০০% অথেনটিক",
  },
  {
    icon: "📖",
    title: "ডিজিটাল ক্লাস ডায়েরি ও হ্যান্ডনোট",
    desc: "ক্লাসে যা পড়ানো হয়, তার সারসংক্ষেপ ও হোমওয়ার্ক ওয়েবসাইটে তুলে দেওয়া হয়। ফলে কোনো শিক্ষার্থী ক্লাস মিস করলেও পিছিয়ে পড়ে না।",
    tag: "স্মার্ট লার্নিং",
  },
  {
    icon: "👥",
    title: "সীমিত আসন ও পড়াশোনার অনুকূল পরিবেশ",
    desc: "গাদাগাদি করে শিক্ষার্থী না নিয়ে প্রতিটি ব্যাচে নির্দিষ্ট সংখ্যক শিক্ষার্থী রাখা হয়, যাতে সবার প্রতি ব্যক্তিগত মনোযোগ দেওয়া সম্ভব হয়।",
    tag: "শৃঙ্খলিত ব্যাচ",
  },
  {
    icon: "📞",
    title: "অভিভাবকদের সাথে নিয়মিত ফিডব্যাক",
    desc: "শিক্ষার্থীর উপস্থিতি, পরীক্ষার মার্কস ও ক্লাসের পারফরম্যান্স নিয়মিত অভিভাবকদের অবহিত করা হয় যাতে বাসায়ও তদারকি নিশ্চিত থাকে।",
    tag: "অভিভাবক সংযোগ",
  },
];

export default function AcademyFeatures() {
  return (
    <section id="why-us" className="bg-sky-100/30 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 text-center">
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            আমাদের বিশেষত্ব
          </span>
          <h2 className="mt-3 text-2xl font-bold text-sky-950 sm:text-3xl lg:text-4xl">
            কেন আমাদের একাডেমিতে পড়বে?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-ink-800/80 leading-relaxed">
            আমরা শুধু গতানুগতিক পড়াই না; প্রতিটি শিক্ষার্থীর শেখার ধরন বুঝে তাদের যত্ন সহকারে
            বোর্ড পরীক্ষার সর্বোচ্চ ফলাফলের জন্য উপযোগী করে গড়ে তুলি।
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 70}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition-all hover:border-sky-300 hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-700">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-sky-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-800/80">
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
