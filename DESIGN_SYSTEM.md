# Design System — Ahsan's Learning Academy Website

Theme: **Liquid Glass × Sky Blue**
Metaphor: open sky + light = clarity, growth, learning. Glass panels float above a soft moving sky-gradient backdrop.

## Color tokens

| Token | Hex / Value | Use |
|---|---|---|
| `--sky-950` | `#0a1f33` | Primary text, headings on light bg |
| `--sky-700` | `#0369a1` | Secondary text, links |
| `--sky-600` | `#0ea5e9` | Primary accent, buttons, active states |
| `--sky-400` | `#38bdf8` | Secondary accent, highlights, gradient stop |
| `--sky-100` | `#e0f2fe` | Soft section backgrounds |
| `--cloud-50` | `#f5fafd` | Page background |
| `--ink-800` | `#1e293b` | Body text |
| `--glass-bg` | `rgba(255,255,255,0.55)` | Glass panel fill |
| `--glass-border` | `rgba(255,255,255,0.35)` | Glass panel edge |
| `--glass-shadow` | `0 8px 32px rgba(14,165,233,0.15)` | Glass panel shadow (tinted blue, not generic grey) |

Gradient backdrop (hero + section wash):
```css
background: radial-gradient(circle at 20% 20%, #e0f2fe 0%, #f5fafd 45%, #ffffff 100%);
```

## Typography

- **Headings:** `Sora` (600/700) — geometric, confident, sits well on glass
- **Body:** `Inter` (400/500) — highly readable at small sizes, bilingual (Bangla/English) friendly
- Type scale: `text-sm` (14px) body-small → `text-base` (16px) body → `text-xl` (20px) lead → `text-3xl`/`text-5xl` headings
- Line length: keep paragraphs under ~75 characters (`max-w-prose` / `max-w-[65ch]`)
- No all-caps labels, no single-word accent coloring inside headlines — per house style, avoid generic AI-design tells

## Glass panel pattern

```css
.glass-panel {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  box-shadow: var(--glass-shadow);
  border-radius: 1.25rem;
}
```

Rule: **not every element gets glass.** Glass is reserved for cards that "float" over the sky background (nav bar, hero CTA panel, class-diary cards, admission form). Plain content sections use flat `--cloud-50` / white backgrounds so the glass effect stays a deliberate accent, not wallpaper.

## Motion

One orchestrated moment: the hero background gradient drifts slowly (20s ease loop) — nothing else auto-animates. Hover states on buttons/cards are subtle (shadow + 2px lift), respecting `prefers-reduced-motion`.

## Layout principles

- Center-aligned hero, left-aligned content sections (reading-friendly for bilingual long-form text)
- Section rhythm: `py-20` desktop / `py-12` mobile, consistent `max-w-6xl` container
- Rounded scale: `rounded-2xl` for cards/glass, `rounded-full` only for pills/badges/buttons — not applied indiscriminately

## File map (for the existing Next.js repo)

```
app/
  globals.css        → tokens + glass utility + font imports
components/
  Navbar.tsx          → floating glass nav, sticky
  Hero.tsx             → sky gradient hero + glass CTA panel
  ClassDiary.tsx      → "today's class" feed, glass cards, batch filter
  AdmissionForm.tsx  → glass form panel (client component)
  Footer.tsx           → flat sky-950 footer, social links
tailwind.config.ts   → color tokens, font families
```

## Placeholder / demo content

Everything with 🔧 in the code is placeholder — swap for real photo, real social links, and real batch/class data later. No backend wired yet; `AdmissionForm` currently just logs to console on submit.
