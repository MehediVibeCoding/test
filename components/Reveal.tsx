"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** স্ট্যাগার ডিলে (ms) */
  delay?: number;
  className?: string;
  /** কোন দিক থেকে আসবে: up (ডিফল্ট), left, right, zoom, fade */
  from?: "up" | "left" | "right" | "zoom" | "fade";
};

// পুরো সাইটের জন্য একটাই IntersectionObserver (প্রতিটি Reveal-এ আলাদা নয়) — হালকা
type Callback = () => void;
const callbacks = new WeakMap<Element, Callback>();
let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callbacks.get(entry.target)?.();
            callbacks.delete(entry.target);
            sharedObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
  }
  return sharedObserver;
}

/**
 * স্ক্রল করে দেখা গেলে একবার ফেড + স্লাইড করে ওঠে।
 * `from` দিয়ে দিক বদলানো যায় (globals.css এর .reveal-* ক্লাস)।
 * prefers-reduced-motion এ CSS নিজেই অ্যানিমেশন বন্ধ রাখে।
 */
export default function Reveal({ children, delay = 0, className = "", from = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    callbacks.set(node, () => setVisible(true));
    const io = getObserver();
    io.observe(node);
    return () => {
      callbacks.delete(node);
      io.unobserve(node);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll reveal-${from} ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
