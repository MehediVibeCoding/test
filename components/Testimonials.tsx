import Reveal from "./Reveal";
import { getTestimonials } from "@/lib/academyData";

// ডাটাবেজ সাময়িক ফাঁকা থাকলে ডেমো ফলব্যাক
const FALLBACK_FEATURED = [
  {
    id: "t1",
    name: "Shi Hab",
    role: "শিক্ষার্থী, HSC 27",
    type: "শিক্ষার্থী" as const,
    year: "HSC 2027",
    quote: "স্যারের ক্লাসের পর ICT-তে আমার ভয় পুরোপুরি কেটে গেছে। খুব সহজভাবে বুঝিয়ে দেন।",
    isFeatured: true,
  },
  {
    id: "t2",
    name: "Nasimul Kawsar",
    role: "অভিভাবক",
    type: "অভিভাবক" as const,
    year: "অভিভাবক",
    quote: "আমার ছেলের English-এ যথেষ্ট উন্নতি হয়েছে স্যারের গাইডলাইনে।",
    isFeatured: true,
  },
  {
    id: "t3",
    name: "Arafatul Islam Ovi",
    role: "শিক্ষার্থী, HSC 28",
    type: "শিক্ষার্থী" as const,
    year: "HSC 2028",
    quote: "ক্লাস ডায়েরি ফিচারটা দারুণ কাজে দেয় — মিস করা ক্লাসের নোট সহজেই পাই।",
    isFeatured: true,
  },
];

const FALLBACK_MORE_REVIEWS = [
  { id: "m1", name: "Tanvir Ahmed", year: "HSC 2026", type: "শিক্ষার্থী" as const, quote: "Flow Chart আর Theme লেখা এত সহজভাবে আগে কখনো বুঝিনি।" },
  { id: "m2", name: "Farhana Akter", year: "HSC 2025", type: "অভিভাবক" as const, quote: "প্রতি সপ্তাহে মেয়ের রেজাল্ট জানানো হয়, খুব ভালো লাগে।" },
  { id: "m3", name: "Md. Sabbir Hossain", year: "HSC 2027", type: "শিক্ষার্থী" as const, quote: "Logic Gate নিয়ে যত ভয় ছিল, স্যারের ক্লাসে সব দূর হয়ে গেছে।" },
  { id: "m4", name: "Rafiqul Islam", year: "HSC 2025", type: "অভিভাবক" as const, quote: "সীমিত আসন হওয়ায় প্রতিটা বাচ্চার দিকে আলাদা নজর দেওয়া হয়, এটাই সবচেয়ে বড় প্রাপ্তি।" },
  { id: "m5", name: "Jannatul Ferdous", year: "HSC 2026", type: "শিক্ষার্থী" as const, quote: "সাপ্তাহিক মডেল টেস্টের কারণে বোর্ড পরীক্ষার আগে আত্মবিশ্বাস অনেক বেড়ে গেছে।" },
  { id: "m6", name: "Kamrul Hasan", year: "HSC 2024", type: "শিক্ষার্থী" as const, quote: "C Programming একদম বেসিক থেকে বুঝিয়েছেন, এখন নিজে নিজেই কোড লিখতে পারি।" },
  { id: "m7", name: "Shirin Akter", year: "HSC 2026", type: "অভিভাবক" as const, quote: "ক্লাস মিস গেলেও নোট পেয়ে যায় বলে পড়াশোনায় পিছিয়ে পড়ে না।" },
  { id: "m8", name: "Abdullah Al Noman", year: "HSC 2027", type: "শিক্ষার্থী" as const, quote: "ইংরেজি গ্রামারের ভয় কেটে গিয়ে এখন Writing Part সবচেয়ে পছন্দের।" },
];

export default async function Testimonials() {
  const { featured: dbFeatured, moreReviews: dbMore } = await getTestimonials();

  const featured = dbFeatured.length > 0 ? dbFeatured : FALLBACK_FEATURED;
  const moreReviews = dbMore.length > 0 ? dbMore : FALLBACK_MORE_REVIEWS;

  return (
    <section className="bg-sky-100/50 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            শিক্ষার্থী ও অভিভাবক প্রতিক্রিয়া
          </span>
          <h2 className="mt-3 text-2xl font-bold text-sky-950 sm:text-3xl lg:text-4xl">
            শিক্ষার্থী ও অভিভাবকরা যা বলেন
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-xs sm:text-sm text-ink-800/80 leading-relaxed">
            আমাদের একাডেমি থেকে পড়ে শিক্ষার্থী ও অভিভাবকদের বাস্তব অভিজ্ঞতা ও মতামত।
          </p>
        </Reveal>

        {/* শীর্ষ ৩টি ফিচার্ড বড় কার্ড */}
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((t, i) => (
            <Reveal key={t.id || t.name} delay={i * 100}>
              <figure className="glass-panel hover-lift h-full p-6 hover:shadow-glass flex flex-col justify-between">
                <blockquote className="font-body text-xs sm:text-sm leading-relaxed text-ink-800/90 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 border-t border-sky-100/80 pt-3 flex items-center justify-between">
                  <div>
                    <span className="font-body text-xs sm:text-sm font-bold text-sky-950 block">
                      {t.name}
                    </span>
                    <span className="block text-[11px] font-semibold text-sky-700">
                      {t.role || t.type}
                    </span>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      t.type === "শিক্ষার্থী"
                        ? "bg-sky-50 text-sky-700 border border-sky-200/60"
                        : "bg-amber-50 text-amber-800 border border-amber-200/60"
                    }`}
                  >
                    {t.type}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* নিচে আরও রিভিউয়ের ঘন ওয়াল (মেসোনরি গ্রিড) */}
        {moreReviews.length > 0 && (
          <>
            <Reveal delay={120} className="mt-12 border-t border-sky-200/60 pt-10 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-700 sm:text-sm">
                আরও পড়ুন — শিক্ষার্থী ও অভিভাবকদের সংক্ষিপ্ত মতামত
              </p>
            </Reveal>

            <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
              {moreReviews.map((r, i) => (
                <Reveal key={r.id || r.name} delay={i * 40} className="break-inside-avoid">
                  <div className="hover-lift rounded-2xl border border-sky-100 bg-white p-4 shadow-sm transition-all hover:border-sky-300 hover:shadow-md">
                    <p className="font-body text-xs leading-relaxed text-ink-800/85 sm:text-sm italic">
                      &ldquo;{r.quote}&rdquo;
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-sky-100/80 pt-2.5">
                      <span className="font-body text-xs font-bold text-sky-950">{r.name}</span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          r.type === "শিক্ষার্থী"
                            ? "bg-sky-50 text-sky-700 border border-sky-200/60"
                            : "bg-amber-50 text-amber-800 border border-amber-200/60"
                        }`}
                      >
                        {r.type} · {r.year}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
