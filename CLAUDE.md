# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server (localhost:5173)
npm run build        # TypeScript check + Vite production build
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format with Prettier
npm run dev:yaml     # Convert YAML to JSON, then start dev server
npm run setup        # Interactive setup script for new installations
```

Pre-commit hook runs `lint-staged` automatically (ESLint + Prettier on staged files).

## Architecture

This is a React 19 + TypeScript + Vite app for Philippine Local Government Units (LGUs). It uses React Router, Tailwind CSS, i18next for multilingual support, and a YAML-based content system.

### Routing

`src/App.tsx` defines the following routes:

- `/` — Home page
- `/services` / `/services/:category` — Services listing
- `/services/:category/:documentSlug` — Service document viewer
- `/services/health-services/access-free-check-ups-labs-and-medicines-through-philhealth-yakap` — Yakap interactive page (dedicated route, takes precedence over the generic service document route)
- `/government` / `/government/:category` — Government section listing
- `/government/:category/:documentSlug` — Government document viewer
- `/government/departments/executive` — Executive Directory
- `/government/departments/officials` — Sangguniang Bayan
- `/government/legislative` / `/legislative` — Legislative page
- `/statistics` — Statistics page (YAML-driven municipality profile + barangay data)
- `/transparency` — Transparency page
- `/tourism` / `/tourism/:category` — Tourism page
- `/sitemap` — Sitemap page
- `/:documentSlug` / `/:lang/:documentSlug` — Generic document viewer (markdown content)
- `*` — NotFound (404) page

> Note: more specific routes (e.g. the Yakap and `/government/departments/*` routes) are declared before their generic `:category`/`:documentSlug` counterparts so they match first.

### Content System

Content is stored as YAML and Markdown files under `content/`. Two parallel content trees exist:

#### Services (`content/services/`)

1. **`src/data/services.yaml`** — Top-level service categories (name, slug, icon, description). The `icon` field must be a valid Lucide React icon name.
2. **`content/services/{category-slug}/index.yaml`** — Lists pages under each category (`pages:` array with `name`, `slug`, `description`).
3. **`content/services/{category-slug}/{page-slug}.md`** — Actual markdown content for each service page.

When adding a new service category, you must:

- Add an entry to `src/data/services.yaml`
- Create `content/services/{slug}/index.yaml`
- Add the static import and mapping entry to `src/data/yamlLoader.ts` (`categoryIndexMap`)

#### Government (`content/government/`)

1. **`src/data/government.yaml`** — Top-level government categories (name, slug, icon, description).
2. **`content/government/{category-slug}/index.yaml`** — Lists pages under each category.
3. **`content/government/{category-slug}/{page-slug}.md`** — Markdown content for each department/office page.

When adding a new government category, you must:

- Add an entry to `src/data/government.yaml`
- Create `content/government/{slug}/index.yaml`
- Add the static import and mapping entry to `src/data/yamlLoader.ts` (`govCategoryIndexMap`)

Markdown files are loaded dynamically via `import()` in `src/lib/markdownLoader.ts`. The title is extracted from the first `# Heading` and the description from the first paragraph.

#### Companion JSON files

A markdown page can have an optional companion JSON file with the same slug (e.g. `executive.md` + `executive.json`). The loader attempts to import the JSON and passes it to `interpolate()`, which replaces `{PLACEHOLDER}` tokens in the markdown. Resolution order: JSON value → `VITE_<KEY>` env var → unchanged token.

Example: `{MAYOR}` in the markdown is replaced with the `MAYOR` value from `executive.json`, or `VITE_MAYOR` if no JSON file exists.

### Internationalization

- i18next is configured in `src/i18n.ts` (initialized once from `main.tsx`). `HttpBackend` loads translation files from `public/locales/{lang}/common.json`.
- Language detection order: `localStorage` → `navigator` → `htmlTag`
- Fallback language: `en`
- Supported languages are defined in `src/types/index.ts` (`LanguageType`)
- Two locales exist: `public/locales/en/common.json` and `public/locales/fil/common.json`
- **Always** access translations through the project's `useTranslation` hook in `src/hooks/useTranslation.ts` (which wraps `react-i18next` and also exposes `currentLanguage` / `changeLanguage`). Do not import `useTranslation` directly from `react-i18next`.

### Environment Variables

The app uses `VITE_GOVERNMENT_NAME` (referenced in `Services.tsx`) for branding. Additional env vars are configured via the setup script.

### UI Components

Reusable primitives live in `src/components/ui/`: `Section`, `Heading`, `Text`, `Card`, `ListItem`, `Breadcrumbs`, `ScrollToTop`. Use these instead of raw HTML elements for consistency.

### Code Style

- Single quotes, 2-space indentation, trailing commas (ES5), semicolons, 80-char line width (enforced by Prettier)
- Arrow functions omit parens for single arguments

## Versioning

The project version is displayed in `src/components/layout/Footer.tsx` (look for the `v0.x.x` string in the bottom bar).

**After every set of changes, you must:**

1. Add a new entry to `CHANGELOG.md` (top of the file, [Keep a Changelog](https://keepachangelog.com/) format) describing what was added, changed, or fixed — including the date and the new version number. The version displayed in `Footer.tsx` must stay in sync with the latest entry here.
2. Bump the version string in `src/components/layout/Footer.tsx` to match (and the `version` field in `package.json` plus the `copyright` strings in `public/locales/*/common.json`).

Follow [Semantic Versioning](https://semver.org/): PATCH for fixes/content, MINOR for new pages or features, MAJOR for breaking schema or routing changes.

> `SECURITY.md` holds only the security policy (vulnerability reporting, scope, supported versions) — do not put changelog entries there.

## Git & Commits

- **Always update `CHANGELOG.md` before pushing.** Every push (and every PR) must include a `CHANGELOG.md` entry that describes the changes being pushed — no undocumented or unmonitored changes are allowed to reach the remote. If a change ships without a changelog entry, that is a defect to be fixed, not an exception. Update the changelog as part of the same commit/push, not afterward.
- **Do not add any Claude / AI attribution to commits or pull requests.** No `Co-Authored-By: Claude ...` trailer on commit messages, and no "Generated with Claude Code" (or similar) footer in PR descriptions. Keep commit and PR messages free of AI tool attribution.
- Write commit messages in the project's normal voice (imperative summary + concise body) without mentioning the assistant.
