# BetterSanPedro.ph - Baseline Audit

Date: 2026-07-21  
Baseline: `michaustriaqa/betterindang`, commit `05e12c5` (main)

## What was verified

- `npm ci` completed: 380 packages installed, 0 vulnerabilities.
- The shared shell and page routes run locally at `http://127.0.0.1:5173/`.
- The inherited Vite/React app was used as the layout baseline; page content was reviewed before San Pedro publication.

## Completion status (2026-07-21)

- Home: search, larger menu logo, San Pedro history, profile metrics, and source-backed tourism/health links reviewed.
- Government: executive, legislative, department, statistics, and transparency surfaces reviewed in the prior migration pass.
- Services: inherited Indang procedure Markdown removed; service detail routes now point to the San Pedro Citizen's Charter and city website until each local procedure is verified.
- Tourism: 11 source-linked records now cover the Sampaguita Festival, heritage and faith, landmarks, recreation, sports, local life, and the official tourism office. Each item carries an Official source, Historical-archived, or Research lead-verify status; current hours, fees, schedules, and private contacts remain unasserted until verified.
- Statistics: PSA 2024 population and the complete 27-barangay list published with source links.
- History: RA 10420 is the cited legal milestone for cityhood; unsupported narrative has been removed.
- Technical: local lint/build and production route checks are required before each release; the custom `.ph` domain still requires owner DNS verification.

## Route inventory

| Route                              | Current state                                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| `/`                                | San Pedro home, search, history, profile, and calls to action                                      |
| `/services` and service details    | San Pedro categories with official-source guide for unverified procedures                          |
| `/government`, `/legislative`      | Source-backed San Pedro directories and records                                                    |
| `/statistics`                      | PSA population and complete 27-barangay list                                                       |
| `/transparency`                    | City Charter, procurement, budget, DILG FDP, FOI, and COA links                                    |
| `/tourism` and `/tourism/history`  | Searchable tourism directory, festival spotlight, source/status labels, and cited cityhood history |
| `/sitemap`, document routes, `404` | Shared technical surfaces checked after migration                                                  |

## External setup note

The project is now in the user-owned `varien/bettersanpedro` repository. Connecting `BetterSanPedro.ph` requires the domain owner to complete DNS verification in Vercel; the Vercel deployment URL remains the canonical fallback until that is done.
