export default function BlogPostLoading() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-ink-800 animate-pulse">
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ১. আর্টিকেল হেডার কার্ড স্কেলিটন */}
        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex items-center justify-between border-b border-sky-100/80 pb-5">
            <div className="h-9 w-40 rounded-full bg-slate-200/80" />
            <div className="h-4 w-28 rounded-full bg-slate-100" />
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-8 w-11/12 rounded-xl bg-sky-200/80 sm:h-10" />
            <div className="h-8 w-3/4 rounded-xl bg-sky-200/80 sm:h-10" />
          </div>

          <div className="mt-5 h-16 w-full rounded-2xl bg-sky-50/70" />
        </div>

        {/* ২. আর্টিকেল বডি কনটেন্ট স্কেলিটন */}
        <div className="mt-6 rounded-3xl border border-sky-100 bg-white p-6 shadow-xs sm:p-10">
          <div className="space-y-4">
            <div className="h-4 w-full rounded-full bg-slate-200/70" />
            <div className="h-4 w-full rounded-full bg-slate-200/70" />
            <div className="h-4 w-5/6 rounded-full bg-slate-200/70" />
            
            <div className="h-4 w-full rounded-full bg-slate-200/70 pt-2" />
            <div className="h-4 w-11/12 rounded-full bg-slate-200/70" />
            <div className="h-4 w-4/5 rounded-full bg-slate-200/70" />

            <div className="h-4 w-full rounded-full bg-slate-200/70 pt-2" />
            <div className="h-4 w-3/4 rounded-full bg-slate-200/70" />
          </div>

          {/* বটম সিগনেচার স্কেলিটন */}
          <div className="mt-12 flex flex-col items-end border-t border-sky-100/80 pt-6">
            <div className="h-6 w-44 rounded-xl bg-sky-200/80" />
            <div className="mt-1.5 h-3.5 w-36 rounded-full bg-sky-100" />
          </div>
        </div>
      </article>
    </main>
  );
}
