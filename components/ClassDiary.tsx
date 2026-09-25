"use client";

import { useMemo, useState } from "react";

// 🔧 demo data — later this comes from Supabase, sorted by date desc
const ENTRIES = [
  {
    date: "২৫ সেপ্টেম্বর, ২০২৬",
    batch: "HSC English (Batch 28)",
    topic: "Flow Chart লেখার নিয়ম ও অনুশীলন",
    note: "আজকে Flow Chart-এর ধাপগুলো এবং সংযোজক শব্দ (linking words) নিয়ে আলোচনা হয়েছে। বাড়ির কাজ: বই থেকে ৩টা অনুচ্ছেদের Flow Chart তৈরি করো।",
    slideUrl: "#",
  },
  {
    date: "২৪ সেপ্টেম্বর, ২০২৬",
    batch: "HSC ICT (Batch 28)",
    topic: "Logic Gate — AND, OR, NOT",
    note: "মৌলিক গেইটগুলোর Truth Table ও প্রতীক আলোচনা করা হয়েছে। পরের ক্লাসে Combination Gate নিয়ে কাজ হবে।",
    slideUrl: "#",
  },
  {
    date: "২৩ সেপ্টেম্বর, ২০২৬",
    batch: "HSC English (Batch 28)",
    topic: "Cloze Test with Clues — কৌশল",
    note: "প্রসঙ্গ অনুযায়ী শব্দ বাছাইয়ের কৌশল নিয়ে আলোচনা। প্র্যাকটিস শিট ক্লাসে দেওয়া হয়েছে।",
    slideUrl: "#",
  },
];

const BATCHES = ["সব", "HSC English (Batch 28)", "HSC ICT (Batch 28)"];

export default function ClassDiary() {
  const [selected, setSelected] = useState("সব");

  const filtered = useMemo(
    () =>
      selected === "সব" ? ENTRIES : ENTRIES.filter((e) => e.batch === selected),
    [selected]
  );

  return (
    <section id="class-diary" className="mx-auto max-w-5xl px-4 py-20">
      <div className="mb-10 text-center">
        <h2 className="font-display text-2xl font-semibold text-sky-950 md:text-3xl">
          আজকের ক্লাস ডায়েরি
        </h2>
        <p className="mx-auto mt-3 max-w-prose text-ink-800">
          ক্লাসে যা পড়ানো হয়েছে ভুলে গেছো? এখানে প্রতিদিনের ক্লাস নোট, স্লাইড ও
          হোমওয়ার্ক খুঁজে পাবে।
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {BATCHES.map((batch) => (
          <button
            key={batch}
            onClick={() => setSelected(batch)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              selected === batch
                ? "bg-sky-600 text-white"
                : "bg-sky-100 text-sky-700 hover:bg-sky-200"
            }`}
          >
            {batch}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {filtered.map((entry) => (
          <article key={entry.date + entry.batch} className="glass-panel p-5">
            <p className="text-xs text-sky-700">{entry.date}</p>
            <p className="mt-1 text-xs font-medium text-sky-950">{entry.batch}</p>
            <h3 className="mt-3 font-display text-lg font-semibold text-sky-950">
              {entry.topic}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-800">{entry.note}</p>
            <a
              href={entry.slideUrl}
              className="mt-4 inline-block text-sm font-medium text-sky-600 hover:text-sky-700"
            >
              প্রেজেন্টেশন/স্লাইড দেখো →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
