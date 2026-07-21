# Migration Brief 01: Shared Identity

Status: Implemented locally - logo selection and page-content migration remain approval-gated

## Scope

Review the shared identity surfaces in `index.html`, `src/App.tsx`, SEO metadata, navigation, footer, contact defaults, and public sitemap generation. Keep the current layout, typography, spacing, and component structure.

## Proposed changes

- Rename visible site identity to `BetterSanPedro.ph`.
- Use `https://bettersanpedro.ph` for canonical and sitemap URLs when the domain is ready.
- Add a clear volunteer-built, independent-portal disclaimer.
- Replace BetterIndang branding, repository links, social links, and Indang/Cavite contact defaults with verified San Pedro values or an explicit placeholder pending verification.
- Preserve the existing navigation categories until the page migration briefs approve content changes.
- Do not add unverified population, officials, hotlines, fees, or service claims in this step.

## Source checkpoints

- [Better LGU guide](https://lgu.bettergov.ph/GUIDE) for portal identity and independence.
- [San Pedro City official site](https://cityofsanpedrolaguna.gov.ph/) for official external linking and contact verification.

## Acceptance criteria

- No `Indang`, `Cavite`, `betterindang.org`, or upstream social/repository link remains in shared identity code.
- Site title, description, canonical, footer, and disclaimer consistently identify BetterSanPedro.ph.
- Existing layout remains unchanged except for text, links, and required metadata.
- `npm run lint` and `npm run build` pass; mobile, desktop, keyboard, English, and Filipino checks are recorded.
- Any unresolved contact or domain value is explicitly labeled for follow-up rather than guessed.

## Implemented in the first pass

- Updated the document shell, SEO defaults, canonical domain, home metadata, and bilingual site identity to BetterSanPedro.ph.
- Replaced the upstream image logo in the shared navigation/footer with a neutral text wordmark until a logo draft is approved.
- Removed unverified Indang hotline defaults from the shared emergency bar and replaced them with a verification notice.
- Added a language-only i18n load policy so `en-US` resolves to the available English locale.
- Updated the weather lookup to the San Pedro area; exact civic data and contact sources remain a separate research task.

## Deferred until owner approval or sourcing

- Select one of the three editable logo drafts in `docs/LOGO-DRAFTS.md`.
- Replace remaining leadership, tourism, history, and service content with verified San Pedro data; the Home statistics and contact block now use cited San Pedro sources.
- Add verified social, GitHub, hotline, and official-office links.
