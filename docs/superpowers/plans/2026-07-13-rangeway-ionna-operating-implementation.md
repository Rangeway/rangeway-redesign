# Rangeway Operating Network Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fresh, non-production Astro website that uses Rangeway preview content inside an IONNA-inspired operating-company architecture without reusing the rejected preview design.

**Architecture:** Start from an empty Astro scaffold and import only approved facts, legal copy, official lockups, and selected media into a new typed content model. Build distinct layout families around one shared accessible shell; render active-company proof from current projects and public activity without inventing open locations. Visual verification is a first-class deliverable, especially for subpages and no-JavaScript rendering.

**Tech Stack:** Astro, TypeScript, component-scoped CSS plus a small token stylesheet, Node test runner, Playwright/browser screenshots for visual verification.

## Global Constraints

- `rangeway-preview` is a content inventory only. Do not import its components, CSS, section order, crops, frames, or page shells.
- Draw heavily from IONNA's layout architecture, pacing, operational proof, and differentiated page families; do not copy its colors, typefaces, illustrations, icons, button styling, proprietary naming, photography, jokes, or copy.
- The exact tagline is `Travel farther. Stop better.`
- Use Highway Navy `#17313E`, deep support navy `#142B35`, Rangeway Sun `#F2B64C`, Oxide Red `#993A28`, Roadmap Cream `#F7E6C4`, slate `#52636B`, and warm white.
- Use Raleway display, Source Sans 3 body, and IBM Plex Mono operational labels.
- Public project order is Bozeman, Mojave / Antelope Valley, St. Louis. Do not publish unverified statuses, opening dates, live pricing, live hours, live charger availability, or claims that a Rangeway location is open.
- Formats are Waystation, Basecamp, and Summit only. Waystation is automated and unstaffed. Basecamp is staffed. Summit uses Lookouts, never cabins, units, or rooms.
- Team is Zak Winnick, Luke Schuette, Theo Reichgelt, and Stephanie McGreevy only. Exclude James/Jim Regan, Raul Dominguez, and Paul Devon from code, copy, assets, metadata, and built output.
- Rangeway does not solicit site hosts.
- Every route must remain fully visible without JavaScript and with reduced motion. Reveal effects may not set baseline content to hidden.
- Do not deploy, change a production domain, or send a real form submission.
- Do not reuse `Hero`, `PageHero`, `FormatPage`, `FormatCard`, `FieldGuideGrid`, `ExperienceCollage`, `ProjectStrip`, `ArrivalStrip`, `index-row`, or the rejected nav/footer composition.

---

### Task 1: Fresh foundation, operating shell, and homepage

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`
- Create: `src/config.ts`, `src/data/site-content.ts`, `src/styles/global.css`
- Create: `src/layouts/SiteLayout.astro`
- Create: `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`, `src/components/RouteBoard.astro`, `src/components/ResponsiveImage.astro`
- Create: `src/pages/index.astro`
- Copy: approved files from the source inventory into `public/images/`, excluding prohibited team assets
- Create: `test/site-contract.test.mjs`

**Interfaces:**
- Produces: `SITE`, `NAV_LINKS`, `FORMATS`, `PROJECTS`, `TEAM`, `PARTNER_GROUPS`, and `EXTERNAL_LINKS` from `src/data/site-content.ts`.
- Produces: `SiteLayout` with `title`, `description`, and optional `class` props; default slot contains visible content before scripts run.
- Produces: `ResponsiveImage` with `src`, `srcSmall`, `alt`, `width`, `height`, `sizes`, `class`, and optional `position` props.
- Produces: `RouteBoard` rendering PROJECTS in their existing array order without status badges.

- [ ] **Step 1: Write the failing foundation contract**

Create `test/site-contract.test.mjs` with Node tests that assert the new source contains the exact palette/type tokens, centered capsule shell hooks, fixed tagline, ordered projects, three formats, four approved team members, no prohibited names/Trailhead/host solicitation, no imports from the rejected worktree, and no baseline `opacity: 0` on reveal content.

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("fresh operating homepage contract", () => {
  const home = read("src/pages/index.astro");
  const data = read("src/data/site-content.ts");
  const css = read("src/styles/global.css");
  assert.match(home, /Travel farther\. Stop better\./);
  assert.ok(data.indexOf("Bozeman") < data.indexOf("Mojave"));
  assert.ok(data.indexOf("Mojave") < data.indexOf("St. Louis"));
  for (const name of ["Waystation", "Basecamp", "Summit", "Zak Winnick", "Luke Schuette", "Theo Reichgelt", "Stephanie McGreevy"]) assert.match(data, new RegExp(name));
  for (const forbidden of ["Trailhead", "James Regan", "Jim Regan", "Raul Dominguez", "Paul Devon", "Host a"] ) assert.doesNotMatch(`${home}\n${data}`, new RegExp(forbidden, "i"));
  for (const token of ["#17313E", "#142B35", "#F2B64C", "#993A28", "#F7E6C4", "#52636B"]) assert.match(css.toUpperCase(), new RegExp(token.toUpperCase()));
  assert.doesNotMatch(css, /\.reveal[^}]*opacity\s*:\s*0/s);
});
```

- [ ] **Step 2: Run the test to verify RED**

Run: `node --test test/site-contract.test.mjs`

Expected: FAIL because the fresh Astro source does not exist.

- [ ] **Step 3: Scaffold the app and content model**

Create a minimal static Astro app. Copy only official logo assets and selected project/format/team/partner media from `/Users/zakwinnick/Documents/GitHub/rangeway-preview/public/`; do not copy James Regan assets, CSS, page components, or CNAME/deployment files. Encode all approved content in the exported arrays named above. Set preview robots to `noindex, nofollow`.

- [ ] **Step 4: Build the new shell and homepage**

Implement the centered capsule navigation, accessible mobile menu with native fallback, cinematic one-image hero, operating-proof rail, hospitality statement, RouteBoard, differentiated format sequence, partner proof, current-activity module, closing action, and substantial footer. The homepage must follow promise → proof → utility → story → current activity and must not recreate the rejected split hero or preview section cadence.

- [ ] **Step 5: Verify GREEN and build**

Run: `npm install && npm test && npm run check && npm run build`

Expected: all tests pass, Astro reports zero diagnostics, and `dist/index.html` builds.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src public test
git commit -m "Build fresh Rangeway operating homepage"
```

### Task 2: Network overview and three distinct format pages

**Files:**
- Create: `src/components/FormatCompare.astro`, `src/components/ProjectPanel.astro`, `src/components/OperatingFacts.astro`
- Create: `src/pages/network.astro`
- Create: `src/pages/network/waystation.astro`, `src/pages/network/basecamp.astro`, `src/pages/network/summit.astro`
- Modify: `test/site-contract.test.mjs`

**Interfaces:**
- Consumes: `FORMATS`, `PROJECTS`, `RouteBoard`, `ResponsiveImage`, `SiteLayout`.
- Produces: `FormatCompare` fed by `FORMATS`, with honest amenity labels and no live availability.
- Produces: three visually and structurally distinct pages; shared data is allowed, a universal page template is not.

- [ ] **Step 1: Add failing network and format contracts**

Add tests asserting `/network` includes the three formats, Indoor Comfort Guarantee, project route board, and no fake locator; each detail page contains its required operating model and a unique composition marker.

```js
test("format pages are truthful and compositionally distinct", () => {
  const waystation = read("src/pages/network/waystation.astro");
  const basecamp = read("src/pages/network/basecamp.astro");
  const summit = read("src/pages/network/summit.astro");
  assert.match(waystation, /automated/i);
  assert.match(waystation, /unstaffed/i);
  assert.match(basecamp, /staffed/i);
  assert.match(basecamp, /Trailkeepers/);
  assert.match(summit, /Lookouts/);
  assert.doesNotMatch(summit, /cabins|units|rooms/i);
  assert.match(waystation, /data-composition="waystation-flow"/);
  assert.match(basecamp, /data-composition="basecamp-service"/);
  assert.match(summit, /data-composition="summit-destination"/);
});
```

- [ ] **Step 2: Run the focused test to verify RED**

Run: `node --test --test-name-pattern='format pages|network' test/site-contract.test.mjs`

Expected: FAIL because the network and format routes do not exist.

- [ ] **Step 3: Implement the network overview**

Build an IONNA-inspired product/experience overview: decisive opening, full-width place image, three benefits, an honest format/amenity comparison, operational project proof, partner/technical band, and current-activity close. Do not create a map or location finder.

- [ ] **Step 4: Implement distinct format narratives**

Waystation uses a fast route-flow composition; Basecamp uses a staffed service-day composition; Summit uses a slower destination/Lookout composition. Vary media ratios, section ordering, and information density while preserving shared brand tokens and navigation.

- [ ] **Step 5: Verify focused and full suites**

Run: `npm test && npm run check && npm run build`

Expected: all tests pass and all five routes build.

- [ ] **Step 6: Commit**

```bash
git add src/components src/pages/network* test/site-contract.test.mjs
git commit -m "Build Rangeway network and format pages"
```

### Task 3: Distinct company, partner, investor, contact, and legal families

**Files:**
- Create: `src/components/PeopleField.astro`, `src/components/PartnerField.astro`, `src/components/ContactForm.astro`, `src/components/LegalLayout.astro`
- Create: `src/pages/our-story.astro`, `src/pages/team.astro`, `src/pages/partners.astro`, `src/pages/investors.astro`, `src/pages/commitments.astro`, `src/pages/contact.astro`, `src/pages/contact/thanks.astro`, `src/pages/privacy.astro`, `src/pages/terms.astro`, `src/pages/404.astro`
- Modify: `test/site-contract.test.mjs`
- Create: `test/build-output.test.mjs`

**Interfaces:**
- Consumes: central content arrays, `SiteLayout`, `ResponsiveImage`, project and partner data.
- Produces: `ContactForm` with native POST fallback plus accessible enhancement; verification must mock/intercept all submissions.
- Produces: `LegalLayout` with `title`, `effectiveDate`, and anchor navigation.

- [ ] **Step 1: Add failing page-family contracts**

Add source tests for every route, approved team-only rendering, visible partner logos/roles, sustained investor sequence, readable commitments anchors, native contact POST, compact utility pages, and legal reading measure between `62ch` and `76ch`.

```js
test("company and utility families preserve distinct purposes", () => {
  const team = read("src/pages/team.astro");
  const partners = read("src/pages/partners.astro");
  const contact = read("src/components/ContactForm.astro");
  const legal = read("src/components/LegalLayout.astro");
  assert.match(team, /PeopleField/);
  assert.match(partners, /PartnerField/);
  assert.match(contact, /method="POST"/);
  assert.match(contact, /action="https:\/\/formsubmit\.co\//);
  assert.match(legal, /max-width:\s*(6[2-9]|7[0-6])ch/);
});
```

- [ ] **Step 2: Run the focused test to verify RED**

Run: `node --test --test-name-pattern='company|utility|contact|legal' test/site-contract.test.mjs`

Expected: FAIL because these route families do not exist.

- [ ] **Step 3: Implement company and proof pages**

Build page-purpose-specific compositions: visual origin/current-work story; immediately visible people field; logo-led partner capability field; investor thesis/evidence/pipeline/recognition/action; anchored commitments chapters. Do not use a universal subpage hero or repeated index-row grammar.

- [ ] **Step 4: Implement contact, legal, and utility pages**

Build support-style inquiry routes plus the existing interest form and exact role-specific contacts. Preserve all privacy/terms substance from the content inventory inside the quiet LegalLayout. Build compact thanks and 404 states. Do not send real requests in tests.

- [ ] **Step 5: Add built-output safety checks**

Create `test/build-output.test.mjs` that recursively reads `dist/**/*.html` and asserts all route content is visible in source HTML, preview robots are non-indexing, prohibited names/terms/status claims are absent, legal anchors exist, and every primary route has a unique `<main>` family class.

- [ ] **Step 6: Verify all routes**

Run: `npm test && npm run check && npm run build && node --test test/build-output.test.mjs`

Expected: all tests pass, zero Astro diagnostics, and 15 routes build.

- [ ] **Step 7: Commit**

```bash
git add src/components src/pages test
git commit -m "Build Rangeway company and utility pages"
```

### Task 4: Visual, responsive, accessibility, and handoff verification

**Files:**
- Modify: any source files required by verified defects
- Create: `docs/verification/2026-07-13-ionna-operating-review.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: final built site.
- Produces: verification record with route/viewport evidence and a local preview ready for user review.

- [ ] **Step 1: Start the built preview and capture every primary route**

Run the built site locally. Inspect all 15 routes at `1440×1100`, `1024×768`, `390×844`, and `360×800`. Scroll each route incrementally so lazy media and motion states execute. Capture homepage plus representative network, format, team, partner, investor, contact, and legal screenshots.

- [ ] **Step 2: Enforce the visual rejection bar**

Compare the rendered homepage and subpages against `/Users/zakwinnick/Documents/rangeway-redesign-ionna/.superpowers/research/rejected-subpage-audit.md`. Verify there is no universal split hero, repeated preview cadence, hidden reveal content, multi-screen accidental blank bands, duplicated lounge imagery, clipped content, or unreadable legal formatting.

- [ ] **Step 3: Verify resilience and accessibility**

Test keyboard order, skip link, visible focus, mobile menu open/close/trap/restore, native no-JavaScript navigation, no-JavaScript content, reduced motion, zoom-safe layout, form validation, intercepted semantic success/failure/timeout states, and horizontal overflow. Do not send a real form submission.

- [ ] **Step 4: Fix verified defects using focused RED/GREEN guards**

For each defect, first add a regression assertion to `test/site-contract.test.mjs` or `test/build-output.test.mjs`, verify it fails, apply the smallest fix, and verify it passes. Repeat until all viewports and route families are clean.

- [ ] **Step 5: Write the truthful handoff**

Document commands, routes, design architecture, truth boundaries, non-production status, and known external limitations in `README.md` and the verification record. State explicitly that no deployment or real form submission occurred.

- [ ] **Step 6: Run the final suite**

Run: `npm test && npm run check && npm run build && node --test test/build-output.test.mjs && git diff --check`

Expected: all source/output tests pass, Astro reports zero diagnostics, all 15 routes build, and the diff check is clean.

- [ ] **Step 7: Commit**

```bash
git add src test README.md docs/verification
git commit -m "Verify Rangeway operating website"
```

