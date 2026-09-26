"use server";

import { createClient } from "@/lib/supabase/server";

export type PublicReviewInput = {
  name: string;
  role_type: "শিক্ষার্থী" | "অভিভাবক";
  batch_year: string;
  quote: string;
};

export type PublicReviewActionResult = { ok: true } | { ok: false; error: string };

export async function submitPublicReview(
  input: PublicReviewInput
): Promise<PublicReviewActionResult> {
  const name = input.name?.trim();
  const quote = input.quote?.trim();
  const batchYear = input.batch_year?.trim();
  const roleType = input.role_type || "শিক্ষার্থী";

  if (!name || name.length < 2) return { ok: false, error: "আপনার পূর্ণ নাম দিন।" };
  if (!quote || quote.length < 5) return { ok: false, error: "আপনার মতামত বা রিভিউ বক্তব্য লিখুন।" };
  if (!batchYear) return { ok: false, error: "ব্যাচ বা শিক্ষাবর্ষ দিন (যেমন: HSC 2026)।" };

  try {
    const supabase = await createClient();

    // অ্যাডমিন অনুমোদন না করা পর্যন্ত is_featured = false থাকবে (পেন্ডিং ড্রাফট)
    const { error } = await supabase.from("testimonials").insert({
      name,
      role_type: roleType,
      batch_year: batchYear,
      quote,
      is_featured: false,
      sort_order: 0,
    });

    if (error) {
      console.error("submitPublicReview insert failed:", error.message);
      return { ok: false, error: "দুঃখিত, রিভিউ জমা নেওয়া যায়নি। একটু পরে চেষ্টা করুন।" };
    }

    return { ok: true };
  } catch (err) {
    console.error("submitPublicReview error:", err);
    return { ok: false, error: "সার্ভার সংযোগে ত্রুটি হয়েছে।" };
  }
}
