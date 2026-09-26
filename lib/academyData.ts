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
  date: string;
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
  date: string;
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

// ============================================================
// 🌟 ১. কৃতি শিক্ষার্থী দেয়াল (TOPPERS)
// ============================================================
export type SuccessTopper = {
  id: string;
  name: string;
  batch: string;
  result: string;
  subject: string;
  college: string;
  photoUrl: string | null;
};

export async function getSuccessToppers(): Promise<SuccessTopper[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("success_toppers")
    .select("id, name, batch, result, subject, college, photo_url")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getSuccessToppers failed:", error.message);
    return [];
  }

  return (data ?? []).map((t) => ({
    id: t.id as string,
    name: t.name as string,
    batch: t.batch as string,
    result: t.result as string,
    subject: t.subject as string,
    college: t.college as string,
    photoUrl: (t.photo_url as string | null) ?? null,
  }));
}

// ============================================================
// 🌟 ২. ক্লাসরুম গ্যালারি (CLASSROOM PHOTOS)
// ============================================================
export type ClassroomPhoto = {
  id: string;
  caption: string;
  imageUrl: string;
};

export async function getClassroomPhotos(): Promise<ClassroomPhoto[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("classroom_photos")
    .select("id, caption, image_url")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getClassroomPhotos failed:", error.message);
    return [];
  }

  return (data ?? []).map((p) => ({
    id: p.id as string,
    caption: p.caption as string,
    imageUrl: p.image_url as string,
  }));
}

// ============================================================
// 🌟 ৩. বিদায় ও স্মৃতি অ্যালবাম (FAREWELL MEMORIES)
// ============================================================
export type FarewellMemory = {
  id: string;
  batch: string;
  caption: string;
  imageUrl: string;
};

export async function getFarewellMemories(): Promise<FarewellMemory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("farewell_memories")
    .select("id, batch_tag, caption, image_url")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getFarewellMemories failed:", error.message);
    return [];
  }

  return (data ?? []).map((m) => ({
    id: m.id as string,
    batch: m.batch_tag as string,
    caption: m.caption as string,
    imageUrl: m.image_url as string,
  }));
}

// ============================================================
// 🌟 ৪. সর্বশেষ ভিডিও লেকচার (VIDEOS)
// ============================================================
export type VideoLecture = {
  id: string;
  title: string;
  href: string;
  thumbnailUrl: string | null;
};

export async function getVideoLectures(): Promise<VideoLecture[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("video_lectures")
    .select("id, title, video_url, thumbnail_url")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getVideoLectures failed:", error.message);
    return [];
  }

  return (data ?? []).map((v) => ({
    id: v.id as string,
    title: v.title as string,
    href: v.video_url as string,
    thumbnailUrl: (v.thumbnail_url as string | null) ?? null,
  }));
}

// ============================================================
// 🌟 ৫. শিক্ষার্থী ও অভিভাবকদের রিভিউ (TESTIMONIALS)
// ============================================================
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  type: "শিক্ষার্থী" | "অভিভাবক";
  year: string;
  quote: string;
  isFeatured: boolean;
};

export async function getTestimonials(): Promise<{
  featured: Testimonial[];
  moreReviews: Testimonial[];
}> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, name, role_type, batch_year, quote, is_featured")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getTestimonials failed:", error.message);
    return { featured: [], moreReviews: [] };
  }

  const all = (data ?? []).map((t) => ({
    id: t.id as string,
    name: t.name as string,
    role: `${t.role_type}, ${t.batch_year}`,
    type: t.role_type as "শিক্ষার্থী" | "অভিভাবক",
    year: t.batch_year as string,
    quote: t.quote as string,
    isFeatured: (t.is_featured as boolean) ?? false,
  }));

  const featured = all.filter((t) => t.isFeatured);

  return {
    featured: featured.length > 0 ? featured.slice(0, 3) : all.slice(0, 3),
    moreReviews: all,
  };
}
