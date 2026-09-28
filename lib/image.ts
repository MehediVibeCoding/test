/**
 * Cloudinary ছবির URL-এ অটো ফরম্যাট (WebP/AVIF), অটো কোয়ালিটি ও সর্বোচ্চ প্রস্থ যোগ করে।
 * ফোনে ১০ MB-এর ছবির বদলে ৫০-১৫০ KB যায়। অন্য হোস্টের URL অপরিবর্তিত থাকে।
 */
export function optimizeImage(url: string | null | undefined, width = 800): string {
  if (!url) return "";
  const marker = "/image/upload/";
  if (!url.includes("res.cloudinary.com") || !url.includes(marker)) return url;
  const [head, tail] = url.split(marker);
  // আগে থেকেই ট্রান্সফরমেশন থাকলে (যেমন w_400,...) আবার যোগ করা হবে না
  if (/^[a-z]{1,3}_[^/]+\//.test(tail)) return url;
  return `${head}${marker}f_auto,q_auto,w_${width}/${tail}`;
}
