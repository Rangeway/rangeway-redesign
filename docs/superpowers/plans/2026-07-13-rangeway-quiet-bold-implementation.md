# Rangeway Quiet Bold Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Astro marketing website that preserves the substantive content and assets from `rangeway-preview` while replacing its visual implementation with the approved Quiet Bold Rangeway design.

**Architecture:** Begin from the proven `rangeway-preview` Astro application so content, routes, asset processing, form behavior, and environment controls remain intact. Replace the shared visual foundation and homepage first, then migrate interior pages through Explore, Story, and Action page families. Keep public facts centralized, omit unverified project-status labels, and verify every route visually at desktop and mobile widths.

**Tech Stack:** Astro 6, TypeScript 5.6, CSS, Node's built-in test runner, Sharp, `@fontsource/raleway`, `@fontsource/source-sans-3`

## Global Constraints

- Use Highway Navy `#17313E`, Rangeway Sun `#F2B64C`, Oxide Red `#993A28`, Roadmap Cream `#F7E6C4`, and warm white only.
- Keep **“Travel farther. Stop better.”** as the homepage hero tagline.
- Use Raleway for headings, navigation, buttons, labels, and captions; use Source Sans 3 for paragraphs, forms, and legal content.
- Preserve the primary navigation: The Network, Our Story, Team, Partners, Investors, Newsroom, Contact.
- Waystations are automated and unstaffed; Basecamps are staffed; use Summit without a Rangeway prefix; use Lookouts, never cabins, rooms, or units.
- Do not use em dashes or double hyphens in public copy; do not begin sentences with “And.”
- Preserve the substantive information and useful routes from `/Users/zakwinnick/Documents/GitHub/rangeway-preview`.
- Do not publish unverified project-status claims from the source repository.
- Meet WCAG 2.1 AA, support keyboard operation, respect `prefers-reduced-motion`, and prevent horizontal overflow.
- Do not deploy or change production domains without explicit approval.

## File Structure

The port retains the source repository's focused Astro structure:

- `src/config.ts`: site metadata, environment-safe external links, contact details
- `src/data/site-content.ts`: navigation, experience principles, formats, and public project order
- `src/layouts/BaseLayout.astro`: metadata, shared shell, progressive enhancement, structured data
- `src/styles/global.css`: Quiet Bold tokens, typography, spacing, buttons, shared grids, accessibility
- `src/components/Nav.astro`: desktop navigation and accessible mobile menu
- `src/components/Footer.astro`: global wayfinding and legal/social destinations
- `src/components/ResponsiveImage.astro`: responsive source selection and intrinsic sizing
- `src/components/PageHero.astro`: shared interior-page hero
- `src/components/FormatPage.astro`: shared Waystation and Basecamp page structure
- `src/components/ArrivalStrip.astro`: Arrive, Recharge, Continue wayfinding
- `src/components/ExperienceCollage.astro`: image-led hospitality story
- `src/components/FieldGuideGrid.astro`: the four experience principles
- `src/components/ProjectStrip.astro`: Bozeman, Mojave, St. Louis in approved order without unverified labels
- `src/components/CredibilityBridge.astro`: concise links to story, team, partners, and investors
- `src/sections/Hero.astro`: approved Quiet Bold homepage hero
- `src/sections/Network.astro`: image-led format introduction
- `src/sections/CloseCta.astro`: Field Notes and final action
- `src/pages/**/*.astro`: route-specific content using the shared page families
- `test/site-regressions.test.mjs`: source-level design, content, accessibility, and route contracts
- `test/build-output.test.mjs`: post-build route and rendered-markup checks

---

### Task 1: Port the Proven Astro Baseline

**Files:**
- Create from source: `package.json`, `package-lock.json`, `astro.config.mjs`, `site.config.mjs`, `tsconfig.json`
- Create from source: `src/**`, `public/**`, `scripts/**`, `test/site-regressions.test.mjs`
- Preserve: `.gitignore`, `docs/superpowers/specs/2026-07-13-rangeway-quiet-bold-design.md`, `docs/superpowers/plans/2026-07-13-rangeway-quiet-bold-implementation.md`
- Create: `test/baseline-port.test.mjs`

**Interfaces:**
- Consumes: `/Users/zakwinnick/Documents/GitHub/rangeway-preview` as a read-only content and asset source
- Produces: a locally installable Astro application with the complete route and asset inventory

- [ ] **Step 1: Write the failing baseline inventory test**

```js
// test/baseline-port.test.mjs
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "package.json",
  "astro.config.mjs",
  "site.config.mjs",
  "src/pages/index.astro",
  "src/pages/network.astro",
  "src/pages/network/waystation.astro",
  "src/pages/network/basecamp.astro",
  "src/pages/network/summit.astro",
  "src/pages/our-story.astro",
  "src/pages/team.astro",
  "src/pages/partners.astro",
  "src/pages/investors.astro",
  "src/pages/commitments.astro",
  "src/pages/contact.astro",
  "src/pages/privacy.astro",
  "src/pages/terms.astro",
  "public/images/logo/rangeway-lockup-white.svg",
  "public/images/logo/rangeway-lockup-charcoal.svg"
];

test("the Rangeway content and route baseline is present", () => {
  for (const relativePath of required) {
    assert.ok(existsSync(path.join(root, relativePath)), `${relativePath} should exist`);
  }
});
```

- [ ] **Step 2: Run the inventory test and verify it fails**

Run: `node --test test/baseline-port.test.mjs`

Expected: FAIL because the Astro application files have not been ported.

- [ ] **Step 3: Port the application without overwriting the approved docs or Git history**

```bash
rsync -a \
  --exclude '.git/' \
  --exclude 'node_modules/' \
  --exclude 'dist/' \
  --exclude '.astro/' \
  --exclude '.worktrees/' \
  --exclude '.superpowers/' \
  --exclude 'docs/superpowers/' \
  --exclude '.gitignore' \
  /Users/zakwinnick/Documents/GitHub/rangeway-preview/ \
  /Users/zakwinnick/Documents/rangeway-redesign-ionna/
npm ci
```

Expected: dependencies install successfully and the approved specification and plan remain unchanged.

- [ ] **Step 4: Run the baseline checks**

Run: `node --test test/baseline-port.test.mjs && npm run check && npm run build`

Expected: PASS, Astro check reports no errors, and `dist/` contains the complete static site.

- [ ] **Step 5: Commit the port**

```bash
git add package.json package-lock.json astro.config.mjs site.config.mjs tsconfig.json src public scripts test README.md DEPLOY.md PRODUCT.md DESIGN.md CNAME
git commit -m "Port Rangeway Astro content baseline"
```

---

### Task 2: Establish the Quiet Bold Foundation and Accessible Shell

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/Nav.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/BrandLockup.astro`
- Modify: `test/site-regressions.test.mjs`

**Interfaces:**
- Consumes: the official logo assets and centralized `NAV_LINKS` and `LINKS`
- Produces: CSS tokens `--color-highway`, `--color-sun`, `--color-oxide`, `--color-roadmap`; `.container`, `.section`, `.btn`, `.reveal`; accessible global navigation and footer

- [ ] **Step 1: Replace the old token test with the Quiet Bold shell contract**

```js
test("Quiet Bold tokens, typography, shell, and progressive enhancement are explicit", async () => {
  const [layout, styles, nav] = await Promise.all([
    readSource("src/layouts/BaseLayout.astro"),
    readSource("src/styles/global.css"),
    readSource("src/components/Nav.astro")
  ]);

  assert.match(layout, /@fontsource\/raleway\/800\.css/);
  assert.match(layout, /@fontsource\/source-sans-3\/400\.css/);
  assert.match(layout, /document\.documentElement\.classList\.add\("js"\)/);
  assert.match(styles, /--color-highway:\s*#17313e/i);
  assert.match(styles, /--color-sun:\s*#f2b64c/i);
  assert.match(styles, /--color-oxide:\s*#993a28/i);
  assert.match(styles, /--color-roadmap:\s*#f7e6c4/i);
  assert.match(styles, /html\.js \.reveal\.is-visible/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(nav, /previouslyFocused/);
  assert.match(nav, /main\.inert/);
  assert.match(nav, /focusableSelector/);
  assert.match(nav, /<BrandLockup tone="white"/);
});
```

- [ ] **Step 2: Run the shell contract and verify the pre-redesign mismatch**

Run: `node --test --test-name-pattern="Quiet Bold tokens" test/site-regressions.test.mjs`

Expected: FAIL until the shell contract and final motion behavior are aligned.

- [ ] **Step 3: Implement the global token and component contract**

Use these exact semantic tokens at the top of `src/styles/global.css` and route all shared colors through them:

```css
:root {
  --color-highway: #17313e;
  --color-sun: #f2b64c;
  --color-oxide: #993a28;
  --color-roadmap: #f7e6c4;
  --color-warm-white: #fffaf0;
  --color-ink: #142b35;
  --color-text: #17313e;
  --color-text-muted: #52636b;
  --surface-page: var(--color-roadmap);
  --surface-dark: var(--color-highway);
  --font-heading: "Raleway", system-ui, sans-serif;
  --font-body: "Source Sans 3", system-ui, sans-serif;
  --radius-frame: 8px;
  --radius-control: 4px;
  --max-width: 1440px;
  --gutter: clamp(18px, 4vw, 64px);
  --nav-height: 76px;
}

body {
  margin: 0;
  background: var(--surface-page);
  color: var(--color-text);
  font-family: var(--font-body);
  overflow-x: clip;
}

.btn {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border: 1px solid currentColor;
  border-radius: var(--radius-control);
  font-family: var(--font-heading);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

html.js .reveal { opacity: 0; transform: translateY(18px); }
html.js .reveal.is-visible { opacity: 1; transform: none; transition: opacity 420ms ease, transform 420ms ease; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  html.js .reveal { opacity: 1; transform: none; }
}
```

Keep the existing focus-trap implementation in `Nav.astro`, use the official white lockup on Highway Navy, use the charcoal lockup only on light surfaces, and ensure the desktop navigation displays all seven approved links before collapsing to the mobile menu at `1100px`.

- [ ] **Step 4: Run shell checks and build**

Run: `node --test test/site-regressions.test.mjs && npm run check && npm run build`

Expected: PASS with no missing-token, focus-trap, font, or progressive-enhancement failures.

- [ ] **Step 5: Commit the foundation**

```bash
git add src/styles/global.css src/layouts/BaseLayout.astro src/components/Nav.astro src/components/Footer.astro src/components/BrandLockup.astro test/site-regressions.test.mjs
git commit -m "Build Quiet Bold site foundation"
```

---

### Task 3: Build the Approved Quiet Bold Homepage Hero

**Files:**
- Modify: `src/sections/Hero.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/config.ts`
- Modify: `test/site-regressions.test.mjs`

**Interfaces:**
- Consumes: `/images/hero-mountain-waystation.jpg`, its WebP derivatives, global tokens, and the fixed tagline
- Produces: `<Hero />` with protected copy panel, one responsive image, working CTA, and no overlapping decoration

- [ ] **Step 1: Add the hero regression contract**

```js
test("homepage hero implements the approved Quiet Bold composition", async () => {
  const [hero, config] = await Promise.all([
    readSource("src/sections/Hero.astro"),
    readSource("src/config.ts")
  ]);

  assert.match(hero, /Travel farther\./);
  assert.match(hero, /Stop better\./);
  assert.match(config, /tagline:\s*"Travel farther\. Stop better\."/);
  assert.match(hero, /class="hero__copy"/);
  assert.match(hero, /class="hero__media"/);
  assert.match(hero, /class="hero__cta"/);
  assert.match(hero, /grid-template-columns:\s*minmax\(0, 43fr\) minmax\(0, 57fr\)/);
  assert.match(hero, /background:\s*var\(--color-highway\)/);
  assert.match(hero, /color:\s*var\(--color-sun\)/);
  assert.doesNotMatch(hero, /hero__(?:circle|orb|badge|sticker|collage)/);
  assert.doesNotMatch(hero, /clip-path:\s*ellipse/);
  assert.match(hero, /@media\s*\(max-width:\s*760px\)[\s\S]*grid-template-columns:\s*1fr/);
});
```

- [ ] **Step 2: Run the hero contract and verify it fails**

Run: `node --test --test-name-pattern="Quiet Bold composition" test/site-regressions.test.mjs`

Expected: FAIL because the ported hero uses the previous clipped ellipse composition.

- [ ] **Step 3: Replace `Hero.astro` with the approved interface and content hierarchy**

The rendered structure must be exactly:

```astro
---
const heroAlt = "Concept rendering of a Rangeway Basecamp at dusk in Bozeman, Montana, with a warmly lit driver's lounge and charging canopy against the mountains";
---

<section class="hero" aria-labelledby="home-title">
  <div class="hero__grid">
    <div class="hero__copy">
      <p class="hero__eyebrow">Hospitality for the road ahead</p>
      <h1 id="home-title">Travel farther.<span>Stop better.</span></h1>
      <p class="hero__lede">Rangeway is building places drivers plan their journeys around, with charging that works and hospitality that restores.</p>
      <a class="btn hero__cta" href="#experience">Step inside <span aria-hidden="true">→</span></a>
    </div>
    <figure class="hero__media">
      <picture>
        <source srcset="/images/hero-mountain-waystation.webp" type="image/webp" />
        <img src="/images/hero-mountain-waystation.jpg" alt={heroAlt} width="2048" height="1365" fetchpriority="high" />
      </picture>
      <figcaption>Basecamp concept · Bozeman, Montana</figcaption>
    </figure>
  </div>
</section>
```

Style `.hero__grid` as a `43fr/57fr` split above `760px`, use Highway Navy on the copy panel, use one image only, keep the headline at a maximum width of `8ch`, and stack copy before image on mobile. Do not add any absolute decorative shape inside `.hero__copy`. Set `SITE.tagline` in `src/config.ts` to the exact string `Travel farther. Stop better.` so metadata and page copy use the locked tagline.

- [ ] **Step 4: Run hero checks and build**

Run: `node --test --test-name-pattern="Quiet Bold composition" test/site-regressions.test.mjs && npm run check && npm run build`

Expected: PASS with the homepage rendered and no Astro diagnostics.

- [ ] **Step 5: Commit the hero**

```bash
git add src/sections/Hero.astro src/pages/index.astro src/config.ts test/site-regressions.test.mjs
git commit -m "Build Quiet Bold homepage hero"
```

---

### Task 4: Recompose the Homepage Narrative

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/ArrivalStrip.astro`
- Modify: `src/components/ExperienceCollage.astro`
- Modify: `src/components/FieldGuideGrid.astro`
- Modify: `src/sections/Network.astro`
- Modify: `src/components/ProjectStrip.astro`
- Create: `src/components/CredibilityBridge.astro`
- Modify: `src/sections/CloseCta.astro`
- Modify: `src/data/site-content.ts`
- Modify: `test/site-regressions.test.mjs`

**Interfaces:**
- Consumes: `EXPERIENCE_PRINCIPLES`, `FORMATS`, `PROJECTS`, `LINKS`, responsive image assets
- Produces: the approved experience-first homepage sequence and centralized public project data without unverified status labels

- [ ] **Step 1: Add homepage sequence and public-fact tests**

```js
test("homepage follows the approved Quiet Bold narrative", async () => {
  const home = await readSource("src/pages/index.astro");
  const order = ["<Hero", "<ArrivalStrip", "<ExperienceCollage", "<FieldGuideGrid", "<Network", "<ProjectStrip", "<CredibilityBridge", "<CloseCta"];
  const indexes = order.map((name) => home.indexOf(name));
  indexes.forEach((index, position) => assert.notEqual(index, -1, `${order[position]} should render`));
  indexes.slice(1).forEach((index, position) => assert.ok(indexes[position] < index));
});

test("public project content preserves order without unverified status claims", async () => {
  const content = await readSource("src/data/site-content.ts");
  assert.ok(content.indexOf('name: "Bozeman"') < content.indexOf('name: "Mojave"'));
  assert.ok(content.indexOf('name: "Mojave"') < content.indexOf('name: "St. Louis"'));
  assert.doesNotMatch(content, /Raising capital|Breaking ground|In development/);
});

test("the Field Guide preserves all four hospitality principles", async () => {
  const content = await readSource("src/data/site-content.ts");
  for (const title of ["Good light", "Real comfort", "Room to settle", "Easy momentum"]) {
    assert.match(content, new RegExp(title));
  }
});
```

- [ ] **Step 2: Run the homepage narrative tests and verify the expected failures**

Run: `node --test --test-name-pattern="homepage follows|public project|Field Guide" test/site-regressions.test.mjs`

Expected: FAIL because `CredibilityBridge` is absent and the source project statuses remain.

- [ ] **Step 3: Centralize approved homepage data**

Replace the project export with:

```ts
export const PROJECTS = [
  { name: "Bozeman", href: LINKS.bozemanMicrosite, descriptor: "Basecamp concept · Montana" },
  { name: "Mojave", href: LINKS.mojaveMicrosite, descriptor: "Basecamp concept · California" },
  { name: "St. Louis", href: LINKS.stLouisPress, descriptor: "Basecamp concept · Missouri" }
] as const;
```

Keep the existing centralized `NAV_LINKS`, `EXPERIENCE_PRINCIPLES`, and `FORMATS` exports. Do not define format names, routes, or project destinations inside page components.

- [ ] **Step 4: Implement the homepage section responsibilities**

Use these exact section IDs and labels so the hero CTA and navigation remain stable:

```astro
<ArrivalStrip items={["Arrive", "Recharge", "Continue"]} />
<ExperienceCollage id="experience" eyebrow="The Experience" title="A better stop changes the whole trip." />
<FieldGuideGrid eyebrow="The Rangeway Standard" principles={EXPERIENCE_PRINCIPLES} />
<Network eyebrow="The Network" formats={FORMATS} />
<ProjectStrip eyebrow="Places on the horizon" projects={PROJECTS} />
<CredibilityBridge
  title="Built by people who know what a good arrival feels like."
  links={[
    { href: "/our-story", label: "Our Story" },
    { href: "/team", label: "Team" },
    { href: "/partners", label: "Partners" },
    { href: "/investors", label: "Investors" }
  ]}
/>
<CloseCta eyebrow="Field Notes" title="Follow the road ahead." href={LINKS.fieldNotes} label="Read Field Notes" />
```

Compose sections with one visual idea each: a large two-image hospitality sequence, four image-backed principles without icons, equal-height format entries, a simple destination list, and a single credibility bridge. Remove legacy section decoration that competes with photography.

- [ ] **Step 5: Run homepage tests and build**

Run: `node --test test/site-regressions.test.mjs && npm run check && npm run build`

Expected: PASS with the new component order and no unverified status labels.

- [ ] **Step 6: Commit the homepage**

```bash
git add src/pages/index.astro src/components/ArrivalStrip.astro src/components/ExperienceCollage.astro src/components/FieldGuideGrid.astro src/sections/Network.astro src/components/ProjectStrip.astro src/components/CredibilityBridge.astro src/sections/CloseCta.astro src/data/site-content.ts test/site-regressions.test.mjs
git commit -m "Recompose Quiet Bold homepage story"
```

---

### Task 5: Apply Quiet Bold to the Explore Page Family

**Files:**
- Modify: `src/components/PageHero.astro`
- Modify: `src/components/FormatPage.astro`
- Modify: `src/components/FormatNav.astro`
- Modify: `src/components/FormatCard.astro`
- Modify: `src/pages/network.astro`
- Modify: `src/pages/network/waystation.astro`
- Modify: `src/pages/network/basecamp.astro`
- Modify: `src/pages/network/summit.astro`
- Modify: `test/site-regressions.test.mjs`

**Interfaces:**
- Consumes: centralized `FORMATS`, responsive image component, shared page hero, approved format terminology
- Produces: consistent image-led Network, Waystation, Basecamp, and Summit pages with format cross-navigation

- [ ] **Step 1: Add Explore-family terminology and structure tests**

```js
test("Explore pages preserve current Rangeway format rules", async () => {
  const [waystation, basecamp, summit] = await Promise.all([
    readSource("src/pages/network/waystation.astro"),
    readSource("src/pages/network/basecamp.astro"),
    readSource("src/pages/network/summit.astro")
  ]);
  assert.match(waystation, /automated|unstaffed/i);
  assert.doesNotMatch(waystation, /staffed Waystation/i);
  assert.match(basecamp, /staffed/i);
  assert.doesNotMatch(summit, /Rangeway Summit/);
  assert.doesNotMatch(summit, /cabins|rooms|units/i);
  assert.match(summit, /Lookouts/);
});

test("Explore pages use shared format navigation", async () => {
  const [formatPage, waystation, basecamp, summit] = await Promise.all([
    readSource("src/components/FormatPage.astro"),
    readSource("src/pages/network/waystation.astro"),
    readSource("src/pages/network/basecamp.astro"),
    readSource("src/pages/network/summit.astro")
  ]);
  assert.match(formatPage, /<FormatNav/);
  assert.match(waystation, /<FormatPage/);
  assert.match(basecamp, /<FormatPage/);
  assert.match(summit, /<FormatNav/);
});
```

- [ ] **Step 2: Run Explore tests and verify terminology mismatches**

Run: `node --test --test-name-pattern="Explore pages" test/site-regressions.test.mjs`

Expected: FAIL where the source copy does not explicitly establish the automated Waystation rule.

- [ ] **Step 3: Rework the shared Explore interfaces**

Keep `FormatPage.astro` responsible for this exact content order:

```astro
<PageHero ... />
<FormatNav current={slug} />
<section class="format-intro">...</section>
<section class="format-amenities">...</section>
<section class="format-gallery">...</section>
<section class="format-next">...</section>
```

Use one protected navy text panel and one image in `PageHero`. Use Roadmap Cream for reading sections, Rangeway Sun for compact labels or dividers, and Oxide Red for at most one primary action per viewport. Rewrite only the minimum Waystation copy needed to make “automated and unstaffed” explicit.

- [ ] **Step 4: Run Explore tests, check, and build**

Run: `node --test test/site-regressions.test.mjs && npm run check && npm run build`

Expected: PASS with all four Explore routes generated.

- [ ] **Step 5: Commit the Explore family**

```bash
git add src/components/PageHero.astro src/components/FormatPage.astro src/components/FormatNav.astro src/components/FormatCard.astro src/pages/network.astro src/pages/network/waystation.astro src/pages/network/basecamp.astro src/pages/network/summit.astro test/site-regressions.test.mjs
git commit -m "Redesign Rangeway explore pages"
```

---

### Task 6: Apply Quiet Bold to the Story and Credibility Pages

**Files:**
- Modify: `src/pages/our-story.astro`
- Modify: `src/pages/team.astro`
- Modify: `src/pages/partners.astro`
- Modify: `src/pages/commitments.astro`
- Modify: `src/components/ResponsiveImage.astro`
- Modify: `test/site-regressions.test.mjs`

**Interfaces:**
- Consumes: current page copy, team portraits, partner logos, responsive image primitives
- Produces: editorial story pages with protected portraits, restrained logo treatment, and no inflated partner claims

- [ ] **Step 1: Add Story-family content-safety tests**

```js
test("Story pages preserve team exclusions and partner caution", async () => {
  const [team, partners] = await Promise.all([
    readSource("src/pages/team.astro"),
    readSource("src/pages/partners.astro")
  ]);
  assert.doesNotMatch(team, /Raul Dominguez|Paul Devon|Jim Regan/);
  assert.doesNotMatch(partners, /exclusive partner|official partner of the network/i);
});

test("Story pages use responsive imagery with descriptive alternatives", async () => {
  for (const page of ["our-story.astro", "team.astro", "partners.astro", "commitments.astro"]) {
    const source = await readSource(`src/pages/${page}`);
    assert.match(source, /<ResponsiveImage|<PageHero/);
    assert.doesNotMatch(source, /alt="(?:image|photo|team)"/i);
  }
});
```

- [ ] **Step 2: Run Story tests and verify the current source against the safety contract**

Run: `node --test --test-name-pattern="Story pages" test/site-regressions.test.mjs`

Expected: FAIL until all pages use the shared responsive image treatment and excluded team references are absent.

- [ ] **Step 3: Recompose each Story page with one page-specific visual idea**

Use this page order:

```text
Our Story: PageHero → hospitality thesis → origin narrative → operating beliefs → next action
Team: PageHero → leadership portraits → concise biographies → team contact action
Partners: PageHero → capability groups → restrained logo field → partnership contact action
Commitments: PageHero → environment → communities → governance → supporting action
```

Use portrait crops no tighter than shoulders-up, preserve name and role clarity, keep partner logos on neutral warm-white cards, and retain all substantive source copy except claims that violate the Global Constraints.

- [ ] **Step 4: Run Story tests, check, and build**

Run: `node --test test/site-regressions.test.mjs && npm run check && npm run build`

Expected: PASS with all Story routes generated and no excluded team names or unsupported exclusivity claims.

- [ ] **Step 5: Commit the Story family**

```bash
git add src/pages/our-story.astro src/pages/team.astro src/pages/partners.astro src/pages/commitments.astro src/components/ResponsiveImage.astro test/site-regressions.test.mjs
git commit -m "Redesign Rangeway story pages"
```

---

### Task 7: Apply Quiet Bold to Action, Contact, Legal, and Utility Pages

**Files:**
- Modify: `src/pages/investors.astro`
- Modify: `src/pages/contact.astro`
- Modify: `src/pages/contact/thanks.astro`
- Modify: `src/components/ContactForm.astro`
- Modify: `src/pages/privacy.astro`
- Modify: `src/pages/terms.astro`
- Modify: `src/pages/404.astro`
- Modify: `test/site-regressions.test.mjs`
- Create: `test/build-output.test.mjs`

**Interfaces:**
- Consumes: centralized form configuration, environment return URL, shared page hero, legal copy
- Produces: accessible conversion and utility routes with clear failure states and comfortable reading layouts

- [ ] **Step 1: Add form and rendered-route tests**

```js
// Append source checks to test/site-regressions.test.mjs
test("contact form exposes accessible validation and recovery states", async () => {
  const form = await readSource("src/components/ContactForm.astro");
  assert.match(form, /aria-live="polite"/);
  assert.match(form, /aria-describedby/);
  assert.match(form, /required/);
  assert.match(form, /timeout/i);
  assert.match(form, /retry/i);
});
```

```js
// test/build-output.test.mjs
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = (route) => readFile(path.join(root, "dist", route, "index.html"), "utf8");

test("all primary routes build with a main landmark", async () => {
  const routes = ["network", "network/waystation", "network/basecamp", "network/summit", "our-story", "team", "partners", "investors", "commitments", "contact", "privacy", "terms"];
  for (const route of routes) assert.match(await html(route), /<main id="main">/);
});

test("contact output includes field labels and a polite status region", async () => {
  const contact = await html("contact");
  assert.match(contact, /<label[^>]*for=/);
  assert.match(contact, /aria-live="polite"/);
});
```

- [ ] **Step 2: Run source tests and verify the build-output test fails before building**

Run: `node --test --test-name-pattern="contact form" test/site-regressions.test.mjs; rm -rf dist; node --test test/build-output.test.mjs`

Expected: the contact source test fails on a missing `aria-live`, timeout, or retry hook; the output test fails with `ENOENT` because `dist/` was removed.

- [ ] **Step 3: Implement Action-family behavior**

The contact form must expose this state container and keep native form submission as the fallback:

```astro
<form method="POST" action={formAction} data-contact-form>
  <!-- labeled name, email, interest, and message controls remain required where currently required -->
  <p id="form-status" class="form-status" aria-live="polite" data-form-status></p>
  <button class="btn btn-primary" type="submit">Send message</button>
  <button class="btn btn-secondary" type="button" hidden data-retry>Try again</button>
</form>
```

Client enhancement must set the status text to `Sending…`, `Message sent.`, `We could not send your message. Please try again.`, or `The request timed out. Please try again.` and reveal the retry button for failure and timeout. Do not send a real message in automated checks.

Keep the Investors page factual and free of network-wide figures. Render legal pages on warm white with a maximum line length of `72ch`. Keep the 404 page's two safe exits: Home and The Network.

- [ ] **Step 4: Build and run all Action-family tests**

Run: `npm run build && node --test test/site-regressions.test.mjs test/build-output.test.mjs && npm run check`

Expected: PASS with every listed route containing the shared main landmark and contact accessibility hooks.

- [ ] **Step 5: Commit the Action family**

```bash
git add src/pages/investors.astro src/pages/contact.astro src/pages/contact/thanks.astro src/components/ContactForm.astro src/pages/privacy.astro src/pages/terms.astro src/pages/404.astro test/site-regressions.test.mjs test/build-output.test.mjs
git commit -m "Redesign Rangeway action and utility pages"
```

---

### Task 8: Complete Responsive, Accessibility, and Visual Verification

**Files:**
- Modify: `src/styles/global.css`, `src/components/**/*.astro`, `src/sections/**/*.astro`, `src/pages/**/*.astro`
- Modify: `test/site-regressions.test.mjs`
- Modify: `test/build-output.test.mjs`
- Create: `docs/verification/2026-07-13-quiet-bold-review.md`

**Interfaces:**
- Consumes: the complete built site
- Produces: verified desktop and mobile output, recorded route review, and a clean working tree

- [ ] **Step 1: Add final source-level guardrails**

```js
// Add to test/build-output.test.mjs
const visibleText = (source) => source
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<!--[\s\S]*?-->/g, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&(?:mdash|#8212|#x2014);/gi, "—")
  .replace(/\s+/g, " ")
  .trim();

test("rendered public copy follows Rangeway punctuation rules", async () => {
  const routes = ["", "network", "network/waystation", "network/basecamp", "network/summit", "our-story", "team", "partners", "investors", "commitments", "contact"];
  for (const route of routes) {
    const text = visibleText(await html(route));
    assert.doesNotMatch(text, /—|\s--\s/, `${route || "home"} contains prohibited punctuation`);
    assert.doesNotMatch(text, /(?:^|[.!?]\s+)And\b/, `${route || "home"} begins a sentence with And`);
  }
});
```

```js
// Add to test/site-regressions.test.mjs
test("layout prevents horizontal overflow and preserves reduced motion", async () => {
  const styles = await readSource("src/styles/global.css");
  assert.match(styles, /overflow-x:\s*(?:clip|hidden)/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});
```

- [ ] **Step 2: Run the complete automated suite**

Run: `npm test && npm run check && npm run build && node --test test/build-output.test.mjs`

Expected: PASS with zero test failures, zero Astro errors, and a complete `dist/`.

- [ ] **Step 3: Start the production preview and capture required viewports**

```bash
npm run preview -- --host 127.0.0.1 --port 4322
```

Review every primary route at `1440×1100`, `1024×768`, `390×844`, and `360×800`. Capture at minimum the homepage, Network, one format page, Team, Partners, Investors, and Contact at desktop and mobile widths.

Expected: no horizontal scroll, no clipped headline, no decorative overlap, intentional image crops, readable labels, and visible focus states.

- [ ] **Step 4: Perform the keyboard and resilience review**

Verify in this order:

```text
Tab to Skip to content → Enter → focus reaches main
Open mobile menu → Tab stays inside menu → Escape closes → focus returns to Menu
Tab through every primary link and CTA → focus remains visible
Enable reduced motion → all content is immediately visible
Disable JavaScript → navigation, content, links, and native contact submission remain available
Submit the empty contact form → native validation identifies required fields
Simulate timeout/failure without a real network submission → status and retry controls appear
```

Expected: every sequence completes without focus loss, keyboard trap, invisible content, or unintended message submission.

- [ ] **Step 5: Record verification evidence**

Create `docs/verification/2026-07-13-quiet-bold-review.md` with this exact checklist and replace each unchecked box only after direct verification:

```markdown
# Quiet Bold Visual Review

- [ ] Homepage: desktop and mobile
- [ ] The Network: desktop and mobile
- [ ] Waystation: desktop and mobile
- [ ] Basecamp: desktop and mobile
- [ ] Summit: desktop and mobile
- [ ] Our Story: desktop and mobile
- [ ] Team: desktop and mobile
- [ ] Partners: desktop and mobile
- [ ] Investors: desktop and mobile
- [ ] Commitments: desktop and mobile
- [ ] Contact and form states: desktop and mobile
- [ ] Privacy, Terms, 404, and contact confirmation
- [ ] Keyboard navigation and mobile focus containment
- [ ] Reduced motion and JavaScript-disabled behavior
- [ ] No horizontal overflow at 1440, 1024, 390, or 360 pixels
- [ ] No unverified public project-status labels

Production deployment was not performed.
```

- [ ] **Step 6: Fix every verified defect and rerun the complete suite**

Run after fixes: `npm test && npm run check && npm run build && node --test test/build-output.test.mjs && git diff --check`

Expected: PASS and no whitespace errors.

- [ ] **Step 7: Commit verified completion**

```bash
git add src test docs/verification/2026-07-13-quiet-bold-review.md
git commit -m "Verify Quiet Bold Rangeway website"
```

## Final Handoff

After Task 8, provide Zak with:

- The local preview URL
- A concise list of routes reviewed
- Any public facts intentionally omitted pending verification
- The latest commit hash
- Confirmation that production was not changed
