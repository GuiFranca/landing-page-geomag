# README Redesign — Design Spec

## Overview

Reescrever o `README.md` raiz do projeto, substituindo o boilerplate genérico do Angular CLI por documentação útil voltada ao desenvolvedor. Escopo: uma única página em português, cobrindo visão geral, arquitetura, design system, variáveis de ambiente e decisões técnicas.

**Idioma:** Português (PT-BR)
**Público:** Desenvolvedor (uso interno)
**Abordagem:** Opção B — README completo para desenvolvedor

---

## Estrutura do README

### 1. Cabeçalho e Visão Geral

- Título: `# GeoMAG — Landing Page`
- Subtítulo descritivo: landing page institucional da GeoMAG Topografia & Projetos
- Linha de deploy: `🔗 Deploy: [em breve]` (placeholder)
- Badges inline: Angular 19 · TailwindCSS · TypeScript · Single-Page App
- Parágrafo curto (3–4 linhas) descrevendo o que é o projeto, a stack e o que entrega:
  - Apresentação dos serviços da empresa
  - Integração WhatsApp para captação de leads (mensagens pré-preenchidas por ponto de entrada)
  - Animações com Canvas API (topografia + radar) e IntersectionObserver (RevealDirective)

---

### 2. Instalação e Desenvolvimento

Pré-requisitos, comandos de uso diário e tabela de scripts:

```
Pré-requisitos: Node.js 18+ e Angular CLI 19

npm install
ng serve      → http://localhost:4200  (HMR ativo)
ng build      → build de produção em dist/
ng test       → testes unitários com Karma + Jasmine
```

Tabela de scripts do `package.json`:

| Script       | Comando              | Descrição                              |
|--------------|----------------------|----------------------------------------|
| `start`      | `ng serve`           | Servidor de desenvolvimento com HMR   |
| `build`      | `ng build`           | Build de produção em `dist/`           |
| `watch`      | `ng build --watch`   | Build incremental em modo development  |
| `test`       | `ng test`            | Testes unitários com Karma             |

---

### 3. Arquitetura de Componentes

Descrição em prosa: SPA com roteamento simples (rota raiz → HomeComponent, wildcard redireciona). HomeComponent atua como compositor — apenas monta as seções na ordem correta. Todos os componentes são Angular standalone (sem NgModules).

Árvore de componentes:

```
AppComponent
├── HeaderComponent         # Navbar fixa, blur no scroll, menu mobile responsivo
└── router-outlet
    └── HomeComponent       # Compositor de seções (sem lógica própria)
        ├── HeroComponent         # Hero fullscreen, canvas topográfico + radar SVG
        ├── MetricsComponent      # Strip horizontal com 4 métricas
        ├── ServicesComponent     # Grid de 11 cards de serviços com ícones PNG
        ├── ClientsComponent      # Carrossel automático com 21 logos de clientes
        ├── TechPanelComponent    # Painel escuro com 3 tecnologias
        └── CtaComponent          # CTA final → WhatsApp / e-mail
FooterComponent             # 4 colunas: empresa, serviços, tecnologia, contato
```

Tabela de componentes:

| Componente          | Arquivo                              | Responsabilidade                                  |
|---------------------|--------------------------------------|---------------------------------------------------|
| `AppComponent`      | `src/app/app.component.ts`           | Shell da aplicação, inclui Header e Footer        |
| `HeaderComponent`   | `src/app/components/header/`         | Navbar fixa com scroll blur e menu mobile         |
| `HomeComponent`     | `src/app/components/home/`           | Compositor — ordena e monta as seções             |
| `HeroComponent`     | `src/app/components/hero/`           | Hero fullscreen com Canvas API e radar            |
| `MetricsComponent`  | `src/app/components/metrics/`        | Estatísticas da empresa em strip horizontal       |
| `ServicesComponent` | `src/app/components/services/`       | Grid de serviços com ícones PNG tintados via CSS  |
| `ClientsComponent`  | `src/app/components/clients/`        | Carrossel automático de logos de clientes         |
| `TechPanelComponent`| `src/app/components/tech-panel/`     | Painel escuro de tecnologias com SVG inline       |
| `CtaComponent`      | `src/app/components/cta/`            | CTA final com botões WhatsApp e e-mail            |
| `FooterComponent`   | `src/app/components/footer/`         | Rodapé expandido em 4 colunas                     |
| `RevealDirective`   | `src/app/directives/reveal.directive.ts` | Animação de entrada por IntersectionObserver  |

---

### 4. Design System

Descrição das três camadas de estilo que não se misturam:

**Camada 1 — CSS Custom Properties (tokens)** → `src/styles.scss`
Fonte única da verdade para aparência visual. Inclui:
- Cores: escala `--brand-050` a `--brand-900` (steel-blue), cores de acento e semânticas
- Tipografia: `--font-display` (Rajdhani), `--font-body` (DM Sans), `--font-mono` (Space Mono)
- Espaçamento: escala `--sp-1` a `--sp-32`
- Sombras, gradientes, border-radius e motion tokens (`--dur-*`, `--ease-*`)

**Camada 2 — Tailwind CSS** → utilitários de layout apenas
Usado exclusivamente para `grid`, `flex`, `gap`, `padding`, `margin` e breakpoints responsivos. Nenhuma cor, fonte ou sombra via Tailwind.

**Camada 3 — SCSS por componente** → `*.component.scss`
Aparência visual específica de cada componente, consumindo os tokens da Camada 1.

Fontes carregadas via Google Fonts no `index.html`: Rajdhani · DM Sans · Space Mono.

---

### 5. Variáveis de Ambiente

Arquivo: `src/environments/environment.ts`
Arquivo de produção: `src/environments/environment.prod.ts`

| Variável           | Tipo      | Exemplo              | Descrição                                         |
|--------------------|-----------|----------------------|---------------------------------------------------|
| `production`       | `boolean` | `false`              | `true` apenas no build de produção                |
| `whatsappNumber`   | `string`  | `'5500111222333'`    | Número no formato internacional (55 + DDD + número), sem espaços ou símbolos |

O número é usado por `HeaderComponent`, `HeroComponent`, `CtaComponent` e `HomeComponent` para construir URLs `https://wa.me/{número}?text=...` com mensagens pré-preenchidas distintas por ponto de entrada.

---

### 6. Decisões de Design

**Angular Standalone (sem NgModules)**
Cada componente declara seus próprios imports diretamente. Sem barrel files nem módulos compartilhados. Favorece tree-shaking e torna cada componente legível de forma isolada.

**CSS Tokens em vez de Tailwind para estilos visuais**
Tailwind cobre apenas layout. Cores, tipografia, sombras e gradientes vivem exclusivamente em custom properties no `styles.scss`. Motivo: consistência visual garantida pelo token, não pela classe utilitária — evita drift visual quando muitos componentes usam classes diferentes para expressar o mesmo valor.

**Canvas API para animações do Hero**
Linhas topográficas e radar feitos com Canvas 2D puro (sem biblioteca). Seed fixo (`42`) garante aparência idêntica entre reloads. Sem loop de animação — desenha apenas no `ngAfterViewInit` e no resize (debounce 200ms). Respeita `prefers-reduced-motion`: renderiza apenas o gradiente estático quando a preferência está ativa.

**WhatsApp como único canal de contato**
Sem formulário com backend. Todo CTA aponta para `wa.me` com mensagem pré-preenchida contextual ao ponto de entrada (Header, Hero e CTA têm textos distintos). Simplifica a stack e evita a necessidade de servidor para envio de e-mail.

**Dados hardcoded por componente**
Página estática sem CMS ou serviço de dados. Cada componente é dono dos seus dados (serviços, métricas, tecnologias, logos de clientes). Para atualizar qualquer conteúdo, editar diretamente o array no `.ts` do componente correspondente.

---

## Arquivo a Modificar

- `README.md` (raiz do repositório) — substituição completa do conteúdo atual

## Fora do Escopo

- Criação de testes
- Alterações no código da aplicação
- Documentação de componentes individuais (JSDoc/Storybook)
