import { notFound } from "next/navigation";
import { optimizeImage } from "@/lib/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPostBySlug } from "@/lib/academyData";
import Footer from "@/components/Footer";

export const revalidate = 60;

// কোনো পেজ বিল্ডে আগে থেকে বানানো হয় না; প্রথম ভিজিটে বানিয়ে ক্যাশ করা হয় (ISR)।
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "ব্লগ পোস্ট পাওয়া যায়নি | Ahsan's Learning Academy" };
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
    <main className="min-h-screen bg-[#f8fafc] text-ink-800">
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ১. টপ হেডার কার্ড (ন্যাভবার ছাড়া ক্লিন ফিরে যান বাটন ও প্রকাশের তারিখ) */}
        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-b from-[#e0f2fe]/60 via-white to-white p-6 shadow-xs sm:p-8">
          {/* টপ বার */}
          <div className="flex items-center justify-between gap-4 border-b border-sky-100/80 pb-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white px-4 py-2 font-body text-xs font-bold text-sky-950 shadow-xs transition-all hover:bg-sky-50 active:scale-95 sm:px-5 sm:py-2.5 sm:text-[13px]"
            >
              <svg className="h-4 w-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>সব ব্লগে ফিরে যান</span>
            </Link>

            <span className="font-body text-xs font-semibold text-slate-500">
              প্রকাশিত: {post.date}
            </span>
          </div>

          {/* ব্লগের মূল শিরোনাম */}
          <h1 className="mt-6 font-body text-2xl font-black leading-tight text-sky-950 sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>

          {/* সংক্ষিপ্ত ভূমিকা কোট */}
          {post.excerpt && (
            <div className="mt-4 rounded-2xl border border-sky-100 bg-sky-50/50 p-4 font-body text-xs sm:text-sm italic leading-relaxed text-sky-950">
              {post.excerpt}
            </div>
          )}
        </div>

        {/* ২. কভার ছবি (যদি থাকে) */}
        {post.coverImageUrl && (
          <div className="mt-6 overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={optimizeImage(post.coverImageUrl, 1200)}
 loading="lazy"
 decoding="async"
              alt={post.title}
              className="max-h-[440px] w-full object-cover"
            />
          </div>
        )}

        {/* ৩. মূল আর্টিকেল কনটেন্ট ও বটম সিগনেচার */}
        <div className="mt-6 rounded-3xl border border-sky-100 bg-white p-6 shadow-xs sm:p-10">
          {/* আর্টিকেলের টেক্সট বডি */}
          <div className="space-y-5 font-body text-[15px] sm:text-base leading-[1.9] text-ink-800/90 whitespace-pre-line">
            {post.content}
          </div>

          {/* সবার শেষে ডানপাশে স্যারের মার্জিত ইটালিক সিগনেচার (Email Sign-off Style) */}
          <div className="mt-12 border-t border-sky-100/80 pt-6 flex flex-col items-end text-right">
            <span className="font-display italic text-lg sm:text-xl font-black text-sky-950 tracking-wide">
              — Md. Ahsan Ullah
            </span>
            <span className="font-body text-xs font-semibold text-sky-700 mt-0.5">
              Ahsan&apos;s Learning Academy
            </span>
          </div>
        </div>
      </article>

      {/* পেজ ফুটার */}
      <Footer />
    </main>
  );
}
