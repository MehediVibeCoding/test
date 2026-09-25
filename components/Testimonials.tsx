import Reveal from "./Reveal";

// 🔧 demo testimonials — replace with real student/parent reviews
const TESTIMONIALS = [
  {
    name: "Shi Hab",
    role: "শিক্ষার্থী, HSC 27",
    quote:
      "স্যারের ক্লাসের পর ICT-তে আমার ভয় পুরোপুরি কেটে গেছে। খুব সহজভাবে বুঝিয়ে দেন।",
  },
  {
    name: "Nasimul Kawsar",
    role: "অভিভাবক",
    quote: "আমার ছেলের English-এ যথেষ্ট উন্নতি হয়েছে স্যারের গাইডলাইনে।",
  },
  {
    name: "Arafatul Islam Ovi",
    role: "শিক্ষার্থী, HSC 28",
    quote: "ক্লাস ডায়েরি ফিচারটা দারুণ কাজে দেয় — মিস করা ক্লাসের নোট সহজেই পাই।",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-sky-100/50 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-sky-950 md:text-3xl">
            শিক্ষার্থী ও অভিভাবকরা যা বলেন
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="glass-panel hover-lift h-full p-6 hover:shadow-glass">
                <blockquote className="text-sm leading-relaxed text-ink-800">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-display font-medium text-sky-950">{t.name}</span>
                  <span className="block text-sky-700">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
