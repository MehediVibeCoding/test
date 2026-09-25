// 🔧 replace bullet content with confirmed bio details
const HIGHLIGHTS = [
  "University of Chittagong থেকে স্নাতক/স্নাতকোত্তর",
  "40th BCS (General) Education Cadre",
  "Lecturer, Chauddagram Govt. College — HSC English & ICT",
  "৫০০+ শিক্ষার্থীকে HSC-তে গাইড করেছেন",
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* 🔧 replace with a real photo */}
        <div className="aspect-square w-full max-w-sm justify-self-center overflow-hidden rounded-2xl bg-sky-100 shadow-glass flex items-center justify-center text-sky-700 font-display md:justify-self-start">
          স্যারের ছবি
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold text-sky-950 md:text-3xl">
            পরিচিতি
          </h2>
          <p className="mt-4 max-w-prose text-ink-800 leading-relaxed">
            আমি মোঃ আহসান উল্লাহ, চৌদ্দগ্রাম সরকারি কলেজের HSC English ও ICT বিষয়ের
            প্রভাষক এবং 40th BCS (General) Education Cadre-এর একজন সদস্য। শিক্ষকতার
            পাশাপাশি &quot;Ahsan&apos;s Learning Academy&quot;-এর মাধ্যমে শিক্ষার্থীদের সঠিক
            দিকনির্দেশনা দিয়ে আসছি। আমার লক্ষ্য শিক্ষাকে আরও সহজবোধ্য ও কার্যকরভাবে সবার
            কাছে পৌঁছে দেওয়া।
          </p>

          <ul className="mt-6 space-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-ink-800">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
