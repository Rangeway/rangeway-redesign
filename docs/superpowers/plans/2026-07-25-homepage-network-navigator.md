# Homepage Network Navigator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage “Company activity” strip with three equal, externally linked project panels for Mojave, St. Louis, and Hawaiʻi.

**Architecture:** Keep the feature inside the existing homepage and global stylesheet; no new component or dependency is warranted. The navigator is a semantic labeled section containing three structurally identical anchors, with a three-column desktop grid and three-row mobile stack.

**Tech Stack:** Astro, semantic HTML, global CSS, Node test runner, Astro static build

## Global Constraints

- Destination order is Mojave, St. Louis, Hawaiʻi.
- All three destinations have identical dimensions, typography, markup, and interaction styling.
- Use the proper ʻokina in every occurrence of “Hawaiʻi.”
- Mojave links to `https://mojave.rangeway.co`.
- St. Louis links to `https://stlouis.rangeway.co`.
- Hawaiʻi links to `https://hawaii.rangeway.co`.
- Every destination opens in a new tab with `rel="noopener noreferrer"` and an accessible new-tab announcement.
- Preserve the existing navy background and use Rangeway orange only for restrained interaction feedback.
- Do not add status labels, launch language, route maps, or internal company activity language.
- Creating the St. Louis project website is out of scope.

---

### Task 1: Replace the activity strip with the equal-weight site navigator

**Files:**
- Modify: `test/site-contract.test.mjs`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: Existing homepage hero and the global `--navy`, `--sun`, `--warm-white`, `--font-display`, and `--font-mono` tokens.
- Produces: A `.site-navigator` section containing three `.site-navigator__link` anchors and responsive styles for desktop and mobile.

- [ ] **Step 1: Replace the old source-contract assertions with a failing navigator contract**

In `test/site-contract.test.mjs`, replace the `operatingStrip` assertions inside `homepage feedback keeps proof, disclosures, and partner marks attached to their intended surfaces` with:

```js
  const siteNavigator = home.match(/<section class="site-navigator"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(siteNavigator, /aria-label="Rangeway sites"/);
  assert.doesNotMatch(siteNavigator, /Company activity|Developing sites|Building partnerships|Raising capital|Start a conversation/i);

  const destinations = [
    ['Mojave', 'California', 'https://mojave.rangeway.co'],
    ['St. Louis', 'Missouri', 'https://stlouis.rangeway.co'],
    ['Hawaiʻi', 'Hawaiʻi', 'https://hawaii.rangeway.co'],
  ];

  let priorDestinationIndex = -1;
  for (const [project, region, href] of destinations) {
    const destinationIndex = siteNavigator.indexOf(`href="${href}"`);
    assert.ok(destinationIndex > priorDestinationIndex);
    priorDestinationIndex = destinationIndex;
    assert.match(siteNavigator, new RegExp(`aria-label="${project}, ${region} \\(opens in new tab\\)"`));
  }

  assert.equal((siteNavigator.match(/class="site-navigator__link"/g) ?? []).length, 3);
  assert.equal((siteNavigator.match(/target="_blank"/g) ?? []).length, 3);
  assert.equal((siteNavigator.match(/rel="noopener noreferrer"/g) ?? []).length, 3);
  assert.match(css, /\.site-navigator\s*\{[^}]*grid-template-columns:\s*repeat\(3,minmax\(0,1fr\)\)/s);
  assert.match(css, /@media \(max-width:\s*820px\)[\s\S]*\.site-navigator\s*\{[^}]*grid-template-columns:\s*1fr/s);
  assert.match(home, /class="home-hero__action" href="\/network">[\s\S]*Discover the Network/);
```

- [ ] **Step 2: Run the source contract and confirm that the old strip fails it**

Run:

```bash
node --test --test-name-pattern="homepage feedback keeps proof" test/site-contract.test.mjs
```

Expected: FAIL because `.site-navigator` and its three destination links do not exist.

- [ ] **Step 3: Replace the homepage strip markup**

In `src/pages/index.astro`, replace the entire `.operating-strip` section with:

```astro
  <section class="site-navigator" aria-label="Rangeway sites">
    <a
      class="site-navigator__link"
      href="https://mojave.rangeway.co"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Mojave, California (opens in new tab)"
    >
      <strong>Mojave</strong>
      <span class="site-navigator__region">California</span>
      <span class="site-navigator__arrow" aria-hidden="true">↗</span>
    </a>
    <a
      class="site-navigator__link"
      href="https://stlouis.rangeway.co"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="St. Louis, Missouri (opens in new tab)"
    >
      <strong>St. Louis</strong>
      <span class="site-navigator__region">Missouri</span>
      <span class="site-navigator__arrow" aria-hidden="true">↗</span>
    </a>
    <a
      class="site-navigator__link"
      href="https://hawaii.rangeway.co"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hawaiʻi, Hawaiʻi (opens in new tab)"
    >
      <strong>Hawaiʻi</strong>
      <span class="site-navigator__region">Hawaiʻi</span>
      <span class="site-navigator__arrow" aria-hidden="true">↗</span>
    </a>
  </section>
```

- [ ] **Step 4: Replace the activity-strip styles with equal-panel navigator styles**

In `src/styles/global.css`, replace the `.operating-strip` rules with:

```css
.site-navigator { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); background: var(--navy); color: var(--warm-white); }
.site-navigator__link { display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto auto; align-content: center; min-width: 0; min-height: 104px; padding: 22px var(--page-pad); border-right: 1px solid rgba(255,255,255,.22); transition: background 180ms ease; }
.site-navigator__link:last-child { border-right: 0; }
.site-navigator__link strong { font: 700 clamp(1.15rem,1.55vw,1.6rem)/1 var(--font-display); letter-spacing: -.02em; }
.site-navigator__region { margin-top: 8px; font: 500 .64rem/1 var(--font-mono); letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.64); }
.site-navigator__arrow { grid-column: 2; grid-row: 1/3; align-self: center; margin-left: 24px; color: var(--sun); font: 700 1.2rem/1 var(--font-display); transition: transform 180ms var(--ease-out); }
.site-navigator__link:hover { background: rgba(255,255,255,.06); }
.site-navigator__link:hover .site-navigator__arrow { transform: translate(3px,-3px); }
.site-navigator__link:focus-visible { position: relative; z-index: 1; outline-color: var(--sun); outline-offset: -5px; }
```

Inside the existing `@media (max-width: 820px)` block, replace the `.operating-strip` rules with:

```css
  .site-navigator { grid-template-columns: 1fr; }
  .site-navigator__link { min-height: 88px; padding: 20px; border-right: 0; border-bottom: 1px solid rgba(255,255,255,.22); }
  .site-navigator__link:last-child { border-bottom: 0; }
```

Inside the existing `@media (max-width: 440px)` block, delete the obsolete `.operating-strip ul` rule.

- [ ] **Step 5: Run the focused source contract**

Run:

```bash
node --test --test-name-pattern="homepage feedback keeps proof" test/site-contract.test.mjs
```

Expected: PASS.

- [ ] **Step 6: Commit the source implementation**

```bash
git add test/site-contract.test.mjs src/pages/index.astro src/styles/global.css
git commit -m "Replace activity strip with site navigator"
```

---

### Task 2: Lock the generated output and verify the responsive result

**Files:**
- Modify: `test/build-output.test.mjs`

**Interfaces:**
- Consumes: The `.site-navigator` markup and CSS produced by Task 1.
- Produces: Static-build regression coverage and visual evidence at desktop and 390-by-844 mobile viewports.

- [ ] **Step 1: Add a failing built-output regression test**

Append this test to `test/build-output.test.mjs`:

```js
test("built homepage exposes three equal external site destinations", () => {
  const home = readFileSync(new URL("index.html", root), "utf8");
  const css = readdirSync(new URL("_astro/", root), { recursive: true })
    .filter((path) => path.endsWith(".css"))
    .map((path) => readFileSync(new URL(`_astro/${String(path)}`, root), "utf8"))
    .join("\n");

  const siteNavigator = home.match(/<section class="site-navigator"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.equal((siteNavigator.match(/class="site-navigator__link"/g) ?? []).length, 3);
  assert.match(siteNavigator, /https:\/\/mojave\.rangeway\.co[\s\S]*https:\/\/stlouis\.rangeway\.co[\s\S]*https:\/\/hawaii\.rangeway\.co/);
  assert.doesNotMatch(siteNavigator, /Company activity|Developing sites|Building partnerships|Raising capital/i);
  assert.match(css, /\.site-navigator\{[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(css, /@media \(width<=820px\)[\s\S]*\.site-navigator\{[^}]*grid-template-columns:1fr/);
});
```

- [ ] **Step 2: Run the built-output test before rebuilding**

Run:

```bash
node --test --test-name-pattern="built homepage exposes three equal" test/build-output.test.mjs
```

Expected: FAIL because `dist/` still contains the previous generated homepage.

- [ ] **Step 3: Rebuild and rerun the focused built-output test**

Run:

```bash
npm run build
node --test --test-name-pattern="built homepage exposes three equal" test/build-output.test.mjs
```

Expected: Astro builds 15 routes and the focused test passes.

- [ ] **Step 4: Run the complete automated verification sequence**

Run:

```bash
npm test
npm run check
npm run build
git diff --check
```

Expected: 47 tests pass, Astro reports zero errors, warnings, and hints, 15 routes build, and the diff check prints no output.

- [ ] **Step 5: Verify desktop and mobile rendering**

Start or reuse the local Astro development server, then inspect `http://localhost:4321/` at the normal desktop viewport and at 390 by 844.

Confirm:

- The three desktop panels have equal widths and identical typography.
- No project is visually featured.
- All three links show a visible hover and keyboard-focus state.
- The mobile view stacks three equal rows without horizontal overflow.
- “Hawaiʻi” renders with the proper ʻokina in both visible labels.
- The navigator does not crowd or overlap the hero or the following section.

Save screenshots as:

- `/tmp/rangeway-site-navigator-desktop.png`
- `/tmp/rangeway-site-navigator-mobile.png`

- [ ] **Step 6: Commit the generated-output coverage**

```bash
git add test/build-output.test.mjs
git commit -m "Test homepage site navigator output"
```
