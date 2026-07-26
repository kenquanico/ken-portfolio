# Ken Quanico Portfolio — Editorial Systems Design

## Product context

This is Ken Aldrey Quanico's personal engineering portfolio. It presents his own
identity, biography, projects, work experience, skills, certifications, GitHub
activity, documents, and contact details across these routes:

- `/` — overview with hero and selected work
- `/projects`
- `/experience`
- `/stack`
- `/certifications`
- `/recognition`
- `/documents`
- `/contact`

The information architecture and all copy belong to Ken. Never import names,
projects, metrics, testimonials, links, affiliations, or other content from the
visual reference.

## Governing visual source

Create faithfully from the visual language extracted from `https://800k.dev`,
documented at `.superdesign/website/800k.dev/design.md`. The reference governs
composition, typography, density, texture, and interaction style; it does not
govern content or identity.

The desired feeling is an engineer's editorial index: quiet, rigorous,
monochrome, extremely legible, technical without looking like a dashboard.

## Composition

### Desktop shell

- Fixed left sidebar, approximately `204px` wide, separated from the page by a
  single `#E9E9E9` vertical rule.
- Sidebar content is vertically organized: Ken wordmark, primary page links,
  secondary portfolio links, a flexible spacer, theme control, and direct email.
- Main content begins after the rail and uses an intentionally narrow editorial
  column, approximately `720–820px`, centered within the remaining viewport.
- The content canvas may extend wider for the hero portrait/text split and metric
  row but must never become a conventional full-width marketing layout.
- A low-opacity dotted grid texture may sit at the far right edge and in section
  transitions. It is atmospheric only.

### Mobile shell

- Replace the sidebar with a compact sticky top bar containing Ken's wordmark,
  theme control, and a menu button.
- Open navigation as a simple white panel with thin dividers; no card shadow or
  colorful overlay.
- Stack all split layouts in source order with at least `24px` gaps.

### Hero

- Asymmetric two-column composition: Ken's portrait on the left, name and short
  biography on the right.
- Portrait receives a high-contrast monochrome / halftone treatment and should
  sit without a decorative card frame.
- Ken's name is the dominant type element.
- Social links are a small inline monospace row beneath the biography.
- Place a four-column metric strip below the hero. Metrics must derive from Ken's
  real portfolio content only; if exact numeric claims are unavailable, use
  factual labels such as focus, location, availability, and current discipline
  rather than inventing numbers.

### Sections

- Numbered labels such as `01 — projects`, `02 — experience`, and `03 — stack`.
- A small uppercase or monospace “view all” link aligns opposite the section label.
- Separate sections with hairline rules and at least `64px` of vertical breathing room.
- Prefer flat editorial rows, compact timelines, and restrained lists over
  floating decks, rotated cards, large rounded tiles, or dashboard bento cards.
- Alternate flow and density across sections while retaining one visual grammar.

## Color

The system is fully achromatic.

### Light mode

- Canvas: `#FFFFFF`
- Surface: `#F5F5F5`
- Primary text: `#0A0A0A`
- Secondary text: `#737373`
- Rule / border: `#E9E9E9`

### Dark mode

- Canvas: `#0A0A0A`
- Surface: `#141414`
- Primary text: `#F5F5F5`
- Secondary text: `#8C8C8C`
- Rule / border: `#272727`

No accent color. Never use orange, blue, purple, pink, gradients, or tinted
off-whites. Interaction is communicated with opacity, inversion, underline,
border weight, and text weight.

## Typography

- Display: `"Geist Pixel", "Geist Mono", "SFMono-Regular", ui-monospace,
  monospace`
- Body: `Geist, Inter, "Helvetica Neue", Arial, sans-serif`
- Utility/meta: `"Geist Mono", "SFMono-Regular", Menlo, monospace`

Scale:

- Hero name: `42px / 1`, weight `400`
- Large metric: `18–22px / 1.2`, weight `400`, display family
- Section label: `13–14px / 1.4`, display or utility family
- Body: `14–15px / 1.63`, weight `400`
- Small navigation / meta: `11–12px / 1.5`
- Micro label: `9–10px`, uppercase with `0.06–0.1em` tracking

Avoid bold weights above `600`. Hierarchy comes from size, spacing, and placement.

## Spacing and sizing

- Base unit: `4px`
- Common gap: `20px`
- Sidebar padding: `24px`
- Section block padding: `64–80px` vertical
- Content card/row padding: `18–22px`
- Main content max width: `820px`
- Large-layout breakpoint: `960px`
- Small-layout breakpoint: `680px`

## Shape and effects

- Default radius: `0`
- Small controls: maximum `6px`
- Pills are permitted only for one primary CTA or compact status.
- No drop shadows, glass blur, decorative gradients, or inflated card borders.
- Rules are `1px solid` using the border token.
- Dotted texture: `radial-gradient(circle, currentColor 1px, transparent 1px)`
  with an `8–12px` grid and `0.08–0.14` opacity.
- Portrait: grayscale, high contrast, with optional CSS mask or halftone overlay.

## Components

### Sidebar link

- Compact row, `12px` body/mono type.
- Default secondary text; active/hover becomes primary.
- Optional 12–14px line icon or typographic index at left.
- No filled active background.

### Project row

- Flat full-width row separated by a hairline rule.
- Small category and date metadata, project title, brief description, and arrow.
- Hover reduces opacity on siblings or shifts the arrow `2px`; no colored fill.

### Experience row

- Three-column desktop rhythm: year/date, role/company, optional descriptor.
- Collapses to a single column on mobile.
- No timeline bubbles, large badges, or card container.

### Certification row

- Flat list or three-column grid with logo, credential, issuer, and verify link.
- No rotated certificate deck.

### Theme control

- Icon-sized or segmented monochrome control.
- Preserve clear accessible labels and focus treatment.

## Motion and accessibility

- Color/background transitions: `200ms cubic-bezier(.4, 0, .2, 1)`
- Opacity: `150ms`
- Small transform feedback: maximum `4px`
- No scroll-triggered spectacle.
- Honor `prefers-reduced-motion`.
- Keep visible `:focus-visible` outlines with at least `2px` contrast.
- Maintain semantic headings, landmarks, descriptive image alt text, and current
  keyboard navigation behavior.

## Non-negotiable guardrails

- Preserve Ken's content and route coverage.
- Match the reference's design language, not its contents or brand.
- Use only the fonts, colors, spacing, and component styles defined here.
- Achromatic only; no accent color.
- No generic SaaS dashboard, bento grid, colorful card system, or oversized
  marketing hero.
- Do not introduce any visual styles not defined in this design system.
