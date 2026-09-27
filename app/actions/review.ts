"use server";

import { createClient } from "@/lib/supabase/server";

export type PublicReviewInput = {
  name: string;
  role_type: "শিক্ষার্থী" | "অভিভাবক";
  batch_year: string;
  quote: string;
};

export type PublicReviewActionResult = { ok: true } | { ok: false; error: string };

const ALLOWED_ROLES = ["শিক্ষার্থী", "অভিভাবক"];

// সার্ভার-সাইড স্ক্রিপ্ট ও ট্যাগ স্যানিটাইজার
function sanitizeServerInput(val: string): string {
  if (!val) return "";
  return val
    .replace(/[<>]/g, "") // ক্ষতিকর ট্যাগ বন্ধ
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // কন্ট্রোল ক্যারেক্টার বাদ
    .trim();
}

export async function submitPublicReview(
  input: PublicReviewInput
): Promise<PublicReviewActionResult> {
  try {
    const name = sanitizeServerInput(input.name);
    const quote = sanitizeServerInput(input.quote);
    const batchYear = sanitizeServerInput(input.batch_year);
    const roleType = ALLOWED_ROLES.includes(input.role_type) ? input.role_type : "শিক্ষার্থী";

    // ১. সার্ভার-সাইড লেন্থ ও ডাটা ভ্যালিডেশন
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

    // ২. পেন্ডিং ড্রাফট হিসেবে ডাটাবেজে ইনসার্ট (is_featured = false বাধ্যতামূলক)
    const { error } = await supabase.from("testimonials").insert({
      name,
      role_type: roleType,
      batch_year: batchYear,
      quote,
      is_featured: false,
      sort_order: 0,
    });

    if (error) {
      console.error("submitPublicReview DB error:", error.message);
      return { ok: false, error: "দুঃখিত, মতামত জমা নেওয়া যায়নি। একটু পরে আবার চেষ্টা করুন।" };
    }

    return { ok: true };
  } catch (err) {
    console.error("submitPublicReview unexpected error:", err);
    return { ok: false, error: "সার্ভার সংযোগে ত্রুটি হয়েছে।" };
  }
}
