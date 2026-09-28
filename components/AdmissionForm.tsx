"use client";

import { useState, useEffect, useMemo, FormEvent, ChangeEvent } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import { submitAdmission } from "@/app/actions/admission";
import { useShine } from "@/hooks/useShine";
import { useApp } from "@/context/AppContext";

const SUBMISSION_LOCK_KEY = "ala_admission_locked_session";
const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

type AdmissionFormProps = {
  batches?: { id: string; name: string }[];
};

type FormDataState = {
  name: string;
  college: string;
  roll: string;
  group: string;
  batch: string;
  phone: string;
  guardianPhone: string;
};

const INITIAL_FORM: FormDataState = {
  name: "",
  college: "",
  roll: "",
  group: "",
  batch: "",
  phone: "",
  guardianPhone: "",
};

// বাংলাদেশি মোবাইল নম্বর ভ্যালিডেটর
function isValidBdPhone(phone: string): boolean {
  return /^01[3-9]\d{8}$/.test(phone.trim());
}

// শুধুমাত্র বর্ণমালা ও স্পেস ফিল্টার
function filterAlphaOnly(value: string): string {
  return value.replace(/[^a-zA-Z\u0980-\u09FF\s.]/g, "");
}

// শুধুমাত্র সংখ্যা ফিল্টার (১১ ডিজিট)
function filterPhoneOnly(value: string): string {
  const englishDigits = value.replace(/[০-৯]/g, (d) =>
    String("০১২৩৪৫৬৭৮৯".indexOf(d))
  );
  return englishDigits.replace(/\D/g, "").slice(0, 11);
}

// কলেজ রোল ফিল্টার
function filterRollOnly(value: string): string {
  return value.replace(/[^a-zA-Z0-9\u0980-\u09FF-]/g, "").slice(0, 20);
}

export default function AdmissionForm({ batches = [] }: AdmissionFormProps) {
  const { language, t } = useApp();
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM);
  const [submittedData, setSubmittedData] = useState<FormDataState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});

  // ফরমের সকল ফিল্ড সঠিকভাবে পূরণ হয়েছে কিনা তা লাইভ চেক
  const isFormValid = useMemo(() => {
    return (
      formData.name.trim().length >= 2 &&
      formData.college.trim().length >= 2 &&
      formData.roll.trim().length >= 1 &&
      Boolean(formData.group) &&
      Boolean(formData.batch) &&
      isValidBdPhone(formData.phone) &&
      isValidBdPhone(formData.guardianPhone)
    );
  }, [formData]);

  // ফিল্ড সম্পূর্ণ হলে তবেই সাবমিট বাটনে লাইভ ঝিলিক (Reactive Shine) জ্বলবে
  const { ref: submitBtnRef, shineClass } = useShine<HTMLButtonElement>(
    isFormValid && !isSubmitting
  );

  // ২ ঘণ্টার ডুপ্লিকেট সাবমিশন লক চেক
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SUBMISSION_LOCK_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const elapsed = Date.now() - parsed.timestamp;
        if (elapsed < TWO_HOURS_IN_MS && parsed.data) {
          setSubmittedData(parsed.data);
        } else {
          localStorage.removeItem(SUBMISSION_LOCK_KEY);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = filterAlphaOnly(e.target.value).slice(0, 60);
    setFormData((prev) => ({ ...prev, name: val }));
    if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: false }));
  };

  const handleCollegeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = filterAlphaOnly(e.target.value).slice(0, 80);
    setFormData((prev) => ({ ...prev, college: val }));
    if (fieldErrors.college) setFieldErrors((prev) => ({ ...prev, college: false }));
  };

  const handleRollChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = filterRollOnly(e.target.value);
    setFormData((prev) => ({ ...prev, roll: val }));
    if (fieldErrors.roll) setFieldErrors((prev) => ({ ...prev, roll: false }));
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = filterPhoneOnly(e.target.value);
    setFormData((prev) => ({ ...prev, phone: val }));
    if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: false }));
  };

  const handleGuardianPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = filterPhoneOnly(e.target.value);
    setFormData((prev) => ({ ...prev, guardianPhone: val }));
    if (fieldErrors.guardianPhone) setFieldErrors((prev) => ({ ...prev, guardianPhone: false }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    const errors: { [key: string]: boolean } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) errors.name = true;
    if (!formData.college.trim()) errors.college = true;
    if (!formData.roll.trim()) errors.roll = true;
    if (!formData.group) errors.group = true;
    if (!formData.batch) errors.batch = true;
    if (!isValidBdPhone(formData.phone)) errors.phone = true;
    if (!isValidBdPhone(formData.guardianPhone)) errors.guardianPhone = true;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      if (errors.phone || errors.guardianPhone) {
        setErrorMessage(
          language === "bn"
            ? "সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01845435539 - ঠিক ১১ ডিজিট)।"
            : "Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01845435539)."
        );
      } else if (errors.group || errors.batch) {
        setErrorMessage(
          language === "bn"
            ? "অনুগ্রহ করে বিভাগ ও কাঙ্ক্ষিত ব্যাচ নির্বাচন করুন।"
            : "Please select your academic group and preferred batch."
        );
      } else {
        setErrorMessage(
          language === "bn"
            ? "অনুগ্রহ করে লাল চিহ্নিত সকল আবশ্যক তথ্য সঠিকভাবে পূরণ করুন।"
            : "Please fill in all required fields marked in red."
        );
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitAdmission({
        name: formData.name.trim(),
        college: formData.college.trim(),
        roll: formData.roll.trim(),
        group: formData.group,
        batch: formData.batch,
        phone: formData.phone.trim(),
        guardianPhone: formData.guardianPhone.trim(),
      });

      if (!result.ok) {
        setErrorMessage(result.error);
        return;
      }

      // ২ ঘণ্টার জন্য লক ডেটা সংরক্ষণ
      const sessionData = {
        timestamp: Date.now(),
        data: formData,
      };
      try {
        localStorage.setItem(SUBMISSION_LOCK_KEY, JSON.stringify(sessionData));
      } catch {
        // fallback
      }

      setSubmittedData(formData);
    } catch (err) {
      console.error("Admission submission network error:", err);
      setErrorMessage(
        language === "bn"
          ? "ইন্টারনেট সংযোগে ত্রুটি হয়েছে। আপনার কানেকশন চেক করে আবার চেষ্টা করুন।"
          : "Network error. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const groupOptions = [
    { value: "বিজ্ঞান বিভাগ", label: t.admission.scienceGroup },
    { value: "মানবিক বিভাগ", label: t.admission.humanitiesGroup },
    { value: "ব্যবসায় শিক্ষা বিভাগ", label: t.admission.businessGroup },
  ];

  return (
    <section
      id="admission"
      className="relative px-4 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-white dark:bg-[#070f1a] overflow-hidden transition-colors"
    >
      {/* ব্যাকগ্রাউন্ড এডুকেশন অ্যাকসেন্ট ডুডলস */}
      <EduDoodles variant="section" />

      <div className="relative z-10 mx-auto max-w-3xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-8 text-center sm:mb-12">
          <span className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900/60 px-4 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
            {t.admission.tag}
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 dark:text-white sm:text-4xl lg:text-[38px]">
            {t.admission.title}
          </h2>
          <p className="mx-auto mt-2.5 max-w-lg font-body text-[14px] leading-[1.7] text-ink-800/80 dark:text-slate-300 sm:text-[15px]">
            {t.admission.subtitle}
          </p>
        </Reveal>

        <Reveal delay={80}>
          {submittedData ? (
            /* সফট প্যাস্টেল মিন্ট গ্রিন ইনভয়েস রিসিপ্ট কার্ড */
            <div className="overflow-hidden rounded-3xl border border-[#a7f3d0] dark:border-emerald-800 bg-[#ecfdf5]/50 dark:bg-[#0b241d]/70 p-6 sm:p-8 shadow-xs backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left border-b border-[#a7f3d0]/80 dark:border-emerald-800/80 pb-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d1fae5] dark:bg-emerald-900 text-[#047857] dark:text-emerald-300 border border-[#a7f3d0] dark:border-emerald-700 shadow-xs">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-body text-lg font-black text-sky-950 dark:text-white sm:text-xl">
                    {t.admission.thankYou}, {submittedData.name}
                  </h3>
                  <p className="mt-1 font-body text-xs sm:text-sm leading-relaxed text-ink-800/85 dark:text-slate-300">
                    {t.admission.successMsg}
                  </p>
                </div>
              </div>

              {/* শিক্ষার্থীর তথ্যের রিসিপ্ট টেবিল */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-900/90 font-body text-xs sm:text-sm shadow-xs">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{t.admission.studentName}</span>
                    <span className="font-bold text-sky-950 dark:text-white">{submittedData.name}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{t.admission.collegeName}</span>
                    <span className="font-bold text-sky-950 dark:text-white">{submittedData.college}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{t.admission.rollNumber}</span>
                    <span className="font-bold text-sky-950 dark:text-white">{submittedData.roll}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{t.admission.group}</span>
                    <span className="font-bold text-sky-950 dark:text-white">{submittedData.group}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{t.admission.selectedBatch}</span>
                    <span className="rounded-full bg-sky-50 dark:bg-sky-950 px-3 py-0.5 font-bold text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800">
                      {submittedData.batch}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{t.admission.studentPhone}</span>
                    <span className="font-bold text-sky-950 dark:text-white">{submittedData.phone}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">{t.admission.guardianPhone}</span>
                    <span className="font-bold text-sky-950 dark:text-white">{submittedData.guardianPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* আবেদন ফর্ম */
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-6 shadow-xs backdrop-blur-sm sm:p-8"
            >
              {errorMessage && (
                <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 p-3.5 font-body text-xs sm:text-sm font-semibold text-red-700 dark:text-red-300">
                  {errorMessage}
                </div>
              )}

              {/* শিক্ষার্থীর নাম */}
              <div>
                <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950 dark:text-white">
                  {t.admission.studentName}
                </label>
                <input
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className={`w-full rounded-2xl border px-4 py-3 font-body text-xs sm:text-sm outline-none transition-colors dark:text-white ${
                    fieldErrors.name
                      ? "border-red-400 bg-red-50/30 dark:bg-red-950/30 focus:border-red-600"
                      : "border-sky-200/80 dark:border-slate-700 bg-sky-50/20 dark:bg-slate-800/50 focus:border-sky-600 focus:bg-white dark:focus:bg-slate-800"
                  }`}
                  placeholder={language === "bn" ? "শিক্ষার্থীর পূর্ণ নাম লিখুন" : "Enter student full name"}
                />
              </div>

              {/* কলেজ ও কলেজ রোল */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950 dark:text-white">
                    {t.admission.collegeName}
                  </label>
                  <input
                    name="college"
                    required
                    value={formData.college}
                    onChange={handleCollegeChange}
                    className={`w-full rounded-2xl border px-4 py-3 font-body text-xs sm:text-sm outline-none transition-colors dark:text-white ${
                      fieldErrors.college
                        ? "border-red-400 bg-red-50/30 dark:bg-red-950/30 focus:border-red-600"
                        : "border-sky-200/80 dark:border-slate-700 bg-sky-50/20 dark:bg-slate-800/50 focus:border-sky-600 focus:bg-white dark:focus:bg-slate-800"
                    }`}
                    placeholder={language === "bn" ? "যেমন: চৌদ্দগ্রাম সরকারি কলেজ" : "e.g. Chauddagram Govt. College"}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950 dark:text-white">
                    {t.admission.rollNumber}
                  </label>
                  <input
                    name="roll"
                    required
                    value={formData.roll}
                    onChange={handleRollChange}
                    className={`w-full rounded-2xl border px-4 py-3 font-body text-xs sm:text-sm outline-none transition-colors dark:text-white ${
                      fieldErrors.roll
                        ? "border-red-400 bg-red-50/30 dark:bg-red-950/30 focus:border-red-600"
                        : "border-sky-200/80 dark:border-slate-700 bg-sky-50/20 dark:bg-slate-800/50 focus:border-sky-600 focus:bg-white dark:focus:bg-slate-800"
                    }`}
                    placeholder={language === "bn" ? "যেমন: ১০২৫" : "e.g. 1025"}
                  />
                </div>
              </div>

              {/* বিভাগ ও কাঙ্ক্ষিত ব্যাচ */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950 dark:text-white">
                    {t.admission.group}
                  </label>
                  <div className="relative">
                    <select
                      name="group"
                      required
                      value={formData.group}
                      onChange={(e) => {
                        setFormData({ ...formData, group: e.target.value });
                        if (fieldErrors.group) setFieldErrors((p) => ({ ...p, group: false }));
                      }}
                      className={`w-full appearance-none rounded-2xl border px-4 py-3 pr-10 font-body text-xs sm:text-sm outline-none transition-colors cursor-pointer dark:text-white ${
                        fieldErrors.group
                          ? "border-red-400 bg-red-50/30 dark:bg-red-950/30 focus:border-red-600"
                          : "border-sky-200/80 dark:border-slate-700 bg-sky-50/20 dark:bg-slate-800/50 focus:border-sky-600 focus:bg-white dark:focus:bg-slate-800"
                      }`}
                    >
                      <option value="" disabled className="dark:bg-slate-900">
                        {t.admission.selectGroupPlaceholder}
                      </option>
                      {groupOptions.map((grp) => (
                        <option key={grp.value} value={grp.value} className="dark:bg-slate-900">
                          {grp.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-sky-700 dark:text-sky-300">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950 dark:text-white">
                    {t.admission.selectedBatch}
                  </label>
                  <div className="relative">
                    <select
                      name="batch"
                      required
                      value={formData.batch}
                      onChange={(e) => {
                        setFormData({ ...formData, batch: e.target.value });
                        if (fieldErrors.batch) setFieldErrors((p) => ({ ...p, batch: false }));
                      }}
                      className={`w-full appearance-none rounded-2xl border px-4 py-3 pr-10 font-body text-xs sm:text-sm outline-none transition-colors cursor-pointer dark:text-white ${
                        fieldErrors.batch
                          ? "border-red-400 bg-red-50/30 dark:bg-red-950/30 focus:border-red-600"
                          : "border-sky-200/80 dark:border-slate-700 bg-sky-50/20 dark:bg-slate-800/50 focus:border-sky-600 focus:bg-white dark:focus:bg-slate-800"
                      }`}
                    >
                      <option value="" disabled className="dark:bg-slate-900">
                        {t.admission.selectBatchPlaceholder}
                      </option>
                      {batches.map((b) => (
                        <option key={b.id} value={b.name} className="dark:bg-slate-900">
                          {b.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-sky-700 dark:text-sky-300">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* শিক্ষার্থীর ফোন ও অভিভাবকের ফোন */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950 dark:text-white">
                    {t.admission.studentPhone}
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    maxLength={11}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full rounded-2xl border px-4 py-3 font-body text-xs sm:text-sm outline-none transition-colors dark:text-white ${
                      fieldErrors.phone
                        ? "border-red-400 bg-red-50/30 dark:bg-red-950/30 focus:border-red-600"
                        : "border-sky-200/80 dark:border-slate-700 bg-sky-50/20 dark:bg-slate-800/50 focus:border-sky-600 focus:bg-white dark:focus:bg-slate-800"
                    }`}
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950 dark:text-white">
                    {t.admission.guardianPhone}
                  </label>
                  <input
                    name="guardianPhone"
                    type="tel"
                    required
                    maxLength={11}
                    value={formData.guardianPhone}
                    onChange={handleGuardianPhoneChange}
                    className={`w-full rounded-2xl border px-4 py-3 font-body text-xs sm:text-sm outline-none transition-colors dark:text-white ${
                      fieldErrors.guardianPhone
                        ? "border-red-400 bg-red-50/30 dark:bg-red-950/30 focus:border-red-600"
                        : "border-sky-200/80 dark:border-slate-700 bg-sky-50/20 dark:bg-slate-800/50 focus:border-sky-600 focus:bg-white dark:focus:bg-slate-800"
                    }`}
                    placeholder="01XXXXXXXXX"
                  />
                </div>
              </div>

              {/* সাবমিট বাটন */}
              <div className="pt-2">
                <motion.button
                  ref={submitBtnRef}
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full rounded-full py-3.5 font-body text-xs sm:text-sm font-bold text-white shadow-sm transition-all ${shineClass} ${
                    isSubmitting
                      ? "bg-slate-400 opacity-60 cursor-not-allowed"
                      : "btn-gradient active:scale-95"
                  }`}
                >
                  {isSubmitting ? t.admission.submittingBtn : t.admission.submitBtn}
                </motion.button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
