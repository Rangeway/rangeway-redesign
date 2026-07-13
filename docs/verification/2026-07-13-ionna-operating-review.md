# Rangeway IONNA operating review — 2026-07-13

## Outcome

The non-production static preview builds all 15 authored routes and preserves the required operating-company truth boundary. A final 60-case browser matrix covered all 15 routes at 1440×1100, 1024×768, 390×844, and 360×800 after the Basecamp correction; every case remained horizontally contained and exposed zero hidden or inert elements in `main`. One verified mobile defect was found on Basecamp, fixed with a focused RED/GREEN guard, and re-probed successfully.

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

The final 60-case pass also confirmed that every route could be reached through browser navigation at each viewport. Automated wheel input did not move the in-app browser; `PageDown` worked on a sample route, but navigation reset the viewport override. Incremental scrolling therefore was not established route-wide and is not claimed here.

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
- The external Field Notes destination is the only mobile navigation link with an external arrow and “opens in a new tab” screen-reader text; internal destinations have neither.
- Generated CSS contains the reduced-motion override and does not import a second Google Fonts stylesheet.
- Every generated local `img` declares dimensions that exactly match its file metadata, including the Rangeway lockups, all four team portraits, St. Louis imagery, and all responsive render assets.
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

### Final render-disclosure, image-geometry, and navigation pass

Focused RED contracts failed before the final corrections: affected pages had no visible “Concept rendering” labels, render alt text did not consistently identify conceptual imagery, the mobile menu showed an external arrow on internal links, and the metadata audit first found the header lockup declared as 215×42 despite a 240×56 source file.

GREEN changes:

- added visible “Concept rendering” labels and concept-aware, scene-specific alt text to all 13 render placements across Home, Network, all three format pages, and Our Story;
- corrected the source dimensions for both Rangeway lockups, all four PeopleField portraits, the 1024×1024 Basecamp interior, the 832×834 St. Louis image, and the 1672×941 Our Story masthead;
- added a built-output audit that compares every local image declaration against its actual `sips` file metadata;
- limited the mobile navigation arrow to Field Notes and added new-tab screen-reader text to the real external navigation link in both desktop and mobile navigation.

Focused GREEN results: 19 source-contract tests and 10 built-output tests passed with zero failures.

## Acceptance matrix

| Acceptance item | Result | Evidence boundary |
| --- | --- | --- |
| 15 authored routes build and remain non-indexing | Pass | Static build and built-output contracts. |
| All routes fit 1440, 1024, 390, and 360 widths | Pass | 60-case in-app browser matrix after the Basecamp fix. |
| Primary content is not hidden or inert | Pass | 60-case browser matrix plus source/compiled-output rejection guards. |
| Unbuilt-place imagery is disclosed and described accurately | Pass | Source and generated-HTML counts, scene-by-scene alt review, and visible-label CSS; no separate final-label screenshot pass was recorded. |
| Local image declarations match file geometry | Pass | Built-output metadata comparison for every local image on every route. |
| Mobile navigation distinguishes the real external link | Pass | Source and generated-HTML contracts; keyboard interaction remains source/output verified rather than browser replayed. |
| Incremental scrolling executes on every route | Not established | Automated wheel input was ineffective; `PageDown` worked only on a sample and viewport overrides reset during navigation. |
| Interceptor isolated-browser review | Blocked | Mandatory preflight exited 8 because `INTERCEPTOR_TEST_CONTEXT_ID` was unset. |
| Real external form delivery and production deployment | Out of scope | No real submission, deploy, or domain change occurred. |

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

- `npm test`: 29 passed, 0 failed.
- `astro check`: 33 files checked; 0 errors, 0 warnings, 0 hints.
- `astro build`: 15 static pages generated.
- explicit built-output suite: 10 passed, 0 failed.
- `git diff --check`: clean.

## Handoff status

The project is ready for local user review with `npm run dev` or `npm run build && npm run preview`. Production publishing, domain configuration, and a real form-delivery test remain deliberately outside this task.
