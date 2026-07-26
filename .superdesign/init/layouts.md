# Shared Layouts

## RootLayout

- Source: `app/layout.tsx`
- Description: Global HTML/body shell, metadata, viewport theme colors, global CSS,
  and Vercel Analytics.

```tsx
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ken Aldrey Quanico — Web Developer",
  description:
    "Portfolio of Ken Aldrey Quanico, a web developer building modern web and mobile applications with a focus on generative AI.",
  icons: {
    icon: "/images/profile-icon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#11110f" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Site header

- Source: `app/page.tsx` inside `Home`
- Description: Shared sticky header across all routes. Contains the portrait
  wordmark, primary route navigation, mobile menu toggle, and theme control.

```tsx
<header className="site-header">
  <a className="wordmark" href="/" aria-label="Ken Aldrey Quanico, home">
    <span className="wordmark-mark" aria-hidden="true">
      <img src="/images/profile-icon.png" alt="" />
    </span>
    <span className="wordmark-name">Ken Quanico</span>
  </a>

  <button
    className="menu-toggle"
    type="button"
    aria-label="Toggle navigation"
    aria-expanded={menuOpen}
    onClick={() => setMenuOpen((open) => !open)}
  >
    <span />
    <span />
  </button>

  <nav className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
    <a href="/stack" onClick={closeMenu}>Stack</a>
    <a href="/projects" onClick={closeMenu}>Projects</a>
    <a href="/experience" onClick={closeMenu}>Experience</a>
    <a href="/certifications" onClick={closeMenu}>Certifications</a>
  </nav>

  <button
    className="theme-toggle"
    type="button"
    aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    aria-pressed={theme === "dark"}
    onClick={toggleTheme}
  >
    <span className="theme-dot" aria-hidden="true" />
    <span>{theme === "dark" ? "Light" : "Dark"}</span>
  </button>
</header>
```

All page layouts are conditional render branches inside `app/page.tsx`, selected
with `usePathname()`.
