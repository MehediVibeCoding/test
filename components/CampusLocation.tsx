"use client";

import Reveal from "./Reveal";
import EduDoodles from "./EduDoodles";
import { useApp } from "@/context/AppContext";

export default function CampusLocation() {
  const { t } = useApp();

  return (
    <section
      id="contact"
      className="relative px-4 py-12 sm:px-8 sm:py-16 lg:py-20 lg:px-12 bg-gradient-to-b from-white via-sky-50/40 to-white dark:from-[#070f1a] dark:via-[#091b2e] dark:to-[#070f1a] overflow-hidden transition-colors"
    >
      {/* ব্যাকগ্রাউন্ড এডুকেশন অ্যাকসেন্ট ডুডলস */}
      <EduDoodles variant="section" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* সেকশন হেডার */}
        <Reveal className="mb-8 text-center sm:mb-12">
          <span className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900/60 px-4 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
            {t.location.tag}
          </span>
          <h2 className="mt-3 font-body text-2xl font-black tracking-tight text-sky-950 dark:text-white sm:text-4xl lg:text-[38px]">
            {t.location.title}
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl font-body text-[14px] leading-[1.7] text-ink-800/80 dark:text-slate-300 sm:text-[15px]">
            {t.location.subtitle}
          </p>
        </Reveal>

        {/* গুগল ম্যাপ ও যোগাযোগের তথ্য কার্ড */}
        <Reveal from="zoom" delay={80}>
          <div className="grid gap-6 overflow-hidden rounded-3xl border border-sky-100 dark:border-sky-900/60 bg-white dark:bg-slate-900/85 p-4 shadow-xs backdrop-blur-sm lg:grid-cols-[1.2fr_0.8fr] sm:p-6 lg:p-8">
            {/* লাইভ গুগল ম্যাপ এমবেড */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-sky-100/90 dark:border-slate-800 lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[300px]">
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

            {/* সঠিক ঠিকানা ও যোগাযোগের তথ্য */}
            <div className="flex flex-col justify-between space-y-5">
              <div>
                {/* সেন্টার ব্যাজ */}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/80 dark:border-sky-800 bg-sky-50 dark:bg-sky-950 px-3.5 py-1 font-body text-xs font-bold text-sky-800 dark:text-sky-300">
                  <svg className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{t.location.centerBadge}</span>
                </span>

                <h3 className="mt-3.5 font-body text-xl font-black text-sky-950 dark:text-white sm:text-2xl">
                  {t.location.academyName}
                </h3>
                <p className="mt-1 font-body text-xs sm:text-[13px] font-semibold text-sky-700 dark:text-sky-400">
                  {t.location.address}
                </p>

                {/* বিবরণ তালিকা */}
                <div className="mt-5 space-y-3.5 font-body text-xs sm:text-sm text-ink-800/90 dark:text-slate-300">
                  {/* দিকনির্দেশনা */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-slate-800 text-sky-700 dark:text-sky-300">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sky-950 dark:text-white">{t.location.directionLabel}</p>
                      <p className="mt-0.5 text-xs text-ink-800/80 dark:text-slate-400 leading-relaxed">
                        {t.location.directionText}
                      </p>
                    </div>
                  </div>

                  {/* ক্লাস সময় */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-slate-800 text-sky-700 dark:text-sky-300">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sky-950 dark:text-white">{t.location.classTimeLabel}</p>
                      <p className="mt-0.5 text-xs text-ink-800/80 dark:text-slate-400 leading-relaxed">
                        {t.location.classTimeText}
                      </p>
                    </div>
                  </div>

                  {/* সরাসরি হটলাইন */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-50 dark:bg-slate-800 text-sky-700 dark:text-sky-300">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sky-950 dark:text-white">{t.location.hotlineLabel}</p>
                      <a
                        href="tel:+8801845435539"
                        className="mt-0.5 inline-block text-xs font-bold text-sky-700 dark:text-sky-400 hover:underline"
                      >
                        +880 1845-435539
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* গুগল ম্যাপ রুট দেখার বাটন */}
              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Chauddagram+Govt+College"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-center font-body text-xs sm:text-sm font-bold text-white shadow-sm transition-all active:scale-95"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span>{t.location.mapsBtn}</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
