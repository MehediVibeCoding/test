"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";
import { submitPublicReview, type PublicReviewInput } from "@/app/actions/review";
import type { Testimonial } from "@/lib/academyData";

const STORAGE_KEY = "ala_user_pending_review";
const MAX_QUOTE_LENGTH = 500;
const MAX_NAME_LENGTH = 60;
const MAX_BATCH_LENGTH = 30;

const EMPTY_FORM: PublicReviewInput = {
  name: "",
  role_type: "শিক্ষার্থী",
  batch_year: "HSC 2026",
  quote: "",
};

// সাধারণ স্ক্রিপ্ট ও ট্যাগ স্যানিটাইজার
function sanitizeInput(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

export default function TestimonialsClient({
  featured,
}: {
  featured: Testimonial[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<PublicReviewInput>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // ব্রাউজারে সংরক্ষিত পেন্ডিং রিভিউ
  const [localPendingReview, setLocalPendingReview] = useState<Testimonial | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setLocalPendingReview(parsed);
      }
    } catch {
      // localStorage error fallback
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = sanitizeInput(formData.name);
    const cleanQuote = sanitizeInput(formData.quote);
    const cleanBatch = sanitizeInput(formData.batch_year);

    if (cleanName.length < 2) {
      setErrorMessage("অনুগ্রহ করে আপনার সঠিক পূর্ণ নাম লিখুন।");
      return;
    }

    if (cleanQuote.length < 10) {
      setErrorMessage("আপনার মতামত বা রিভিউ কমপক্ষে ১০ অক্ষরের হতে হবে।");
      return;
    }

    setIsSubmitting(true);

    const payload: PublicReviewInput = {
      name: cleanName.slice(0, MAX_NAME_LENGTH),
      role_type: formData.role_type,
      batch_year: cleanBatch.slice(0, MAX_BATCH_LENGTH),
      quote: cleanQuote.slice(0, MAX_QUOTE_LENGTH),
    };

    const res = await submitPublicReview(payload);
    setIsSubmitting(false);

    if (!res.ok) {
      setErrorMessage(res.error);
      return;
    }

    const pendingItem: Testimonial = {
      id: "local_pending",
      name: payload.name,
      role: `${payload.role_type}, ${payload.batch_year}`,
      type: payload.role_type,
      year: payload.batch_year,
      quote: payload.quote,
      isFeatured: false,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pendingItem));
      setLocalPendingReview(pendingItem);
    } catch {
      // fallback
    }

    setSubmittedSuccess(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setSubmittedSuccess(false);
    setErrorMessage(null);
    setFormData(EMPTY_FORM);
  }

  return (
    <section className="relative px-6 py-20 sm:px-8 sm:py-28 lg:px-12 bg-gradient-to-b from-sky-50/40 via-white to-white">
      <div className="mx-auto max-w-7xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-12 text-center sm:mb-16">
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
            শিক্ষার্থী ও অভিভাবক প্রতিক্রিয়া
          </span>
          <h2 className="mt-3.5 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[40px]">
            শিক্ষার্থী ও অভিভাবকরা যা বলেন
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-[15px] leading-[1.8] text-ink-800/80 sm:text-base">
            আমাদের একাডেমি থেকে পড়ে শিক্ষার্থী ও অভিভাবকদের বাস্তব অভিজ্ঞতা ও অভিমত।
          </p>
        </Reveal>

        {/* ৩টি মনোটোন লাক্সারি রিভিউ কার্ড গ্রিড */}
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((t, i) => (
            <Reveal key={t.id || t.name} delay={i * 70}>
              <figure className="group flex h-full flex-col justify-between rounded-3xl border border-sky-100 bg-white p-7 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5">
                <div>
                  {/* কোটেশন মার্ক আইকন */}
                  <svg className="h-7 w-7 text-sky-300/80 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <blockquote className="font-body text-sm sm:text-[14.5px] italic leading-[1.8] text-ink-800/90">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="mt-6 flex items-center justify-between border-t border-sky-100/80 pt-4">
                  <div>
                    <span className="block font-body text-sm font-bold text-sky-950 sm:text-[15px]">
                      {t.name}
                    </span>
                    <span className="block font-body text-xs font-semibold text-sky-700 mt-0.5">
                      {t.role || t.type}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 font-body text-xs font-bold ${
                      t.type === "শিক্ষার্থী"
                        ? "border border-sky-200/80 bg-sky-50 text-sky-800"
                        : "border border-amber-200/80 bg-amber-50 text-amber-800"
                    }`}
                  >
                    {t.type}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* ব্যবহারকারীর নিজস্ব পেন্ডিং রিভিউ কার্ড */}
        {localPendingReview && (
          <Reveal delay={100} className="mt-8">
            <div className="rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50/40 p-6 sm:p-7 shadow-xs">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-amber-100 px-3 py-1 font-body text-xs font-bold text-amber-900">
                  আপনার রিভিউটি জমা হয়েছে (অনুমোদনের অপেক্ষায়)
                </span>
                <span className="font-body text-xs font-semibold text-ink-800/60">শুধুমাত্র আপনি দেখতে পাচ্ছেন</span>
              </div>
              <blockquote className="font-body text-sm italic leading-[1.75] text-ink-800">
                &ldquo;{localPendingReview.quote}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center justify-between border-t border-amber-200/70 pt-3 font-body text-xs font-bold text-sky-950">
                <span>{localPendingReview.name}</span>
                <span className="text-sky-700 font-semibold">{localPendingReview.role}</span>
              </div>
            </div>
          </Reveal>
        )}

        {/* নতুন রিভিউ শেয়ার করার প্রিমিয়াম বাটন */}
        <Reveal delay={120} className="mt-14 text-center">
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-full bg-sky-600 px-8 py-3.5 font-body text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-95"
          >
            আপনার মতামত ও পড়ার অভিজ্ঞতা শেয়ার করুন
          </button>
        </Reveal>
      </div>

      {/* রিভিউ সাবমিশন মোডাল */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-sky-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 shadow-2xl sm:p-8"
            >
              {submittedSuccess ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-body text-lg font-bold text-sky-950 sm:text-xl">
                    মতামত সফলভাবে জমা হয়েছে
                  </h3>
                  <p className="mt-2 font-body text-xs sm:text-sm leading-relaxed text-ink-800/80">
                    ধন্যবাদ, <b className="text-sky-950">{formData.name}</b>। আপনার মূল্যবান অভিজ্ঞতা শেয়ার করার জন্য আমরা আন্তরিকভাবে কৃতজ্ঞ।
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="mt-6 rounded-full bg-sky-600 px-7 py-2.5 font-body text-xs sm:text-sm font-bold text-white transition-all hover:bg-sky-700 active:scale-95"
                  >
                    ঠিক আছে
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5 flex items-start justify-between gap-3 border-b border-sky-100 pb-3.5">
                    <div>
                      <h3 className="font-body text-base font-bold text-sky-950 sm:text-lg">
                        আপনার মতামত বা অভিজ্ঞতা লিখুন
                      </h3>
                      <p className="font-body text-xs text-ink-800/70 mt-0.5">
                        ক্লাসের অভিজ্ঞতা ও স্যারের পাঠদান সম্পর্কে আপনার মতামত
                      </p>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-950 hover:bg-sky-100"
                    >
                      ✕
                    </button>
                  </div>

                  {errorMessage && (
                    <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3.5 font-body text-xs font-semibold text-red-700">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* পূর্ণ নাম */}
                    <div>
                      <label className="mb-1 block font-body text-xs font-bold text-sky-950 sm:text-[13px]">
                        আপনার পূর্ণ নাম *
                      </label>
                      <input
                        required
                        maxLength={MAX_NAME_LENGTH}
                        placeholder="যেমন: তানভীর আহমেদ"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-2xl border border-sky-200/80 bg-sky-50/30 px-4 py-2.5 font-body text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white"
                      />
                    </div>

                    {/* ভূমিকা ও শিক্ষাবর্ষ */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block font-body text-xs font-bold text-sky-950 sm:text-[13px]">
                          আপনার ভূমিকা *
                        </label>
                        <select
                          value={formData.role_type}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              role_type: e.target.value as "শিক্ষার্থী" | "অভিভাবক",
                            })
                          }
                          className="w-full rounded-2xl border border-sky-200/80 bg-sky-50/30 px-3.5 py-2.5 font-body text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white"
                        >
                          <option value="শিক্ষার্থী">শিক্ষার্থী</option>
                          <option value="অভিভাবক">অভিভাবক</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block font-body text-xs font-bold text-sky-950 sm:text-[13px]">
                          ব্যাচ বা শিক্ষাবর্ষ *
                        </label>
                        <input
                          required
                          maxLength={MAX_BATCH_LENGTH}
                          placeholder="যেমন: HSC 2026"
                          value={formData.batch_year}
                          onChange={(e) =>
                            setFormData({ ...formData, batch_year: e.target.value })
                          }
                          className="w-full rounded-2xl border border-sky-200/80 bg-sky-50/30 px-4 py-2.5 font-body text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* রিভিউ বক্তব্য ও লাইভ ক্যারেক্টার কাউন্টার */}
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <label className="font-body text-xs font-bold text-sky-950 sm:text-[13px]">
                          আপনার মতামত বা রিভিউ বক্তব্য *
                        </label>
                        <span className="font-body text-[11px] font-semibold text-ink-800/60">
                          {formData.quote.length} / {MAX_QUOTE_LENGTH} অক্ষর
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        required
                        maxLength={MAX_QUOTE_LENGTH}
                        placeholder="স্যারের ক্লাসের অভিজ্ঞতা ও গাইডলাইন আপনাকে কীভাবে সাহায্য করেছে লিখুন..."
                        value={formData.quote}
                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                        className="w-full resize-none rounded-2xl border border-sky-200/80 bg-sky-50/30 p-3.5 font-body text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white"
                      />
                    </div>

                    {/* ফর্ম কন্ট্রোল বাটন */}
                    <div className="flex justify-end gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="rounded-full border border-slate-200 bg-white px-5 py-2 font-body text-xs font-semibold text-ink-800 hover:bg-slate-50 sm:text-sm"
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-full bg-sky-600 px-6 py-2 font-body text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-95 disabled:opacity-60"
                      >
                        {isSubmitting ? "জমা হচ্ছে..." : "মতামত জমা দিন"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
