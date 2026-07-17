<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const entry = computed(() => useDoityRegistry().findBySlug(slug.value))

type ColorGroup = {
  name: string
  prefix: string
  description?: string
  shades: string[]
}

const colorGroups: ColorGroup[] = [
  {
    name: 'Cinza',
    prefix: 'gray',
    description: 'Base neutra do sistema — texto, campos, fundos e divisores.',
    shades: ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  },
  {
    name: 'Brand',
    prefix: 'brand',
    description: 'Cor principal da Doity.',
    shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
  },
  {
    name: 'Success',
    prefix: 'success',
    shades: ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Warning',
    prefix: 'warning',
    shades: ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Error',
    prefix: 'error',
    shades: ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'Info',
    prefix: 'info',
    shades: ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
]

const typeScale = [
  { name: 'Display 2xl', size: 'display-2xl', tracking: true },
  { name: 'Display xl', size: 'display-xl', tracking: true },
  { name: 'Display lg', size: 'display-lg', tracking: true },
  { name: 'Display md', size: 'display-md', tracking: true },
  { name: 'Display sm', size: 'display-sm' },
  { name: 'Display xs', size: 'display-xs' },
  { name: 'Text xl', size: 'xl', line: 'xl' },
  { name: 'Text lg', size: 'lg', line: 'lg' },
  { name: 'Text md', size: 'md', line: 'md' },
  { name: 'Text sm', size: 'sm', line: 'sm' },
  { name: 'Text xs', size: 'xs', line: 'xs' },
]

const weights = [
  { name: 'Regular', value: 'regular' },
  { name: 'Medium', value: 'medium' },
  { name: 'Semibold', value: 'semibold' },
  { name: 'Bold', value: 'bold' },
]

const shadows = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const

watchEffect(() => {
  if (!entry.value) {
    throw createError({ statusCode: 404, message: 'Foundation não encontrada' })
  }
})

function fontSizeVar(size: string) {
  return `var(--doity-font-size-${size})`
}

function lineHeightVar(item: (typeof typeScale)[number]) {
  if (item.line) return `var(--doity-font-lineHeight-${item.line})`
  return `var(--doity-font-lineHeight-${item.size})`
}
</script>

<template>
  <div v-if="entry" class="docs-page">
    <p class="docs-eyebrow">Foundations</p>
    <h1 class="docs-title">{{ entry.name }}</h1>
    <p class="docs-lead">{{ entry.description }}</p>

    <!-- Colors -->
    <template v-if="slug === 'colors'">
      <section v-for="group in colorGroups" :key="group.prefix" class="docs-section">
        <div class="docs-section__head">
          <h2 class="docs-section__title">{{ group.name }}</h2>
          <p v-if="group.description" class="docs-section__desc">{{ group.description }}</p>
        </div>
        <div class="color-grid">
          <div
            v-for="shade in group.shades"
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
          <div
            v-for="token in ['primary-default', 'primary-hover', 'primary-pressed', 'secondary-default', 'destructive-default']"
            :key="token"
            class="color-swatch"
          >
            <div class="color-swatch__preview" :style="{ background: `var(--doity-color-action-${token})` }" />
            <code class="color-swatch__token">action-{{ token }}</code>
          </div>
        </div>
      </section>
    </template>

    <!-- Typography -->
    <template v-else-if="slug === 'typography'">
      <section class="docs-section typeface">
        <p class="typeface__name">Inter</p>
        <p class="typeface__sample">Ag</p>
        <p class="typeface__charset">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
          abcdefghijklmnopqrstuvwxyz<br>
          0123456789 !@#$%^&amp;*()
        </p>
      </section>

      <section
        v-for="item in typeScale"
        :key="item.name"
        class="docs-section type-row"
      >
        <div class="type-row__meta">
          <span>{{ item.name }}</span>
          <span class="type-row__spec">
            {{ fontSizeVar(item.size) }}
            ·
            {{ lineHeightVar(item) }}
            <template v-if="item.tracking"> · letter-spacing -2%</template>
          </span>
        </div>
        <div class="type-row__samples">
          <p
            v-for="w in weights"
            :key="w.value"
            class="type-row__sample"
            :style="{
              fontSize: fontSizeVar(item.size),
              lineHeight: lineHeightVar(item),
              fontWeight: `var(--doity-font-weight-${w.value})`,
              letterSpacing: item.tracking ? 'var(--doity-font-letterSpacing-display)' : undefined,
            }"
          >
            {{ item.name }} · {{ w.name }}
          </p>
        </div>
      </section>
      <p class="docs-meta">Font family: <code>var(--doity-font-family-sans)</code> — Inter</p>
    </template>

    <!-- Shadows -->
    <template v-else-if="slug === 'shadows'">
      <div class="shadow-grid">
        <div
          v-for="s in shadows"
          :key="s"
          class="shadow-card"
          :style="{ boxShadow: `var(--doity-shadow-${s})` }"
        >
          shadow-{{ s }}
        </div>
      </div>
      <section class="docs-section" style="margin-top: var(--doity-spacing-8)">
        <h2 class="docs-section__title">Focus rings</h2>
        <div class="shadow-grid">
          <div class="shadow-card" :style="{ boxShadow: 'var(--doity-shadow-focused)' }">
            shadow-focused
          </div>
          <div class="shadow-card" :style="{ boxShadow: 'var(--doity-shadow-focused-error)' }">
            shadow-focused-error
          </div>
          <div class="shadow-card" :style="{ boxShadow: 'var(--doity-shadow-focus)' }">
            shadow-focus (brand)
          </div>
        </div>
      </section>
    </template>

    <!-- Tokens -->
    <template v-else-if="slug === 'tokens'">
      <p class="docs-lead">
        Tokens são variáveis CSS <code>--doity-*</code> geradas a partir de
        <code>tokens/tokens.json</code>, alinhadas ao Figma
        (Referência, Colors, Typography, Shadows).
        Atualize via <code>pnpm tokens:sync</code> ou edite o JSON e rode
        <code>pnpm tokens:generate</code>.
      </p>
      <div class="token-links">
        <DoityButton hierarchy="outline" @click="navigateTo('/docs/foundations/colors')">
          Cores
        </DoityButton>
        <DoityButton hierarchy="outline" @click="navigateTo('/docs/foundations/typography')">
          Tipografia
        </DoityButton>
        <DoityButton hierarchy="outline" @click="navigateTo('/docs/foundations/shadows')">
          Sombras
        </DoityButton>
      </div>
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
  font-size: var(--doity-font-size-display-sm);
  font-weight: var(--doity-font-weight-bold);
  line-height: var(--doity-font-lineHeight-display-sm);
  margin: 0 0 var(--doity-spacing-3);
}

.docs-lead {
  color: var(--doity-color-text-secondary);
  font-size: var(--doity-font-size-lg);
  line-height: var(--doity-font-lineHeight-lg);
  margin: 0 0 var(--doity-spacing-8);
}

.docs-section {
  margin-bottom: var(--doity-spacing-8);
}

.docs-section__head {
  margin-bottom: var(--doity-spacing-4);
  max-width: 400px;
}

.docs-section__title {
  font-size: var(--doity-font-size-lg);
  font-weight: var(--doity-font-weight-semibold);
  line-height: var(--doity-font-lineHeight-lg);
  margin: 0 0 var(--doity-spacing-1);
}

.docs-section__desc {
  color: var(--doity-color-gray-600);
  font-size: var(--doity-font-size-md);
  line-height: var(--doity-font-lineHeight-md);
  margin: 0;
}

.docs-meta {
  color: var(--doity-color-text-muted);
  font-size: var(--doity-font-size-sm);
}

.color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--doity-spacing-4);
}

.color-swatch {
  background: var(--doity-color-base-white);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--doity-radius-xl);
  box-shadow: var(--doity-shadow-lg);
  overflow: hidden;
  width: 120px;
}

.color-swatch__preview {
  height: 64px;
  width: 100%;
}

.color-swatch__label {
  display: block;
  font-size: var(--doity-font-size-md);
  font-weight: var(--doity-font-weight-medium);
  line-height: var(--doity-font-lineHeight-lg);
  padding: var(--doity-spacing-2) var(--doity-spacing-3) 0;
}

.color-swatch__token {
  color: var(--doity-color-gray-600);
  display: block;
  font-size: 10px;
  padding: 0 var(--doity-spacing-3) var(--doity-spacing-3);
  word-break: break-all;
}

.typeface__name {
  color: var(--doity-color-gray-900);
  font-size: var(--doity-font-size-display-lg);
  letter-spacing: var(--doity-font-letterSpacing-display);
  line-height: var(--doity-font-lineHeight-display-lg);
  margin: 0 0 var(--doity-spacing-4);
}

.typeface__sample {
  color: var(--doity-color-gray-900);
  font-size: 112px;
  line-height: 1;
  margin: 0 0 var(--doity-spacing-4);
}

.typeface__charset {
  color: var(--doity-color-gray-900);
  font-size: var(--doity-font-size-display-lg);
  letter-spacing: var(--doity-font-letterSpacing-display);
  line-height: var(--doity-font-lineHeight-display-lg);
  margin: 0;
}

.type-row {
  border-top: 1px solid var(--doity-color-gray-300);
  padding-top: var(--doity-spacing-4);
}

.type-row__meta {
  color: var(--doity-color-gray-600);
  display: flex;
  flex-wrap: wrap;
  font-size: var(--doity-font-size-md);
  gap: var(--doity-spacing-2);
  justify-content: space-between;
  margin-bottom: var(--doity-spacing-4);
}

.type-row__spec {
  font-family: ui-monospace, monospace;
  font-size: var(--doity-font-size-sm);
}

.type-row__samples {
  display: grid;
  gap: var(--doity-spacing-3);
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
}

.type-row__sample {
  color: var(--doity-color-gray-900);
  margin: 0;
}

.shadow-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--doity-spacing-6);
}

.shadow-card {
  background: var(--doity-color-background-primary);
  border: 1px solid var(--doity-color-gray-300);
  border-radius: var(--doity-radius-xl);
  color: var(--doity-color-gray-900);
  font-size: var(--doity-font-size-lg);
  font-weight: var(--doity-font-weight-medium);
  height: 160px;
  max-width: 200px;
  padding: var(--doity-spacing-6);
  width: 100%;
}

.token-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--doity-spacing-3);
}
</style>
