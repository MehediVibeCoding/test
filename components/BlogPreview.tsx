import Link from "next/link";
import Reveal from "./Reveal";
import { getPublishedBlogPosts } from "@/lib/academyData";

export default async function BlogPreview() {
  const posts = await getPublishedBlogPosts(3);

  return (
    <section id="blog" className="relative px-6 py-20 sm:px-8 sm:py-28 lg:px-12 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* সেকশন হেডার ও 'সকল ব্লগ' নেভিগেশন */}
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
              স্টাডি টিপস ও গাইডলাইন
            </span>
            <h2 className="mt-3.5 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[40px]">
              সাম্প্রতিক ব্লগ ও আর্টিকেল
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[15px] leading-[1.8] text-ink-800/80 sm:text-base">
              পড়াশোনার কৌশল, সিলেবাস বিশ্লেষণ ও বোর্ড পরীক্ষার প্রস্তুতি নিয়ে গুরুত্বপূর্ণ দিকনির্দেশনা।
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-sky-200/80 bg-sky-50 px-6 py-2.5 font-body text-xs font-bold text-sky-800 transition-all hover:border-sky-600 hover:bg-sky-600 hover:text-white active:scale-95 sm:text-sm"
          >
            সব ব্লগ দেখুন
          </Link>
        </Reveal>

        {/* প্রিমিয়াম ব্লগ কার্ড গ্রিড */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 70}>
              <Link
                href={post.href}
                className="group flex h-full flex-col justify-between rounded-3xl border border-sky-100 bg-white p-7 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5"
              >
                <div>
                  {/* তারিখ ব্যাজ */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 font-body text-xs font-bold text-sky-800">
                      <svg className="h-3.5 w-3.5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{post.date}</span>
                    </span>
                  </div>

                  {/* ব্লগের শিরোনাম */}
                  <h3 className="mt-5 font-body text-lg font-black leading-snug text-sky-950 transition-colors group-hover:text-sky-700 sm:text-[19px] line-clamp-2">
                    {post.title}
                  </h3>

                  {/* সংক্ষিপ্ত ভূমিকা */}
                  <p className="mt-3 font-body text-sm leading-[1.75] text-ink-800/80 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* রিড আর্টিকেল পিল বাটন */}
                <div className="mt-7 border-t border-sky-100/80 pt-4">
                  <span className="inline-flex w-full items-center justify-center rounded-full border border-sky-200/80 bg-sky-50/50 py-2.5 text-center font-body text-xs font-bold text-sky-900 transition-all group-hover:border-sky-600 group-hover:bg-sky-600 group-hover:text-white sm:text-sm">
                    সম্পূর্ণ আর্টিকেল পড়ুন
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
