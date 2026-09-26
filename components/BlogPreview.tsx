import Reveal from "./Reveal";
import { getPublishedBlogPosts } from "@/lib/academyData";

export default async function BlogPreview() {
  const posts = await getPublishedBlogPosts(3);

  return (
    <section id="blog" className="mx-auto max-w-5xl px-4 py-20">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-sky-950 md:text-3xl">
            সাম্প্রতিক ব্লগ
          </h2>
          <p className="mt-2 max-w-prose text-ink-800">
            পড়াশোনার টিপস, সিলেবাস বিশ্লেষণ ও পরীক্ষার কৌশল নিয়ে লেখা।
          </p>
        </div>
        <a href="/blog" className="text-sm font-medium text-sky-600 hover:text-sky-700">
          সব ব্লগ দেখো →
        </a>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.id} delay={i * 100}>
            <a
              href={post.href}
              className="hover-lift block h-full rounded-2xl border border-sky-100 bg-white p-6 hover:shadow-glass"
            >
              <p className="text-xs text-sky-700">{post.date}</p>
              <h3 className="mt-2 text-base font-semibold text-sky-950">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-800">{post.excerpt}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
