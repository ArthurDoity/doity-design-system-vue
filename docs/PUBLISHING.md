# Publicar e usar @arthurboity/design-system

Guia para publicar o pacote no GitHub Packages e instalá-lo em projetos Nuxt/Vue.

## Pré-requisitos

- Repositório no GitHub (ex: `ArthurDoity/doity-design-system-vue`)
- Node.js 20+ e pnpm 9
- Permissão de **write** em GitHub Packages na conta [@ArthurDoity](https://github.com/ArthurDoity)

---

## Parte 1 — Publicar no GitHub Packages

### 1. Criar o repositório no GitHub

```bash
git init
git add .
git commit -m "feat: design system Vue/Nuxt 4"
git branch -M main
git remote add origin https://github.com/ArthurDoity/doity-design-system-vue.git
git push -u origin main
```

> O repositório fica em [github.com/ArthurDoity/doity-design-system-vue](https://github.com/ArthurDoity/doity-design-system-vue).

### 2. Configurar autenticação (máquina do mantenedor)

Crie um [Personal Access Token](https://github.com/settings/tokens) com escopo `write:packages` e `read:packages`.

Copie `.npmrc.example` para `.npmrc` na raiz (ou use `~/.npmrc`):

```ini
@arthurboity:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_GITHUB_TOKEN
```

**Nunca commite o `.npmrc` com token.** O arquivo já está no `.gitignore` se contiver credenciais locais.

### 3. Publicar manualmente

```bash
# Na raiz do monorepo
pnpm install
pnpm build

# Publicar (dispara prepack → build automaticamente)
cd packages/design-system
pnpm publish
```

Na primeira publicação, confirme o nome `@arthurboity/design-system` e a versão `0.1.0`.

### 4. Publicar via GitHub Release (automático)

O workflow `.github/workflows/publish-package.yml` publica quando você cria um **Release** no GitHub:

1. Vá em **Releases → Draft a new release**
2. Tag: `v0.1.0` (deve bater com `"version"` no `package.json`)
3. Publique o release → o workflow roda `pnpm publish`

Também pode disparar manualmente em **Actions → Publish @arthurboity/design-system → Run workflow**.

### 5. Atualizar versão

Antes de cada release:

```bash
# Edite packages/design-system/package.json → "version": "0.1.1"
pnpm build
git commit -am "chore: bump version to 0.1.1"
git tag v0.1.1
git push && git push --tags
# Crie o Release no GitHub para a tag v0.1.1
```

---

## Parte 2 — Instalar em outro projeto Nuxt

### Opção A — GitHub Packages (recomendado)

**1. `.npmrc` no projeto consumidor** (raiz):

```ini
@arthurboity:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Em CI, use `secrets.GITHUB_TOKEN` ou um PAT com `read:packages`.

**2. Instalar:**

```bash
pnpm add @arthurboity/design-system
```

**3. Configurar Nuxt:**

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@arthurboity/design-system'],
})
```

**4. Usar componentes** (registrados globalmente com prefixo `Doity`):

```vue
<template>
  <DoityButton hierarchy="primary">Salvar</DoityButton>
  <DoityInput v-model="email" label="E-mail" />
</template>
```

**5. Atualizar o pacote** quando sair nova versão:

```bash
pnpm update @arthurboity/design-system
```

Mudanças em tokens CSS propagam automaticamente — todos os componentes que usam `--doity-*` refletem a nova versão.

---

### Opção B — Instalar direto do Git (sem registry)

Útil para testes antes de publicar:

```bash
pnpm add @arthurboity/design-system@github:ArthurDoity/doity-design-system-vue#main
```

Para monorepo com subpath:

```bash
pnpm add "github:ArthurDoity/doity-design-system-vue#main:packages/design-system"
```

> Requer build local ou `prepare` script — o pacote já roda `nuxt-module-build build` no `prepack`.

---

### Opção C — Link local (desenvolvimento)

```bash
# No design-system
cd packages/design-system
pnpm build
pnpm link --global

# No projeto consumidor
pnpm link --global @arthurboity/design-system
```

Ou com pnpm workspace protocol se ambos estiverem no mesmo monorepo:

```json
"@arthurboity/design-system": "workspace:*"
```

---

## CSS e tokens

O módulo injeta automaticamente:

- `tokens.css` — variáveis `--doity-*`
- `base.css` — reset/base
- `components.css` — utilitários (ex: chevron)

Para importar manualmente (projeto Vue sem Nuxt):

```ts
import '@arthurboity/design-system/tokens.css'
import '@arthurboity/design-system/base.css'
import '@arthurboity/design-system/components.css'
```

---

## Composable de toast

```vue
<script setup>
const { success, error, warning, info } = useDoityToast()
</script>

<template>
  <DoityButton @click="success('Salvo!')">Salvar</DoityButton>
  <DoitySonner />
</template>
```

`useDoityToast` é auto-importado pelo módulo Nuxt.

---

## Checklist antes de publicar

- [ ] `pnpm build` passa sem erros
- [ ] Versão incrementada em `packages/design-system/package.json`
- [ ] `repository.url` aponta para o repo GitHub correto
- [ ] Token com `write:packages` configurado
- [ ] Release criado (se usar CI)

---

## Solução de problemas

| Erro | Solução |
|------|---------|
| `404 Not Found` ao instalar | Verifique `.npmrc`, token com `read:packages`, e acesso ao repo/pacote |
| `403 Forbidden` ao publicar | Token precisa de `write:packages`; repo deve pertencer à conta `ArthurDoity` |
| Componentes sem estilo | Confirme `modules: ['@arthurboity/design-system']` e que `injectTokens` não foi desabilitado |
| Versão antiga após update | Limpe lockfile/cache: `pnpm store prune` e reinstale |
