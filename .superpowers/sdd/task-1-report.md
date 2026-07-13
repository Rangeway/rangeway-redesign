# Task 1 Implementation Report — Fresh Foundation, Operating Shell, and Homepage

## Outcome

Implemented a fresh static Astro foundation and a visually decisive Rangeway operating-company homepage in the isolated `codex/ionna-operating` worktree. No components, layouts, CSS, section cadence, crops, or deployment files were imported from either `rangeway-preview` or the rejected worktree.

The homepage follows the required promise → proof → utility → story → current activity sequence:

1. One-image cinematic hero with the exact tagline `Travel farther. Stop better.`
2. Compact operating-proof rail using truthful company signals rather than fabricated live-network metrics
3. Image-led hospitality statement: “The stop is the product”
4. Large west-to-east Route Board in the required Bozeman → Mojave / Antelope Valley → St. Louis order
5. Three compositionally differentiated format modules for Waystation, Basecamp, and Summit
6. Capability-led partner proof
7. Dated current-activity story and direct Newsroom / Field Notes routes
8. Strong closing action and substantial navigation footer

## Aesthetic and implementation choices

- **Register:** industrial / utilitarian hospitality
- **Typography:** Raleway display and navigation, Source Sans 3 body copy, IBM Plex Mono operational labels
- **Palette:** Highway Navy `#17313E`, deep support navy `#142B35`, Rangeway Sun `#F2B64C`, Oxide Red `#993A28`, Roadmap Cream `#F7E6C4`, slate `#52636B`, and warm white
- **Motion:** restrained hero mask/sweep and route-line pulse; all content is visible in baseline HTML and reduced-motion collapses animation duration
- **Memorable element:** a full operating route board with a physical west-to-east line, numbered project nodes, corridor metadata, sourced activity descriptions, and direct public project links—without live-status badges
- **Shell:** centered capsule wordmark axis on desktop; native `<details>/<summary>` mobile menu so navigation works without JavaScript
- **Media:** only selected official logos and approved project, format, team, and partner media were copied. No CNAME, deployment file, prohibited person asset, or legacy-format asset was copied.

## TDD record

### RED

Created `test/site-contract.test.mjs` before any production source. The first run was:

```text
node --test test/site-contract.test.mjs
```

Expected failure observed:

```text
ENOENT: no such file or directory, open '.../src/pages/index.astro'
tests 1 · pass 0 · fail 1
```

The failure was caused by the fresh homepage source not existing, which was the intended RED condition.

### GREEN

After creating the scaffold, content model, shell, components, homepage, global aesthetic system, and approved asset set:

```text
node --test test/site-contract.test.mjs
```

Result:

```text
tests 1 · pass 1 · fail 0
```

The contract checks:

- exact tagline
- centered capsule header hooks
- ordered public projects
- three approved formats
- four approved team members
- exact palette and type tokens
- prohibited content and rejected-worktree references
- absence of baseline hidden reveal content

## Integration and build verification

The first Astro diagnostic run exposed one strict-type issue: internal navigation records lacked an explicit `external` field. The data model was normalized with `external: false` on internal destinations; no type assertion or relaxed compiler setting was used.

Final command:

```text
npm install && npm test && npm run check && npm run build && npm audit --omit=dev && git diff --check
```

Final result:

```text
npm install: complete
npm test: 1 passed, 0 failed
astro check: 0 errors, 0 warnings, 0 hints
astro build: 1 static page built, dist/index.html generated
npm audit --omit=dev: 0 vulnerabilities
git diff --check: clean
```

Astro was moved to `^7.0.8` after the initial install identified advisories in the earlier dependency line. The complete check/build suite remained green after the upgrade.

Additional built-output checks confirmed:

- `noindex, nofollow` is present in `dist/index.html`
- the exact tagline, capsule shell, route board, and footer are present in static HTML
- no prohibited person names, legacy format name, site-host solicitation, false open-network claim, or rejected-worktree reference appears in `src`, `public`, or `dist`
- no prohibited filenames appear in the copied asset inventory
- no preview or rejected-worktree component import exists

## Design self-review

### Distinction from `rangeway-preview`

The composition is visibly new in source architecture and section grammar. It does not use the preview split hero, yellow text panel, ellipse crop, arrival strip, field-guide grid, repeated ruled index rows, repeated warm/dark editorial cadence, or its navigation/footer construction. The homepage opens on a single cinematic image and develops through an operating rail, an asymmetric image/standard statement, a route-system utility, and three deliberately different format treatments.

### IONNA-inspired architecture, translated to Rangeway

The result borrows the operating confidence of a centered capsule shell, immediate proof, large media, recurring decisions, visible partner systems, dated activity, and a useful footer. It does not borrow IONNA’s palette, proprietary naming, humor, icons, illustration language, or exact component styling.

### Truth boundary

The page feels active through public projects, company publishing, partner roles, dated announcements, and direct team access. It does not claim an open location, live network data, uptime, pricing, hours, connector availability, or drivers served today. Project language stays in development / public-plan territory.

### Responsive and accessibility review

- Desktop layout uses an inset capsule, large image fields, and dense operational modules.
- Breakpoints at 1100px, 820px, and 440px collapse the capsule to a native menu, route rows to compact multi-line records, formats to single-column compositions, partner proof to one column, and footer groups to two/one columns.
- `overflow-x: clip`, bounded grid tracks, responsive image sizing, and mobile-specific route-board placement guard horizontal overflow.
- Semantic landmarks, a skip link, labeled navigation, descriptive alternative text, visible focus treatment, native menu semantics, and reduced-motion handling are present.
- Content is rendered in static HTML before scripts; the homepage contains no client script and no reveal-gated content.

## Visual verification concern

The required Interceptor browser workflow was invoked after the clean build. Its mandatory isolation preflight stopped before opening any browser tab:

```text
[PreflightIsolation] FAIL: INTERCEPTOR_TEST_CONTEXT_ID is not set.
```

Per the Interceptor safety doctrine, no fallback to the operator’s working browser, raw screenshot utility, or window manipulation was attempted. Consequently, there is no rendered screenshot artifact for Task 1. This is the only completion concern; source, static-output, diagnostics, dependency, safety, and build verification are complete.

## Files delivered

- `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`
- `src/config.ts`
- `src/data/site-content.ts`
- `src/styles/global.css`
- `src/layouts/SiteLayout.astro`
- `src/components/SiteHeader.astro`
- `src/components/SiteFooter.astro`
- `src/components/RouteBoard.astro`
- `src/components/ResponsiveImage.astro`
- `src/pages/index.astro`
- `public/favicon.svg` and approved files under `public/images/`
- `test/site-contract.test.mjs`
