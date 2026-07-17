<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { closeOverlay, openOverlay } from '../utils/overlayCoordinator'

/**
 * Navigation Menu / mega menu (Figma Navigation Menu).
 * items: [{
 *   id?, label, href?,
 *   columns?: [[{ title, description?, href? }]]  // colunas do painel
 *   children?: [{ title, description?, href? }]   // auto-divide em 2 cols
 * }]
 */
const props = defineProps({
  items: { type: Array, required: false, default: () => [] },
  /** id/label do item aberto por padrão */
  defaultOpen: { type: String, required: false, default: undefined },
  /** Largura do painel (ex.: 600px) */
  panelWidth: { type: String, required: false, default: '600px' },
})

const emit = defineEmits(['select', 'open-change'])

const openId = ref(props.defaultOpen ?? null)
const root = ref()

function itemKey(item, index) {
  return item.id ?? item.label ?? String(index)
}

function hasPanel(item) {
  return Boolean(item.columns?.length || item.children?.length)
}

function isOpen(item, index) {
  return openId.value === itemKey(item, index)
}

function columnsFor(item) {
  if (item.columns?.length) return item.columns
  const kids = item.children || []
  const mid = Math.ceil(kids.length / 2)
  return [kids.slice(0, mid), kids.slice(mid)]
}

const openItem = computed(() => {
  if (openId.value == null) return null
  return props.items.find((item, i) => itemKey(item, i) === openId.value) || null
})

function close() {
  if (openId.value == null) return
  openId.value = null
  emit('open-change', null)
  closeOverlay(close)
}

function toggle(item, index) {
  const key = itemKey(item, index)
  if (!hasPanel(item)) {
    emit('select', item)
    close()
    return
  }
  const next = openId.value === key ? null : key
  openId.value = next
  emit('open-change', next)
  if (next) openOverlay(close)
  else closeOverlay(close)
}

function onLink(entry, parent) {
  emit('select', { ...entry, parent })
  close()
}

function onClickOutside(e) {
  if (root.value?.contains(e.target)) return
  close()
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
  closeOverlay(close)
})
</script>

<template>
  <nav
    ref="root"
    class="doity-nav-menu"
  >
    <div
      class="doity-nav-menu__list"
      role="menubar"
    >
      <template
        v-for="(item, index) in items"
        :key="itemKey(item, index)"
      >
        <a
          v-if="item.href && !hasPanel(item)"
          :href="item.href"
          class="doity-nav-menu__trigger"
          role="menuitem"
          @click="emit('select', item)"
        >
          <span>{{ item.label }}</span>
        </a>
        <button
          v-else
          type="button"
          class="doity-nav-menu__trigger"
          :class="{ 'doity-nav-menu__trigger--open': isOpen(item, index) }"
          role="menuitem"
          :aria-haspopup="hasPanel(item) ? 'true' : undefined"
          :aria-expanded="hasPanel(item) ? isOpen(item, index) : undefined"
          @click.stop="toggle(item, index)"
        >
          <span>{{ item.label }}</span>
          <span
            v-if="hasPanel(item)"
            class="doity-nav-menu__chevron"
            :class="{ 'doity-nav-menu__chevron--open': isOpen(item, index) }"
            aria-hidden="true"
          >
            <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
              <path
                d="M3 4.5 6 7.5 9 4.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
      </template>
    </div>

    <Transition name="doity-nav-menu-panel">
      <div
        v-if="openItem"
        class="doity-nav-menu__panel"
        :style="{ width: panelWidth }"
        role="menu"
      >
        <div
          v-for="(col, ci) in columnsFor(openItem)"
          :key="ci"
          class="doity-nav-menu__column"
        >
          <component
            :is="entry.href ? 'a' : 'button'"
            v-for="(entry, ei) in col"
            :key="entry.id ?? entry.title ?? ei"
            class="doity-nav-menu__link"
            :style="{ '--doity-nav-link-i': ci * 3 + ei }"
            :href="entry.href"
            :type="entry.href ? undefined : 'button'"
            role="menuitem"
            @click="onLink(entry, openItem)"
          >
            <span class="doity-nav-menu__link-title">{{ entry.title }}</span>
            <span
              v-if="entry.description"
              class="doity-nav-menu__link-desc"
            >{{ entry.description }}</span>
          </component>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.doity-nav-menu {
  --doity-nav-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --doity-nav-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  gap: 4px;
  position: relative;
}

.doity-nav-menu__list {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.doity-nav-menu__trigger {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: var(--doity-radius-md, 8px);
  color: var(--doity-color-text-primary, #09090b);
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  gap: 0;
  line-height: 1;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color 0.22s var(--doity-nav-ease);
  white-space: nowrap;
}

.doity-nav-menu__trigger:hover,
.doity-nav-menu__trigger--open {
  background: var(--doity-color-background-tertiary, #f4f4f5);
}

.doity-nav-menu__chevron {
  align-items: center;
  display: inline-flex;
  margin-left: 4px;
  transition: transform 0.28s var(--doity-nav-spring);
}

.doity-nav-menu__chevron--open {
  transform: rotate(180deg);
}

.doity-nav-menu__panel {
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e4e4e7);
  border-radius: var(--doity-radius-md, 8px);
  box-shadow:
    0 2px 4px -2px rgb(0 0 0 / 10%),
    0 4px 6px -1px rgb(0 0 0 / 10%);
  box-sizing: border-box;
  display: flex;
  gap: 4px;
  max-width: 100%;
  padding: 16px;
  transform-origin: top center;
}

.doity-nav-menu-panel-enter-active {
  animation: doity-nav-menu-panel-in 0.34s var(--doity-nav-spring) both;
}

.doity-nav-menu-panel-leave-active {
  animation: doity-nav-menu-panel-out 0.2s ease both;
}

.doity-nav-menu-panel-enter-active .doity-nav-menu__link {
  animation: doity-nav-menu-link-in 0.3s var(--doity-nav-ease) both;
  animation-delay: calc(var(--doity-nav-link-i, 0) * 32ms + 50ms);
}

@keyframes doity-nav-menu-panel-in {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes doity-nav-menu-panel-out {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-6px) scale(0.98);
  }
}

@keyframes doity-nav-menu-link-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.doity-nav-menu__column {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  min-width: 0;
}

.doity-nav-menu__link {
  align-items: flex-start;
  background: transparent;
  border: 0;
  border-radius: var(--doity-radius-md, 8px);
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: inherit;
  gap: 4px;
  padding: 12px 8px;
  text-align: left;
  text-decoration: none;
  transition: background-color 0.18s ease;
  width: 100%;
}

.doity-nav-menu__link:hover {
  background: var(--doity-color-background-tertiary, #f4f4f5);
}

.doity-nav-menu__link-title {
  color: var(--doity-color-text-primary, #09090b);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.doity-nav-menu__link-desc {
  color: var(--doity-color-text-secondary, #71717b);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  width: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .doity-nav-menu__trigger,
  .doity-nav-menu__chevron,
  .doity-nav-menu__link {
    transition: none;
  }

  .doity-nav-menu-panel-enter-active,
  .doity-nav-menu-panel-leave-active,
  .doity-nav-menu-panel-enter-active .doity-nav-menu__link {
    animation: none;
  }
}
</style>
