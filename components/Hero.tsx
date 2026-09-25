import Image from "next/image";

export default function Hero() {
  return (
    <section className="sky-gradient relative overflow-hidden px-4 pt-6 pb-2 md:pt-10 md:pb-0">
      {/* ডেকোরেটিভ ব্যাকগ্রাউন্ড ব্লার */}
      <div className="orb -left-16 top-10 h-72 w-72 bg-sky-300/40" aria-hidden="true" />
      <div
        className="orb -right-20 bottom-10 h-80 w-80 bg-sky-500/20"
        style={{ animationDelay: "3s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-end gap-8 md:grid-cols-[1.1fr_0.9fr]">
        {/* টেক্সট কন্টেন্ট কলাম */}
        <div className="reveal-up order-2 pb-8 text-center md:order-1 md:pb-12 md:text-left">
          <p className="font-display text-sm font-bold tracking-wide text-sky-700 sm:text-base">
            Better Learning, Brighter Future
          </p>

          <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight text-sky-950 sm:text-5xl lg:text-6xl">
            Md. Ahsan Ullah
          </h1>

          <div className="mt-3 space-y-1">
            <p className="text-base font-bold text-sky-900 sm:text-lg">
              Founder &amp; CEO — Ahsan&apos;s Learning Academy
            </p>
            <p className="text-xs font-semibold text-sky-800 sm:text-sm">
              প্রভাষক (HSC English &amp; ICT), চৌদ্দগ্রাম সরকারি কলেজ · ৪০তম বিসিএস (সাধারণ শিক্ষা ক্যাডার)
            </p>
          </div>

          <p className="mx-auto mt-4 max-w-lg text-xs leading-relaxed text-ink-800/90 sm:text-sm md:mx-0">
            ইংরেজি ও আইসিটির মতো গুরুত্বপূর্ণ বিষয়গুলোতে শিক্ষার্থীদের ভীতি দূর করে বাস্তবধর্মী
            টেকনিক, নিয়মিত প্র্যাকটিস ও সঠিক গাইডলাইনের মাধ্যমে বোর্ড পরীক্ষায় নিশ্চিত A+ অর্জনের
            পরিপূর্ণ সহায়ক একাডেমি।
          </p>

          {/* কুইক স্ট্যাটাস কাউন্টার */}
          <div className="mx-auto mt-6 flex max-w-md justify-center gap-6 border-y border-sky-200/60 py-3 sm:gap-8 md:mx-0 md:justify-start">
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

          {/* সরাসরি দুটি সাধারণ মার্জিত অ্যাকশন বাটন (অপ্রয়োজনীয় প্যাডিং বক্স ছাড়া) */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <a
              href="#admission"
              className="btn-glow inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-sky-700"
            >
              প্রাইভেট ব্যাচে ভর্তি হও →
            </a>
            <a
              href="#class-diary"
              className="hover-lift inline-flex items-center justify-center rounded-xl border border-sky-200 bg-white/90 px-5 py-3 text-xs sm:text-sm font-semibold text-sky-800 shadow-sm hover:bg-sky-50"
            >
              আজকের ক্লাস নোট দেখো
            </a>
          </div>
        </div>

        {/* ছবির কলাম — নিচের অতিরিক্ত ফাঁকা অংশ রিমুভ করে সেকশনের সাথে মসৃণ করা হয়েছে */}
        <div
          className="reveal-up order-1 flex justify-center md:order-2 md:justify-end"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[430px] -mb-1">
            <Image
              src="/images/ahsan-hero.webp"
              alt="Md. Ahsan Ullah — Founder & CEO, Ahsan's Learning Academy"
              width={900}
              height={1350}
              priority
              className="h-auto w-full object-contain select-none drop-shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
