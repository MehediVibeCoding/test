import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ahsansir.vercel.app";

  // ১. মূল স্ট্যাটিক পেজসমূহ
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // ২. ডাটাবেজ থেকে সকল প্রকাশিত ব্লগের ডায়নামিক ইউআরএল ফেচ করা
  try {
    const supabase = createPublicClient();
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, published_at, created_at")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (!posts || posts.length === 0) {
      return staticRoutes;
    }

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.published_at || post.created_at || new Date()),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return staticRoutes;
  }
}
