"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { LazyMotion, MotionConfig } from "motion/react";
import RippleProvider from "@/components/RippleProvider";

export type Language = "bn" | "en";
export type Theme = "light" | "dark";

export interface Translations {
  nav: {
    about: string;
    whyUs: string;
    batches: string;
    classDiary: string;
    videos: string;
    contact: string;
    enrollBtn: string;
  };
  hero: {
    teacherName: string;
    roleTitle: string;
    designation: string;
    heroSubtitle: string;
    statExp: string;
    statExpLabel: string;
    statStudents: string;
    statStudentsLabel: string;
    statSyllabus: string;
    statSyllabusLabel: string;
    enrollCta: string;
    diaryCta: string;
  };
  about: {
    tag: string;
    headline: string;
    bioP1: string;
    bioP2: string;
    founderTitle: string;
    cuTitle: string;
    cuDesc: string;
    expTitle: string;
    expDesc: string;
    studentsTitle: string;
    studentsDesc: string;
  };
  whyUs: {
    tag: string;
    title: string;
    subtitle: string;
  };
  batches: {
    tag: string;
    title: string;
    subtitle: string;
    enrollBtn: string;
  };
  memories: {
    tag: string;
    title: string;
    subtitle: string;
    allTag: string;
  };
  videos: {
    tag: string;
    title: string;
    subtitle: string;
    emptyText: string;
    emptySubtext: string;
  };
  blog: {
    tag: string;
    title: string;
    subtitle: string;
    viewAll: string;
    readMore: string;
  };
  testimonials: {
    tag: string;
    title: string;
    subtitle: string;
    feedbackCta: string;
    limitReached: string;
    rejectedNoticeTitle: string;
    rejectedNoticeDesc: string;
    modalTitle: string;
    modalSubtitle: string;
    nameLabel: string;
    roleLabel: string;
    batchLabel: string;
    quoteLabel: string;
    cancelBtn: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    studentOption: string;
    guardianOption: string;
  };
  successWall: {
    tag: string;
    title: string;
    subtitle: string;
    emptyText: string;
    emptySubtext: string;
  };
  location: {
    tag: string;
    title: string;
    subtitle: string;
    centerBadge: string;
    academyName: string;
    address: string;
    directionLabel: string;
    directionText: string;
    classTimeLabel: string;
    classTimeText: string;
    hotlineLabel: string;
    mapsBtn: string;
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
  };
  admission: {
    tag: string;
    title: string;
    subtitle: string;
    thankYou: string;
    successMsg: string;
    studentName: string;
    collegeName: string;
    rollNumber: string;
    group: string;
    selectedBatch: string;
    studentPhone: string;
    guardianPhone: string;
    selectGroupPlaceholder: string;
    selectBatchPlaceholder: string;
    scienceGroup: string;
    humanitiesGroup: string;
    businessGroup: string;
    submitBtn: string;
    submittingBtn: string;
  };
  footer: {
    brandTag: string;
    vision: string;
    quickLinks: string;
    campusContact: string;
    privacy: string;
    terms: string;
    rights: string;
    developedBy: string;
    langSwitch: string;
    themeSwitch: string;
  };
}

const translations: Record<Language, Translations> = {
  bn: {
    nav: {
      about: "পরিচিতি",
      whyUs: "কেন একাডেমি",
      batches: "ব্যাচসমূহ",
      classDiary: "ক্লাস ডায়েরি",
      videos: "ভিডিও",
      contact: "যোগাযোগ",
      enrollBtn: "ভর্তি হও",
    },
    hero: {
      teacherName: "Md. Ahsan Ullah",
      roleTitle: "প্রতিষ্ঠাতা ও মেন্টর — Ahsan's Learning Academy",
      designation: "প্রভাষক, চৌদ্দগ্রাম সরকারি কলেজ · ৪০তম বিসিএস (সাধারণ শিক্ষা ক্যাডার)",
      heroSubtitle:
        "ইংরেজি ও আইসিটির মতো গুরুত্বপূর্ণ বিষয়ে HSC শিক্ষার্থীদের ভীতি দূর করে বাস্তবধর্মী টেকনিক, নিয়মিত প্র্যাকটিস ও সঠিক গাইডলাইনের মাধ্যমে বোর্ড পরীক্ষায় সর্বোচ্চ ফলাফল অর্জনে আন্তরিকভাবে সহায়তা করা হয়।",
      statExp: "৮+ বছর",
      statExpLabel: "শিক্ষকতা অভিজ্ঞতা",
      statStudents: "১০,০০০+",
      statStudentsLabel: "শিক্ষার্থীকে পাঠদান",
      statSyllabus: "১০০%",
      statSyllabusLabel: "বোর্ড সিলেবাস কেয়ার",
      enrollCta: "প্রাইভেট ব্যাচে ভর্তি হও",
      diaryCta: "আজকের ক্লাস নোট দেখো",
    },
    about: {
      tag: "শিক্ষক পরিচিতি",
      headline: "সঠিক দিকনির্দেশনায় প্রতিটি শিক্ষার্থীই প্রতিভাবান",
      bioP1:
        "আমি মোঃ আহসান উল্লাহ, চৌদ্দগ্রাম সরকারি কলেজের প্রভাষক এবং ৪০তম বিসিএস (সাধারণ শিক্ষা) ক্যাডারের একজন সদস্য। বিগত ৮ বছর ধরে HSC শিক্ষার্থীদের জন্য ইংরেজি ও আইসিটি বিষয়ের বিশেষায়িত প্রাইভেট পরিচালনা করছি।",
      bioP2:
        'আমার প্রতিষ্ঠিত "Ahsan\'s Learning Academy"-র মূল লক্ষ্য মুখস্থ করার গতানুগতিক ভয় দূর করে বাস্তব উদাহরণ, লজিক এবং নিবিড় ক্লাসরুম মূল্যায়নের মাধ্যমে শিক্ষার্থীদের মেধার সর্বোচ্চ বিকাশ ঘটানো।',
      founderTitle: "প্রতিষ্ঠাতা ও প্রধান মেন্টর, Ahsan's Learning Academy",
      cuTitle: "চট্টগ্রাম বিশ্ববিদ্যালয় (CU)",
      cuDesc: "উচ্চশিক্ষা সম্পন্ন করে শিক্ষকতা পেশায় ইংরেজি ও আইসিটি বিষয়ের সহজ ও বাস্তবসম্মত পাঠদান।",
      expTitle: "৮+ বছরের শিক্ষকতার অভিজ্ঞতা",
      expDesc: "দীর্ঘ শিক্ষকতার মাধ্যমে শিক্ষার্থীদের বিষয়ের ভীতি দূর করে বাস্তব উদাহরণ ও লজিকের সাহায্যে সঠিক দিকনির্দেশনা।",
      studentsTitle: "১০,০০০+ শিক্ষার্থীর আস্থা ও সাফল্য",
      studentsDesc: "বোর্ড পরীক্ষায় ধারাবাহিক সাফল্য অর্জন এবং প্রতিটি শিক্ষার্থীর মেধার সর্বোচ্চ বিকাশে নিবিড় ক্লাসরুম নার্সিং।",
    },
    whyUs: {
      tag: "আমাদের বিশেষত্ব",
      title: "কেন আমাদের একাডেমিতে পড়বে?",
      subtitle: "আমরা শুধু গতানুগতিক পড়াই না; প্রতিটি শিক্ষার্থীর শেখার ধরন বুঝে যত্ন নিয়ে বোর্ড পরীক্ষার সর্বোচ্চ ফলাফলের জন্য গড়ে তুলি।",
    },
    batches: {
      tag: "অফলাইন ও প্রাইভেট ব্যাচ",
      title: "চলমান ব্যাচসমূহ (HSC 27 ও HSC 28)",
      subtitle: "তোমার সুবিধামতো ব্যাচ নির্বাচন করে আসন নিশ্চিত করো। প্রতিটি ব্যাচে নির্দিষ্ট সংখ্যক শিক্ষার্থী নিয়ে যত্নসহকারে পড়ানো হয়।",
      enrollBtn: "ভর্তি ফরম পূরণ করো",
    },
    memories: {
      tag: "বিদায় সংবর্ধনা ও স্মৃতি",
      title: "যে মুহূর্তগুলো আমাদের গর্বিত করে",
      subtitle: "বিদায় অনুষ্ঠানের আবেগঘন মুহূর্ত এবং শিক্ষকের সাথে শিক্ষার্থীদের আন্তরিক বন্ধন।",
      allTag: "সব স্মৃতি",
    },
    videos: {
      tag: "ভিডিও ক্লাস লেকচার",
      title: "সর্বশেষ ভিডিও লেকচার",
      subtitle: "ইংরেজি ও আইসিটির গুরুত্বপূর্ণ টপিকের সহজ ব্যাখ্যা ও বোর্ড প্রশ্ন সমাধানের ভিডিও ক্লাসসমূহ।",
      emptyText: "শীঘ্রই নতুন ভিডিও লেকচার যুক্ত হবে",
      emptySubtext: "ইউটিউব ও ফেসবুকে আমাদের ভিডিও ক্লাসগুলো দেখতে থাকুন।",
    },
    blog: {
      tag: "স্টাডি টিপস ও গাইডলাইন",
      title: "সাম্প্রতিক ব্লগ ও আর্টিকেল",
      subtitle: "পড়াশোনার কৌশল, সিলেবাস বিশ্লেষণ ও বোর্ড পরীক্ষার প্রস্তুতি নিয়ে গুরুত্বপূর্ণ দিকনির্দেশনা।",
      viewAll: "সব ব্লগ দেখুন",
      readMore: "সম্পূর্ণ আর্টিকেল পড়ুন",
    },
    testimonials: {
      tag: "শিক্ষার্থী ও অভিভাবক প্রতিক্রিয়া",
      title: "শিক্ষার্থী ও অভিভাবকরা যা বলেন",
      subtitle: "আমাদের একাডেমি থেকে পড়ে শিক্ষার্থী ও অভিভাবকদের বাস্তব অভিজ্ঞতা ও অভিমত।",
      feedbackCta: "আপনার মতামত ও পড়ার অভিজ্ঞতা শেয়ার করুন",
      limitReached: "আজকের রিভিউ লিমিট পূর্ণ হয়েছে",
      rejectedNoticeTitle: "আপনার পূর্ববর্তী রিভিউটি পর্যালোচনার পর বাতিল করা হয়েছে",
      rejectedNoticeDesc: "নীতিমালা অনুযায়ী প্রাসঙ্গিক অভিজ্ঞতা নিয়ে আপনি নতুন রিভিউ প্রদান করতে পারবেন।",
      modalTitle: "আপনার মতামত বা অভিজ্ঞতা লিখুন",
      modalSubtitle: "ক্লাসের অভিজ্ঞতা ও স্যারের পাঠদান সম্পর্কে আপনার মতামত",
      nameLabel: "আপনার পূর্ণ নাম",
      roleLabel: "আপনার ভূমিকা",
      batchLabel: "ব্যাচ বা শিক্ষাবর্ষ",
      quoteLabel: "আপনার মতামত বা রিভিউ বক্তব্য",
      cancelBtn: "বাতিল",
      submitBtn: "মতামত জমা দিন",
      successTitle: "মতামত সফলভাবে জমা হয়েছে",
      successDesc: "আপনার মূল্যবান অভিজ্ঞতা শেয়ার করার জন্য ধন্যবাদ। অ্যাডমিন অনুমোদনের পর এটি ওয়েবসাইটে যুক্ত হবে।",
      studentOption: "শিক্ষার্থী",
      guardianOption: "অভিভাবক",
    },
    successWall: {
      tag: "সাফল্যের গল্প",
      title: "কৃতি শিক্ষার্থীদের দেয়াল",
      subtitle: "আমাদের একাডেমি থেকে পড়ে যারা বোর্ড পরীক্ষায় সেরা ফলাফল অর্জন করেছে, তাদের নিয়ে আমাদের অহংকার।",
      emptyText: "শীঘ্রই কৃতি শিক্ষার্থীদের তালিকা প্রকাশিত হবে",
      emptySubtext: "বোর্ড পরীক্ষার ফলাফল প্রকাশের পর এই দেয়াল হালনাগাদ করা হবে।",
    },
    location: {
      tag: "লোকেশন ও যোগাযোগ",
      title: "আমাদের একাডেমির ঠিকানা ও গুগল ম্যাপ",
      subtitle: "চৌদ্দগ্রাম সরকারি কলেজ সংলগ্ন লার্নিং সেন্টারে এসে ভর্তি সংক্রান্ত যেকোনো তথ্য বা সরাসরি স্যারের সাথে কথা বলতে পারো।",
      centerBadge: "প্রধান লার্নিং সেন্টার",
      academyName: "Ahsan's Learning Academy",
      address: "কলেজ রোড, চৌদ্দগ্রাম সরকারি কলেজ সংলগ্ন, চৌদ্দগ্রাম, কুমিল্লা",
      directionLabel: "দিকনির্দেশনা:",
      directionText: "চৌদ্দগ্রাম সরকারি কলেজ মেইন গেট সংলগ্ন, কলেজ রোড।",
      classTimeLabel: "ক্লাস সময়:",
      classTimeText: "সকাল ৭:০০ টা — ৯:৩০ টা এবং বিকাল ৩:০০ টা — ৫:০০ টা (সপ্তাহে ৬ দিন)",
      hotlineLabel: "সরাসরি হটলাইন:",
      mapsBtn: "গুগল ম্যাপে লোকেশন দেখুন",
    },
    faq: {
      tag: "সাধারণ জিজ্ঞাসা",
      title: "ভর্তির আগে যা জানা দরকার",
      subtitle: "ভর্তি সংক্রান্ত কোনো দ্বিধা থাকলে নিচে সচরাচর জিজ্ঞাসিত প্রশ্নগুলোর উত্তর দেখে নাও।",
    },
    admission: {
      tag: "ভর্তি আবেদন",
      title: "প্রাইভেট ব্যাচে আসন নিশ্চিত করো",
      subtitle: "তোমার সঠিক তথ্য দিয়ে নিচের ফরমটি পূরণ করো। একাডেমি থেকে দ্রুত তোমার সাথে যোগাযোগ করে ব্যাচ ও ক্লাসের সময় কনফার্ম করা হবে।",
      thankYou: "ধন্যবাদ",
      successMsg: "তোমার আবেদনের তথ্য সফলভাবে সংরক্ষণ করা হয়েছে। একাডেমি থেকে দ্রুত তোমার সাথে কল অথবা হোয়াটসঅ্যাপে যোগাযোগ করে ব্যাচ কনফার্ম করা হবে।",
      studentName: "শিক্ষার্থীর পূর্ণ নাম",
      collegeName: "কলেজের নাম",
      rollNumber: "কলেজ রোল নম্বর",
      group: "বিভাগ / গ্রুপ",
      selectedBatch: "কাঙ্ক্ষিত ব্যাচ",
      studentPhone: "শিক্ষার্থীর ফোন / WhatsApp নম্বর",
      guardianPhone: "অভিভাবকের মোবাইল নম্বর",
      selectGroupPlaceholder: "বিভাগ সিলেক্ট করুন",
      selectBatchPlaceholder: "ব্যাচ সিলেক্ট করুন",
      scienceGroup: "বিজ্ঞান বিভাগ",
      humanitiesGroup: "মানবিক বিভাগ",
      businessGroup: "ব্যবসায় শিক্ষা বিভাগ",
      submitBtn: "ভর্তি আবেদন জমা দিন",
      submittingBtn: "জমা হচ্ছে...",
    },
    footer: {
      brandTag: "Better Learning, Brighter Future",
      vision: "উচ্চমাধ্যমিক শিক্ষার্থীদের ইংরেজি ও আইসিটি বিষয়ে মৌলিক ধারণা স্পষ্টকরণ এবং বোর্ড পরীক্ষার সর্বোচ্চ প্রস্তুতির জন্য একটি নির্ভরযোগ্য ও আধুনিক শিক্ষা প্ল্যাটফর্ম।",
      quickLinks: "প্রয়োজনীয় লিংক",
      campusContact: "ক্যাম্পাস ও যোগাযোগ",
      privacy: "গোপনীয়তা নীতি",
      terms: "ব্যবহারের শর্তাবলী",
      rights: "সর্বস্বত্ব সংরক্ষিত।",
      developedBy: "Developed by",
      langSwitch: "Language: English",
      themeSwitch: "Dark Mode",
    },
  },
  en: {
    nav: {
      about: "About",
      whyUs: "Why Us",
      batches: "Batches",
      classDiary: "Class Diary",
      videos: "Videos",
      contact: "Contact",
      enrollBtn: "Enroll Now",
    },
    hero: {
      teacherName: "Md. Ahsan Ullah",
      roleTitle: "Founder & Lead Mentor — Ahsan's Learning Academy",
      designation: "Lecturer, Chauddagram Govt. College · 40th BCS (General Education Cadre)",
      heroSubtitle:
        "Empowering HSC students to conquer English and ICT through real-world techniques, structured practice, and dedicated mentorship for achieving top board exam results.",
      statExp: "8+ Years",
      statExpLabel: "Teaching Experience",
      statStudents: "10,000+",
      statStudentsLabel: "Students Mentored",
      statSyllabus: "100%",
      statSyllabusLabel: "Board Syllabus Care",
      enrollCta: "Enroll in Private Batch",
      diaryCta: "View Today's Class Notes",
    },
    about: {
      tag: "Teacher Profile",
      headline: "With the right mentorship, every student has the potential to excel",
      bioP1:
        "I am Md. Ahsan Ullah, Lecturer at Chauddagram Govt. College and an officer of the 40th BCS (General Education Cadre). For the past 8+ years, I have been mentoring HSC students with specialized care in English and ICT.",
      bioP2:
        'My academy, "Ahsan\'s Learning Academy", is dedicated to replacing rote memorization with conceptual clarity, practical examples, logical reasoning, and rigorous classroom evaluation to unlock every student\'s peak academic potential.',
      founderTitle: "Founder & Lead Mentor, Ahsan's Learning Academy",
      cuTitle: "University of Chittagong (CU)",
      cuDesc: "Graduated with academic excellence, applying structured and lucid pedagogy to HSC English & ICT curricula.",
      expTitle: "8+ Years of Proven Pedagogy",
      expDesc: "Helping thousands of students overcome subject anxiety through clear logic, analytical frameworks, and personalized attention.",
      studentsTitle: "10,000+ Students Trusted",
      studentsDesc: "Consistent top GPA-5 track record in board examinations through intensive classroom nursing and evaluation.",
    },
    whyUs: {
      tag: "Our Specialties",
      title: "Why Study at Our Academy?",
      subtitle: "We go beyond conventional coaching by adapting to each student's unique learning pace for top board results.",
    },
    batches: {
      tag: "Offline & Private Batches",
      title: "Active Batches (HSC 27 & HSC 28)",
      subtitle: "Choose your preferred batch and secure your seat. Small class sizes ensure personalized attention for every student.",
      enrollBtn: "Fill Admission Form",
    },
    memories: {
      tag: "Farewell & Milestones",
      title: "Moments That Make Us Proud",
      subtitle: "Heartwarming farewell memories celebrating the sincere bond between mentor and students.",
      allTag: "All Memories",
    },
    videos: {
      tag: "Video Lectures",
      title: "Latest Video Classes",
      subtitle: "Clear conceptual breakdowns and board question solutions for essential English and ICT topics.",
      emptyText: "New Video Lectures Coming Soon",
      emptySubtext: "Stay tuned on our YouTube and Facebook channels for regular video classes.",
    },
    blog: {
      tag: "Study Tips & Guidelines",
      title: "Recent Articles & Guidelines",
      subtitle: "Essential strategies, syllabus analysis, and expert guidance for board exam excellence.",
      viewAll: "View All Blogs",
      readMore: "Read Full Article",
    },
    testimonials: {
      tag: "Student & Parent Reviews",
      title: "What Students & Parents Say",
      subtitle: "Authentic feedback and learning experiences shared by students and guardians from our academy.",
      feedbackCta: "Share Your Review & Experience",
      limitReached: "Daily Review Limit Reached",
      rejectedNoticeTitle: "Your previous review was not published following guidelines",
      rejectedNoticeDesc: "You can submit a new authentic review reflecting your classroom experience.",
      modalTitle: "Share Your Feedback or Experience",
      modalSubtitle: "Your valuable thoughts on classroom teaching and mentorship",
      nameLabel: "Your Full Name",
      roleLabel: "Your Role",
      batchLabel: "Batch / Academic Year",
      quoteLabel: "Your Review / Feedback",
      cancelBtn: "Cancel",
      submitBtn: "Submit Review",
      successTitle: "Feedback Submitted Successfully",
      successDesc: "Thank you for sharing your experience. It will be published on the website following admin approval.",
      studentOption: "Student",
      guardianOption: "Guardian / Parent",
    },
    successWall: {
      tag: "Success Stories",
      title: "Wall of Achievers",
      subtitle: "Proudly honoring our outstanding students who achieved stellar results in board examinations.",
      emptyText: "Achievers List Will Be Published Soon",
      emptySubtext: "This wall will be updated promptly following board exam result announcements.",
    },
    location: {
      tag: "Location & Contact",
      title: "Campus Address & Google Map",
      subtitle: "Visit our learning center adjacent to Chauddagram Govt. College for admissions or direct consultation.",
      centerBadge: "Main Learning Center",
      academyName: "Ahsan's Learning Academy",
      address: "College Road, Adjacent to Chauddagram Govt. College, Chauddagram, Cumilla",
      directionLabel: "Directions:",
      directionText: "Right next to the main entrance of Chauddagram Govt. College, College Road.",
      classTimeLabel: "Class Hours:",
      classTimeText: "7:00 AM — 9:30 AM & 3:00 PM — 5:00 PM (6 days a week)",
      hotlineLabel: "Direct Hotline:",
      mapsBtn: "View Location on Google Maps",
    },
    faq: {
      tag: "Frequently Asked Questions",
      title: "Everything You Need to Know",
      subtitle: "Find answers to commonly asked questions regarding admissions, batch schedules, and class routines.",
    },
    admission: {
      tag: "Admission Form",
      title: "Secure Your Seat in Private Batch",
      subtitle: "Fill out the form with your accurate details. Our team will contact you promptly to confirm your batch and schedule.",
      thankYou: "Thank You",
      successMsg: "Your application has been received successfully. We will reach out via call or WhatsApp shortly to confirm your enrollment.",
      studentName: "Student Full Name",
      collegeName: "College Name",
      rollNumber: "College Roll Number",
      group: "Academic Stream / Group",
      selectedBatch: "Preferred Batch",
      studentPhone: "Student Phone / WhatsApp",
      guardianPhone: "Guardian Mobile Number",
      selectGroupPlaceholder: "Select Stream / Group",
      selectBatchPlaceholder: "Select Preferred Batch",
      scienceGroup: "Science Group",
      humanitiesGroup: "Humanities Group",
      businessGroup: "Business Studies Group",
      submitBtn: "Submit Admission Form",
      submittingBtn: "Submitting...",
    },
    footer: {
      brandTag: "Better Learning, Brighter Future",
      vision: "A premier educational platform dedicated to building rock-solid foundations in English and ICT for HSC board exam excellence.",
      quickLinks: "Quick Links",
      campusContact: "Campus & Contact",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved.",
      developedBy: "Developed by",
      langSwitch: "Language: বাংলা",
      themeSwitch: "Light Mode",
    },
  },
};

interface AppContextType {
  language: Language;
  theme: Theme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  t: Translations;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // ১. সাইট সর্বদা বাধ্যতামূলকভাবে ডিফল্ট লাইট মোডে ওপেন হবে
  const [language, setLanguage] = useState<Language>("bn");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // সিস্টেমের ডার্ক সেটিংস সম্পূর্ণ অগ্রাহ্য করা হবে।
    // শুধুমাত্র ইউজার যদি আগে নিজে ক্লিক করে localStorage-এ "dark" সেভ করে থাকে, তবেই ডার্ক মোড অন হবে।
    try {
      const savedTheme = localStorage.getItem("ala_theme") as Theme | null;
      if (savedTheme === "dark") {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }

      const savedLang = localStorage.getItem("ala_lang") as Language | null;
      if (savedLang === "en" || savedLang === "bn") {
        setLanguage(savedLang);
      }
    } catch {
      // fallback
    }
  }, []);

  const toggleLanguage = () => {
    const next = language === "bn" ? "en" : "bn";
    setLanguage(next);
    try {
      localStorage.setItem("ala_lang", next);
    } catch {
      // fallback
    }
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("ala_theme", next);
    } catch {
      // fallback
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        theme,
        toggleLanguage,
        toggleTheme,
        t: translations[language],
      }}
    >
      <LazyMotion features={() => import("@/lib/motionFeatures").then((mod) => mod.default)}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
      <RippleProvider />
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
