# 🎨 Design System

> A comprehensive reference for the visual language, tokens, typography, spacing, and component patterns used across `aditya.dev`.

---

## Overview

The portfolio uses a **dark, terminal-inspired aesthetic** built on Tailwind CSS v4's `@theme` directive. All design decisions are driven by a central token system defined in `app/globals.css` and consumed via Tailwind utility classes throughout the application.

---

## Color Palette

All colours are registered as CSS custom properties inside the `@theme` block and are available as Tailwind utility classes (e.g. `bg-primary`, `text-border-dark`).

### Core Brand Tokens

| Token                | CSS Variable               | Hex       | Usage                                |
| -------------------- | -------------------------- | --------- | ------------------------------------ |
| **Primary**          | `--color-primary`          | `#c6a65d` | Accent, active states, glows, badges |
| **Background Dark**  | `--color-background-dark`  | `#161512` | Main page background                 |
| **Surface Dark**     | `--color-surface-dark`     | `#1e1b16` | Cards, panels, sidebar               |
| **Border Dark**      | `--color-border-dark`      | `#35322c` | All borders and dividers             |
| **Background Light** | `--color-background-light` | `#f8f7f6` | Light mode fallback                  |

### Semantic Colour Usage

| Colour              | Tailwind Class            | Context                              |
| ------------------- | ------------------------- | ------------------------------------ |
| Active state bg     | `bg-primary/10`           | Selected sidebar items, badge fills  |
| Active state border | `border-primary/20`       | Selected sidebar borders             |
| Hover intent        | `hover:border-primary/50` | Card hover borders                   |
| Subdued text        | `text-slate-500`          | Labels, meta text                    |
| Body text           | `text-slate-300`          | Descriptive paragraphs               |
| Heading text        | `text-white`              | H1, H2, H3 headings                  |
| Terminal green      | `text-green-500`          | Terminal prompt icon in contact form |
| Status green        | `text-green-500`          | Network status badges                |

### Glow Effects

Used on timeline dots and active indicators:

```
shadow-[0_0_8px_rgba(198,166,93,0.5)]   /* primary glow */
shadow-[0_0_20px_rgba(19,73,236,0.3)]   /* button glow */
```

---

## Typography

### Font Families

Defined in `@theme` and loaded via `next/font` in `app/layout.tsx`:

| Role               | Font          | Variable               | CSS Class      |
| ------------------ | ------------- | ---------------------- | -------------- |
| **Display / Body** | Space Grotesk | `--font-space-grotesk` | `font-display` |
| **Monospace**      | Space Mono    | `--font-space-mono`    | `font-mono`    |

### Scale

| Use case                   | Tailwind class                                 |
| -------------------------- | ---------------------------------------------- |
| Hero H1 (mobile → desktop) | `text-4xl sm:text-5xl md:text-7xl lg:text-8xl` |
| Page titles                | `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` |
| Section headings (H2)      | `text-lg md:text-2xl`                          |
| Card titles (H3)           | `text-lg sm:text-xl md:text-2xl`               |
| Body text                  | `text-sm md:text-base lg:text-lg`              |
| Label / badge              | `text-[10px]` to `text-xs`                     |
| Monospace UI text          | `text-xs font-mono`                            |

### Font Style Conventions

- **Headings**: `font-black tracking-tighter uppercase` for hero/page titles
- **Sidebar section labels**: `text-xs font-bold tracking-widest` (all caps)
- **Terminal output**: `font-mono text-[10px] leading-relaxed`
- **Breadcrumb**: `font-mono text-xs sm:text-sm text-slate-500`

---

## Spacing & Layout

### Grid System

The main content area uses a responsive max-width container:

```
px-4 py-6
sm:px-6
md:px-10 md:py-8
lg:px-14
xl:px-16
max-w-7xl mx-auto w-full
```

### Card Padding

| Breakpoint | Padding             |
| ---------- | ------------------- |
| Mobile     | `p-4`               |
| Small      | `sm:p-5`            |
| Desktop    | `md:p-6` / `md:p-8` |

### Section Spacing

| Element               | Mobile  | Desktop    |
| --------------------- | ------- | ---------- |
| Section bottom margin | `mb-12` | `md:mb-20` |
| Hero bottom margin    | `mb-12` | `md:mb-20` |
| Border-bottom gap     | `pb-6`  | `md:pb-8`  |

---

## Breakpoints

| Name | Min-width | Defined in                    |
| ---- | --------- | ----------------------------- |
| `xs` | `480px`   | `globals.css @theme` (custom) |
| `sm` | `640px`   | Tailwind default              |
| `md` | `768px`   | Tailwind default              |
| `lg` | `1024px`  | Tailwind default              |
| `xl` | `1280px`  | Tailwind default              |

---

## Component Patterns

### Cards

All cards follow a consistent structure:

```tsx
<div className="bg-surface-dark border border-border-dark hover:border-primary/40 rounded-xl transition-colors duration-300 overflow-hidden">
  {/* optional header strip */}
  <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3 border-b border-border-dark/60">
    ...
  </div>
  {/* body */}
  <div className="p-4 sm:p-5 md:p-6">...</div>
</div>
```

### Status Badges

```tsx
<div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/20 rounded text-primary text-[10px] font-bold tracking-wider">
  <span className="size-1.5 rounded-full bg-primary animate-pulse" />
  ONLINE
</div>
```

### Section Headers

```tsx
<div className="flex items-center gap-3 mb-6 md:mb-8">
  <span className="text-primary font-mono text-sm">01.</span>
  <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight uppercase">
    Section Title
  </h2>
  <div className="h-px bg-border-dark flex-1 ml-4" />
</div>
```

### Breadcrumb

```tsx
<div className="flex flex-wrap items-center gap-1.5 mb-6 md:mb-8 font-mono text-xs sm:text-sm text-slate-500">
  <Link href="/" className="hover:text-primary transition-colors">
    root
  </Link>
  <span>/</span>
  <span className="hover:text-primary transition-colors">sys</span>
  <span>/</span>
  <span className="text-primary font-bold bg-primary/10 px-1 rounded">
    page
  </span>
</div>
```

### Tech Tags

```tsx
<span className="px-2 py-0.5 bg-background-dark border border-border-dark rounded text-[10px] font-mono text-slate-400">
  Next.js
</span>
```

---

## Animations & Effects

| Effect             | Implementation                                           |
| ------------------ | -------------------------------------------------------- |
| Page enter fade    | `animate-in fade-in slide-in-from-bottom-2 duration-700` |
| Active dot pulse   | `animate-pulse` on `size-1.5 rounded-full bg-primary`    |
| Card hover glow    | `hover:border-primary/40 transition-colors duration-300` |
| Timeline dot scale | `group-hover:scale-125 transition-transform`             |
| Background grid    | `.bg-grid-pattern` utility (radial-masked CSS grid)      |
| Typing cursor      | `.typing-cursor::after` with `blink` keyframe animation  |
| Scrollbar          | Custom styled `::-webkit-scrollbar` for terminal look    |

---

## Background Texture

The subtle dot/line grid used across all pages:

```css
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, #282c39 1px, transparent 1px),
    linear-gradient(to bottom, #282c39 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}
```

Applied in layout as:

```tsx
<div className="absolute inset-0 pointer-events-none z-0 opacity-[0.07] bg-grid-pattern" />
```
