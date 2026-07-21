# BetterSanPedro.ph — Baseline Audit

Date: 2026-07-21  
Baseline: `michaustriaqa/betterindang`, commit `05e12c5` (main)

## What was verified

- `npm ci` completed: 380 packages installed, 0 vulnerabilities.
- `npm run lint` completed with two existing React Hook dependency warnings in `Navbar.tsx` and `Document.tsx`.
- `npm run build` completed and generated a 69-URL sitemap. Vite reports one JavaScript chunk over 500 kB.
- The app runs locally at `http://127.0.0.1:5173/`.
- The browser console reports a missing `public/locales/en-US/common.json` request, repeated empty `href` attributes, and a Vite client script error during navigation. These are baseline technical findings to triage before launch; they were not changed during the audit.
- A targeted rendering safeguard now falls back to `BetterSanPedro.ph` when `VITE_GOVERNMENT_NAME` is unset, so the shared hero heading cannot render blank. This does not migrate page content or change the overall layout.

## Current route and content inventory

The baseline has shared shell pages for home, services, government, transparency, statistics, tourism, sitemap, and 404 handling. It also has government directories, legislative pages, service-category and service-detail pages, a document page, an interactive PhilHealth YAKAP page, and an Indang history page.

The `content/` tree contains 38 files across government, services, and tourism. The browser scan confirms that the rendered experience is still Indang-specific: branding, domain links, Cavite contacts, population and barangay statistics, officials, history, tourism, and YAKAP copy all require review before publication for San Pedro.

| Route | Baseline finding | Migration action |
| --- | --- | --- |
| `/` | Indang home, contacts, metrics, leadership, tourism, and YAKAP | Replace city facts and links; preserve layout until separately approved |
| `/services`, `/services/:category`, service documents | Indang procedures and local references | Re-source and rewrite one service category at a time |
| `/government`, `/government/:category`, `/legislative` | Indang offices, officials, and legislative records | Replace with verified San Pedro directory and records |
| `/statistics` | 36-barangay Indang profile and CMCI links | Replace with cited San Pedro/PSA/DTI data |
| `/transparency` | Indang disclosure and accountability links | Replace with current San Pedro records and clearly mark gaps |
| `/tourism`, `/tourism/:category`, `/tourism/history` | Indang tourism inventory and history | Replace only with sourced San Pedro material |
| `/sitemap`, document routes, `404` | Shared technical surfaces | Update labels, URLs, metadata, and links after content migration |

## Migration queue (approval-gated)

1. Shared identity: site name, domain, metadata, navigation labels, footer, social links, emergency contacts.
2. Home: city overview, population/area/barangays, service highlights, leadership, contact, map/weather, and calls to action.
3. Government: executive and legislative directories, departments, offices, and official links.
4. Services: retain useful categories, then replace each procedure with San Pedro requirements, offices, fees, channels, and source dates.
5. Statistics and barangays: replace Indang figures with a cited San Pedro profile and barangay directory.
6. Transparency: replace links and datasets with San Pedro/City sources and mark unavailable records clearly.
7. Tourism and history: use verified San Pedro places, culture, and history; remove unsupported claims.
8. Health/YAKAP: confirm whether the program and provider details apply locally before retaining or rewriting them.
9. Technical polish: update sitemap, SEO/OG metadata, links, accessibility labels, and error states for the `.ph` site.

The shared identity pass and first Home page pass are implemented locally. The Home page now uses cited San Pedro profile/contact data and explicitly defers unsourced tourism, history, leadership, and YAKAP content. Each remaining page group will be implemented only after its migration brief and sources are approved.

## External setup blocker

The GitHub connector and local environment do not currently expose a fork-creation operation (`gh` is not installed). The local checkout is therefore an upstream baseline, not yet a user-owned fork. Create `varien/bettersanpedro` (or provide the intended GitHub owner) before the first push.
