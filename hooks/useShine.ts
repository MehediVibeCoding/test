"use client";

import { useEffect, useRef, useState } from "react";

/**
 * বাটন শাইন (ঝিলিক) অ্যানিমেশন কন্ট্রোলার হুক।
 * - `enabled`: false হলে (যেমন: disabled, ফর্ম অসম্পূর্ণ বা ২ ঘণ্টার লক থাকলে) শাইন চলবে না।
 * - `threshold`: বাটনটি স্ক্রিনে ৬০% বা তার বেশি দৃশ্যমান হলেই কেবল অ্যানিমেশন ট্রিগার হবে।
 * - স্ক্রল করে বাটন চোখ থেকে আড়াল হলে স্বয়ংক্রিয়ভাবে অ্যানিমেশন বন্ধ হয়ে মেমরি সেভ হবে।
 */
export function useShine<T extends HTMLElement = HTMLButtonElement>(
  enabled = true,
  threshold = 0.6
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const shineClass = enabled && inView ? "btn-shine is-shining" : "btn-shine";

  return { ref, shineClass };
}
