# Publicar e usar @arthurdoity/design-system

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

Crie um [Personal Access Token (classic)](https://github.com/settings/tokens) com os escopos:

- `write:packages`
- `read:packages`
- `repo` (necessário para publicar pacotes vinculados ao repositório)

**Opção A — `.npmrc` na pasta do usuário (recomendado no Windows)**

Crie ou edite `C:\Users\SEU_USUARIO\.npmrc`:

```ini
@arthurdoity:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_GITHUB_TOKEN
always-auth=true
```

**Opção B — `.npmrc` na raiz do monorepo**

Copie `.npmrc.example` para `.npmrc` na raiz do projeto:

```ini
@arthurdoity:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=SEU_GITHUB_TOKEN
always-auth=true
```

**Nunca commite o `.npmrc` com token.** O arquivo está no `.gitignore`.

**Testar se a autenticação funcionou:**

```bash
npm whoami --registry=https://npm.pkg.github.com
# Deve retornar: ArthurDoity
```

Se retornar `ENEEDAUTH`, o token está ausente, expirado ou sem o escopo `write:packages`.

**Alternativa via variável de ambiente (PowerShell):**

```powershell
$env:NODE_AUTH_TOKEN = "SEU_GITHUB_TOKEN"
pnpm --filter @arthurdoity/design-system publish --no-git-checks
```

### 3. Publicar manualmente

O `pnpm publish` roda o npm num **diretório temporário** e não encontra o `.npmrc` da raiz — por isso `npm whoami` funciona, mas `pnpm publish` dá `ENEEDAUTH`.

Use o script da raiz (passa o `.npmrc` explicitamente):

```bash
# Na raiz do monorepo
pnpm install
pnpm build
pnpm publish:package
```

Equivalente manual:

```bash
npm publish ./packages/design-system --userconfig=.npmrc --registry=https://npm.pkg.github.com --no-git-checks
```

> **Importante:** publique a pasta `packages/design-system`, não a raiz do monorepo. A raiz (`doity-design-system-vue`) é `private` e não tem versão — publicá-la gera `EBADSEMVER`.

Na primeira publicação, confirme o nome `@arthurdoity/design-system` e a versão `0.1.0`.

### 4. Publicar via GitHub Release (automático)

O workflow `.github/workflows/publish-package.yml` publica quando você cria um **Release** no GitHub:

1. Vá em **Releases → Draft a new release**
2. Tag: `v0.1.0` (deve bater com `"version"` no `package.json`)
3. Publique o release → o workflow roda `pnpm publish`

Também pode disparar manualmente em **Actions → Publish @arthurdoity/design-system → Run workflow**.

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
@arthurdoity:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Em CI, use `secrets.GITHUB_TOKEN` ou um PAT com `read:packages`.

**2. Instalar:**

```bash
pnpm add @arthurdoity/design-system
```

**3. Configurar Nuxt:**

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@arthurdoity/design-system'],
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
pnpm update @arthurdoity/design-system
```

Mudanças em tokens CSS propagam automaticamente — todos os componentes que usam `--doity-*` refletem a nova versão.

---

### Opção B — Instalar direto do Git (sem registry)

Útil para testes antes de publicar:

```bash
pnpm add @arthurdoity/design-system@github:ArthurDoity/doity-design-system-vue#main
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
pnpm link --global @arthurdoity/design-system
```

Ou com pnpm workspace protocol se ambos estiverem no mesmo monorepo:

```json
"@arthurdoity/design-system": "workspace:*"
```

---

## CSS e tokens

O módulo injeta automaticamente:

- `tokens.css` — variáveis `--doity-*`
- `base.css` — reset/base
- `components.css` — utilitários (ex: chevron)

Para importar manualmente (projeto Vue sem Nuxt):

```ts
import '@arthurdoity/design-system/tokens.css'
import '@arthurdoity/design-system/base.css'
import '@arthurdoity/design-system/components.css'
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
| `ENEEDAUTH` ao publicar (whoami OK) | Use `pnpm publish:package` da raiz — `pnpm publish` usa pasta temp sem `.npmrc` |
| `403 Forbidden` ao publicar | Token precisa de `write:packages`; repo deve pertencer à conta `ArthurDoity` |
| Componentes sem estilo | Confirme `modules: ['@arthurdoity/design-system']` e que `injectTokens` não foi desabilitado |
| Versão antiga após update | Limpe lockfile/cache: `pnpm store prune` e reinstale |
