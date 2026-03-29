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
- TypeScript: compatible with Angular 21 (likely 5.8.x)
- `zone.js`: removed entirely
- Change detection: `provideZonelessChangeDetection()`
- `HeaderComponent` state converted to Signals

---

## Architecture

No architectural changes. Only:
1. Dependency version bumps
2. One component refactored to use Signals
3. Config updates (remove zone.js from polyfills and dependencies)

---

## Phase 1 — Upgrade 19 → 20

Run Angular schematics for automatic code migrations:

```bash
npx @angular/cli@20 update @angular/core@20 @angular/cli@20 @angular-devkit/build-angular@20
npm install angular-eslint@latest
```

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

Dependency targets:
- `@angular/*`: ^21.x
- `@angular-devkit/build-angular`: ^21.x
- `@angular/cli`: ^21.x
- TypeScript: compatible version per Angular 21 release notes

---

## Phase 3 — Zoneless Change Detection

### 3a. `app.config.ts`

Replace `provideZoneChangeDetection` with `provideZonelessChangeDetection`:

```ts
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection(), provideRouter(routes)],
};
```

### 3b. `HeaderComponent` — Convert to Signals

**Why:** `isScrolled` and `isMenuOpen` are mutated by `@HostListener` callbacks. Without zone.js patching DOM events, these mutations won't trigger change detection unless the values are Signals.

```ts
isScrolled = signal(false);
isMenuOpen = signal(false);
```

Template updates:
- `[class.scrolled]="isScrolled()"`
- `[class.navbar__nav--open]="isMenuOpen()"`
- `[attr.aria-expanded]="isMenuOpen()"`
- `[class.navbar__hamburger--active]="isMenuOpen()"`

Handler updates:
- `this.isScrolled.set(window.scrollY > 50)`
- `this.isMenuOpen.set(!this.isMenuOpen())`
- `this.isMenuOpen.set(false)`

### 3c. `angular.json` — Remove zone.js polyfill

Remove `"zone.js"` from the `polyfills` array in both `build` and `test` targets.

### 3d. `package.json` — Remove zone.js

Remove `"zone.js"` from `dependencies`.

### 3e. `app.component.spec.ts` — Update TestBed

Add `provideZonelessChangeDetection()` to the TestBed providers so tests run without zone.js.

---

## Files Changed

| File | Change |
|------|--------|
| `package.json` | Bump `@angular/*`, `@angular-devkit/*`, `@angular/cli`, remove `zone.js` |
| `angular.json` | Remove `zone.js` from polyfills (build + test) |
| `tsconfig.json` | TypeScript version bump if needed |
| `src/app/app.config.ts` | `provideZonelessChangeDetection()` |
| `src/app/components/header/header.component.ts` | Convert to Signals |
| `src/app/components/header/header.component.html` | Signal call syntax `()` |
| `src/app/app.component.spec.ts` | Add `provideZonelessChangeDetection()` to TestBed |

---

## Verification

After each phase:
1. `npm run build` — must succeed with no errors
2. `npm test -- --no-watch --browsers=ChromeHeadless` — all tests pass
3. `npm run lint` — no new warnings

---

## Risks

| Risk | Mitigation |
|------|-----------|
| `ng update` schematic applies unexpected code changes | Review git diff after each phase |
| `angular-eslint` version incompatible with Angular 21 | Check `angular-eslint` release notes for compatible version |
| Tests rely on zone.js async helpers (`fakeAsync`, `tick`) | Inspect spec files — currently only `app.component.spec.ts` exists, no async helpers used |
