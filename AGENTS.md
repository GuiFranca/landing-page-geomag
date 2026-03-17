# AGENTS.md — GeoMAG Landing Page

## Project Overview

Single-page landing page for **GeoMAG**, a topography/surveying company in Brazil. Static Angular SPA deployed to Vercel. No backend, no API calls, no auth. Content is in Brazilian Portuguese.

## Tech Stack

- **Framework**: Angular 19.2 (standalone components, no NgModules)
- **Language**: TypeScript 5.7 (strict mode)
- **Styling**: SCSS + Tailwind CSS 3.4 (utility classes + custom design system)
- **Build**: Angular CLI (`@angular-devkit/build-angular:application`)
- **Linting**: ESLint 9 (flat config) + Angular ESLint + Prettier
- **Testing**: Karma + Jasmine
- **Deploy**: Vercel (auto-deploy on merge to `main`)
- **CI**: GitHub Actions (lint, format check, build, test)
- **Pre-commit**: Husky + lint-staged

## Architecture

```
AppComponent (shell: header + router-outlet + footer)
  └─ HomeComponent (single route: "")
       ├─ HeroComponent        — hero banner with canvas animations
       ├─ MetricsComponent     — stats/numbers (currently hidden)
       ├─ ServicesComponent     — service cards grid
       ├─ ClientsComponent     — client logos carousel
       ├─ TechPanelComponent   — technology showcase
       └─ CtaComponent         — call-to-action with WhatsApp link
```

- **Single route**: `""` → `HomeComponent`, `"**"` → redirect to `""`
- **All components are standalone** — import dependencies directly, no shared module
- **RevealDirective**: IntersectionObserver-based scroll animation, applied via `[appReveal]`
- **Environment files**: `src/environments/environment.ts` (dev) and `environment.prod.ts` (prod) — contain `whatsappNumber`

## Folder Structure

```
src/
├── app/
│   ├── components/          # One folder per component (html + scss + ts)
│   │   ├── header/
│   │   ├── hero/
│   │   ├── metrics/
│   │   ├── services/
│   │   ├── clients/
│   │   ├── tech-panel/
│   │   ├── cta/
│   │   ├── footer/
│   │   └── home/            # Page component (composes all sections)
│   ├── directives/          # Custom directives (RevealDirective)
│   ├── app.component.ts     # Shell (inline template)
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
│   └── images/
│       ├── clientes/        # Client logos (PNG/WebP)
│       ├── logo-nova/       # Brand logos
│       └── services/        # Service icons (PNG)
├── environments/            # Environment configs
├── styles.scss              # Global styles + design system
└── index.html               # Entry HTML with Google Fonts
```

## Development Rules

- **Node**: v22 (CI uses 22)
- **Package manager**: npm (use `npm ci` for installs, never yarn/pnpm)
- **Dev server**: `npm start` → `http://localhost:4200`
- **Build**: `npm run build` → output in `dist/landing-page-geomag/browser/`
- **Lint**: `npm run lint` (must pass before commit)
- **Format check**: `npm run format:check`
- **Test**: `npm run test:ci` (headless Chrome)
- **Pre-commit hook runs**: ESLint --fix + Prettier on staged `.ts`, `.html`, `.scss` files

## Code Conventions

- **Components**: standalone, selector prefix `app-`, kebab-case (`app-tech-panel`)
- **Directives**: standalone, selector prefix `app`, camelCase (`appReveal`)
- **Templates**: separate `.html` file (except AppComponent which uses inline template)
- **Styles**: separate `.scss` file per component
- **Imports**: use `CommonModule` in standalone components that need NgIf/NgFor (project uses both `@if`/`@for` control flow and legacy directives)
- **Prefer Angular control flow**: `@if`, `@for`, `@switch` over `*ngIf`, `*ngFor` (ESLint warns)
- **Prettier**: single quotes, trailing commas, 100 char width, 2-space indent, LF line endings
- **CSS custom properties**: use `var(--brand-*)`, `var(--color-*)`, `var(--sp-*)` from `:root` in `styles.scss`
- **No external icon library**: icons are inline SVG in templates or PNG images in `assets/`
- **WhatsApp links**: built from `environment.whatsappNumber`, never hardcoded

## Design System (styles.scss)

- **Colors**: `--brand-050` to `--brand-900`, `--accent`, `--color-bg-*`, `--color-text-*`
- **Typography**: `--font-display` (Rajdhani), `--font-body` (DM Sans), `--font-mono` (Space Mono)
- **Spacing**: `--sp-1` (0.25rem) to `--sp-32` (8rem)
- **Radius**: `--r-sm` to `--r-full`
- **Shadows**: `--shadow-sm` to `--shadow-brand`
- **Motion**: `--dur-fast` (160ms) to `--dur-slower` (800ms), `--ease-out`, `--ease-spring`
- **Buttons**: `.btn`, `.btn--primary`, `.btn--outline`, `.btn--ghost`, `.btn--lg`, `.btn--sm`
- **Section headers**: `.s-label`, `.s-title`, `.s-desc`, `.gradient-text`
- **Backgrounds**: `.bg-dots`, `.bg-grid`, `.bg-line-t`, `.bg-line-b`
- **Layout**: `.container` (max 1260px), `.container--narrow` (max 880px), `.section`
- **Reveal animation**: `.reveal` + `.visible` classes, delay modifiers `.reveal--d1` to `.reveal--d5`
- **Reduced motion**: all animations suppressed via `prefers-reduced-motion: reduce`

## Approved Dependencies

Do NOT add new dependencies without explicit user approval. Current deps:

- **Runtime**: `@angular/*`, `rxjs`, `tslib`, `zone.js`
- **Dev**: `angular-eslint`, `eslint`, `prettier`, `husky`, `lint-staged`, `karma`, `jasmine`, `tailwindcss`, `postcss`, `autoprefixer`, `typescript`

## Common Mistakes to Avoid

- **Do not use NgModules** — all components/directives are standalone
- **Do not hardcode WhatsApp number** — always use `environment.whatsappNumber`
- **Do not forget `standalone: true`** when creating new components/directives
- **Do not skip `imports` array** — standalone components must declare their template dependencies
- **Do not use `styleUrl`** (singular) — use `styleUrls` (array) for component styles
- **Do not create new routes** — this is a single-page site, all sections are in HomeComponent
- **Do not add content in English** — all user-facing text must be in Brazilian Portuguese
- **Do not ignore `prefers-reduced-motion`** — respect the media query for animations
- **Do not commit `dist/`** — it's in `.gitignore` but check before staging
- **Do not use `@Component({ template: ... })` inline templates** except for AppComponent shell
- **Budget limits**: initial bundle max 1MB (error), 500kB (warning); component style max 8kB (error)

## Code Examples

### Creating a new standalone component

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  standalone: true,
  imports: [CommonModule, RevealDirective],
})
export class ExampleComponent {
  // component logic
}
```

### Using the RevealDirective in a template

```html
<div appReveal [revealDelay]="0.2">
  <h2 class="s-title gradient-text">Section Title</h2>
  <p class="s-desc">Description text here.</p>
</div>
```

### Using design system variables in SCSS

```scss
.card {
  background: var(--gradient-card);
  border: 1px solid var(--color-border);
  border-radius: var(--r-lg);
  padding: var(--sp-6);
  box-shadow: var(--shadow-card);
  transition: transform var(--dur-medium) var(--ease-out);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
}
```

### Section layout pattern

```html
<section class="section" id="section-name">
  <div class="bg-dots"></div>
  <div class="container">
    <span class="s-label">Label Text</span>
    <h2 class="s-title">Title <span class="gradient-text">Highlight</span></h2>
    <p class="s-desc">Description paragraph.</p>
    <!-- section content -->
  </div>
</section>
```

## Key Files Index

| File | Purpose |
|------|---------|
| `src/styles.scss` | Global design system (tokens, reset, utilities, animations) |
| `src/app/app.component.ts` | Root shell (header + outlet + footer) |
| `src/app/app.routes.ts` | Single route config |
| `src/app/components/home/home.component.ts` | Main page composing all sections |
| `src/app/directives/reveal.directive.ts` | Scroll-reveal animation directive |
| `src/environments/environment.ts` | Dev environment config |
| `src/environments/environment.prod.ts` | Prod environment config |
| `eslint.config.js` | ESLint flat config with Angular + Prettier |
| `.prettierrc` | Prettier formatting rules |
| `vercel.json` | Vercel deploy config (rewrites, headers) |
| `.github/workflows/ci.yml` | CI pipeline (lint, format, build, test) |
| `angular.json` | Angular CLI workspace config |
