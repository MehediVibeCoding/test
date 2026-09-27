import { getFarewellMemories } from "@/lib/academyData";
import FarewellGalleryClient from "./FarewellGalleryClient";

export default async function FarewellGallery() {
  // শুধুমাত্র ডাটাবেজ থেকে আসল বিদায় সংবর্ধনা ও স্মৃতি ছবি ফেচ করা (কোনো ডামি স্টক ছবি ছাড়া)
  const memories = await getFarewellMemories();

  return <FarewellGalleryClient memories={memories} />;
}
