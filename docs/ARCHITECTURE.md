# 🏗️ Architecture

> How the portfolio application is structured, how data flows, and the design decisions behind the system.

---

## Tech Stack

| Layer         | Technology                               | Version |
| ------------- | ---------------------------------------- | ------- |
| Framework     | Next.js (App Router)                     | 15+     |
| Language      | TypeScript                               | 5+      |
| Styling       | Tailwind CSS                             | v4      |
| UI Primitives | shadcn/ui (Radix UI)                     | Latest  |
| Fonts         | `next/font` (Space Grotesk + Space Mono) | —       |
| Icons         | Google Material Symbols (CDN)            | —       |
| Deployment    | Vercel (recommended)                     | —       |

---

## Routing Model

The app uses Next.js **App Router** with a **route group** pattern.

```
app/
├── layout.tsx              ← Root layout: fonts, global metadata
├── globals.css             ← Tailwind @theme tokens, base styles
├── (main)/                 ← Route group: shared sidebar + header shell
│   ├── layout.tsx          ← Main shell: SidebarProvider, Header, path-aware state
│   ├── page.tsx            ← / → Home / About
│   ├── skills/page.tsx     ← /skills → Tech Stack
│   ├── projects/page.tsx   ← /projects → Repositories
│   ├── archive/page.tsx    ← /archive → Archive Proof Of Work
│   └── contact/            ← /contact → Initiate Connection
│       ├── layout.tsx      ← Metadata boundary (contact is 'use client')
│       └── page.tsx        ← Contact form + direct channels
└── api/
    └── contact/route.ts    ← POST handler for contact form
```

### Why a Route Group?

The `(main)` route group allows all portfolio pages to share:

- The collapsible **Sidebar** (built on shadcn `SidebarProvider`)
- The sticky **Header** (with page path + status indicators)
- The animated **background grid** texture
- A page-transition **fade-in animation** (`animate-in`)

…without the root `app/layout.tsx` being polluted with UI shell markup.

---

## Layout Architecture

```
SidebarProvider  (context: open/collapsed state, mobile toggle)
├── Sidebar      (nav links, terminal footer — server-rendered shell, client interaction)
└── SidebarInset (fills remaining width)
    ├── Header   (sticky, branding + page path + mobile hamburger)
    ├── <grid bg />
    └── <main>
        └── {page content with fade-in animation}
```

### State Flow in `(main)/layout.tsx`

The layout is a **client component** that reads `usePathname()` and derives:

| Derivation       | Source                                                                   |
| ---------------- | ------------------------------------------------------------------------ |
| `pagePath`       | `PAGE_PATHS[route]` from `constants/layout.ts`                           |
| `sidebarTitle`   | `SIDEBAR_TITLES[route]` from `constants/layout.ts`                       |
| `terminalHeader` | `TERMINAL_HEADERS[route]` from `constants/layout.ts`                     |
| `terminalLogs`   | `TERMINAL_LOGS[route]` from `constants/layout.ts` + JSX `<span>`         |
| `sidebarLinks`   | `MAIN_NAV_LINKS` mapped with `active` flag OR `PROJECT_DETAIL_NAV_LINKS` |

All raw data lives in `constants/` — the layout file itself contains **zero hardcoded strings**.

---

## Data Flow

```
constants/
├── nav.ts          → sidebarLinks arrays
├── layout.ts       → terminal logs, page paths, sidebar/terminal headers
└── experience.ts   → EXPERIENCE_ENTRIES[]

      ↓ imported by

app/(main)/layout.tsx       (runtime route → config mapping)
app/(main)/experience/page.tsx  (static data render)
```

### Contact Form Flow

```
User fills form
    ↓
handleSubmit() (client)
    ↓
POST /api/contact
    ↓
route.ts (validates, sends email via nodemailer / logs)
    ↓
200 OK → status "TRANSMISSION_SUCCESS"
```

---

## Metadata Strategy

Next.js `generateMetadata` / `export const metadata` is used at each page level, with a global title template set in the root layout:

```ts
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: "%s | aditya.dev",
    default: "aditya.dev | Systems Engineer",
  },
};
```

Each page then declares:

```ts
export const metadata: Metadata = { title: "Tech Stack" };
// → renders: "Tech Stack | aditya.dev"
```

**Special case — Contact page:** since `contact/page.tsx` is a client component (`"use client"`), metadata cannot be exported from it directly. A thin `contact/layout.tsx` wrapper holds the metadata instead, keeping the client boundary clean.

---

## Sidebar System

The `Sidebar` component wraps shadcn's `Sidebar` primitive. On **mobile**, shadcn renders the sidebar as a `Sheet` (slide-in drawer). On **desktop**, it renders as a fixed side panel.

Key behaviours:

- **Open/close on mobile**: `Header.tsx` calls `toggleSidebar()` via `useSidebar()` hook
- **Auto-close on navigation**: Every `<Link>` inside the sidebar calls `setOpenMobile(false)` on click
- **Active link highlighting**: `active` prop is derived in layout by comparing `link.href === pathname`

---

## Performance Considerations

| Decision                               | Rationale                                                              |
| -------------------------------------- | ---------------------------------------------------------------------- |
| Route group layout                     | Avoids re-mounting the sidebar/header on every navigation              |
| `animate-in` on `key={pathname}`       | Only the page content re-animates, not the shell                       |
| `"use client"` only where needed       | Contact page, Header, Sidebar — layout and pages are server components |
| Data in `constants/` not in components | Prevents React from treating static data as reactive state             |
| `next/font` for Space Grotesk + Mono   | Zero FOUT, font-display: swap, subsets loaded                          |
