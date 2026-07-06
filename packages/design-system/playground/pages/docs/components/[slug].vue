<script setup lang="ts">
import { componentDemos } from '~/components/component-demos'

definePageMeta({ layout: 'docs' })

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const entry = computed(() => useDoityRegistry().findBySlug(slug.value))
const demo = computed(() => componentDemos[slug.value])

watchEffect(() => {
  if (!entry.value) {
    throw createError({ statusCode: 404, message: 'Componente não encontrado' })
  }
})
</script>

<template>
  <div v-if="entry" class="docs-page">
    <p class="docs-eyebrow">Components</p>
    <h1 class="docs-title">{{ entry.name }}</h1>
    <p class="docs-lead">{{ entry.description }}</p>
    <p v-if="entry.component" class="docs-meta">
      Componente: <code>&lt;{{ entry.component }}&gt;</code>
      · Figma: <code>{{ entry.figmaPage }}</code>
    </p>

    <section class="docs-section">
      <h2 class="docs-section__title">Preview</h2>
      <div class="docs-preview">
        <component :is="demo" v-if="demo" />
        <p v-else class="docs-preview__empty">Preview em breve — veja no Storybook.</p>
      </div>
    </section>

    <section v-if="entry.component" class="docs-section">
      <h2 class="docs-section__title">Usage</h2>
      <pre class="docs-code"><code>&lt;{{ entry.component }}&gt;
  ...
&lt;/{{ entry.component }}&gt;</code></pre>
      <p class="docs-storybook">
        Veja todas as variações no
        <a href="http://localhost:6006" target="_blank" rel="noopener">Storybook ↗</a>
        em <code>Components/{{ entry.name }}</code>
      </p>
    </section>
  </div>
</template>

<style scoped>
.docs-eyebrow {
  color: var(--doity-color-text-brand);
  font-size: var(--doity-font-size-sm);
  font-weight: var(--doity-font-weight-medium);
  margin: 0 0 var(--doity-spacing-2);
  text-transform: uppercase;
}

.docs-title {
  font-size: var(--doity-font-size-3xl);
  font-weight: var(--doity-font-weight-bold);
  margin: 0 0 var(--doity-spacing-3);
}

.docs-lead {
  color: var(--doity-color-text-secondary);
  font-size: var(--doity-font-size-lg);
  margin: 0 0 var(--doity-spacing-4);
}

.docs-meta {
  color: var(--doity-color-text-muted);
  font-size: var(--doity-font-size-sm);
  margin: 0 0 var(--doity-spacing-8);
}

.docs-meta code {
  background: var(--doity-color-background-tertiary);
  border-radius: var(--doity-radius-xs);
  font-size: var(--doity-font-size-xs);
  padding: 2px 6px;
}

.docs-section {
  margin-bottom: var(--doity-spacing-8);
}

.docs-section__title {
  font-size: var(--doity-font-size-xl);
  font-weight: var(--doity-font-weight-semibold);
  margin: 0 0 var(--doity-spacing-4);
}

.docs-preview {
  background: var(--doity-color-background-secondary);
  border: 1px solid var(--doity-color-border-default);
  border-radius: var(--doity-radius-card);
  padding: var(--doity-spacing-8);
}

.docs-preview__empty {
  color: var(--doity-color-text-muted);
  margin: 0;
  text-align: center;
}

.docs-code {
  background: var(--doity-color-background-secondary);
  border-radius: var(--doity-radius-sm);
  font-size: var(--doity-font-size-sm);
  overflow-x: auto;
  padding: var(--doity-spacing-4);
}

.docs-storybook {
  color: var(--doity-color-text-muted);
  font-size: var(--doity-font-size-sm);
  margin: var(--doity-spacing-3) 0 0;
}

.docs-storybook a {
  color: var(--doity-color-text-brand);
}

.docs-storybook code {
  background: var(--doity-color-background-tertiary);
  border-radius: var(--doity-radius-xs);
  font-size: var(--doity-font-size-xs);
  padding: 2px 6px;
}
</style>
