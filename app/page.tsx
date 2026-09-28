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

export const revalidate = 60;

export default async function Home() {
  const [batches, classroomPhotos] = await Promise.all([
    getActiveBatches(),
    getClassroomPhotos(),
  ]);

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#070f1a] transition-colors">
      <Navbar />
      <Hero />
      <About />
      <AcademyFeatures />
      <RealClassroomShowcase photos={classroomPhotos} />
      <Batches />
      <FarewellGallery />
      <VideoGallery />
      <BlogPreview />
      <Testimonials />
      <SuccessWall />
      <CampusLocation />
      <FAQ />
      <AdmissionForm batches={batches} />
      <FooterScene />
      <Footer />
    </main>
  );
}
