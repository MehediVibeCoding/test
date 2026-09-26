"use client";

import { useEffect, useRef, useState } from "react";
import { toBengaliDigits } from "@/lib/bengaliNumerals";

type CountUpProps = {
  /** যে সংখ্যা পর্যন্ত কাউন্ট হয়ে আটকে যাবে (যেমন ৮, ১০০০০, ১০০) */
  end: number;
  /** সংখ্যার আগে বসবে (সচরাচর ফাঁকা) */
  prefix?: string;
  /** সংখ্যার পরে বসবে, যেমন "+", "%" */
  suffix?: string;
  /** ১০,০০০-এর মতো কমা গ্রুপিং দেখাতে চাইলে true */
  grouped?: boolean;
  /** পুরো কাউন্ট-আপ অ্যানিমেশনের সময়কাল (মিলিসেকেন্ড) */
  duration?: number;
  /** ভিউপোর্টে আসার পর কতটা দেরিতে কাউন্ট শুরু হবে */
  delay?: number;
  className?: string;
};

/**
 * সংখ্যাটি স্ক্রলে দৃশ্যমান হওয়া মাত্র ০ থেকে শুরু করে target পর্যন্ত গুণে গুণে
 * আটকে যায় (ease-out কার্ভে, ধীরে ধীরে স্লো ডাউন করে)। bn ফরম্যাটে দেখানো হয়
 * (toBengaliDigits) এবং prefers-reduced-motion থাকলে সরাসরি ফাইনাল ভ্যালু দেখায়।
 */
export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  grouped = false,
  duration = 1600,
  delay = 0,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setValue(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();

          const startTimeout = setTimeout(() => {
            const startTime = performance.now();

            function tick(now: number) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // ease-out-expo — শুরুতে দ্রুত, শেষে আস্তে আস্তে থেমে যায়
              const eased =
                progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              setValue(Math.round(eased * end));

              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setValue(end);
              }
            }

            requestAnimationFrame(tick);
          }, delay);

          // cleanup guard যদি কম্পোনেন্ট আনমাউন্ট হয়ে যায়
          return () => clearTimeout(startTimeout);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {toBengaliDigits(value, { grouped })}
      {suffix}
    </span>
  );
}
