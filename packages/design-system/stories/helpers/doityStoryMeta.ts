import type { Meta, ArgTypes } from '@storybook/vue3'
import { componentDocs, type ComponentDocEntry, type ComponentDocName } from '../docs/component-docs'

function buildDescription(entry: ComponentDocEntry | undefined, doityName: string, usage: string): string {
  const lines = [
    entry?.description ?? '',
    '',
    '### Instalação',
    '',
    '```bash',
    'pnpm add @arthurdoity/design-system',
    '```',
    '',
    'Configure o módulo no `nuxt.config.ts`:',
    '',
    '```ts',
    'export default defineNuxtConfig({',
    "  modules: ['@arthurdoity/design-system'],",
    '})',
    '```',
    '',
    `O componente fica disponível globalmente como \`${doityName}\` (prefixo \`Doity\` + nome).`,
    '',
    '### Uso',
    '',
    '```vue',
    '<template>',
    ...usage.split('\n').map(line => (line ? `  ${line}` : '')),
    '</template>',
    '```',
  ]

  if (entry?.events && Object.keys(entry.events).length > 0) {
    lines.push('', '### Eventos', '')
    for (const [name, desc] of Object.entries(entry.events)) {
      lines.push(`- **@${name}** — ${desc}`)
    }
  }

  if (entry?.slots && Object.keys(entry.slots).length > 0) {
    lines.push('', '### Slots', '')
    for (const [name, desc] of Object.entries(entry.slots)) {
      lines.push(`- **${name || 'default'}** — ${desc}`)
    }
  }

  return lines.join('\n')
}

export function getDoityArgTypes(name: ComponentDocName): ArgTypes {
  const entry = componentDocs[name]
  if (!entry?.props) return {}

  const argTypes: ArgTypes = {}
  for (const [prop, config] of Object.entries(entry.props)) {
    argTypes[prop] = {
      ...config,
      table: {
        category: 'Props',
        type: config.type ? { summary: config.type } : undefined,
        defaultValue: config.default !== undefined ? { summary: String(config.default) } : undefined,
        ...(config.table ?? {}),
      },
    }
  }
  return argTypes
}

export function getDoityParameters(name: ComponentDocName) {
  const entry = componentDocs[name]
  const doityName = entry?.exportName ?? `Doity${name}`
  const usage = entry?.usage ?? `<${doityName} />`

  return {
    docs: {
      description: {
        component: buildDescription(entry, doityName, usage),
      },
    },
  }
}

/** Monta meta do Storybook — use com objeto literal + satisfies Meta para compatibilidade CSF */
export function doityStoryMeta<T>(
  name: ComponentDocName,
  component: T,
  overrides: Partial<Meta<T>> = {},
): Partial<Meta<T>> {
  return {
    title: overrides.title ?? `Components/${name}`,
    component,
    tags: ['autodocs'],
    ...overrides,
    parameters: {
      ...getDoityParameters(name),
      ...overrides.parameters,
      docs: {
        ...getDoityParameters(name).docs,
        ...overrides.parameters?.docs,
        description: {
          ...getDoityParameters(name).docs.description,
          ...overrides.parameters?.docs?.description,
        },
      },
    },
    argTypes: {
      ...getDoityArgTypes(name),
      ...overrides.argTypes,
    },
  }
}

/** Define o código exibido no painel "Show code" de uma story específica */
export function storyUsage(code: string) {
  return {
    docs: {
      source: {
        type: 'code' as const,
        language: 'html' as const,
        code,
      },
    },
  }
}
