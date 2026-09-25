import Image from "next/image";

export default function Hero() {
  return (
    <section className="sky-gradient relative overflow-hidden px-4 pb-16 pt-20 md:pb-24 md:pt-28">
      {/* decorative floating gradient orbs — purely visual */}
      <div className="orb -left-16 top-16 h-64 w-64 bg-sky-400" aria-hidden="true" />
      <div
        className="orb -right-20 bottom-0 h-80 w-80 bg-sky-600"
        style={{ animationDelay: "3s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-8">
        {/* text column */}
        <div className="reveal-up order-2 text-center md:order-1 md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/60 px-4 py-1.5 text-xs font-medium text-sky-700 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            চৌদ্দগ্রাম সরকারি কলেজ · HSC English &amp; ICT
          </div>

          <p className="mt-5 font-display text-sm text-sky-700">
            Better Learning, Brighter Future
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-[1.1] text-sky-950 md:text-6xl">
            Md. Ahsan Ullah
          </h1>
          <p className="mx-auto mt-4 max-w-prose text-base text-ink-800 md:mx-0 md:text-lg">
            HSC English &amp; ICT শিক্ষক, চৌদ্দগ্রাম সরকারি কলেজ ·{" "}
            40th BCS (General) Education Cadre
          </p>

          {/* quick stats */}
          <div className="mx-auto mt-6 flex max-w-md justify-center gap-8 md:mx-0 md:justify-start">
            <div className="text-center md:text-left">
              <p className="font-display text-2xl font-bold text-sky-950 md:text-3xl">৮+</p>
              <p className="text-xs text-ink-800/70">বছরের শিক্ষকতা অভিজ্ঞতা</p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-display text-2xl font-bold text-sky-950 md:text-3xl">১০,০০০+</p>
              <p className="text-xs text-ink-800/70">শিক্ষার্থীকে গাইড করেছেন</p>
            </div>
          </div>

          <div className="glass-panel-premium mt-8 inline-flex flex-col gap-3 p-4 sm:flex-row sm:p-3">
            <a
              href="#admission"
              className="btn-glow rounded-full bg-sky-600 px-7 py-3 text-sm font-medium text-white hover:bg-sky-700"
            >
              প্রাইভেট ব্যাচে ভর্তি হও
            </a>
            <a
              href="#class-diary"
              className="hover-lift rounded-full border border-sky-600 px-7 py-3 text-sm font-medium text-sky-700 hover:bg-sky-100"
            >
              আজকের ক্লাস নোট দেখো
            </a>
          </div>
        </div>

        {/* photo column — natural cutout, no ring/circle frame */}
        <div
          className="reveal-up order-1 flex justify-center md:order-2 md:justify-end"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="relative w-full max-w-[360px] md:max-w-[420px]">
            <Image
              src="/images/ahsan-hero.webp"
              alt="Md. Ahsan Ullah — HSC English & ICT শিক্ষক"
              width={900}
              height={1350}
              priority
              className="h-auto w-full select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
