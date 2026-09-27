"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import { submitAdmission } from "@/app/actions/admission";

const GROUP_OPTIONS = ["বিজ্ঞান বিভাগ", "মানবিক বিভাগ", "ব্যবসায় শিক্ষা বিভাগ"];
const SUBMISSION_LOCK_KEY = "ala_admission_locked_session";
const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

type AdmissionFormProps = {
  batches: { id: string; name: string }[];
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

// বাংলাদেশি মোবাইল নম্বর ভ্যালিডেটর (013 - 019 এবং ঠিক 11 ডিজিট)
function isValidBdPhone(phone: string): boolean {
  return /^01[3-9]\d{8}$/.test(phone.trim());
}

// শুধুমাত্র বর্ণমালা ও স্পেস ফিল্টার (সংখ্যা বা চিহ্ন ব্লক)
function filterAlphaOnly(value: string): string {
  return value.replace(/[^a-zA-Z\u0980-\u09FF\s.]/g, "");
}

// শুধুমাত্র ইংরেজি সংখ্যা ফিল্টার (সর্বোচ্চ ১১ ডিজিট)
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

export default function AdmissionForm({ batches }: AdmissionFormProps) {
  const [formData, setFormData] = useState<FormDataState>(INITIAL_FORM);
  const [submittedData, setSubmittedData] = useState<FormDataState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});

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
        setErrorMessage("সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01845435539 - ঠিক ১১ ডিজিট)।");
      } else if (errors.group || errors.batch) {
        setErrorMessage("অনুগ্রহ করে বিভাগ ও কাঙ্ক্ষিত ব্যাচ নির্বাচন করুন।");
      } else {
        setErrorMessage("অনুগ্রহ করে লাল চিহ্নিত সকল আবশ্যক তথ্য সঠিকভাবে পূরণ করুন।");
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
      setErrorMessage("ইন্টারনেট সংযোগে ত্রুটি হয়েছে। আপনার কানেকশন চেক করে আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="admission" className="relative px-4 py-10 sm:px-8 sm:py-14 lg:py-16 lg:px-12 bg-white">
      <div className="mx-auto max-w-3xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-6 text-center sm:mb-10">
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
            ভর্তি আবেদন
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[38px]">
            প্রাইভেট ব্যাচে আসন নিশ্চিত করো
          </h2>
          <p className="mx-auto mt-2.5 max-w-lg font-body text-[14px] leading-[1.7] text-ink-800/80 sm:text-[15px]">
            তোমার সঠিক তথ্য দিয়ে নিচের ফরমটি পূরণ করো। একাডেমি থেকে দ্রুত তোমার সাথে যোগাযোগ করে ব্যাচ ও ক্লাসের সময় কনফার্ম করা হবে।
          </p>
        </Reveal>

        <Reveal delay={80}>
          {submittedData ? (
            /* সফট প্যাস্টেল মিন্ট গ্রিন ইনভয়েস রিসিপ্ট কার্ড */
            <div className="overflow-hidden rounded-3xl border border-[#a7f3d0] bg-[#ecfdf5]/40 p-6 sm:p-8 shadow-xs">
              {/* বোল্ড সার্কুলার টিক ও ধন্যবাদ বার্তা */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left border-b border-[#a7f3d0]/80 pb-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d1fae5] text-[#047857] border border-[#a7f3d0] shadow-xs">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.8} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-body text-lg font-black text-sky-950 sm:text-xl">
                    ধন্যবাদ, {submittedData.name}
                  </h3>
                  <p className="mt-1 font-body text-xs sm:text-sm leading-relaxed text-ink-800/85">
                    তোমার আবেদনের তথ্য সফলভাবে সংরক্ষণ করা হয়েছে। একাডেমি থেকে দ্রুত তোমার সাথে কল অথবা হোয়াটসঅ্যাপে যোগাযোগ করে ব্যাচ কনফার্ম করা হবে।
                  </p>
                </div>
              </div>

              {/* শিক্ষার্থীর তথ্যের প্রিমিয়াম রিসিপ্ট টেবিল */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white font-body text-xs sm:text-sm shadow-xs">
                <div className="divide-y divide-slate-100">
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500">শিক্ষার্থীর নাম</span>
                    <span className="font-bold text-sky-950">{submittedData.name}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500">কলেজের নাম</span>
                    <span className="font-bold text-sky-950">{submittedData.college}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500">কলেজ রোল</span>
                    <span className="font-bold text-sky-950">{submittedData.roll}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500">বিভাগ / গ্রুপ</span>
                    <span className="font-bold text-sky-950">{submittedData.group}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500">নির্বাচিত ব্যাচ</span>
                    <span className="rounded-full bg-sky-50 px-3 py-0.5 font-bold text-sky-700 border border-sky-200/60">
                      {submittedData.batch}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500">শিক্ষার্থীর মোবাইল</span>
                    <span className="font-bold text-sky-950">{submittedData.phone}</span>
                  </div>
                  <div className="flex justify-between items-center p-3.5 sm:px-5">
                    <span className="font-semibold text-slate-500">অভিভাবকের মোবাইল</span>
                    <span className="font-bold text-sky-950">{submittedData.guardianPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* আবেদন ফর্ম */
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-3xl border border-sky-100 bg-white p-6 shadow-xs sm:p-8"
            >
              {errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-3.5 font-body text-xs sm:text-sm font-semibold text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* শিক্ষার্থীর নাম */}
              <div>
                <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950">
                  শিক্ষার্থীর পূর্ণ নাম
                </label>
                <input
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className={`w-full rounded-2xl border px-4 py-3 font-body text-xs sm:text-sm outline-none transition-colors ${
                    fieldErrors.name
                      ? "border-red-400 bg-red-50/30 focus:border-red-600"
                      : "border-sky-200/80 bg-sky-50/20 focus:border-sky-600 focus:bg-white"
                  }`}
                  placeholder="শিক্ষার্থীর পূর্ণ নাম লিখুন"
                />
              </div>

              {/* কলেজ ও কলেজ রোল */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950">
                    কলেজের নাম
                  </label>
                  <input
                    name="college"
                    required
                    value={formData.college}
                    onChange={handleCollegeChange}
                    className={`w-full rounded-2xl border px-4 py-3 font-body text-xs sm:text-sm outline-none transition-colors ${
                      fieldErrors.college
                        ? "border-red-400 bg-red-50/30 focus:border-red-600"
                        : "border-sky-200/80 bg-sky-50/20 focus:border-sky-600 focus:bg-white"
                    }`}
                    placeholder="যেমন: চৌদ্দগ্রাম সরকারি কলেজ"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950">
                    কলেজ রোল নম্বর
                  </label>
                  <input
                    name="roll"
                    required
                    value={formData.roll}
                    onChange={handleRollChange}
                    className={`w-full rounded-2xl border px-4 py-3 font-body text-xs sm:text-sm outline-none transition-colors ${
                      fieldErrors.roll
                        ? "border-red-400 bg-red-50/30 focus:border-red-600"
                        : "border-sky-200/80 bg-sky-50/20 focus:border-sky-600 focus:bg-white"
                    }`}
                    placeholder="যেমন: ১০২৫"
                  />
                </div>
              </div>

              {/* বিভাগ ও কাঙ্ক্ষিত ব্যাচ */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950">
                    বিভাগ / গ্রুপ
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
                      className={`w-full appearance-none rounded-2xl border px-4 py-3 pr-10 font-body text-xs sm:text-sm outline-none transition-colors cursor-pointer ${
                        fieldErrors.group
                          ? "border-red-400 bg-red-50/30 focus:border-red-600"
                          : "border-sky-200/80 bg-sky-50/20 focus:border-sky-600 focus:bg-white"
                      }`}
                    >
                      <option value="" disabled>
                        বিভাগ সিলেক্ট করুন
                      </option>
                      {GROUP_OPTIONS.map((grp) => (
                        <option key={grp} value={grp}>
                          {grp}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-sky-700">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950">
                    কাঙ্ক্ষিত ব্যাচ
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
                      className={`w-full appearance-none rounded-2xl border px-4 py-3 pr-10 font-body text-xs sm:text-sm outline-none transition-colors cursor-pointer ${
                        fieldErrors.batch
                          ? "border-red-400 bg-red-50/30 focus:border-red-600"
                          : "border-sky-200/80 bg-sky-50/20 focus:border-sky-600 focus:bg-white"
                      }`}
                    >
                      <option value="" disabled>
                        ব্যাচ সিলেক্ট করুন
                      </option>
                      {batches.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-sky-700">
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
                  <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950">
                    শিক্ষার্থীর ফোন / WhatsApp নম্বর
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    maxLength={11}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full rounded-2xl border px-4 py-3 font-body text-xs sm:text-sm outline-none transition-colors ${
                      fieldErrors.phone
                        ? "border-red-400 bg-red-50/30 focus:border-red-600"
                        : "border-sky-200/80 bg-sky-50/20 focus:border-sky-600 focus:bg-white"
                    }`}
                    placeholder="01XXXXXXXXX (১১ ডিজিট)"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block font-body text-xs sm:text-sm font-bold text-sky-950">
                    অভিভাবকের মোবাইল নম্বর
                  </label>
                  <input
                    name="guardianPhone"
                    type="tel"
                    required
                    maxLength={11}
                    value={formData.guardianPhone}
                    onChange={handleGuardianPhoneChange}
                    className={`w-full rounded-2xl border px-4 py-3 font-body text-xs sm:text-sm outline-none transition-colors ${
                      fieldErrors.guardianPhone
                        ? "border-red-400 bg-red-50/30 focus:border-red-600"
                        : "border-sky-200/80 bg-sky-50/20 focus:border-sky-600 focus:bg-white"
                    }`}
                    placeholder="01XXXXXXXXX (১১ ডিজিট)"
                  />
                </div>
              </div>

              {/* সাবমিট বাটন */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-full bg-sky-600 py-3.5 font-body text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-95 disabled:opacity-60"
                >
                  {isSubmitting ? "জমা হচ্ছে..." : "ভর্তি আবেদন জমা দিন"}
                </motion.button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
