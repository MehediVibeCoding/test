import Link from "next/link";
import type { Metadata } from "next";
import { getAllPublishedBlogPosts } from "@/lib/academyData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "সকল ব্লগ ও স্টাডি গাইডলাইন | Ahsan's Learning Academy",
  description:
    "HSC English ও ICT প্রস্তুতি, সিলেবাস বিশ্লেষণ ও পরীক্ষার টিপস নিয়ে মোঃ আহসান উল্লাহ স্যারের সকল আর্টিকেল।",
};

export default async function AllBlogPage() {
  const posts = await getAllPublishedBlogPosts();

  return (
    <main className="min-h-screen bg-cloud-50 text-ink-800">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        {/* পেজ হেডার */}
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            স্টাডি ব্লগ ও গাইডলাইন
          </span>
          <h1 className="mt-3 font-body text-2xl font-black text-sky-950 sm:text-3xl lg:text-4xl">
            সকল ব্লগ ও আর্টিকেল
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-ink-800/80 leading-relaxed">
            ইংরেজি ও আইসিটির গুরুত্বপূর্ণ টপিক, বোর্ড প্রশ্ন সমাধান ও সহজ টেকনিক নিয়ে আহসান স্যারের সরাসরি নির্দেশনা।
          </p>
        </div>

        {/* ব্লগ গ্রিড */}
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-sky-100 bg-white p-12 text-center shadow-sm max-w-md mx-auto">
            <p className="font-body text-base font-bold text-sky-950">শীঘ্রই নতুন ব্লগ প্রকাশিত হবে</p>
            <p className="mt-1 text-xs text-muted">নিয়মিত চোখ রাখুন এবং ক্লাসের নোটগুলো দেখতে থাকুন।</p>
            <Link
              href="/"
              className="mt-5 inline-block rounded-xl bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700"
            >
              হোমপেজে ফিরে যান →
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="hover-lift flex flex-col justify-between overflow-hidden rounded-3xl border border-sky-100 bg-white p-5 shadow-sm transition-all hover:border-sky-300 hover:shadow-md"
              >
                <div>
                  {post.coverImageUrl && (
                    <div className="mb-4 overflow-hidden rounded-2xl border border-sky-100/60 aspect-video w-full bg-surface-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[11px] font-bold text-sky-700">
                    <span>📅 {post.date}</span>
                  </div>

                  <h2 className="mt-2.5 font-body text-base font-black leading-snug text-sky-950 line-clamp-2">
                    <Link href={post.href} className="hover:text-sky-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-2 text-xs leading-relaxed text-ink-800/80 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-5 border-t border-sky-100/80 pt-3">
                  <Link
                    href={post.href}
                    className="inline-flex items-center gap-1 font-body text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline"
                  >
                    <span>সম্পূর্ণ আর্টিকেল পড়ুন</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
                        }
