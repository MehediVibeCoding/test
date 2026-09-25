"use client";

import { useState, FormEvent } from "react";
import Reveal from "./Reveal";

export default function AdmissionForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // 🔧 backend not wired yet — later: POST to Supabase / API route
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Admission form submitted:", data);
    setSubmitted(true);
  }

  return (
    <section id="admission" className="mx-auto max-w-2xl px-4 py-20">
      <Reveal className="mb-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-sky-950 md:text-3xl">
          প্রাইভেট ব্যাচে ভর্তি ফর্ম
        </h2>
        <p className="mt-3 text-ink-800">তথ্য দাও, আমরা শীঘ্রই তোমার সাথে যোগাযোগ করব।</p>
      </Reveal>

      <Reveal delay={100}>
        {submitted ? (
          <div className="glass-panel-premium p-8 text-center">
            <p className="font-display text-lg font-semibold text-sky-950">
              ধন্যবাদ! ফর্ম জমা হয়েছে ✓
            </p>
            <p className="mt-2 text-sm text-ink-800">
              শীঘ্রই WhatsApp/ফোনে যোগাযোগ করা হবে।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-panel-premium space-y-4 p-6 md:p-8">
            <div>
              <label className="mb-1 block text-sm font-medium text-sky-950">নাম</label>
              <input
                name="name"
                required
                className="w-full rounded-lg border border-sky-100 bg-white/70 px-4 py-2 text-sm outline-none transition-colors focus:border-sky-600"
                placeholder="তোমার পূর্ণ নাম"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-sky-950">কলেজ</label>
              <input
                name="college"
                required
                className="w-full rounded-lg border border-sky-100 bg-white/70 px-4 py-2 text-sm outline-none transition-colors focus:border-sky-600"
                placeholder="তোমার কলেজের নাম"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-sky-950">ব্যাচ</label>
                <select
                  name="batch"
                  required
                  className="w-full rounded-lg border border-sky-100 bg-white/70 px-4 py-2 text-sm outline-none transition-colors focus:border-sky-600"
                >
                  <option value="">নির্বাচন করো</option>
                  <option>HSC English (Batch 28)</option>
                  <option>HSC ICT (Batch 28)</option>
                  <option>উভয়টি</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-sky-950">
                  ফোন / WhatsApp
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-lg border border-sky-100 bg-white/70 px-4 py-2 text-sm outline-none transition-colors focus:border-sky-600"
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-glow w-full rounded-full bg-sky-600 px-6 py-3 text-sm font-medium text-white hover:bg-sky-700"
            >
              ফর্ম জমা দাও
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
