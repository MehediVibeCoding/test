"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ScrollLink from "./ScrollLink";

/**
 * মোবাইলের থাম্ব-জোন কল-টু-অ্যাকশন বার — স্ক্রল করে পেজের মাঝখানে চলে গেলেও
 * যাতে কল করা বা ভর্তি ফরমে যাওয়া এক ট্যাপেই সম্ভব হয়। শুধু মোবাইলে দেখা যায়
 * (md:hidden), হিরো সেকশন পার হওয়ার পরে দেখা দেয় এবং ভর্তি ফরম সেকশনে পৌঁছালে
 * নিজে থেকে লুকিয়ে যায় (যাতে আসল ফরম বাটনের সাথে ওভারল্যাপ না করে)।
 */
export default function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrolledPastHero = window.scrollY > 480;
      const admissionEl = document.getElementById("admission");
      let overAdmission = false;
      if (admissionEl) {
        const rect = admissionEl.getBoundingClientRect();
        overAdmission = rect.top < window.innerHeight * 0.6;
      }
      setVisible(scrolledPastHero && !overAdmission);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-sky-100 bg-white/95 px-3 pt-2 shadow-[0_-4px_16px_rgba(2,132,199,0.12)] backdrop-blur-md md:hidden"
          style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <a
            href="https://wa.me/8801845435539"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white active:scale-[0.98]"
          >
            <span>💬</span>
            <span>WhatsApp / কল করুন</span>
          </a>
          <ScrollLink
            targetId="admission"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-sky-600 py-2.5 text-xs font-bold text-white active:scale-[0.98]"
          >
            <span>📝</span>
            <span>ব্যাচে ভর্তি ফরম</span>
          </ScrollLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
