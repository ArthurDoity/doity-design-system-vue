<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { closeOverlay, openOverlay } from '../utils/overlayCoordinator'

const props = defineProps({
  items: { type: Array, required: false, default: () => [] },
  align: { type: String, required: false, default: 'left' },
  /** Altura máxima do menu (ex.: '356px') — ativa scroll */
  maxHeight: { type: String, required: false, default: '' },
  /** Mostra chevron inferior quando o menu é scrollável (Figma) */
  scrollHint: { type: Boolean, required: false, default: true },
})

const emit = defineEmits(['select'])
const open = ref(false)
const root = ref()
const triggerRef = ref()
const menuRef = ref()
const listRef = ref()
const menuStyle = ref({})
const canScrollMore = ref(false)

function updateScrollHint() {
  const el = listRef.value
  if (!el || !props.maxHeight) {
    canScrollMore.value = false
    return
  }
  canScrollMore.value = el.scrollHeight - el.scrollTop - el.clientHeight > 4
}

function closeMenu() {
  open.value = false
}

function updateMenuPosition() {
  const el = triggerRef.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const style = {
    position: 'fixed',
    top: `${rect.bottom + 5}px`,
    minWidth: `${Math.max(rect.width, 180)}px`,
    zIndex: 1000,
  }

  if (props.align === 'right') {
    style.right = `${window.innerWidth - rect.right}px`
    style.left = 'auto'
  }
  else {
    style.left = `${rect.left}px`
    style.right = 'auto'
  }

  if (props.maxHeight) {
    style.maxHeight = props.maxHeight
  }

  menuStyle.value = style
}

function toggle() {
  if (open.value) {
    closeMenu()
    closeOverlay(closeMenu)
    return
  }

  openOverlay(closeMenu)
  open.value = true
  nextTick(() => {
    updateMenuPosition()
    updateScrollHint()
  })
}

function select(item) {
  if (item.disabled || item.section || item.divider) return
  emit('select', item)
  if (!item.checkbox) {
    closeMenu()
    closeOverlay(closeMenu)
  }
}

function onClickOutside(e) {
  if (root.value?.contains(e.target) || menuRef.value?.contains(e.target)) return
  closeMenu()
  closeOverlay(closeMenu)
}

watch(open, (isOpen, _, onCleanup) => {
  if (!isOpen) return

  updateMenuPosition()
  nextTick(() => updateScrollHint())
  window.addEventListener('scroll', updateMenuPosition, true)
  window.addEventListener('resize', updateMenuPosition)

  onCleanup(() => {
    window.removeEventListener('scroll', updateMenuPosition, true)
    window.removeEventListener('resize', updateMenuPosition)
  })
})

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  closeOverlay(closeMenu)
  window.removeEventListener('scroll', updateMenuPosition, true)
  window.removeEventListener('resize', updateMenuPosition)
})
</script>

<template>
  <div ref="root" :class="['doity-dropdown', { 'doity-dropdown--open': open }]">
    <div ref="triggerRef" class="doity-dropdown__trigger" @click.stop="toggle">
      <slot name="trigger">
        <button type="button" class="doity-dropdown__trigger-btn">
          <span>Menu</span>
          <span class="doity-chevron-down" aria-hidden="true" />
        </button>
      </slot>
    </div>

    <Teleport to="body">
      <div
        v-if="open"
        ref="menuRef"
        :class="[
          'doity-dropdown__menu',
          `doity-dropdown__menu--${props.align}`,
          { 'doity-dropdown__menu--scroll': !!props.maxHeight },
        ]"
        :style="menuStyle"
        role="menu"
      >
        <div
          ref="listRef"
          class="doity-dropdown__list"
          @scroll="updateScrollHint"
        >
          <slot>
            <template v-for="(item, i) in props.items" :key="i">
              <div
                v-if="item.divider"
                class="doity-dropdown__divider"
                role="separator"
              />

              <div
                v-else-if="item.section"
                class="doity-dropdown__section"
                role="presentation"
              >
                {{ item.label }}
              </div>

              <button
                v-else
                type="button"
                class="doity-dropdown__item"
                :class="{
                  'doity-dropdown__item--disabled': item.disabled,
                  'doity-dropdown__item--destructive': item.destructive,
                  'doity-dropdown__item--selected': item.selected,
                  'doity-dropdown__item--with-leading': item.avatar || item.icon || item.checkbox,
                }"
                role="menuitem"
                :aria-checked="item.checkbox ? !!item.selected : undefined"
                :disabled="item.disabled"
                @click="select(item)"
              >
                <span
                  v-if="item.checkbox"
                  class="doity-dropdown__checkbox"
                  :class="{ 'doity-dropdown__checkbox--checked': item.selected }"
                  aria-hidden="true"
                >
                  <svg
                    v-if="item.selected"
                    class="doity-dropdown__checkbox-check"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2.5 6.2L4.8 8.5L9.5 3.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>

                <img
                  v-else-if="item.avatar"
                  class="doity-dropdown__avatar"
                  :src="item.avatar"
                  :alt="item.label"
                  width="16"
                  height="16"
                >

                <span
                  v-else-if="item.icon"
                  class="doity-dropdown__icon"
                  aria-hidden="true"
                >
                  <slot name="item-icon" :item="item">
                    <svg viewBox="0 0 16 16" fill="none" class="doity-dropdown__icon-svg">
                      <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M2.5 13.5c.8-2.2 2.8-3.5 5.5-3.5s4.7 1.3 5.5 3.5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </slot>
                </span>

                <span class="doity-dropdown__item-label">{{ item.label }}</span>

                <svg
                  v-if="!item.checkbox"
                  class="doity-dropdown__check"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3.5 8.5L6.5 11.5L12.5 4.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </template>
          </slot>
        </div>

        <div
          v-if="props.maxHeight && props.scrollHint && canScrollMore"
          class="doity-dropdown__scroll-hint"
          aria-hidden="true"
        >
          <span class="doity-chevron-down" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.doity-dropdown {
  display: inline-block;
  font-family: var(--doity-font-family-sans);
  position: relative;
}
.doity-dropdown__trigger-btn {
  align-items: center;
  background: var(--doity-color-background-primary);
  border: 1px solid var(--doity-color-border-strong);
  border-radius: var(--doity-radius-button-md);
  box-shadow: var(--doity-shadow-xs);
  color: var(--doity-color-text-primary);
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: var(--doity-font-size-xs);
  font-weight: var(--doity-font-weight-medium);
  gap: var(--doity-spacing-2);
  height: var(--doity-component-button-height-md);
  line-height: var(--doity-font-lineHeight-xs);
  padding: 0 var(--doity-spacing-3);
  transition:
    background-color 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.doity-dropdown__trigger-btn:hover {
  background: var(--doity-color-background-secondary);
}
.doity-dropdown__trigger-btn:focus,
.doity-dropdown--open .doity-dropdown__trigger-btn {
  border-color: #717680;
  outline: none;
}

/* Figma: surgimento do menu */
.doity-dropdown__menu {
  animation: doity-dropdown-menu-in 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  background: var(--doity-color-background-primary);
  border: 1px solid var(--doity-color-border-default);
  border-radius: var(--doity-radius-md, 8px);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 10%),
    0 2px 4px -2px rgb(0 0 0 / 10%);
  box-sizing: border-box;
  min-width: var(--doity-component-dropdown-width, 180px);
  padding: var(--doity-spacing-1, 4px);
  transform-origin: top center;
  width: max-content;
}
.doity-dropdown__menu--scroll {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
}
.doity-dropdown__list {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
}
.doity-dropdown__menu--scroll .doity-dropdown__list {
  padding: var(--doity-spacing-1, 4px);
  padding-bottom: 0;
}
.doity-dropdown__scroll-hint {
  align-items: center;
  background: linear-gradient(to top, var(--doity-color-background-primary) 60%, transparent);
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  padding: 6px var(--doity-spacing-2, 8px);
  pointer-events: none;
}

.doity-dropdown__section {
  color: var(--doity-color-text-secondary);
  font-size: 10px;
  font-weight: var(--doity-font-weight-regular);
  line-height: var(--doity-font-lineHeight-xs);
  padding: 6px var(--doity-spacing-2);
}

.doity-dropdown__divider {
  background: var(--doity-color-border-default, #e5e5e5);
  flex-shrink: 0;
  height: 1px;
  margin: var(--doity-spacing-1, 4px) 0;
  width: 100%;
}

.doity-dropdown__item {
  align-items: center;
  background: transparent;
  border: none;
  border-radius: var(--doity-radius-sm, 6px);
  box-sizing: border-box;
  color: var(--doity-color-text-primary);
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: var(--doity-font-size-xs);
  font-weight: var(--doity-font-weight-regular);
  gap: var(--doity-spacing-2, 8px);
  justify-content: flex-start;
  line-height: var(--doity-font-lineHeight-xs);
  min-height: var(--doity-component-dropdown-itemHeight, 28px);
  padding: 6px var(--doity-spacing-2, 8px);
  padding-right: var(--doity-spacing-8, 32px);
  text-align: left;
  transition: background-color 0.18s ease;
  width: 100%;
}
.doity-dropdown__item--with-leading {
  padding-right: var(--doity-spacing-2, 8px);
}
.doity-dropdown__item-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Hover leve — sem check nem deslocamento (não compete com selected) */
.doity-dropdown__item:hover:not(:disabled):not(.doity-dropdown__item--selected) {
  background: #fafafa;
}
.doity-dropdown__item--selected {
  background: #f5f5f5;
  padding-right: var(--doity-spacing-2, 8px);
}
.doity-dropdown__item--selected:hover {
  background: #f5f5f5;
}
.doity-dropdown__item--destructive {
  color: var(--doity-color-error-600);
}
.doity-dropdown__item--disabled {
  color: var(--doity-color-text-disabled);
  cursor: not-allowed;
  opacity: 0.5;
}

.doity-dropdown__check {
  color: var(--doity-color-text-primary);
  flex-shrink: 0;
  opacity: 0;
  transform: scale(0.92);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.doity-dropdown__item--selected .doity-dropdown__check {
  opacity: 1;
  transform: scale(1);
}

.doity-dropdown__avatar,
.doity-dropdown__icon,
.doity-dropdown__checkbox {
  flex-shrink: 0;
  height: 16px;
  width: 16px;
}
.doity-dropdown__avatar {
  border-radius: 999px;
  object-fit: cover;
}
.doity-dropdown__icon {
  align-items: center;
  color: var(--doity-color-text-secondary);
  display: inline-flex;
  justify-content: center;
}
.doity-dropdown__icon-svg {
  display: block;
  height: 16px;
  width: 16px;
}
.doity-dropdown__checkbox {
  align-items: center;
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-strong, #d4d4d4);
  border-radius: 6px;
  box-shadow: 0 1px 2px rgb(10 13 18 / 10%);
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  transition:
    background-color 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}
.doity-dropdown__checkbox--checked {
  background: var(--doity-color-background-brand, #fff1f2);
  border-color: var(--doity-color-border-focus, #ff2b34);
}
.doity-dropdown__checkbox-check {
  color: var(--doity-color-brand-500, #ff2b34);
  height: 10px;
  width: 10px;
}

@keyframes doity-dropdown-menu-in {
  0% {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .doity-dropdown__menu {
    animation: none;
  }
  .doity-dropdown__item,
  .doity-dropdown__check,
  .doity-dropdown__trigger-btn,
  .doity-dropdown__checkbox {
    transition: none;
  }
}
</style>
