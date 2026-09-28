import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * পাবলিক ওয়েবসাইটের জন্য Supabase ক্লায়েন্ট।
 *
 * এই সাইটে কোনো লগইন নেই, তাই কুকি/সেশন লাগে না। কুকি পড়লে Next.js পেজকে
 * "dynamic" বানিয়ে ফেলে (প্রতি ভিজিটে সার্ভারে রেন্ডার, কোনো ক্যাশ নেই)।
 * সাধারণ anon ক্লায়েন্ট ব্যবহার করায় পেজগুলো ISR (revalidate) দিয়ে ক্যাশ হয়।
 * ডেটা সুরক্ষা ডাটাবেজের RLS পলিসি দেখে — anon শুধু পাবলিক ডেটা পড়তে পারে।
 */
let cached: SupabaseClient | null = null;

export function createPublicClient(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL ও NEXT_PUBLIC_SUPABASE_ANON_KEY সেট করা নেই।");
  }

  cached = createSupabaseClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return cached;
}
