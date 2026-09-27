/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY", // ক্লিকজ্যাকিং ও ফিশিং আইফ্রেম সম্পূর্ণ বন্ধ
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // ব্রাউজার MIME স্নিফিং প্রতিরোধ
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // নিরাপদ রেফারার পলিসি
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()", // অপ্রয়োজনীয় ব্রাউজার পারমিশন ব্লক
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
