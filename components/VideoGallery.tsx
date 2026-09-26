import Reveal from "./Reveal";
import { getVideoLectures } from "@/lib/academyData";

// ডাটাবেজ সাময়িক ফাঁকা থাকলে ডেমো ফলব্যাক
const FALLBACK_VIDEOS = [
  {
    id: "v1",
    title: "HSC English 1st Paper সম্পূর্ণ সিলেবাস (HSC-28)",
    href: "https://www.youtube.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "v2",
    title: "ICT: Logic Gate MCQ সমাধান করার ম্যাজিক ট্রিকস",
    href: "https://www.youtube.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "v3",
    title: "Flow Chart লেখার নিয়ম ও সম্পূর্ণ ৫ নম্বর পাওয়ার কৌশল",
    href: "https://www.youtube.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
  },
];

function parseYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default async function VideoGallery() {
  const dbVideos = await getVideoLectures();
  const videos = dbVideos.length > 0 ? dbVideos : FALLBACK_VIDEOS;

  return (
    <section id="videos" className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
      <Reveal className="mb-10 text-center">
        <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
          ভিডিও ক্লাস
        </span>
        <h2 className="mt-3 text-2xl font-bold text-sky-950 sm:text-3xl lg:text-4xl">
          সর্বশেষ ভিডিও লেকচার
        </h2>
        <p className="mx-auto mt-3 max-w-prose text-xs sm:text-sm text-ink-800/80 leading-relaxed">
          ইংরেজি ও আইসিটির গুরুত্বপূর্ণ টপিকের সহজ ব্যাখ্যা ও মডেল টেস্ট সমাধানের ভিডিও ক্লাস।
        </p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {videos.map((v, i) => {
          const ytId = parseYouTubeId(v.href);
          const thumbSrc =
            v.thumbnailUrl ||
            (ytId
              ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
              : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80");

          return (
            <Reveal key={v.id || i} delay={i * 80}>
              <a
                href={v.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift group block h-full overflow-hidden rounded-2xl border border-sky-100 bg-white p-0 shadow-sm transition-all hover:border-sky-300 hover:shadow-md"
              >
                {/* ভিডিও থাম্বনেইল ফ্রেম */}
                <div className="relative aspect-video w-full overflow-hidden bg-sky-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbSrc}
                    alt={v.title}
                    className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  {/* প্লে বাটন ওভারলে */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* ভিডিওর শিরোনাম */}
                <div className="p-4">
                  <h3 className="font-body text-sm font-bold text-sky-950 line-clamp-2 leading-snug group-hover:text-sky-700 transition-colors">
                    {v.title}
                  </h3>
                  <span className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-sky-600">
                    <span>ভিডিওটি দেখুন</span>
                    <span>→</span>
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
