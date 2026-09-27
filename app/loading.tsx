export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f8fafc] animate-pulse">
      {/* ১. টপ হেডার স্কেলিটন */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-5 pb-3 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-1.5">
          <div className="h-5 w-48 rounded-full bg-sky-200/70" />
          <div className="h-3 w-36 rounded-full bg-sky-100" />
        </div>
        <div className="hidden gap-6 lg:flex">
          <div className="h-4 w-16 rounded-full bg-slate-200/60" />
          <div className="h-4 w-16 rounded-full bg-slate-200/60" />
          <div className="h-4 w-16 rounded-full bg-slate-200/60" />
          <div className="h-4 w-16 rounded-full bg-slate-200/60" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-20 rounded-full bg-sky-200/70" />
          <div className="h-9 w-24 rounded-full bg-sky-300/80" />
        </div>
      </div>

      {/* ২. হিরো সেকশন স্কেলিটন */}
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 pt-16 pb-12 sm:px-8 md:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <div className="space-y-4">
          <div className="h-12 w-3/4 rounded-2xl bg-sky-200/80 sm:h-16" />
          <div className="h-5 w-1/2 rounded-full bg-sky-100" />
          <div className="space-y-2 pt-2">
            <div className="h-3.5 w-full rounded-full bg-slate-200/70" />
            <div className="h-3.5 w-5/6 rounded-full bg-slate-200/70" />
            <div className="h-3.5 w-4/6 rounded-full bg-slate-200/70" />
          </div>
          <div className="flex gap-6 border-y border-sky-100 py-4">
            <div className="h-10 w-24 rounded-xl bg-sky-100" />
            <div className="h-10 w-24 rounded-xl bg-sky-100" />
            <div className="h-10 w-24 rounded-xl bg-sky-100" />
          </div>
          <div className="flex gap-3 pt-2">
            <div className="h-12 w-40 rounded-full bg-sky-400/80" />
            <div className="h-12 w-36 rounded-full bg-slate-200/80" />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-72 w-64 rounded-[2.5rem] bg-sky-200/60 sm:h-96 sm:w-80" />
        </div>
      </div>

      {/* ৩. কার্ডস গ্রিড স্কেলিটন */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto mb-10 flex flex-col items-center gap-2">
          <div className="h-5 w-28 rounded-full bg-sky-100" />
          <div className="h-8 w-64 rounded-xl bg-slate-200/80" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-3xl border border-sky-100 bg-white p-7 shadow-xs">
              <div className="flex justify-between">
                <div className="h-5 w-20 rounded-full bg-sky-100" />
                <div className="h-5 w-16 rounded-full bg-slate-100" />
              </div>
              <div className="mt-5 h-6 w-3/4 rounded-xl bg-slate-200/70" />
              <div className="mt-3 space-y-2">
                <div className="h-3.5 w-full rounded-full bg-slate-100" />
                <div className="h-3.5 w-5/6 rounded-full bg-slate-100" />
              </div>
              <div className="mt-8 h-10 w-full rounded-full bg-sky-100/70" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
        }
