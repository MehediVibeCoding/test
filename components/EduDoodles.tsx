import type { ReactElement } from "react";

/**
 * শিক্ষা-বিষয়ক হালকা SVG আইকন (খাতা, কলম, বই, ইংরেজি Aa, ICT, গ্র্যাজুয়েশন ক্যাপ)।
 * - স্ট্রোক-ভিত্তিক, currentColor → রং আসে parent এর text-* ক্লাস থেকে
 * - কম opacity, pointer-events-none, aria-hidden → মূল কনটেন্টে বাধা দেয় না
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type IconProps = { className?: string };

export const PencilIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} {...stroke} aria-hidden="true">
    <path d="M10 38l2-8L32 10a3 3 0 014.2 0l1.8 1.8a3 3 0 010 4.2L18 36l-8 2z" />
    <path d="M28 14l6 6" />
  </svg>
);

export const NotebookIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} {...stroke} aria-hidden="true">
    <rect x="11" y="6" width="27" height="36" rx="3" />
    <path d="M7 14h8M7 22h8M7 30h8" />
    <path d="M22 16h11M22 23h11M22 30h7" />
  </svg>
);

export const BookIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} {...stroke} aria-hidden="true">
    <path d="M24 12c-4-3-10-4-16-3v27c6-1 12 0 16 3 4-3 10-4 16-3V9c-6-1-12 0-16 3z" />
    <path d="M24 12v27" />
  </svg>
);

export const EnglishIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} {...stroke} aria-hidden="true">
    <path d="M6 36L16 10l10 26" />
    <path d="M10 27h12" />
    <path d="M43 30a6 6 0 11-12 0 6 6 0 0112 0z" />
    <path d="M43 24v12" />
  </svg>
);

export const IctIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} {...stroke} aria-hidden="true">
    <rect x="6" y="8" width="36" height="25" rx="3" />
    <path d="M18 40h12M24 33v7" />
    <path d="M19 16l-5 5 5 5M29 16l5 5-5 5" />
  </svg>
);

export const GradCapIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 48 48" className={className} {...stroke} aria-hidden="true">
    <path d="M4 18L24 8l20 10-20 10L4 18z" />
    <path d="M12 23v9c0 3 6 6 12 6s12-3 12-6v-9" />
    <path d="M44 18v12" />
  </svg>
);

type Spot = {
  Icon: (p: IconProps) => ReactElement;
  className: string;
};

const HERO_SPOTS: Spot[] = [
  { Icon: BookIcon, className: "left-[3%] top-[12%] h-12 w-12 sm:h-14 sm:w-14 -rotate-12" },
  { Icon: PencilIcon, className: "right-[5%] top-[8%] h-10 w-10 sm:h-12 sm:w-12 rotate-[18deg]" },
  { Icon: EnglishIcon, className: "left-[8%] bottom-[18%] h-12 w-12 sm:h-14 sm:w-14 rotate-6 hidden sm:block" },
  { Icon: IctIcon, className: "right-[8%] bottom-[20%] h-14 w-14 sm:h-16 sm:w-16 -rotate-6 hidden sm:block" },
  { Icon: NotebookIcon, className: "left-[45%] top-[5%] h-10 w-10 sm:h-11 sm:w-11 rotate-[10deg] hidden lg:block" },
  { Icon: GradCapIcon, className: "right-[32%] bottom-[8%] h-11 w-11 sm:h-12 sm:w-12 -rotate-[8deg] hidden lg:block" },
];

const SECTION_SPOTS: Spot[] = [
  { Icon: PencilIcon, className: "right-[4%] top-6 h-9 w-9 sm:h-10 sm:w-10 rotate-[14deg]" },
  { Icon: NotebookIcon, className: "left-[3%] bottom-6 h-10 w-10 sm:h-11 sm:w-11 -rotate-6 hidden md:block" },
];

export default function EduDoodles({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "section";
  className?: string;
}) {
  const spots = variant === "hero" ? HERO_SPOTS : SECTION_SPOTS;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 select-none text-sky-600 opacity-[0.09] ${className}`}
    >
      {spots.map(({ Icon, className: pos }, i) => (
        <Icon key={i} className={`absolute ${pos}`} />
      ))}
    </div>
  );
  }
