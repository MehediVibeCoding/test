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

// 🔧 এই তালিকায় নতুন টেক্সট রিভিউ (নাম, বছর, ভূমিকা ও শুধু লেখা) যোগ/সম্পাদনা করা যাবে —
// শুধু টেক্সট, কোনো ছবি বা রেটিং ছাড়া, ভাঙচুরের সিম্পল রিভিউ-ওয়াল স্টাইলে
const MORE_REVIEWS: { name: string; year: string; type: "শিক্ষার্থী" | "অভিভাবক"; quote: string }[] = [
  { name: "Tanvir Ahmed", year: "HSC 2026", type: "শিক্ষার্থী", quote: "Flow Chart আর Theme লেখা এত সহজভাবে আগে কখনো বুঝিনি।" },
  { name: "Farhana Akter", year: "HSC 2025", type: "অভিভাবক", quote: "প্রতি সপ্তাহে মেয়ের রেজাল্ট জানানো হয়, খুব ভালো লাগে।" },
  { name: "Md. Sabbir Hossain", year: "HSC 2027", type: "শিক্ষার্থী", quote: "Logic Gate নিয়ে যত ভয় ছিল, স্যারের ক্লাসে সব দূর হয়ে গেছে।" },
  { name: "Rafiqul Islam", year: "HSC 2025", type: "অভিভাবক", quote: "সীমিত আসন হওয়ায় প্রতিটা বাচ্চার দিকে আলাদা নজর দেওয়া হয়, এটাই সবচেয়ে বড় প্রাপ্তি।" },
  { name: "Jannatul Ferdous", year: "HSC 2026", type: "শিক্ষার্থী", quote: "সাপ্তাহিক মডেল টেস্টের কারণে বোর্ড পরীক্ষার আগে আত্মবিশ্বাস অনেক বেড়ে গেছে।" },
  { name: "Kamrul Hasan", year: "HSC 2024", type: "শিক্ষার্থী", quote: "C Programming একদম বেসিক থেকে বুঝিয়েছেন, এখন নিজে নিজেই কোড লিখতে পারি।" },
  { name: "Shirin Akter", year: "HSC 2026", type: "অভিভাবক", quote: "ক্লাস মিস গেলেও নোট পেয়ে যায় বলে পড়াশোনায় পিছিয়ে পড়ে না।" },
  { name: "Abdullah Al Noman", year: "HSC 2027", type: "শিক্ষার্থী", quote: "ইংরেজি গ্রামারের ভয় কেটে গিয়ে এখন Writing Part সবচেয়ে পছন্দের।" },
];

export default function Testimonials() {
  return (
    <section className="bg-sky-100/50 px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-sky-950 md:text-3xl">
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
                  <span className="font-medium text-sky-950">{t.name}</span>
                  <span className="block text-sky-700">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* নিচে আরও রিভিউয়ের ঘন ওয়াল — শুধু টেক্সট, ছোট কার্ড আকারে, ভাঙচুরের
            রিভিউ-ওয়াল স্টাইল রেফারেন্স নিয়ে এখানে বসানো হলো */}
        <Reveal delay={120} className="mt-10 border-t border-sky-200/60 pt-10 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700 sm:text-sm">
            আরও পড়ুন — শিক্ষার্থী ও অভিভাবকদের সংক্ষিপ্ত মতামত
          </p>
        </Reveal>

        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {MORE_REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 50} className="break-inside-avoid">
              <div className="rounded-xl border border-sky-100 bg-white p-4 shadow-sm transition-all hover:border-sky-300 hover:shadow-md">
                <p className="text-xs leading-relaxed text-ink-800/85 sm:text-sm">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-sky-100/80 pt-2.5">
                  <span className="text-xs font-bold text-sky-950">{r.name}</span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      r.type === "শিক্ষার্থী"
                        ? "bg-sky-50 text-sky-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {r.type} · {r.year}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
