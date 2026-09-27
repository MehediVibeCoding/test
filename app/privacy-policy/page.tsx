import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি | Ahsan's Learning Academy",
  description:
    "Ahsan's Learning Academy কীভাবে শিক্ষার্থী ও অভিভাবকদের তথ্য সংগ্রহ, ব্যবহার ও সংরক্ষণ করে তার বিস্তারিত।",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-cloud-50 text-ink-800">
      <Navbar />

      <section className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-sky-100 px-3.5 py-1 text-xs font-bold text-sky-800">
            নীতিমালা
          </span>
          <h1 className="mt-3 font-body text-2xl font-black text-sky-950 sm:text-3xl lg:text-4xl">
            গোপনীয়তা নীতি
          </h1>
          <p className="mt-2 text-xs text-muted">সর্বশেষ হালনাগাদ: সেপ্টেম্বর ২০২৬</p>
        </div>

        <div className="space-y-8 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm sm:p-10">
          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">১. এই নীতিটি কেন</h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              এই ওয়েবসাইট (Ahsan&apos;s Learning Academy) ভর্তি ফরম ও মতামত ফরমের মাধ্যমে
              শিক্ষার্থী ও অভিভাবকদের কিছু ব্যক্তিগত তথ্য সংগ্রহ করে। এই তথ্যগুলো ঠিক কী কারণে
              নেওয়া হয়, কীভাবে সংরক্ষণ করা হয় এবং কীভাবে ব্যবহার করা হয় তা এখানে স্পষ্টভাবে
              জানানো হলো।
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">
              ২. কী কী তথ্য সংগ্রহ করা হয়
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              <li>ভর্তি ফরম পূরণের সময়: শিক্ষার্থীর নাম, কলেজের নাম, কলেজ রোল, বিভাগ, কাঙ্ক্ষিত ব্যাচ, শিক্ষার্থীর ফোন/WhatsApp নম্বর ও অভিভাবকের মোবাইল নম্বর।</li>
              <li>মতামত/রিভিউ ফরম পূরণের সময়: নাম, পরিচয় (শিক্ষার্থী/অভিভাবক), ব্যাচ বা শিক্ষাবর্ষ এবং লেখা মতামত।</li>
              <li>ব্রাউজারে সাময়িকভাবে (localStorage) — শুধুমাত্র আপনার জমা দেওয়া রিভিউ অনুমোদনের অপেক্ষায় আছে কিনা তা মনে রাখতে; এটি অন্য কারও কাছে দৃশ্যমান হয় না।</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">
              ৩. তথ্যগুলো কী কাজে ব্যবহার করা হয়
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              <li>ভর্তি নিশ্চিত করতে ও ব্যাচ/ক্লাসের সময় সম্পর্কে যোগাযোগ করতে।</li>
              <li>শিক্ষার্থীর উপস্থিতি ও পরীক্ষার ফলাফল অভিভাবকদের জানাতে।</li>
              <li>ওয়েবসাইটে (অনুমোদনের পর) মতামত/রিভিউ প্রকাশ করতে — এক্ষেত্রে শুধু নাম, পরিচয় ও লেখা মতামত প্রকাশ্যে দেখানো হয়, ফোন নম্বর কখনো প্রকাশ্যে দেখানো হয় না।</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">
              ৪. তথ্য সংরক্ষণ ও নিরাপত্তা
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              সংগ্রহ করা তথ্য নিরাপদ ডাটাবেজে সংরক্ষণ করা হয় এবং শুধুমাত্র একাডেমি পরিচালনার
              প্রয়োজনে ব্যবহৃত হয়। এই তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি করা হয় না বা
              বিজ্ঞাপনের উদ্দেশ্যে শেয়ার করা হয় না।
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">
              ৫. অভিভাবকদের ভূমিকা
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              যেহেতু আমাদের অধিকাংশ শিক্ষার্থী HSC পর্যায়ের এবং সাবালক নয়, তাই ভর্তি ফরমে
              অভিভাবকের মোবাইল নম্বর নেওয়া হয় যাতে অভিভাবকরাও শিক্ষার্থীর অগ্রগতি সম্পর্কে
              নিয়মিত অবগত থাকতে পারেন।
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">
              ৬. তথ্য পরিবর্তন বা মুছে ফেলার অনুরোধ
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              জমা দেওয়া কোনো তথ্য সংশোধন বা মুছে ফেলতে চাইলে সরাসরি ফোন বা WhatsApp-এর
              মাধ্যমে (+880 1845-435539) যোগাযোগ করলেই ব্যবস্থা নেওয়া হবে।
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-sky-950 sm:text-lg">
              ৭. নীতির পরিবর্তন
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-800/85 sm:text-sm">
              প্রয়োজন অনুযায়ী এই গোপনীয়তা নীতি ভবিষ্যতে হালনাগাদ করা হতে পারে। কোনো
              গুরুত্বপূর্ণ পরিবর্তন হলে এই পেজেই তা জানিয়ে দেওয়া হবে।
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
