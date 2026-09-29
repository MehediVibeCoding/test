"use client";

import { useEffect, useState, FormEvent, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import {
  submitPublicReview,
  checkReviewStatus,
  type PublicReviewInput,
} from "@/app/actions/review";
import { useApp } from "@/context/AppContext";
import type { Testimonial } from "@/lib/academyData";

const STORAGE_KEY = "ala_user_pending_review_v2";
const TIMESTAMPS_KEY = "ala_review_daily_timestamps_v2";
const MAX_DAILY_REVIEWS = 2;
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

const MAX_QUOTE_LENGTH = 500;
const MAX_NAME_LENGTH = 60;
const MAX_BATCH_LENGTH = 30;

type StoredReview = {
  id: string;
  name: string;
  role_type: "শিক্ষার্থী" | "অভিভাবক";
  batch_year: string;
  quote: string;
  submittedAt: number;
};

const EMPTY_FORM: PublicReviewInput = {
  name: "",
  role_type: "শিক্ষার্থী",
  batch_year: "HSC 2026",
  quote: "",
};

function sanitizeInput(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

function getInitials(name: string): string {
  const clean = name.trim();
  if (!clean) return "AU";
  const parts = clean.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getRecentSubmissionsCount(): number {
  try {
    const raw = localStorage.getItem(TIMESTAMPS_KEY);
    if (!raw) return 0;
    const timestamps: number[] = JSON.parse(raw);
    const now = Date.now();
    const valid = timestamps.filter((t) => now - t < TWENTY_FOUR_HOURS_MS);
    localStorage.setItem(TIMESTAMPS_KEY, JSON.stringify(valid));
    return valid.length;
  } catch {
    return 0;
  }
}

function recordSubmissionTimestamp() {
  try {
    const raw = localStorage.getItem(TIMESTAMPS_KEY);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const valid = timestamps.filter((t) => now - t < TWENTY_FOUR_HOURS_MS);
    valid.push(now);
    localStorage.setItem(TIMESTAMPS_KEY, JSON.stringify(valid));
  } catch {
    // fallback
  }
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const reviewCardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function TestimonialsClient({
  featured,
}: {
  featured: Testimonial[];
}) {
  const { language, t } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<PublicReviewInput>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [localPendingReview, setLocalPendingReview] = useState<StoredReview | null>(null);
  const [rejectedNotice, setRejectedNotice] = useState<boolean>(false);
  const [isDailyLimitReached, setIsDailyLimitReached] = useState(false);

  const syncReviewStatus = useCallback(async () => {
    const count = getRecentSubmissionsCount();
    if (count >= MAX_DAILY_REVIEWS) {
      setIsDailyLimitReached(true);
    } else {
      setIsDailyLimitReached(false);
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed: StoredReview = JSON.parse(saved);

      if (parsed && parsed.id) {
        const result = await checkReviewStatus(parsed.id);

        if (result.status === "approved") {
          localStorage.removeItem(STORAGE_KEY);
          setLocalPendingReview(null);
        } else if (result.status === "rejected") {
          localStorage.removeItem(STORAGE_KEY);
          setLocalPendingReview(null);
          setRejectedNotice(true);
        } else {
          setLocalPendingReview(parsed);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  useEffect(() => {
    syncReviewStatus();
  }, [syncReviewStatus]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (getRecentSubmissionsCount() >= MAX_DAILY_REVIEWS) {
      setErrorMessage(
        language === "bn"
          ? "আপনি আজকের জন্য সর্বোচ্চ ২টি রিভিউ প্রদান করেছেন। অনুগ্রহ করে আগামীকাল চেষ্টা করুন।"
          : "You have submitted the maximum of 2 reviews for today. Please try again tomorrow."
      );
      setIsDailyLimitReached(true);
      return;
    }

    const cleanName = sanitizeInput(formData.name);
    const cleanQuote = sanitizeInput(formData.quote);
    const cleanBatch = sanitizeInput(formData.batch_year);

    if (cleanName.length < 2) {
      setErrorMessage(
        language === "bn"
          ? "অনুগ্রহ করে আপনার সঠিক পূর্ণ নাম লিখুন।"
          : "Please enter your full name."
      );
      return;
    }

    if (cleanQuote.length < 10) {
      setErrorMessage(
        language === "bn"
          ? "আপনার মতামত বা রিভিউ বক্তব্য কমপক্ষে ১০ অক্ষরের হতে হবে।"
          : "Your review must be at least 10 characters long."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: PublicReviewInput = {
        name: cleanName.slice(0, MAX_NAME_LENGTH),
        role_type: formData.role_type,
        batch_year: cleanBatch.slice(0, MAX_BATCH_LENGTH),
        quote: cleanQuote.slice(0, MAX_QUOTE_LENGTH),
      };

      const res = await submitPublicReview(payload);

      if (!res.ok) {
        setErrorMessage(res.error);
        return;
      }

      const storedItem: StoredReview = {
        id: res.reviewId,
        name: payload.name,
        role_type: payload.role_type,
        batch_year: payload.batch_year,
        quote: payload.quote,
        submittedAt: Date.now(),
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedItem));
        recordSubmissionTimestamp();
        setLocalPendingReview(storedItem);
      } catch {
        // fallback
      }

      if (getRecentSubmissionsCount() >= MAX_DAILY_REVIEWS) {
        setIsDailyLimitReached(true);
      }

      setSubmittedSuccess(true);
    } catch (err) {
      console.error("Review submission network error:", err);
      setErrorMessage(
        language === "bn"
          ? "ইন্টারনেট সংযোগে ত্রুটি হয়েছে। আপনার কানেকশন চেক করে আবার চেষ্টা করুন।"
          : "Network error. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCloseModal() {
    setModalOpen(false);
    setSubmittedSuccess(false);
    setErrorMessage(null);
    setFormData(EMPTY_FORM);
  }

  return (
    <section className="relative px-6 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-gradient-to-b from-sky-50/40 via-white to-white dark:from-[#070f1a] dark:via-[#091b2e] dark:to-[#070f1a] overflow-hidden transition-colors">
      {/* ব্যাকগ্রাউন্ড এডুকেশন অ্যাকসেন্ট ডুডলস */}
      <EduDoodles variant="section" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-8 text-center sm:mb-10">
          <span className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900/60 px-4 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
            {t.testimonials.tag}
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 dark:text-white sm:text-4xl lg:text-[38px]">
            {t.testimonials.title}
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 dark:text-slate-300 sm:text-[15px]">
            {t.testimonials.subtitle}
          </p>
        </Reveal>

        {/* রিজেক্ট নোটিশ ব্যানার */}
        <AnimatePresence>
          {rejectedNotice && (
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 overflow-hidden rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-950/40 p-4 shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-200/80 dark:bg-amber-800 text-amber-900 dark:text-amber-200 text-xs font-black">
                    i
                  </span>
                  <div>
                    <p className="font-body text-[13px] font-bold text-amber-950 dark:text-amber-200">
                      {t.testimonials.rejectedNoticeTitle}
                    </p>
                    <p className="font-body text-[11.5px] text-amber-900/80 dark:text-amber-300/80 mt-0.5">
                      {t.testimonials.rejectedNoticeDesc}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRejectedNotice(false)}
                  className="rounded-lg bg-white/80 dark:bg-slate-800 px-2.5 py-1 font-body text-[11px] font-bold text-amber-900 dark:text-amber-200 hover:bg-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* ৩টি মনোটোন প্রিমিয়াম রিভিউ কার্ড গ্রিড */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {featured.map((item) => {
            const isGuardian = item.type === "অভিভাবক";
            const initials = getInitials(item.name);

            return (
              <m.div key={item.id || item.name} variants={reviewCardVariants}>
                <figure className="group flex h-full flex-col justify-between rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/80 p-6 sm:p-7 shadow-xs backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-xl hover:shadow-sky-950/5">
                  <div>
                    {/* কোটেশন মার্ক */}
                    <div className="mb-3.5 text-sky-400">
                      <svg className="h-6 w-6 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    <p className="font-body text-sm sm:text-[14.5px] leading-[1.75] text-ink-800/90 dark:text-slate-200">
                      {item.quote}
                    </p>
                  </div>

                  {/* পরিচয় ও অ্যাভাটার */}
                  <figcaption className="mt-6 flex items-center justify-between border-t border-sky-100/80 dark:border-slate-800 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 dark:bg-slate-800 font-body text-xs font-black text-sky-800 dark:text-sky-300 border border-sky-200/60 dark:border-slate-700">
                        {initials}
                      </div>
                      <div>
                        <span className="block font-body text-sm font-bold text-sky-950 dark:text-white sm:text-[15px]">
                          {item.name}
                        </span>
                        {!isGuardian && item.year && item.year !== "শিক্ষার্থী" && (
                          <span className="block font-body text-xs font-semibold text-sky-700 dark:text-sky-400 mt-0.5">
                            {item.year}
                          </span>
                        )}
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 font-body text-xs font-bold ${
                        isGuardian
                          ? "border border-amber-200/80 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                          : "border border-sky-200/80 dark:border-sky-800 bg-sky-50 dark:bg-sky-950 text-sky-800 dark:text-sky-300"
                      }`}
                    >
                      {isGuardian ? t.testimonials.guardianOption : t.testimonials.studentOption}
                    </span>
                  </figcaption>
                </figure>
              </m.div>
            );
          })}
        </m.div>

        {/* ব্যবহারকারীর নিজস্ব লোকাল পেন্ডিং রিভিউ কার্ড */}
        {localPendingReview && (
          <Reveal delay={100} className="mt-6">
            <div className="rounded-3xl border-2 border-dashed border-sky-300 dark:border-sky-700 bg-sky-50/40 dark:bg-slate-900/60 p-6 shadow-xs">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-full bg-sky-100 dark:bg-sky-900 px-3 py-1 font-body text-xs font-bold text-sky-900 dark:text-sky-200">
                  {language === "bn"
                    ? "আপনার রিভিউটি জমা হয়েছে (অ্যাডমিন অনুমোদনের অপেক্ষায়)"
                    : "Your review is submitted (Awaiting Admin Approval)"}
                </span>
                <span className="font-body text-xs font-semibold text-ink-800/60 dark:text-slate-400">
                  {language === "bn" ? "শুধুমাত্র আপনি দেখতে পাচ্ছেন" : "Visible only to you"}
                </span>
              </div>
              <p className="font-body text-sm leading-[1.75] text-ink-800 dark:text-slate-200">
                {localPendingReview.quote}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-sky-200/70 dark:border-slate-800 pt-3 font-body text-xs font-bold text-sky-950 dark:text-white">
                <span>{localPendingReview.name}</span>
                <span className="text-sky-700 dark:text-sky-300 font-semibold">{localPendingReview.batch_year || localPendingReview.role_type}</span>
              </div>
            </div>
          </Reveal>
        )}

        {/* রিভিউ বাটন (ঝিলিক অ্যানিমেশন সহ) */}
        <Reveal from="zoom" delay={120} className="mt-8 text-center sm:mt-10">
          <div className="inline-flex flex-col items-center gap-1.5">
            <button
              disabled={isDailyLimitReached}
              onClick={() => setModalOpen(true)}
              className={`inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-body text-xs sm:text-sm font-bold text-white shadow-sm transition-all ${
                isDailyLimitReached
                  ? "bg-slate-400 opacity-50 cursor-not-allowed"
                  : "btn-gradient active:scale-95"
              }`}
            >
              <span className="text-base font-black leading-none">+</span>
              <span>
                {isDailyLimitReached
                  ? t.testimonials.limitReached
                  : t.testimonials.feedbackCta}
              </span>
            </button>
          </div>
        </Reveal>
      </div>

      {/* রিভিউ সাবমিশন মোডাল */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-sky-950/60 dark:bg-black/75 backdrop-blur-sm"
            />
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-sky-100 dark:border-sky-900 bg-white dark:bg-slate-900 p-6 shadow-2xl sm:p-8"
            >
              {submittedSuccess ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-body text-lg font-bold text-sky-950 dark:text-white sm:text-xl">
                    {t.testimonials.successTitle}
                  </h3>
                  <p className="mt-2 font-body text-xs sm:text-sm leading-relaxed text-ink-800/80 dark:text-slate-300">
                    {t.testimonials.successDesc}
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="mt-6 btn-gradient rounded-full px-7 py-2.5 font-body text-xs sm:text-sm font-bold text-white shadow-xs"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5 flex items-start justify-between gap-3 border-b border-sky-100 dark:border-slate-800 pb-3.5">
                    <div>
                      <h3 className="font-body text-base font-bold text-sky-950 dark:text-white sm:text-lg">
                        {t.testimonials.modalTitle}
                      </h3>
                      <p className="font-body text-xs text-ink-800/70 dark:text-slate-400 mt-0.5">
                        {t.testimonials.modalSubtitle}
                      </p>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 dark:bg-slate-800 text-xs font-bold text-sky-950 dark:text-white hover:bg-sky-100"
                    >
                      ✕
                    </button>
                  </div>

                  {errorMessage && (
                    <div className="mb-4 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 p-3.5 font-body text-xs font-semibold text-red-700 dark:text-red-300">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 block font-body text-xs font-bold text-sky-950 dark:text-white sm:text-[13px]">
                        {t.testimonials.nameLabel}
                      </label>
                      <input
                        required
                        maxLength={MAX_NAME_LENGTH}
                        placeholder={language === "bn" ? "আপনার পূর্ণ নাম লিখুন" : "Enter your full name"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-2xl border border-sky-200/80 dark:border-slate-700 bg-sky-50/30 dark:bg-slate-800/50 px-4 py-2.5 font-body text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white dark:focus:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block font-body text-xs font-bold text-sky-950 dark:text-white sm:text-[13px]">
                          {t.testimonials.roleLabel}
                        </label>
                        <div className="relative">
                          <select
                            value={formData.role_type}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                role_type: e.target.value as "শিক্ষার্থী" | "অভিভাবক",
                              })
                            }
                            className="w-full appearance-none rounded-2xl border border-sky-200/80 dark:border-slate-700 bg-sky-50/30 dark:bg-slate-800/50 px-4 py-2.5 pr-9 font-body text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white dark:focus:bg-slate-800 cursor-pointer dark:text-white"
                          >
                            <option value="শিক্ষার্থী" className="dark:bg-slate-900">{t.testimonials.studentOption}</option>
                            <option value="অভিভাবক" className="dark:bg-slate-900">{t.testimonials.guardianOption}</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-sky-700 dark:text-sky-300">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="mb-1 block font-body text-xs font-bold text-sky-950 dark:text-white sm:text-[13px]">
                          {t.testimonials.batchLabel}
                        </label>
                        <input
                          required
                          maxLength={MAX_BATCH_LENGTH}
                          placeholder={language === "bn" ? "যেমন: HSC 2026" : "e.g. HSC 2026"}
                          value={formData.batch_year}
                          onChange={(e) =>
                            setFormData({ ...formData, batch_year: e.target.value })
                          }
                          className="w-full rounded-2xl border border-sky-200/80 dark:border-slate-700 bg-sky-50/30 dark:bg-slate-800/50 px-4 py-2.5 font-body text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white dark:focus:bg-slate-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="font-body text-xs font-bold text-sky-950 dark:text-white sm:text-[13px]">
                          {t.testimonials.quoteLabel}
                        </label>
                        <span className="font-body text-[11px] font-semibold text-ink-800/60 dark:text-slate-400">
                          {formData.quote.length} / {MAX_QUOTE_LENGTH}
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        required
                        maxLength={MAX_QUOTE_LENGTH}
                        placeholder={
                          language === "bn"
                            ? "স্যারের ক্লাসের অভিজ্ঞতা ও গাইডলাইন সম্পর্কে আপনার মতামত লিখুন..."
                            : "Share your thoughts on teaching quality and classroom guidance..."
                        }
                        value={formData.quote}
                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                        className="w-full resize-none rounded-2xl border border-sky-200/80 dark:border-slate-700 bg-sky-50/30 dark:bg-slate-800/50 p-3.5 font-body text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white dark:focus:bg-slate-800 dark:text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2 font-body text-xs font-semibold text-ink-800 dark:text-slate-200 hover:bg-slate-50"
                      >
                        {t.testimonials.cancelBtn}
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-gradient rounded-full px-6 py-2 font-body text-xs sm:text-sm font-bold text-white shadow-sm active:scale-95 disabled:opacity-60"
                      >
                        {isSubmitting ? "..." : t.testimonials.submitBtn}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
