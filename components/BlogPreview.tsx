// 🔧 demo posts — later fetched from Supabase blog_posts table
const POSTS = [
  {
    title: "HSC English 1st Paper সম্পূর্ণ সিলেবাস (HSC-28)",
    excerpt:
      "Reading ও Writing Part-এর মার্কস বিভাজন, কোন অংশে কত নম্বর, এবং প্রস্তুতির কৌশল — সব একসাথে।",
    date: "২৫ সেপ্টেম্বর, ২০২৬",
    href: "#",
  },
  {
    title: "Flow Chart লেখার সহজ নিয়ম",
    excerpt: "ধাপে ধাপে Flow Chart লেখার কৌশল, সংযোজক শব্দের ব্যবহার এবং কমন ভুলগুলো।",
    date: "২০ সেপ্টেম্বর, ২০২৬",
    href: "#",
  },
  {
    title: "ICT: Logic Gate MCQ কীভাবে দ্রুত সমাধান করবে",
    excerpt: "Truth Table মুখস্থ না করেও কীভাবে যেকোনো Logic Gate MCQ সমাধান করা যায়।",
    date: "১৮ সেপ্টেম্বর, ২০২৬",
    href: "#",
  },
];

export default function BlogPreview() {
  return (
    <section id="blog" className="mx-auto max-w-5xl px-4 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-sky-950 md:text-3xl">
            সাম্প্রতিক ব্লগ
          </h2>
          <p className="mt-2 max-w-prose text-ink-800">
            পড়াশোনার টিপস, সিলেবাস বিশ্লেষণ ও পরীক্ষার কৌশল নিয়ে লেখা।
          </p>
        </div>
        <a href="/blog" className="text-sm font-medium text-sky-600 hover:text-sky-700">
          সব ব্লগ দেখো →
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {POSTS.map((post) => (
          <a
            key={post.title}
            href={post.href}
            className="block rounded-2xl border border-sky-100 bg-white p-6 transition-shadow hover:shadow-glass"
          >
            <p className="text-xs text-sky-700">{post.date}</p>
            <h3 className="mt-2 font-display text-base font-semibold text-sky-950">
              {post.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-800">{post.excerpt}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
