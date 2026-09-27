"use server";

import { createClient } from "@/lib/supabase/server";

export type PublicReviewInput = {
  name: string;
  role_type: "শিক্ষার্থী" | "অভিভাবক";
  batch_year: string;
  quote: string;
};

export type PublicReviewActionResult =
  | { ok: true; reviewId: string }
  | { ok: false; error: string };

export type ReviewStatusResult = {
  status: "approved" | "pending" | "rejected";
};

const ALLOWED_ROLES = ["শিক্ষার্থী", "অভিভাবক"];

// সার্ভার-সাইড স্ক্রিপ্ট ও ট্যাগ স্যানিটাইজার
function sanitizeServerInput(val: string): string {
  if (!val) return "";
  return val
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
    .trim();
}

// ১. নতুন রিভিউ সাবমিশন (২৪ ঘণ্টায় সর্বোচ্চ ২টি রিভিউ লিমিট সহ)
export async function submitPublicReview(
  input: PublicReviewInput
): Promise<PublicReviewActionResult> {
  try {
    const name = sanitizeServerInput(input.name);
    const quote = sanitizeServerInput(input.quote);
    const batchYear = sanitizeServerInput(input.batch_year);
    const roleType = ALLOWED_ROLES.includes(input.role_type)
      ? input.role_type
      : "শিক্ষার্থী";

    // ফিল্ড ভ্যালিডেশন
    if (!name || name.length < 2 || name.length > 60) {
      return { ok: false, error: "আপনার সঠিক পূর্ণ নাম দিন (২ থেকে ৬০ অক্ষরের মধ্যে)।" };
    }
    if (!quote || quote.length < 10 || quote.length > 500) {
      return { ok: false, error: "আপনার মতামত বক্তব্য ১০ থেকে ৫০০ অক্ষরের মধ্যে হতে হবে।" };
    }
    if (!batchYear || batchYear.length < 2 || batchYear.length > 30) {
      return { ok: false, error: "সঠিক ব্যাচ বা শিক্ষাবর্ষ উল্লেখ করুন (যেমন: HSC 2026)।" };
    }

    const supabase = await createClient();

    // সার্ভার-সাইড ২৪ ঘণ্টার রেট-লিমিট চেক (একই নাম থেকে ২৪ ঘণ্টায় সর্বোচ্চ ২টি রিভিউ)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: recentReviews, error: rateLimitErr } = await supabase
      .from("testimonials")
      .select("id")
      .eq("name", name)
      .gte("created_at", twentyFourHoursAgo);

    if (rateLimitErr) {
      console.error("Rate limit check error:", rateLimitErr.message);
    }

    if (recentReviews && recentReviews.length >= 2) {
      return {
        ok: false,
        error: "আপনি আজকের জন্য সর্বোচ্চ ২টি রিভিউ প্রদান করেছেন। অনুগ্রহ করে আগামীকাল চেষ্টা করুন।",
      };
    }

    // ড্রাফট হিসেবে ডাটাবেজে ইনসার্ট (is_featured = false)
    const { data, error } = await supabase
      .from("testimonials")
      .insert({
        name,
        role_type: roleType,
        batch_year: batchYear,
        quote,
        is_featured: false,
        sort_order: 0,
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("submitPublicReview DB error:", error?.message);
      return { ok: false, error: "দুঃখিত, মতামত জমা নেওয়া যায়নি। একটু পরে আবার চেষ্টা করুন।" };
    }

    return { ok: true, reviewId: data.id };
  } catch (err) {
    console.error("submitPublicReview unexpected error:", err);
    return { ok: false, error: "সার্ভার সংযোগে ত্রুটি হয়েছে।" };
  }
}

// ২. রিভিউয়ের বর্তমান স্ট্যাটাস যাচাই (Approved / Pending / Rejected)
export async function checkReviewStatus(
  reviewId: string
): Promise<ReviewStatusResult> {
  if (!reviewId || reviewId === "local_pending") {
    return { status: "pending" };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, is_featured")
      .eq("id", reviewId)
      .maybeSingle();

    // যদি ডাটাবেজে না পাওয়া যায়, তার মানে অ্যাডমিন এটি মুছে/বাতিল করেছেন
    if (error || !data) {
      return { status: "rejected" };
    }

    // যদি অ্যাডমিন অ্যাপ্রুভ বা ফিচার্ড করেন
    if (data.is_featured) {
      return { status: "approved" };
    }

    // এখনো পেন্ডিং
    return { status: "pending" };
  } catch (err) {
    console.error("checkReviewStatus error:", err);
    return { status: "pending" };
  }
}
