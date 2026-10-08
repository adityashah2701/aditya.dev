# URL Map & SEO Context

This document maps every route in the portfolio to its file, SEO title, and implementation notes.
All SEO constants (domain, name, job title, social URLs) live in `constants/seo.ts`.

---

## Base URL

```
https://adityashah27.dev  ← constants/seo.ts → SITE_URL
```

---

## Route Map

Titles use the template `%s | Aditya Shah` from the root layout.

| Route | File | Page Title |
|-------|------|------------|
| `/` | `app/(main)/page.tsx` | Aditya Shah – Full Stack Developer (React, Next.js, AI) |
| `/projects` | `app/(main)/projects/page.tsx` | Projects |
| `/skills` | `app/(main)/skills/page.tsx` | Skills & Tech Stack |
| `/archive` | `app/(main)/archive/page.tsx` | Certificates & Achievements |
| `/activity` | `app/(main)/activity/page.tsx` | Coding Activity – GitHub & LeetCode |
| `/contact` | `app/(main)/contact/page.tsx` | Contact |
| `/sitemap.xml` | `app/sitemap.ts` | All static routes |
| `/robots.txt` | `app/robots.ts` | Allows `/`, disallows `/api/` and `/admin/` |
| `/opengraph-image.png` | `app/opengraph-image.png/route.ts` | 1200×630 social preview (`OG_IMAGE_URL`) |
| `/Aditya-Shah-Resume.pdf` | `public/` | `/resume.pdf` permanently redirects here |

---

## API Routes

Excluded from indexing via `robots.txt` and an `X-Robots-Tag: noindex` header.

| Route | Purpose |
|-------|---------|
| `POST /api/contact` | Contact form. Calls Convex `contact.sendContactMessage` with `CONTACT_SERVER_SECRET`. |
| `GET /api/activity/github` | Cached GitHub activity for the site owner only. |
| `GET /api/activity/leetcode` | Cached LeetCode activity for the site owner only. |

---

## Content management (Convex)

All write functions (`projects.addProject`, `techstack.addCategory`, `certificates.createCertificate`,
`seed.*`, `contact.getMessages`, etc.) are **internal**. They cannot be called from the browser or
the public Convex URL. Run them from the Convex dashboard (Functions → Run) or the CLI:

```bash
npx convex run projects:addProject '{"title": "...", "slug": "...", ...}'
```

---

## SEO Implementation Notes

- **Metadata** — `createPageMetadata()` in `lib/metadata.ts` sets title, description, canonical, and a
  complete Open Graph / Twitter object per page (page objects replace the root ones, so every field is repeated).
- **JSON-LD** — `WebSite` + `Person` in the root layout, `ProfilePage` on `/`, `BreadcrumbList` on every page
  (emitted by `Breadcrumb`).
- **Rendering & caching** — pages preload Convex data with `preloadQueryCached` / `fetchQueryCached`
  (`lib/convex-server.ts`), which use Next's fetch cache instead of `convex/nextjs`'s forced `no-store`. Every page
  is prerendered and revalidated hourly (ISR); clients still get live data over WebSocket after hydration. The route
  fade-in is skipped on first paint so SSR content is visible before hydration.
- **Icons** — `app/favicon.ico`, `app/icon.png` (32px), `app/apple-icon.png` (180px), and
  `public/icon-192.png` / `public/icon-512.png` for the manifest.
- **Security headers** — CSP baseline, HSTS, COOP, `X-Frame-Options`, `nosniff`, Permissions-Policy.

### Manual actions

| Action | Notes |
|--------|-------|
| **Set `CONTACT_SERVER_SECRET`** | Same value in Vercel env and Convex env (`npx convex env set`). The contact form returns 503 without it. |
| **Search Console** | Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, then submit `https://adityashah27.dev/sitemap.xml`. |
| **Project copy** | Descriptions live in the Convex `projects` table; edit them in the dashboard. |
