import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ব্যবহারের শর্তাবলী | Ahsan's Learning Academy",
  description: "Ahsan's Learning Academy ওয়েবসাইট ব্যবহারের নিয়ম ও শর্তাবলী।",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cloud-50 text-ink-800">
      <Navbar />

      <section className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            নীতিমালা
          </span>
          <h1 className="mt-3 font-body text-2xl font-black text-sky-950 sm:text-3xl lg:text-4xl">
            ব্যবহারের শর্তাবলী
          </h1>
          <p className="mt-2 text-xs text-muted">সর্বশেষ হালনাগাদ: সেপ্টেম্বর ২০২৬</p>
        </div>

        <div className="space-y-8 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm sm:p-10">
          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">১. ওয়েবসাইট সম্পর্কে</h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              এই ওয়েবসাইট (Ahsan&apos;s Learning Academy) মোঃ আহসান উল্লাহ পরিচালিত একটি
              ব্যক্তিগত প্রাইভেট ব্যাচ/লার্নিং সেন্টারের তথ্য, ক্লাস ডায়েরি, ভিডিও লেকচার ও
              ভর্তি সংক্রান্ত সেবা প্রদানের জন্য তৈরি। এটি কোনো সরকারি প্রতিষ্ঠান বা কলেজের
              অফিসিয়াল ওয়েবসাইট নয়।
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">
              ২. কনটেন্টের ব্যবহার
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              এই ওয়েবসাইটের ক্লাস নোট, ব্লগ, ভিডিও ও অন্যান্য শিক্ষামূলক কনটেন্ট শুধুমাত্র
              ব্যক্তিগত শিক্ষার উদ্দেশ্যে ব্যবহারের জন্য। পূর্বানুমতি ছাড়া কোনো কনটেন্ট বাণিজ্যিক
              উদ্দেশ্যে পুনঃপ্রকাশ বা পুনর্বিতরণ করা যাবে না।
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">
              ৩. ভর্তি ফরম ও যোগাযোগ
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              ওয়েবসাইটের ভর্তি ফরম পূরণ করলেই স্বয়ংক্রিয়ভাবে আসন নিশ্চিত হয়ে যায় না — ফরম জমা
              দেওয়ার পর ফোন বা WhatsApp-এর মাধ্যমে সরাসরি যোগাযোগ করে ব্যাচ ও ক্লাসের সময়
              চূড়ান্তভাবে নিশ্চিত করা হয়। সঠিক ও হালনাগাদ তথ্য দেওয়ার দায়িত্ব আবেদনকারীর।
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">
              ৪. মতামত ও রিভিউ
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              ওয়েবসাইটে জমা দেওয়া মতামত/রিভিউ প্রকাশের আগে পর্যালোচনা করা হয়। আপত্তিকর,
              মিথ্যা বা অপ্রাসঙ্গিক মতামত প্রকাশ না করার অধিকার কর্তৃপক্ষ সংরক্ষণ করে।
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">
              ৫. বহিঃসংযোগ (External Links)
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              এই ওয়েবসাইটে ইউটিউব, ফেসবুক বা অন্য কোনো বহিঃসংযোগ থাকতে পারে। ওই সব
              প্ল্যাটফর্মের নিজস্ব শর্তাবলী ও গোপনীয়তা নীতির জন্য Ahsan&apos;s Learning
              Academy দায়ী নয়।
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">
              ৬. শর্তাবলীর পরিবর্তন
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              প্রয়োজন অনুযায়ী এই শর্তাবলী ভবিষ্যতে হালনাগাদ করা হতে পারে। কোনো প্রশ্ন থাকলে
              সরাসরি ফোন বা WhatsApp-এ (+880 1845-435539) যোগাযোগ করা যাবে।
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
