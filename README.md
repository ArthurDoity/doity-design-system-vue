# Doity Design System — Vue / Nuxt 4

Pacote instalável com componentes Vue, design tokens CSS e documentação visual sincronizados com o [Figma Doity Design System](https://www.figma.com/design/gV3jUgytTY4NnTQMhqeVuU/Doity-Design-System).

## Objetivo

- **Um lugar para tokens** — mudanças no Figma refletem em todos os projetos via atualização do pacote
- **Componentes com todas as variações** do design system (Button, Badge, Input, etc.)
- **Documentação local** estilo Bootstrap (playground Nuxt) + Storybook

## Rodar em 2 minutos

Checklist para quem recebeu o projeto e quer subir localmente.

### Pré-requisitos

- [Node.js 20+](https://nodejs.org)
- [pnpm 9](https://pnpm.io/installation) — `npm install -g pnpm@9`

### Setup

```bash
# Na raiz do projeto
pnpm install
```

O `pnpm install` já dispara o build do pacote automaticamente.

### Comandos úteis

| Comando | O que faz | URL |
|---------|-----------|-----|
| `pnpm storybook` | Galeria de componentes | http://localhost:6006 |
| `pnpm dev:playground` | Documentação estilo Bootstrap | http://localhost:3000 |
| `pnpm build` | Build do pacote `@arthurboity/design-system` | — |

### Compartilhar por ZIP

Antes de compactar, apague estas pastas (são recriadas no `pnpm install`):

- `node_modules`
- `packages/design-system/dist`
- `packages/design-system/playground/.nuxt`
- `packages/design-system/playground/.output`
- `storybook-static` (se existir)

**Não apague:** `packages/design-system/tokens/`, `src/`, `stories/`, `playground/` (código-fonte).

Se for enviar por **Git**, o `.gitignore` já exclui essas pastas — basta clonar o repositório.

### Sync de tokens do Figma (opcional)

Só necessário se quiser atualizar tokens a partir do Figma. Sem token, o projeto funciona normalmente.

```bash
# macOS / Linux
FIGMA_ACCESS_TOKEN=seu_token pnpm tokens:sync
pnpm tokens:generate

# Windows (PowerShell)
$env:FIGMA_ACCESS_TOKEN="seu_token"
pnpm tokens:sync
pnpm tokens:generate
```

## Instalação no seu projeto Nuxt 4

### Via GitHub Packages

```bash
# .npmrc na raiz do projeto consumidor
@arthurboity:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_GITHUB_TOKEN

pnpm add @arthurboity/design-system
```

Guia completo de publicação e instalação: **[docs/PUBLISHING.md](docs/PUBLISHING.md)**

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@arthurboity/design-system'],
})
```

```vue
<DoityButton hierarchy="primary">Salvar</DoityButton>
<DoityInput placeholder="E-mail" />
<DoityBadge variant="success">Ativo</DoityBadge>
```

## Desenvolvimento deste repositório

```bash
pnpm install

# Documentação visual (playground Nuxt) — http://localhost:3000
pnpm dev:playground

# Storybook — http://localhost:6006
pnpm storybook

# Build do pacote
pnpm build

# Regenerar tokens.css a partir de tokens/tokens.json
pnpm tokens:generate

# Sincronizar tokens do Figma (requer FIGMA_ACCESS_TOKEN)
FIGMA_ACCESS_TOKEN=xxx pnpm tokens:sync
```

## Fluxo de atualização do design system

1. Designer atualiza tokens/componentes no Figma
2. `pnpm tokens:sync` puxa variáveis do Figma → `tokens/tokens.json`
3. `pnpm tokens:generate` gera `tokens.css` com `--doity-*` CSS variables
4. Ajuste componentes se necessário, `pnpm build`, publique nova versão
5. Projetos consumidores atualizam `@arthurboity/design-system` — **todos os botões, cores, etc. mudam automaticamente** pois usam os mesmos tokens

## Estrutura

```
packages/design-system/
├── src/
│   ├── module.ts              # Módulo Nuxt
│   └── runtime/
│       ├── components/        # 30 componentes Vue
│       ├── composables/       # useDoityRegistry, useDoityToast
│       ├── assets/css/        # tokens.css, base.css, components.css
│       └── plugins/
├── tokens/tokens.json         # Fonte de verdade dos tokens
├── scripts/                   # generate-tokens, sync-figma-tokens
├── stories/                   # Storybook
└── playground/                # Docs estilo Bootstrap
```

## Componentes

Accordion, Alert, Alert Dialog, Avatar, Badge, Breadcrumb, Button, Card, Charts, Checkbox, Dialog, Dropdown, Empty, Input, Modal, Navbar, Pagination, Sidebar, Sonner, Spinner, Switch, Table, Tabs, Textarea, Tooltip

## Stack

- Vue 3.5 + Nuxt 4 module (`@nuxt/module-builder`)
- CSS custom properties (design tokens)
- [Reka UI](https://reka-ui.com/) — primitivos headless (Dialog, Dropdown, etc.)
- Storybook 8
- Tokens sincronizáveis via Figma REST API
