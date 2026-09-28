import VideoGalleryClient from "./VideoGalleryClient";
import { getVideoLectures } from "@/lib/academyData";

export default async function VideoGallery() {
  const dbVideos = await getVideoLectures();
  // হোমপেজে সর্বদা সর্বশেষ ৩টি ভিডিও
  const videos = dbVideos.slice(0, 3);

  return <VideoGalleryClient videos={videos} />;
}
