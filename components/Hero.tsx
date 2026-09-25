export default function Hero() {
  return (
    <section className="sky-gradient relative overflow-hidden px-4 pb-20 pt-16 md:pt-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        {/* 🔧 replace with a real professional photo of Ahsan sir */}
        <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-glass bg-sky-100 flex items-center justify-center text-sky-700 font-display text-2xl">
          ছবি
        </div>

        <div>
          <p className="mb-3 font-display text-sm text-sky-700">
            Better Learning, Brighter Future
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight text-sky-950 md:text-5xl">
            Md. Ahsan Ullah
          </h1>
          <p className="mx-auto mt-4 max-w-prose text-base text-ink-800 md:text-lg">
            HSC English &amp; ICT শিক্ষক, চৌদ্দগ্রাম সরকারি কলেজ ·{" "}
            40th BCS (General) Education Cadre
          </p>
        </div>

        <div className="glass-panel flex flex-col gap-3 p-4 sm:flex-row sm:p-3">
          <a
            href="/admission"
            className="rounded-full bg-sky-600 px-6 py-3 text-sm font-medium text-white hover:bg-sky-700 transition-colors"
          >
            প্রাইভেট ব্যাচে ভর্তি হও
          </a>
          <a
            href="/class-diary"
            className="rounded-full border border-sky-600 px-6 py-3 text-sm font-medium text-sky-700 hover:bg-sky-100 transition-colors"
          >
            আজকের ক্লাস নোট দেখো
          </a>
        </div>
      </div>
    </section>
  );
}
