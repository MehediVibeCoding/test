import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Batches from "@/components/Batches";
import ClassDiary from "@/components/ClassDiary";
import AdmissionForm from "@/components/AdmissionForm";
import BlogPreview from "@/components/BlogPreview";
import Testimonials from "@/components/Testimonials";
import VideoGallery from "@/components/VideoGallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Batches />
      <ClassDiary />
      <VideoGallery />
      <BlogPreview />
      <Testimonials />
      <AdmissionForm />
      <Footer />
    </main>
  );
}
