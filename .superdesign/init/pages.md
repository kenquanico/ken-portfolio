# Page Dependency Trees

All eight routes share the same recursively traced dependency tree because the
detail route files re-export `app/page.tsx`.

## `/` — Home

Entry: `app/page.tsx`

- `app/page.tsx`
  - `react` (external)
  - `next/navigation` (external)
- `app/layout.tsx`
  - `app/globals.css`
  - `@vercel/analytics/next` (external)
  - `react` types (external)
- Brand/content assets
  - `public/images/profile-icon.png`
  - `public/images/ken-portrait.jpg`
  - `public/project-logos/*`
  - `public/logos/*`

Actual home render branch: `app/page.tsx:407:578`.

## Detail routes

Applies to `/stack`, `/projects`, `/experience`, `/certifications`,
`/recognition`, `/documents`, and `/contact`.

- `app/<route>/page.tsx`
  - `app/page.tsx`
    - `react` (external)
    - `next/navigation` (external)
- `app/layout.tsx`
  - `app/globals.css`
  - `@vercel/analytics/next` (external)

The route-specific branches are all in `app/page.tsx:466:681`.
