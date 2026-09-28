"use server";

import { createPublicClient } from "@/lib/supabase/server";
import { cleanText, dbGuardMessage, isValidBdPhone } from "@/lib/sanitize";

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

export async function submitAdmission(
  input: AdmissionFormInput
): Promise<AdmissionActionResult> {
  try {
    const name = cleanText(input.name);
    const college = cleanText(input.college);
    const roll = cleanText(input.roll);
    const group = cleanText(input.group);
    const batchName = cleanText(input.batch);
    const phone = cleanText(input.phone);
    const guardianPhone = cleanText(input.guardianPhone);

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

    const supabase = createPublicClient();

    // ২. ব্যাচ আইডি খুঁজে নেওয়া
    const { data: batchRow } = await supabase
      .from("batches")
      .select("id")
      .eq("name", batchName)
      .maybeSingle();

    // ৩. ডাটাবেজে ইনসার্ট। ২ ঘণ্টার ডুপ্লিকেট লক ও ফ্লাড লিমিট ডাটাবেজের
    // ট্রিগার (guard_student_insert) নিজেই প্রয়োগ করে — কোড বাইপাস করা যায় না।
    const { error: insertError } = await supabase.from("students").insert({
      full_name: name,
      college,
      college_roll: roll,
      group_name: group,
      batch_id: batchRow?.id ?? null,
      batch_name_snapshot: batchName,
      phone,
      guardian_phone: guardianPhone,
      status: "pending",
    });

    if (insertError) {
      const guardMessage = dbGuardMessage(insertError.message);
      if (guardMessage) return { ok: false, error: guardMessage };
      console.error("submitAdmission DB error:", insertError.message);
      return { ok: false, error: "দুঃখিত, আবেদনটি ডাটাবেজে সংরক্ষণ করা যায়নি। একটু পরে চেষ্টা করুন।" };
    }

    return { ok: true };
  } catch (err) {
    console.error("submitAdmission unexpected error:", err);
    return { ok: false, error: "সার্ভার সংযোগে ত্রুটি হয়েছে।" };
  }
}
