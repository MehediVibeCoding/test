import Reveal from "./Reveal";

export default function CampusLocation() {
  return (
    <section id="contact" className="bg-sky-100/30 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            লোকেশন ও ক্যাম্পাস
          </span>
          <h2 className="mt-3 text-2xl font-bold text-sky-950 sm:text-3xl lg:text-4xl">
            আমাদের একাডেমির ঠিকানা ও গুগল ম্যাপ
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-xs sm:text-sm text-ink-800/80 leading-relaxed">
            চৌদ্দগ্রাম বাজারে অথবা সরাসরি একাডেমি ক্যাম্পাসে এসে ভর্তি সংক্রান্ত যেকোনো তথ্য
            বা সরাসরি স্যারের সাথে কথা বলতে পারো।
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="grid gap-6 overflow-hidden rounded-2xl border border-sky-100 bg-white p-4 shadow-sm lg:grid-cols-[1.2fr_0.8fr] sm:p-6">
            {/* লাইভ গুগল ম্যাপ এমবেড */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-sky-100/90 lg:aspect-auto lg:h-full min-h-[280px]">
              <iframe
                title="Ahsan's Learning Academy Location"
                src="https://maps.google.com/maps?q=Chauddagram%20Govt%20College,%20Chauddagram,%20Cumilla&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[20%] contrast-[1.05]"
              />
            </div>

            {/* ক্যাম্পাস বিবরণ ও যোগাযোগের তথ্য */}
            <div className="flex flex-col justify-between space-y-5 p-2 sm:p-4">
              <div>
                <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
                  📍 প্রধান ক্যাম্পাস
                </span>
                <h3 className="mt-3 text-lg font-bold text-sky-950 sm:text-xl">
                  Ahsan&apos;s Learning Academy
                </h3>
                <p className="mt-1 text-xs text-sky-700 font-semibold">
                  চৌদ্দগ্রাম সরকারি কলেজ রোড, চৌদ্দগ্রাম, কুমিল্লা
                </p>

                <div className="mt-5 space-y-3 text-xs sm:text-sm text-ink-800/90">
                  <div className="flex items-start gap-3">
                    <span className="text-base text-sky-600">🏢</span>
                    <div>
                      <p className="font-bold text-sky-950">দিকনির্দেশনা:</p>
                      <p className="text-xs text-ink-800/80">
                        চৌদ্দগ্রাম সরকারি কলেজ মেইন গেট সংলগ্ন / বাজার রোড।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-base text-sky-600">⏰</span>
                    <div>
                      <p className="font-bold text-sky-950">ক্লাস ও অফিস সময়:</p>
                      <p className="text-xs text-ink-800/80">
                        সকাল ৮:০০ টা — রাত ৮:০০ টা (সপ্তাহে ৭ দিন)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-base text-sky-600">📞</span>
                    <div>
                      <p className="font-bold text-sky-950">সরাসরি হটলাইন:</p>
                      <a
                        href="tel:+8801845435539"
                        className="text-xs font-bold text-sky-700 hover:underline"
                      >
                        +880 1845-435539
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* সরাসরি গুগল ম্যাপে রুট দেখার বাটন */}
              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Chauddagram+Govt+College"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-sky-700"
                >
                  <span>গুগল ম্যাপ অ্যাপে লোকেশন দেখুন</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
