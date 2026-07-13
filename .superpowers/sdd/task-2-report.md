# Task 2 report — Network overview and format pages

## Status

Complete. The worktree now contains `/network`, `/network/waystation`, `/network/basecamp`, and
`/network/summit`, plus shared comparison, operating-fact, and public-project components. The Task 1
shell, content interfaces, navigation, route board, image component, and layout remain intact.

## TDD evidence

### RED

Command:

```text
node --test --test-name-pattern='format pages|network' test/site-contract.test.mjs
```

Observed result before implementation: **2 failures, 0 passes**. Both failures were expected
`ENOENT` results for the missing `/network` and format route source files.

### GREEN

The same focused command passed after implementation: **2 tests passed, 0 failed**.

One network assertion initially remained red because the source contract expected the three format
names directly in the overview file while the names were rendered indirectly through `FORMATS`. The
implementation gained a visible three-format navigation rail above the comparison matrix; the test
was not weakened and no hidden test-only content was introduced.

## Full verification

Command:

```text
npm test && npm run check && npm run build
```

Result:

- Test suite: **3 passed, 0 failed**.
- Astro check: **18 files, 0 errors, 0 warnings, 0 hints**.
- Production build: **5 static routes built**, including all four Task 2 routes.
- `git diff --check`: clean.
- Rendered output inspection confirmed the network comparison, Indoor Comfort Guarantee, public
  route board, three project records, and all four expected `dist` documents.
- Targeted source scans found no `PageHero`, `FormatPage`, fake location utility language, live
  availability language, unverified operating metrics, or prohibited Summit lodging nouns.

## Implementation and truth review

- `/network` follows an offering-overview sequence: decisive opening, full-width place image, three
  benefits, the Indoor Comfort Guarantee, honest format comparison, partner/technical layer, public
  route board, project briefs, and current-activity close.
- `FormatCompare` labels the intended experience model and explicitly says that amenities,
  equipment, and operating details remain project-specific until verified. It presents no boolean
  availability, operating status, price, hours, speed, or connector claims.
- Public project copy comes from the Task 1 `PROJECTS` content model and keeps development language
  intact.
- All content is server-rendered and readable without JavaScript. Motion is CSS enhancement only,
  wrapped in `prefers-reduced-motion: no-preference`; the Task 1 reduced-motion fallback remains in
  force.

## Composition self-review

- **Network:** a dark asymmetric operating statement resolves into a cinematic landscape, then
  alternates cream, oxide, warm-white, and navy proof modules. The comparison matrix and project
  route board make the page feel like an operating index instead of a taxonomy lecture.
- **Waystation (`waystation-flow`):** compact portrait media, a literal route trace, four sequential
  self-service moves, and a dense essentials module communicate speed and an automated, unstaffed
  baseline.
- **Basecamp (`basecamp-service`):** full-cover corridor image, human-centered Trailkeeper section,
  sticky service-day narrative, and large interior split make staffed hospitality the page axis.
- **Summit (`summit-destination`):** the widest and slowest hero, generous destination thesis,
  vertical ledger, and aerial energy composition create a destination pace distinct from both other
  formats.
- Shared typography, palette, shell, `ResponsiveImage`, and low-level fact component preserve brand
  continuity without creating a universal page template.

## Visual-review limitation

The required Interceptor isolation preflight was run before any browser action and stopped with:

```text
[PreflightIsolation] FAIL: INTERCEPTOR_TEST_CONTEXT_ID is not set.
```

Per the Interceptor safety rules, no browser command or fallback capture was attempted. The pages
therefore have strong source/build verification but no screenshot artifact from this run. This is the
only remaining review concern; a future browser pass should check 1440×1100 and 390×844 once an
isolated `interceptor-test` context is pinned.

## Fix Round — review findings

### Covering tests and RED

Two new regression contracts were added:

1. `Waystation title stays viewport-safe and essential hospitality makes no hours claim`
   - rejects `overflow: hidden` on the Waystation hero;
   - requires a zero-min-width copy column and a 100%-bounded title;
   - locks the title cap to 7rem desktop and 4rem under the 820px breakpoint;
   - rejects a standalone `24` and any 24-hour or availability implication.
2. `format comparison links remain exposed to source and built accessibility trees`
   - rejects `aria-hidden="true"` on the focusable desktop comparison header in source;
   - confirms the format links remain in the source accessibility tree;
   - performs a production build and checks the emitted `/network` HTML for the same conditions.

Focused RED command:

```text
node --test --test-name-pattern='Waystation title|format comparison' test/site-contract.test.mjs
```

Observed before the fix: **2 failed, 0 passed**. The Waystation contract failed on
`overflow: hidden`; the comparison contract failed on the focusable header carrying
`aria-hidden="true"`.

### Fix

- Removed clipping from the Waystation lead composition, set the copy grid child to `min-width: 0`,
  bounded the one-line title to its column, and reduced its caps to 7rem desktop / 4rem mobile.
- Replaced the unexplained standalone `24` with a nonnumeric route-signal graphic labeled
  `Indoor comfort / Every format`. The replacement communicates the actual format-wide standard
  without suggesting hours, status, or availability.
- Removed `aria-hidden="true"` from the desktop `FormatCompare` header so its three links remain
  keyboard focusable and represented in the accessibility tree.

Focused GREEN command:

```text
node --test --test-name-pattern='Waystation title|format comparison' test/site-contract.test.mjs
```

Observed after the fix: **2 passed, 0 failed**. The built-output assertion completed through a fresh
production build.

### Full verification

Exact command:

```text
npm test && npm run check && npm run build && git diff --check
```

Observed output:

- Node tests: **5 passed, 0 failed**.
- Astro check: **18 files, 0 errors, 0 warnings, 0 hints**.
- Astro build: **5 pages built**, including all network and format routes.
- `git diff --check`: exited 0 with no whitespace errors.

### Fix-round self-review

- At 1440px, the Waystation title now has substantially more room than its 7rem cap requires within
  the left hero column; the containing grid no longer clips overflow.
- At 390px, the 15.5vw responsive size remains below the 4rem cap, fits inside the 350px content
  measure with the deliberate negative tracking, and is not clipped by the hero.
- The essential-hospitality panel still carries a strong, memorable graphic, but its concentric route
  signal and explicit label now communicate the indoor-comfort standard rather than an operating
  schedule.
- The comparison header links are now semantically consistent with their focus behavior in both
  source and emitted HTML.
- Screenshot verification remains delegated to the root visual review because the isolated
  Interceptor context is still not configured in this worker; no unsafe browser fallback was used.

Fix-round commit subject: `Fix Waystation framing and comparison accessibility`.
