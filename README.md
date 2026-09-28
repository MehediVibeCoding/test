# Ahsan's Learning Academy — মূল ওয়েবসাইট

Next.js 16 (App Router) + React 19 + Supabase। শিক্ষার্থীরা ভর্তি ফর্ম পূরণ করে ও রিভিউ দেয়।
অ্যাডমিন প্যানেল আলাদা রিপোতে: `babago`।

## চালানো
```bash
cp .env.example .env.local   # তিনটি মান বসান
npm install
npm run dev
```
`npm run typecheck`, `npm run lint`, `npm run build` — তিনটিই পাস করতে হবে (CI-তেও চলে)।

## গুরুত্বপূর্ণ ডিজাইন সিদ্ধান্ত
- **কুকি নেই, লগইন নেই।** পাবলিক ডেটা সাধারণ anon ক্লায়েন্টে পড়া হয় (`lib/supabase/server.ts`), তাই পেজগুলো ISR দিয়ে ক্যাশ হয় (৬০ সেকেন্ড)। অ্যাডমিনে বদলালে সর্বোচ্চ ১ মিনিটে সাইটে দেখা যায়।
- **স্প্যাম সুরক্ষা ডাটাবেজে।** ২ ঘণ্টায় একই ফোন থেকে একটির বেশি আবেদন, ১০ মিনিটে ৪০টির বেশি আবেদন, ২৪ ঘণ্টায় একই নামে ২টির বেশি রিভিউ — সব ডাটাবেজ ট্রিগার আটকায় (`supabase/SECURITY_MIGRATION_NOTES.sql`)।
- **ফন্ট নিজের সার্ভার থেকে** (`@fontsource` + `app/fonts`) — Google Fonts-এ কোনো রিকোয়েস্ট নেই।
- **ছবি:** Cloudinary ছবিতে `f_auto,q_auto,w_N` যোগ হয় (`lib/image.ts`)।
- **CSP ও সিকিউরিটি হেডার** `next.config.js`-এ। নতুন বাইরের সার্ভিস (যেমন নতুন ছবির হোস্ট বা এমবেড) যোগ করলে CSP-তে অনুমতি দিন।

## Vercel Environment Variables
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`
