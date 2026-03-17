# GeoMAG — Landing Page

> Landing page institucional da **GeoMAG Topografia & Projetos**, empresa de topografia e georreferenciamento do interior de SP.

🔗 **Deploy:** em breve

![Angular](https://img.shields.io/badge/Angular-19-dd0031?logo=angular) ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06b6d4?logo=tailwindcss) ![SPA](https://img.shields.io/badge/Single--Page_App-✓-4a80a4)

Landing page estática com foco em captação de leads via WhatsApp. Apresenta os serviços da empresa, carrossel de clientes, painel de tecnologia e seção de CTA. Animações construídas com Canvas API (topografia procedural + radar) e IntersectionObserver (entradas por scroll). Toda a estilização usa um design system baseado em CSS Custom Properties, sem dependência de bibliotecas de UI.

---

## Instalação e Desenvolvimento

**Pré-requisitos:** Node.js 18+ e Angular CLI 19

```bash
npm install
ng serve        # http://localhost:4200 — HMR ativo
ng build        # build de produção em dist/
ng test         # testes unitários com Karma + Jasmine
```

### Scripts disponíveis

| Script  | Comando                                        | Descrição                             |
|---------|------------------------------------------------|---------------------------------------|
| `start` | `ng serve`                                     | Servidor de desenvolvimento com HMR  |
| `build` | `ng build`                                     | Build de produção em `dist/`          |
| `watch` | `ng build --watch --configuration development` | Build incremental em modo development |
| `test`  | `ng test`                                      | Testes unitários com Karma            |

---

## Arquitetura

SPA com roteamento simples: rota raiz aponta para `HomeComponent`, wildcard redireciona para raiz. `HomeComponent` atua como compositor de seções e também renderiza o botão flutuante de WhatsApp (declara `whatsappFloatUrl` a partir do `environment`). Todos os componentes são Angular **standalone** — sem NgModules.

```
AppComponent
├── HeaderComponent         # Navbar fixa, blur no scroll, menu mobile responsivo
└── router-outlet
    └── HomeComponent       # Compositor de seções + botão flutuante de WhatsApp
        ├── HeroComponent         # Hero fullscreen, dois Canvas 2D (topografia + radar clip circular)
        ├── MetricsComponent      # Strip horizontal com 4 métricas
        ├── ServicesComponent     # Grid de 11 cards de serviços com ícones PNG
        ├── ClientsComponent      # Carrossel automático com 21 logos de clientes
        ├── TechPanelComponent    # Painel escuro com 3 tecnologias
        └── CtaComponent          # CTA final → WhatsApp / e-mail
FooterComponent             # 4 colunas: empresa, serviços, tecnologia, contato
```

### Componentes

| Componente           | Arquivo                                  | Responsabilidade                                                         |
|----------------------|------------------------------------------|--------------------------------------------------------------------------|
| `AppComponent`       | `src/app/app.component.ts`               | Shell da aplicação, inclui Header e Footer                               |
| `HeaderComponent`    | `src/app/components/header/`             | Navbar fixa com scroll blur e menu mobile                                |
| `HomeComponent`      | `src/app/components/home/`               | Compositor de seções + botão flutuante de WhatsApp (`whatsappFloatUrl`)  |
| `HeroComponent`      | `src/app/components/hero/`               | Hero fullscreen com Canvas API e radar (dois `<canvas>`, seed fixo `42`) |
| `MetricsComponent`   | `src/app/components/metrics/`            | Estatísticas da empresa em strip horizontal                              |
| `ServicesComponent`  | `src/app/components/services/`           | Grid de serviços com ícones PNG tintados via filtro CSS                  |
| `ClientsComponent`   | `src/app/components/clients/`            | Carrossel automático de logos de clientes                                |
| `TechPanelComponent` | `src/app/components/tech-panel/`         | Painel escuro de tecnologias com SVG inline                              |
| `CtaComponent`       | `src/app/components/cta/`                | CTA final com botões WhatsApp e e-mail                                   |
| `FooterComponent`    | `src/app/components/footer/`             | Rodapé expandido em 4 colunas                                            |
| `RevealDirective`    | `src/app/directives/reveal.directive.ts` | Animação de entrada por IntersectionObserver                             |

---

## Design System

O projeto usa **três camadas de estilo que não se misturam**:

**Camada 1 — CSS Custom Properties (tokens)** → `src/styles.scss`

Fonte única da verdade para toda a aparência visual:
- **Cores:** escala `--brand-050` a `--brand-900` (steel-blue, `#4a80a4` como primária), cores de acento e semânticas
- **Tipografia:** `--font-display` (Rajdhani), `--font-body` (DM Sans), `--font-mono` (Space Mono)
- **Espaçamento:** escala `--sp-1` a `--sp-32`
- **Sombras, gradientes, border-radius** e **motion tokens** (`--dur-*`, `--ease-*`)

As fontes são carregadas via Google Fonts no `index.html` com `display=swap`.

**Camada 2 — Tailwind CSS** → utilitários de layout apenas

Usado exclusivamente para `grid`, `flex`, `gap`, `padding`, `margin` e breakpoints responsivos. Nenhuma cor, fonte ou sombra é aplicada via Tailwind.

**Camada 3 — SCSS por componente** → `*.component.scss`

Aparência visual específica de cada componente, consumindo os tokens da Camada 1. Sem duplicação de valores.

---

## Variáveis de Ambiente

| Arquivo                                | Uso                    |
|----------------------------------------|------------------------|
| `src/environments/environment.ts`      | Desenvolvimento local  |
| `src/environments/environment.prod.ts` | Build de produção      |

| Variável         | Tipo      | Exemplo           | Descrição                                                                    |
|------------------|-----------|-------------------|------------------------------------------------------------------------------|
| `production`     | `boolean` | `false`           | `true` apenas no build de produção                                           |
| `whatsappNumber` | `string`  | `'5500111222333'` | Número no formato internacional (55 + DDD + número), sem espaços ou símbolos |

O número é usado por `HeaderComponent`, `HeroComponent`, `CtaComponent` e `HomeComponent` para construir URLs `https://wa.me/{número}?text=...` com mensagens pré-preenchidas distintas por ponto de entrada.

> ⚠️ O arquivo `environment.ts` contém o número de WhatsApp real. Nunca expor publicamente sem substituir o valor. Em deploys públicos, considere mover o número para uma variável de build ou excluir `environment.ts` do controle de versão.

---

## Decisões de Design

**Angular Standalone (sem NgModules)**
Cada componente declara seus próprios imports diretamente. Sem barrel files nem módulos compartilhados. Favorece tree-shaking e torna cada componente legível de forma isolada — qualquer arquivo `.ts` é autoexplicativo sem precisar rastrear módulos.

**CSS Tokens em vez de Tailwind para estilos visuais**
Tailwind cobre apenas layout. Cores, tipografia, sombras e gradientes vivem exclusivamente em custom properties no `styles.scss`. Motivo: consistência visual garantida pelo token, não pela classe utilitária — evita drift quando múltiplos componentes expressam o mesmo valor de formas diferentes.

**Canvas API para animações do Hero**
Linhas topográficas e radar feitos com Canvas 2D puro, sem biblioteca. Seed fixo (`42`) garante aparência idêntica entre reloads. Sem loop de animação — desenha apenas no `ngAfterViewInit` e no resize (debounce 200ms). Respeita `prefers-reduced-motion`: renderiza apenas o gradiente estático quando a preferência está ativa.

**WhatsApp como único canal de contato**
Sem formulário com processamento no backend. Todo CTA aponta para `wa.me` com mensagem contextual pré-preenchida por ponto de entrada (Header, Hero e CTA têm textos distintos). Simplifica a stack e elimina a necessidade de servidor para envio de e-mail.

**Dados hardcoded por componente**
Página estática sem CMS ou serviço de dados. Cada componente é dono dos seus dados (serviços, métricas, tecnologias, logos de clientes). Para atualizar qualquer conteúdo, editar diretamente o array no `.ts` do componente correspondente.
