#!/usr/bin/env node
/**
 * Afere a razao de contraste dos tokens de TEXTO do design system contra
 * os fundos onde eles sao efetivamente usados. Minimo WCAG 2.2 AA para
 * texto normal: 4.5:1.
 *
 * Cada entrada de CHECKS foi conferida a mao no codigo. Ao adicionar um
 * uso novo de um token de texto, acrescente a combinacao aqui.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIN_RATIO = 4.5;

const CHECKS = [
  { label: '--color-text-muted', fg: '--color-text-muted', bg: '#ffffff', where: 'footer' },
  { label: '--color-text-muted', fg: '--color-text-muted', bg: '--color-bg-base', where: 'hero__stat-lbl' },
  { label: '--color-text-secondary', fg: '--color-text-secondary', bg: '#ffffff', where: 'footer__link' },
  { label: '.s-label', fg: '--brand-500', bg: '--color-bg-base', where: 'eyebrow em secao clara' },
  { label: '.s-label', fg: '--brand-500', bg: '--color-bg-elevated', where: 'eyebrow sobre card' },
  { label: '.skip-link', fg: '#ffffff', bg: '#277894', where: 'skip link em foco' },
  { label: '.footer__cert', fg: '--color-text-muted', bg: '#ffffff', where: 'footer certificacao' },
  { label: '.footer__tagline', fg: '--brand-500', bg: '#ffffff', where: 'footer tagline' },
];

const css = readFileSync(join(ROOT, 'src', 'styles.scss'), 'utf8');

function token(name) {
  if (name.startsWith('#')) return name;
  const m = css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{3,8})`));
  if (!m) throw new Error(`token nao encontrado em styles.scss: ${name}`);
  return m[1];
}

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

let failed = 0;

for (const check of CHECKS) {
  const fg = token(check.fg);
  const bg = token(check.bg);
  const r = ratio(fg, bg);
  const ok = r >= MIN_RATIO;
  if (!ok) failed++;
  console.log(
    `${ok ? '  ok   ' : '  FALHA'} ${check.label.padEnd(24)} ${fg} sobre ${bg}  ${r.toFixed(2)}:1  (${check.where})`,
  );
}

if (failed > 0) {
  console.error(`\n${failed} combinacao(oes) abaixo de ${MIN_RATIO}:1.`);
  process.exit(1);
}

console.log(`\n${CHECKS.length} combinacoes acima de ${MIN_RATIO}:1.`);
