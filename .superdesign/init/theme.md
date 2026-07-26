# Theme

## Compact token summary

### Light

- Background `--bg`: `#f4f1ea`
- Surface `--surface`: `#fbfaf7`
- Text `--text`: `#171714`
- Muted `--muted`: `#6d6a61`
- Rule `--line`: `#ccc7bb`
- Accent `--accent`: `#d94b2b`

### Dark

- Background `--bg`: `#11110f`
- Surface `--surface`: `#1a1a17`
- Text `--text`: `#f1eee6`
- Muted `--muted`: `#aaa69c`
- Rule `--line`: `#383630`
- Accent `--accent`: `#ff6846`

### Typography

- Primary: `Inter, "Helvetica Neue", Helvetica, Arial, sans-serif`
- Utility/meta: `ui-monospace, SFMono-Regular, Menlo, monospace`
- Body: `15px / 1.55`
- UI/meta labels: `8px–11px`, uppercase, tracked
- Headings are deliberately restrained: mostly `14px–17px`

### Layout, shape, and motion

- Content max width: `1280px`
- Responsive page padding: `clamp(20px, 4vw, 62px)`
- Section spacing: `clamp(60px, 8vw, 104px)`
- Borders: `1px solid var(--line)`
- Radius family: `5px`, `6px`, `9px`, `12px`, `14px`, `16px`, `18px`, `28px`
- Shadows: soft black shadows used only on floating cards
- Motion: `160–180ms ease`; reduced-motion mode removes transitions
- Breakpoints: `900px` and `650px`

## Raw source

Source: `app/globals.css` (330 lines). The file is the complete theme and component
stylesheet; there is no Tailwind config or theme provider.

```css
:root {
  --bg: #f4f1ea;
  --surface: #fbfaf7;
  --text: #171714;
  --muted: #6d6a61;
  --line: #ccc7bb;
  --accent: #d94b2b;
  --page-pad: clamp(20px, 4vw, 62px);
  --max-width: 1280px;
  color-scheme: light;
  font-family: Inter, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-synthesis: none;
  scroll-behavior: smooth;
}

:root[data-theme="dark"] {
  --bg: #11110f;
  --surface: #1a1a17;
  --text: #f1eee6;
  --muted: #aaa69c;
  --line: #383630;
  --accent: #ff6846;
  color-scheme: dark;
}

* { box-sizing: border-box; }
html { scroll-padding-top: 78px; }
body {
  margin: 0;
  min-width: 320px;
  overflow-x: clip;
  background: var(--bg);
  color: var(--text);
  font-size: 15px;
  line-height: 1.55;
  transition: background-color 180ms ease, color 180ms ease;
}
a { color: inherit; text-decoration: none; }
button, a { -webkit-tap-highlight-color: transparent; }
button { color: inherit; font: inherit; }
```

The full raw stylesheet must be passed as `app/globals.css` to design calls; at
330 lines it is below the trimming threshold and is the authoritative source for
all page-level class implementations and responsive behavior.
