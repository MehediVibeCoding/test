"use server";

import { createPublicClient } from "@/lib/supabase/server";
import { cleanText, dbGuardMessage } from "@/lib/sanitize";

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

// ১. নতুন রিভিউ সাবমিশন (২৪ ঘণ্টায় সর্বোচ্চ ২টি রিভিউ লিমিট সহ)
export async function submitPublicReview(
  input: PublicReviewInput
): Promise<PublicReviewActionResult> {
  try {
    const name = cleanText(input.name);
    const quote = cleanText(input.quote);
    const batchYear = cleanText(input.batch_year);
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

    const supabase = createPublicClient();

    // ২৪ ঘণ্টায় একই নামে ২টির বেশি রিভিউ ও ফ্লাড লিমিট — ডাটাবেজের ট্রিগার
    // (guard_testimonial_insert) প্রয়োগ করে।

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
      const guardMessage = dbGuardMessage(error?.message);
      if (guardMessage) return { ok: false, error: guardMessage };
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
    const supabase = createPublicClient();
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
