import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative -mt-[58px] overflow-hidden px-4 pt-[74px] pb-6 sm:-mt-[68px] sm:pt-[90px] md:pb-10"
      style={{
        background:
          "radial-gradient(ellipse 65% 50% at 5% 30%, rgba(56, 189, 248, 0.35) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 95% 45%, rgba(14, 165, 233, 0.30) 0%, transparent 65%), linear-gradient(180deg, #e0f2fe 0%, #f0f7fe 55%, #ffffff 100%)",
      }}
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-8">
        
        {/* টেক্সট কন্টেন্ট কলাম (ডেস্কটপে বাঁয়ে, মোবাইলে ছবির নিচে) */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <p className="font-display text-xs sm:text-sm font-bold tracking-wide text-sky-700">
            Better Learning, Brighter Future
          </p>

          <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight text-sky-950 sm:text-5xl lg:text-6xl">
            Md. Ahsan Ullah
          </h1>

          <div className="mt-2.5 space-y-1">
            <p className="text-sm sm:text-base font-bold text-sky-900">
              Founder &amp; CEO — Ahsan&apos;s Learning Academy
            </p>
            <p className="text-xs sm:text-sm font-semibold text-sky-800">
              প্রভাষক (HSC English &amp; ICT), চৌদ্দগ্রাম সরকারি কলেজ · ৪০তম বিসিএস (সাধারণ শিক্ষা ক্যাডার)
            </p>
          </div>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-ink-800/90 sm:text-sm md:mx-0">
            ইংরেজি ও আইসিটির মতো গুরুত্বপূর্ণ বিষয়গুলোতে শিক্ষার্থীদের ভীতি দূর করে বাস্তবধর্মী
            টেকনিক, নিয়মিত প্র্যাকটিস ও সঠিক গাইডলাইনের মাধ্যমে বোর্ড পরীক্ষায় নিশ্চিত A+ অর্জনের
            পরিপূর্ণ সহায়ক একাডেমি।
          </p>

          {/* স্ট্যাটাস কাউন্টার */}
          <div className="mx-auto mt-5 flex max-w-md justify-center gap-6 border-y border-sky-200/60 py-3 sm:gap-8 md:mx-0 md:justify-start">
            <div>
              <p className="font-display text-xl font-bold text-sky-950 sm:text-2xl">৮+ বছর</p>
              <p className="text-[11px] text-ink-800/70">শিক্ষকতা অভিজ্ঞতা</p>
            </div>
            <div>
              <p className="font-display text-xl font-bold text-sky-950 sm:text-2xl">১০,০০০+</p>
              <p className="text-[11px] text-ink-800/70">শিক্ষার্থীকে পাঠদান</p>
            </div>
            <div>
              <p className="font-display text-xl font-bold text-sky-950 sm:text-2xl">১০০%</p>
              <p className="text-[11px] text-ink-800/70">বোর্ড সিলেবাস কেয়ার</p>
            </div>
          </div>

          {/* অ্যাকশন বাটনসমূহ */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <a
              href="#admission"
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-sky-700"
            >
              প্রাইভেট ব্যাচে ভর্তি হও →
            </a>
            <a
              href="#class-diary"
              className="inline-flex items-center justify-center rounded-xl border border-sky-200 bg-white/90 px-5 py-2.5 text-xs sm:text-sm font-semibold text-sky-800 hover:bg-sky-50 shadow-sm"
            >
              আজকের ক্লাস নোট দেখো
            </a>
          </div>
        </div>

        {/* ছবির কলাম — নিচে মাস্কিং যোগ করে কালো ছায়া সম্পূর্ণ মুছে ফেলা হয়েছে */}
        <div className="order-1 flex justify-center md:order-2">
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px]">
            <Image
              src="/images/ahsan-hero.webp"
              alt="Md. Ahsan Ullah — Founder & CEO, Ahsan's Learning Academy"
              width={900}
              height={1350}
              priority
              className="h-auto w-full object-contain select-none [mask-image:linear-gradient(to_bottom,black_82%,transparent_98%)] [-webkit-mask-image:linear-gradient(to_bottom,black_82%,transparent_98%)]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
