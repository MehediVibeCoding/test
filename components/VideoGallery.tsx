import Reveal from "./Reveal";
import { getVideoLectures } from "@/lib/academyData";

// ডাটাবেজ সাময়িক ফাঁকা থাকলে ডেমো ফলব্যাক
const FALLBACK_VIDEOS = [
  {
    id: "v1",
    title: "HSC English 1st Paper সম্পূর্ণ সিলেবাস ও প্রস্তুতি (HSC-28)",
    href: "https://www.youtube.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "v2",
    title: "ICT: Logic Gate MCQ সমাধান করার সহজ ও ম্যাজিক টেকনিক",
    href: "https://www.youtube.com",
    thumbnailUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "v3",
    title: "Flow Chart লেখার নিয়ম ও সম্পূর্ণ ৫ নম্বর নিশ্চিত করার কৌশল",
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
    <section id="videos" className="relative px-6 py-20 sm:px-8 sm:py-28 lg:px-12 bg-gradient-to-b from-white via-sky-50/40 to-white">
      <div className="mx-auto max-w-7xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-12 text-center sm:mb-16">
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
            ভিডিও ক্লাস লেকচার
          </span>
          <h2 className="mt-3.5 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[40px]">
            সর্বশেষ ভিডিও লেকচার
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-[15px] leading-[1.8] text-ink-800/80 sm:text-base">
            ইংরেজি ও আইসিটির গুরুত্বপূর্ণ টপিকের সহজ ব্যাখ্যা ও বোর্ড প্রশ্ন সমাধানের ভিডিও ক্লাসসমূহ।
          </p>
        </Reveal>

        {/* প্রিমিয়াম ভিডিও কার্ড গ্রিড (কোনো অপ্রয়োজনীয় এক্সট্রা টেক্সট ছাড়া) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => {
            const ytId = parseYouTubeId(v.href);
            const thumbSrc =
              v.thumbnailUrl ||
              (ytId
                ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80");

            return (
              <Reveal key={v.id || i} delay={i * 70}>
                <a
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full overflow-hidden rounded-3xl border border-sky-100 bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5"
                >
                  {/* থাম্বনেইল ফ্রেম ও প্লে-বাটন */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-sky-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbSrc}
                      alt={v.title}
                      className="h-full w-full object-cover opacity-95 transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* প্লে বাটন ওভারলে */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/15">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                        <svg className="ml-0.5 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* ভিডিওর মূল শিরোনাম */}
                  <div className="p-3 sm:p-4">
                    <h3 className="font-body text-base sm:text-[16.5px] font-bold leading-snug text-sky-950 transition-colors group-hover:text-sky-700 line-clamp-2">
                      {v.title}
                    </h3>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
