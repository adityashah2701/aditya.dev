import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    // Serve modern image formats for better performance and Lighthouse scores
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 60 seconds minimum
    minimumCacheTTL: 60,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Control referrer information sent with requests
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Tell search engine bots to index and follow all pages
          { key: "X-Robots-Tag", value: "index, follow" },
          // Enable HSTS for HTTPS-only enforcement (1 year)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
