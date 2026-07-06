<script setup lang="ts">
const route = useRoute()
const { foundations, components } = useDoityRegistry()

const isActive = (slug: string) => route.path.includes(slug)
</script>

<template>
  <div class="docs-layout">
    <aside class="docs-sidebar">
      <div class="docs-sidebar__brand">
        <NuxtLink to="/docs" class="docs-sidebar__logo">
          Doity DS
        </NuxtLink>
        <span class="docs-sidebar__version">v0.1.0</span>
      </div>

      <nav class="docs-nav">
        <p class="docs-nav__heading">Getting started</p>
        <NuxtLink to="/docs" class="docs-nav__link" :class="{ active: route.path === '/docs' }">
          Introduction
        </NuxtLink>

        <p class="docs-nav__heading">Foundations</p>
        <NuxtLink
          v-for="item in foundations"
          :key="item.slug"
          :to="`/docs/foundations/${item.slug}`"
          class="docs-nav__link"
          :class="{ active: isActive(item.slug) }"
        >
          {{ item.name }}
        </NuxtLink>

        <p class="docs-nav__heading">Components</p>
        <NuxtLink
          v-for="item in components"
          :key="item.slug"
          :to="`/docs/components/${item.slug}`"
          class="docs-nav__link"
          :class="{ active: isActive(item.slug) }"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>

      <div class="docs-sidebar__footer">
        <a href="http://localhost:6006" target="_blank" rel="noopener" class="docs-nav__link">
          Storybook ↗
        </a>
      </div>
    </aside>

    <main class="docs-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.docs-layout {
  display: flex;
  min-height: 100vh;
}

.docs-sidebar {
  background: var(--doity-color-background-secondary);
  border-right: 1px solid var(--doity-color-border-default);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  width: 280px;
}

.docs-sidebar__brand {
  align-items: baseline;
  border-bottom: 1px solid var(--doity-color-border-default);
  display: flex;
  gap: var(--doity-spacing-2);
  padding: var(--doity-spacing-5) var(--doity-spacing-5) var(--doity-spacing-4);
}

.docs-sidebar__logo {
  color: var(--doity-color-text-brand);
  font-size: var(--doity-font-size-lg);
  font-weight: var(--doity-font-weight-bold);
  text-decoration: none;
}

.docs-sidebar__version {
  color: var(--doity-color-text-muted);
  font-size: var(--doity-font-size-xs);
}

.docs-nav {
  flex: 1;
  padding: var(--doity-spacing-4) var(--doity-spacing-3);
}

.docs-nav__heading {
  color: var(--doity-color-text-muted);
  font-size: var(--doity-font-size-xs);
  font-weight: var(--doity-font-weight-semibold);
  letter-spacing: 0.05em;
  margin: var(--doity-spacing-4) var(--doity-spacing-2) var(--doity-spacing-2);
  text-transform: uppercase;
}

.docs-nav__heading:first-child {
  margin-top: 0;
}

.docs-nav__link {
  border-radius: var(--doity-radius-sm);
  color: var(--doity-color-text-secondary);
  display: block;
  font-size: var(--doity-font-size-sm);
  padding: var(--doity-spacing-2) var(--doity-spacing-3);
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.docs-nav__link:hover {
  background: var(--doity-color-background-tertiary);
  color: var(--doity-color-text-primary);
}

.docs-nav__link.active {
  background: var(--doity-color-background-brand);
  color: var(--doity-color-brand-700);
  font-weight: var(--doity-font-weight-medium);
}

.docs-sidebar__footer {
  border-top: 1px solid var(--doity-color-border-default);
  padding: var(--doity-spacing-4) var(--doity-spacing-3);
}

.docs-main {
  flex: 1;
  max-width: 960px;
  min-width: 0;
  padding: var(--doity-spacing-10) var(--doity-spacing-10) var(--doity-spacing-16);
}
</style>
