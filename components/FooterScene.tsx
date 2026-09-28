/**
 * ফুটারের ওপরের ছবি-সেকশন: ওপরে সাদা ঢেউ (আগের সেকশনের সাথে মিশে যায়),
 * নিচে গাঢ় নীল ঢেউ (ফুটারের রঙ #0a1f33-এর সাথে মিশে যায়)।
 *
 * ছবি দুটি WebP: মোবাইলের জন্য ডানে-বামে ক্রপ করা (তিনজন শিক্ষার্থী পুরোপুরি ফ্রেমে),
 * ডেস্কটপের জন্য পুরো চওড়া ছবি। width/height দেওয়া আছে, তাই লোডের সময় লেআউট লাফায় না।
 * ফুটার পেজের নিচে থাকে, তাই lazy লোড হয় — শুরুর লোড স্পিডে কোনো প্রভাব নেই।
 */

const ABOVE_COLOR = "#ffffff"; // ওপরের সেকশনের ব্যাকগ্রাউন্ড (ভর্তি ফর্ম = সাদা)
const FOOTER_COLOR = "#0a1f33"; // ফুটারের ব্যাকগ্রাউন্ড (tailwind sky-950)

// একই ঢেউয়ের আকৃতি — নিচেরটা ১৮০° ঘুরিয়ে বসানো হয়, তাই দুটো একটু আলাদা দেখায়
const WAVE_PATH =
  "M0 0H1440V52C1330 92 1210 100 1090 72C930 34 800 18 640 46C470 76 260 104 0 58Z";

export default function FooterScene() {
  return (
    <section
      aria-label="ফুটার ছবি"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: FOOTER_COLOR }}
    >
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="/images/footer-scene-desktop.webp"
          width={1600}
          height={711}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/footer-scene-mobile.webp"
          alt="খোলা সবুজ প্রান্তরে গাছের নিচে বসে বই ও ল্যাপটপ নিয়ে পড়ছে তিনজন শিক্ষার্থী"
          width={960}
          height={750}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full select-none"
          draggable={false}
        />
      </picture>

      {/* ওপরের ঢেউ (সাদা) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 -top-px block w-full"
        style={{ height: "clamp(28px, 5vw, 80px)" }}
      >
        <path d={WAVE_PATH} fill={ABOVE_COLOR} />
      </svg>

      {/* নিচের ঢেউ (ফুটারের রঙ) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 -bottom-px block w-full"
        style={{ height: "clamp(28px, 5vw, 80px)", transform: "rotate(180deg) scaleX(-1)" }}
      >
        <path d={WAVE_PATH} fill={FOOTER_COLOR} />
      </svg>
    </section>
  );
}
