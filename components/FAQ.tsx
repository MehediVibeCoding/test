"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "সিলেবাস কত মাসে সম্পূর্ণ শেষ করানো হয়?",
    a: "প্রতিটি ব্যাচের রুটিন অনুযায়ী পুরো বোর্ড সিলেবাস পরিকল্পিতভাবে শেষ করানো হয়, যাতে পরীক্ষার আগে পর্যাপ্ত সময় রিভিশন ও মডেল টেস্টের জন্য থাকে।",
  },
  {
    q: "কোনো কারণে কলেজ বা অসুস্থতার জন্য ক্লাস মিস গেলে ব্যাকআপ কীভাবে দেওয়া হয়?",
    a: "মিস হওয়া ক্লাসের নোট ও হোমওয়ার্ক ডিজিটাল ক্লাস ডায়েরিতে পাওয়া যায়, আর প্রয়োজনে ডাউট সলভ করার জন্য পরবর্তী ক্লাসে আলাদা সময় দেওয়া হয়।",
  },
  {
    q: "ইংরেজি ও আইসিটির জন্য আলাদা ব্যাচ নেওয়ার সুযোগ আছে কি?",
    a: "হ্যাঁ, ইংরেজি ও আইসিটি আলাদাভাবে অথবা কম্বাইন্ড ব্যাচ হিসেবেও নেওয়া যায় — নিচের ভর্তি ফরমে পছন্দমতো ব্যাচ বেছে নিতে পারবে।",
  },
  {
    q: "ক্লাস টেস্টের ফলাফল অভিভাবকদের কীভাবে জানানো হয়?",
    a: "প্রতিটি সাপ্তাহিক মডেল টেস্টের পর শিক্ষার্থীর উপস্থিতি ও নম্বর সরাসরি অভিভাবকদের জানানো হয়, যাতে বাসায়ও পড়াশোনার তদারকি নিশ্চিত থাকে।",
  },
  {
    q: "ভর্তি হতে হলে প্রথমে কী করতে হবে?",
    a: "নিচের ভর্তি ফরমে প্রয়োজনীয় তথ্য পূরণ করলেই একাডেমি থেকে দ্রুত যোগাযোগ করে ব্যাচ ও ক্লাসের সময় নিশ্চিত করা হবে। চাইলে সরাসরি WhatsApp-এও যোগাযোগ করা যায়।",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <Reveal className="mb-10 text-center">
        <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
          সাধারণ জিজ্ঞাসা
        </span>
        <h2 className="mt-3 text-2xl font-bold text-sky-950 sm:text-3xl lg:text-4xl">
          ভর্তির আগে যা জানা দরকার
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-xs sm:text-sm text-ink-800/80 leading-relaxed">
          এখনো কোনো দ্বিধা থাকলে ভর্তি ফরম পূরণের আগে নিচের উত্তরগুলো দেখে নাও।
        </p>
      </Reveal>

      <Reveal delay={80} className="space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm transition-colors hover:border-sky-300"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5 sm:py-4"
              >
                <span className="text-xs font-bold text-sky-950 sm:text-sm">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-bold text-sky-700"
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
                    <p className="px-4 pb-4 text-xs leading-relaxed text-ink-800/85 sm:px-5 sm:pb-5 sm:text-sm">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
