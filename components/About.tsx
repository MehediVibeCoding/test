import AboutClient from "./AboutClient";
import { type Slide } from "./TeacherPhotoSlider";
import { getTeacherPhotos } from "@/lib/academyData";

// প্রথম স্থায়ী ছবি
const PERMANENT_SLIDE: Slide = {
  id: "permanent-1",
  src: "/images/ahsan-about.webp?v=2",
  alt: "Md. Ahsan Ullah — Ahsan's Learning Academy",
};

export default async function About() {
  const extra = await getTeacherPhotos();
  const slides: Slide[] = [
    PERMANENT_SLIDE,
    ...extra.map((p, i) => ({
      id: p.id,
      src: p.imageUrl,
      alt: `Md. Ahsan Ullah — ছবি ${i + 2}`,
      optimize: true,
    })),
  ];

  return <AboutClient slides={slides} />;
}
