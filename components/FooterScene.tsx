/**
 * ফুটারের ওপরের ছবি-সেকশন।
 *
 * আগে ছবির ওপর আলাদা SVG ওভারলে বসানো ছিল, তাই ছবি ও ঢেউয়ের মাঝে সূক্ষ্ম জোড়া/লাইন দেখা যেত।
 * এখন ঢেউ দুটো ওভারলে নয় — ছবিটাকেই CSS mask দিয়ে ঢেউয়ের আকারে কেটে নেওয়া হয়েছে।
 * ফলে ছবি আর ব্যাকগ্রাউন্ডের মাঝে কোনো আলাদা লেয়ার নেই, জোড়া দেখার সুযোগও নেই।
 *
 * সেকশনের ব্যাকগ্রাউন্ড: ওপরের অর্ধেক সাদা, নিচের অর্ধেক ফুটারের রঙ (#0a1f33)।
 * ছবির ওপরের কাটা অংশে সাদা, নিচের কাটা অংশে গাঢ় নীল দেখা যায়।
 *
 * - ডেস্কটপ (>= 768px): footer-scene-desktop.webp (১৬:৯)
 * - মোবাইল: footer-scene-mobile.webp (পোর্ট্রেট, পুরো ছবি ফ্রেমে)
 */

import type { CSSProperties } from "react";

const ABOVE_COLOR = "#ffffff"; // ওপরের সেকশনের ব্যাকগ্রাউন্ড (ভর্তি ফর্ম = সাদা)
const FOOTER_COLOR = "#0a1f33"; // ফুটারের ব্যাকগ্রাউন্ড (tailwind sky-950)

// ওপরের ঢেউ — আগের তুলনায় গভীরতা (উঁচু-নিচু ধাপ) ~৩০% কমানো হয়েছে, একেবারে সমতল নয়।
// এই আকারে নিচের অংশ = ছবি দেখা যাবে।
const TOP_CURVE =
  "M0 58.6C260 90.8 470 71.2 640 50.2C800 30.6 930 41.8 1090 68.4C1210 88 1330 82.4 1440 54.4V110H0Z";

// নিচের ঢেউ — আগের মতোই অপরিবর্তিত (আগের ঢেউয়ের আকার, উল্টো করে বসানো)।
const BOTTOM_CURVE =
  "M0 58C260 104 470 76 640 46C800 18 930 34 1090 72C1210 100 1330 92 1440 52V110H0Z";

const svgUri = (inner: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 110' preserveAspectRatio='none'>${inner}</svg>`
  )}")`;

const TOP_MASK = svgUri(`<path d='${TOP_CURVE}' fill='#000'/>`);
// নিচেরটা ওপর-নিচ উল্টে (Y-flip) বসানো
const BOTTOM_MASK = svgUri(
  `<path d='${BOTTOM_CURVE}' fill='#000' transform='translate(0 110) scale(1 -1)'/>`
);

const MASK_IMAGE = `${TOP_MASK}, ${BOTTOM_MASK}, linear-gradient(#000, #000)`;
const MASK_SIZE =
  "100% var(--wave-h), 100% var(--wave-h), 100% calc(100% - 2 * var(--wave-h) + 2px)";
const MASK_POSITION = "top, bottom, center";

export default function FooterScene() {
  return (
    <section
      aria-label="ফুটার ছবি"
      className="relative w-full overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${ABOVE_COLOR} 50%, ${FOOTER_COLOR} 50%)`,
      }}
    >
      <div
        className="w-full"
        style={
          {
            "--wave-h": "clamp(28px, 5vw, 80px)",
            WebkitMaskImage: MASK_IMAGE,
            maskImage: MASK_IMAGE,
            WebkitMaskSize: MASK_SIZE,
            maskSize: MASK_SIZE,
            WebkitMaskPosition: MASK_POSITION,
            maskPosition: MASK_POSITION,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          } as CSSProperties
        }
      >
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/images/footer-scene-desktop.webp"
            width={1600}
            height={900}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/footer-scene-mobile.webp"
            alt="খোলা সবুজ প্রান্তরে গাছের নিচে বসে বই নিয়ে পড়ছে তিনজন শিক্ষার্থী — একসাথে শিখি, একসাথে এগিয়ে যাই"
            width={960}
            height={1407}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full select-none"
            draggable={false}
          />
        </picture>
      </div>
    </section>
  );
}
