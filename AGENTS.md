# BetterSanPedro.ph

BetterSanPedro.ph is a volunteer-built, community-run civic portal for San
Pedro, Laguna under the Better LGU initiative of BetterGov.ph. It is
independent of the official city website.

Project references:

- Better LGU guide: https://lgu.bettergov.ph/GUIDE
- Base repository: https://github.com/michaustriaqa/betterindang
- Target domain: https://bettersanpedro.ph

## Working rules

- Preserve the BetterIndang architecture and overall formatting while migrating page by page.
- Never carry over Indang facts, people, branding, statistics, or contacts.
- Prefer current primary sources: the City Government of San Pedro, PSA, COA, DBM/DILG, DTI, and responsible agencies.
- Record source URLs and verification dates for civic facts; label community or secondary information.
- Keep the portal nonpartisan, accessible, mobile-first, bilingual (English/Filipino), and privacy-conscious.
- Clearly state that the portal is independent and volunteer-built.
- Keep content in YAML/Markdown where practical; use environment variables for secrets.
- Run `npm run lint` and `npm run build` before completing implementation work.
- Test changed pages on mobile, desktop, keyboard navigation, and both languages.
- Tie changes to the relevant Linear issue and update documentation when workflows or schemas change.

Linear is the source of truth for project work and status. Obtain owner approval before implementing each page or coherent content section.
