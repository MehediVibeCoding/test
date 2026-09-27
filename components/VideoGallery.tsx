import Reveal from "./Reveal";
import { getVideoLectures } from "@/lib/academyData";

function parseYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function isFacebookUrl(url: string): boolean {
  if (!url) return false;
  return url.includes("facebook.com") || url.includes("fb.watch");
}

export default async function VideoGallery() {
  const dbVideos = await getVideoLectures();
  // হোমপেজে সর্বদা নিশ্চিতভাবে সর্বশেষ ৩টি ভিডিও
  const videos = dbVideos.slice(0, 3);

  return (
    <section id="videos" className="relative px-4 py-6 sm:px-8 sm:py-10 lg:py-12 lg:px-12 bg-gradient-to-b from-white via-sky-50/40 to-white">
      <div className="mx-auto max-w-7xl">
        {/* সেকশন হেডার (টাইট কমপ্যাক্ট স্পেসিং সহ) */}
        <Reveal className="mb-6 text-center sm:mb-8">
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
            ভিডিও ক্লাস লেকচার
          </span>
          <h2 className="mt-2.5 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[38px]">
            সর্বশেষ ভিডিও লেকচার
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 sm:text-[15px]">
            ইংরেজি ও আইসিটির গুরুত্বপূর্ণ টপিকের সহজ ব্যাখ্যা ও বোর্ড প্রশ্ন সমাধানের ভিডিও ক্লাসসমূহ।
          </p>
        </Reveal>

        {/* ৩টি ভিডিও কার্ড গ্রিড (কোনো ডামি বইয়ের ছবি ছাড়া আসল থাম্বনেইল ভিউ) */}
        {videos.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-sky-100 bg-sky-50/40 p-8 text-center">
            <p className="font-body text-base font-bold text-sky-950">শীঘ্রই নতুন ভিডিও লেকচার যুক্ত হবে</p>
            <p className="mt-1 font-body text-xs text-ink-800/70">ইউটিউব ও ফেসবুকে আমাদের ভিডিও ক্লাসগুলো দেখতে থাকুন।</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => {
              const ytId = parseYouTubeId(v.href);
              const isFb = isFacebookUrl(v.href);

              // আসল থাম্বনেইল নির্ণয় (ডাটাবেজের নিজস্ব আসল থাম্বনেইল অথবা লাইভ ইউটিউব কাভার)
              const thumbSrc =
                v.thumbnailUrl ||
                (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

              return (
                <Reveal key={v.id || i} delay={i * 70}>
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full overflow-hidden rounded-3xl border border-sky-100 bg-white p-3.5 sm:p-4 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5"
                  >
                    {/* থাম্বনেইল ফ্রেম ও প্ল্যাটফর্ম ব্যাজ */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-sky-950 border border-sky-900/40 flex items-center justify-center">
                      {thumbSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumbSrc}
                          alt={v.title}
                          className="h-full w-full object-cover opacity-95 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <span className="text-3xl">{isFb ? "📘" : "🎬"}</span>
                          <p className="mt-1 font-body text-xs font-bold text-sky-200">
                            {isFb ? "Facebook Video" : "Video Lecture"}
                          </p>
                        </div>
                      )}

                      {/* প্ল্যাটফর্ম ব্যাজ */}
                      <span className="absolute top-2 left-2 rounded-md bg-black/60 px-2 py-0.5 font-body text-[10px] font-bold text-white backdrop-blur-sm">
                        {isFb ? "Facebook" : "YouTube"}
                      </span>

                      {/* প্লে বাটন ওভারলে */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transition-transform duration-300 group-hover:scale-110 ${
                            isFb ? "bg-blue-600" : "bg-red-600"
                          }`}
                        >
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
        )}
      </div>
    </section>
  );
}
