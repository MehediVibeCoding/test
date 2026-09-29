"use client";

import * as m from "motion/react-m";
import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import { optimizeImage } from "@/lib/image";
import { useApp } from "@/context/AppContext";
import type { VideoLecture } from "@/lib/academyData";

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

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const videoCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function VideoGalleryClient({ videos }: { videos: VideoLecture[] }) {
  const { t } = useApp();

  return (
    <section
      id="videos"
      className="relative px-4 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-gradient-to-b from-white via-sky-50/40 to-white dark:from-[#070f1a] dark:via-[#091b2e] dark:to-[#070f1a] overflow-hidden transition-colors"
    >
      {/* ব্যাকগ্রাউন্ড এডুকেশন অ্যাকসেন্ট ডুডলস */}
      <EduDoodles variant="section" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-8 text-center sm:mb-12">
          <span className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900/60 px-4 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
            {t.videos.tag}
          </span>
          <h2 className="mt-2.5 font-body text-2xl font-black tracking-tight text-sky-950 dark:text-white sm:text-4xl lg:text-[38px]">
            {t.videos.title}
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 dark:text-slate-300 sm:text-[15px]">
            {t.videos.subtitle}
          </p>
        </Reveal>

        {/* সিনেমাটিক ভিডিও কার্ড গ্রিড */}
        {videos.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-sky-50/40 dark:bg-slate-900/60 p-8 text-center">
            <p className="font-body text-base font-bold text-sky-950 dark:text-white">{t.videos.emptyText}</p>
            <p className="mt-1 font-body text-xs text-ink-800/70 dark:text-slate-400">{t.videos.emptySubtext}</p>
          </div>
        ) : (
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {videos.map((v, i) => {
              const ytId = parseYouTubeId(v.href);
              const isFb = isFacebookUrl(v.href);

              const thumbSrc =
                v.thumbnailUrl ||
                (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

              return (
                <m.div key={v.id || i} variants={videoCardVariants}>
                  <a
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full overflow-hidden rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/80 p-3.5 sm:p-4 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-xl hover:shadow-sky-950/5"
                  >
                    {/* সিনেমাটিক থাম্বনেইল ফ্রেম */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-sky-950 border border-sky-900/40 flex items-center justify-center">
                      {thumbSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={optimizeImage(thumbSrc, 600)}
                          loading="lazy"
                          decoding="async"
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
                      <span className="absolute top-2.5 left-2.5 rounded-md bg-black/65 px-2.5 py-0.5 font-body text-[10px] font-bold text-white backdrop-blur-sm">
                        {isFb ? "Facebook" : "YouTube"}
                      </span>

                      {/* প্লে বাটন পালস ওভারলে */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-sky-500/40 ${
                            isFb ? "bg-blue-600" : "bg-red-600"
                          }`}
                        >
                          <svg className="ml-0.5 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* শিরোনাম */}
                    <div className="p-3 sm:p-4">
                      <h3 className="font-body text-base sm:text-[16.5px] font-bold leading-snug text-sky-950 dark:text-white transition-colors group-hover:text-sky-600 dark:group-hover:text-sky-400 line-clamp-2">
                        {v.title}
                      </h3>
                    </div>
                  </a>
                </m.div>
              );
            })}
          </m.div>
        )}
      </div>
    </section>
  );
        }
