import type { NextConfig } from "next";

// Safe baseline CSP: no script-src restrictions (Next inline scripts would need
// nonces), but blocks plugins, <base> hijacking, foreign form posts and framing.
const CONTENT_SECURITY_POLICY = [
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,

  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    // Serve modern image formats for better performance and Lighthouse scores
    formats: ["image/avif", "image/webp"],
    // Image sources (Convex storage IDs, /public) are immutable — cache for 31 days
    minimumCacheTTL: 2678400,
    // Allow images served from Convex storage (hostname varies per deployment)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.convex.cloud",
        pathname: "/api/storage/**",
      },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "@base-ui/react", "motion"],
  },

  async redirects() {
    return [
      {
        source: "/resume.pdf",
        destination: "/Aditya-Shah-Resume.pdf",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
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
          { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
          // Enable HSTS for HTTPS-only enforcement (1 year)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Isolate the browsing context from cross-origin popups. COEP is
          // intentionally omitted: require-corp blocks GA and the pdf.js worker.
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          // Permissions Policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
