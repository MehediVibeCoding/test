// 🔧 placeholder social links — swap for real Facebook / YouTube / WhatsApp URLs
const SOCIALS = [
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "WhatsApp", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-sky-950 px-4 py-14 text-cloud-50">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-white">
            Ahsan&apos;s Learning Academy
          </p>
          <p className="mt-2 text-sm text-sky-100">Better Learning, Brighter Future</p>
        </div>

        <div className="text-sm text-sky-100">
          <p className="font-display font-medium text-white">যোগাযোগ</p>
          <p className="mt-2">চৌদ্দগ্রাম, কুমিল্লা</p>
          <p>📞 +880 1845-435539</p>{/* 🔧 confirm number */}
        </div>

        <div className="text-sm text-sky-100">
          <p className="font-display font-medium text-white">সোশ্যাল মিডিয়া</p>
          <ul className="mt-2 space-y-1">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-white transition-colors">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-5xl border-t border-white/10 pt-6 text-xs text-sky-100/70">
        © {new Date().getFullYear()} Ahsan&apos;s Learning Academy. সর্বস্বত্ব সংরক্ষিত।
      </p>
    </footer>
  );
}
