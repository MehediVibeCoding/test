import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AcademyFeatures from "@/components/AcademyFeatures";
import Batches from "@/components/Batches";
import ClassDiary from "@/components/ClassDiary";
import VideoGallery from "@/components/VideoGallery";
import BlogPreview from "@/components/BlogPreview";
import Testimonials from "@/components/Testimonials";
import CampusLocation from "@/components/CampusLocation";
import AdmissionForm from "@/components/AdmissionForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ১. শীর্ষ ন্যাভবার (উপরে কোনো সাদা প্যাচ ছাড়া, মোবাইলে টেক্সট ও ৩-ডট মেনুসহ) */}
      <Navbar />

      {/* ২. হিরো সেকশন (স্লোগান, Founder & CEO ডেজিগনেশন, সাধারণ বাটন ও অতিরিক্ত ফাঁকা অংশ ছাড়া) */}
      <Hero />

      {/* ৩. শিক্ষক পরিচিতি ও দর্শন (৪০তম বিসিএস, চবি, চৌদ্দগ্রাম কলেজের আধুনিক ইনফো কার্ড) */}
      <About />

      {/* ৪. কেন আমাদের একাডেমি (দুর্বলদের কেয়ার, সাপ্তাহিক মডেল টেস্ট, বিসিএস শিক্ষকের তত্ত্বাবধান) */}
      <AcademyFeatures />

      {/* ৫. চলমান ব্যাচসমূহ (HSC 27 ও HSC 28 মিলিয়ে মোট ৬টি ব্যাচ ও সাধারণ সফট শ্যাডো) */}
      <Batches />

      {/* ৬. আজকের ক্লাস ডায়েরি ও বাড়ির কাজ */}
      <ClassDiary />

      {/* ৭. ভিডিও ক্লাস লেকচার */}
      <VideoGallery />

      {/* ৮. স্টাডি টিপস ও গাইডলাইন ব্লগ */}
      <BlogPreview />

      {/* ৯. শিক্ষার্থী ও অভিভাবকদের মতামত (টেস্টিমোনিয়াল) */}
      <Testimonials />

      {/* ১০. ক্যাম্পাস ও গুগল ম্যাপ লোকেশন (ইন্টারেক্টিভ ম্যাপ ও দিকনির্দেশনা) */}
      <CampusLocation />

      {/* ১১. ভর্তি আবেদন ফরম (কলেজ রোল, গ্রুপ/বিভাগ, অভিভাবকের নম্বর ও কম্বাইন্ড ব্যাচ) */}
      <AdmissionForm />

      {/* ১২. প্রিমিয়াম ফুটার (ডার্ক/লাইট মোড ও বাংলা/ইংরেজি ভাষা অপশনসহ) */}
      <Footer />
    </main>
  );
}
