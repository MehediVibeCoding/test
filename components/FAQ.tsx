"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import { useApp } from "@/context/AppContext";

const FAQS_DATA = [
  {
    qBn: "সিলেবাস কত মাসে সম্পূর্ণ শেষ করানো হয়?",
    qEn: "How many months does it take to complete the entire board syllabus?",
    aBn: "প্রতিটি ব্যাচের সময়সূচী ও রুটিন অনুযায়ী পুরো বোর্ড সিলেবাস পরিকল্পিতভাবে শেষ করানো হয়, যাতে ফাইনাল পরীক্ষার আগে পর্যাপ্ত সময় রিভিশন ও মডেল টেস্টের জন্য থাকে।",
    aEn: "The full syllabus is covered in a structured, time-bound roadmap ensuring ample time before final board examinations for revisions and comprehensive model tests.",
  },
  {
    qBn: "কোনো কারণে কলেজ বা অসুস্থতার জন্য ক্লাস মিস গেলে ব্যাকআপ কীভাবে দেওয়া হয়?",
    qEn: "How are backup classes handled if a student misses a session due to illness or exams?",
    aBn: "মিস হওয়া ক্লাসের বিস্তারিত নোট, প্রেজেন্টেশন ও হোমওয়ার্ক ডিজিটাল ক্লাস ডায়েরিতে পাওয়া যায়। এছাড়াও কোনো বিষয় বুঝতে সমস্যা হলে পরবর্তী ক্লাসে আলাদাভাবে বুঝিয়ে দেওয়া হয়।",
    aEn: "Complete class lecture notes, slides, and homework are logged in the Digital Class Diary. Additionally, Sir provides personalized doubt-clearing in the following session.",
  },
  {
    qBn: "ইংরেজি ও আইসিটির জন্য আলাদা ব্যাচ নেওয়ার সুযোগ আছে কি?",
    qEn: "Is it possible to enroll in English and ICT separately?",
    aBn: "হ্যাঁ, ইংরেজি ও আইসিটি সম্পূর্ণ আলাদাভাবে অথবা কম্বাইন্ড ব্যাচ হিসেবেও নেওয়া যায়—নিচের ভর্তি ফরমে পছন্দমতো ব্যাচ বেছে নেওয়ার সুযোগ রয়েছে।",
    aEn: "Yes, students can enroll in individual subjects (English or ICT) or choose a combined private batch as per their preference in the admission form.",
  },
  {
    qBn: "ক্লাস টেস্টের ফলাফল অভিভাবকদের কীভাবে জানানো হয়?",
    qEn: "How are class test results and attendance communicated to parents?",
    aBn: "প্রতিটি সাপ্তাহিক মডেল টেস্টের পর শিক্ষার্থীর উপস্থিতি ও পরীক্ষার মার্কস সরাসরি অভিভাবকদের জানানো হয়, যাতে বাসায়ও নিয়মিত পড়াশোনার তদারকি নিশ্চিত থাকে।",
    aEn: "Attendance records and model test scores are directly shared with guardians after every weekly evaluation to ensure disciplined study at home.",
  },
  {
    qBn: "ভর্তি হতে হলে প্রথমে কী করতে হবে?",
    qEn: "What is the initial step to enroll in a batch?",
    aBn: "নিচের ভর্তি ফরমে প্রয়োজনীয় তথ্য দিয়ে আবেদন করলেই একাডেমি থেকে দ্রুত যোগাযোগ করে ব্যাচ ও ক্লাসের চূড়ান্ত সময় নিশ্চিত করা হবে।",
    aEn: "Simply fill out the online admission form below with accurate details. Our academy team will reach out promptly to confirm your batch and schedule.",
  },
  {
    qBn: "HSC ছাড়া অ্যাডমিশন বা জবের জন্য ইংরেজি শেখার সুযোগ আছে কি?",
    qEn: "Are there guidelines for university admission or job-oriented English?",
    aBn: "আমাদের নিয়মিত ব্যাচ মূলত HSC শিক্ষার্থীদের জন্য। তবে ভার্সিটি অ্যাডমিশন বা চাকরির প্রস্তুতির জন্য বিশেষ গাইডলাইন চাইলে সরাসরি যোগাযোগ করে আলোচনা করা যাবে।",
    aEn: "Our primary cohorts focus on HSC students. However, specialized guidelines for university admissions or job tests can be discussed via direct consultation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language, t } = useApp();

  return (
    <section
      id="faq"
      className="relative px-4 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-white dark:bg-[#070f1a] overflow-hidden transition-colors"
    >
      {/* ব্যাকগ্রাউন্ড এডুকেশন অ্যাকসেন্ট ডুডলস */}
      <EduDoodles variant="section" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-8 text-center sm:mb-12">
          <span className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900/60 px-4 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
            {t.faq.tag}
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 dark:text-white sm:text-4xl lg:text-[38px]">
            {t.faq.title}
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 dark:text-slate-300 sm:text-[15px]">
            {t.faq.subtitle}
          </p>
        </Reveal>

        {/* প্রিমিয়াম অ্যাকর্ডিয়ন তালিকা */}
        <Reveal delay={80} className="space-y-3 sm:space-y-3.5">
          {FAQS_DATA.map((item, i) => {
            const isOpen = openIndex === i;
            const question = language === "bn" ? item.qBn : item.qEn;
            const answer = language === "bn" ? item.aBn : item.aEn;

            return (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 shadow-xs backdrop-blur-sm transition-all duration-300 hover:border-sky-300 dark:hover:border-sky-700"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
                >
                  <span className="font-body text-sm sm:text-base font-bold text-sky-950 dark:text-white leading-snug">
                    {question}
                  </span>
                  <m.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 dark:bg-slate-800 font-body text-base font-bold text-sky-700 dark:text-sky-300"
                  >
                    +
                  </m.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-sky-100/70 dark:border-slate-800 px-4 pt-3.5 pb-4 sm:px-5 sm:pb-5 font-body text-xs sm:text-sm leading-[1.8] text-ink-800/85 dark:text-slate-300">
                        {answer}
                      </p>
                    </m.div>
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
