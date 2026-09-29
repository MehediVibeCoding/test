"use client";

import { useEffect, useRef } from "react";
import { toBengaliDigits } from "@/lib/bengaliNumerals";

type CountUpProps = {
  /** যে সংখ্যা পর্যন্ত কাউন্ট হয়ে আটকে যাবে (যেমন ৮, ১০০০০, ১০০) */
  end: number;
  prefix?: string;
  suffix?: string;
  /** ১০,০০০-এর মতো কমা গ্রুপিং */
  grouped?: boolean;
  /** true হলে বাংলা অঙ্কে, false হলে ইংরেজি অঙ্কে দেখাবে */
  bn?: boolean;
  /** পুরো কাউন্ট-আপের সময় (ms) — একই সেকশনের সব কাউন্টারে একই মান দিলে একসাথে শেষ হবে */
  duration?: number;
  /** ভিউপোর্টে আসার পর কতক্ষণ পরে শুরু হবে (ms) */
  delay?: number;
  className?: string;
};

// প্রায়-লিনিয়ার ease-out: ছোট সংখ্যা (৮) আর বড় সংখ্যা (১০০০০) প্রায় একই মুহূর্তে থামে
const ease = (p: number) => 1 - Math.pow(1 - p, 1.3);

/**
 * স্ক্রিনে দেখা গেলে ০ থেকে গুনে শুরু হয়, সব কাউন্টার একসাথে শেষ হয়।
 * স্ক্রিন থেকে বেরিয়ে আবার ঢুকলে নতুন করে গোনে। প্রতি ফ্রেমে React রি-রেন্ডার নেই,
 * সরাসরি টেক্সট আপডেট হয় (হালকা)। prefers-reduced-motion থাকলে সরাসরি চূড়ান্ত মান।
 */
export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  grouped = false,
  bn = true,
  duration = 2400,
  delay = 900,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const fmt = (v: number) =>
      `${prefix}${
        bn
          ? toBengaliDigits(v, { grouped })
          : grouped
            ? Math.round(v).toLocaleString("en-US")
            : String(Math.round(v))
      }${suffix}`;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.textContent = fmt(end);
      return;
    }

    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const stop = () => {
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
    };

    const run = () => {
      stop();
      node.textContent = fmt(0);
      timer = setTimeout(() => {
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          node.textContent = fmt(p >= 1 ? end : ease(p) * end);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }, delay);
    };

    node.textContent = fmt(0);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
        else {
          stop();
          node.textContent = fmt(0);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(node);

    return () => {
      io.disconnect();
      stop();
    };
  }, [end, prefix, suffix, grouped, bn, duration, delay]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {bn ? toBengaliDigits(end, { grouped }) : grouped ? end.toLocaleString("en-US") : end}
      {suffix}
    </span>
  );
}
