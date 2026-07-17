<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { closeOverlay, openOverlay } from '../utils/overlayCoordinator'

/**
 * Menubar horizontal (Figma Menubar).
 * items: [{
 *   id?, label,
 *   items?: [{ id?, label, shortcut?, disabled?, submenu?, divider? }]
 * }]
 */
const props = defineProps({
  items: { type: Array, required: false, default: () => [] },
  /** Mantém um menu aberto (útil em stories) */
  defaultOpen: { type: String, required: false, default: undefined },
})

const emit = defineEmits(['select', 'open-change'])

const openId = ref(props.defaultOpen ?? null)
const root = ref()

function itemKey(item, index) {
  return item.id ?? item.label ?? String(index)
}

function isOpen(item, index) {
  return openId.value === itemKey(item, index)
}

function close() {
  if (openId.value == null) return
  openId.value = null
  emit('open-change', null)
  closeOverlay(close)
}

function toggle(item, index) {
  const key = itemKey(item, index)
  if (!item.items?.length) {
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

function onEntry(entry, parent) {
  if (entry.divider || entry.disabled) return
  emit('select', { ...entry, parent })
  if (!entry.submenu) close()
}

/** Índice visual (pula divisores) para stagger da animação */
function entryIndex(entries, ei) {
  let n = 0
  for (let i = 0; i < ei; i++) {
    if (!entries[i]?.divider) n++
  }
  return n
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
  <div
    ref="root"
    class="doity-menubar"
    role="menubar"
  >
    <div
      v-for="(item, index) in items"
      :key="itemKey(item, index)"
      class="doity-menubar__item-wrap"
    >
      <button
        type="button"
        class="doity-menubar__trigger"
        :class="{ 'doity-menubar__trigger--open': isOpen(item, index) }"
        role="menuitem"
        :aria-haspopup="item.items?.length ? 'menu' : undefined"
        :aria-expanded="item.items?.length ? isOpen(item, index) : undefined"
        @click.stop="toggle(item, index)"
      >
        {{ item.label }}
      </button>

      <Transition name="doity-menubar-menu">
        <div
          v-if="item.items?.length && isOpen(item, index)"
          class="doity-menubar__menu"
          role="menu"
        >
          <template
            v-for="(entry, ei) in item.items"
            :key="entry.id ?? entry.label ?? ei"
          >
            <div
              v-if="entry.divider"
              class="doity-menubar__divider"
              role="separator"
            />
            <button
              v-else
              type="button"
              class="doity-menubar__entry"
              :class="{
                'doity-menubar__entry--disabled': entry.disabled,
                'doity-menubar__entry--submenu': entry.submenu,
              }"
              :style="{ '--doity-menubar-entry-i': entryIndex(item.items, ei) }"
              role="menuitem"
              :disabled="entry.disabled"
              :aria-disabled="entry.disabled || undefined"
              @click.stop="onEntry(entry, item)"
            >
              <span class="doity-menubar__entry-label">{{ entry.label }}</span>
              <span
                v-if="entry.shortcut"
                class="doity-menubar__shortcut"
              >{{ entry.shortcut }}</span>
              <span
                v-else-if="entry.submenu"
                class="doity-menubar__chevron"
                aria-hidden="true"
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                  <path
                    d="M6 4.5 10 8 6 11.5"
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
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.doity-menubar {
  --doity-menubar-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --doity-menubar-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e4e4e7);
  border-radius: var(--doity-radius-md, 8px);
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
  box-sizing: border-box;
  display: inline-flex;
  font-family: var(--doity-font-family-sans);
  gap: 4px;
  padding: 4px;
  position: relative;
}

.doity-menubar__item-wrap {
  position: relative;
}

.doity-menubar__trigger {
  background: transparent;
  border: 0;
  border-radius: var(--doity-radius-sm, 6px);
  color: var(--doity-color-text-primary, #09090b);
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding: 4px 8px;
  transition: background-color 0.22s var(--doity-menubar-ease);
  white-space: nowrap;
}

.doity-menubar__trigger:hover,
.doity-menubar__trigger--open {
  background: var(--doity-color-background-tertiary, #f4f4f5);
}

.doity-menubar__menu {
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e4e4e7);
  border-radius: var(--doity-radius-md, 8px);
  box-shadow:
    0 2px 4px -2px rgb(0 0 0 / 10%),
    0 4px 6px -1px rgb(0 0 0 / 10%);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  left: 0;
  min-width: 192px;
  padding: 4px 0;
  position: absolute;
  top: calc(100% + 4px);
  transform-origin: top left;
  z-index: 50;
}

.doity-menubar-menu-enter-active {
  animation: doity-menubar-menu-in 0.32s var(--doity-menubar-spring) both;
}

.doity-menubar-menu-leave-active {
  animation: doity-menubar-menu-out 0.18s ease both;
}

.doity-menubar-menu-enter-active .doity-menubar__entry {
  animation: doity-menubar-entry-in 0.28s var(--doity-menubar-ease) both;
  animation-delay: calc(var(--doity-menubar-entry-i, 0) * 28ms + 40ms);
}

@keyframes doity-menubar-menu-in {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes doity-menubar-menu-out {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-6px) scale(0.98);
  }
}

@keyframes doity-menubar-entry-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.doity-menubar__entry {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: var(--doity-radius-sm, 6px);
  color: var(--doity-color-text-primary, #09090b);
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  gap: 8px;
  height: 32px;
  line-height: 20px;
  margin: 0 4px;
  padding: 6px 8px;
  text-align: left;
  transition: background-color 0.18s ease;
  width: calc(100% - 8px);
}

.doity-menubar__entry:hover:not(.doity-menubar__entry--disabled) {
  background: var(--doity-color-background-tertiary, #f4f4f5);
}

.doity-menubar__entry--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.doity-menubar__entry-label {
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doity-menubar__shortcut {
  color: var(--doity-color-text-secondary, #71717b);
  flex-shrink: 0;
  font-size: 12px;
  line-height: 16px;
}

.doity-menubar__chevron {
  align-items: center;
  color: var(--doity-color-text-secondary, #71717b);
  display: inline-flex;
  flex-shrink: 0;
  transition: transform 0.2s var(--doity-menubar-ease);
}

.doity-menubar__entry:hover .doity-menubar__chevron {
  transform: translateX(2px);
}

.doity-menubar__divider {
  background: var(--doity-color-border-default, #e4e4e7);
  height: 1px;
  margin: 4px 0;
  width: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .doity-menubar__trigger,
  .doity-menubar__entry,
  .doity-menubar__chevron {
    transition: none;
  }

  .doity-menubar-menu-enter-active,
  .doity-menubar-menu-leave-active,
  .doity-menubar-menu-enter-active .doity-menubar__entry {
    animation: none;
  }
}
</style>
