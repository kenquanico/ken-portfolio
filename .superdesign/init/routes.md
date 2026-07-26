# Route Map

The app uses Next.js App Router. Every detail route re-exports the single
`Home` component from `app/page.tsx`; that component selects the visible section
with `usePathname()`.

| URL | Route file | Render branch | Layout |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | Hero, selected projects, experience, certifications, GitHub activity | `app/layout.tsx` + shared site header |
| `/stack` | `app/stack/page.tsx` | Stack groups and tools wall | Same |
| `/projects` | `app/projects/page.tsx` | Project groups and rows | Same |
| `/experience` | `app/experience/page.tsx` | Full experience rail | Same |
| `/certifications` | `app/certifications/page.tsx` | Grouped certification wall | Same |
| `/recognition` | `app/recognition/page.tsx` | Recognition list | Same |
| `/documents` | `app/documents/page.tsx` | Resume and manuscript resources | Same |
| `/contact` | `app/contact/page.tsx` | Contact statement, email, location, social links | Same |

Representative route file:

```tsx
export { default } from "../page";
```

The full route selection is in `app/page.tsx`:

```tsx
const pathname = usePathname();
<main id="main" className={pathname === "/" ? "main-home" : "main-detail"}>
  {pathname === "/" && <section className="hero section-shell" id="top">...</section>}
  {pathname === "/stack" && <section className="capabilities section-shell page-section">...</section>}
  {(pathname === "/" || pathname === "/projects") && <section className="projects section-shell section-rule page-section">...</section>}
  {(pathname === "/" || pathname === "/experience") && <section className="experience section-shell section-rule page-section">...</section>}
  {(pathname === "/" || pathname === "/certifications") && <section className="certifications section-shell section-rule page-section">...</section>}
  {pathname === "/" && <section className="github-section section-shell section-rule">...</section>}
  {pathname === "/recognition" && <section className="recognition section-shell page-section">...</section>}
  {pathname === "/documents" && <section className="documents section-shell page-section">...</section>}
  {pathname === "/contact" && <section className="contact section-shell page-section">...</section>}
</main>
```
