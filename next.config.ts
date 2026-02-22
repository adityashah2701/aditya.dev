import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Compilation & Output ────────────────────────────────────────────────
  // Note: swcMinify was removed in Next.js 15+ — SWC minification is always on by default.

  // Strict TypeScript build errors (fails the build on type errors)
  typescript: {
    ignoreBuildErrors: false,
  },

  // ─── Performance & Rendering ─────────────────────────────────────────────
  reactCompiler: true,
  // Enable React Compiler (React 19 + Next 16 support)
  // Automatically memoizes components and hooks at compile time
  experimental: {
    // Optimize package imports — prevents barrel file bloat
    // Any large library imported through an index file benefits from this
    optimizePackageImports: [
      "lucide-react",
      "radix-ui",
      "@radix-ui/react-icons",
      "recharts",
      "date-fns",
    ],

    // View Transitions API for native browser page animations
    viewTransition: true,
  },

  // ─── Image Optimisation ──────────────────────────────────────────────────

  images: {
    // Serve modern formats: AVIF first (best compression), then WebP fallback
    formats: ["image/avif", "image/webp"],

    // Responsive size breakpoints used to generate srcSet
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 64, 96, 128, 256],

    // Cache optimised images for 60 days on CDN
    minimumCacheTTL: 60 * 60 * 24 * 60,

    // Allowed external image domains (add as needed)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },

  // ─── HTTP Headers ────────────────────────────────────────────────────────

  async headers() {
    return [
      {
        // Apply security + caching headers to every route
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Block MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Force HTTPS for 2 years, include subdomains
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Restrict referrer info to same origin
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Disable browser features not used by the portfolio
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Basic Content Security Policy — tighten as needed
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js inline scripts + Google Fonts
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
              // Google Fonts stylesheets + Material Symbols CDN
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
              // Google Fonts + Material Symbols font files
              "font-src 'self' https://fonts.gstatic.com",
              // GitHub avatars for any project images
              "img-src 'self' data: https://avatars.githubusercontent.com https://github.com",
              // API calls only to same origin
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
      {
        // Aggressive long-term caching for Next.js static chunks
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache public assets (fonts, images, icons) for 1 year
        source: "/(.*)\\.(ico|png|jpg|jpeg|svg|webp|avif|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ─── Redirects ───────────────────────────────────────────────────────────

  async redirects() {
    return [
      // Canonical redirect: strip trailing slash (Next handles this by default
      // but being explicit is safer with custom domains)
      // Add project-specific redirects here as needed
    ];
  },

  // ─── Bundle Analysis Helper ──────────────────────────────────────────────
  // Run: ANALYZE=true npm run build  to open the bundle analyser

  ...(process.env.ANALYZE === "true" && {
    bundleAnalyzer: { enabled: true },
  }),
};

export default nextConfig;
