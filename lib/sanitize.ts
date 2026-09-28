/**
 * সার্ভার-সাইড ইনপুট পরিষ্কার করা। React নিজেই আউটপুট escape করে, তাই এখানে
 * কাজ শুধু কন্ট্রোল ক্যারেক্টার ও বাড়তি স্পেস সরানো — আসল সুরক্ষা ডাটাবেজের
 * CHECK কনস্ট্রেইন্ট ও RLS পলিসিতে।
 */
export function cleanText(val: unknown): string {
  if (typeof val !== "string") return "";
  return val
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** বাংলাদেশি মোবাইল নম্বর: 013-019 দিয়ে শুরু, মোট ১১ ডিজিট */
export function isValidBdPhone(phone: string): boolean {
  return /^01[3-9]\d{8}$/.test(phone);
}

/** ডাটাবেজ ট্রিগারের এরর কোড থেকে ব্যবহারকারীর জন্য বার্তা */
export function dbGuardMessage(message: string | undefined): string | null {
  if (!message) return null;
  if (message.includes("duplicate_recent_submission")) {
    return "এই মোবাইল নম্বর থেকে ইতিমধ্যে একটি আবেদন জমা নেওয়া হয়েছে। অনুগ্রহ করে ২ ঘণ্টা পর চেষ্টা করুন।";
  }
  if (message.includes("review_limit_reached")) {
    return "আপনি আজকের জন্য সর্বোচ্চ ২টি রিভিউ প্রদান করেছেন। অনুগ্রহ করে আগামীকাল চেষ্টা করুন।";
  }
  if (message.includes("too_many_submissions")) {
    return "এই মুহূর্তে অনেক আবেদন জমা পড়ছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।";
  }
  return null;
}
