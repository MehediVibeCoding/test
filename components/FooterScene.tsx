import type { CSSProperties } from "react";

// ওপরের সেকশনের ব্যাকগ্রাউন্ড ও ফুটারের ব্যাকগ্রাউন্ডের সাথে নিরবচ্ছিন্ন সংযোগ
const TOP_CURVE =
  "M0 58.6C260 90.8 470 71.2 640 50.2C800 30.6 930 41.8 1090 68.4C1210 88 1330 82.4 1440 54.4V110H0Z";

const BOTTOM_CURVE =
  "M0 58C260 104 470 76 640 46C800 18 930 34 1090 72C1210 100 1330 92 1440 52V110H0Z";

const svgUri = (inner: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 110' preserveAspectRatio='none'>${inner}</svg>`
  )}")`;

const TOP_MASK = svgUri(`<path d='${TOP_CURVE}' fill='#000'/>`);
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
      aria-label="Footer Scene"
      className="relative w-full overflow-hidden -mb-[1px] bg-white dark:bg-[#070f1a] transition-colors"
      style={{
        background: `linear-gradient(to bottom, transparent 48%, #0a1f33 50%, #0a1f33 100%)`,
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
            alt="Students learning together outdoors under a tree"
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
