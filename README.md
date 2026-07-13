# Rangeway operating website

This repository contains a non-production, static Astro preview for a fresh Rangeway website. It uses Rangeway's approved facts and media inside an IONNA-inspired operating-company architecture, without reusing the rejected preview site's components, page shells, or section grammar.

The preview is intentionally non-indexing. Its configured site URL is `https://redesign.rangeway.co`; this is a temporary review hostname, not the production Rangeway site.

## Local review

```bash
npm install
npm run dev
```

For the built preview:

```bash
npm run build
npm run preview
```

Run the complete verification suite with:

```bash
npm test && npm run check && npm run build && node --test test/build-output.test.mjs && git diff --check
```

## Deployment

The static `dist/` output is served from the Rangeway VPS at `https://redesign.rangeway.co`. The hostname remains `noindex, nofollow` while this version is under review.

## Routes

The static build authors 15 routes:

- `/`
- `/network`
- `/network/waystation`
- `/network/basecamp`
- `/network/summit`
- `/our-story`
- `/team`
- `/partners`
- `/investors`
- `/commitments`
- `/contact`
- `/contact/thanks`
- `/privacy`
- `/terms`
- `/404.html`

## Architecture

- `src/data/site-content.ts` is the central content ledger for company details, navigation, formats, projects, team, partners, and public activity.
- `src/layouts/SiteLayout.astro` supplies the shared non-indexing document shell, header, footer, metadata, and page-family marker.
- `src/components/` contains shared operating primitives. Format, company, partner, investor, contact, utility, and legal pages retain distinct compositions.
- `test/site-contract.test.mjs` checks source contracts and truth boundaries.
- `test/build-output.test.mjs` checks the generated static HTML and CSS across all 15 routes.

The header uses a native `details`/`summary` mobile menu, so navigation remains available without JavaScript. JavaScript adds mobile focus containment, Escape/outside close, and focus restoration. All primary content is emitted in static HTML; motion is optional and has a reduced-motion override.

## Truth boundaries

The site may describe Rangeway as designing, developing, publishing, partnering, hiring, raising, and building. It does not claim that a Rangeway location is open, that drivers are being served today, or that live status, pricing, hours, uptime, connector availability, or opening dates exist.

Public project order is Bozeman, Mojave / Antelope Valley, then St. Louis. Formats are Waystation, Basecamp, and Summit only. Waystation is automated and unstaffed; Basecamp is staffed; Summit uses Lookouts. The team is limited to Zak Winnick, Luke Schuette, Theo Reichgelt, and Stephanie McGreevy. Partner configurations are explicitly project-phase-specific.

## Contact form

The contact form retains a native POST fallback to Formsubmit and native required/email validation. Its enhancement reports idle, submitting, offline/error, and timeout states without replacing the native submission. Successful delivery redirects to `/contact/thanks` through the configured `_next` field.

Do not submit the form during local verification. No real request was sent while producing this review.

## Verification record

See [docs/verification/2026-07-13-ionna-operating-review.md](docs/verification/2026-07-13-ionna-operating-review.md) for route/viewport evidence, accessibility and resilience checks, RED/GREEN fixes, external limitations, and the explicit no-deployment record.
