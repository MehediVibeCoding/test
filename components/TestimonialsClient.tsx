"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";
import { submitPublicReview, type PublicReviewInput } from "@/app/actions/review";
import type { Testimonial } from "@/lib/academyData";

const STORAGE_KEY = "ala_user_pending_review";

const EMPTY_FORM: PublicReviewInput = {
  name: "",
  role_type: "শিক্ষার্থী",
  batch_year: "HSC 2026",
  quote: "",
};

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

  // ব্যবহারকারীর নিজের জমা দেওয়া পেন্ডিং রিভিউ (শুধু তার ব্রাউজারে দেখাবে)
  const [localPendingReview, setLocalPendingReview] = useState<Testimonial | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setLocalPendingReview(parsed);
      }
    } catch {
      // localStorage এরর হ্যান্ডলিং
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const res = await submitPublicReview(formData);
    setIsSubmitting(false);

    if (!res.ok) {
      setErrorMessage(res.error);
      return;
    }

    const pendingItem: Testimonial = {
      id: "local_pending",
      name: formData.name,
      role: `${formData.role_type}, ${formData.batch_year}`,
      type: formData.role_type,
      year: formData.batch_year,
      quote: formData.quote,
      isFeatured: false,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pendingItem));
      setLocalPendingReview(pendingItem);
    } catch {
      // localStorage fallback
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
    <section className="bg-sky-100/50 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {/* হেডার */}
        <Reveal className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            শিক্ষার্থী ও অভিভাবক প্রতিক্রিয়া
          </span>
          <h2 className="mt-3 text-2xl font-bold text-sky-950 sm:text-3xl lg:text-4xl">
            শিক্ষার্থী ও অভিভাবকরা যা বলেন
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-xs sm:text-sm text-ink-800/80 leading-relaxed">
            আমাদের একাডেমি থেকে পড়ে শিক্ষার্থী ও অভিভাবকদের বাস্তব অভিজ্ঞতা ও মতামত।
          </p>
        </Reveal>

        {/* 🎯 মূল ৩টি শীর্ষ রিভিউ কার্ড গ্রিড */}
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((t, i) => (
            <Reveal key={t.id || t.name} delay={i * 100}>
              <figure className="glass-panel hover-lift flex h-full flex-col justify-between p-6 hover:shadow-glass">
                <blockquote className="font-body text-xs leading-relaxed text-ink-800/90 italic sm:text-sm">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 flex items-center justify-between border-t border-sky-100/80 pt-3">
                  <div>
                    <span className="block font-body text-xs font-bold text-sky-950 sm:text-sm">
                      {t.name}
                    </span>
                    <span className="block text-[11px] font-semibold text-sky-700">
                      {t.role || t.type}
                    </span>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      t.type === "শিক্ষার্থী"
                        ? "border border-sky-200/60 bg-sky-50 text-sky-700"
                        : "border border-amber-200/60 bg-amber-50 text-amber-800"
                    }`}
                  >
                    {t.type}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* ⏳ যিনি রিভিউ জমা দিয়েছেন, তার লোকাল প্রিভিউ কার্ড */}
        {localPendingReview && (
          <Reveal delay={120} className="mt-6">
            <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/50 p-5 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-md bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-900">
                  ⏳ আপনার রিভিউটি জমা হয়েছে (অনুমোদনের অপেক্ষায়)
                </span>
                <span className="text-[11px] font-semibold text-muted">শুধু আপনি দেখতে পাচ্ছেন</span>
              </div>
              <blockquote className="font-body text-xs italic leading-relaxed text-ink-800 sm:text-sm">
                &ldquo;{localPendingReview.quote}&rdquo;
              </blockquote>
              <div className="mt-3 flex items-center justify-between border-t border-amber-200/70 pt-2 text-xs font-bold text-sky-950">
                <span>{localPendingReview.name}</span>
                <span className="text-sky-700 font-semibold">{localPendingReview.role}</span>
              </div>
            </div>
          </Reveal>
        )}

        {/* ✍️ নতুন রিভিউ শেয়ার করার আকর্ষণীয় কল-টু-অ্যাকশন বাটন */}
        <Reveal delay={150} className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-2">
            <button
              onClick={() => setModalOpen(true)}
              className="crystal-btn-solid inline-flex items-center gap-2 rounded-xl px-6 py-3 font-body text-xs font-bold shadow-md sm:text-sm"
            >
              <span>✍️</span>
              <span>আপনার মতামত ও পড়ার অভিজ্ঞতা শেয়ার করুন</span>
              <span>→</span>
            </button>
            <p className="font-body text-[11px] text-ink-800/70">
              আপনার মূল্যবান মতামত সরাসরি যুক্ত হবে ও প্রদর্শিত হবে
            </p>
          </div>
        </Reveal>
      </div>

      {/* 📝 রিভিউ সাবমিশন মোডাল */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-sky-950/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 shadow-2xl sm:p-8"
            >
              {submittedSuccess ? (
                <div className="py-4 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-600">
                    ✓
                  </div>
                  <h3 className="font-body text-lg font-bold text-sky-950 sm:text-xl">
                    মতামত সফলভাবে জমা হয়েছে!
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-800/80 sm:text-sm">
                    ধন্যবাদ, <b className="text-sky-900">{formData.name}</b>। আপনার মূল্যবান অভিজ্ঞতা শেয়ার করার জন্য আমরা আন্তরিকভাবে কৃতজ্ঞ।
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="mt-6 rounded-xl bg-sky-600 px-6 py-2.5 font-body text-xs font-bold text-white shadow-sm hover:bg-sky-700 sm:text-sm"
                  >
                    ঠিক আছে, ধন্যবাদ
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-5 flex items-start justify-between gap-3 border-b border-sky-100 pb-3">
                    <div>
                      <h3 className="font-body text-base font-bold text-sky-950 sm:text-lg">
                        আপনার মতামত বা অভিজ্ঞতা লিখুন
                      </h3>
                      <p className="font-body text-xs text-muted">
                        ক্লাস অভিজ্ঞতা ও স্যারের পাঠদান সম্পর্কে আপনার মতামত
                      </p>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-xs font-bold text-sky-950 hover:bg-sky-100"
                    >
                      ✕
                    </button>
                  </div>

                  {errorMessage && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-sky-950">
                        আপনার পূর্ণ নাম *
                      </label>
                      <input
                        required
                        placeholder="যেমন: তানভীর আহমেদ"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-sky-200/80 bg-sky-50/30 px-3.5 py-2.5 text-xs outline-none focus:border-sky-600 focus:bg-white sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-sky-950">
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
                          className="w-full rounded-xl border border-sky-200/80 bg-sky-50/30 px-3 py-2.5 text-xs outline-none focus:border-sky-600 focus:bg-white sm:text-sm"
                        >
                          <option value="শিক্ষার্থী">🎓 শিক্ষার্থী</option>
                          <option value="অভিভাবক">👨‍👩‍👦 অভিভাবক</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold text-sky-950">
                          ব্যাচ বা শিক্ষাবর্ষ *
                        </label>
                        <input
                          required
                          placeholder="যেমন: HSC 2026"
                          value={formData.batch_year}
                          onChange={(e) =>
                            setFormData({ ...formData, batch_year: e.target.value })
                          }
                          className="w-full rounded-xl border border-sky-200/80 bg-sky-50/30 px-3.5 py-2.5 text-xs outline-none focus:border-sky-600 focus:bg-white sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-sky-950">
                        আপনার মতামত বা রিভিউ বক্তব্য *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="স্যারের ক্লাসের অভিজ্ঞতা ও গাইডলাইন আপনাকে কীভাবে সাহায্য করেছে লিখুন..."
                        value={formData.quote}
                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                        className="w-full resize-none rounded-xl border border-sky-200/80 bg-sky-50/30 p-3 text-xs outline-none focus:border-sky-600 focus:bg-white sm:text-sm"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="rounded-xl border border-border-base bg-white px-4 py-2 text-xs font-semibold text-ink-800 hover:bg-surface-muted sm:text-sm"
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="crystal-btn-solid rounded-xl px-5 py-2 text-xs font-bold text-white shadow-xs hover:brightness-105 disabled:opacity-60 sm:text-sm"
                      >
                        {isSubmitting ? "জমা হচ্ছে..." : "মতামত জমা দিন ✓"}
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
