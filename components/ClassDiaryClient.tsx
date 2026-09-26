"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import type { ClassDiaryEntry } from "@/lib/academyData";

type ClassDiaryClientProps = {
  entries: ClassDiaryEntry[];
};

const ALL_LABEL = "সব";

export default function ClassDiaryClient({ entries }: ClassDiaryClientProps) {
  const batchTabs = useMemo(() => {
    const uniqueBatches = Array.from(new Set(entries.map((e) => e.batch).filter(Boolean)));
    return [ALL_LABEL, ...uniqueBatches];
  }, [entries]);

  const [selected, setSelected] = useState(ALL_LABEL);

  const filtered = useMemo(
    () => (selected === ALL_LABEL ? entries : entries.filter((e) => e.batch === selected)),
    [entries, selected]
  );

  return (
    <section id="class-diary" className="mx-auto max-w-5xl px-4 py-20">
      <Reveal className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-sky-950 md:text-3xl">
          আজকের ক্লাস ডায়েরি
        </h2>
        <p className="mx-auto mt-3 max-w-prose text-ink-800">
          ক্লাসে যা পড়ানো হয়েছে ভুলে গেছো? এখানে প্রতিদিনের ক্লাস নোট, স্লাইড ও
          হোমওয়ার্ক খুঁজে পাবে।
        </p>
      </Reveal>

      <Reveal className="mb-8 flex flex-wrap justify-center gap-2" delay={80}>
        {batchTabs.map((batch) => (
          <button
            key={batch}
            onClick={() => setSelected(batch)}
            className={`hover-lift rounded-full px-4 py-2 text-sm transition-colors ${
              selected === batch
                ? "bg-sky-600 text-white"
                : "bg-sky-100 text-sky-700 hover:bg-sky-200"
            }`}
          >
            {batch}
          </button>
        ))}
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {filtered.map((entry) => (
          <Reveal key={entry.id}>
            <article className="glass-panel hover-lift h-full p-5 hover:shadow-glass">
              <p className="text-xs text-sky-700">{entry.date}</p>
              <p className="mt-1 text-xs font-medium text-sky-950">{entry.batch}</p>
              <h3 className="mt-3 text-lg font-semibold text-sky-950">
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
          </Reveal>
        ))}
      </div>
    </section>
  );
}
