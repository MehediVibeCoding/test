import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPostBySlug } from "@/lib/academyData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "ব্লগ পোস্ট পাওয়া যায়নি | Ahsan's Learning Academy" };
  }

  return {
    title: `${post.title} | Ahsan's Learning Academy`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cloud-50 text-ink-800">
      <Navbar />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        {/* ব্রেডক্রাম্ব */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-muted">
          <Link href="/" className="hover:text-sky-600 transition-colors">
            হোমপেজ
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-sky-600 transition-colors">
            ব্লগ
          </Link>
          <span>/</span>
          <span className="truncate max-w-[200px] text-sky-950 font-bold">{post.title}</span>
        </nav>

        {/* হেডার ও প্রকাশের তারিখ */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold text-sky-700">
            <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-800">
              📅 {post.date}
            </span>
            <span className="text-muted">·</span>
            <span className="text-muted">আহসান স্যারের লেকচার নোট</span>
          </div>

          <h1 className="mt-4 font-body text-2xl font-black leading-tight text-sky-950 sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>

          {/* সংক্ষিপ্ত ভূমিকা বক্স */}
          {post.excerpt && (
            <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 font-body text-xs sm:text-sm italic leading-relaxed text-sky-950">
              &ldquo;{post.excerpt}&rdquo;
            </div>
          )}
        </header>

        {/* কভার ছবি */}
        {post.coverImageUrl && (
          <div className="mb-10 overflow-hidden rounded-3xl border border-sky-100 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="max-h-[420px] w-full object-cover"
            />
          </div>
        )}

        {/* মূল কনটেন্ট (প্যারাগ্রাফ ও পয়েন্ট আকারে ফরম্যাটেড) */}
        <div className="space-y-4 font-body text-[13.5px] sm:text-[15px] leading-relaxed text-ink-800/90 whitespace-pre-line border-b border-sky-100 pb-10">
          {post.content}
        </div>

        {/* লেখক পরিচিতি কার্ড */}
        <section className="my-10 flex flex-col sm:flex-row items-center gap-5 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-xl font-black text-white shadow-sm">
            AU
          </div>
          <div className="text-center sm:text-left">
            <p className="font-body text-base font-black text-sky-950">মোঃ আহসান উল্লাহ</p>
            <p className="font-body text-xs font-semibold text-sky-700">
              প্রভাষক (HSC English &amp; ICT), চৌদ্দগ্রাম সরকারি কলেজ · ৪০তম বিসিএস (শিক্ষা ক্যাডার)
            </p>
            <p className="mt-1 text-xs text-muted">
              প্রতিষ্ঠাতা ও প্রধান মেন্টর — Ahsan&apos;s Learning Academy
            </p>
          </div>
        </section>

        {/* ফুটার নেভিগেশন ও কল-টু-অ্যাকশন */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-sky-700 to-sky-950 p-6 text-white text-center sm:text-left shadow-md">
          <div>
            <p className="font-body text-base font-bold">প্রাইভেট ব্যাচে আসন নিশ্চিত করতে চাও?</p>
            <p className="text-xs text-sky-200 mt-0.5">সীমিত আসনে যত্নসহকারে সরাসরি পাঠদান করা হয়।</p>
          </div>
          <Link
            href="/#admission"
            className="rounded-xl bg-white px-5 py-2.5 font-body text-xs sm:text-sm font-black text-sky-950 shadow-sm hover:bg-sky-50 transition-colors"
          >
            ভর্তি ফরম পূরণ করো →
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className="font-body text-xs sm:text-sm font-bold text-sky-600 hover:underline">
            ← সব ব্লগ আর্টিকেলের তালিকায় ফিরে যান
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
        }
