# 📁 File System

> A complete map of every file and directory in the project, with explanations of each file's role.

---

## Root Directory

```
portfolio/
├── app/                    ← Next.js App Router root
├── components/             ← Shared React components
├── constants/              ← Static data and configuration constants
├── docs/                   ← Project documentation (you are here)
├── hooks/                  ← Custom React hooks
├── lib/                    ← Utility functions
├── public/                 ← Static assets (images, fonts, icons)
├── types/                  ← TypeScript type definitions
├── .gitignore
├── components.json         ← shadcn/ui component registry config
├── eslint.config.mjs       ← ESLint configuration
├── next.config.ts          ← Next.js configuration
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## `app/` — Next.js App Router

```
app/
├── layout.tsx              ← Root layout: <html>, <body>, global fonts, root metadata
├── globals.css             ← Tailwind @theme tokens, base styles, custom utilities
├── favicon.ico
│
├── (main)/                 ← Route group: shared shell (sidebar + header)
│   ├── layout.tsx          ← Shell layout — client component, path-aware sidebar/terminal config
│   │
│   ├── page.tsx            ← Route: /  →  Home / About page
│   │
│   ├── skills/
│   │   └── page.tsx        ← Route: /skills  →  Tech Stack Manifest
│   │
│   ├── projects/
│   │   ├── page.tsx        ← Route: /projects  →  Active Repositories listing
│   │   └── [id]/
│   │       └── page.tsx    ← Route: /projects/:id  →  Project detail view
│   │
│   ├── experience/
│   │   └── page.tsx        ← Route: /experience  →  Deployment History timeline
│   │
│   └── contact/
│       ├── layout.tsx      ← Metadata boundary wrapper for the contact client page
│       └── page.tsx        ← Route: /contact  →  Contact form + direct channels
│
└── api/
    └── contact/
        └── route.ts        ← API: POST /api/contact  →  Handles contact form submissions
```

---

## `components/` — Shared React Components

```
components/
├── Header.tsx              ← Sticky top bar: branding, page path, status badges, mobile menu toggle
├── Sidebar.tsx             ← Navigation sidebar: links, terminal footer, mobile auto-close logic
│
└── ui/                     ← shadcn/ui generated primitives (do not edit manually)
    ├── button.tsx
    ├── input.tsx
    ├── sheet.tsx           ← Used internally by Sidebar on mobile (slide-in drawer)
    ├── sidebar.tsx         ← Core shadcn Sidebar + SidebarProvider context
    ├── skeleton.tsx
    ├── tooltip.tsx
    └── ...                 ← Other shadcn components
```

### Component Responsibilities

| Component         | Client?           | Responsibility                                           |
| ----------------- | ----------------- | -------------------------------------------------------- |
| `Header.tsx`      | ✅ `"use client"` | Reads `useSidebar()` to wire up mobile hamburger         |
| `Sidebar.tsx`     | ✅ `"use client"` | Reads `useSidebar()` to auto-close on navigation         |
| `components/ui/*` | Varies            | shadcn/ui primitives — Radix-based accessible components |

---

## `constants/` — Static Data & Configuration

```
constants/
├── nav.ts          ← Sidebar navigation link arrays
│                     Exports: MAIN_NAV_LINKS, PROJECT_DETAIL_NAV_LINKS
│
├── layout.ts       ← Per-route layout configuration
│                     Exports: TERMINAL_LOGS, PAGE_PATHS,
│                              SIDEBAR_TITLES, TERMINAL_HEADERS
│
└── experience.ts   ← Experience timeline entry data
                      Exports: EXPERIENCE_ENTRIES[]
```

### Naming Convention

All constant exports are `SCREAMING_SNAKE_CASE` and represent **static, never-mutated data**.
Arrays are typed as `Type[]` (not `as const`) so they remain mutable and compatible with `React.ReactNode[]`.

---

## `types/` — TypeScript Type Definitions

```
types/
├── sidebar.ts      ← SidebarLink, SidebarProps
├── experience.ts   ← ExperienceEntry
├── projects.ts     ← ProjectCard
└── skills.ts       ← SkillCategory
```

### Convention

- One file per feature/page domain
- Types are plain `type` aliases (not `interface`) for consistency
- All types are `export`ed for consumption across the app
- No runtime code — pure type declarations only

---

## `hooks/` — Custom React Hooks

```
hooks/
└── use-mobile.tsx  ← useIsMobile() — returns boolean based on window width
                      Used internally by shadcn's SidebarProvider
```

---

## `lib/` — Utility Functions

```
lib/
└── utils.ts        ← cn() utility — merges Tailwind classes via clsx + tailwind-merge
                      Used across all shadcn components
```

---

## `docs/` — Project Documentation

```
docs/
├── DESIGN_SYSTEM.md    ← Colour tokens, typography, spacing, components, animations
├── ARCHITECTURE.md     ← Routing model, data flow, layout system, metadata strategy
└── FILE_SYSTEM.md      ← This file — complete directory and file reference
```

---

## `public/` — Static Assets

```
public/
├── images/             ← Project screenshots, avatars
└── ...                 ← Any other static files served at root URL
```

---

## Key Configuration Files

| File                 | Purpose                                                          |
| -------------------- | ---------------------------------------------------------------- |
| `tsconfig.json`      | TypeScript config with `@/*` path alias pointing to project root |
| `next.config.ts`     | Next.js config (image domains, etc.)                             |
| `components.json`    | shadcn/ui registry: style, base colour, icon library             |
| `postcss.config.mjs` | PostCSS setup for Tailwind CSS v4                                |
| `eslint.config.mjs`  | ESLint rules including Next.js plugin                            |

---

## Path Aliases

Configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Usage across the codebase:

```ts
import Header from "@/components/Header";
import { SidebarLink } from "@/types/sidebar";
import { MAIN_NAV_LINKS } from "@/constants/nav";
import { cn } from "@/lib/utils";
```

---

## Adding a New Page

1. Create `app/(main)/[page-name]/page.tsx`
2. Add `export const metadata: Metadata = { title: "..." }` at the top
3. Add a new entry to `MAIN_NAV_LINKS` in `constants/nav.ts`
4. Add the route's `pagePath`, `terminalLogs`, etc. to `constants/layout.ts`
5. Handle the new `pathname` branch in `app/(main)/layout.tsx`
6. (Optional) Create `types/[page-name].ts` and `constants/[page-name].ts` if the page has complex data
