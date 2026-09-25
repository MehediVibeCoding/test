// 🔧 placeholder social links — swap for real Facebook / YouTube / WhatsApp URLs
const SOCIALS = [
  {
    label: "Facebook",
    href: "#",
    path: "M13 9h2V6h-2c-1.7 0-3 1.3-3 3v2H8v3h2v7h3v-7h2.2l.8-3H13V9z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M21 8.5s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.3 5.3 12 5.3 12 5.3s-3.3 0-6.1.2c-.4.1-1.3.1-2.1.9C3.2 7 3 8.5 3 8.5S2.8 10.2 2.8 12v1.9c0 1.8.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9 1.7.2 7 .2 7 .2s3.3 0 6.1-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5V12c0-1.8-.2-3.5-.2-3.5zM10 15V9l5 3-5 3z",
  },
  {
    label: "WhatsApp",
    href: "#",
    path: "M12 3a9 9 0 00-7.8 13.4L3 21l4.7-1.2A9 9 0 1012 3zm4.7 12.8c-.2.5-1.1 1-1.5 1.1-.4.1-.9.1-1.4-.1-.3-.1-.8-.3-1.3-.5-2.3-.9-3.8-3.3-3.9-3.4-.1-.2-.9-1.3-.9-2.4s.6-1.7.8-1.9c.2-.2.5-.3.6-.3h.5c.1 0 .3 0 .5.4.2.5.6 1.6.7 1.7 0 .1.1.3 0 .4-.1.2-.1.3-.2.4-.1.2-.2.3-.3.4-.1.1-.2.2-.1.4.2.3.6.9 1.2 1.5.8.7 1.5.9 1.7 1 .2.1.3.1.4 0 .1-.1.5-.6.6-.8.2-.2.3-.2.5-.1.2.1 1.3.6 1.5.7.2.1.4.1.4.3 0 .1 0 .5-.2 1z",
  },
];

const NAV_LINKS = [
  { label: "পরিচিতি", href: "#about" },
  { label: "ব্যাচসমূহ", href: "#batches" },
  { label: "ক্লাস ডায়েরি", href: "#class-diary" },
  { label: "ভর্তি ফর্ম", href: "#admission" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-sky-950 px-4 pb-10 pt-16 text-cloud-50">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(56,189,248,0.6), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-lg font-semibold text-white">
            Ahsan&apos;s Learning Academy
          </p>
          <p className="mt-2 max-w-xs text-sm text-sky-100/80">
            Better Learning, Brighter Future — HSC English &amp; ICT-এ
            শিক্ষার্থীদের সঠিক দিকনির্দেশনা।
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sky-100 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-sky-400/40 hover:bg-sky-600 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="text-sm text-sky-100/80">
          <p className="font-display font-medium text-white">লিংক</p>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-sky-100/80">
          <p className="font-display font-medium text-white">যোগাযোগ</p>
          <ul className="mt-3 space-y-2.5">
            <li className="flex items-start gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 flex-shrink-0 text-sky-400"
              >
                <path
                  d="M12 21s7-6.1 7-11.5A7 7 0 105 9.5C5 14.9 12 21 12 21z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              চৌদ্দগ্রাম, কুমিল্লা
            </li>
            <li className="flex items-start gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 flex-shrink-0 text-sky-400"
              >
                <path
                  d="M3 5.5C3 4.7 3.7 4 4.5 4H7l1.5 4-2 1.5c1 2.5 3 4.5 5.5 5.5l1.5-2 4 1.5v2.5c0 .8-.7 1.5-1.5 1.5C10.6 18.5 5.5 13.4 3 8.5V5.5z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              +880 1845-435539 {/* 🔧 confirm number */}
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-5xl border-t border-white/10 pt-6 text-xs text-sky-100/60">
        © {new Date().getFullYear()} Ahsan&apos;s Learning Academy. সর্বস্বত্ব সংরক্ষিত।
      </p>
    </footer>
  );
}
