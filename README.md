# aditya.dev — Portfolio

> Personal portfolio of **Aditya Shah** — Full-Stack Engineer & Systems Architect, Mumbai, MH.
> Built as an IDE-inspired, dark-mode-first web experience using Next.js 16 and React 19.

---

## Tech Stack

| Layer      | Technology                                                |
| ---------- | --------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router)             |
| Language   | TypeScript 5                                              |
| UI Library | React 19                                                  |
| Styling    | Tailwind CSS v4 + `tw-animate-css`                        |
| Components | [shadcn/ui](https://ui.shadcn.com) (Base UI primitives)   |
| Icons      | Google Material Symbols (CDN)                             |
| Forms      | `react-hook-form` + `zod`                                 |
| Charts     | `recharts`                                                |
| Fonts      | Space Grotesk + Space Mono (Google Fonts via `next/font`) |
| Compiler   | React Compiler (`babel-plugin-react-compiler`)            |
| Linting    | ESLint 9 + `eslint-config-next`                           |

---

## Pages & Routes

| Route         | Title            | Description                                                                          |
| ------------- | ---------------- | ------------------------------------------------------------------------------------ |
| `/`           | Home             | Hero section with name, role, bio, and call-to-action buttons (Download CV, Contact) |
| `/skills`     | Tech Stack       | Categorised skill cards — Frontend, Backend, and tooling                             |
| `/projects`   | Repositories     | Project cards linking to individual detail views (`/projects/[slug]`)                |
| `/experience` | Experience Logs  | Versioned timeline of career/learning milestones (v1.0.0 → v4.0.0)                   |
| `/contact`    | Initiate Contact | Contact form / reach-out section                                                     |

Each page has its own `metadata` export for SEO, templated as `%s | aditya.dev`.

---

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, dark mode
│   ├── globals.css             # Global styles and CSS custom properties
│   ├── favicon.ico
│   └── (main)/
│       ├── layout.tsx          # Shell: Sidebar + Header, per-route terminal logs
│       ├── page.tsx            # / — Home / About
│       ├── skills/page.tsx     # /skills — Tech Stack
│       ├── projects/
│       │   ├── page.tsx        # /projects — Project listing
│       │   └── [slug]/         # /projects/[slug] — Project detail
│       ├── experience/         # /experience — Timeline
│       └── contact/            # /contact — Contact form
│
├── components/
│   ├── Header.tsx              # Top bar with breadcrumb path
│   ├── Sidebar.tsx             # IDE-style sidebar with nav links + terminal panel
│   └── ui/                     # shadcn/ui component library (56 components)
│
├── constants/
│   ├── nav.ts                  # MAIN_NAV_LINKS, PROJECT_DETAIL_NAV_LINKS
│   ├── layout.ts               # PAGE_PATHS, SIDEBAR_TITLES, TERMINAL_LOGS, TERMINAL_HEADERS
│   └── experience.ts           # EXPERIENCE_ENTRIES data array
│
├── types/
│   ├── sidebar.ts              # SidebarLink
│   ├── experience.ts           # ExperienceEntry
│   ├── projects.ts             # Project types
│   └── skills.ts               # Skill types
│
├── hooks/
│   └── use-mobile.ts           # Responsive mobile breakpoint hook
│
├── lib/
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
│
├── public/                     # Static SVG assets
├── next.config.ts              # Next.js configuration (see below)
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

---

## Key Features

- **IDE-inspired UI shell** — Sidebar with active-link highlighting, per-route terminal log panels, breadcrumb path headers, and a grid-pattern background overlay.
- **React Compiler** — Enabled via `reactCompiler: true` in `next.config.ts`. Automatically memoises components and hooks at compile time (requires `babel-plugin-react-compiler`).
- **View Transitions API** — Smooth native browser page transitions via `experimental.viewTransition`.
- **Image optimisation** — AVIF + WebP formats, responsive `deviceSizes`, 60-day CDN cache TTL.
- **Security headers** — `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `Referrer-Policy`, `Permissions-Policy`, and a strict `Content-Security-Policy` applied to all routes.
- **Long-term asset caching** — Immutable `Cache-Control` headers for `/_next/static/` and public assets.
- **Bundle analyser** — Run `ANALYZE=true npm run build` to open the interactive bundle analyser.
- **Optimised package imports** — `optimizePackageImports` configured for `lucide-react`, `radix-ui`, `@radix-ui/react-icons`, `recharts`, and `date-fns` to eliminate barrel-file bloat.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Optional: Bundle Analysis

```bash
ANALYZE=true npm run build
```

---

## Deployment

Deploy instantly with [Vercel](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

The project is zero-config on Vercel — no environment variables are required for the base portfolio.

---

## License

Personal portfolio — all content and design © Aditya Shah. Code structure is open for reference.
