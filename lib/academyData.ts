import { createClient } from "./supabase/server";
import { formatBengaliDate } from "./bengaliNumerals";

// ============================================================
// BATCHES
// ============================================================
export type Batch = {
  id: string;
  name: string;
  targetCohort: string;
  badge: string;
  schedule: string;
  location: string;
  features: string[];
};

export async function getActiveBatches(): Promise<Batch[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("batches")
    .select("id, name, target_cohort, badge, schedule, location, features")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getActiveBatches failed:", error.message);
    return [];
  }

  return (data ?? []).map((b) => ({
    id: b.id as string,
    name: b.name as string,
    targetCohort: b.target_cohort as string,
    badge: b.badge as string,
    schedule: b.schedule as string,
    location: b.location as string,
    features: (b.features as string[] | null) ?? [],
  }));
}

// ============================================================
// BLOG POSTS
// ============================================================
export type BlogPostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string; // already formatted for display, e.g. "২৫ সেপ্টেম্বর, ২০২৬"
  href: string;
};

export async function getPublishedBlogPosts(limit = 3): Promise<BlogPostSummary[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getPublishedBlogPosts failed:", error.message);
    return [];
  }

  return (data ?? []).map((p) => ({
    id: p.id as string,
    title: p.title as string,
    slug: p.slug as string,
    excerpt: p.excerpt as string,
    date: formatBengaliDate((p.published_at as string).slice(0, 10)),
    href: `/blog/${p.slug}`,
  }));
}

// ============================================================
// CLASS DIARY
// ============================================================
export type ClassDiaryEntry = {
  id: string;
  date: string; // formatted, e.g. "২৫ সেপ্টেম্বর, ২০২৬"
  batch: string;
  topic: string;
  note: string;
  slideUrl: string;
};

export async function getClassDiaryEntries(limit = 9): Promise<ClassDiaryEntry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("class_diary_entries")
    .select("id, entry_date, batch_name_snapshot, topic, note, slide_url")
    .order("entry_date", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getClassDiaryEntries failed:", error.message);
    return [];
  }

  return (data ?? []).map((e) => ({
    id: e.id as string,
    date: formatBengaliDate(e.entry_date as string),
    batch: (e.batch_name_snapshot as string | null) ?? "",
    topic: e.topic as string,
    note: e.note as string,
    slideUrl: (e.slide_url as string | null) ?? "#",
  }));
}
