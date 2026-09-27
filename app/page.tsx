import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AcademyFeatures from "@/components/AcademyFeatures";
import RealClassroomShowcase from "@/components/RealClassroomShowcase";
import Batches from "@/components/Batches";
import FarewellGallery from "@/components/FarewellGallery";
import ClassDiary from "@/components/ClassDiary";
import VideoGallery from "@/components/VideoGallery";
import BlogPreview from "@/components/BlogPreview";
import Testimonials from "@/components/Testimonials";
import SuccessWall from "@/components/SuccessWall";
import CampusLocation from "@/components/CampusLocation";
import FAQ from "@/components/FAQ";
import AdmissionForm from "@/components/AdmissionForm";
import Footer from "@/components/Footer";
import { getActiveBatches } from "@/lib/academyData";

export const dynamic = "force-dynamic";

export default async function Home() {
  const batches = await getActiveBatches();

  return (
    <main className="min-h-screen">
      {/* ১. শীর্ষ ন্যাভবার */}
      <Navbar />

      {/* ২. হিরো সেকশন */}
      <Hero />

      {/* ৩. শিক্ষক পরিচিতি */}
      <About />

      {/* ৪. কেন আমাদের একাডেমি */}
      <AcademyFeatures />

      {/* ৫. রিয়েল ক্লাসরুম ও একাডেমি লাইফ */}
      <RealClassroomShowcase />

      {/* ৬. চলমান ব্যাচসমূহ */}
      <Batches />

      {/* ৭. বিদায় সংবর্ধনা ও স্মৃতি */}
      <FarewellGallery />

      {/* ৮. আজকের ক্লাস ডায়েরি ও বাড়ির কাজ */}
      <ClassDiary />

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

      {/* ১৬. প্রিমিয়াম ফুটার */}
      <Footer />
    </main>
  );
}
