# Angular 21 + Zoneless Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the project from Angular 19.2.11 to Angular 21.x and remove zone.js, adopting zoneless change detection with Signals in HeaderComponent.

**Architecture:** Three sequential phases — upgrade 19→20, upgrade 20→21, then apply zoneless config. Each phase ends with a passing build+test+lint gate before proceeding. No new files are created; only existing files are modified.

**Tech Stack:** Angular 21, TypeScript 5.8.x, `provideZonelessChangeDetection()`, Angular Signals, Karma/Jasmine

**Spec:** `docs/superpowers/specs/2026-03-29-angular-21-zoneless-migration-design.md`

---

## File Map

| File | What changes |
|------|-------------|
| `package.json` | Angular/CLI/devkit version bumps (×2), remove `zone.js` dep |
| `angular.json` | Remove `"zone.js"` from build polyfills; remove `"zone.js"` + `"zone.js/testing"` from test polyfills |
| `tsconfig.json` | TypeScript target version if schematics update it |
| `src/app/app.config.ts` | Swap `provideZoneChangeDetection` → `provideZonelessChangeDetection` |
| `src/app/components/header/header.component.ts` | Convert `isScrolled`/`isMenuOpen` plain booleans → `signal(false)` |
| `src/app/components/header/header.component.html` | Add `()` call syntax to the 4 signal bindings |
| `src/app/app.component.spec.ts` | Fix stale `<h1>` assertion; add `provideZonelessChangeDetection()` to `beforeEach` |

---

## Task 1: Create the migration branch

**Files:** none (git operation)

- [ ] **Step 1: Create and switch to the branch**

```bash
git checkout -b chore/angular-21-zoneless
```

Expected: `Switched to a new branch 'chore/angular-21-zoneless'`

---

## Task 2: Upgrade Angular 19 → 20

**Files:**
- Modify: `package.json` (auto, via schematic)
- Modify: `package-lock.json` (auto)
- Possibly modify: any source files that have Angular 20 breaking changes (auto via schematic)

- [ ] **Step 1: Run the Angular 20 update schematic**

```bash
npx @angular/cli@20 update @angular/core@20 @angular/cli@20 @angular-devkit/build-angular@20 --allow-dirty
```

The `--allow-dirty` flag is needed because the branch is new and may have uncommitted tracked changes. The schematic downloads the new packages, applies codemods, and updates `package.json` and `package-lock.json`.

Expected output ends with something like:
```
✔ Packages successfully updated.
```

If the schematic asks about migrations, accept all of them.

- [ ] **Step 2: Inspect what the schematic changed**

```bash
git diff --stat
```

Review every modified file. Common schematic changes include TypeScript version bumps in `tsconfig.json` and import path updates. Understand each change before continuing.

- [ ] **Step 3: Verify the build passes**

```bash
npm run build
```

Expected: exits 0 with no errors. If there are errors, fix them before proceeding.

- [ ] **Step 4: Verify tests pass**

```bash
npm run test:ci
```

Expected: all tests pass (there is currently one broken test — `'should render title'` — which fails regardless of this migration; that is acceptable here and will be fixed in Task 5).

- [ ] **Step 5: Verify lint passes**

```bash
npm run lint
```

Expected: no errors, zero new warnings introduced by the upgrade.

- [ ] **Step 6: Commit the Angular 20 upgrade**

```bash
git add package.json package-lock.json angular.json tsconfig.json tsconfig.app.json tsconfig.spec.json src/
git commit -m "chore: upgrade Angular 19 to 20"
```

---

## Task 3: Upgrade Angular 20 → 21

**Files:**
- Modify: `package.json` (auto, via schematic)
- Modify: `package-lock.json` (auto)
- Possibly modify: `src/app/app.config.ts` (schematic may auto-inject `provideZoneChangeDetection()`)

- [ ] **Step 1: Run the Angular 21 update schematic**

```bash
npx @angular/cli@21 update @angular/core@21 @angular/cli@21 @angular-devkit/build-angular@21 --allow-dirty
```

Accept all migrations when prompted.

- [ ] **Step 2: Inspect `app.config.ts` in the diff — critical check**

```bash
git diff src/app/app.config.ts
```

The Angular 21 schematic may have auto-injected `provideZoneChangeDetection()` to preserve backward compatibility for projects that use zone.js. If so, you will see something like:

```diff
+import { provideZoneChangeDetection } from '@angular/core';
 export const appConfig: ApplicationConfig = {
-  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)],
+  providers: [provideZoneChangeDetection(), provideRouter(routes)],
 };
```

**Do not act on this now.** Task 4 will replace it. Just note whether it happened.

- [ ] **Step 3: Inspect the full diff**

```bash
git diff --stat
```

Review all changed files. The schematic should not have changed any component logic, but verify.

- [ ] **Step 4: Verify the build passes**

```bash
npm run build
```

Expected: exits 0 with no errors.

- [ ] **Step 5: Verify tests pass**

```bash
npm run test:ci
```

Expected: same pass/fail state as after Task 2 (the one broken test from before is still broken; all others pass).

- [ ] **Step 6: Verify lint passes**

```bash
npm run lint
```

Expected: no errors, zero new warnings.

- [ ] **Step 7: Commit the Angular 21 upgrade**

```bash
git add package.json package-lock.json angular.json tsconfig.json tsconfig.app.json tsconfig.spec.json src/
git commit -m "chore: upgrade Angular 20 to 21"
```

---

## Task 4: Apply zoneless change detection config

**Files:**
- Modify: `src/app/app.config.ts`
- Modify: `angular.json`
- Modify: `package.json`

- [ ] **Step 1: Update `src/app/app.config.ts`**

Replace the entire file with:

```ts
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection(), provideRouter(routes)],
};
```

Key: remove `provideZoneChangeDetection` from both the import and the providers array.

- [ ] **Step 2: Remove `zone.js` from build polyfills in `angular.json`**

In `angular.json`, under `projects.landing-page-geomag.architect.build.options.polyfills`, remove `"zone.js"`. The array should become empty (`[]`) or be removed if it was the only entry.

Before:
```json
"polyfills": [
  "zone.js"
],
```

After:
```json
"polyfills": [],
```

- [ ] **Step 3: Remove `zone.js` and `zone.js/testing` from test polyfills in `angular.json`**

In `angular.json`, under `projects.landing-page-geomag.architect.test.options.polyfills`, remove both `"zone.js"` and `"zone.js/testing"`.

Before:
```json
"polyfills": [
  "zone.js",
  "zone.js/testing"
],
```

After:
```json
"polyfills": [],
```

- [ ] **Step 4: Remove `zone.js` from `package.json` dependencies**

In `package.json`, delete the `"zone.js"` line from `dependencies`.

- [ ] **Step 5: Install to sync `package-lock.json`**

```bash
npm install
```

This removes `zone.js` from the lockfile.

- [ ] **Step 6: Verify the build passes**

```bash
npm run build
```

Expected: exits 0 with no errors.

- [ ] **Step 7: Commit the zoneless config**

```bash
git add src/app/app.config.ts angular.json package.json package-lock.json
git commit -m "feat: adopt zoneless change detection, remove zone.js"
```

---

## Task 5: Convert HeaderComponent state to Signals

**Files:**
- Modify: `src/app/components/header/header.component.ts`
- Modify: `src/app/components/header/header.component.html`

- [ ] **Step 1: Update `header.component.ts`**

Replace the file with:

```ts
import { Component, HostListener, signal } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [],
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  whatsappUrl = `https://wa.me/${environment.whatsappNumber}?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20servi%C3%A7os%20de%20topografia.`;

  navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Tecnologia', href: '#tecnologia' },
    { label: 'Contato', href: '#contato' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
```

- [ ] **Step 2: Update `header.component.html` bindings**

The template has four bindings to plain booleans that must use signal call syntax `()`. Make these exact replacements:

```diff
-<header class="navbar" [class.scrolled]="isScrolled">
+<header class="navbar" [class.scrolled]="isScrolled()">
```

```diff
-      <ul class="navbar__nav" [class.navbar__nav--open]="isMenuOpen">
+      <ul class="navbar__nav" [class.navbar__nav--open]="isMenuOpen()">
```

```diff
-        [class.navbar__hamburger--active]="isMenuOpen"
+        [class.navbar__hamburger--active]="isMenuOpen()"
```

```diff
-        [attr.aria-expanded]="isMenuOpen"
+        [attr.aria-expanded]="isMenuOpen()"
```

- [ ] **Step 3: Verify the build passes**

```bash
npm run build
```

Expected: exits 0 with no errors.

- [ ] **Step 4: Verify lint passes**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 5: Commit the Signal conversion**

```bash
git add src/app/components/header/header.component.ts src/app/components/header/header.component.html
git commit -m "refactor: convert HeaderComponent state to Signals for zoneless compatibility"
```

---

## Task 6: Fix `app.component.spec.ts`

**Files:**
- Modify: `src/app/app.component.spec.ts`

- [ ] **Step 1: Replace the spec file**

The current spec has a broken third test that queries for `<h1>` containing `'Hello, landing-page-geomag'` — this element does not exist in `AppComponent`'s template. Replace the entire file:

```ts
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'GeoMAG' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('GeoMAG');
  });
});
```

Notes on changes:
- `provideZonelessChangeDetection()` added to the `beforeEach` `configureTestingModule` providers — applies to all tests in the suite
- `provideRouter([])` added as a defensive measure — `AppComponent` uses `RouterOutlet` in its template, and if `fixture.detectChanges()` were ever called, Angular would attempt to activate a route and throw without a router provider. The new spec doesn't call `detectChanges()`, so this is not strictly required, but it's harmless and makes the suite more resilient
- The broken `'should render title'` test removed (it tested a stale `<h1>` that doesn't exist)
- The title test updated: `app.title` is `'GeoMAG'` (per `app.component.ts` line 20), not `'landing-page-geomag'`

- [ ] **Step 2: Run tests to verify all pass**

```bash
npm run test:ci
```

Expected: all tests pass, 0 failures.

- [ ] **Step 3: Commit**

```bash
git add src/app/app.component.spec.ts
git commit -m "fix: update spec to zoneless TestBed and fix stale title assertion"
```

---

## Task 7: Final verification gate

- [ ] **Step 1: Full build**

```bash
npm run build
```

Expected: exits 0, no errors or warnings.

- [ ] **Step 2: Full test suite**

```bash
npm run test:ci
```

Expected: all tests pass.

- [ ] **Step 3: Full lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 4: Confirm zone.js is gone from the bundle**

```bash
grep -r "zone.js" dist/ --include="*.js" -l 2>/dev/null || echo "zone.js not found in dist — good"
```

Expected: `zone.js not found in dist — good`

- [ ] **Step 5: Tag the final state**

```bash
git log --oneline -6
```

Confirm the commit history shows: branch creation, Angular 20 upgrade, Angular 21 upgrade, zoneless config, Signal conversion, spec fix.
