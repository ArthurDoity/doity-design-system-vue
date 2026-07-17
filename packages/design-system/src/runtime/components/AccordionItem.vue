<script setup>
import { computed, inject, onMounted, ref, useId, watch } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  open: { type: Boolean, required: false, default: undefined },
})

const emit = defineEmits(['update:open'])

const accordion = inject('doity-accordion', null)
const itemId = `accordion-${useId()}`
const itemKey = computed(() => props.value || itemId)

const uncontrolled = ref(!!props.open)
const isControlled = computed(() => props.open !== undefined && !accordion)

const isOpen = computed(() => {
  if (accordion) return accordion.openItems.value.has(itemKey.value)
  if (isControlled.value) return !!props.open
  return uncontrolled.value
})

function setOpen(next) {
  if (props.disabled) return
  if (accordion) accordion.toggle(itemKey.value, next)
  else uncontrolled.value = next
  emit('update:open', next)
}

function toggle() {
  setOpen(!isOpen.value)
}

onMounted(() => {
  if (props.open && accordion) accordion.toggle(itemKey.value, true)
})

watch(
  () => props.open,
  (v) => {
    if (v === undefined) return
    if (accordion) accordion.toggle(itemKey.value, !!v)
    else uncontrolled.value = !!v
  },
)
</script>

<template>
  <div
    class="doity-accordion-item"
    :class="{
      'doity-accordion-item--open': isOpen,
      'doity-accordion-item--disabled': disabled,
    }"
  >
    <button
      :id="`${itemId}-trigger`"
      type="button"
      class="doity-accordion-item__trigger"
      :disabled="disabled"
      :aria-expanded="isOpen"
      :aria-controls="`${itemId}-panel`"
      @click="toggle"
    >
      <span class="doity-accordion-item__title">{{ title }}</span>
      <span class="doity-accordion-item__icon" aria-hidden="true">
        <!-- Chevron Lucide — stroke #0A0A0A -->
        <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>

    <div
      :id="`${itemId}-panel`"
      class="doity-accordion-item__panel"
      role="region"
      :aria-labelledby="`${itemId}-trigger`"
      :aria-hidden="!isOpen"
    >
      <div class="doity-accordion-item__panel-inner">
        <div class="doity-accordion-item__content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doity-accordion-item {
  background: var(--doity-color-background-primary, #fff);
  border-bottom: 1px solid var(--doity-color-border-default, #e5e5e5);
}

.doity-accordion-item__trigger {
  align-items: center;
  background: none;
  border: none;
  color: var(--doity-color-text-primary, #0a0a0a);
  cursor: pointer;
  display: flex;
  font-family: var(--doity-font-family-sans);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-medium, 500);
  gap: 10px;
  justify-content: space-between;
  line-height: var(--doity-font-lineHeight-md, 20px);
  padding: var(--doity-component-accordion-paddingY, 16px) 0;
  text-align: left;
  width: 100%;
}

.doity-accordion-item__trigger:focus-visible {
  outline: 2px solid var(--doity-color-border-brand, #ff2b34);
  outline-offset: 2px;
}

.doity-accordion-item__title {
  flex: 1 1 0;
  min-width: 0;
  padding-right: 10px;
}

.doity-accordion-item--disabled .doity-accordion-item__trigger {
  color: var(--doity-color-text-disabled);
  cursor: not-allowed;
}

.doity-accordion-item__icon {
  align-items: center;
  color: var(--doity-color-text-primary, #0a0a0a);
  display: inline-flex;
  flex-shrink: 0;
  height: 16px;
  justify-content: center;
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  width: 16px;
}

.doity-accordion-item__icon svg {
  display: block;
}

.doity-accordion-item--open .doity-accordion-item__icon {
  transform: rotate(180deg);
}

.doity-accordion-item--disabled .doity-accordion-item__icon {
  color: var(--doity-color-text-disabled);
}

.doity-accordion-item__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-accordion-item--open .doity-accordion-item__panel {
  grid-template-rows: 1fr;
}

.doity-accordion-item__panel-inner {
  min-height: 0;
  overflow: hidden;
}

/* Answer: pt/pb 16, gap 16, texto primary */
.doity-accordion-item__content {
  color: var(--doity-color-text-primary, #0a0a0a);
  display: flex;
  flex-direction: column;
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-regular, 400);
  gap: var(--doity-spacing-4, 16px);
  line-height: var(--doity-font-lineHeight-md, 20px);
  opacity: 0;
  padding: var(--doity-spacing-4, 16px) 0;
  transform: translateY(-4px);
  transition:
    opacity 0.24s ease,
    transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-accordion-item__content :deep(p) {
  margin: 0;
}

.doity-accordion-item--open .doity-accordion-item__content {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.04s;
}

@media (prefers-reduced-motion: reduce) {
  .doity-accordion-item__panel,
  .doity-accordion-item__icon,
  .doity-accordion-item__content {
    transition: none;
  }

  .doity-accordion-item__content {
    transform: none;
  }
}
</style>
