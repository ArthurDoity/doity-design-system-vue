import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/runtime/components')
const vueApis = [
  'computed', 'ref', 'watch', 'onMounted', 'onUnmounted', 'nextTick',
  'useId', 'provide', 'inject', 'useSlots', 'useAttrs', 'readonly', 'watchEffect', 'reactive',
  'toRefs', 'toRef', 'shallowRef', 'shallowReactive', 'unref', 'isRef',
]

const importRe = /^import\s+\{([^}]+)\}\s+from\s+['"]vue['"]\s*;?\s*$/m

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.vue'))) {
  const filePath = path.join(dir, file)
  let content = fs.readFileSync(filePath, 'utf8')
  if (!content.includes('<script setup')) continue

  const used = vueApis.filter((api) => new RegExp(`\\b${api}\\b`).test(content))
  if (!used.length) continue

  const match = content.match(importRe)
  if (match) {
    const existing = match[1].split(',').map((s) => s.trim()).filter(Boolean)
    const merged = [...new Set([...existing, ...used])].sort()
    const importLine = `import { ${merged.join(', ')} } from 'vue'`
    content = content.replace(importRe, importLine)
  } else {
    const importLine = `import { ${used.join(', ')} } from 'vue'`
    content = content.replace('<script setup>', `<script setup>\n${importLine}`)
  }

  fs.writeFileSync(filePath, content)
  console.log(`${file}: ${used.join(', ')}`)
}
