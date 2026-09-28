import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AcademyFeatures from "@/components/AcademyFeatures";
import RealClassroomShowcase from "@/components/RealClassroomShowcase";
import Batches from "@/components/Batches";
import FarewellGallery from "@/components/FarewellGallery";
import VideoGallery from "@/components/VideoGallery";
import BlogPreview from "@/components/BlogPreview";
import Testimonials from "@/components/Testimonials";
import SuccessWall from "@/components/SuccessWall";
import CampusLocation from "@/components/CampusLocation";
import FAQ from "@/components/FAQ";
import AdmissionForm from "@/components/AdmissionForm";
import FooterScene from "@/components/FooterScene";
import Footer from "@/components/Footer";
import { getActiveBatches, getClassroomPhotos } from "@/lib/academyData";

// ⚡ ISR: পেজ ক্যাশ হয়ে থাকে, প্রতি ৬০ সেকেন্ডে ব্যাকগ্রাউন্ডে নতুন ডেটা নেয়।
// অ্যাডমিন প্যানেলে কিছু বদলালে সর্বোচ্চ ১ মিনিটের মধ্যে এই সাইটে দেখা যাবে।
export const revalidate = 60;

export default async function Home() {
  // ডাটাবেজ থেকে সক্রিয় ব্যাচসমূহ ফেচ করা
  const [batches, classroomPhotos] = await Promise.all([
    getActiveBatches(),
    getClassroomPhotos(),
  ]);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* ১. শীর্ষ ন্যাভবার */}
      <Navbar />

      {/* ২. হিরো সেকশন */}
      <Hero />

      {/* ৩. শিক্ষক পরিচিতি */}
      <About />

      {/* ৪. কেন আমাদের একাডেমি */}
      <AcademyFeatures />

      {/* ৫. রিয়েল ক্লাসরুম ও একাডেমি লাইফ */}
      <RealClassroomShowcase photos={classroomPhotos} />

      {/* ৬. চলমান ব্যাচসমূহ */}
      <Batches />

      {/* ৭. বিদায় সংবর্ধনা ও স্মৃতি */}
      <FarewellGallery />

      {/* ৯. ভিডিও ক্লাস লেকচার */}
      <VideoGallery />

      {/* ১০. স্টাডি টিপস ও গাইডলাইন ব্লগ */}
      <BlogPreview />

      {/* ১১. শিক্ষার্থী ও অভিভাবকদের মতামত */}
      <Testimonials />

      {/* ১২. সাফল্যের গল্প ও ফলাফল বোর্ড */}
      <SuccessWall />

      {/* ১৩. ক্যাম্পাস ও গুগল ম্যাপ লোকেশন */}
      <CampusLocation />

      {/* ১৪. সাধারণ জিজ্ঞাসা */}
      <FAQ />

      {/* ১৫. ভর্তি আবেদন ফরম */}
      <AdmissionForm batches={batches} />

      {/* ১৬. ফুটারের ওপরের ছবি (ঢেউ ওভারলে সহ) */}
      <FooterScene />

      {/* ১৭. প্রিমিয়াম ফুটার */}
      <Footer />
    </main>
  );
}
