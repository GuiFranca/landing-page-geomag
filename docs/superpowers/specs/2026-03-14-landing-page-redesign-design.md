# GeoMAG Landing Page Redesign — Design Spec

## Overview

Redesign the GeoMAG landing page applying the v2.0 design system (light theme variant). Replace the current generic layout with the engineering-precise, steel-blue visual language defined in the design system reference files.

**Theme:** Light
**Architecture:** Componentized (one Angular standalone component per section)
**Contact model:** WhatsApp redirect (no form)

---

## Design Tokens (Global — `styles.scss`)

All CSS custom properties below become the single source of truth, replacing the existing `--theme-palette-color-*` variables.

### Migration Notes

1. **Remove** the inline `<style>` block from `index.html` that defines `--theme-palette-color-*` variables
2. **Remove** all `--theme-palette-color-*` variables from `styles.scss`
3. **Remove** old Tailwind utility references (`text-theme-4`, `bg-theme-7`, etc.)
4. **Remove** `components.module.ts` — all components are standalone with direct imports
5. **Replace** Font Awesome CDN link in `index.html` with Google Fonts (Rajdhani, DM Sans, Space Mono)

### Brand Color Scale (complete)
```
--brand-050: #f0f6fa
--brand-100: #d8eaf4
--brand-200: #b3d3e8
--brand-300: #6aa3c5
--brand-400: #4a80a4   ← PRIMARY
--brand-500: #3a6880
--brand-600: #2e5263
--brand-700: #1f3c4a
--brand-800: #142836
--brand-900: #0c1c28
```

### Accent Colors
```
--accent:       #2e8fb0
--accent-light: #5cb8d4
--accent-dark:  #1e6a85
```

### Semantic Colors
```
--color-bg-base:      #f5f8fa
--color-bg-elevated:  #ffffff
--color-bg-surface:   #edf3f7
--color-bg-card:      #ffffff
--color-bg-dark:      #0a1a26

--color-text-primary:   #0e2232
--color-text-secondary: #3a5568
--color-text-muted:     #6b8899
--color-text-light:     #94aab8
--color-text-inverse:   #f5f8fa

--color-border:         rgba(74,128,164,0.14)
--color-border-mid:     rgba(74,128,164,0.25)
--color-border-strong:  rgba(74,128,164,0.42)

--color-success:  #16a06a
--color-warning:  #d4880a
--color-error:    #cc3333
```

### Typography
```
--font-display: 'Rajdhani', 'Barlow Condensed', sans-serif
--font-body:    'DM Sans', 'Helvetica Neue', sans-serif
--font-mono:    'Space Mono', 'Courier New', monospace
```

Google Fonts loaded in `index.html` with `display=swap`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet">
```

Type scale (responsive via `clamp()`):
```
--text-h1:      clamp(2.6rem, 5.5vw, 5.2rem)
--text-h2:      clamp(1.9rem, 3.8vw, 3.4rem)
--text-h3:      clamp(1.4rem, 2.4vw, 2.1rem)
--text-h4:      clamp(1.15rem, 1.8vw, 1.6rem)
--text-h5:      1.2rem
--text-body-lg: 1.1rem
--text-body:    1rem
--text-body-sm: 0.875rem
--text-caption: 0.78rem
--text-label:   0.72rem
```

### Motion
```
--dur-fast:    160ms
--dur-medium:  300ms
--dur-slow:    520ms
--dur-slower:  800ms

--ease-out:     cubic-bezier(0.16, 1, 0.3, 1)
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-precise: cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### Spacing Scale
```
--sp-1:  0.25rem    --sp-2:  0.5rem     --sp-3:  0.75rem
--sp-4:  1rem       --sp-5:  1.25rem    --sp-6:  1.5rem
--sp-8:  2rem       --sp-10: 2.5rem     --sp-12: 3rem
--sp-16: 4rem       --sp-20: 5rem       --sp-24: 6rem
--sp-32: 8rem
```

### Radius
```
--r-sm:   3px    --r-md:   7px
--r-lg:   12px   --r-xl:   18px
--r-2xl:  24px   --r-full: 9999px
```

### Shadows (complete values)
```
--shadow-sm:    0 1px 4px rgba(14,34,50,0.07), 0 1px 2px rgba(14,34,50,0.05)
--shadow-md:    0 4px 16px rgba(14,34,50,0.1), 0 2px 6px rgba(14,34,50,0.07)
--shadow-lg:    0 12px 40px rgba(14,34,50,0.14), 0 4px 12px rgba(14,34,50,0.08)
--shadow-brand: 0 0 24px rgba(74,128,164,0.22), 0 4px 16px rgba(74,128,164,0.12)
--shadow-card:  0 2px 12px rgba(14,34,50,0.09), 0 0 0 1px rgba(74,128,164,0.1)
--shadow-inset: inset 0 1px 3px rgba(14,34,50,0.08)
```

### Gradients
```
--gradient-brand:      linear-gradient(135deg, #4a80a4 0%, #2e8fb0 100%)
--gradient-hero-bg:    linear-gradient(160deg, #f0f6fa 0%, #e4eff6 40%, #dceaf3 100%)
--gradient-section:    linear-gradient(180deg, #f5f8fa 0%, #edf3f7 100%)
--gradient-card:       linear-gradient(160deg, #ffffff 0%, #f7fbfd 100%)
--gradient-text:       linear-gradient(135deg, #3a6880 0%, #2e8fb0 60%, #5cb8d4 100%)
--gradient-dark-panel: linear-gradient(165deg, #0a1a26 0%, #061018 100%)
```

### Tailwind Configuration

Tailwind is used **only for layout utilities** (grid, flex, spacing, responsive). All colors, typography, shadows, and effects use CSS custom properties directly. Update `tailwind.config.js` to:

```js
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--brand-050)', 100: 'var(--brand-100)',
          200: 'var(--brand-200)', 300: 'var(--brand-300)',
          400: 'var(--brand-400)', 500: 'var(--brand-500)',
          600: 'var(--brand-600)', 700: 'var(--brand-700)',
          800: 'var(--brand-800)', 900: 'var(--brand-900)',
        },
        accent: 'var(--accent)',
      }
    }
  },
  plugins: [],
}
```

---

## Data Architecture

### Data ownership per component

Each component owns its data directly (hardcoded). No shared service or parent-to-child data passing needed — this is a static landing page.

| Component | Data | Source |
|---|---|---|
| HeaderComponent | Nav links array, WhatsApp URL | Hardcoded + `environment.whatsappNumber` |
| HeroComponent | Headline text, stats data, WhatsApp URL | Hardcoded + `environment.whatsappNumber` |
| MetricsComponent | 4 metric objects `{value, unit, label}` | Hardcoded |
| ServicesComponent | 6 service objects `{title, description, tag, icon}` | Hardcoded (migrated from current HomeComponent) |
| TechPanelComponent | 4 technology objects `{name, description, icon}` | Hardcoded |
| CtaComponent | Headline, subtext, WhatsApp URL, email | Hardcoded + `environment.whatsappNumber` |
| FooterComponent | Links arrays, address, social URLs | Hardcoded |

### WhatsApp URL construction

All components that link to WhatsApp import `environment` directly:

```typescript
import { environment } from '../../../environments/environment';

whatsappUrl = `https://wa.me/${environment.whatsappNumber}?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20servi%C3%A7os%20de%20topografia.`;
```

Preset messages per entry point:
- **Header CTA:** "Ola, gostaria de solicitar um orcamento para servicos de topografia."
- **Hero button:** Same as header
- **CTA section:** "Ola, gostaria de saber mais sobre os servicos da GeoMAG."
- **Floating button:** "Ola, preciso de ajuda com topografia."

---

## Component Architecture

```
AppComponent (standalone)
  ├── HeaderComponent      (navbar fixed, blur on scroll)
  ├── router-outlet
  │   └── HomeComponent    (compositor — imports and renders sections)
  │       ├── HeroComponent
  │       ├── MetricsComponent
  │       ├── ServicesComponent
  │       ├── TechPanelComponent
  │       └── CtaComponent
  └── FooterComponent
```

All components are Angular standalone with direct imports. No NgModules.

---

## Section Specifications

### 1. HeaderComponent

**Fixed navbar** with transparent-to-blur transition on scroll.

- **Structure:** Logo (left) — Nav links (center) — CTA button (right)
- **Nav links:** Inicio, Servicos, Tecnologia, Contato (anchor scroll with smooth behavior)
- **CTA button:** "Solicitar Orcamento" → WhatsApp link
- **Scroll behavior:** Listen via `@HostListener('window:scroll')`. At `scrollY > 50`, add `scrolled` class:
  - `background: rgba(245,248,250,0.92)`
  - `backdrop-filter: blur(20px) saturate(1.8)`
  - `border-bottom: 1px solid var(--color-border)`
  - `box-shadow: 0 1px 20px rgba(14,34,50,0.06)`
- **Typography:** `font-display`, `text-body-sm`, weight 600, uppercase, letter-spacing 0.1em
- **Link underline:** `::after` pseudo-element animating `right: 100%` → `right: 0` on hover
- **Mobile (< 768px):** Hamburger toggle button, nav slides down vertically
  - Hamburger: `aria-label="Menu de navegacao"`, `aria-expanded` bound to `isMenuOpen`
  - Nav panel: focus trap when open, Escape key closes
- **Logo:** Uses existing `logo.svg` from `assets/images/`

### 2. HeroComponent

**Full-viewport section** with radar visualization and content split.

**Layout:** 2-column grid (`1fr 1fr`), vertically centered, `min-height: 100vh`, `padding-top: 96px`.

**Background layers (bottom to top):**
1. `gradient-hero-bg` base
2. Topographic canvas (`#topoCanvas`) at 55% opacity — see Canvas Implementation below
3. Grid overlay: 64px lines at `rgba(74,128,164,0.07)`, `gridPulse` animation 6s
4. Scan line: horizontal gradient bar, `scanLine` animation 10s linear infinite
5. Dot pattern: `radial-gradient(circle, rgba(74,128,164,0.15) 1px, transparent 1px)` at 32px
6. Two radial glows (top-right 600px, bottom-left 400px)
7. Corner brackets: 4 L-shaped borders (56px, 1.5px solid rgba(74,128,164,0.25))
8. Bottom fade: `::after` linear-gradient to `--color-bg-base`, 120px height

**Canvas Implementation (topoCanvas + vizCanvas):**
- Use vanilla Canvas 2D API (no library)
- Algorithm: Generate 8-12 smooth bezier curves across the canvas using `ctx.bezierCurveTo()`
- Colors: `rgba(74,128,164, 0.08..0.15)` with 1px stroke
- Seed randomness from a fixed seed for consistent appearance across reloads
- Resize on `window.resize` with debounce (200ms)
- Performance: Draw once on init and on resize only (no animation loop)
- `prefers-reduced-motion`: Skip canvas drawing, show static gradient only

**Left column (`.hero__content`):**
- Eyebrow: `font-mono`, `text-caption`, accent color, with blinking dot (2s)
  - Text: "Topografia de precisao"
- Headline: `font-display`, `text-h1`, weight 700
  - Key word wrapped in `<em>` with `gradient-text` + `shimmer` animation (5s)
- Subheadline: `text-body-lg`, weight 300, secondary color, max-width 440px
- Actions: Primary button (gradient-brand) + Outline button
  - Primary: "Solicitar Orcamento" → WhatsApp
  - Outline: "Ver Servicos" → smooth scroll to `#servicos`
- Stats row: 3 stats separated by 1px vertical dividers
  - Values: `font-display` 1.9rem bold; colored suffix via `<span>` in brand-400
  - Labels: `font-mono` 0.67rem, muted, uppercase

**Right column — Radar visualization:**
- Container: 480px square, `float` animation (7s ease-in-out infinite)
- `#vizCanvas`: border-radius 50%, opacity 0.5 — same contour algorithm
- 4 concentric rings (CSS borders + rotation animations):
  - A: inset 0, 1px brand 0.15, `radarSpinR` 40s
  - B: inset 32px, 1px brand 0.2, `radarSpin` 25s
  - C: inset 72px, 1px accent 0.22, `radarSpinR` 18s
  - D: inset 120px, 1px brand 0.28, static
- Crosshair: `::before`/`::after` pseudo-elements, 1px lines
- Radar sweep: conic-gradient cone (accent 0.08, 50deg) + line, `radarSpin` 5s
- Center: 130px circle, white bg (0.92 opacity), logo 56px, `glowPulse` 4s
- Coordinates: `font-mono` 0.58rem, brand-500, below logo
- 3 ping dots: 9px circles, accent color, `pingRipple` 2.8s with staggered delays
- 3 floating data tags: mono text, white bg (0.88 opacity), backdrop-blur 12px

**`prefers-reduced-motion` behavior:**
- Disable: float, radarSpin, radarSpinR, pingRipple, glowPulse, scanLine, gridPulse, shimmer
- Keep: static layout, gradient colors, border rings (without spin)

**Staggered entry animations:**
- Content: slideL 800ms ease-out
- Eyebrow: fadeUp 520ms, delay 0.2s
- Headline: fadeUp 520ms, delay 0.35s
- Sub: fadeUp 520ms, delay 0.5s
- Actions: fadeUp 520ms, delay 0.65s
- Stats: fadeUp 520ms, delay 0.8s
- Visual: slideR 800ms, delay 0.25s

**Mobile (< 768px):** Stack to single column. Hide radar visualization entirely. Stats go to 2x2 grid.

### 3. MetricsComponent

**Horizontal strip** below hero with key numbers.

- **Background:** White (`#ffffff`)
- **Top border:** `::before` pseudo with gradient line
- **Grid:** `repeat(4, 1fr)`, gap `--sp-4`
- **Each metric card:**
  - Background: `--color-bg-base` (#f5f8fa)
  - Border: 1.5px `--color-border`, radius `--r-xl` (18px)
  - Padding: `--sp-8` (2rem) vertical, `--sp-6` (1.5rem) horizontal
  - Value: `font-display` 2.8rem bold, `gradient-text` with background-clip
  - Unit suffix: 1.4rem (the `+` or `%`)
  - Label: `font-mono`, `text-caption`, muted, uppercase, letter-spacing 0.1em
  - Hover: border → brand-400, translateY(-4px), `shadow-brand`
- **Data:** `[{val: "500", unit: "+", label: "Projetos"}, {val: "15", unit: "+", label: "Anos Exp."}, {val: "98", unit: "%", label: "Satisfacao"}, {val: "3", unit: "", label: "Estados"}]`
- **Responsive:** 4 → 2 (tablet) → 1 (mobile) columns

**Note:** The hero stats row and metrics strip intentionally overlap in data. The hero stats provide at-a-glance context within the hero viewport. The metrics strip reinforces with a more prominent visual treatment below. Both use the same numbers.

### 4. ServicesComponent

**3x2 grid of feature cards** using the `feat-card` pattern.

- **Section ID:** `#servicos` (anchor target)
- **Section header:** `s-label` + `s-title` + `s-desc`
  - Label: "Servicos" with 26px leading line, accent color, mono, uppercase
  - Title: "Solucoes Completas em Topografia"
  - Description: "Oferecemos servicos especializados para atender todas as necessidades..."
- **Card pattern:**
  - Background: white, border 1.5px `--color-border`, radius `--r-xl`
  - Shadow: `--shadow-sm`
  - `::before` top bar: 3px height, `gradient-brand`, `scaleX(0)` → `scaleX(1)` on hover
  - Number: top-right corner, `font-mono` caption, `--color-border-strong`
  - Icon: 52px square, radius `--r-lg`, `brand-050` bg, 1.5px `brand-200` border
  - Title: `font-display` `--text-h5`, weight 600
  - Description: `text-body-sm`, secondary, line-height 1.78
  - Tag: pill, `font-mono` label, `brand-050` bg, `brand-500` text, `--r-full`
  - Hover: border `brand-300`, translateY(-5px), `shadow-lg` + `shadow-brand`

**Services (6 cards):**
1. Levantamento Topografico — icon: crosshair/target — tag: "Precisao"
2. Georreferenciamento — icon: globe — tag: "INCRA"
3. Divisao e Unificacao de Areas — icon: maximize/expand (split-merge metaphor) — tag: "Cartorio"
4. Topografia para Obras — icon: hard-hat — tag: "Construcao"
5. Regularizacao Fundiaria — icon: file-text — tag: "Documentacao"
6. Mapeamento 3D — icon: layers — tag: "Aereo"

**Icons:** Inline SVG, 22px, stroke 1.5px, stroke-linecap round, stroke-linejoin round, brand-500 color. Design system line-icon style (not emoji, not Font Awesome).

**Responsive:** 3 → 2 (tablet) → 1 (mobile) columns

### 5. TechPanelComponent

**Dark contrast section** showcasing technology and equipment.

- **Section ID:** `#tecnologia` (anchor target)
- **Background:** `gradient-dark-panel`
- **`::before` grid overlay:** 50px grid lines, `rgba(255,255,255,0.04)`
- **Text:** titles `#e4eff5`, descriptions `#7a9fb5`
- **Section header:** Same `s-label`/`s-title` but light text; label in accent color
- **Grid:** `repeat(4, 1fr)`, gap `--sp-4`
- **Each tech item:**
  - Border: 1px `rgba(74,128,164,0.15)`, radius `--r-xl`
  - Background: `rgba(255,255,255,0.03)`
  - Icon: 44px square, `rgba(74,128,164,0.12)` bg, 1px `rgba(74,128,164,0.25)` border
  - Icon SVG: 20px, stroke `#6aa3c5`
  - Name: `font-display` `--text-h5`, weight 600, `#e4eff5`
  - Description: `text-body-sm`, `#567a90`, line-height 1.7
  - Hover: border `rgba(74,128,164,0.4)`, translateY(-3px), bg `rgba(74,128,164,0.07)`

**Technologies:**
1. GNSS/RTK — icon: satellite — "Posicionamento por satelite com precisao centimetrica"
2. Drones — icon: send/plane — "Aerolevantamento e fotogrametria de alta resolucao"
3. Estacao Total — icon: compass — "Levantamentos planialtimetricos de precisao"
4. LiDAR — icon: zap/scan — "Scanner 3D e nuvem de pontos"

**Responsive:** 4 → 2 (tablet) → 1 (mobile)

### 6. CtaComponent

**Full-width CTA** driving to WhatsApp.

- **Section ID:** `#contato` (anchor target)
- **Background:** `linear-gradient(160deg, #2e5263 0%, #142836 100%)`
- **`::before`:** Grid overlay with `rgba(255,255,255,0.04)` lines at 50px
- **Center glow:** 600px radial gradient, `rgba(92,184,212,0.12)`
- **Headline:** `font-display` `--text-h2`, `#e4eff5`, gradient `<em>` text
- **Subtext:** `text-body-lg`, `rgba(164,196,212,0.9)`, max-width 480px centered
- **Buttons:**
  - Primary: white bg, `#2e5263` text, shadow → WhatsApp
  - Outline: transparent, `rgba(255,255,255,0.3)` border, `#e4eff5` text → `mailto:contato@geomag.com.br`
- **Responsive:** Stack buttons vertically on mobile

### 7. FooterComponent

**Expanded 4-column footer.**

- **Background:** White, top border 1.5px `--color-border`
- **Padding:** `--sp-12` top, `--sp-8` bottom
- **Grid:** `2fr 1fr 1fr 1fr`, gap `--sp-12`
  - Column 1: Logo (32px height) + description (body-sm, muted) + CREA certification note
  - Column 2: "Servicos" — Topografia, Georreferenciamento, Mapeamento 3D, Obras
  - Column 3: "Empresa" — Sobre, Contato, Trabalhe Conosco
  - Column 4: "Contato" — WhatsApp, Instagram (`@geomag.br`), Email
- **Column titles:** `font-mono`, `text-caption`, muted, uppercase, letter-spacing 0.15em
- **Links:** `text-body-sm`, secondary color → accent on hover, transition `--dur-fast`
- **Bottom bar:** flex between, `border-top: 1px --color-border`, padding-top `--sp-6`
  - Left: "© 2026 GeoMAG Engenharia" (`font-mono` caption, muted)
  - Right: "Topografia · Georreferenciamento · Mapeamento" (`font-mono` label, brand opacity)

**Responsive:** 4 → 2 → 1 columns

---

## Scroll Animations (IntersectionObserver)

Implement a reusable `RevealDirective` (`app-reveal`) using `IntersectionObserver`:

```typescript
@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements AfterViewInit {
  @Input() revealDelay = 0; // stagger delay in seconds
  // IntersectionObserver with threshold 0.15
  // On intersect: add 'visible' class, unobserve
}
```

CSS classes:
```css
.reveal {
  opacity: 0; transform: translateY(24px);
  transition: opacity var(--dur-slow) var(--ease-out),
              transform var(--dur-slow) var(--ease-out);
}
.reveal.visible { opacity: 1; transform: translateY(0); }
```

Usage: `<div appReveal [revealDelay]="0.2">...</div>`

Respect `prefers-reduced-motion`: skip animation, show elements immediately.

---

## Accessibility

### Landmarks
- `<header>` for HeaderComponent
- `<main>` wrapping the HomeComponent sections
- `<section>` for each content section with `aria-labelledby` pointing to section title
- `<footer>` for FooterComponent

### Keyboard Navigation
- Mobile hamburger: `aria-expanded`, `aria-label="Menu de navegacao"`
- Focus trap within mobile nav when open
- Escape key closes mobile nav
- All interactive elements (buttons, links) receive visible focus ring: `outline: 2px solid var(--brand-400); outline-offset: 2px`

### Reduced Motion
- `@media (prefers-reduced-motion: reduce)`: disable all CSS animations and transitions
- Canvas: show static gradient background only

### Images & Icons
- Logo: `alt="GeoMAG Engenharia - Logo"`
- Decorative SVG icons in service cards: `aria-hidden="true"`
- WhatsApp floating button: `aria-label="Fale conosco pelo WhatsApp"`

### Color Contrast
- Primary text (#0e2232) on base (#f5f8fa): ratio ~14:1 (AAA)
- Secondary text (#3a5568) on white: ratio ~7.5:1 (AAA)
- Inverse text (#e4eff5) on dark panel (#0a1a26): ratio ~12:1 (AAA)
- All interactive elements meet WCAG 2.1 AA minimum (4.5:1)

---

## Responsive Breakpoints

- **Desktop:** > 1024px — full layout, radar visible, 3-4 column grids
- **Tablet:** 768px–1024px — 2-column grids, radar scaled to 320px
- **Mobile:** < 768px — single column, radar hidden, hamburger nav, stacked buttons

---

## WhatsApp Integration

Number from `environment.whatsappNumber`: `5519981837219`

Entry points:
- **Header CTA** → `https://wa.me/5519981837219?text=Ola%2C%20gostaria%20de%20solicitar%20um%20orcamento%20para%20servicos%20de%20topografia.`
- **Hero primary button** → same URL
- **CTA section primary** → `https://wa.me/5519981837219?text=Ola%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20servicos%20da%20GeoMAG.`
- **Floating button** (preserved) → `https://wa.me/5519981837219?text=Ola%2C%20preciso%20de%20ajuda%20com%20topografia.`
  - Style: green (#25d366), pulse animation, fixed bottom-right (24px)

---

## Files to Create/Modify

### New Files
- `src/app/components/hero/hero.component.ts|html|scss`
- `src/app/components/metrics/metrics.component.ts|html|scss`
- `src/app/components/tech-panel/tech-panel.component.ts|html|scss`
- `src/app/components/cta/cta.component.ts|html|scss`
- `src/app/directives/reveal.directive.ts`

### Modified Files
- `src/styles.scss` — Replace entirely with design system tokens, reset, keyframes, and global utility classes
- `src/index.html` — Replace Font Awesome with Google Fonts, remove inline `<style>`, update meta
- `src/app/app.component.ts` — Ensure standalone imports for Header + Footer
- `src/app/components/header/header.component.ts|html|scss` — Full redesign
- `src/app/components/home/home.component.ts|html|scss` — Become compositor importing section components
- `src/app/components/services/services.component.ts|html|scss` — Redesign with feat-card pattern
- `src/app/components/footer/footer.component.ts|html|scss` — Expand to 4-column
- `tailwind.config.js` — Map new design system tokens

### Removed
- `src/app/components/contact/` — Replaced by CtaComponent
- `src/app/components/about/` — Not in scope
- `src/app/components/components.module.ts` — Pure standalone, no NgModules

---

## Out of Scope

- Dark/light theme toggle (light only for now)
- Backend form processing
- Sobre/Equipe page
- Projetos/Cases section
- Testimonials section
- i18n / multi-language
- SEO schema.org updates (keep existing)
