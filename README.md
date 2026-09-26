# কীভাবে এই আপডেটটা তোমার রেপোতে বসাবে

## ধাপ ১ — একটা ফাইল ডিলিট করো
তোমার রেপোতে `app/fonts.ts` ফাইলটা ডিলিট করে দাও। এটা আর দরকার নেই।

## ধাপ ২ — এই ফাইলগুলো কপি করে বসাও
এই zip-এর ভেতরের ফোল্ডার স্ট্রাকচারটা তোমার রেপোর স্ট্রাকচারের সাথে হুবহু মেলে।
প্রতিটা ফাইল তোমার রেপোতে একই পাথে কপি করে বসিয়ে দাও (থাকলে ওভাররাইট করে দাও):

```
app/actions/admission.ts        ← নতুন ফাইল
app/globals.css                 ← আপডেট
app/layout.tsx                  ← আপডেট
app/page.tsx                    ← আপডেট
components/AdmissionForm.tsx    ← আপডেট
components/Batches.tsx          ← আপডেট
components/BatchesClient.tsx    ← নতুন ফাইল
components/BlogPreview.tsx      ← আপডেট
components/ClassDiary.tsx       ← আপডেট
components/ClassDiaryClient.tsx ← নতুন ফাইল
lib/academyData.ts              ← নতুন ফাইল
lib/bengaliNumerals.ts          ← আপডেট
lib/supabase/client.ts          ← নতুন ফাইল
lib/supabase/server.ts          ← নতুন ফাইল
```

## ধাপ ৩ — Vercel-এ Environment Variable যোগ করো (বাধ্যতামূলক, নিচের মেসেজে বিস্তারিত)

## ধাপ ৪ — কমিট ও পুশ করো
```
git add .
git commit -m "Connect admission form, batches, blog and class diary to Supabase"
git push
```
Vercel অটোমেটিক নতুন বিল্ড শুরু করবে।
