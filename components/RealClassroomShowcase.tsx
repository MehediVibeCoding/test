import Reveal from "./Reveal";
import { getClassroomPhotos } from "@/lib/academyData";

// ডাটাবেজ সাময়িক ফাঁকা থাকলে ডেমো ফলব্যাক
const FALLBACK_MOMENTS = [
  {
    id: "m1",
    caption: "হোয়াইটবোর্ডে লজিক গেইট ও ইংলিশ ড্রাফটিং বোঝাচ্ছেন স্যার",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m2",
    caption: "সাপ্তাহিক বোর্ড স্ট্যান্ডার্ড মডেল টেস্ট দিচ্ছে শিক্ষার্থীরা",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m3",
    caption: "দুর্বল শিক্ষার্থীদের আলাদা ডেকে ডাউট সলভ করছেন স্যার",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m4",
    caption: "ভালো ফলাফলের জন্য পুরস্কার বিতরণী মুহূর্ত",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "m5",
    caption: "ক্লাস শুরুর আগে উপস্থিতি ও সুশৃঙ্খল পরিবেশ",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
  },
];

export default async function RealClassroomShowcase() {
  const dbPhotos = await getClassroomPhotos();
  const photos = dbPhotos.length > 0 ? dbPhotos : FALLBACK_MOMENTS;

  return (
    <section id="campus-life" className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            রিয়েল ক্লাসরুম
          </span>
          <h2 className="mt-3 text-2xl font-bold text-sky-950 sm:text-3xl lg:text-4xl">
            আমাদের ক্লাসরুম ও একাডেমি লাইফ
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs sm:text-sm text-ink-800/80 leading-relaxed">
            কোনো বিজ্ঞাপন নয় — এগুলো আমাদের প্রতিদিনের ক্লাসরুম, পড়াশোনার পরিবেশ এবং
            শিক্ষার্থীদের যত্নের বাস্তব মুহূর্ত।
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[170px]">
          {photos.map((item, i) => {
            const isBig = i === 0;
            return (
              <Reveal
                key={item.id || i}
                delay={i * 70}
                className={isBig ? "sm:col-span-2 sm:row-span-2" : ""}
              >
                <div
                  className={`group relative flex h-full min-h-[160px] flex-col justify-end overflow-hidden rounded-2xl border border-sky-100 bg-sky-950 shadow-sm transition-all hover:border-sky-300 ${
                    isBig ? "aspect-[4/3] sm:aspect-auto" : "aspect-[4/3] sm:aspect-auto"
                  }`}
                >
                  {/* ছবি */}
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={item.caption}
                      className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-sky-100 text-sky-400">
                      📷
                    </div>
                  )}

                  {/* ক্যাপশন ওভারলে */}
                  <div className="relative z-10 bg-gradient-to-t from-sky-950/90 via-sky-950/40 to-transparent p-3.5 sm:p-4">
                    <p className="text-[11.5px] font-bold leading-snug text-white sm:text-xs">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
