# Shared UI Components

## Framework inventory

- Next.js 16 App Router
- React 19
- TypeScript
- Custom CSS in `app/globals.css`
- No external component library and no shared `components/` directory

The portfolio is intentionally implemented as one client component in
`app/page.tsx`. The only reusable UI primitive is co-located in that file.

## SectionLabel

- Source: `app/page.tsx`
- Description: Numbered, uppercase section eyebrow used on every portfolio section.
- Props: `number: string`, `title: string`

```tsx
function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
      <div className="section-label">
        <span>{number}</span>
        <p>{title}</p>
      </div>
  );
}
```

No other shared UI primitives exist. Buttons, project cards, certification cards,
experience entries, and document rows are rendered inline in `app/page.tsx`.
