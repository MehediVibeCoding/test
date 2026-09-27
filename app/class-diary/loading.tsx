export default function ClassDiaryLoading() {
  return (
    <main className="min-h-screen bg-[#f8fafc] animate-pulse">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ১. টপ হেডার কার্ড স্কেলিটন */}
        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex items-center justify-between border-b border-sky-100/80 pb-5">
            <div className="h-9 w-40 rounded-full bg-slate-200/80" />
            <div className="h-4 w-28 rounded-full bg-slate-100" />
          </div>
          <div className="mt-6 flex items-start gap-4">
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-sky-100" />
            <div className="flex-1 space-y-2">
              <div className="h-8 w-72 rounded-xl bg-sky-200/80 sm:w-96" />
              <div className="h-4 w-full max-w-md rounded-full bg-slate-200/70" />
            </div>
          </div>
        </div>

        {/* ২. ক্লাস ডায়েরি কার্ড গ্রিড স্কেলিটন */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex h-72 flex-col justify-between rounded-3xl border border-sky-100 bg-white p-6 shadow-xs sm:p-8"
            >
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="h-6 w-28 rounded-full bg-sky-100" />
                  <div className="h-5 w-20 rounded-full bg-slate-100" />
                </div>
                <div className="h-6 w-full rounded-xl bg-slate-200/80" />
                <div className="space-y-1.5 pt-1">
                  <div className="h-3.5 w-full rounded-full bg-slate-100" />
                  <div className="h-3.5 w-5/6 rounded-full bg-slate-100" />
                  <div className="h-3.5 w-4/6 rounded-full bg-slate-100" />
                </div>
              </div>
              <div className="border-t border-sky-100/80 pt-4">
                <div className="h-10 w-full rounded-full bg-sky-50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
