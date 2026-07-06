<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const { components, foundations } = useDoityRegistry()
</script>

<template>
  <div class="docs-page">
    <h1 class="docs-title">Doity Design System</h1>
    <p class="docs-lead">
      Pacote Vue/Nuxt 4 com componentes, tokens CSS e documentação sincronizados com o Figma.
      Atualize tokens em um lugar — todos os projetos refletem a mudança.
    </p>

    <div class="docs-callout">
      <strong>Instalação rápida</strong>
      <pre class="docs-code"><code>pnpm add @arthurboity/design-system

// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@arthurboity/design-system'],
})</code></pre>
    </div>

    <h2 class="docs-heading">Foundations</h2>
    <div class="docs-grid">
      <NuxtLink
        v-for="item in foundations"
        :key="item.slug"
        :to="`/docs/foundations/${item.slug}`"
        class="docs-card"
      >
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
      </NuxtLink>
    </div>

    <h2 class="docs-heading">Components</h2>
    <div class="docs-grid">
      <NuxtLink
        v-for="item in components"
        :key="item.slug"
        :to="`/docs/components/${item.slug}`"
        class="docs-card"
      >
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.docs-title {
  font-size: var(--doity-font-size-4xl);
  font-weight: var(--doity-font-weight-bold);
  margin: 0 0 var(--doity-spacing-4);
}

.docs-lead {
  color: var(--doity-color-text-secondary);
  font-size: var(--doity-font-size-lg);
  line-height: var(--doity-font-lineHeight-lg);
  margin: 0 0 var(--doity-spacing-8);
}

.docs-callout {
  background: var(--doity-color-background-secondary);
  border: 1px solid var(--doity-color-border-default);
  border-radius: var(--doity-radius-card);
  margin-bottom: var(--doity-spacing-10);
  padding: var(--doity-spacing-5);
}

.docs-code {
  background: var(--doity-color-background-primary);
  border-radius: var(--doity-radius-sm);
  font-size: var(--doity-font-size-sm);
  margin: var(--doity-spacing-3) 0 0;
  overflow-x: auto;
  padding: var(--doity-spacing-4);
}

.docs-heading {
  font-size: var(--doity-font-size-2xl);
  font-weight: var(--doity-font-weight-semibold);
  margin: var(--doity-spacing-8) 0 var(--doity-spacing-4);
}

.docs-grid {
  display: grid;
  gap: var(--doity-spacing-4);
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.docs-card {
  background: var(--doity-color-background-primary);
  border: 1px solid var(--doity-color-border-default);
  border-radius: var(--doity-radius-card);
  color: inherit;
  padding: var(--doity-spacing-5);
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.docs-card:hover {
  border-color: var(--doity-color-brand-300);
  box-shadow: var(--doity-shadow-sm);
}

.docs-card h3 {
  font-size: var(--doity-font-size-md);
  font-weight: var(--doity-font-weight-semibold);
  margin: 0 0 var(--doity-spacing-2);
}

.docs-card p {
  color: var(--doity-color-text-muted);
  font-size: var(--doity-font-size-sm);
  margin: 0;
}
</style>
