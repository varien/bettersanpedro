---
name: branding-consistency
description: Use when building or editing any BetterIndang portal UI — pages, components, colors, fonts, logos, hero bands, or user-facing copy — to keep visuals and naming consistent with the Municipality of Indang brand.
---

# BetterIndang Branding Consistency

## Overview

BetterIndang is a community-run portal for the **Municipality of Indang, Cavite**. Every page must look and read as one coherent brand. **Core rule: use the Tailwind design tokens and shared primitives — never hardcode raw hex, fonts, or off-brand copy.**

## Color tokens

Defined in `tailwind.config.js`. Always reference these via Tailwind classes (`bg-primary-600`, `text-secondary-500`), never raw hex.

| Token       | 500 value | Use for                                      |
| ----------- | --------- | -------------------------------------------- |
| `primary`   | `#0066eb` | Primary actions, links, brand blue           |
| `secondary` | `#ff4d00` | Secondary accents, call-to-action highlights |
| `accent`    | `#f58900` | Gold accents, badges, highlights             |
| `success`   | `#00af5f` | Success states, "free / ₱0", positive info   |
| `warning`   | `#ffb900` | Warnings, advisories                         |
| `error`     | `#e12e2e` | Errors, destructive states                   |
| `gray`      | `#adb5bd` | Text, borders, surfaces (50–900 scale)       |

Each token has a full `50`–`900` scale — pick the shade from the scale instead of inventing a color.

### Hero band blue — known token

Page hero/header bands use the deep brand blue **`#003087`**. This is currently hardcoded as an inline `style={{ backgroundColor: '#003087' }}` in 6 places (`Hero.tsx`, `Legislative.tsx`, `Transparency.tsx`, `Tourism.tsx`, `Statistics.tsx`, `SangguniangBayan.tsx`).

- **Match new hero bands to `#003087`** so they stay consistent with existing pages.
- **Do not invent a new dark blue.** If you touch this, prefer promoting it to a single token (e.g. add `primary.850: '#003087'` to `tailwind.config.js`) and use the class everywhere rather than copy-pasting the hex.

## Typography

Fonts come from `tailwind.config.js` + `src/fonts.css`. Do not introduce other font families.

| Class        | Family                          |
| ------------ | ------------------------------- |
| `font-sans`  | **Inter** (default body font)   |
| `font-mono`  | **Roboto Mono** (code, version) |
| `font-serif` | Georgia                         |

## Logos & assets

Stored in `public/icons/`. Reference by absolute path (`/icons/...`).

| Asset                  | Use                                       |
| ---------------------- | ----------------------------------------- |
| `logo.svg`             | Navbar (on light backgrounds)             |
| `logo-clear.svg`       | Footer / dark backgrounds (light-on-dark) |
| `bettergov-footer.svg` | BetterGov attribution in the footer       |
| `favicon.svg`          | Browser tab favicon                       |

Pick the variant that matches the background — never recolor a logo with CSS filters.

## Icons & emojis

- **Icons come from `lucide-react` only.** Every icon is a lucide React component (`import { Heart } from 'lucide-react'`). Do **not** add or mix in a second icon library (Material Design Icons, Font Awesome, Heroicons, etc.).
- **No emojis anywhere in the UI** — not in JSX text, button/tab labels, headings, data fields (e.g. an `emoji:` property), or markdown rendering. Replace every emoji with the matching lucide icon:
  - check-mark → `<Check />` or `<CheckCircle2 />`
  - ribbon → `<Ribbon />`, pill → `<Pill />`, flask/test-tube → `<FlaskConical />`, stethoscope → `<Stethoscope />`
  - phone → `<Phone />`, globe → `<Globe />`, mobile phone → `<Smartphone />`, warning sign → `<AlertTriangle />`
- Size icons with Tailwind `h-*`/`w-*` and color with `text-*` palette classes — never recolor with CSS filters.

## Naming & voice

- Project name: **BetterIndang** / **BetterIndang.org** (one word, capital B + I).
- Refer to the LGU as **"Municipality of Indang, Cavite"** or **"Local Government Unit of Indang" / "LGU Indang"** — be consistent within a page.
- The portal is **community-run and not an official government website** — keep that framing in footers/disclaimers.
- All user-facing copy is **bilingual (EN / FIL)**. Provide both via the `useTranslation` hook (`const { currentLanguage } = useTranslation(); const isFil = currentLanguage === 'fil';`) — never ship English-only strings on a user-facing page.

## Use the shared primitives

Prefer `src/components/ui/` over raw HTML for consistency: `Section`, `Heading`, `Text`, `Breadcrumbs`, `ScrollToTop`, `Reveal`. These are **default exports** imported by relative path (e.g. `import Section from '../components/ui/Section'`) — not named exports, and not via an `@/` alias.

- Section/page intro paragraphs and body copy → `Text`; section headings → `Heading`.
- Raw `<p>`/`<h3>` is acceptable only for compact in-card labels where a primitive's default sizing doesn't fit.
- `SEO` (`src/components/SEO.tsx`) goes on every **page** (route component). Section-level components don't add their own `SEO`.

## Scroll-reveal animation (apply on every page)

Every page's hero and content sections fade/slide in as they scroll into view — the same motion used on the homepage. Apply it consistently:

- **Mechanism:** `useScrollReveal` (`src/hooks/useScrollReveal.ts`) adds the `reveal-visible` class via IntersectionObserver; the `.reveal` / `.reveal-visible` / `.reveal-stagger` rules in `src/index.css` do the animation.
- **Easiest:** wrap a block in the `Reveal` component (`src/components/ui/Reveal.tsx`):
  `<Reveal as="section" className="...">…</Reveal>`. Add the `stagger` prop to cascade direct children (card grids, lists).
- The shared `Section` primitive **reveals automatically** — pass `reveal={false}` to opt out (e.g. above-the-fold heroes that shouldn't animate).
- **Never hand-roll a new IntersectionObserver per page.** Reuse the hook / `Reveal` / `Section` so easing and timing stay identical everywhere.

## Common mistakes

| Mistake                                                    | Fix                                                        |
| ---------------------------------------------------------- | ---------------------------------------------------------- |
| `style={{ color: '#0066eb' }}` or arbitrary `bg-[#1234ab]` | Use a palette class (`text-primary-500`)                   |
| Introducing a new dark blue for a hero band                | Reuse `#003087` (or the shared token)                      |
| Adding a Google Font / new family                          | Stick to Inter / Roboto Mono / Georgia                     |
| Recoloring `logo.svg` for a dark background                | Use `logo-clear.svg`                                       |
| English-only user-facing text                              | Add the FIL string via `useTranslation`                    |
| Raw `<h2>` / `<section>` with ad-hoc styles                | Use `Heading` / `Section` primitives                       |
| Emoji in UI text or as an icon                             | Use a lucide icon (`<Check />`, `<Phone />`, `<Ribbon />`) |
| Adding a second icon library (MDI, Font Awesome)           | lucide-react only                                          |
| New page whose sections don't animate on scroll            | Wrap them in `<Reveal>` or use `<Section>`                 |
| Hand-rolled IntersectionObserver for reveal                | Reuse `useScrollReveal` / `<Reveal>`                       |

## Quick checklist before finishing UI work

- [ ] No raw hex / arbitrary color classes — palette tokens only
- [ ] Hero band (if any) uses `#003087`
- [ ] Fonts limited to Inter / Roboto Mono / Georgia
- [ ] Icons are lucide-react components — no emojis, no second icon library
- [ ] Sections reveal on scroll (via `<Reveal>` / `<Section>`, not a one-off observer)
- [ ] Correct logo variant for the background
- [ ] Bilingual EN + FIL copy
- [ ] `SEO` + `ui/` primitives used
