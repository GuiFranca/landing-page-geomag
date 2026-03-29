# Design: Angular 21 + Zoneless Migration

**Date:** 2026-03-29
**Branch:** `chore/angular-21-zoneless`
**Status:** Approved

---

## Overview

Upgrade the project from Angular 19.2.11 to Angular 21.2.6 and adopt zoneless change detection (remove `zone.js`). The project already uses standalone components and built-in control flow, making this a clean migration.

---

## Current State

- Angular: 19.2.11
- TypeScript: 5.7.2
- `zone.js`: 0.15.0
- Change detection: `provideZoneChangeDetection({ eventCoalescing: true })`
- Build tool: `@angular-devkit/build-angular` (esbuild-based)
- No NgModules — fully standalone
- Built-in control flow already in use

---

## Target State

- Angular: 21.x (latest stable)
- TypeScript: compatible with Angular 21 (5.8.x)
- `zone.js`: removed entirely
- Change detection: `provideZonelessChangeDetection()`
- `HeaderComponent` state converted to Signals

---

## Architecture

No architectural changes. Only:
1. Dependency version bumps
2. One component refactored to use Signals
3. Config updates (remove zone.js from polyfills and dependencies)
4. Test file updated (broken DOM assertion + zoneless TestBed)

---

## Phase 1 — Upgrade 19 → 20

Run Angular schematics for automatic code migrations:

```bash
npx @angular/cli@20 update @angular/core@20 @angular/cli@20 @angular-devkit/build-angular@20
```

**Do NOT run `npm install angular-eslint@latest` at this step.** The project already has `angular-eslint@21.0.1` (compatible with Angular 21). Upgrading it mid-migration against Angular 20 packages would cause a version mismatch.

Schematics handle any breaking changes automatically. Verify build and tests pass before proceeding.

Dependency targets:
- `@angular/*`: ^20.x
- `@angular-devkit/build-angular`: ^20.x
- `@angular/cli`: ^20.x
- `zone.js`: ~0.15.0 (keep for now)
- TypeScript: compatible version per Angular 20 release notes

---

## Phase 2 — Upgrade 20 → 21

```bash
npx @angular/cli@21 update @angular/core@21 @angular/cli@21 @angular-devkit/build-angular@21
```

**Important:** The `ng update` schematic for an existing app (that currently uses zone.js) may auto-inject `provideZoneChangeDetection()` into `app.config.ts` to preserve backward compatibility. After the schematic runs, inspect `app.config.ts` in the git diff and confirm whether this happened. Phase 3a will override this.

Dependency targets:
- `@angular/*`: ^21.x
- `@angular-devkit/build-angular`: ^21.x
- `@angular/cli`: ^21.x
- TypeScript: compatible version per Angular 21 release notes

---

## Phase 3 — Zoneless Change Detection

### 3a. `app.config.ts`

Replace any zone-based provider with `provideZonelessChangeDetection`. Remove the import of `provideZoneChangeDetection` entirely (whether it was already there or auto-injected by the schematic in Phase 2):

```ts
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection(), provideRouter(routes)],
};
```

### 3b. `HeaderComponent` — Convert to Signals

**Why:** `isScrolled` and `isMenuOpen` are mutated by `@HostListener` callbacks. Without zone.js patching DOM events, these mutations won't trigger change detection unless the values are Signals. Note: `@HostListener` itself is fully supported in zoneless — only the state variables need to become Signals.

TypeScript changes:
```ts
import { signal } from '@angular/core';

isScrolled = signal(false);
isMenuOpen = signal(false);

@HostListener('window:scroll')
onScroll(): void {
  this.isScrolled.set(window.scrollY > 50);
}

toggleMenu(): void {
  this.isMenuOpen.set(!this.isMenuOpen());
}

closeMenu(): void {
  this.isMenuOpen.set(false);
}
```

Template updates:
- `[class.scrolled]="isScrolled()"` (was `isScrolled`)
- `[class.navbar__nav--open]="isMenuOpen()"` (was `isMenuOpen`)
- `[attr.aria-expanded]="isMenuOpen()"` (was `isMenuOpen`)
- `[class.navbar__hamburger--active]="isMenuOpen()"` (was `isMenuOpen`)

### 3c. `angular.json` — Remove zone.js polyfills

The `test` target has **two** zone.js entries. Both must be removed:

```diff
- "zone.js",
- "zone.js/testing"
```

The `build` target has one entry to remove:

```diff
- "zone.js"
```

### 3d. `package.json` — Remove zone.js

Remove `"zone.js"` from `dependencies`.

### 3e. `app.component.spec.ts` — Fix broken test + add zoneless provider

The existing spec has a **pre-existing broken assertion** that queries for `<h1>` containing `'Hello, landing-page-geomag'`, but the actual `AppComponent` template renders `<app-header>`, `<router-outlet>`, and `<app-footer>` — no such `<h1>` exists. This must be fixed alongside the zoneless change.

Two changes required:
1. Add `provideZonelessChangeDetection()` to the **shared `beforeEach` `configureTestingModule` providers block** — not only to a single `it` block — so all three test cases run under zoneless
2. Replace the stale `<h1>` assertion with a valid assertion (e.g., check that `app-root` renders without error, or assert on the `title` property of `AppComponent`)

---

## Files Changed

| File | Change |
|------|--------|
| `package.json` | Bump `@angular/*`, `@angular-devkit/*`, `@angular/cli`, remove `zone.js` |
| `angular.json` | Remove `"zone.js"` and `"zone.js/testing"` from polyfills (build + test targets) |
| `tsconfig.json` | TypeScript version bump if needed |
| `src/app/app.config.ts` | Replace with `provideZonelessChangeDetection()`, remove old import |
| `src/app/components/header/header.component.ts` | Convert `isScrolled`/`isMenuOpen` to Signals |
| `src/app/components/header/header.component.html` | Signal call syntax `()` on all bindings |
| `src/app/app.component.spec.ts` | Fix broken DOM assertion + add `provideZonelessChangeDetection()` |

---

## Verification

After each phase:
1. `npm run build` — must succeed with no errors
2. `npm run test:ci` — all tests pass
3. `npm run lint` — no new warnings

---

## Risks

| Risk | Mitigation |
|------|-----------|
| `ng update` schematic auto-injects `provideZoneChangeDetection()` | Inspect `app.config.ts` diff after Phase 2; Phase 3a explicitly removes it |
| `ng update` schematic applies unexpected code changes | Review full `git diff` after each phase before proceeding |
| `angular-eslint@21` incompatible with Angular 20 packages during Phase 1 | Do not upgrade `angular-eslint` during Phase 1; it stays at 21.0.1 until Phase 2 completes |
| `zone.js/testing` left behind in test polyfills | Phase 3c explicitly removes both `zone.js` and `zone.js/testing` from test target |
| Broken pre-existing test assertion | Phase 3e fixes the stale `<h1>` assertion |
| Other components using `ChangeDetectorRef.markForCheck()` or `NgZone` | Project scan confirmed no such usage beyond `app.component.spec.ts`; grep for `markForCheck\|detectChanges\|NgZone` before applying Phase 3 |
