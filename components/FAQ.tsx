"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "সিলেবাস কত মাসে সম্পূর্ণ শেষ করানো হয়?",
    a: "প্রতিটি ব্যাচের সময়সূচী ও রুটিন অনুযায়ী পুরো বোর্ড সিলেবাস পরিকল্পিতভাবে শেষ করানো হয়, যাতে ফাইনাল পরীক্ষার আগে পর্যাপ্ত সময় রিভিশন ও মডেল টেস্টের জন্য থাকে।",
  },
  {
    q: "কোনো কারণে কলেজ বা অসুস্থতার জন্য ক্লাস মিস গেলে ব্যাকআপ কীভাবে দেওয়া হয়?",
    a: "মিস হওয়া ক্লাসের বিস্তারিত নোট, প্রেজেন্টেশন ও হোমওয়ার্ক ডিজিটাল ক্লাস ডায়েরিতে পাওয়া যায়। এছাড়াও কোনো বিষয় বুঝতে সমস্যা হলে পরবর্তী ক্লাসে আলাদাভাবে বুঝিয়ে দেওয়া হয়।",
  },
  {
    q: "ইংরেজি ও আইসিটির জন্য আলাদা ব্যাচ নেওয়ার সুযোগ আছে কি?",
    a: "হ্যাঁ, ইংরেজি ও আইসিটি সম্পূর্ণ আলাদাভাবে অথবা কম্বাইন্ড ব্যাচ হিসেবেও নেওয়া যায়—নিচের ভর্তি ফরমে পছন্দমতো ব্যাচ বেছে নেওয়ার সুযোগ রয়েছে।",
  },
  {
    q: "ক্লাস টেস্টের ফলাফল অভিভাবকদের কীভাবে জানানো হয়?",
    a: "প্রতিটি সাপ্তাহিক মডেল টেস্টের পর শিক্ষার্থীর উপস্থিতি ও পরীক্ষার মার্কস সরাসরি অভিভাবকদের জানানো হয়, যাতে বাসায়ও নিয়মিত পড়াশোনার তদারকি নিশ্চিত থাকে।",
  },
  {
    q: "ভর্তি হতে হলে প্রথমে কী করতে হবে?",
    a: "নিচের ভর্তি ফরমে প্রয়োজনীয় তথ্য দিয়ে আবেদন করলেই একাডেমি থেকে দ্রুত যোগাযোগ করে ব্যাচ ও ক্লাসের চূড়ান্ত সময় নিশ্চিত করা হবে।",
  },
  {
    q: "HSC ছাড়া অ্যাডমিশন বা জবের জন্য ইংরেজি শেখার সুযোগ আছে কি?",
    a: "আমাদের নিয়মিত ব্যাচ মূলত HSC শিক্ষার্থীদের জন্য। তবে ভার্সিটি অ্যাডমিশন বা চাকরির প্রস্তুতির জন্য বিশেষ গাইডলাইন চাইলে সরাসরি যোগাযোগ করে আলোচনা করা যাবে।",
  },
];

export default function FAQ() {
  // ডিফল্টভাবে সব প্রশ্ন বন্ধ থাকবে
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative px-4 py-10 sm:px-8 sm:py-14 lg:py-16 lg:px-12 bg-white">
      <div className="mx-auto max-w-4xl">
        {/* সেকশন হেডার (টাইট স্পেসিং সহ) */}
        <Reveal className="mb-6 text-center sm:mb-10">
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
            সাধারণ জিজ্ঞাসা
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[38px]">
            ভর্তির আগে যা জানা দরকার
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 sm:text-[15px]">
            ভর্তি সংক্রান্ত কোনো দ্বিধা থাকলে নিচে সচরাচর জিজ্ঞাসিত প্রশ্নগুলোর উত্তর দেখে নাও।
          </p>
        </Reveal>

        {/* প্রিমিয়াম অ্যাকর্ডিয়ন তালিকা (টাইট স্পেসিং সহ) */}
        <Reveal delay={80} className="space-y-3 sm:space-y-3.5">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-xs transition-all duration-300 hover:border-sky-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
                >
                  <span className="font-body text-sm sm:text-base font-bold text-sky-950 leading-snug">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 font-body text-base font-bold text-sky-700"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-sky-100/70 px-4 pt-3.5 pb-4 sm:px-5 sm:pb-5 font-body text-xs sm:text-sm leading-[1.8] text-ink-800/85">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
