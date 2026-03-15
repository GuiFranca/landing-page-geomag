# GeoMAG Landing Page Redesign — Design Spec

## Overview

Redesign the GeoMAG landing page applying the v2.0 design system (light theme variant). Replace the current generic layout with the engineering-precise, steel-blue visual language defined in the design system reference files.

**Theme:** Light
**Architecture:** Componentized (Abordagem B — one Angular standalone component per section)
**Contact model:** WhatsApp redirect (no form)

---

## Design Tokens (Global — `styles.scss`)

All CSS custom properties from the light design system become the single source of truth. Tailwind config maps to these tokens.

### Colors
```
--brand-400: #4a80a4  (primary)
--brand-050 through --brand-900 (full scale)
--accent: #2e8fb0  --accent-light: #5cb8d4  --accent-dark: #1e6a85
--color-bg-base: #f5f8fa   --color-bg-elevated: #ffffff
--color-bg-surface: #edf3f7  --color-bg-card: #ffffff
--color-bg-dark: #0a1a26
--color-text-primary: #0e2232  --color-text-secondary: #3a5568
--color-text-muted: #6b8899    --color-text-light: #94aab8
--color-border: rgba(74,128,164,0.14)
--color-border-mid: rgba(74,128,164,0.25)
--color-border-strong: rgba(74,128,164,0.42)
```

### Typography
```
--font-display: 'Rajdhani', sans-serif   (headings, buttons)
--font-body: 'DM Sans', sans-serif       (body text)
--font-mono: 'Space Mono', monospace     (labels, captions, badges)
```
Loaded via Google Fonts in `index.html`.

Type scale uses `clamp()` for responsive sizing:
- H1: clamp(2.6rem, 5.5vw, 5.2rem)
- H2: clamp(1.9rem, 3.8vw, 3.4rem)
- H3: clamp(1.4rem, 2.4vw, 2.1rem)

### Motion
```
--dur-fast: 160ms    --dur-medium: 300ms
--dur-slow: 520ms    --dur-slower: 800ms
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Spacing & Radius
```
--sp-1 through --sp-32 (0.25rem to 8rem)
--r-sm: 3px  --r-md: 7px  --r-lg: 12px  --r-xl: 18px  --r-full: 9999px
```

### Shadows (light variant)
```
--shadow-sm, --shadow-md, --shadow-lg, --shadow-brand, --shadow-card, --shadow-inset
```

### Gradients
```
--gradient-brand: linear-gradient(135deg, #4a80a4, #2e8fb0)
--gradient-hero-bg: linear-gradient(160deg, #f0f6fa, #e4eff6, #dceaf3)
--gradient-text: linear-gradient(135deg, #3a6880, #2e8fb0, #5cb8d4)
--gradient-dark-panel: linear-gradient(165deg, #0a1a26, #061018)
```

---

## Component Architecture

```
AppComponent
  ├── HeaderComponent      (navbar fixed, blur on scroll)
  ├── router-outlet
  │   └── HomeComponent    (compositor — no visual logic)
  │       ├── HeroComponent
  │       ├── MetricsComponent
  │       ├── ServicesComponent
  │       ├── TechPanelComponent
  │       └── CtaComponent
  └── FooterComponent
```

All components are Angular standalone. HomeComponent imports and renders the section components in order.

---

## Section Specifications

### 1. HeaderComponent

**Fixed navbar** with transparent-to-blur transition on scroll.

- **Structure:** Logo (left) — Nav links (center) — CTA button (right)
- **Nav links:** Início, Serviços, Tecnologia, Contato (anchor scroll)
- **CTA button:** "Solicitar Orçamento" → WhatsApp link
- **Scroll behavior:** Transparent at top; on scroll adds `scrolled` class:
  - `background: rgba(245,248,250,0.92)`
  - `backdrop-filter: blur(20px) saturate(1.8)`
  - `border-bottom: 1px solid var(--color-border)`
- **Typography:** `font-display`, `text-body-sm`, weight 600, uppercase, letter-spacing 0.1em
- **Link underline:** Pseudo-element `::after` that animates `right` from 100% to 0 on hover
- **Mobile:** Hamburger toggle, nav becomes vertical slide-down
- **Logo:** Uses existing `logo.svg` from assets

### 2. HeroComponent

**Full-viewport section** with radar visualization and content split.

**Layout:** 2-column grid (`1fr 1fr`), vertically centered, `min-height: 100vh`.

**Background layers (bottom to top):**
1. `gradient-hero-bg` base
2. Topographic canvas (`#topoCanvas`) — JS-drawn contour lines at 55% opacity
3. Grid overlay: 64px grid lines at `rgba(74,128,164,0.07)`, pulsing animation
4. Scan line: horizontal gradient bar sweeping top-to-bottom every 10s
5. Dot pattern: radial gradient dots at 32px spacing
6. Two radial glows (top-right 600px, bottom-left 400px)
7. Corner brackets: 4 L-shaped borders at page corners (56px, 1.5px solid)
8. Bottom fade: `::after` gradient to `--color-bg-base`

**Left column (`.hero__content`):**
- Eyebrow: `font-mono`, caption size, accent color, with blinking dot (2s cycle)
  - Text: "Topografia de precisao" (or similar)
- Headline: `font-display`, H1 size, weight 700, dark text
  - Gradient text on key word using `gradient-text` + `shimmer` animation (5s)
- Subheadline: `text-body-lg`, weight 300, secondary color, max-width 440px
- Actions: Primary button (gradient-brand) + Outline button
  - Primary → WhatsApp
  - Outline → scroll to services
- Stats row: 3 stats with divider lines
  - "500+" projetos, "15+" anos, "98%" satisfacao
  - Values: `font-display` 1.9rem bold, accent-colored `+`/`%`
  - Labels: `font-mono` 0.67rem, muted color, uppercase

**Right column (`.hero__visual`) — Radar visualization:**
- Container: 480px square, `float` animation (7s ease-in-out)
- Topographic canvas (`#vizCanvas`): border-radius 50%, opacity 0.5
  - JS draws randomized contour lines using brand colors
- 4 concentric rings with different speeds/directions:
  - Ring A (inset 0): 40s reverse spin, brand 0.15 opacity
  - Ring B (inset 32px): 25s forward spin, brand 0.2
  - Ring C (inset 72px): 18s reverse spin, accent 0.22
  - Ring D (inset 120px): static, brand 0.28
- Crosshair: horizontal + vertical 1px lines at center
- Radar sweep: conic-gradient + line rotating at 5s
- Center: 130px circle with white bg, logo inside (56px), glow pulse animation
- Coordinates text below logo: `font-mono` 0.58rem
- 3 ping dots at scattered positions with ripple animations (2.8s cycle)
- 3 floating data tags with mono text (coordinates, elevation, precision data)

**Animations (all staggered `fadeUp` / `slideL` / `slideR`):**
- Content block: slideL 800ms
- Eyebrow: fadeUp 520ms, delay 0.2s
- Headline: fadeUp 520ms, delay 0.35s
- Sub: fadeUp 520ms, delay 0.5s
- Actions: fadeUp 520ms, delay 0.65s
- Stats: fadeUp 520ms, delay 0.8s
- Visual: slideR 800ms, delay 0.25s

### 3. MetricsComponent

**Horizontal strip** below hero with key numbers.

- **Background:** White (`#ffffff`)
- **Top border:** Gradient line (`transparent → border-mid → transparent`)
- **Grid:** 4 columns, equal width
- **Each metric card:**
  - Background: `--color-bg-base`, border 1.5px `--color-border`, radius `--r-xl`
  - Padding: `--sp-8` vertical, `--sp-6` horizontal
  - Value: `font-display` 2.8rem bold, `gradient-text` clipped
  - Unit suffix: 1.4rem (e.g., the `+` in `500+`)
  - Label: `font-mono`, caption size, muted, uppercase, letter-spacing 0.1em
  - Hover: border → brand-400, translateY(-4px), shadow-brand
- **Data:** 500+ Projetos | 15+ Anos Experiencia | 98% Satisfacao | 3 Estados
- **Responsive:** 4 → 2 → 1 columns

### 4. ServicesComponent

**3x2 grid of feature cards** with the design system's `feat-card` pattern.

- **Section background:** `--color-bg-base`
- **Section header:** `s-label` + `s-title` + `s-desc` pattern
  - Label: accent color mono text with leading line
  - Title: `font-display` H2 bold
  - Description: `text-body-lg`, secondary color, max-width 580px
- **Card pattern (`.feat-card`):**
  - Background: `--color-bg-elevated` (white)
  - Border: 1.5px `--color-border`, radius `--r-xl`
  - Shadow: `--shadow-sm`
  - Top gradient bar: `gradient-brand`, scaleX(0) → scaleX(1) on hover
  - Number badge: top-right, `font-mono` caption, border-strong color
  - Icon: 52px square, radius `--r-lg`, `brand-050` bg, brand-500 stroke SVGs
  - Title: `font-display` H5, weight 600
  - Description: `text-body-sm`, secondary, line-height 1.78
  - Tag: pill badge with mono text, `brand-050` bg, brand-500 text
  - Hover: border → brand-300, translateY(-5px), shadow-lg + shadow-brand
  - Hover icon: bg → brand-100, glow shadow

**Services (6 cards):**
1. Levantamento Topografico — tag: "Precisao"
2. Georreferenciamento — tag: "INCRA"
3. Divisao e Unificacao de Areas — tag: "Cartorio"
4. Topografia para Obras — tag: "Construcao"
5. Regularizacao Fundiaria — tag: "Documentacao"
6. Mapeamento 3D — tag: "Aereo"

**Icons:** SVG line icons (22px, stroke 1.5px, brand-500). Using design system icon style: map-pin, globe, scissors, hard-hat, home, layers.

**Responsive:** 3 → 2 → 1 columns

### 5. TechPanelComponent

**Dark contrast section** showcasing technology/equipment.

- **Background:** `gradient-dark-panel` (#0a1a26 → #061018)
- **Grid overlay:** `::before` with 50px grid lines at 4% white opacity
- **Text colors:** titles in #e4eff5, descriptions in #7a9fb5
- **Section header:** Same `s-label`/`s-title` pattern but with light colors
- **Grid:** 4 columns of tech items
- **Each tech item:**
  - Border: 1px rgba(74,128,164,0.15), radius `--r-xl`
  - Background: rgba(255,255,255,0.03)
  - Icon: 44px square, rgba(74,128,164,0.12) bg, stroke #6aa3c5
  - Name: `font-display` H5, #e4eff5
  - Description: `text-body-sm`, #567a90
  - Hover: border stronger, translateY(-3px), bg slightly more opaque

**Technologies:**
1. GNSS/RTK — Posicionamento por satelite
2. Drones — Aerolevantamento e fotogrametria
3. Estacao Total — Levantamentos de precisao
4. LiDAR — Scanner 3D e nuvem de pontos

**Responsive:** 4 → 2 → 1 columns

### 6. CtaComponent

**Full-width CTA** driving to WhatsApp.

- **Background:** `linear-gradient(160deg, brand-600, brand-800)` — deep steel blue
- **Grid overlay:** same pattern as dark panel but white lines
- **Center glow:** 600px radial gradient, accent at 12%
- **Headline:** `font-display` H2, #e4eff5, with gradient-text `<em>` (lighter teal gradient)
- **Subtext:** `text-body-lg`, `rgba(164,196,212,0.9)`
- **Buttons:**
  - Primary: white bg, brand-600 text, shadow → WhatsApp link
  - Outline: transparent, white border, white text → email (`mailto:`)
- **Responsive:** Stack buttons vertically on mobile

### 7. FooterComponent

**Expanded 4-column footer** replacing the current minimal footer.

- **Background:** White (#ffffff), top border 1.5px
- **Grid:** `2fr 1fr 1fr 1fr`
  - Column 1: Logo + description + certifications (CREA, etc.)
  - Column 2: "Servicos" links
  - Column 3: "Empresa" links
  - Column 4: "Contato" — WhatsApp, Instagram, Email
- **Column titles:** `font-mono`, caption, muted, uppercase, letter-spacing 0.15em
- **Links:** `text-body-sm`, secondary color, hover → accent color
- **Bottom bar:** flex between copyright (left) and tagline (right)
  - Copyright: `font-mono` caption, muted
  - Tagline: `font-mono` label, brand-050 opacity

**Responsive:** 4 → 2 → 1 columns

---

## Scroll Animations (IntersectionObserver)

Apply `.reveal` class pattern from design system:
- Initial: `opacity: 0; transform: translateY(24px)`
- Visible: `opacity: 1; transform: translateY(0)`
- Duration: `--dur-slow` with `--ease-out`
- Staggered delays: `reveal--d1` through `reveal--d5` (0.1s increments)

Implement via Angular directive or in HomeComponent using `IntersectionObserver`.

---

## Responsive Breakpoints

Following existing project patterns + design system:
- Desktop: > 1024px (full layout)
- Tablet: 768px–1024px (2-column grids, smaller hero visual)
- Mobile: < 768px (single column, hero stacked, hamburger nav)

Hero radar visualization: hide or scale to 280px on mobile.

---

## WhatsApp Integration

Existing WhatsApp number from environment: `5519981837219`

- Header CTA button → WhatsApp with preset message
- Hero primary button → WhatsApp
- CTA section primary button → WhatsApp
- Floating WhatsApp button (bottom-right) preserved with design system styling:
  - Green (#25d366), pulse animation, scale hover
  - Position: fixed, bottom 24px, right 24px

---

## Files to Create/Modify

### New Files
- `src/app/components/hero/hero.component.ts|html|scss`
- `src/app/components/metrics/metrics.component.ts|html|scss`
- `src/app/components/tech-panel/tech-panel.component.ts|html|scss`
- `src/app/components/cta/cta.component.ts|html|scss`

### Modified Files
- `src/styles.scss` — Replace with design system tokens + global reset
- `src/index.html` — Add Google Fonts (Rajdhani, DM Sans, Space Mono)
- `src/app/components/header/header.component.ts|html|scss` — Redesign with navbar pattern
- `src/app/components/home/home.component.ts|html|scss` — Become compositor
- `src/app/components/services/services.component.ts|html|scss` — Redesign with feat-card pattern
- `src/app/components/footer/footer.component.ts|html|scss` — Expand to 4-column
- `tailwind.config.js` — Map new CSS variables

### Removed
- `src/app/components/contact/` — Replaced by CtaComponent
- `src/app/components/about/` — Not in scope (can be added later)

---

## Out of Scope

- Dark/light theme toggle (light only for now)
- Backend form processing
- Sobre/Equipe page
- Projetos/Cases section
- Testimonials section
- i18n / multi-language
