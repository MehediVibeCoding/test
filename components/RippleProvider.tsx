"use client";

import { useEffect } from "react";

/**
 * .btn-gradient বাটনে চাপ দিলে ক্লিকের জায়গা থেকে ঢেউ ছড়ায়।
 * পুরো সাইটে একটাই লিসেনার — প্রতি বাটনে আলাদা কোড নেই (হালকা)।
 */
export default function RippleProvider() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onDown = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(".btn-gradient");
      if (!el || (el as HTMLButtonElement).disabled || el.getAttribute("aria-disabled") === "true") return;

      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const dot = document.createElement("span");
      dot.className = "btn-ripple-dot";
      dot.style.width = dot.style.height = `${size}px`;
      dot.style.left = `${e.clientX - rect.left - size / 2}px`;
      dot.style.top = `${e.clientY - rect.top - size / 2}px`;
      el.appendChild(dot);
      dot.addEventListener("animationend", () => dot.remove(), { once: true });
    };

    document.addEventListener("pointerdown", onDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  return null;
}
