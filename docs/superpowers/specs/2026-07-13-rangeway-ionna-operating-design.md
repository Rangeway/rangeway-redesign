# Rangeway Operating Network Design Specification

## Goal

Build a completely new, non-production Rangeway website that uses `rangeway-preview` only as a factual content inventory. The site must draw heavily from IONNA's information architecture, section pacing, operational proof, page-family differentiation, and large image-led composition while remaining unmistakably Rangeway in color, typography, voice, terminology, and imagery.

The existing `codex/quiet-bold` implementation is rejected. Its components, layout grammar, section cadence, hero construction, responsive rules, and footer/navigation design are prohibited inputs.

## Truthful operating posture

The website should feel like a confident operating company, not a concept deck. It may use present tense for Rangeway's company activity: designing, developing, publishing, partnering, raising, hiring, and building.

It must not claim that a Rangeway charging location is currently open, that drivers are being served today, or that live operational data exists. Replace IONNA's live-location utility with a project-focused surface such as “See where we're building.” Do not invent live status, uptime, pricing, hours, connector availability, or opening dates.

## IONNA layout principles to borrow

- A wide inset capsule header with the wordmark as the visual axis on desktop and a compact logo/menu bar on mobile.
- A cinematic media-led homepage hero with short copy and immediate actions.
- Alternating promise, proof, utility, story, and current-activity modules.
- Full-width project and place imagery; strong transitions between cream, navy, warm-white, sun, and oxide surfaces.
- Concrete operating proof: current projects, dated updates, named people, partner roles, contact routes, and project detail.
- Different page families for network/product, people, partners, support/contact, editorial/standards, and legal content.
- Repeated decision-point CTAs and a substantial, useful footer.

Do not copy IONNA's colors, typefaces, button styling, orange line motifs, illustrations, proprietary terms, jokes, sentence structures, icons, photography, partner marks, or exact component designs.

## Aesthetic system

**Register:** Industrial / utilitarian hospitality.

**Typography:** Raleway for display, navigation, and actions; Source Sans 3 for body and legal copy; IBM Plex Mono for operational labels and project metadata.

**Palette:** Highway Navy `#17313E`, deep support navy `#142B35`, Rangeway Sun `#F2B64C`, Oxide Red `#993A28`, Roadmap Cream `#F7E6C4`, slate `#52636B`, and warm white. Sun is the primary accent. Oxide is used sparingly for route/project emphasis.

**Motion:** route-line drawing, restrained reveal of operational facts, and cinematic image-mask transitions. All content must be visible and correctly laid out without JavaScript and with reduced motion. Scroll reveal may enhance but never gate visibility.

**Memorable element:** a large “route board” that behaves like a living operating index—project places, corridors, format, and current public activity—without falsely claiming live locations.

## Global shell

- Desktop capsule navigation is split around a centered Rangeway wordmark.
- Primary destinations: Network, Projects, Company, Partners, Investors, Newsroom, Contact.
- Mobile uses a real accessible menu with a native no-JavaScript fallback.
- Footer groups Explore, Company, and Connect links and exposes the official contact details.
- Preview metadata remains non-indexed. No production deployment configuration or domain mutation is allowed.

## Homepage

1. Cinematic hero using one large Rangeway place/render image, the exact tagline “Travel farther. Stop better.”, active-company positioning, and actions for “See where we're building” and “Explore the experience.”
2. Compact operating-proof rail: three formats, three public project regions, current newsroom/Field Notes presence, and contact access—no fabricated real-time numbers.
3. Image-led statement that the stop is the product, followed by concrete hospitality standards.
4. The route board: Bozeman, Mojave / Antelope Valley, and St. Louis in that order, with sourced descriptors and links but no unverified statuses.
5. Three-format experience system: Waystation, Basecamp, Summit. Use distinct compositions rather than a uniform preview-era card grid.
6. Partner proof organized by what partners enable.
7. Dated current-activity/newsroom module.
8. Strong closing action and full footer.

## Page families

### Network and projects

`/network` behaves like IONNA's offering overview: immersive opening, hospitality standard, differentiated format presentation, honest amenity comparison, and the project route board. It is not a taxonomy lecture or fake map.

Waystation, Basecamp, and Summit each receive a distinct page composition. Shared facts may use one content model, but the rendered pages must not be clones. Waystation emphasizes automated baseline comfort; Basecamp emphasizes staffed hospitality and Trailkeepers; Summit emphasizes Lookouts, clubhouse, off-grid energy, and destination pace.

### Company and proof

- `/our-story`: short visual origin, operating beliefs, current work, and team transition.
- `/team`: immediately visible portraits for Zak Winnick, Luke Schuette, Theo Reichgelt, and Stephanie McGreevy only; concise bios and direct contact/careers action.
- `/partners`: logo-led capability groups with explicit role context and configuration disclaimer.
- `/investors`: sustained thesis → evidence → project pipeline → recognition → briefing action.
- `/commitments`: readable anchored chapters, not oversized repeated marketing sections.

### Contact and utility

- `/contact`: direct support-style layout with clear inquiry routes, visible form, and role-specific contacts.
- `/contact/thanks` and `/404`: compact state pages.
- `/privacy` and `/terms`: readable desktop measure, mobile typography, section anchors, and marketing-free spacing.

## Content constraints

- Carry forward the substantive content and legal text from `rangeway-preview`, not its markup or design.
- Public project order: Bozeman, Mojave / Antelope Valley, St. Louis.
- Formats: Waystation, Basecamp, Summit only. Do not revive Trailhead.
- Waystation is automated and unstaffed. Basecamp is staffed. Summit uses Lookouts; never call them cabins, units, or rooms.
- Include only Zak Winnick, Luke Schuette, Theo Reichgelt, and Stephanie McGreevy. Exclude James/Jim Regan, Raul Dominguez, and Paul Devon everywhere, including assets and metadata.
- Rangeway does not solicit site hosts.
- Preserve the exact tagline and Rangeway's calm, direct, hospitable voice. Do not imitate IONNA's puns or brand voice.

## Explicit no-reuse list

Do not import or recreate the rejected `Hero`, `PageHero`, `FormatPage`, `FormatCard`, `FieldGuideGrid`, `ExperienceCollage`, `ProjectStrip`, `ArrivalStrip`, `index-row`, repeated 7/4 or 5/6 split grids, repeated dark-left/image-right hero, caption strip, sticky pullquote, biography list duplication, partner directory rows, or the rejected nav/footer composition.

Images, official lockups, public content facts, route names, contact/legal text, and metadata may be copied into a new content model. Existing crops, frames, captions, and placements may not.

## Acceptance criteria

- At 1440×1100, 1024×768, 390×844, and 360×800, every route has intentional hierarchy, useful density, and no horizontal overflow, clipped headings, invisible content, or multi-screen accidental blank bands.
- Homepage and subpages visibly differ from `rangeway-preview` within three seconds.
- Each page family has a distinct composition appropriate to its purpose.
- All content remains visible with JavaScript disabled, reduced motion enabled, or reveal scripts interrupted.
- Keyboard navigation, focus treatment, mobile menu behavior, form states, and semantic structure are accessible.
- No real form submission, production deployment, fabricated operating status, or unverified project claim occurs during build or verification.

