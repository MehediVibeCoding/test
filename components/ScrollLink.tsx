"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface ScrollLinkProps {
  targetId: string; // section id, without '#'
  children: ReactNode;
  className?: string;
  onNavigate?: () => void; // e.g. close mobile menu after click
}

/**
 * নরমাল <a href="#section"> ব্যবহার করলে ব্রাউজার URL-এ #section জুড়ে দেয়।
 * এই কম্পোনেন্ট সেটা এড়িয়ে scrollIntoView দিয়ে smooth scroll করে,
 * URL অপরিবর্তিত থাকে। targetId="top" দিলে পেজের একদম উপরে স্ক্রল করবে।
 */
export default function ScrollLink({
  targetId,
  children,
  className = "",
  onNavigate,
}: ScrollLinkProps) {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    onNavigate?.();

    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <motion.a
      href={`#${targetId === "top" ? "" : targetId}`}
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
