import Reveal from "./Reveal";

// 🔧 demo video slots — once the YouTube channel exists, swap thumbnailUrl/href
// with real embed IDs, e.g. https://www.youtube.com/embed/VIDEO_ID
const VIDEOS = [
  { title: "HSC English Syllabus (HSC-28)", href: "#" },
  { title: "ICT: Logic Gate MCQ Solution", href: "#" },
  { title: "Flow Chart লেখার নিয়ম", href: "#" },
];

export default function VideoGallery() {
  return (
    <section id="videos" className="mx-auto max-w-5xl px-4 py-20">
      <Reveal className="mb-10 text-center">
        <h2 className="font-display text-2xl font-semibold text-sky-950 md:text-3xl">
          সর্বশেষ ভিডিও
        </h2>
        <p className="mx-auto mt-3 max-w-prose text-ink-800">
          YouTube চ্যানেল চালু হলে এখানে সরাসরি সর্বশেষ ভিডিও/রিলস দেখা যাবে।
        </p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {VIDEOS.map((v, i) => (
          <Reveal key={v.title} delay={i * 100}>
            <a
              href={v.href}
              className="glass-panel hover-lift block overflow-hidden p-0 hover:shadow-glass"
            >
              <div className="flex aspect-video items-center justify-center bg-sky-100 text-sky-700">
                ▶ ভিডিও থাম্বনেইল
              </div>
              <p className="p-4 text-sm font-medium text-sky-950">{v.title}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
