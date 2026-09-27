import { getTestimonials } from "@/lib/academyData";
import TestimonialsClient from "./TestimonialsClient";

// ⚠️ গুরুত্বপূর্ণ: এগুলো ডেমো রিভিউ — শুধু ডাটাবেজ খালি থাকা অবস্থায় দেখানো হয়।
// লঞ্চের আগে আসল শিক্ষার্থী/অভিভাবকের রিভিউ testimonials টেবিলে যোগ করে নিতে হবে।
const FALLBACK_FEATURED = [
  {
    id: "t1",
    name: "Shi Hab",
    role: "শিক্ষার্থী, HSC 27",
    type: "শিক্ষার্থী" as const,
    year: "HSC 2027",
    quote: "স্যারের ক্লাসের পর ICT-তে আমার ভয় পুরোপুরি কেটে গেছে। খুব সহজভাবে বুঝিয়ে দেন।",
    isFeatured: true,
  },
  {
    id: "t2",
    name: "Nasimul Kawsar",
    role: "অভিভাবক",
    type: "অভিভাবক" as const,
    year: "অভিভাবক",
    quote: "আমার ছেলের English-এ যথেষ্ট উন্নতি হয়েছে স্যারের গাইডলাইনে।",
    isFeatured: true,
  },
  {
    id: "t3",
    name: "Arafatul Islam Ovi",
    role: "শিক্ষার্থী, HSC 28",
    type: "শিক্ষার্থী" as const,
    year: "HSC 2028",
    quote: "ক্লাস ডায়েরি ফিচারটা দারুণ কাজে দেয় — মিস করা ক্লাসের নোট সহজেই পাই।",
    isFeatured: true,
  },
];

export default async function Testimonials() {
  const { featured: dbFeatured } = await getTestimonials();
  const featured = dbFeatured.length > 0 ? dbFeatured : FALLBACK_FEATURED;

  return <TestimonialsClient featured={featured} />;
}
