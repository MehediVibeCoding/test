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
import StickyMobileBar from "@/components/StickyMobileBar";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ১. শীর্ষ ন্যাভবার (উপরে কোনো সাদা প্যাচ ছাড়া, মোবাইলে টেক্সট ও ৩-ডট মেনুসহ) */}
      <Navbar />

      {/* ২. হিরো সেকশন — মোবাইলে ছবি আগে নিচ থেকে স্লাইড-আপ, এরপর টেক্সট রিভিল +
          কাউন্ট-আপ স্ট্যাটাস (৮+ বছর / ১০,০০০+ / ১০০%) */}
      <Hero />

      {/* ৩. শিক্ষক পরিচিতি ও দর্শন (৪০তম বিসিএস, চবি, চৌদ্দগ্রাম কলেজের আধুনিক ইনফো কার্ড) */}
      <About />

      {/* ৪. কেন আমাদের একাডেমি (দুর্বলদের কেয়ার, সাপ্তাহিক মডেল টেস্ট, বিসিএস শিক্ষকের তত্ত্বাবধান) */}
      <AcademyFeatures />

      {/* ৪.৫ রিয়েল ক্লাসরুম ও একাডেমি লাইফ — বাস্তব ছবির জন্য জায়গা রাখা বেন্টো গ্রিড (NEW) */}
      <RealClassroomShowcase />

      {/* ৫. চলমান ব্যাচসমূহ (HSC 27 ও HSC 28 মিলিয়ে মোট ৬টি ব্যাচ ও সাধারণ সফট শ্যাডো) */}
      <Batches />

      {/* ৫.৫ বিদায় সংবর্ধনা ও স্মৃতি — ব্যাচ ফিল্টার + লাইটবক্স গ্যালারি (NEW) */}
      <FarewellGallery />

      {/* ৬. আজকের ক্লাস ডায়েরি ও বাড়ির কাজ */}
      <ClassDiary />

      {/* ৭. ভিডিও ক্লাস লেকচার */}
      <VideoGallery />

      {/* ৮. স্টাডি টিপস ও গাইডলাইন ব্লগ */}
      <BlogPreview />

      {/* ৯. শিক্ষার্থী ও অভিভাবকদের মতামত (টেস্টিমোনিয়াল + নিচে টেক্সট রিভিউ-ওয়াল) */}
      <Testimonials />

      {/* ৯.৫ সাফল্যের গল্প ও ফলাফল বোর্ড — কৃতি শিক্ষার্থী দেয়াল (NEW) */}
      <SuccessWall />

      {/* ১০. ক্যাম্পাস ও গুগল ম্যাপ লোকেশন (ইন্টারেক্টিভ ম্যাপ ও দিকনির্দেশনা) */}
      <CampusLocation />

      {/* ১০.৫ সাধারণ জিজ্ঞাসা — ভর্তি ফরমের ঠিক উপরে অ্যাকর্ডিয়ন (NEW) */}
      <FAQ />

      {/* ১১. ভর্তি আবেদন ফরম (কলেজ রোল, গ্রুপ/বিভাগ, অভিভাবকের নম্বর ও কম্বাইন্ড ব্যাচ) */}
      <AdmissionForm />

      {/* ১২. প্রিমিয়াম ফুটার (ডার্ক/লাইট মোড ও বাংলা/ইংরেজি ভাষা অপশনসহ) */}
      <Footer />

      {/* মোবাইলের জন্য স্টিকি বটম কুইক-অ্যাকশন বার — WhatsApp/কল ও ভর্তি ফরম শর্টকাট (NEW) */}
      <StickyMobileBar />
    </main>
  );
}
