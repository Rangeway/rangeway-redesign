# Homepage Network Navigator Design

## Purpose

Replace the blue “Company activity” strip beneath the homepage hero with an outward-facing network navigator. The replacement should make Rangeway’s public project footprint immediately visible once Mojave is announced and should give all three destinations equal prominence.

## Layout

The navy strip becomes three equal-width destination panels in this order:

1. Mojave / California
2. St. Louis / Missouri
3. Hawaiʻi / Hawaiʻi

The panels use identical dimensions, typography, spacing, and interaction styling. Mojave must not receive a featured treatment. Thin dividers may separate the panels, but the strip remains visually quiet beneath the hero.

The entire surface of each panel is clickable. Each panel contains the project name, its geographic label, and a small external-link arrow. The current “Company activity” label, activity list, and “Start a conversation” link are removed from this strip.

## Destinations

- Mojave: `https://mojave.rangeway.co`
- St. Louis: `https://stlouis.rangeway.co`
- Hawaiʻi: `https://hawaii.rangeway.co`

All three links open in a new tab and use safe external-link attributes. The accessible name for each link announces that it opens in a new tab.

## Visual Treatment

- Preserve the existing navy strip background.
- Use warm white for the primary destination names.
- Use the Rangeway orange for the arrows and restrained hover or focus feedback.
- Keep all three panels at equal visual weight.
- Avoid status labels, launch language, animated tickers, route maps, or internal company activity language.
- Use the approved spelling “Hawaiʻi” everywhere, including the proper ʻokina.

## Responsive Behavior

On desktop and tablet, the three panels form an equal three-column row.

On mobile, the panels stack as three equal rows with consistent padding and horizontal dividers. The full row remains the tap target, and no text or arrow may overflow at a 360-pixel viewport.

## Accessibility

- Wrap the navigator in a section labeled “Rangeway sites.”
- Use descriptive link names rather than relying on the arrow icon.
- Keep the arrow hidden from assistive technology.
- Provide a visible keyboard focus state with sufficient contrast.
- Ensure each panel has a minimum 44-pixel interactive height.

## Validation

- Confirm the three destinations appear in the approved order and use the exact URLs above.
- Confirm Mojave, St. Louis, and Hawaiʻi have equivalent markup and styling.
- Confirm “Company activity,” “Developing sites,” “Building partnerships,” and “Raising capital” no longer appear in the homepage strip.
- Verify desktop and 360-pixel mobile layouts visually.
- Run the project test suite, Astro check, production build, and diff check.

## Out of Scope

Creating the St. Louis project website is separate work. This change only links the homepage navigator to its approved future URL.
