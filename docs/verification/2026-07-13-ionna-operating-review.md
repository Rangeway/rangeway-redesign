# Rangeway IONNA operating review — 2026-07-13

## Outcome

The non-production static preview builds all 15 authored routes and preserves the required operating-company truth boundary. Route-wide geometry checks cover 1440×1100, 1024×768, 390×844, and 360×800. One verified mobile defect was found on Basecamp, fixed with a focused RED/GREEN guard, and re-probed successfully.

No deployment, production-domain change, or real form submission occurred.

## Review inputs

- Design specification: `docs/superpowers/specs/2026-07-13-rangeway-ionna-operating-design.md`
- Implementation plan: `docs/superpowers/plans/2026-07-13-rangeway-ionna-operating-implementation.md`
- Negative visual constraints: `/Users/zakwinnick/Documents/rangeway-redesign-ionna/.superpowers/research/rejected-subpage-audit.md`
- Content ledger: `src/data/site-content.ts`
- Generated output: `dist/`

The review treats `rangeway-preview` as factual inventory only. Its split hero, repeated index cadence, hidden reveal behavior, image placements, crops, page shells, navigation, and footer are not accepted design inputs.

## Routes reviewed

The viewport audit covered every authored route:

1. `/`
2. `/network`
3. `/network/waystation`
4. `/network/basecamp`
5. `/network/summit`
6. `/our-story`
7. `/team`
8. `/partners`
9. `/investors`
10. `/commitments`
11. `/contact`
12. `/contact/thanks`
13. `/privacy`
14. `/terms`
15. `/404.html`

## Browser geometry evidence

The in-app browser audit evaluated document width, the primary `h1` bounding rectangle, and hidden/inert elements inside `main` on every route.

| Viewport | Route-wide result |
| --- | --- |
| 1440×1100 | All 15 routes: `scrollWidth = 1425 <= innerWidth 1440`; every `h1` remained inside the viewport; zero `[hidden]` or `[inert]` elements occurred inside `main`. |
| 1024×768 | All 15 routes: `scrollWidth = 1009 <= innerWidth 1024`; every `h1` remained inside the viewport; zero `[hidden]` or `[inert]` elements occurred inside `main`. |
| 390×844 | Initial audit: 14 routes passed. Basecamp failed with `scrollWidth = 470 > innerWidth 390` and an `h1` rectangle from `left = 20` to `right = 470`. After the fix: `scrollWidth = 375`, `h1 left = 20`, `right = 355`, `width = 335`; the full “Basecamp” text was present. |
| 360×800 | Initial audit: 14 routes passed. Basecamp failed with `scrollWidth = 435 > innerWidth 360` and an `h1` ending at `right = 435`. After the fix: `scrollWidth = 345`, `h1 left = 20`, `right = 325`, `width = 305`; the full “Basecamp” text was present. |

Representative desktop browser inspection covered the homepage, Network, all three format pages, Team, Partners, and Privacy at 1280×720. Those pages exposed distinct, visible hierarchy rather than a universal split hero. Waystation was separately reviewer-verified at 1440×1100 and 390×844 after its earlier title correction.

The route-wide source/output visibility tests also enumerate substantive sections for every primary page family and reject hidden/inert containers, inline `opacity: 0`, `visibility: hidden`, `display: none`, and compiled CSS hiding rules on primary content. The contact honeypot is the only intentional hidden utility field and is excluded by its exact selector.

## Negative-constraint review

- Six reviewed company/utility openings use six purpose-specific structures: photographic Story masthead, direct Team people field, partner capability wall, text/proof Investor opening, anchored Commitments brief, and Contact support workbench.
- Network and the three format pages use different compositions and operating rhythms.
- Story no longer reuses the Basecamp lounge image. The company, team, contact, and investor openings do not repeat one lounge-image template.
- Team emits all four approved people directly in static HTML. Partner groups emit every logo and role directly in static HTML.
- Legal pages use anchor navigation and a 70ch reading measure inside static content.
- No reveal class or baseline hidden-content rule is required to read any primary section.

## Accessibility and resilience evidence

### No JavaScript and reduced motion

- All route-defining content and all seven mobile navigation links exist in generated HTML.
- Mobile navigation is a native `details`/`summary` disclosure before enhancement.
- Generated CSS contains the reduced-motion override and does not import a second Google Fonts stylesheet.
- Every generated `img` reserves intrinsic width and height.
- Built-output tests confirm 15 static pages, unique page families, non-indexing metadata, legal anchors, and substantive visible sections.

These are source and generated-output contracts. The all-route browser pass did not independently repeat incremental scrolling with JavaScript disabled or the reduced-motion preference enabled.

### Keyboard and focus

- The skip link targets `#main-content` and becomes visible on focus.
- Global `:focus-visible` treatment supplies a 3px Rangeway Sun outline with offset.
- The enhanced mobile menu moves focus into the open menu, cycles Tab/Shift+Tab within the disclosure, closes with Escape or an outside pointer action, restores focus to the summary, and closes when the desktop breakpoint returns.
- The native disclosure and links remain usable if the enhancement script does not run.

Keyboard order, focus containment, and focus restoration are guarded by source/output contracts; they were not independently exercised in the browser pass recorded above.

### Contact form

- Name, email, interest, and message use native required validation; email uses `type="email"`.
- The form remains a native POST to Formsubmit and does not call `preventDefault()` or `fetch()`.
- The enhancement exposes `idle`, `submitting`, and `error` state, toggles `aria-busy`, announces changes through a polite status region, preserves field values, recovers from offline and 12-second timeout conditions, and restores correctly on `pageshow`.
- The static success route exposes `data-submission-result="success"` and a status announcement.
- No real request was sent. Success, failure, and timeout behavior was guarded through source/output contracts; external Formsubmit delivery was not exercised.

## Focused RED/GREEN fixes

### Deferred Task 1 cleanup

RED command:

```text
node --test --test-name-pattern='deferred asset cleanup' test/site-contract.test.mjs
```

Observed failure: the global stylesheet still contained a duplicate Google Fonts `@import`.

GREEN changes:

- removed the duplicate CSS font import, retaining the single document stylesheet link;
- removed trailing spaces from both Rangeway lockup SVG path lines;
- recorded exact intrinsic dimensions for all 11 partner logos and emitted them on both homepage and Partners images.

Focused GREEN result: 1 passed, 0 failed.

### Mobile menu and contact-state resilience

Focused contracts were added before implementation. The menu contract failed because no keyboard enhancement existed; the contact-state contract failed because semantic state markers and offline/error handling were absent.

GREEN changes:

- added progressive mobile-menu focus containment, Escape/outside close, and focus restoration;
- added explicit contact state and `aria-busy` handling while preserving native POST and no-JavaScript behavior;
- added a semantic success marker on the thanks route.

Focused GREEN result: 4 passed, 0 failed across the new Basecamp, asset, menu, and contact contracts.

### Basecamp mobile overflow

Browser RED evidence:

- 390×844: `scrollWidth 470 > innerWidth 390`, heading right edge 470.
- 360×800: `scrollWidth 435 > innerWidth 360`, heading right edge 435.

The focused regression failed against `font-size: clamp(4.8rem, 25vw, 7rem)`. The mobile heading was changed to `max-width: 100%; font-size: clamp(3.8rem, 18vw, 5.4rem)`.

Focused GREEN and browser re-probe:

- 390×844: `scrollWidth 375`, heading right edge 355.
- 360×800: `scrollWidth 345`, heading right edge 325.

## External and tooling limitations

- The Interceptor real-browser workflow was invoked but its mandatory isolation gate stopped before opening a tab: `INTERCEPTOR_TEST_CONTEXT_ID is not set` (exit 8). No fallback to the operator's Default profile, raw screen capture, or window manipulation was attempted.
- Route and viewport evidence above came from the isolated in-app browser review coordinated by the parent workflow, not Interceptor.
- Google Fonts, external partner/news links, and Formsubmit require network access. Their external availability is not guaranteed by the static build.
- The configured preview host is intentionally invalid and non-production. This work did not deploy the site.

## Final suite

Fresh command:

```text
npm test && npm run check && npm run build && node --test test/build-output.test.mjs && git diff --check
```

Result:

- `npm test`: 24 passed, 0 failed.
- `astro check`: 33 files checked; 0 errors, 0 warnings, 0 hints.
- `astro build`: 15 static pages generated.
- explicit built-output suite: 7 passed, 0 failed.
- `git diff --check`: clean.

## Handoff status

The project is ready for local user review with `npm run dev` or `npm run build && npm run preview`. Production publishing, domain configuration, and a real form-delivery test remain deliberately outside this task.
