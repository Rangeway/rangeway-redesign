# Rangeway Quiet Bold Website Redesign

Date: July 13, 2026

Status: Approved for implementation

## 1. Objective

Build a new Rangeway marketing website inspired by the confidence, scale, rounded framing, cinematic imagery, and roadside energy of IONNA's website while remaining unmistakably Rangeway.

The site must use Rangeway's colors, official identity, terminology, and established brand voice. It must not imitate IONNA's colors, copy, naming, verbal personality, or page layouts.

The new site will be built in `/Users/zakwinnick/Documents/rangeway-redesign-ionna`. The current `/Users/zakwinnick/Documents/GitHub/rangeway-preview` repository is the content and asset source. It is not the implementation target.

## 2. Approved Direction

The approved visual direction is **Quiet Bold**.

Quiet Bold combines:

- The confident Rangeway Sun arrival and large typography from the Roadside Pavilion concept
- The editorial restraint and designed composition of the Hospitality Poster concept
- A simplified hero with one protected text panel, one large image, and one clear journey cue
- No decorative circle or shape may overlap the hero copy
- No collage, callout stack, or competing secondary block may make the hero feel busy

The result should feel bold but calm, warm but not luxurious, retro without kitsch, and technical without becoming cold.

## 3. Brand and Voice Contract

The tagline **“Travel farther. Stop better.”** is fixed and remains the homepage hero headline.

Use Rangeway's established voice: warm, confident, hospitable, plainspoken, and specific. The voice should sound like an experienced hospitality operator, not a charging utility, a playful consumer startup, or IONNA.

Production copy rules remain in force:

- No em dashes or double hyphens in public copy
- Do not begin sentences with “And”
- Avoid fragments unless they are approved interface labels
- Use `driver's lounge` in lowercase
- Use `hotel operators`, not `hoteliers`
- Waystation is always automated and unstaffed
- Basecamp is the staffed format
- Use Summit without a Rangeway prefix
- Use Lookouts, never cabins, rooms, or units
- Do not call Rangeway formats stations
- Do not introduce unsupported statistics, sites, partners, commitments, or status claims

## 4. Visual System

### Color

Use the approved Rangeway palette:

- Highway Navy `#17313E` for structural dark surfaces, navigation, and protected type panels
- Rangeway Sun `#F2B64C` for optimistic emphasis and journey wayfinding
- Oxide Red `#993A28` for selective primary actions and rustic contrast
- Roadmap Cream `#F7E6C4` for warm page surfaces
- Warm white may support long-form reading where needed

Every foreground and background pairing must meet WCAG 2.1 AA. Adjust a token only when required for accessibility while preserving its perceptual role.

### Typography

- Raleway is the brand and display face for headings, navigation, buttons, labels, and captions
- Source Sans 3 is the reading face for paragraphs, forms, and legal content
- Display typography is large, heavy, compact, and protected from decorative overlap
- Body typography is open and comfortable, with restrained line length

### Shape and composition

- Use lightly rounded large frames and compact square or lightly rounded controls
- Do not use pervasive pills
- Favor one strong composition per section
- Use Rangeway Sun as a structural accent, not as floating decoration
- Use image captions and destination labels as subtle wayfinding
- Avoid stickers, seals, novelty badges, starbursts, and decorative clutter

### Imagery

- Reuse the approved renders and photography from `rangeway-preview`
- Lead with warm interiors, dusk exteriors, visible hospitality cues, and architectural character
- Keep equipment secondary to the human experience
- Give each major image an intentional responsive crop and descriptive alternative text
- Do not repeat the same hero render across multiple major sections unless necessary

### Motion

- Use short directional reveals, subtle image pushes, and restrained arrow travel
- No constant animation, ornamental bounce, or heavy parallax
- All content must remain visible without JavaScript
- Respect `prefers-reduced-motion`

## 5. Global Navigation and Footer

Preserve the current primary navigation:

1. The Network
2. Our Story
3. Team
4. Partners
5. Investors
6. Newsroom
7. Contact

Use the official Rangeway lockup. Select the charcoal or white asset according to surface contrast. Mobile navigation must be deliberate, keyboard accessible, focus-contained while open, and free of horizontal overflow.

The footer should provide clear wayfinding to the primary pages, network formats, legal pages, Field Notes, and appropriate social links without becoming a dense sitemap wall.

## 6. Homepage

### Hero

Use the approved Quiet Bold split composition:

- Protected Highway Navy copy panel
- One large hospitality-led image
- “Travel farther. Stop better.” as the headline
- A concise supporting statement in Rangeway's voice
- One primary action chosen for the finished narrative, with “Step Inside” as the current working label
- No circle, collage, or decorative element overlapping the copy

### Journey strip

Immediately follow the hero with:

1. Arrive
2. Recharge
3. Continue

The strip should feel like simple wayfinding, not a feature widget.

### The experience

Use large imagery and concise copy to answer why a driver would want to stop at Rangeway. Present hospitality before infrastructure.

### Hospitality principles

Preserve the four principles from `rangeway-preview`:

- Good light
- Real comfort
- Room to settle
- Easy momentum

Pair them with imagery or spatial composition. Do not turn them into a generic four-icon grid.

### The network

Introduce Waystation, Basecamp, and Summit as three expressions of one hospitality standard. Each format receives an image-led entry point and concise description.

### Places on the horizon

Preserve the public order:

1. Bozeman
2. Mojave
3. St. Louis

Status language and links must be verified against current approved public sources before they are presented as facts. The redesign must not automatically inherit `Raising capital`, `Breaking ground`, or similar status labels solely because they appear in the preview repository.

### Story and credibility

Provide a concise bridge to Our Story, Team, Partners, and Investors. This should establish human and operational credibility without turning the homepage into an investor deck.

### Field Notes and closing action

Provide an updates or Field Notes entry point followed by a single bold closing invitation. The closing action should be selected according to the page's final narrative rather than preserving “Discover the Network” by default.

## 7. Page Set

Preserve the substantive information and useful routes from `rangeway-preview`:

- Home
- The Network
- Waystation
- Basecamp
- Summit
- Our Story
- Team
- Partners
- Investors
- Commitments
- Contact
- Contact confirmation
- Privacy
- Terms
- 404
- External Newsroom and Field Notes destinations where configured

Content may be reorganized and lightly edited for rhythm, clarity, and the new layout. The redesign is not permission to invent new claims or erase substantive information.

Interior pages will use the same Quiet Bold design system but may vary their composition according to purpose:

- Explore pages prioritize imagery, format understanding, and cross-navigation
- Story pages prioritize narrative, portraits, partner context, and credibility
- Action pages prioritize clarity, verified proof, and a simple next step
- Legal and utility pages prioritize reading comfort

## 8. Implementation Architecture

Build a new Astro site in the destination workspace. Reuse proven content structures and asset-processing patterns from `rangeway-preview` where they remain appropriate, but do not copy the prior visual implementation wholesale.

Use focused components with clear responsibilities:

- Base layout and metadata
- Global navigation and mobile menu
- Footer
- Responsive image
- Hero variants
- Journey strip
- Experience section
- Hospitality principles
- Format cards and format navigation
- Project or destination rows
- Story and credibility bridge
- Page hero and section header
- Contact form and feedback states

Shared facts, routes, format labels, project order, partner entries, and external links should live in centralized data or configuration so pages cannot silently diverge.

## 9. Forms, Failure States, and Resilience

- Preserve the existing contact form's intended destination and environment-aware return behavior
- Validate required fields accessibly
- Show clear submission, success, failure, timeout, and retry states
- Do not send a real test message during automated verification
- External links must use appropriate security attributes
- The site must remain readable and navigable if client-side JavaScript fails
- Preview indexing, canonical URLs, robots behavior, sitemap generation, and environment-specific form configuration must remain centralized

## 10. Responsive and Accessibility Requirements

- WCAG 2.1 AA is the minimum
- No horizontal overflow at any supported viewport
- Desktop compositions must become intentional mobile sequences, not compressed miniatures
- Headlines must remain compact without clipping or overlapping
- Navigation must be fully keyboard operable
- The mobile menu must contain and restore focus correctly
- Focus indicators must remain visible on all surfaces
- Image alternative text must describe the hospitality or architectural cue
- Motion must collapse cleanly for reduced-motion users

## 11. Validation

Implementation is complete only after:

1. Astro type and content checks pass
2. Automated regression tests pass
3. Production build passes
4. Every primary route receives desktop and mobile visual review
5. Navigation, mobile menu, keyboard flow, and focus states are verified
6. Reduced-motion behavior is verified
7. Contact validation and recovery states are tested without sending a real message
8. Responsive images, intrinsic dimensions, loading behavior, and focal crops are checked
9. No horizontal overflow is present
10. Zak reviews the local website before any production deployment

## 12. Non-Goals

- Rebranding Rangeway or changing the official logo
- Copying IONNA's colors, voice, naming, or page layouts
- Creating a Rangeway host-acquisition funnel
- Adding unsupported status claims, statistics, partners, or destinations
- Reintroducing the busy hybrid collage or overlapping circle
- Deploying or changing production domains without explicit approval

## 13. Approved Decisions Summary

- Reference relationship: inspired by IONNA, not a visual copy
- Brand: Rangeway colors and Rangeway voice only
- Tagline: “Travel farther. Stop better.” remains fixed
- Visual direction: Quiet Bold
- Hero: protected navy text panel, one image, simple journey strip
- Hero CTA: flexible and chosen to fit the final narrative
- Content source: substantive information and assets from `rangeway-preview`
- Navigation: preserve the current primary page set
- Public project order: Bozeman, Mojave, St. Louis
- Status claims: verify before publishing
- Framework: Astro
- Review: local visual approval before deployment
