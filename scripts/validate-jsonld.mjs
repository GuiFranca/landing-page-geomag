#!/usr/bin/env node
/**
 * Valida todo bloco <script type="application/ld+json"> do index.html.
 * Um bloco invalido faz o Google descartar o schema inteiro em silencio,
 * entao esta checagem roda junto do lint para impedir a reincidencia.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TARGET = join(ROOT, 'src', 'index.html');
const BLOCK_RE = /<script\s+type="application\/ld\+json"\s*>([\s\S]*?)<\/script>/g;

const html = readFileSync(TARGET, 'utf8');
const blocks = [...html.matchAll(BLOCK_RE)];

if (blocks.length === 0) {
  console.error('FALHA: nenhum bloco application/ld+json encontrado em src/index.html');
  process.exit(1);
}

let failed = 0;

blocks.forEach((match, i) => {
  const line = html.slice(0, match.index).split('\n').length;
  try {
    const parsed = JSON.parse(match[1]);
    const type = parsed['@type'] ?? '(sem @type)';
    console.log(`  ok    bloco ${i} (linha ${line}) @type=${type}`);
  } catch (err) {
    failed++;
    console.error(`  FALHA bloco ${i} (linha ${line}): ${err.message}`);
  }
});

if (failed > 0) {
  console.error(`\n${failed} de ${blocks.length} blocos JSON-LD invalidos.`);
  process.exit(1);
}

console.log(`\n${blocks.length} blocos JSON-LD validos.`);
