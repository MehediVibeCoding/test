import { getTestimonials } from "@/lib/academyData";
import TestimonialsClient from "./TestimonialsClient";

export default async function Testimonials() {
  // ডাটাবেজ থেকে শুধুমাত্র অনুমোদিত আসল রিভিউ ফেচ করা (কোনো ফেক ডামি ডাটা ছাড়া)
  const { featured } = await getTestimonials();

  return <TestimonialsClient featured={featured} />;
}
