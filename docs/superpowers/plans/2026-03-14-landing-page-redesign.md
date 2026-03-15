# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the GeoMAG Angular landing page applying the v2.0 design system (light theme) with componentized architecture, radar hero visualization, and WhatsApp-driven contact model.

**Architecture:** Angular 19 standalone components. Each page section becomes its own component. HomeComponent acts as a compositor. Design tokens defined as CSS custom properties in `styles.scss`. Scroll-reveal via a custom Angular directive.

**Tech Stack:** Angular 19, TypeScript, SCSS, Tailwind CSS (layout only), Canvas 2D API (hero visualization)

**Spec:** `docs/superpowers/specs/2026-03-14-landing-page-redesign-design.md`
**Design System Reference:** `design-system/geomag-design-system-light.html` (CSS/HTML patterns — copied into worktree)

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `src/app/components/hero/hero.component.ts` | Hero section logic: canvas drawing, radar data |
| `src/app/components/hero/hero.component.html` | Hero template: content + radar visualization |
| `src/app/components/hero/hero.component.scss` | Hero styles: grid, radar rings, animations |
| `src/app/components/metrics/metrics.component.ts` | Metrics strip: data array of 4 metrics |
| `src/app/components/metrics/metrics.component.html` | Metrics template: 4-column grid of cards |
| `src/app/components/metrics/metrics.component.scss` | Metrics styles: card pattern, hover effects |
| `src/app/components/tech-panel/tech-panel.component.ts` | Tech panel: 4 technologies data |
| `src/app/components/tech-panel/tech-panel.component.html` | Dark panel template: grid of tech items |
| `src/app/components/tech-panel/tech-panel.component.scss` | Dark panel styles: dark bg, light text |
| `src/app/components/cta/cta.component.ts` | CTA section: WhatsApp/email URLs |
| `src/app/components/cta/cta.component.html` | CTA template: headline + buttons |
| `src/app/components/cta/cta.component.scss` | CTA styles: dark gradient bg |
| `src/app/directives/reveal.directive.ts` | IntersectionObserver-based scroll reveal |

### Modified Files
| File | Changes |
|------|---------|
| `src/index.html` | Replace Font Awesome CDN with Google Fonts. Remove inline `<style>` block. Keep SEO meta and schema.org. |
| `src/styles.scss` | Full replacement: design system tokens, reset, keyframes, scrollbar, global utilities |
| `tailwind.config.js` | Replace `theme-*` colors with `brand-*` mapping |
| `src/app/app.component.ts` | Remove inline `min-height` style, add ARIA landmark semantics |
| `src/app/components/header/header.component.ts` | Add scroll listener, menu toggle logic |
| `src/app/components/header/header.component.html` | Full rewrite: navbar pattern with logo, nav links, CTA |
| `src/app/components/header/header.component.scss` | Full rewrite: fixed navbar, blur on scroll, mobile hamburger |
| `src/app/components/home/home.component.ts` | Become compositor: import section components, remove data |
| `src/app/components/home/home.component.html` | Replace with section component tags + WhatsApp float |
| `src/app/components/home/home.component.scss` | Minimal: just WhatsApp float button styles |
| `src/app/components/services/services.component.ts` | New data model with tags, inline SVG icons |
| `src/app/components/services/services.component.html` | Full rewrite: s-label header + feat-card grid |
| `src/app/components/services/services.component.scss` | Full rewrite: feat-card pattern from design system |
| `src/app/components/footer/footer.component.ts` | Add link arrays, social URLs |
| `src/app/components/footer/footer.component.html` | Full rewrite: 4-column layout |
| `src/app/components/footer/footer.component.scss` | Full rewrite: expanded footer styles |

### Deleted Files
| File | Reason |
|------|--------|
| `src/app/components/contact/*` | Replaced by CtaComponent |
| `src/app/components/about/*` | Out of scope |
| `src/app/components/components.module.ts` | Pure standalone, no NgModules |
| `src/app/app.module.ts` | Not used (app bootstraps via `main.ts` with `appConfig`) |

---

## Chunk 1: Foundation — Design Tokens, Fonts & Global Styles

### Task 1: Update `index.html`

**Files:**
- Modify: `src/index.html`

- [ ] **Step 1: Replace Font Awesome with Google Fonts and remove inline styles**

Replace line 21 (Font Awesome CDN) with Google Fonts preconnect + link. Remove the inline `<style>` block (lines 22-48). Keep everything else (meta tags, schema.org, favicon).

```html
<!-- Replace line 21 with these 3 lines: -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap" rel="stylesheet">
<!-- Delete lines 22-48 (the <style> block) entirely -->
```

- [ ] **Step 2: Verify the app still loads (will look broken, that's expected)**

Run: `ng serve` and open `http://localhost:4200`
Expected: Page loads but looks unstyled (missing old CSS variables)

- [ ] **Step 3: Commit**

```bash
git add src/index.html
git commit -m "chore: replace Font Awesome with Google Fonts, remove inline styles"
```

### Task 2: Replace `styles.scss` with design system tokens

**Files:**
- Modify: `src/styles.scss`

- [ ] **Step 1: Replace entire `styles.scss` with design system foundation**

Write the complete new `styles.scss` containing:
1. Tailwind directives (`@tailwind base/components/utilities`)
2. `:root` block with ALL design tokens from the spec (brand colors 050-900, accent, semantic colors, typography vars, motion, spacing, radius, shadows, gradients)
3. CSS reset (`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`)
4. Body defaults (font-family, color, background from tokens)
5. Scrollbar styling (`::-webkit-scrollbar`)
6. All `@keyframes` from the design system light theme: `fadeUp`, `slideL`, `slideR`, `scanLine`, `gridPulse`, `radarSpin`, `radarSpinR`, `pingRipple`, `float`, `glowPulse`, `blink`, `shimmer`, `borderPulse`, `dashMove`
7. `.container` utility class (max-width 1260px, auto margins, sp-8 padding)
8. `.section` utility class (relative, sp-32 padding, overflow hidden)
9. Section header classes: `.s-label`, `.s-title`, `.s-desc`, `.gradient-text`
10. Background helper classes: `.bg-dots`, `.bg-grid`, `.bg-line-t`, `.bg-line-b`
11. Button system: `.btn`, `.btn--primary`, `.btn--outline`, `.btn--ghost`, `.btn--lg`, `.btn--sm`
12. `.reveal` class + delay variants (`.reveal--d1` through `.reveal--d5`)
13. `@media (prefers-reduced-motion: reduce)` — disable all animations
14. `img { display: block; max-width: 100%; }` and `a { text-decoration: none; color: inherit; }`
15. Focus ring utility: `:focus-visible { outline: 2px solid var(--brand-400); outline-offset: 2px; }`

Reference: spec section "Design Tokens" for all values. Reference: `design-system/geomag-design-system-light.html` lines 10-180 for exact keyframe and class definitions.

- [ ] **Step 2: Verify the build compiles**

Run: `ng build --configuration development 2>&1 | tail -5`
Expected: Build succeeds (warnings are OK, errors are not)

- [ ] **Step 3: Commit**

```bash
git add src/styles.scss
git commit -m "feat: replace global styles with design system v2.0 tokens"
```

### Task 3: Update Tailwind config

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Replace Tailwind color config**

```javascript
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

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.js
git commit -m "chore: update Tailwind config with design system brand colors"
```

### Task 4: Create RevealDirective

**Files:**
- Create: `src/app/directives/reveal.directive.ts`

- [ ] **Step 1: Create the reveal directive**

```typescript
import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      this.el.nativeElement.classList.add('visible');
      return;
    }

    this.el.nativeElement.classList.add('reveal');
    if (this.revealDelay > 0) {
      this.el.nativeElement.style.transitionDelay = `${this.revealDelay}s`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
```

- [ ] **Step 2: Verify build compiles**

Run: `ng build --configuration development 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/app/directives/reveal.directive.ts
git commit -m "feat: add RevealDirective for scroll-triggered animations"
```

### Task 5: Fix AppComponent

**Files:**
- Modify: `src/app/app.component.ts`

- [ ] **Step 1: Remove inline min-height style and ensure proper structure**

```typescript
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'GeoMAG';
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/app.component.ts
git commit -m "chore: remove inline styles from AppComponent"
```

### Task 6: Clean up unused files

> **Note:** After this task, the remaining tasks are renumbered: original Task 6→7, 7→8, 8→9, 9→10, 10→11, 11→12, 12→13, 13→14, 14→15.

**Files:**
- Delete: `src/app/components/contact/`
- Delete: `src/app/components/about/`
- Delete: `src/app/components/components.module.ts`
- Delete: `src/app/app.module.ts`

- [ ] **Step 1: Remove unused component directories and module files**

```bash
rm -rf src/app/components/contact/
rm -rf src/app/components/about/
rm -f src/app/components/components.module.ts
rm -f src/app/app.module.ts
```

- [ ] **Step 2: Verify build still compiles** (these files weren't imported in the standalone setup)

Run: `ng build --configuration development 2>&1 | tail -5`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove unused contact, about components and NgModule files"
```

---

## Chunk 2: HeaderComponent & FooterComponent

### Task 6: Redesign HeaderComponent

**Files:**
- Modify: `src/app/components/header/header.component.ts`
- Modify: `src/app/components/header/header.component.html`
- Modify: `src/app/components/header/header.component.scss`

- [ ] **Step 1: Rewrite `header.component.ts`**

Add `isScrolled` and `isMenuOpen` properties. Add `@HostListener('window:scroll')` to toggle `isScrolled` at `scrollY > 50`. Add `toggleMenu()` and `closeMenu()` methods. Add `@HostListener('document:keydown.escape')` to close menu. Import environment for WhatsApp URL.

```typescript
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent {
  isScrolled = false;
  isMenuOpen = false;
  whatsappUrl = `https://wa.me/${environment.whatsappNumber}?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20servi%C3%A7os%20de%20topografia.`;

  navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicos', href: '#servicos' },
    { label: 'Tecnologia', href: '#tecnologia' },
    { label: 'Contato', href: '#contato' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
```

- [ ] **Step 2: Rewrite `header.component.html`**

Structure: `<header>` with `.navbar` class, `.navbar__inner` containing logo, nav, actions. Logo is an `<a>` with `<img>` for `logo.svg`. Nav is `<ul class="navbar__nav">` with `*ngFor` over `navLinks`. Actions has the CTA button linking to WhatsApp. Mobile hamburger button with `aria-label` and `aria-expanded`.

Reference: spec section "1. HeaderComponent" for exact structure.

- [ ] **Step 3: Rewrite `header.component.scss`**

Styles for: `.navbar` (fixed, transparent → scrolled), `.navbar__inner` (flex, space-between), `.navbar__logo img` (height 32px), `.navbar__nav` (flex, gap sp-8, uppercase), `.navbar__nav a::after` (underline animation), `.btn` CTA button, mobile hamburger toggle, responsive breakpoints.

Reference: `design-system/geomag-design-system-light.html` lines 188-284 for exact CSS.

- [ ] **Step 4: Verify the header renders**

Open browser, check the header is fixed, transparent, and shows logo + nav links.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/header/
git commit -m "feat: redesign HeaderComponent with design system navbar"
```

### Task 7: Redesign FooterComponent

**Files:**
- Modify: `src/app/components/footer/footer.component.ts`
- Modify: `src/app/components/footer/footer.component.html`
- Modify: `src/app/components/footer/footer.component.scss`

- [ ] **Step 1: Rewrite `footer.component.ts`**

Add data arrays for footer columns: `serviceLinks`, `companyLinks`, `contactLinks`. Add `currentYear` computed from `new Date().getFullYear()`.

- [ ] **Step 2: Rewrite `footer.component.html`**

Structure: `<footer class="footer">` → `.container` → `.footer__grid` (4 columns) → `.footer__bottom`. Column 1: logo + description + CREA. Columns 2-4: links with titles.

Reference: spec section "7. FooterComponent".

- [ ] **Step 3: Rewrite `footer.component.scss`**

Styles for: `.footer` (white bg, border-top), `.footer__grid` (`2fr 1fr 1fr 1fr`), `.footer__col-ttl` (mono uppercase), `.footer__links` (list), `.footer__bottom` (flex between). Responsive: 4 → 2 → 1.

Reference: `design-system/geomag-design-system-light.html` lines 892-920 for exact CSS.

- [ ] **Step 4: Verify footer renders**

Check 4-column layout, links, copyright.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/footer/
git commit -m "feat: redesign FooterComponent with expanded 4-column layout"
```

---

## Chunk 3: HeroComponent

### Task 8: Create HeroComponent

**Files:**
- Create: `src/app/components/hero/hero.component.ts`
- Create: `src/app/components/hero/hero.component.html`
- Create: `src/app/components/hero/hero.component.scss`

- [ ] **Step 1: Create `hero.component.ts`**

Properties: `whatsappUrl` (from environment), `stats` array of `{value, suffix, label}`. Implement `AfterViewInit` and `OnDestroy`. In `ngAfterViewInit()`, draw contour lines on both canvases (`topoCanvas` and `vizCanvas`) using Canvas 2D API. Listen for resize with debounce to redraw. Check `prefers-reduced-motion` and skip canvas if true.

Canvas algorithm:
- Get canvas element via `@ViewChild` or `document.getElementById`
- Set canvas dimensions to match parent
- Draw 8-12 bezier curves: for each, pick random start Y, generate 4-5 control points across the width, draw with `ctx.bezierCurveTo()`, stroke with `rgba(74,128,164, 0.08..0.15)` and 1px width
- For `vizCanvas`: same but within circular clip path

```typescript
import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('topoCanvas', { static: false }) topoCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('vizCanvas', { static: false }) vizCanvasRef!: ElementRef<HTMLCanvasElement>;

  whatsappUrl = `https://wa.me/${environment.whatsappNumber}?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20servi%C3%A7os%20de%20topografia.`;

  stats = [
    { value: '500', suffix: '+', label: 'Projetos\nEntregues' },
    { value: '15', suffix: '+', label: 'Anos de\nExperiencia' },
    { value: '98', suffix: '%', label: 'Clientes\nSatisfeitos' },
  ];

  private resizeHandler?: () => void;
  private resizeTimeout?: ReturnType<typeof setTimeout>;

  // Seeded PRNG for consistent contour lines across reloads
  private seed = 42;
  private seededRandom(): number {
    this.seed = (this.seed * 16807 + 0) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }
  private resetSeed(): void { this.seed = 42; }

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.drawCanvases();
    this.resizeHandler = () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.drawCanvases(), 200);
    };
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    clearTimeout(this.resizeTimeout);
  }

  private drawCanvases(): void {
    this.drawTopoLines(this.topoCanvasRef?.nativeElement);
    this.drawTopoLines(this.vizCanvasRef?.nativeElement, true);
  }

  private drawTopoLines(canvas: HTMLCanvasElement | undefined, circular = false): void {
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.resetSeed(); // Reset seed for consistent output

    if (circular) {
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2, 0, Math.PI * 2);
      ctx.clip();
    }

    const lineCount = 10;
    for (let i = 0; i < lineCount; i++) {
      const opacity = 0.08 + this.seededRandom() * 0.07;
      ctx.strokeStyle = `rgba(74, 128, 164, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const startY = (canvas.height / (lineCount + 1)) * (i + 1) + (this.seededRandom() - 0.5) * 40;
      ctx.moveTo(0, startY);
      const segments = 4 + Math.floor(this.seededRandom() * 2);
      const segW = canvas.width / segments;
      for (let s = 0; s < segments; s++) {
        const cp1x = segW * s + segW * 0.3;
        const cp1y = startY + (this.seededRandom() - 0.5) * 60;
        const cp2x = segW * s + segW * 0.7;
        const cp2y = startY + (this.seededRandom() - 0.5) * 60;
        const endX = segW * (s + 1);
        const endY = startY + (this.seededRandom() - 0.5) * 30;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
      }
      ctx.stroke();
    }
  }
}
```

- [ ] **Step 2: Create `hero.component.html`**

Full hero structure with all background layers and radar visualization.

Structure:
```
section.hero
  .hero__bg
    canvas#topoCanvas
    .hero__grid
    .hero__scanline
    .hero__dots
    .hero__glow1
    .hero__glow2
    .hcorner-tl, .hcorner-tr, .hcorner-bl, .hcorner-br
  .hero__inner.container
    .hero__content (left column)
      .hero__eyebrow (dot + "Topografia de Precisao")
      h1.hero__headline ("Solucoes em <em>Topografia</em>")
      p.hero__sub
      .hero__actions (2 buttons)
      .hero__stats (3 stat blocks)
    .hero__visual (right column)
      .viz-wrap
        canvas#vizCanvas
        .vring-a, .vring-b, .vring-c, .vring-d
        .vcross
        .vsweep-wrap > .vsweep-cone + .vsweep
        .vcenter > .vcenter-ring > img[logo] + .vcoords
        .vping-1, .vping-2, .vping-3 (each with dot + 2 ring ripples)
        .vtag-1, .vtag-2, .vtag-3
```

Reference: spec section "2. HeroComponent" for all content text and data tag text.
Reference: `design-system/geomag-design-system-light.html` lines 288-507 for exact HTML structure.

**Accessibility:** Add `aria-labelledby` on `<section>` pointing to headline ID. Logo img: `alt="GeoMAG Engenharia"`. Decorative SVGs in radar: `aria-hidden="true"`. Canvas elements: `role="img" aria-label="Visualizacao topografica decorativa"`.

- [ ] **Step 3: Create `hero.component.scss`**

All hero styles. Reference: `design-system/geomag-design-system-light.html` lines 288-507 for exact CSS. Key patterns:
- `.hero` (min-height 100vh, flex, gradient bg, padding-top 96px)
- `.hero::after` (bottom fade)
- Background layer classes
- `.hero__inner` (grid 1fr 1fr, gap sp-16, max-width 1260px)
- `.hero__content` animation classes
- `.hero__eyebrow`, `.hero__headline`, `.hero__sub`, `.hero__actions`, `.hero__stats`
- `.viz-wrap` (480px square, float animation)
- Ring classes, sweep, center, ping, tag classes
- Responsive: at `< 768px` hide `.hero__visual`, stack content, adjust type sizes

- [ ] **Step 4: Verify hero renders in browser**

Check: gradient bg visible, content left, radar right (if desktop). Canvas draws contour lines. Animations play.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/hero/
git commit -m "feat: create HeroComponent with radar visualization"
```

---

## Chunk 4: MetricsComponent, ServicesComponent, TechPanelComponent, CtaComponent

### Task 9: Create MetricsComponent

**Files:**
- Create: `src/app/components/metrics/metrics.component.ts`
- Create: `src/app/components/metrics/metrics.component.html`
- Create: `src/app/components/metrics/metrics.component.scss`

- [ ] **Step 1: Create all 3 files**

**TS:** Simple component with `metrics` array: `[{value: '500', unit: '+', label: 'Projetos Entregues'}, {value: '15', unit: '+', label: 'Anos de Experiencia'}, {value: '98', unit: '%', label: 'Clientes Satisfeitos'}, {value: '3', unit: '', label: 'Estados Atendidos'}]`. Import `CommonModule` and `RevealDirective`.

**HTML:** `<section class="metrics-section">` → `.container` → `.metrics-grid` → `*ngFor` of `.metric-card` with `appReveal` directive and staggered delays. Each card: `.metric-card__val` (value + `<span class="metric-card__unit">`) + `.metric-card__lbl`.

**SCSS:** `.metrics-section` (white bg, sp-16 padding, `::before` gradient line). `.metrics-grid` (grid 4 cols). `.metric-card` (bg-base, border, radius r-xl, padding, hover effects). `.metric-card__val` (gradient-text clip). `.metric-card__lbl` (mono, caption). Responsive: 4 → 2 → 1.

Reference: spec section "3. MetricsComponent" and `design-system/geomag-design-system-light.html` lines 556-581.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/metrics/
git commit -m "feat: create MetricsComponent with 4-column stats strip"
```

### Task 10: Redesign ServicesComponent

**Files:**
- Modify: `src/app/components/services/services.component.ts`
- Modify: `src/app/components/services/services.component.html`
- Modify: `src/app/components/services/services.component.scss`

- [ ] **Step 1: Rewrite all 3 files**

**TS:** Update `Service` interface to include `tag` and `iconPath` (SVG path data string for inline rendering). Update services array with 6 entries matching spec. Import `CommonModule` and `RevealDirective`.

**HTML:** `<section id="servicos" class="features-section section">` → `.container` → section header (`.s-label` + `.s-title` + `.s-desc`) → `.features-grid` with `*ngFor` of `.feat-card`. Each card has: `.feat-card__num` ("01"–"06"), `.feat-card__icon` (inline `<svg>` using the iconPath), `.feat-card__title`, `.feat-card__desc`, `.feat-card__tag`.

SVG icons: Use simple inline SVG paths for each service:
1. Crosshair/target for Topografia
2. Globe for Georreferenciamento
3. Maximize/expand for Divisao
4. Hard-hat for Obras
5. File-text for Regularizacao
6. Layers for Mapeamento 3D

**SCSS:** Full feat-card pattern from design system. `.features-section` (bg-base). `.features-grid` (grid 3 cols, gap sp-5). `.feat-card` (white bg, border, radius, shadow-sm, hover effects, `::before` top gradient bar). All sub-elements. Responsive: 3 → 2 → 1.

Reference: spec section "4. ServicesComponent" and `design-system/geomag-design-system-light.html` lines 584-633.

**Accessibility:** `<section id="servicos" aria-labelledby="servicos-title">`. Title gets `id="servicos-title"`. All SVG icons: `aria-hidden="true"`. Cards are not interactive (no role needed).

- [ ] **Step 2: Verify services grid renders correctly**

Check: 3-column grid, cards with icons, numbers, tags, hover animations.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/services/
git commit -m "feat: redesign ServicesComponent with feat-card pattern"
```

### Task 11: Create TechPanelComponent

**Files:**
- Create: `src/app/components/tech-panel/tech-panel.component.ts`
- Create: `src/app/components/tech-panel/tech-panel.component.html`
- Create: `src/app/components/tech-panel/tech-panel.component.scss`

- [ ] **Step 1: Create all 3 files**

**TS:** Component with `technologies` array of 4 items: `{name, description, iconPath}`. Import `CommonModule` and `RevealDirective`.

**HTML:** `<section id="tecnologia" class="dark-panel section">` → `::before` grid overlay (via CSS) → `.container` → section header (light text) → `.tech-grid` with `*ngFor` of `.tech-item`. Each: `.tech-item__icon` (SVG), `.tech-item__name`, `.tech-item__desc`.

**SCSS:** `.dark-panel` (gradient-dark-panel bg, light text). `::before` grid overlay. `.tech-grid` (grid 4 cols). `.tech-item` (dark card pattern, border, hover). Override `.s-title`/`.s-desc` colors for dark context. Responsive: 4 → 2 → 1.

Reference: spec section "5. TechPanelComponent" and `design-system/geomag-design-system-light.html` lines 798-839.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/tech-panel/
git commit -m "feat: create TechPanelComponent dark contrast section"
```

### Task 12: Create CtaComponent

**Files:**
- Create: `src/app/components/cta/cta.component.ts`
- Create: `src/app/components/cta/cta.component.html`
- Create: `src/app/components/cta/cta.component.scss`

- [ ] **Step 1: Create all 3 files**

**TS:** Component with `whatsappUrl` (from environment, different message text: "Ola, gostaria de saber mais sobre os servicos da GeoMAG.") and `emailUrl` (`mailto:contato@geomag.com.br`).

**HTML:** `<section id="contato" class="cta-section">` → `::before` grid (CSS) → `.cta-glow` → `.container` → `.cta-headline` (with `<em>` gradient text) → `.cta-sub` → `.cta-actions` (2 buttons: `.btn--cta-primary` for WhatsApp, `.btn--cta-outline` for email).

**SCSS:** `.cta-section` (brand-600→brand-800 gradient, padding sp-32, text-center). `::before` white grid lines. `.cta-glow` (radial gradient). `.cta-headline` and `.cta-headline em` (teal gradient text, shimmer). `.btn--cta-primary` (white bg, brand text). `.btn--cta-outline` (transparent, white border). Responsive: stack buttons.

Reference: spec section "6. CtaComponent" and `design-system/geomag-design-system-light.html` lines 841-889.

- [ ] **Step 2: Commit**

```bash
git add src/app/components/cta/
git commit -m "feat: create CtaComponent with WhatsApp redirect"
```

---

## Chunk 5: HomeComponent Compositor & Final Integration

### Task 13: Rewrite HomeComponent as compositor

**Files:**
- Modify: `src/app/components/home/home.component.ts`
- Modify: `src/app/components/home/home.component.html`
- Modify: `src/app/components/home/home.component.scss`

- [ ] **Step 1: Rewrite `home.component.ts`**

Remove all data (services, projects, testimonials). Import all section components. Keep WhatsApp float button URL.

```typescript
import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { MetricsComponent } from '../metrics/metrics.component';
import { ServicesComponent } from '../services/services.component';
import { TechPanelComponent } from '../tech-panel/tech-panel.component';
import { CtaComponent } from '../cta/cta.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    HeroComponent,
    MetricsComponent,
    ServicesComponent,
    TechPanelComponent,
    CtaComponent,
  ]
})
export class HomeComponent {
  whatsappFloatUrl = `https://wa.me/${environment.whatsappNumber}?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20com%20topografia.`;
}
```

- [ ] **Step 2: Rewrite `home.component.html`**

```html
<div id="inicio">
  <app-hero></app-hero>
</div>
<app-metrics></app-metrics>
<app-services></app-services>
<app-tech-panel></app-tech-panel>
<app-cta></app-cta>

<!-- WhatsApp Float Button -->
<a [href]="whatsappFloatUrl"
   target="_blank"
   rel="noopener noreferrer"
   class="whatsapp-float"
   aria-label="Fale conosco pelo WhatsApp">
  <svg viewBox="0 0 32 32" fill="currentColor">
    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.302 22.602c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.322-5.656-1.216-4.748-1.966-7.804-6.78-8.04-7.094-.226-.314-1.9-2.53-1.9-4.826s1.2-3.428 1.628-3.896c.428-.468.934-.586 1.246-.586.312 0 .624.002.896.016.288.014.674-.11 1.054.804.39.936 1.324 3.232 1.44 3.466.116.234.194.506.038.82-.156.312-.234.508-.468.78-.234.274-.49.61-.702.82-.234.234-.478.488-.206.958.274.468 1.216 2.006 2.612 3.25 1.794 1.596 3.306 2.09 3.774 2.324.468.234.742.196 1.016-.118.274-.314 1.168-1.362 1.48-1.83.312-.468.624-.39 1.054-.234.428.156 2.724 1.284 3.192 1.518.468.234.78.352.896.546.116.194.116 1.13-.274 2.222z"/>
  </svg>
</a>
```

- [ ] **Step 3: Rewrite `home.component.scss`**

Only the WhatsApp float button styles:

```scss
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 90;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #25d366;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
  transition: transform var(--dur-fast) var(--ease-spring),
              box-shadow var(--dur-medium);
  animation: glowPulse 3s ease-in-out infinite;

  svg {
    width: 28px;
    height: 28px;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 24px rgba(37, 211, 102, 0.5);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 16px;
    right: 16px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
}
```

- [ ] **Step 4: Verify the full page renders**

Open `http://localhost:4200`. Check all sections render in order: Hero → Metrics → Services → TechPanel → CTA → Footer. Check scroll animations trigger. Check WhatsApp float button.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/home/
git commit -m "feat: refactor HomeComponent as section compositor"
```

### Task 14: Responsive testing and final polish

- [ ] **Step 1: Test desktop layout (> 1024px)**

Verify: 2-column hero, 4-col metrics, 3-col services, 4-col tech, centered CTA, 4-col footer.

- [ ] **Step 2: Test tablet layout (768px–1024px)**

Verify: 2-column grids, radar scaled to 320px, hero text adjusts.

- [ ] **Step 3: Test mobile layout (< 768px)**

Verify: Single column, radar hidden, hamburger nav, stacked buttons, 1-col grids.

- [ ] **Step 4: Test scroll animations**

Verify: Sections fade up as they enter viewport. `prefers-reduced-motion` disables them.

- [ ] **Step 5: Fix any visual issues found during testing**

Address any misalignment, spacing, or animation issues.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "fix: responsive adjustments and visual polish"
```

---

## Execution Notes

- **Total tasks:** 15 (across 5 chunks)
- **Estimated time:** ~2-3 hours for an experienced developer
- **Key reference files:** `design-system/geomag-design-system-light.html` (CSS patterns) and `docs/superpowers/specs/2026-03-14-landing-page-redesign-design.md` (full spec)
- **Build verification:** Run `ng build --configuration development` after each chunk to catch errors early
- **No tests specified:** This is a visual/presentational refactor of a static landing page. Visual verification via browser is the primary validation method.
