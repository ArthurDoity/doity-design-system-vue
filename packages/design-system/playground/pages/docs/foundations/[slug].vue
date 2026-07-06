<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const entry = computed(() => useDoityRegistry().findBySlug(slug.value))

const colorGroups = [
  { name: 'Brand', prefix: 'brand' },
  { name: 'Gray', prefix: 'gray' },
  { name: 'Success', prefix: 'success' },
  { name: 'Warning', prefix: 'warning' },
  { name: 'Error', prefix: 'error' },
]

const brandShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

watchEffect(() => {
  if (!entry.value) {
    throw createError({ statusCode: 404, message: 'Foundation não encontrada' })
  }
})
</script>

<template>
  <div v-if="entry" class="docs-page">
    <p class="docs-eyebrow">Foundations</p>
    <h1 class="docs-title">{{ entry.name }}</h1>
    <p class="docs-lead">{{ entry.description }}</p>

  <!-- Colors -->
  <template v-if="slug === 'colors'">
    <section v-for="group in colorGroups" :key="group.prefix" class="docs-section">
      <h2 class="docs-section__title">{{ group.name }}</h2>
      <div class="color-grid">
        <div
          v-for="shade in brandShades"
          :key="shade"
          class="color-swatch"
        >
          <div
            class="color-swatch__preview"
            :style="{ background: `var(--doity-color-${group.prefix}-${shade})` }"
          />
          <span class="color-swatch__label">{{ shade }}</span>
          <code class="color-swatch__token">--doity-color-{{ group.prefix }}-{{ shade }}</code>
        </div>
      </div>
    </section>

    <section class="docs-section">
      <h2 class="docs-section__title">Action</h2>
      <div class="color-grid">
        <div v-for="token in ['primary-default', 'primary-hover', 'primary-pressed', 'secondary-default', 'destructive-default']" :key="token" class="color-swatch">
          <div class="color-swatch__preview" :style="{ background: `var(--doity-color-action-${token})` }" />
          <code class="color-swatch__token">action-{{ token }}</code>
        </div>
      </div>
    </section>
  </template>

  <!-- Typography -->
  <template v-else-if="slug === 'typography'">
    <section class="docs-section">
      <p style="font-size:var(--doity-font-size-4xl);font-weight:var(--doity-font-weight-bold);margin:0 0 8px">Display 4xl / Bold</p>
      <p style="font-size:var(--doity-font-size-3xl);font-weight:var(--doity-font-weight-semibold);margin:0 0 8px">Heading 3xl / Semibold</p>
      <p style="font-size:var(--doity-font-size-2xl);font-weight:var(--doity-font-weight-semibold);margin:0 0 8px">Heading 2xl</p>
      <p style="font-size:var(--doity-font-size-xl);margin:0 0 8px">Heading xl</p>
      <p style="font-size:var(--doity-font-size-lg);margin:0 0 8px">Body lg</p>
      <p style="font-size:var(--doity-font-size-md);margin:0 0 8px">Body md (default)</p>
      <p style="font-size:var(--doity-font-size-sm);color:var(--doity-color-text-secondary);margin:0">Body sm / secondary</p>
      <p style="font-size:var(--doity-font-size-xs);color:var(--doity-color-text-muted);margin:8px 0 0">Caption xs / muted</p>
    </section>
    <p class="docs-meta">Font family: <code>var(--doity-font-family-sans)</code> — Inter</p>
  </template>

  <!-- Shadows -->
  <template v-else-if="slug === 'shadows'">
    <div class="shadow-grid">
      <div v-for="s in ['xs', 'sm', 'md', 'lg', 'xl']" :key="s" class="shadow-card" :style="{ boxShadow: `var(--doity-shadow-${s})` }">
        shadow-{{ s }}
      </div>
    </div>
  </template>

  <!-- Tokens -->
  <template v-else-if="slug === 'tokens'">
    <p class="docs-lead">
      Tokens são variáveis CSS centralizadas. Atualize via
      <code>pnpm tokens:sync</code> a partir do Figma.
    </p>
    <DoityButton hierarchy="outline" @click="navigateTo('/docs/foundations/colors')">
      Ver cores
    </DoityButton>
  </template>
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
  margin: 0 0 var(--doity-spacing-8);
}

.docs-section {
  margin-bottom: var(--doity-spacing-8);
}

.docs-section__title {
  font-size: var(--doity-font-size-lg);
  font-weight: var(--doity-font-weight-semibold);
  margin: 0 0 var(--doity-spacing-4);
}

.docs-meta {
  color: var(--doity-color-text-muted);
  font-size: var(--doity-font-size-sm);
}

.color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--doity-spacing-3);
}

.color-swatch {
  width: 100px;
}

.color-swatch__preview {
  border: 1px solid var(--doity-color-border-default);
  border-radius: var(--doity-radius-sm);
  height: 56px;
  margin-bottom: var(--doity-spacing-1);
}

.color-swatch__label {
  display: block;
  font-size: var(--doity-font-size-xs);
  font-weight: var(--doity-font-weight-medium);
}

.color-swatch__token {
  color: var(--doity-color-text-muted);
  font-size: 10px;
  word-break: break-all;
}

.shadow-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--doity-spacing-6);
}

.shadow-card {
  align-items: center;
  background: var(--doity-color-background-primary);
  border-radius: var(--doity-radius-card);
  display: flex;
  height: 100px;
  justify-content: center;
  width: 160px;
}
</style>
