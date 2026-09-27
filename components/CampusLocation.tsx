import Reveal from "./Reveal";

export default function CampusLocation() {
  return (
    <section id="contact" className="relative px-4 py-10 sm:px-8 sm:py-14 lg:py-16 lg:px-12 bg-gradient-to-b from-white via-sky-50/40 to-white">
      <div className="mx-auto max-w-7xl">
        {/* সেকশন হেডার (টাইট স্পেসিং সহ) */}
        <Reveal className="mb-6 text-center sm:mb-10">
          <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
            লোকেশন ও যোগাযোগ
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 sm:text-4xl lg:text-[38px]">
            আমাদের একাডেমির ঠিকানা ও গুগল ম্যাপ
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 sm:text-[15px]">
            চৌদ্দগ্রাম সরকারি কলেজ সংলগ্ন লার্নিং সেন্টারে এসে ভর্তি সংক্রান্ত যেকোনো তথ্য বা সরাসরি স্যারের সাথে কথা বলতে পারো।
          </p>
        </Reveal>

        {/* গুগল ম্যাপ ও যোগাযোগের তথ্য কার্ড (মোবাইলে কোনো অযথা ফাঁকা ছাড়া পারফেক্ট প্যাডিং) */}
        <Reveal delay={80}>
          <div className="grid gap-6 overflow-hidden rounded-3xl border border-sky-100 bg-white p-4 shadow-xs lg:grid-cols-[1.2fr_0.8fr] sm:p-6 lg:p-8">
            {/* ১. লাইভ গুগল ম্যাপ এমবেড */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-sky-100/90 lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[300px]">
              <iframe
                title="Ahsan's Learning Academy Location"
                src="https://maps.google.com/maps?q=Chauddagram%20Govt%20College,%20Chauddagram,%20Cumilla&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[15%] contrast-[1.05]"
              />
            </div>

            {/* ২. সঠিক ঠিকানা ও যোগাযোগের তথ্য (নো-ইমোজি, পিউর SVG আইকন) */}
            <div className="flex flex-col justify-between space-y-5">
              <div>
                {/* সেন্টার ব্যাজ */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-sky-50 px-3.5 py-1 font-body text-xs font-bold text-sky-800">
                  <svg className="h-3.5 w-3.5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>প্রধান লার্নিং সেন্টার</span>
                </span>

                <h3 className="mt-3.5 font-body text-xl font-black text-sky-950 sm:text-2xl">
                  Ahsan&apos;s Learning Academy
                </h3>
                <p className="mt-1 font-body text-xs sm:text-[13px] font-semibold text-sky-700">
                  কলেজ রোড, চৌদ্দগ্রাম সরকারি কলেজ সংলগ্ন, চৌদ্দগ্রাম, কুমিল্লা
                </p>

                {/* বিবরণ তালিকা */}
                <div className="mt-5 space-y-3.5 font-body text-xs sm:text-sm text-ink-800/90">
                  {/* দিকনির্দেশনা */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sky-950">দিকনির্দেশনা:</p>
                      <p className="mt-0.5 text-xs text-ink-800/80 leading-relaxed">
                        চৌদ্দগ্রাম সরকারি কলেজ মেইন গেট সংলগ্ন, কলেজ রোড।
                      </p>
                    </div>
                  </div>

                  {/* ক্লাস সময় */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sky-950">ক্লাস সময়:</p>
                      <p className="mt-0.5 text-xs text-ink-800/80 leading-relaxed">
                        সকাল ৭:০০ টা — ৯:৩০ টা এবং বিকাল ৩:০০ টা — ৫:০০ টা (সপ্তাহে ৬ দিন)
                      </p>
                    </div>
                  </div>

                  {/* সরাসরি হটলাইন */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sky-950">সরাসরি হটলাইন:</p>
                      <a
                        href="tel:+8801845435539"
                        className="mt-0.5 inline-block text-xs font-bold text-sky-700 hover:underline"
                      >
                        +880 1845-435539
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* গুগল ম্যাপ রুট দেখার পিল বাটন */}
              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Chauddagram+Govt+College"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-600 py-3 text-center font-body text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-sky-700 active:scale-95"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>গুগল ম্যাপে লোকেশন দেখুন</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
