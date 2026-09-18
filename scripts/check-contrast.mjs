#!/usr/bin/env node
/**
 * Afere a razao de contraste do texto contra os fundos onde ele e
 * efetivamente usado. Minimo WCAG 2.2 AA para texto normal: 4.5:1.
 *
 * As combinacoes que nomeiam um seletor de componente LEEM a declaracao real
 * (`color:` / `background:`) do .scss daquele componente, em vez de confiar num
 * nome de token escrito a mao aqui. Sem isso o guard passa vazio: reverter a
 * cor no componente nao mexe em nenhum token e o guard continua verde.
 *
 * Se uma declaracao nao puder ser localizada, o guard FALHA alto — nunca pula
 * a checagem em silencio.
 *
 * Limitacao conhecida (documentada de proposito): --accent (#2e8fb0) ainda e
 * cor de texto em .hero__eyebrow, .btn--ghost e no hover da navbar, a 3.70:1 /
 * 3.47:1. E decisao de design pendente do usuario, nao conserto mecanico, e
 * por isso NAO entra em CHECKS. O "N combinacoes acima de 4.5:1" abaixo nao
 * significa que a pagina inteira passa.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIN_RATIO = 4.5;

const STYLES = 'src/styles.scss';
const HEADER = 'src/app/components/header/header.component.scss';
const FOOTER = 'src/app/components/footer/footer.component.scss';
const HERO = 'src/app/components/hero/hero.component.scss';

const fileCache = new Map();
function read(relPath) {
  if (!fileCache.has(relPath)) {
    fileCache.set(relPath, readFileSync(join(ROOT, ...relPath.split('/')), 'utf8'));
  }
  return fileCache.get(relPath);
}

/* ---------- leitura de CSS (parse minimo, sem dependencias) ---------- */

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Corpo do bloco de um seletor de primeiro nivel, achando a chave que fecha. */
function selectorBody(css, selector, relPath) {
  const open = new RegExp(`^[ \\t]*${escapeRe(selector)}[ \\t]*\\{`, 'm').exec(css);
  if (!open) throw new Error(`seletor ${selector} nao encontrado em ${relPath}`);
  const start = open.index + open[0].length;
  let depth = 1;
  let i = start;
  for (; i < css.length && depth > 0; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') depth--;
    if (depth === 0) break;
  }
  if (depth !== 0) throw new Error(`bloco de ${selector} nao fecha em ${relPath}`);
  return css.slice(start, i);
}

/** Declaracao `prop: valor` no nivel raiz do bloco (ignora regras aninhadas). */
function topLevelValue(body, prop) {
  const decl = new RegExp(`^\\s*${escapeRe(prop)}\\s*:\\s*(.+)$`);
  let depth = 0;
  let buf = '';
  let found = null;
  for (const ch of body) {
    if (ch === '{') {
      depth++;
      buf = '';
    } else if (ch === '}') {
      depth--;
      buf = '';
    } else if (ch === ';') {
      if (depth === 0) {
        const m = buf.match(decl);
        if (m) found = m[1].trim();
      }
      buf = '';
    } else {
      buf += ch;
    }
  }
  return found;
}

/* ---------- resolucao de cor ---------- */

/** Valor bruto de um custom property declarado em styles.scss. */
function tokenValue(name) {
  const m = read(STYLES).match(new RegExp(`${escapeRe(name)}\\s*:\\s*([^;]+);`));
  if (!m) throw new Error(`token nao encontrado em ${STYLES}: ${name}`);
  return m[1].trim();
}

/** Resolve literal hex, `--token` ou `var(--token)` ate um hex concreto. */
function toHex(value, origin) {
  let v = String(value).trim();
  for (let hop = 0; hop < 5; hop++) {
    if (/^#[0-9a-fA-F]{3,8}$/.test(v)) return v.toLowerCase();
    const varRef = v.match(/^var\(\s*(--[\w-]+)\s*\)$/);
    if (varRef) {
      v = tokenValue(varRef[1]);
      continue;
    }
    if (/^--[\w-]+$/.test(v)) {
      v = tokenValue(v);
      continue;
    }
    break;
  }
  throw new Error(`cor nao resolvivel para hex em ${origin}: "${value}"`);
}

/** Fonte: declaracao real de um seletor num .scss de componente. */
function decl(relPath, selector, prop) {
  const origin = `${relPath} ${selector} { ${prop} }`;
  const value = topLevelValue(selectorBody(read(relPath), selector, relPath), prop);
  if (value === null) throw new Error(`declaracao "${prop}" ausente em ${origin}`);
  return { hex: toHex(value, origin), origin };
}

/** Fonte: token simples de styles.scss. */
function tok(name) {
  return { hex: toHex(name, `${STYLES} ${name}`), origin: `${STYLES} ${name}` };
}

/** Fonte: literal. */
function lit(hex) {
  return { hex: toHex(hex, 'literal'), origin: hex };
}

/** Fonte: stop mais escuro de um gradiente — o pior caso para texto por cima. */
function darkestStop(tokenName) {
  const raw = tokenValue(tokenName);
  const stops = raw.match(/#[0-9a-fA-F]{3,8}/g);
  if (!stops || stops.length === 0) {
    throw new Error(`nenhum stop hex em ${tokenName}: "${raw}"`);
  }
  const worst = stops.reduce((a, b) => (luminance(a) <= luminance(b) ? a : b));
  return { hex: worst.toLowerCase(), origin: `${tokenName} (stop mais escuro de ${stops.length})` };
}

/* ---------- WCAG ---------- */

function luminance(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const f = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)];
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/* ---------- combinacoes ---------- */

function buildChecks() {
  const footerBg = decl(FOOTER, '.footer', 'background');
  return [
    { label: '--color-text-secondary', fg: tok('--color-text-secondary'), bg: footerBg, where: 'footer__link' },
    { label: '--color-text-muted', fg: tok('--color-text-muted'), bg: tok('--color-bg-base'), where: 'metric-card__lbl' },
    { label: '.s-label', fg: tok('--brand-500'), bg: tok('--color-bg-base'), where: 'eyebrow em secao clara' },
    { label: '.s-label', fg: tok('--brand-500'), bg: tok('--color-bg-elevated'), where: 'eyebrow sobre card' },
    {
      label: '.hero__stat-lbl',
      fg: decl(HERO, '.hero__stat-lbl', 'color'),
      bg: darkestStop('--gradient-hero-bg'),
      where: 'stats do hero sobre o stop mais escuro do gradiente',
    },
    {
      label: '.skip-link',
      fg: decl(HEADER, '.skip-link', 'color'),
      bg: decl(HEADER, '.skip-link', 'background'),
      where: 'skip link em foco',
    },
    { label: '.footer__desc', fg: decl(FOOTER, '.footer__desc', 'color'), bg: footerBg, where: 'footer descricao' },
    { label: '.footer__cert', fg: decl(FOOTER, '.footer__cert', 'color'), bg: footerBg, where: 'footer certificacao' },
    { label: '.footer__tagline', fg: decl(FOOTER, '.footer__tagline', 'color'), bg: footerBg, where: 'footer tagline' },
  ];
}

let checks;
try {
  checks = buildChecks();
} catch (err) {
  console.error(`FALHA: nao foi possivel resolver uma combinacao de contraste.\n  ${err.message}`);
  console.error('O guard nao pula checagens: corrija a origem ou atualize CHECKS.');
  process.exit(1);
}

let failed = 0;

for (const check of checks) {
  const r = ratio(check.fg.hex, check.bg.hex);
  const ok = r >= MIN_RATIO;
  if (!ok) failed++;
  console.log(
    `${ok ? '  ok   ' : '  FALHA'} ${check.label.padEnd(24)} ${check.fg.hex} sobre ${check.bg.hex}  ${r.toFixed(2)}:1  (${check.where})`,
  );
  if (!ok) {
    console.error(`         fg: ${check.fg.origin}`);
    console.error(`         bg: ${check.bg.origin}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} combinacao(oes) abaixo de ${MIN_RATIO}:1.`);
  process.exit(1);
}

console.log(`\n${checks.length} combinacoes acima de ${MIN_RATIO}:1.`);
