# rangeway-redesign

The redesign of rangeway.co, served at **redesign.rangeway.co**. Astro, static, self-hosted on the Hostinger VPS. See [DEPLOY.md](DEPLOY.md).

## Local development

```bash
npm install
npm run dev
```

Opens at http://localhost:4321.

## Build

```bash
npm run build
npm run preview
```

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds the site and force-pushes `dist/` to the `deploy-dist` branch; the Hostinger VPS polls that branch every ~2 min and rsyncs it into `/var/www/rangeway-redesign`. Full details in [DEPLOY.md](DEPLOY.md).

## Writing rules

All user-facing copy must follow the Rangeway voice:

- No em dashes. No sentences starting with "And." No fragments.
- `driver's lounge` is always lowercase.
- No hashtags. No statistics.
- Use "drivers," "hotel operators," "Trailkeepers," "Lookouts" (never "cabins/units/rooms").
- "Summit" standalone, never "Rangeway Summit."

## Pages

- `/` home
- `/network` network overview
- `/network/waystation`
- `/network/basecamp`
- `/summit`
- `/our-story`
- `/investors`
- `/partners`

## Structure

- `src/layouts/BaseLayout.astro` — head, fonts, analytics, global CSS
- `src/components/` — shared UI primitives (Nav, Footer, ContactForm, FormatCard, PartnerLogo, PathMark)
- `src/sections/` — composable home page sections
- `src/styles/global.css` — design tokens and base styles
- `public/images/` — static imagery
