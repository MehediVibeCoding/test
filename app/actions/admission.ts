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

function isValidBdPhone(phone: string): boolean {
  return /^01[3-9]\d{8}$/.test(phone.trim());
}

export async function submitAdmission(
  input: AdmissionFormInput
): Promise<AdmissionActionResult> {
  const name = input.name?.trim();
  const college = input.college?.trim();
  const roll = input.roll?.trim();
  const group = input.group?.trim();
  const batchName = input.batch?.trim();
  const phone = input.phone?.trim();
  const guardianPhone = input.guardianPhone?.trim();

  if (!name || name.length < 2) return { ok: false, error: "সঠিক নাম দিন।" };
  if (!college) return { ok: false, error: "কলেজের নাম দিন।" };
  if (!roll) return { ok: false, error: "কলেজ রোল নম্বর দিন।" };
  if (!group) return { ok: false, error: "বিভাগ/গ্রুপ নির্বাচন করুন।" };
  if (!batchName) return { ok: false, error: "ব্যাচ নির্বাচন করুন।" };
  if (!isValidBdPhone(phone))
    return { ok: false, error: "শিক্ষার্থীর সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)।" };
  if (!isValidBdPhone(guardianPhone))
    return { ok: false, error: "অভিভাবকের সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)।" };

  const supabase = await createClient();

  // ব্যাচ নাম থেকে batch_id বের করার চেষ্টা করা হয় (থাকলে), যাতে ভবিষ্যতের
  // এডমিন প্যানেলে ব্যাচ অনুযায়ী স্টুডেন্ট গ্রুপ করা যায়। ব্যাচ না পাওয়া
  // গেলেও (যেমন কেউ পুরনো লিংক থেকে এসেছে) আবেদন আটকে থাকবে না — শুধু
  // batch_name_snapshot টেক্সট হিসেবে সংরক্ষিত থাকবে।
  const { data: batchRow } = await supabase
    .from("batches")
    .select("id")
    .eq("name", batchName)
    .maybeSingle();

  const { error } = await supabase.from("students").insert({
    full_name: name,
    college,
    college_roll: roll,
    group_name: group,
    batch_id: batchRow?.id ?? null,
    batch_name_snapshot: batchName,
    phone,
    guardian_phone: guardianPhone,
  });

  if (error) {
    console.error("submitAdmission insert failed:", error.message);
    return { ok: false, error: "দুঃখিত, একটু সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করো।" };
  }

  return { ok: true };
}
