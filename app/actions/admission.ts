"use server";

import { createClient } from "@/lib/supabase/server";

export type AdmissionFormInput = {
  name: string;
  college: string;
  roll: string;
  group: string;
  batch: string;
  phone: string;
  guardianPhone: string;
};

export type AdmissionActionResult = { ok: true } | { ok: false; error: string };

const ALLOWED_GROUPS = ["বিজ্ঞান বিভাগ", "মানবিক বিভাগ", "ব্যবসায় শিক্ষা বিভাগ"];

// সার্ভার-সাইড XSS ও স্ক্রিপ্ট ইঞ্জেকশন স্যানিটাইজার
function sanitizeServerInput(val: string): string {
  if (!val) return "";
  return val
    .replace(/[<>]/g, "") // HTML ট্যাগ ও স্ক্রিপ্ট ব্র্যাকেট বাদ
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // ক্ষতিকর কন্ট্রোল ক্যারেক্টার বাদ
    .trim();
}

// বাংলাদেশি মোবাইল নম্বর ভ্যালিডেটর (013-019 প্রিফিক্স ও ঠিক 11 ডিজিট)
function isValidBdPhone(phone: string): boolean {
  return /^01[3-9]\d{8}$/.test(phone.trim());
}

export async function submitAdmission(
  input: AdmissionFormInput
): Promise<AdmissionActionResult> {
  try {
    const name = sanitizeServerInput(input.name);
    const college = sanitizeServerInput(input.college);
    const roll = sanitizeServerInput(input.roll);
    const group = sanitizeServerInput(input.group);
    const batchName = sanitizeServerInput(input.batch);
    const phone = sanitizeServerInput(input.phone);
    const guardianPhone = sanitizeServerInput(input.guardianPhone);

    // ১. সার্ভার-সাইড কঠোর ফিল্ড ভ্যালিডেশন
    if (!name || name.length < 2 || name.length > 60) {
      return { ok: false, error: "শিক্ষার্থীর সঠিক পূর্ণ নাম দিন (২ থেকে ৬০ অক্ষরের মধ্যে)।" };
    }
    if (!college || college.length < 2 || college.length > 80) {
      return { ok: false, error: "সঠিক কলেজের নাম দিন।" };
    }
    if (!roll || roll.length < 1 || roll.length > 20) {
      return { ok: false, error: "সঠিক কলেজ রোল নম্বর দিন।" };
    }
    if (!group || !ALLOWED_GROUPS.includes(group)) {
      return { ok: false, error: "সঠিক বিভাগ বা গ্রুপ নির্বাচন করুন।" };
    }
    if (!batchName || batchName.length < 2) {
      return { ok: false, error: "কাঙ্ক্ষিত ব্যাচ নির্বাচন করুন।" };
    }
    if (!isValidBdPhone(phone)) {
      return { ok: false, error: "শিক্ষার্থীর সঠিক বাংলাদেশি মোবাইল নম্বর দিন (১১ ডিজিট)।" };
    }
    if (!isValidBdPhone(guardianPhone)) {
      return { ok: false, error: "অভিভাবকের সঠিক বাংলাদেশি মোবাইল নম্বর দিন (১১ ডিজিট)।" };
    }

    const supabase = await createClient();

    // ২. সার্ভার ও ডাটাবেজ লেভেলে ২ ঘণ্টার ডুপ্লিকেট সাবমিশন লক চেক
    // বিগত ২ ঘণ্টার টাইমস্ট্যাম্প হিসাব করা
    const twoHoursAgoIso = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

    const { data: existingSubmission, error: checkError } = await supabase
      .from("students")
      .select("id")
      .eq("phone", phone)
      .gte("created_at", twoHoursAgoIso)
      .limit(1)
      .maybeSingle();

    if (checkError) {
      console.error("Duplicate check error:", checkError.message);
    }

    if (existingSubmission) {
      return {
        ok: false,
        error: "এই মোবাইল নম্বর থেকে ইতিমধ্যে একটি আবেদন জমা নেওয়া হয়েছে। অনুগ্রহ করে ২ ঘণ্টা পর চেষ্টা করুন।",
      };
    }

    // ৩. ব্যাচ আইডি খুঁজে নেওয়া
    const { data: batchRow } = await supabase
      .from("batches")
      .select("id")
      .eq("name", batchName)
      .maybeSingle();

    // ৪. সম্পূর্ণ সুরক্ষিত ও স্যানিটাইজড ডাটা ডাটাবেজে ইনসার্ট
    const { error: insertError } = await supabase.from("students").insert({
      full_name: name,
      college,
      college_roll: roll,
      group_name: group,
      batch_id: batchRow?.id ?? null,
      batch_name_snapshot: batchName,
      phone,
      guardian_phone: guardianPhone,
    });

    if (insertError) {
      console.error("submitAdmission DB error:", insertError.message);
      return { ok: false, error: "দুঃখিত, আবেদনটি ডাটাবেজে সংরক্ষণ করা যায়নি। একটু পরে চেষ্টা করুন।" };
    }

    return { ok: true };
  } catch (err) {
    console.error("submitAdmission unexpected error:", err);
    return { ok: false, error: "সার্ভার সংযোগে ত্রুটি হয়েছে।" };
  }
}
