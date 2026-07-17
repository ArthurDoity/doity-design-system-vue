<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

const props = defineProps({
  /**
   * horizontal — segmentos lado a lado
   * vertical — segmentos empilhados
   */
  orientation: { type: String, required: false, default: 'horizontal' },
  /** sm · 32px · md · 36px · lg · 40px */
  size: { type: String, required: false, default: 'md' },
  /**
   * default — fundo branco
   * secondary — fundo cinza (#f5f5f5)
   */
  variant: { type: String, required: false, default: 'default' },
  /**
   * Índice do segmento ativo (v-model). `null` = sem highlight.
   * Com número, o pill desliza ao trocar.
   */
  modelValue: { type: [Number, null], required: false, default: null },
})

const emit = defineEmits(['update:modelValue', 'change'])

const rootRef = ref(null)
const indicator = ref({ left: 0, top: 0, width: 0, height: 0, ready: false })
const reducedMotion = ref(false)
const isVertical = computed(() => props.orientation === 'vertical')
const hasHighlight = computed(() => typeof props.modelValue === 'number' && props.modelValue >= 0)

const classes = computed(() => [
  'doity-btn-group',
  `doity-btn-group--${isVertical.value ? 'vertical' : 'horizontal'}`,
  `doity-btn-group--${props.size === 'sm' || props.size === 'lg' ? props.size : 'md'}`,
  `doity-btn-group--${props.variant === 'secondary' ? 'secondary' : 'default'}`,
  { 'doity-btn-group--selectable': hasHighlight.value },
])

function segmentButtons() {
  const root = rootRef.value
  if (!root) return []
  return [...root.children].filter(
    el => el.classList?.contains('doity-btn') && !el.classList.contains('doity-btn-group'),
  )
}

function measureIndicator() {
  const root = rootRef.value
  if (!root || !hasHighlight.value) {
    indicator.value = { left: 0, top: 0, width: 0, height: 0, ready: false }
    return
  }

  const buttons = segmentButtons()
  const btn = buttons[props.modelValue]
  if (!btn) {
    indicator.value = { left: 0, top: 0, width: 0, height: 0, ready: false }
    return
  }

  const rootBox = root.getBoundingClientRect()
  const btnBox = btn.getBoundingClientRect()
  indicator.value = {
    left: btnBox.left - rootBox.left,
    top: btnBox.top - rootBox.top,
    width: btnBox.width,
    height: btnBox.height,
    ready: true,
  }

  buttons.forEach((el, i) => {
    el.setAttribute('aria-pressed', i === props.modelValue ? 'true' : 'false')
    el.classList.toggle('doity-btn--group-active', i === props.modelValue)
  })
}

function onGroupClick(event) {
  if (typeof props.modelValue !== 'number') return

  const btn = event.target.closest('.doity-btn')
  if (!btn || !rootRef.value?.contains(btn)) return
  if (btn.disabled || btn.getAttribute('aria-disabled') === 'true') return

  const buttons = segmentButtons()
  const index = buttons.indexOf(btn)
  if (index < 0 || index === props.modelValue) return

  emit('update:modelValue', index)
  emit('change', index)
}

const indicatorStyle = computed(() => {
  const motion = reducedMotion.value
    ? 'none'
    : isVertical.value
      ? 'top 0.38s cubic-bezier(0.22, 1, 0.36, 1), height 0.38s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease'
      : 'left 0.38s cubic-bezier(0.22, 1, 0.36, 1), width 0.38s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease'

  return {
    left: `${indicator.value.left}px`,
    top: `${indicator.value.top}px`,
    width: `${indicator.value.width}px`,
    height: `${indicator.value.height}px`,
    opacity: indicator.value.ready ? 1 : 0,
    transition: motion,
  }
})

let resizeObserver = null

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  nextTick(measureIndicator)
  if (typeof ResizeObserver !== 'undefined' && rootRef.value) {
    resizeObserver = new ResizeObserver(() => measureIndicator())
    resizeObserver.observe(rootRef.value)
  }
  window.addEventListener('resize', measureIndicator)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', measureIndicator)
})

watch(
  () => [props.modelValue, props.orientation, props.size, props.variant],
  async () => {
    await nextTick()
    measureIndicator()
  },
)
</script>

<template>
  <div
    ref="rootRef"
    :class="classes"
    role="group"
    @click="onGroupClick"
  >
    <span
      v-if="hasHighlight"
      class="doity-btn-group__indicator"
      :style="indicatorStyle"
      aria-hidden="true"
    />
    <slot />
  </div>
</template>

<style scoped>
.doity-btn-group {
  --doity-btn-group-h: var(--doity-component-button-height-md, 36px);
  align-items: stretch;
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e5e5e5);
  border-radius: var(--doity-radius-md, 8px);
  box-shadow: var(--doity-shadow-xs, 0 1px 2px 0 rgb(0 0 0 / 10%));
  box-sizing: border-box;
  display: inline-flex;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
}

.doity-btn-group--secondary {
  background: var(--doity-color-action-secondary-default, #f5f5f5);
}

.doity-btn-group--sm {
  --doity-btn-group-h: var(--doity-component-button-height-sm, 32px);
}

.doity-btn-group--md {
  --doity-btn-group-h: var(--doity-component-button-height-md, 36px);
}

.doity-btn-group--lg {
  --doity-btn-group-h: var(--doity-component-button-height-lg, 40px);
}

.doity-btn-group--horizontal {
  flex-direction: row;
}

.doity-btn-group--vertical {
  flex-direction: column;
}

.doity-btn-group__indicator {
  border-radius: calc(var(--doity-radius-md, 8px) - 2px);
  pointer-events: none;
  position: absolute;
  z-index: 0;
}

.doity-btn-group--default .doity-btn-group__indicator {
  background: var(--doity-color-background-tertiary, #f5f5f5);
}

.doity-btn-group--secondary .doity-btn-group__indicator {
  background: var(--doity-color-background-primary, #fff);
  box-shadow: var(
    --doity-shadow-sm,
    0px 1px 3px 0px rgba(10, 13, 18, 0.1),
    0px 1px 2px 0px rgba(10, 13, 18, 0.06)
  );
}

/* Nested groups: só espaça, sem chrome próprio */
.doity-btn-group:has(> .doity-btn-group) {
  background: transparent;
  border: none;
  box-shadow: none;
  gap: var(--doity-spacing-2, 8px);
  overflow: visible;
}

.doity-btn-group:has(> .doity-btn-group) .doity-btn-group__indicator {
  display: none;
}

/* —— Segmentos (Button) —— */
.doity-btn-group :deep(.doity-btn) {
  border-radius: 0;
  box-shadow: none;
  flex: 0 0 auto;
  height: var(--doity-btn-group-h);
  min-height: var(--doity-btn-group-h);
  min-width: min-content;
  position: relative;
  transform: none;
  z-index: 1;
}

.doity-btn-group :deep(.doity-btn:active:not(:disabled):not([aria-disabled='true'])) {
  transform: none;
}

.doity-btn-group :deep(.doity-btn--outline),
.doity-btn-group :deep(.doity-btn--secondary),
.doity-btn-group :deep(.doity-btn--primary),
.doity-btn-group :deep(.doity-btn--link) {
  background: transparent;
  border-color: transparent;
  color: var(--doity-color-text-primary, #0a0a0a);
}

.doity-btn-group:not(.doity-btn-group--selectable) :deep(.doity-btn--outline:hover:not(:disabled)),
.doity-btn-group:not(.doity-btn-group--selectable) :deep(.doity-btn--secondary:hover:not(:disabled)),
.doity-btn-group:not(.doity-btn-group--selectable) :deep(.doity-btn--link:hover:not(:disabled)),
.doity-btn-group:not(.doity-btn-group--selectable) :deep(.doity-btn--primary:hover:not(:disabled)) {
  background: var(--doity-color-background-tertiary, #f5f5f5);
  color: var(--doity-color-text-primary, #0a0a0a);
}

.doity-btn-group--selectable :deep(.doity-btn--outline:hover:not(:disabled)),
.doity-btn-group--selectable :deep(.doity-btn--secondary:hover:not(:disabled)),
.doity-btn-group--selectable :deep(.doity-btn--link:hover:not(:disabled)),
.doity-btn-group--selectable :deep(.doity-btn--primary:hover:not(:disabled)) {
  background: transparent;
}

.doity-btn-group :deep(.doity-btn--outline:active:not(:disabled)),
.doity-btn-group :deep(.doity-btn--secondary:active:not(:disabled)),
.doity-btn-group :deep(.doity-btn--primary:active:not(:disabled)) {
  background: #e8e8e8;
  box-shadow: none;
}

.doity-btn-group--selectable :deep(.doity-btn--outline:active:not(:disabled)),
.doity-btn-group--selectable :deep(.doity-btn--secondary:active:not(:disabled)),
.doity-btn-group--selectable :deep(.doity-btn--primary:active:not(:disabled)) {
  background: transparent;
}

.doity-btn-group :deep(.doity-btn--outline:focus-visible),
.doity-btn-group :deep(.doity-btn--secondary:focus-visible),
.doity-btn-group :deep(.doity-btn--primary:focus-visible),
.doity-btn-group :deep(.doity-btn--link:focus-visible) {
  box-shadow: inset 0 0 0 2px var(--doity-color-border-focus, #ff2b34);
  outline: none;
  z-index: 2;
}

.doity-btn-group :deep(.doity-btn--outline:disabled),
.doity-btn-group :deep(.doity-btn--secondary:disabled),
.doity-btn-group :deep(.doity-btn--primary:disabled),
.doity-btn-group :deep(.doity-btn--link:disabled) {
  background: transparent;
  color: var(--doity-color-text-disabled, #d4d4d4);
}

.doity-btn-group--horizontal:not(.doity-btn-group--selectable) :deep(.doity-btn:not(:last-child)),
.doity-btn-group--horizontal:not(.doity-btn-group--selectable) :deep(.doity-input:not(:last-child)) {
  border-right: 1px solid var(--doity-color-border-default, #e5e5e5);
}

.doity-btn-group--vertical:not(.doity-btn-group--selectable) :deep(.doity-btn:not(:last-child)),
.doity-btn-group--vertical:not(.doity-btn-group--selectable) :deep(.doity-input:not(:last-child)) {
  border-bottom: 1px solid var(--doity-color-border-default, #e5e5e5);
}

/* Com highlight, divisores ficam sutis / atrás do pill */
.doity-btn-group--selectable.doity-btn-group--horizontal :deep(.doity-btn:not(:last-child)) {
  border-right: 1px solid transparent;
}

.doity-btn-group--selectable.doity-btn-group--vertical :deep(.doity-btn:not(:last-child)) {
  border-bottom: 1px solid transparent;
}

.doity-btn-group--horizontal :deep(.doity-btn--icon-only) {
  padding: 0;
  width: var(--doity-btn-group-h);
}

.doity-btn-group--vertical :deep(.doity-btn--icon-only) {
  padding: 0;
  width: var(--doity-btn-group-h);
}

.doity-btn-group--sm :deep(.doity-btn:not(.doity-btn--icon-only)) {
  font-size: var(--doity-component-button-fontSize-sm, 12px);
  padding-inline: 12px;
}

.doity-btn-group--md :deep(.doity-btn:not(.doity-btn--icon-only)) {
  font-size: var(--doity-component-button-fontSize-md, 14px);
  padding-inline: 16px;
}

.doity-btn-group--lg :deep(.doity-btn:not(.doity-btn--icon-only)) {
  font-size: var(--doity-component-button-fontSize-md, 14px);
  padding-inline: 24px;
}

/* —— Input anexado —— */
.doity-btn-group :deep(.doity-input) {
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
}

.doity-btn-group :deep(.doity-input__label),
.doity-btn-group :deep(.doity-input__hint) {
  display: none;
}

.doity-btn-group :deep(.doity-input__control),
.doity-btn-group :deep(.doity-input__field-shell),
.doity-btn-group :deep(.doity-input__leading-text) {
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  height: var(--doity-btn-group-h);
}

.doity-btn-group :deep(.doity-input__control) {
  align-items: stretch;
}

.doity-btn-group :deep(.doity-input__field-shell) {
  flex: 1;
}

@media (prefers-reduced-motion: reduce) {
  .doity-btn-group__indicator {
    transition: none !important;
  }
}
</style>
