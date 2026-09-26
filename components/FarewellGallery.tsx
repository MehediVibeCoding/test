import { getFarewellMemories } from "@/lib/academyData";
import FarewellGalleryClient from "./FarewellGalleryClient";

// ডাটাবেজ সাময়িক ফাঁকা থাকলে ডেমো ফলব্যাক
const FALLBACK_MEMORIES = [
  {
    id: "fm1",
    batch: "HSC 2025 বিদায় সংবর্ধনা",
    caption: "বিদায়ের ক্ষণে ভালোবাসার উপহার",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fm2",
    batch: "HSC 2025 বিদায় সংবর্ধনা",
    caption: "বোর্ড পরীক্ষার আগের শেষ মোটিভেশন ক্লাস",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fm3",
    batch: "HSC 2025 বিদায় সংবর্ধনা",
    caption: "একসাথে শেষ গ্রুপ ছবি",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fm4",
    batch: "HSC 2026 বিদায় উৎসব",
    caption: "ফুল দিয়ে বরণ, চোখে জমে থাকা কৃতজ্ঞতা",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fm5",
    batch: "HSC 2026 বিদায় উৎসব",
    caption: "সিনিয়রদের হাতে স্মৃতি উপহার",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fm6",
    batch: "ক্লাসরুম মোমেন্টস",
    caption: "পরীক্ষার ফল প্রকাশের আনন্দঘন মুহূর্ত",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fm7",
    batch: "ক্লাসরুম মোমেন্টস",
    caption: "গ্রুপ স্টাডি ও আড্ডার ফাঁকে",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "fm8",
    batch: "HSC 2026 বিদায় উৎসব",
    caption: "শিক্ষক-শিক্ষার্থীর আন্তরিক বন্ধন",
    imageUrl: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80",
  },
];

export default async function FarewellGallery() {
  const dbMemories = await getFarewellMemories();
  const memories = dbMemories.length > 0 ? dbMemories : FALLBACK_MEMORIES;

  return <FarewellGalleryClient memories={memories} />;
}
