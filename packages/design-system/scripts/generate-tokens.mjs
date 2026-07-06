#!/usr/bin/env node
/**
 * Gera tokens.css a partir de tokens/tokens.json
 * Execute: pnpm tokens:generate
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const inputPath = join(root, 'tokens/tokens.json')
const outputPath = join(root, 'src/runtime/assets/css/tokens.css')

const data = JSON.parse(readFileSync(inputPath, 'utf8'))
const { meta = {}, tokens } = data

const lines = [
  '/* Doity Design System — Design Tokens */',
  '/* Generated from tokens/tokens.json — do not edit directly */',
  `/* Source: Figma file ${meta.source || 'gV3jUgytTY4NnTQMhqeVuU'} */`,
  '',
  ':root {',
]

for (const [key, value] of Object.entries(tokens).sort(([a], [b]) => a.localeCompare(b))) {
  lines.push(`  --doity-${key}: ${value};`)
}

lines.push('}', '')

writeFileSync(outputPath, lines.join('\n'), 'utf8')
console.log(`✓ ${Object.keys(tokens).length} tokens → ${outputPath}`)
