# Extractable Components

The current app has no separately reusable layout components. Its header and all
page sections are co-located in `app/page.tsx`, so component extraction should be
skipped for this redesign.

## SectionLabel

- Source: `app/page.tsx`
- Category: basic
- Description: Repeated numeric/uppercase section eyebrow
- Extractable props: `number` (string), `title` (string)
- Hardcoded: `.section-label` class structure

## SiteHeader

- Source: `app/page.tsx` (co-located, not exported)
- Category: layout candidate
- Description: Shared wordmark, route navigation, mobile menu, and theme toggle
- Extractable props: `activeItem` (string), `theme` (string), `menuOpen` (boolean)
- Hardcoded: portrait asset, Ken Quanico wordmark, route labels, control styling
- Note: Do not extract into Superdesign before the codebase itself separates this
  markup into an exported component.
