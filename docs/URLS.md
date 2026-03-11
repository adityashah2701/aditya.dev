# URL Map & SEO Context

This document maps every route in the portfolio to its file, SEO title, description, and implementation notes.
Update `SITE_URL` in `constants/seo.ts` when the production domain is confirmed.

---

## Base URL

```
https://adityashah.dev  ← configurable via constants/seo.ts → SITE_URL
```

---

## Route Map

| Route | File | Page Title | SEO Description |
|-------|------|------------|-----------------|
| `/` | `app/(main)/page.tsx` | Home | Aditya Shah — Systems Engineer & Full Stack Architect |
| `/projects` | `app/(main)/projects/page.tsx` | Repositories | Browse full-stack apps, AI tools, open source contributions |
| `/projects/[slug]` | `app/(main)/projects/[id]/page.tsx` | `{Project Name}` | Per-project description via `generateMetadata()` |
| `/skills` | `app/(main)/skills/page.tsx` | Tech Stack | Languages, frameworks, and tools used by Aditya Shah |
| `/experience` | `app/(main)/experience/page.tsx` | Experience Logs | Career history, roles, and achievements |
| `/contact` | `app/(main)/contact/page.tsx` | Initiate Contact | Reach Aditya Shah for collaborations and opportunities |
| `/sitemap.xml` | `app/sitemap.ts` | _(auto)_ | Machine-readable sitemap for search engines |
| `/robots.txt` | `public/robots.txt` | _(auto)_ | Crawler instructions: `Allow: /` |

---

## API Routes (Convex HTTP endpoints)

These are internal API routes exposed via Convex. They are **not** indexed by search engines (excluded via the absence in sitemap).

| Route | Directory | Purpose |
|-------|-----------|---------|
| `/api/contact/*` | `app/api/contact/` | Contact form submission endpoint |
| `/api/history/*` | `app/api/history/` | Experience/history data endpoint |
| `/api/projects/*` | `app/api/projects/` | Projects data endpoint |
| `/api/techstack/*` | `app/api/techstack/` | Tech stack data endpoint |

---

## SEO Implementation Notes

### What's Implemented

- **`metadataBase`** — Set to `SITE_URL` in root layout so all relative OG/canonical URLs resolve correctly
- **Open Graph** — Default OG metadata in root layout inherited by all routes; each page overrides with route-specific values
- **Twitter Cards** — `summary_large_image` card defined in root layout
- **JSON-LD** — `Person` schema injected in root `<head>` for structured search results
- **Canonical URLs** — Each page sets its own canonical to prevent duplicate indexing
- **hreflang** — `en-US` language targeting defined in root layout alternates
- **robots** — Both `<meta robots>` (via Next.js metadata) and `X-Robots-Tag` response header
- **Security headers** — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `HSTS`
- **Image optimization** — AVIF + WebP formats, 60s cache TTL in `next.config.ts`
- **Font loading** — `display: swap` on both Google Fonts + `preconnect` hints for faster loading
- **Sitemap** — `/sitemap.xml` served by `app/sitemap.ts` (all static routes)
- **robots.txt** — `/robots.txt` served from `public/robots.txt`

### What Needs Manual Action

| Action | Notes |
|--------|-------|
| **Set real domain** | Replace `https://adityashah.dev` in `constants/seo.ts → SITE_URL` |
| **Confirm social links** | Update `GITHUB_URL` and `LINKEDIN_URL` in `constants/seo.ts` |
| **Create OG image** | Add `/public/og-image.png` (1200×630px) for social previews |
| **Add favicon assets** | Add `/app/icon.png` (32×32) and `/app/apple-icon.png` (180×180) — Next.js auto-detects these |
| **Extend sitemap** | Uncomment the Convex fetch block in `app/sitemap.ts` to include dynamic `/projects/[slug]` routes |
| **Twitter handle** | Update `twitter.creator` in `app/layout.tsx` if handle differs from `@adityashah` |
| **Submit sitemap** | Submit `https://adityashah.dev/sitemap.xml` to Google Search Console |

### SEO-Friendly URL Structure

```
✅ /projects/ai-workflow-builder      ← slug-based, descriptive
✅ /projects/ecommerce-platform
❌ /projects?id=123                   ← never use query-param IDs for public content
```

Project slugs come from the `slug` field in the Convex `projects` table. Ensure all slugs are lowercase, hyphen-separated, and descriptive.
