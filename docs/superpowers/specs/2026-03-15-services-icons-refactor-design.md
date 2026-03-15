# Design Spec: Services Section Icons Refactor

**Date:** 2026-03-15
**Status:** Approved

---

## Goal

Replace the 6 generic inline SVG icons in the ServicesComponent with 11 custom PNG icons provided by the client, and expand the services list from 6 to 11 items matching the client's official service catalog.

---

## Approach

**A — PNG with CSS filter tinting** (approved)

Use `<img>` tags referencing PNG assets. Apply a CSS `filter` to tint the PNGs to match `--brand-500` (#4a80a4). Card layout and SCSS structure remain unchanged.

---

## Step 1 — Asset copy and rename

Source: `ÍCONES.zip` → `ÍCONES-PNG/` folder.
Destination: `src/assets/images/services/`

Explicit source → target filename mapping (normalize: strip accents, replace spaces with hyphens, remove parenthetical suffixes):

| Source filename | Target filename |
|---|---|
| `estação total.png` | `estacao-total.png` |
| `geologico.png` | `geologico.png` |
| `rover.png` | `rover.png` |
| `drone.png` | `drone.png` |
| `verificado.png` | `verificado.png` |
| `escavadora.png` | `escavadora.png` |
| `construcao.png` | `construcao.png` |
| `divisão de áreas.png` | `divisao-areas.png` |
| `engenheiro.png` | `engenheiro.png` |
| `locação.png` | `locacao.png` |
| `fazenda (1).png` | `fazenda.png` |

---

## Step 2 — `services.component.ts`

### Interface change
- **Remove** `iconPath: string`
- **Add** `icon: string` — stores the asset path relative to the app root (no leading slash), e.g. `'assets/images/services/drone.png'`

### Service data — 11 entries (replace all 6 current entries)

| # | title | description | tag | icon |
|---|---|---|---|---|
| 01 | Levantamento Topográfico | Levantamentos planialtimétricos com estação total e GNSS, fornecendo dados precisos para projetos de engenharia e construção civil. | Precisão | `assets/images/services/estacao-total.png` |
| 02 | Mapeamento Cartográfico (SIG) | Elaboração de mapas temáticos e bases cartográficas digitais integradas a sistemas de informação geográfica para análise e planejamento territorial. | SIG | `assets/images/services/geologico.png` |
| 03 | Georreferenciamento | Georreferenciamento de imóveis rurais e urbanos conforme normas do INCRA, com certificação e registro em cartório. | INCRA | `assets/images/services/rover.png` |
| 04 | Aerofotogrametria | Levantamentos aerofotogramétricos com drones de alta resolução para geração de ortomosaicos, MDT e modelos tridimensionais. | Drone | `assets/images/services/drone.png` |
| 05 | Regularização de Imóvel | Regularização de imóveis urbanos e rurais, com levantamento, memorial descritivo e acompanhamento processual junto aos órgãos competentes. | Documentação | `assets/images/services/verificado.png` |
| 06 | Proj. e Acomp. de Terraplanagem | Projetos de corte e aterro com cálculo de volumes, acompanhamento topográfico e controle geométrico durante toda a execução. | Terraplenagem | `assets/images/services/escavadora.png` |
| 07 | Topografia para Obras | Locação de obras, controle geométrico e acompanhamento topográfico durante toda a execução do projeto de construção. | Controle | `assets/images/services/construcao.png` |
| 08 | Desmembramento de Imóveis | Parcelamento de glebas e lotes com memorial descritivo, plantas e aprovação junto aos órgãos competentes municipais e estaduais. | Parcelamento | `assets/images/services/divisao-areas.png` |
| 09 | Estudo de Empreendimento | Análise topográfica e estudos de viabilidade para empreendimentos imobiliários, industriais e de infraestrutura. | Viabilidade | `assets/images/services/engenheiro.png` |
| 10 | Locação de Divisas e Infra | Locação de divisas, implantação de infraestrutura e demarcação de redes com precisão milimétrica em campo. | Implantação | `assets/images/services/locacao.png` |
| 11 | Cadastro Ambiental Rural (CAR) | Elaboração e regularização do Cadastro Ambiental Rural conforme legislação vigente, com georreferenciamento e submissão ao SICAR. | CAR | `assets/images/services/fazenda.png` |

---

## Step 3 — `services.component.html`

Replace the `<div class="feat-card__icon" aria-hidden="true">` block:

**Before:**
```html
<div class="feat-card__icon" aria-hidden="true">
  <svg viewBox="0 0 24 24">
    <path [attr.d]="s.iconPath" />
  </svg>
</div>
```

**After:**
```html
<div class="feat-card__icon">
  <img [src]="s.icon" [alt]="s.title">
</div>
```

Notes:
- Remove `aria-hidden="true"` — the `<img>` with `[alt]` now carries the semantic meaning for screen readers.
- Remove the `<svg>` element and `<path>` entirely.

---

## Step 4 — `services.component.scss`

Replace the `svg { ... }` block inside `.feat-card__icon` with an `img` block:

**Remove:**
```scss
svg {
  width: 22px;
  height: 22px;
  stroke: var(--brand-500);
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

**Add:**
```scss
img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: invert(45%) sepia(40%) saturate(600%) hue-rotate(170deg) brightness(90%);
  transition: filter var(--dur-medium);
}
```

**Hover state** — add inside `.feat-card:hover .feat-card__icon`:
```scss
img {
  filter: invert(45%) sepia(40%) saturate(600%) hue-rotate(170deg) brightness(75%);
}
```

---

## Step 5 — Grid orphan row (11 items, 3 columns)

With 11 cards in a 3-column grid using `repeat(3, 1fr)`, the last row naturally contains 2 cards (items 10 and 11) in columns 1 and 2, with column 3 empty. This is acceptable as-is — no special rule needed for the default (3-column) layout.

Responsive behavior:
- At `max-width: 1024px` (2 columns): 11 items → last row has 1 orphan card alone in col 1. Center it:
  ```scss
  @media (max-width: 1024px) {
    .feat-card:last-child:nth-child(2n - 1) {
      grid-column: 1 / -1;
      max-width: 50%;
      margin-inline: auto;
    }
  }
  ```
- At `max-width: 640px` (1 column): no orphan issue, no rule needed.

---

## Out of Scope

- No changes to other components (hero, header, footer, metrics, cta, tech-panel).
- No changes to card layout, typography, or spacing.
- No conversion of PNG to inline SVG.
- No broken-image fallback (controlled asset environment).
