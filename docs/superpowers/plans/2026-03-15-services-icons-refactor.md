# Services Icons Refactor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 6 generic inline SVG icons in ServicesComponent with 11 custom PNG icons and expand the services list from 6 to 11 entries.

**Architecture:** Copy PNGs to `src/assets/images/services/`, update the `Service` interface and data array, swap the SVG template element for `<img>`, and update SCSS to apply a CSS filter that tints the PNGs to `--brand-500`.

**Tech Stack:** Angular 19, SCSS, CSS filter for PNG tinting.

**Spec:** `docs/superpowers/specs/2026-03-15-services-icons-refactor-design.md`

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create dir + copy 11 files | `src/assets/images/services/*.png` | Static PNG assets |
| Modify | `src/app/components/services/services.component.ts` | Interface + 11 service entries |
| Modify | `src/app/components/services/services.component.html` | `<img>` instead of `<svg>` |
| Modify | `src/app/components/services/services.component.scss` | CSS filter tinting + responsive orphan |

---

## Chunk 1: Assets

### Task 1: Copy and rename PNG icons to assets folder

**Files:**
- Create dir: `src/assets/images/services/`
- Create: 11 PNG files (renamed, normalized)

Source: `C:/Users/guilh/Downloads/ÍCONES.zip` — already extracted to `/tmp/icones/+ìCONES/+ìCONES-PNG/`

- [ ] **Step 1: Create the target directory**

```bash
mkdir -p src/assets/images/services
```

- [ ] **Step 2: Copy and rename each PNG**

Run these commands from the project root (the worktree root):

```bash
cp "/tmp/icones/+ìCONES/+ìCONES-PNG/estação total.png"   src/assets/images/services/estacao-total.png
cp "/tmp/icones/+ìCONES/+ìCONES-PNG/geologico.png"        src/assets/images/services/geologico.png
cp "/tmp/icones/+ìCONES/+ìCONES-PNG/rover.png"            src/assets/images/services/rover.png
cp "/tmp/icones/+ìCONES/+ìCONES-PNG/drone.png"            src/assets/images/services/drone.png
cp "/tmp/icones/+ìCONES/+ìCONES-PNG/verificado.png"       src/assets/images/services/verificado.png
cp "/tmp/icones/+ìCONES/+ìCONES-PNG/escavadora.png"       src/assets/images/services/escavadora.png
cp "/tmp/icones/+ìCONES/+ìCONES-PNG/construcao.png"       src/assets/images/services/construcao.png
cp "/tmp/icones/+ìCONES/+ìCONES-PNG/divisão de áreas.png" src/assets/images/services/divisao-areas.png
cp "/tmp/icones/+ìCONES/+ìCONES-PNG/engenheiro.png"       src/assets/images/services/engenheiro.png
cp "/tmp/icones/+ìCONES/+ìCONES-PNG/locação.png"          src/assets/images/services/locacao.png
cp "/tmp/icones/+ìCONES/+ìCONES-PNG/fazenda (1).png"      src/assets/images/services/fazenda.png
```

- [ ] **Step 3: Verify all 11 files exist**

```bash
ls src/assets/images/services/
```

Expected output — exactly 11 files:
```
construcao.png   divisao-areas.png  drone.png     engenheiro.png  escavadora.png
estacao-total.png  fazenda.png      geologico.png  locacao.png    rover.png
verificado.png
```

- [ ] **Step 4: Commit**

```bash
git add src/assets/images/services/
git commit -m "feat: add custom service PNG icons to assets"
```

---

## Chunk 2: TypeScript

### Task 2: Update Service interface and data

**Files:**
- Modify: `src/app/components/services/services.component.ts`

- [ ] **Step 1: Update the `Service` interface**

In `services.component.ts`, replace:
```typescript
interface Service {
  title: string;
  description: string;
  tag: string;
  iconPath: string;
  num: string;
}
```

With:
```typescript
interface Service {
  title: string;
  description: string;
  tag: string;
  icon: string;
  num: string;
}
```

- [ ] **Step 2: Replace the services array**

Replace the entire `services: Service[] = [ ... ]` array with:

```typescript
services: Service[] = [
  {
    num: '01',
    title: 'Levantamento Topográfico',
    description: 'Levantamentos planialtimétricos com estação total e GNSS, fornecendo dados precisos para projetos de engenharia e construção civil.',
    tag: 'Precisão',
    icon: 'assets/images/services/estacao-total.png'
  },
  {
    num: '02',
    title: 'Mapeamento Cartográfico (SIG)',
    description: 'Elaboração de mapas temáticos e bases cartográficas digitais integradas a sistemas de informação geográfica para análise e planejamento territorial.',
    tag: 'SIG',
    icon: 'assets/images/services/geologico.png'
  },
  {
    num: '03',
    title: 'Georreferenciamento',
    description: 'Georreferenciamento de imóveis rurais e urbanos conforme normas do INCRA, com certificação e registro em cartório.',
    tag: 'INCRA',
    icon: 'assets/images/services/rover.png'
  },
  {
    num: '04',
    title: 'Aerofotogrametria',
    description: 'Levantamentos aerofotogramétricos com drones de alta resolução para geração de ortomosaicos, MDT e modelos tridimensionais.',
    tag: 'Drone',
    icon: 'assets/images/services/drone.png'
  },
  {
    num: '05',
    title: 'Regularização de Imóvel',
    description: 'Regularização de imóveis urbanos e rurais, com levantamento, memorial descritivo e acompanhamento processual junto aos órgãos competentes.',
    tag: 'Documentação',
    icon: 'assets/images/services/verificado.png'
  },
  {
    num: '06',
    title: 'Proj. e Acomp. de Terraplanagem',
    description: 'Projetos de corte e aterro com cálculo de volumes, acompanhamento topográfico e controle geométrico durante toda a execução.',
    tag: 'Terraplenagem',
    icon: 'assets/images/services/escavadora.png'
  },
  {
    num: '07',
    title: 'Topografia para Obras',
    description: 'Locação de obras, controle geométrico e acompanhamento topográfico durante toda a execução do projeto de construção.',
    tag: 'Controle',
    icon: 'assets/images/services/construcao.png'
  },
  {
    num: '08',
    title: 'Desmembramento de Imóveis',
    description: 'Parcelamento de glebas e lotes com memorial descritivo, plantas e aprovação junto aos órgãos competentes municipais e estaduais.',
    tag: 'Parcelamento',
    icon: 'assets/images/services/divisao-areas.png'
  },
  {
    num: '09',
    title: 'Estudo de Empreendimento',
    description: 'Análise topográfica e estudos de viabilidade para empreendimentos imobiliários, industriais e de infraestrutura.',
    tag: 'Viabilidade',
    icon: 'assets/images/services/engenheiro.png'
  },
  {
    num: '10',
    title: 'Locação de Divisas e Infra',
    description: 'Locação de divisas, implantação de infraestrutura e demarcação de redes com precisão milimétrica em campo.',
    tag: 'Implantação',
    icon: 'assets/images/services/locacao.png'
  },
  {
    num: '11',
    title: 'Cadastro Ambiental Rural (CAR)',
    description: 'Elaboração e regularização do Cadastro Ambiental Rural conforme legislação vigente, com georreferenciamento e submissão ao SICAR.',
    tag: 'CAR',
    icon: 'assets/images/services/fazenda.png'
  },
];
```

- [ ] **Step 3: Commit**

```bash
git add src/app/components/services/services.component.ts
git commit -m "feat: update Service interface and expand to 11 services with custom icons"
```

---

## Chunk 3: Template + Styles

### Task 3: Update HTML template

**Files:**
- Modify: `src/app/components/services/services.component.html`

- [ ] **Step 1: Replace the icon element**

In `services.component.html`, replace:

```html
<div class="feat-card__icon" aria-hidden="true">
  <svg viewBox="0 0 24 24">
    <path [attr.d]="s.iconPath" />
  </svg>
</div>
```

With:

```html
<div class="feat-card__icon">
  <img [src]="s.icon" [alt]="s.title">
</div>
```

Note: `aria-hidden="true"` is removed — the `<img>` alt text now provides semantic meaning for screen readers.

- [ ] **Step 2: Verify TypeScript compiles (interface + template now consistent)**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/services/services.component.html
git commit -m "feat: replace SVG icon with img element in services card"
```

---

### Task 4: Update SCSS styles

**Files:**
- Modify: `src/app/components/services/services.component.scss`

- [ ] **Step 1: Replace the SVG block with IMG block inside `.feat-card__icon`**

In `services.component.scss`, replace:

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

With:

```scss
  img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    filter: invert(45%) sepia(40%) saturate(600%) hue-rotate(170deg) brightness(90%);
    transition: filter var(--dur-medium);
  }
```

- [ ] **Step 2: Add hover filter inside the existing hover block**

Find the existing rule:

```scss
.feat-card:hover .feat-card__icon {
  background: var(--brand-100);
  box-shadow: 0 0 20px rgba(74, 128, 164, 0.2);
}
```

Add the `img` hover filter to it:

```scss
.feat-card:hover .feat-card__icon {
  background: var(--brand-100);
  box-shadow: 0 0 20px rgba(74, 128, 164, 0.2);

  img {
    filter: invert(45%) sepia(40%) saturate(600%) hue-rotate(170deg) brightness(75%);
  }
}
```

- [ ] **Step 3: Add responsive orphan rule for 2-column layout**

Inside the existing `@media (max-width: 1024px)` block, add the orphan-centering rule:

```scss
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .feat-card:last-child:nth-child(2n - 1) {
    grid-column: 1 / -1;
    max-width: 50%;
    margin-inline: auto;
  }
}
```

- [ ] **Step 4: Build to verify no SCSS errors**

```bash
npm run build
```

Expected: build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/services/services.component.scss
git commit -m "feat: apply CSS filter tinting to service PNG icons, update hover and responsive styles"
```

---

## Final Verification

- [ ] **Run dev server and visually check the services section**

```bash
npm start
```

Open `http://localhost:4200` and scroll to the Serviços section. Verify:
- 11 cards are displayed in a 3-column grid
- Each card shows its custom PNG icon tinted in blue (brand color)
- Hover on a card: top bar appears, icon darkens slightly, card lifts
- Resize to tablet width (≤1024px): 2-column grid, last card (11th) is centered
- Resize to mobile (≤640px): 1-column grid, all cards full width

- [ ] **Final commit (if any last tweaks needed)**

```bash
git add -A
git commit -m "fix: fine-tune icon filter values after visual check"
```
