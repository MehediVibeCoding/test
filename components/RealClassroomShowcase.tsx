import Reveal from "./Reveal";

// 🔧 placeholder slots — বাস্তব ক্লাসরুম ও একাডেমি লাইফের ছবি যুক্ত হলে এখানে
// প্রতিটি অবজেক্টে শুধু imageUrl (এবং চাইলে alt) যোগ করলেই যথেষ্ট, বাকি লেআউট
// অপরিবর্তিত থাকবে।
const CLASSROOM_MOMENTS = [
  {
    caption: "হোয়াইটবোর্ডে লজিক গেইট ও ইংলিশ ড্রাফটিং বোঝাচ্ছেন স্যার",
    span: "sm:col-span-2 sm:row-span-2",
    aspect: "aspect-[4/3] sm:aspect-auto",
  },
  {
    caption: "সাপ্তাহিক বোর্ড স্ট্যান্ডার্ড মডেল টেস্ট দিচ্ছে শিক্ষার্থীরা",
    span: "",
    aspect: "aspect-[4/3]",
  },
  {
    caption: "দুর্বল শিক্ষার্থীদের আলাদা ডেকে ডাউট সলভ করছেন স্যার",
    span: "",
    aspect: "aspect-[4/3]",
  },
  {
    caption: "ভালো ফলাফলের জন্য পুরস্কার বিতরণী মুহূর্ত",
    span: "",
    aspect: "aspect-[4/3]",
  },
  {
    caption: "ক্লাস শুরুর আগে উপস্থিতি ও সুশৃঙ্খল পরিবেশ",
    span: "",
    aspect: "aspect-[4/3]",
  },
];

function PhotoPlaceholder({
  caption,
  className = "",
  aspect,
}: {
  caption: string;
  className?: string;
  aspect: string;
}) {
  return (
    <div
      className={`group relative flex ${aspect} flex-col justify-end overflow-hidden rounded-2xl border border-dashed border-sky-300/70 bg-gradient-to-br from-sky-50 via-white to-sky-100/60 ${className}`}
    >
      {/* মাঝখানে ক্যামেরা আইকন — বাস্তব ছবি বসার আগ পর্যন্ত প্লেসহোল্ডার */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sky-400/80 transition-transform duration-300 group-hover:scale-105">
        <svg
          className="h-8 w-8 sm:h-9 sm:w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <circle cx="12" cy="13" r="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[11px] font-semibold">ছবি শীঘ্রই যুক্ত হবে</span>
      </div>

      {/* ক্যাপশন — গ্র্যাডিয়েন্ট ওভারলে সহ নিচে (আসল ছবি বসলে এই স্টাইলটাই ধরে রাখবে) */}
      <div className="relative z-10 bg-gradient-to-t from-sky-950/80 via-sky-950/10 to-transparent p-3 sm:p-4">
        <p className="text-[11px] font-semibold leading-snug text-white sm:text-xs">
          {caption}
        </p>
      </div>
    </div>
  );
}

export default function RealClassroomShowcase() {
  return (
    <section id="campus-life" className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            রিয়েল ক্লাসরুম
          </span>
          <h2 className="mt-3 text-2xl font-bold text-sky-950 sm:text-3xl lg:text-4xl">
            আমাদের ক্লাসরুম ও একাডেমি লাইফ
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-ink-800/80 leading-relaxed">
            কোনো বিজ্ঞাপন নয় — এগুলো আমাদের প্রতিদিনের ক্লাসরুম, পড়াশোনার পরিবেশ এবং
            শিক্ষার্থীদের যত্নের বাস্তব মুহূর্ত।
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[160px]">
          {CLASSROOM_MOMENTS.map((item, i) => (
            <Reveal key={item.caption} delay={i * 70} className={item.span}>
              <PhotoPlaceholder
                caption={item.caption}
                aspect={item.aspect}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
