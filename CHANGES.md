# কী আছে এই জিপে

জিপের ভেতরের ফোল্ডার স্ট্রাকচার তোমার repo-এর সাথে হুবহু মিলে যায় — এক্সট্র্যাক্ট করে
সরাসরি প্রজেক্টের রুটে পেস্ট করলেই পুরনো ফাইলগুলো ওভাররাইট হয়ে যাবে।

## নতুন ফাইল
- app/fonts.ts
- components/Reveal.tsx
- public/images/ahsan-hero.webp
- public/images/ahsan-about.webp

## আপডেট হওয়া ফাইল (পুরোনোটা রিপ্লেস হবে)
- app/layout.tsx
- app/globals.css
- tailwind.config.ts
- components/Hero.tsx
- components/About.tsx
- components/Navbar.tsx
- components/Footer.tsx
- components/Batches.tsx
- components/ClassDiary.tsx
- components/VideoGallery.tsx
- components/BlogPreview.tsx
- components/Testimonials.tsx
- components/AdmissionForm.tsx

## পেস্ট করার পর
1. `npm install` (নতুন কোনো প্যাকেজ যোগ হয়নি, শুধু sanity-এর জন্য)
2. `npm run build` — লোকালি বা Vercel-এ deploy দিলেই ফন্ট (Playfair Display /
   DM Sans / Hind Siliguri) নিজে থেকে ডাউনলোড হয়ে বিল্ড হয়ে যাবে।
3. যদি কোথাও লেআউট/ছবি ভাঙা দেখায়, স্ক্রিনশট পাঠিয়ো — সাথে সাথে ঠিক করে দেব।

## মনে রাখার মতো
- 🔧 চিহ্নিত জায়গাগুলো এখনও placeholder/demo ডেটা (ফোন নম্বর, সোশ্যাল লিংক,
  ব্যাচ শিডিউল, শিক্ষাগত যোগ্যতার ইউনিভার্সিটি নাম) — কনফার্ম করা তথ্য দিলে
  পরের রাউন্ডে বসিয়ে দেব।
- Navbar-এর লিংকগুলো এখন পেজের ভেতরের সেকশনে (#about, #batches ইত্যাদি) স্ক্রল
  করে, আগে যেমন ভুল রুটে (/about) যাচ্ছিল সেটা ঠিক করা হয়েছে।
