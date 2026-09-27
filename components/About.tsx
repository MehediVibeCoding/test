import Image from "next/image";
import Reveal from "./Reveal";

const CREDENTIALS = [
  {
    title: "চট্টগ্রাম বিশ্ববিদ্যালয় (CU)",
    desc: "উচ্চশিক্ষা সম্পন্ন করে শিক্ষকতা পেশায় ইংরেজি ও আইসিটি বিষয়ের সহজ ও বাস্তবসম্মত পাঠদান।",
    icon: (
      <svg className="h-6 w-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    title: "৮+ বছরের শিক্ষকতার অভিজ্ঞতা",
    desc: "দীর্ঘ শিক্ষকতার মাধ্যমে শিক্ষার্থীদের বিষয়ের ভীতি দূর করে বাস্তব উদাহরণ ও লজিকের সাহায্যে সঠিক দিকনির্দেশনা।",
    icon: (
      <svg className="h-6 w-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "১০,০০০+ শিক্ষার্থীর আস্থা ও সাফল্য",
    desc: "বোর্ড পরীক্ষায় ধারাবাহিক সাফল্য অর্জন এবং প্রতিটি শিক্ষার্থীর মেধার সর্বোচ্চ বিকাশে নিবিড় ক্লাসরুম নার্সিং।",
    icon: (
      <svg className="h-6 w-6 text-sky-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28 lg:px-12 bg-white">
      {/* ১. স্ট্যান্ডার্ড সেকশন হেডার ও সিঙ্গেল-লাইন হেডলাইন */}
      <Reveal className="mb-12 text-center sm:mb-16">
        <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 font-body text-xs font-bold text-sky-800">
          শিক্ষক পরিচিতি
        </span>
        <h2 className="mt-3.5 font-body text-[17px] xs:text-[19px] sm:text-3xl lg:text-4xl font-black tracking-tight text-sky-950 leading-tight whitespace-nowrap sm:whitespace-normal">
          সঠিক দিকনির্দেশনায় প্রতিটি শিক্ষার্থীই প্রতিভাবান
        </h2>
      </Reveal>

      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ২. বাম পাশে: শিক্ষকের ছবি ফ্রেম (কোনো ভাসমান বিসিএস ব্যাজ ছাড়া সম্পূর্ণ ক্লিন) */}
        <Reveal className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm sm:max-w-md">
            <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white p-3 shadow-xs">
              <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-sky-50 to-white">
                <Image
                  src="/images/ahsan-about.webp"
                  alt="Md. Ahsan Ullah — ডেস্কে কর্মরত অবস্থায়"
                  width={900}
                  height={1104}
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.02] select-none"
                />
              </div>

              {/* ছবির নিচের পরিচিতি */}
              <div className="mt-3 rounded-2xl bg-sky-50/70 p-3.5 text-center border border-sky-100/70">
                <p className="font-body text-base font-black text-sky-950">
                  মোঃ আহসান উল্লাহ
                </p>
                <p className="mt-0.5 font-body text-xs font-semibold text-sky-700">
                  প্রতিষ্ঠাতা ও প্রধান মেন্টর, Ahsan&apos;s Learning Academy
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ৩. ডানপাশে: বক্তব্য স্টেটমেন্ট ও ৩টি প্রিমিয়াম কার্ড */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* বক্তব্য কার্ড (কোনো এআই ড্যাশ ছাড়া পিউর বাংলা টেক্সট) */}
          <Reveal delay={80}>
            <div className="rounded-3xl border border-sky-100 bg-sky-50/30 p-6 sm:p-8 shadow-xs">
              <p className="font-body text-[15px] leading-[1.8] text-ink-800 sm:text-base">
                আমি মোঃ আহসান উল্লাহ, চৌদ্দগ্রাম সরকারি কলেজের প্রভাষক এবং ৪০তম বিসিএস (সাধারণ শিক্ষা) ক্যাডারের একজন সদস্য। বিগত ৮ বছর ধরে HSC শিক্ষার্থীদের জন্য ইংরেজি ও আইসিটি বিষয়ের বিশেষায়িত প্রাইভেট পরিচালনা করছি।
              </p>
              <p className="mt-3 font-body text-[15px] leading-[1.8] text-ink-800 sm:text-base">
                আমার প্রতিষ্ঠিত <span className="font-bold text-sky-950">&quot;Ahsan&apos;s Learning Academy&quot;</span>-র মূল লক্ষ্য মুখস্থ করার গতানুগতিক ভয় দূর করে বাস্তব উদাহরণ, লজিক এবং নিবিড় ক্লাসরুম মূল্যায়নের মাধ্যমে শিক্ষার্থীদের মেধার সর্বোচ্চ বিকাশ ঘটানো।
              </p>
            </div>
          </Reveal>

          {/* সুনির্দিষ্ট ৩টি প্রিমিয়াম কার্ড গ্রিড (কোনো ডুপ্লিকেট সাব-ট্যাগ ছাড়া) */}
          <div className="grid gap-4 sm:grid-cols-1">
            {CREDENTIALS.map((item, idx) => (
              <Reveal key={item.title} delay={120 + idx * 60}>
                <div className="group flex items-start gap-4 rounded-3xl border border-sky-100 bg-white p-5 sm:p-6 shadow-xs transition-all duration-300 hover:border-sky-300 hover:shadow-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 transition-colors group-hover:bg-sky-100">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-body text-[15.5px] font-black text-sky-950 sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-body text-[13.5px] leading-relaxed text-ink-800/80">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
