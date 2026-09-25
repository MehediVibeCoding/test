"use client";

import { useState, FormEvent } from "react";
import Reveal from "./Reveal";

const BATCH_OPTIONS = [
  "HSC 28 English and ICT Combine",
  "HSC 28 English (Batch 28)",
  "HSC 28 ICT (Batch 28)",
  "HSC 27 English and ICT Combine",
  "HSC 27 English (Batch 27)",
  "HSC 27 ICT (Batch 27)",
];

const GROUP_OPTIONS = ["বিজ্ঞান বিভাগ", "মানবিক বিভাগ", "ব্যবসায় শিক্ষা বিভাগ"];

export default function AdmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    roll: "",
    group: "বিজ্ঞান বিভাগ",
    batch: "HSC 28 English and ICT Combine",
    phone: "",
    guardianPhone: "",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Admission Form Submitted:", formData);
    setSubmitted(true);
  }

  function handleSendWhatsApp() {
    const text = encodeURIComponent(
      `আসসালামু আলাইকুম স্যার,\nআমি আপনার একাডেমিতে ভর্তি হতে আগ্রহী।\n\n` +
        `👤 নাম: ${formData.name}\n` +
        `🏫 কলেজ: ${formData.college}\n` +
        `🔢 রোল: ${formData.roll}\n` +
        `📂 বিভাগ: ${formData.group}\n` +
        `📚 কাঙ্ক্ষিত ব্যাচ: ${formData.batch}\n` +
        `📱 শিক্ষার্থীর ফোন: ${formData.phone}\n` +
        `👨‍👩‍👧 অভিভাবকের নম্বর: ${formData.guardianPhone || "প্রযোজ্য নয়"}`
    );
    window.open(`https://wa.me/8801845435539?text=${text}`, "_blank");
  }

  return (
    <section id="admission" className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <Reveal className="mb-10 text-center">
        <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
          ভর্তি আবেদন
        </span>
        <h2 className="mt-3 font-display text-2xl font-bold text-sky-950 sm:text-3xl lg:text-4xl">
          প্রাইভেট ব্যাচে আসন নিশ্চিত করো
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-xs sm:text-sm text-ink-800/80 leading-relaxed">
          তোমার প্রয়োজনীয় তথ্য দিয়ে নিচের ফরমটি পূরণ করো। একাডেমি থেকে দ্রুত তোমার সাথে
          যোগাযোগ করে ব্যাচ ও ক্লাসের সময় কনফার্ম করা হবে।
        </p>
      </Reveal>

      <Reveal delay={80}>
        {submitted ? (
          <div className="rounded-2xl border border-sky-200/90 bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-600">
              ✓
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-sky-950">
              আবেদন সফলভাবে গৃহীত হয়েছে!
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-ink-800/80 leading-relaxed">
              ধন্যবাদ, <span className="font-bold text-sky-900">{formData.name}</span>। তোমার আবেদনের
              তথ্য সংরক্ষণ করা হয়েছে। দ্রুত আসন নিশ্চিত করতে চাইলে সরাসরি হোয়াটসঅ্যাপেও জানাতে পারো।
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleSendWhatsApp}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-emerald-700"
              >
                <span>WhatsApp-এ সরাসরি পাঠাও</span>
                <span>→</span>
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-sky-800 transition-colors hover:bg-sky-100"
              >
                নতুন আবেদন করুন
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8"
          >
            {/* শিক্ষার্থীর নাম */}
            <div>
              <label className="mb-1 block text-xs sm:text-sm font-bold text-sky-950">
                শিক্ষার্থীর পূর্ণ নাম *
              </label>
              <input
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-sky-200/80 bg-sky-50/20 px-3.5 py-2.5 text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white"
                placeholder="যেমন: মোঃ সাকিব হোসেন"
              />
            </div>

            {/* কলেজ নাম ও কলেজ রোল */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs sm:text-sm font-bold text-sky-950">
                  কলেজের নাম *
                </label>
                <input
                  name="college"
                  required
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full rounded-xl border border-sky-200/80 bg-sky-50/20 px-3.5 py-2.5 text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white"
                  placeholder="যেমন: চৌদ্দগ্রাম সরকারি কলেজ"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs sm:text-sm font-bold text-sky-950">
                  কলেজ রোল নম্বর *
                </label>
                <input
                  name="roll"
                  required
                  value={formData.roll}
                  onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                  className="w-full rounded-xl border border-sky-200/80 bg-sky-50/20 px-3.5 py-2.5 text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white"
                  placeholder="যেমন: ১০২৫"
                />
              </div>
            </div>

            {/* বিভাগ এবং ব্যাচ নির্বাচন */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs sm:text-sm font-bold text-sky-950">
                  বিভাগ / গ্রুপ *
                </label>
                <select
                  name="group"
                  required
                  value={formData.group}
                  onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                  className="w-full rounded-xl border border-sky-200/80 bg-sky-50/20 px-3.5 py-2.5 text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white"
                >
                  {GROUP_OPTIONS.map((grp) => (
                    <option key={grp} value={grp}>
                      {grp}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs sm:text-sm font-bold text-sky-950">
                  কাঙ্ক্ষিত ব্যাচ *
                </label>
                <select
                  name="batch"
                  required
                  value={formData.batch}
                  onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                  className="w-full rounded-xl border border-sky-200/80 bg-sky-50/20 px-3.5 py-2.5 text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white"
                >
                  {BATCH_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* শিক্ষার্থীর ফোন ও অভিভাবকের ফোন */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs sm:text-sm font-bold text-sky-950">
                  শিক্ষার্থীর ফোন / WhatsApp নম্বর *
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-sky-200/80 bg-sky-50/20 px-3.5 py-2.5 text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white"
                  placeholder="01XXXXXXXXX"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs sm:text-sm font-bold text-sky-950">
                  অভিভাবকের মোবাইল নম্বর *
                </label>
                <input
                  name="guardianPhone"
                  type="tel"
                  required
                  value={formData.guardianPhone}
                  onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                  className="w-full rounded-xl border border-sky-200/80 bg-sky-50/20 px-3.5 py-2.5 text-xs sm:text-sm outline-none transition-colors focus:border-sky-600 focus:bg-white"
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-sky-600 py-3 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-sky-700"
              >
                ভর্তি আবেদন জমা দিন ✓
              </button>
            </div>
          </form>
        )}
      </Reveal>
    </section>
  );
}
