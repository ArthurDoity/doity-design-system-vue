#!/usr/bin/env node
/**
 * Sincroniza tokens do Figma para tokens/tokens.json
 *
 * Requer FIGMA_ACCESS_TOKEN no ambiente.
 * Obtenha em: https://www.figma.com/developers/api#access-tokens
 *
 * Execute: FIGMA_ACCESS_TOKEN=xxx pnpm tokens:sync
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const FIGMA_FILE_KEY = 'gV3jUgytTY4NnTQMhqeVuU'
const __dirname = dirname(fileURLToPath(import.meta.url))
const tokensPath = join(__dirname, '../tokens/tokens.json')

const token = process.env.FIGMA_ACCESS_TOKEN

if (!token) {
  console.warn('⚠ FIGMA_ACCESS_TOKEN não definido — mantendo tokens/tokens.json atual.')
  console.warn('  Para sincronizar: FIGMA_ACCESS_TOKEN=xxx pnpm tokens:sync')
  process.exit(0)
}

const existing = JSON.parse(readFileSync(tokensPath, 'utf8'))

const response = await fetch(
  `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`,
  { headers: { 'X-Figma-Token': token } },
)

if (!response.ok) {
  console.error(`Figma API error: ${response.status} ${response.statusText}`)
  process.exit(1)
}

const figmaData = await response.json()
const tokens = { ...existing.tokens }

for (const collection of Object.values(figmaData.meta?.variableCollections || {})) {
  for (const varId of collection.variableIds || []) {
    const variable = figmaData.meta?.variables?.[varId]
    if (!variable) continue

    const cssKey = variable.name
      .toLowerCase()
      .replace(/\//g, '-')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')

    const modeId = collection.defaultModeId
    const value = variable.valuesByMode?.[modeId]

    if (typeof value === 'object' && value?.r !== undefined) {
      const r = Math.round(value.r * 255)
      const g = Math.round(value.g * 255)
      const b = Math.round(value.b * 255)
      const a = value.a ?? 1
      tokens[cssKey] = a < 1
        ? `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`
        : `#${[r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')}`
    }
    else if (typeof value === 'number') {
      tokens[cssKey] = `${value}px`
    }
    else if (typeof value === 'string') {
      tokens[cssKey] = value
    }
  }
}

const output = {
  meta: {
    source: `Figma file ${FIGMA_FILE_KEY}`,
    syncedAt: new Date().toISOString(),
  },
  tokens,
}

writeFileSync(tokensPath, JSON.stringify(output, null, 2), 'utf8')
console.log(`✓ ${Object.keys(tokens).length} tokens sincronizados do Figma`)
