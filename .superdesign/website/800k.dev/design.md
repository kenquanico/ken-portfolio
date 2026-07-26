---
version: "ui2web-website-clone"
name: "Bryl Lim — AI & Software Engineer"
description: "Minimal monochromatic system built on near-white backgrounds with deep charcoal text and restrained gray accents. Typographic hierarchy uses a pixel-perfect display family for prominence and a geometric sans for body. Spacing is generous and consistent; interaction states shift via opacity and subtle border transitions rather than color. No decorative color — a portrait photograph and metric-badge numbers anchor visual interest in content, not chrome."
colors:
  background: "#FFFFFF"
  surface: "#F5F5F5"
  text-primary: "#0A0A0A"
  text-secondary: "#737373"
  border: "#E9E9E9"
typography:
  display-lg:
    fontFamily: "Geist Pixel"
    fontSize: "42px"
    fontWeight: 400
    lineHeight: "1"
  headline-md:
    fontFamily: "Geist Pixel"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "1.43"
  body-md:
    fontFamily: "Geist"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "1.63"
  label-md:
    fontFamily: "Geist"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: "1.5"
spacing:
  base: "10px"; gap: "20px"; card-padding: "20px"; section-padding: "40px"
rounded:
  control: "6px"; card: "6px"; pill: "9999px"
components:
  card: { background: "#F5F5F5", radius: "6px" }
  button: { background: "#0A0A0A", radius: "9999px" }
---
# Bryl Lim — AI & Software Engineer
Source: https://800k.dev

## Overview

A typographic-led identity that treats content (code, names, dates, metric numbers) as the primary visual material. The palette is neutral black, near-white, and mid-gray; no brand color exists. Interaction relies on border states, opacity shifts, and weight emphasis rather than chromatic feedback. The display typeface (Geist Pixel) brings geometric precision to names and headings; body copy uses the same sans family at smaller weights for consistency. Spacing is deliberately generous—no cramping—which gives breathing room to text-heavy sections and reinforces a uncluttered, engineering-focused tone.

## Composition

The hero bands an off-center portrait (left/center) with a headline and short summary block (right), separated by white space rather than frame or container. Below the fold, alternating full-width section bands (each with a small gray category label above) contain one primary content type per band: a row of metric badges (numbers + labels), a timeline of projects, a skill grid, a testimonial carousel, a logo row. No two bands stack the same layout—variety in density and alignment prevents scanning collapse. The alternative rejected: a uniform card grid or centered column layout; instead, left/right asymmetry and whitespace breaks create visual rhythm without borders or depth.

## Colors

**Background (#FFFFFF, 95.7% area):** Serves as the dominant canvas; all text and cards sit directly on white, with no secondary tint. This maximum contrast keeps legibility axiomatic and reserves any color shift for genuine semantic signal (currently unused).

**Text-Primary (#0A0A0A, 3.1% area):** Deep charcoal for all headlines and body text. Slightly softer than pure black to reduce eye strain on extended reading, yet dark enough to read at small label sizes (14px+) without anti-aliasing fallback.

**Text-Secondary (#737373, ~44 instances):** Mid-gray applied to category labels, supporting copy, social link text, and date annotations. Provides hierarchy without introducing a second palette; sits ~4.5:1 WCAG AA contrast on white.

**Border (#E9E9E9, ~3 instances):** Barely-visible divider lines separate section bands and delineate input focus states. Nearly white, it functions as a "content edge" rather than a visual partition; reduces visual noise while maintaining structure.

**No primary/accent color.** The system is entirely achromatic. Any interactive affordance (button, link, active pill) relies on border thickness, opacity, or weight shift, not color. This restraint forces careful typography and spacing to do the work of hierarchy.

## Typography

**Display-Lg (Geist Pixel, 42px, weight 400, line-height 1):** Applied to the main hero heading. Pixel-grid family choice evokes precision (code, engineering) and pairs with the technical content. Tight line-height (1) gives compact letterforms a defined footprint.

**Headline-Md (Geist Pixel, 14px, weight 400, line-height 1.43):** Category labels and section titles. Same family as display for tonal consistency; weight and size alone differentiate from body, avoiding serif/sans splits.

**Body-Md (Geist, 15px, weight 400, line-height 1.63):** Running text, project descriptions, bio copy. Regular Geist (non-pixel) provides smooth readability at body scale; generous line-height (1.63) ensures paragraph blocks don't feel dense despite the tight margins.

**Label-Md (Geist, 15px, weight 500, line-height 1.5):** Metric badge labels, skill tags, action text (buttons, links). Weight 500 (medium) adds emphasis without introducing a bold weight; matches body size for visual cohesion.

No serif or contrasting secondary family; the system trusts weight and size hierarchy alone to clarify roles.

## Layout

**Grid structure:** Section bands follow a bento-style asymmetry—some full-width, some split left/right, some center-aligned—rather than a uniform column. The metric-badge row is a horizontal flex of ~4 items with 20px gaps. The project timeline is a tall vertical stack; the skill grid is a wrapping row of pills. This variation in flow direction (vertical projects, horizontal skills, asymmetric hero) maintains attention without formal borders.

**Max-width:** No explicit container width observed; content flows edge-to-edge on mobile, with section padding (40px) creating breathing room. Assumes responsive collapse at breakpoints.

**Card density:** Section-padding of 40px between bands; card-padding of 20px inside any surface (e.g., skill pill groups, testimonial blocks). No nested margin collapse; consistent gap spacing creates rhythm.

**Responsive stacking:** Portrait and text split vertically on narrow screens; skill pills wrap onto new lines; metric badges shrink but remain in-row. Timeline and project cards remain full-width, preserving readability.

## Components

**Card:** Background #F5F5F5, radius 6px. Applied to skill-pill containers and testimonial blocks. Subtle shade lift from white grounds content without visual aggression.

**Button / Primary CTA:** Background #0A0A0A (text-primary inverted), radius 9999px (pill shape). Solid fill, not outline, ensures it reads as actionable. No shadow; border or opacity shift on hover/focus.

**Input / Interactive pill (skill tag, filter pill):** Border 1px #E9E9E9, background white, radius 6px. On focus/select, border thickens to 2px or opacity increases; no background color change.

## Motion

**Transitions (max 0.35s):** Color and background-color shifts use 0.2s cubic-bezier(0.4, 0, 0.2, 1) for snappy feedback on button/link hover. Opacity fades use 0.15s to avoid lag on show/hide (e.g., tooltip, modal). Transform (e.g., scale on click) uses 0.5s cubic-bezier(0.22, 1, 0.36, 1) for a gentle bounce. No animations on scroll; interactions are click/focus driven only.

Easing is always cubic-bezier, never ease-out-bounce or elastic—restrained, professional tone.

## Effects

**Dotted pattern footer:** An observed ASCII/dot pattern in the footer (lower-right visible in screenshots) is rendered as a repeating background image or canvas element—not a real component. Treat as atmospheric texture, secondary to content. Keep opacity low (~10–15%) so it does not interfere with text legibility.

**Photography:** The hero portrait is the only visual anchor; the halftone/pixelated effect in the image itself is a photographic treatment, not a CSS filter. Preserve the photograph's original contrast and saturation; do not apply additional overlays.

No gradients, blurs, or drop-shadows observed in the interface itself; all depth is created by whitespace and contrast.

## Guardrails

- **No color for interactivity.** Button states, hover, and focus must be expressed via border weight, opacity, or typography weight changes only. Avoid introducing any chromatic feedback (tint, highlight, colored border).
- **Preserve geometric sans + pixel-display pairing.** Do not substitute serif or display fonts; the Geist family (Pixel for display, regular for body) is core to the minimal, technical aesthetic.
- **Maintain 40px section spacing.** Do not compress bands or introduce sub-40px vertical gaps between major sections; generous spacing is a key identity marker.
- **Keep backgrounds pure white or light gray only.** No tinted backgrounds (#F0F8FF, #F5F5F0, etc.); #FFFFFF and #F5F5F5 are the only two allowed.
- **Do not add decorative borders or shadows to cards.** Border is only used for interactivity (input focus, button outline) and section dividers. Cards are identified by background color and radius alone.