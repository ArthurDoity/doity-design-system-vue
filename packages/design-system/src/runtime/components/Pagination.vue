<script setup>
import { computed, ref } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  page: { type: Number, required: false, default: 1 },
  totalPages: { type: Number, required: false, default: 1 },
  siblingCount: { type: Number, required: false, default: 1 },
  /**
   * default — números + setas (Button nas setas; páginas especializadas)
   * card — grupo com borda (visual de Button Group; setas = Button)
   * compact — setas Button + “Página X de Y”
   * dots — indicadores de carrossel (círculos)
   * lines — indicadores de carrossel (barras)
   */
  variant: { type: String, required: false, default: 'default' },
  /** square | circle — formato do número ativo (default/card) */
  shape: { type: String, required: false, default: 'square' },
  /**
   * primary | dark | light — tema das setas/dots do carrossel
   */
  theme: { type: String, required: false, default: 'primary' },
  size: { type: String, required: false, default: 'md' },
  /** Mostra “Anterior” / “Próxima” nas setas */
  showLabels: { type: Boolean, required: false, default: false },
  previousLabel: { type: String, required: false, default: 'Anterior' },
  nextLabel: { type: String, required: false, default: 'Próxima' },
  /** Exibe setas laterais (carrossel dots/lines) */
  showArrows: { type: Boolean, required: false, default: true },
  /** Exibe dots/lines (útil para overlay de carrossel) */
  showIndicators: { type: Boolean, required: false, default: true },
  /** Dots/lines com fundo em pílula */
  framed: { type: Boolean, required: false, default: false },
})

const emit = defineEmits(['update:page', 'previous', 'next'])

const pressed = ref(null) // 'prev' | 'next' | null

const isCarousel = computed(() => props.variant === 'dots' || props.variant === 'lines')
const isLg = computed(() => props.size === 'lg')

const themeKey = computed(() => {
  const t = props.theme
  if (t === 'dark' || t === 'light' || t === 'primary') return t
  return 'primary'
})

const pages = computed(() => {
  const result = []
  const { page, totalPages, siblingCount } = props
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) result.push(i)
    return result
  }
  result.push(1)
  const start = Math.max(2, page - siblingCount)
  const end = Math.min(totalPages - 1, page + siblingCount)
  if (start > 2) result.push('ellipsis')
  for (let i = start; i <= end; i++) result.push(i)
  if (end < totalPages - 1) result.push('ellipsis')
  result.push(totalPages)
  return result
})

const canPrev = computed(() => props.page > 1)
const canNext = computed(() => props.page < props.totalPages)

function goTo(p) {
  if (p < 1 || p > props.totalPages || p === props.page) return
  emit('update:page', p)
}

function previous() {
  if (!canPrev.value) return
  emit('previous')
  goTo(props.page - 1)
}

function next() {
  if (!canNext.value) return
  emit('next')
  goTo(props.page + 1)
}

function onArrowDown(dir) {
  pressed.value = dir
}

function onArrowUp() {
  pressed.value = null
}

const rootClass = computed(() => [
  'doity-pagination',
  `doity-pagination--${props.variant}`,
  `doity-pagination--${props.shape === 'circle' ? 'circle' : 'square'}`,
  `doity-pagination--${themeKey.value}`,
  `doity-pagination--${isLg.value ? 'lg' : 'md'}`,
  { 'doity-pagination--framed': props.framed && isCarousel.value },
  { 'doity-pagination--labels': props.showLabels },
])
</script>

<template>
  <!-- Carousel: dots/lines (+ optional arrows overlay context via slots) -->
  <nav
    v-if="isCarousel"
    :class="rootClass"
    :aria-label="`Página ${page} de ${totalPages}`"
  >
    <button
      v-if="showArrows"
      type="button"
      class="doity-pagination__arrow"
      :class="{
        'doity-pagination__arrow--pressed': pressed === 'prev',
        'doity-pagination__arrow--disabled': !canPrev,
      }"
      :disabled="!canPrev"
      aria-label="Anterior"
      @click="previous"
      @pointerdown="onArrowDown('prev')"
      @pointerup="onArrowUp"
      @pointerleave="onArrowUp"
    >
      <svg class="doity-pagination__chevron doity-pagination__chevron--left" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div v-if="showIndicators" class="doity-pagination__indicators" role="tablist">
      <button
        v-for="i in totalPages"
        :key="i"
        type="button"
        class="doity-pagination__indicator"
        :class="{ 'doity-pagination__indicator--current': i === page }"
        :aria-label="`Ir para página ${i}`"
        :aria-current="i === page ? 'true' : undefined"
        @click="goTo(i)"
      />
    </div>

    <button
      v-if="showArrows"
      type="button"
      class="doity-pagination__arrow"
      :class="{
        'doity-pagination__arrow--pressed': pressed === 'next',
        'doity-pagination__arrow--disabled': !canNext,
      }"
      :disabled="!canNext"
      aria-label="Próxima"
      @click="next"
      @pointerdown="onArrowDown('next')"
      @pointerup="onArrowUp"
      @pointerleave="onArrowUp"
    >
      <svg class="doity-pagination__chevron doity-pagination__chevron--right" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </nav>

  <!-- Compact: Button arrows + label -->
  <nav
    v-else-if="variant === 'compact'"
    :class="rootClass"
    :aria-label="`Página ${page} de ${totalPages}`"
  >
    <Button
      class="doity-pagination__nav"
      :class="{ 'doity-pagination__nav--pressed': pressed === 'prev' }"
      hierarchy="outline"
      size="sm"
      icon="only"
      type="button"
      :disabled="!canPrev"
      aria-label="Anterior"
      @click="previous"
      @pointerdown="onArrowDown('prev')"
      @pointerup="onArrowUp"
      @pointerleave="onArrowUp"
    >
      <svg class="doity-pagination__chevron doity-pagination__chevron--left" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </Button>
    <span class="doity-pagination__status">Página {{ page }} de {{ totalPages }}</span>
    <Button
      class="doity-pagination__nav"
      :class="{ 'doity-pagination__nav--pressed': pressed === 'next' }"
      hierarchy="outline"
      size="sm"
      icon="only"
      type="button"
      :disabled="!canNext"
      aria-label="Próxima"
      @click="next"
      @pointerdown="onArrowDown('next')"
      @pointerup="onArrowUp"
      @pointerleave="onArrowUp"
    >
      <svg class="doity-pagination__chevron doity-pagination__chevron--right" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </Button>
  </nav>

  <!-- Default / Card: Button nas setas; números de página ficam especializados -->
  <nav
    v-else
    :class="rootClass"
    :aria-label="`Página ${page} de ${totalPages}`"
  >
    <Button
      class="doity-pagination__btn doity-pagination__btn--prev"
      :class="{ 'doity-pagination__btn--pressed': pressed === 'prev' }"
      :hierarchy="showLabels ? 'outline' : 'link'"
      :size="showLabels ? 'sm' : 'md'"
      :icon="showLabels ? 'leading' : 'only'"
      type="button"
      :disabled="!canPrev"
      aria-label="Anterior"
      @click="previous"
      @pointerdown="onArrowDown('prev')"
      @pointerup="onArrowUp"
      @pointerleave="onArrowUp"
    >
      <template v-if="showLabels" #icon-leading>
        <svg class="doity-pagination__chevron doity-pagination__chevron--left" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </template>
      <template v-if="showLabels">{{ previousLabel }}</template>
      <svg
        v-else
        class="doity-pagination__chevron doity-pagination__chevron--left"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </Button>

    <div class="doity-pagination__pages">
      <template v-for="(p, i) in pages" :key="`page-${i}`">
        <span v-if="p === 'ellipsis'" class="doity-pagination__ellipsis" aria-hidden="true">…</span>
        <button
          v-else
          type="button"
          class="doity-pagination__btn doity-pagination__btn--page"
          :class="{ 'doity-pagination__btn--active': p === page }"
          :aria-current="p === page ? 'page' : undefined"
          @click="goTo(p)"
        >
          {{ p }}
        </button>
      </template>
    </div>

    <Button
      class="doity-pagination__btn doity-pagination__btn--next"
      :class="{ 'doity-pagination__btn--pressed': pressed === 'next' }"
      :hierarchy="showLabels ? 'outline' : 'link'"
      :size="showLabels ? 'sm' : 'md'"
      :icon="showLabels ? 'trailing' : 'only'"
      type="button"
      :disabled="!canNext"
      aria-label="Próxima"
      @click="next"
      @pointerdown="onArrowDown('next')"
      @pointerup="onArrowUp"
      @pointerleave="onArrowUp"
    >
      <template v-if="showLabels" #icon-trailing>
        <svg class="doity-pagination__chevron doity-pagination__chevron--right" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </template>
      <template v-if="showLabels">{{ nextLabel }}</template>
      <svg
        v-else
        class="doity-pagination__chevron doity-pagination__chevron--right"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </Button>
  </nav>
</template>

<style scoped>
.doity-pagination {
  --doity-pag-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --doity-pag-press: cubic-bezier(0.33, 0, 0.67, 1);
  align-items: center;
  display: inline-flex;
  font-family: var(--doity-font-family-sans);
  gap: 4px;
  user-select: none;
}

/* —— Shared buttons —— */
.doity-pagination__btn,
.doity-pagination__nav,
.doity-pagination__arrow {
  align-items: center;
  background: transparent;
  border: none;
  box-sizing: border-box;
  color: var(--doity-color-text-secondary, #737373);
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-family: inherit;
  font-size: 12px;
  font-weight: var(--doity-font-weight-medium, 500);
  justify-content: center;
  line-height: 16px;
  margin: 0;
  padding: 0;
  position: relative;
  transition:
    background-color 0.2s var(--doity-pag-ease),
    color 0.2s var(--doity-pag-ease),
    border-color 0.2s var(--doity-pag-ease),
    box-shadow 0.2s var(--doity-pag-ease),
    transform 0.2s var(--doity-pag-ease);
}

/* Reusa Button nas setas, mas preserva o visual de paginação do Figma */
.doity-pagination__btn.doity-btn,
.doity-pagination__nav.doity-btn {
  box-shadow: none;
  font-size: 12px;
  font-weight: var(--doity-font-weight-medium, 500);
  gap: 0;
  line-height: 16px;
  min-height: 0;
  text-decoration: none;
}

.doity-pagination__btn.doity-btn :deep(.doity-btn__icon),
.doity-pagination__nav.doity-btn :deep(.doity-btn__icon) {
  height: 20px;
  width: 20px;
}

.doity-pagination__btn.doity-btn :deep(.doity-btn__label) {
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}

.doity-pagination__btn:disabled,
.doity-pagination__nav:disabled,
.doity-pagination__arrow:disabled,
.doity-pagination__arrow--disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.doity-pagination__chevron {
  display: block;
  flex-shrink: 0;
  height: 20px;
  transition: transform 0.28s var(--doity-pag-ease);
  width: 20px;
}

.doity-pagination__btn:hover:not(:disabled) .doity-pagination__chevron--left,
.doity-pagination__nav:hover:not(:disabled) .doity-pagination__chevron--left,
.doity-pagination__arrow:hover:not(:disabled) .doity-pagination__chevron--left {
  transform: translateX(-3px);
}

.doity-pagination__btn:hover:not(:disabled) .doity-pagination__chevron--right,
.doity-pagination__nav:hover:not(:disabled) .doity-pagination__chevron--right,
.doity-pagination__arrow:hover:not(:disabled) .doity-pagination__chevron--right {
  transform: translateX(3px);
}

.doity-pagination__btn--pressed:not(:disabled),
.doity-pagination__nav--pressed:not(:disabled) {
  transform: scale(0.94);
  transition-duration: 0.1s;
  transition-timing-function: var(--doity-pag-press);
}

.doity-pagination__arrow--pressed:not(:disabled) {
  transform: scale(0.9);
  transition-duration: 0.1s;
  transition-timing-function: var(--doity-pag-press);
}

.doity-pagination__arrow--pressed:not(:disabled) .doity-pagination__chevron--left {
  transform: translateX(-5px);
}

.doity-pagination__arrow--pressed:not(:disabled) .doity-pagination__chevron--right {
  transform: translateX(5px);
}

/* —— Default —— */
.doity-pagination--default {
  gap: 2px;
}

.doity-pagination--default .doity-pagination__pages {
  align-items: center;
  display: inline-flex;
  gap: 2px;
}

.doity-pagination--default .doity-pagination__btn {
  border-radius: 8px;
  height: 40px;
  min-width: 40px;
}

/* Setas sem label: Button link → ghost 40×40 */
.doity-pagination--default .doity-pagination__btn--prev.doity-btn,
.doity-pagination--default .doity-pagination__btn--next.doity-btn {
  background: transparent;
  border: none;
  color: var(--doity-color-text-secondary, #737373);
  padding: 0;
  width: 40px;
}

.doity-pagination--default.doity-pagination--circle .doity-pagination__btn--page {
  border-radius: 9999px;
}

.doity-pagination--default .doity-pagination__btn--page:hover:not(:disabled):not(.doity-pagination__btn--active),
.doity-pagination--default .doity-pagination__btn--prev:hover:not(:disabled),
.doity-pagination--default .doity-pagination__btn--next:hover:not(:disabled) {
  background: var(--doity-color-background-secondary, #f5f5f5);
  color: var(--doity-color-text-primary, #0a0a0a);
}

.doity-pagination--default .doity-pagination__btn--active {
  background: var(--doity-color-background-secondary, #f5f5f5);
  color: var(--doity-color-text-primary, #0a0a0a);
  font-weight: var(--doity-font-weight-semibold, 600);
}

.doity-pagination--default.doity-pagination--labels .doity-pagination__btn--prev,
.doity-pagination--default.doity-pagination--labels .doity-pagination__btn--next {
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-strong, #d4d4d4);
  border-radius: var(--doity-radius-lg, 10px);
  box-shadow: var(--doity-shadow-xs, 0 1px 2px rgb(0 0 0 / 10%));
  color: var(--doity-color-text-primary, #0a0a0a);
  gap: 6px;
  height: 32px;
  min-width: auto;
  padding: 8px 10px;
  width: auto;
}

.doity-pagination--default.doity-pagination--labels .doity-pagination__btn--prev:hover:not(:disabled),
.doity-pagination--default.doity-pagination--labels .doity-pagination__btn--next:hover:not(:disabled) {
  background: var(--doity-color-background-secondary, #f5f5f5);
}

.doity-pagination__ellipsis {
  color: var(--doity-color-text-tertiary, #a3a3a3);
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
  width: 40px;
}

/* —— Card (button group) —— */
.doity-pagination--card {
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-strong, #d4d4d4);
  border-radius: 8px;
  box-shadow: var(--doity-shadow-xs, 0 1px 2px rgb(0 0 0 / 10%));
  gap: 0;
  overflow: clip;
}

.doity-pagination--card .doity-pagination__pages {
  align-items: stretch;
  display: inline-flex;
}

.doity-pagination--card .doity-pagination__btn {
  background: var(--doity-color-background-primary, #fff);
  border-radius: 0;
  height: 40px;
  min-width: 40px;
}

/* Button nas setas: sem chrome próprio, mas mantém divisores laterais */
.doity-pagination--card .doity-pagination__btn--prev.doity-btn,
.doity-pagination--card .doity-pagination__btn--next.doity-btn {
  background: var(--doity-color-background-primary, #fff);
  border-top: none;
  border-bottom: none;
  box-shadow: none;
  color: var(--doity-color-text-secondary, #737373);
  height: 40px;
  min-height: 40px;
  padding: 0;
  width: 40px;
}

.doity-pagination--card .doity-pagination__btn--prev.doity-btn {
  border-left: none;
  border-right: 1px solid var(--doity-color-border-default, #e5e5e5);
}

.doity-pagination--card .doity-pagination__btn--next.doity-btn {
  border-left: 1px solid var(--doity-color-border-default, #e5e5e5);
  border-right: none;
}

.doity-pagination--card .doity-pagination__btn--page:not(:last-child) {
  box-shadow: inset -1px 0 0 var(--doity-color-border-default, #e5e5e5);
}

.doity-pagination--card .doity-pagination__btn:hover:not(:disabled) {
  background: var(--doity-color-background-secondary, #fafafa);
  color: var(--doity-color-text-primary, #0a0a0a);
}

.doity-pagination--card .doity-pagination__btn--active {
  background: var(--doity-color-background-secondary, #fafafa);
  color: var(--doity-color-text-primary, #0a0a0a);
  font-weight: 600;
}

.doity-pagination--card.doity-pagination--labels .doity-pagination__btn--prev.doity-btn,
.doity-pagination--card.doity-pagination--labels .doity-pagination__btn--next.doity-btn {
  flex-shrink: 0;
  gap: 8px;
  min-width: auto;
  padding: 10px 16px;
  width: auto;
}

/* —— Compact —— */
.doity-pagination--compact {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  width: 100%;
}

.doity-pagination--compact .doity-pagination__nav {
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-strong, #d4d4d4);
  border-radius: 8px;
  box-shadow: var(--doity-shadow-xs, 0 1px 2px rgb(0 0 0 / 10%));
  color: var(--doity-color-text-primary, #0a0a0a);
  height: 36px;
  min-width: 36px;
  padding: 0;
  width: 36px;
}

.doity-pagination--compact .doity-pagination__nav.doity-btn {
  min-height: 36px;
}

.doity-pagination--compact .doity-pagination__nav:hover:not(:disabled) {
  background: var(--doity-color-background-secondary, #f5f5f5);
}

.doity-pagination__status {
  color: var(--doity-color-text-secondary, #737373);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
}

/* —— Carousel arrows —— */
.doity-pagination--dots,
.doity-pagination--lines {
  gap: 16px;
}

.doity-pagination--dots:not(:has(.doity-pagination__indicators)),
.doity-pagination--lines:not(:has(.doity-pagination__indicators)) {
  gap: 0;
  justify-content: space-between;
  width: 100%;
}

.doity-pagination__arrow {
  border-radius: 18px;
  color: #fff;
  height: 36px;
  padding: 8px;
  width: 36px;
}

.doity-pagination--lg .doity-pagination__arrow {
  border-radius: 22px;
  height: 44px;
  padding: 10px;
  width: 44px;
}

.doity-pagination--lg .doity-pagination__chevron {
  height: 24px;
  width: 24px;
}

.doity-pagination--primary .doity-pagination__arrow {
  background: var(--doity-color-action-primary-default, #ff2b34);
  color: #fff;
}

.doity-pagination--primary .doity-pagination__arrow:hover:not(:disabled) {
  background: var(--doity-color-action-primary-hover, #ed151e);
}

.doity-pagination--dark .doity-pagination__arrow {
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background: var(--doity-color-background-overlay, #171717);
  color: #fff;
}

.doity-pagination--dark .doity-pagination__arrow:hover:not(:disabled) {
  background: #262626;
}

.doity-pagination--light .doity-pagination__arrow {
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background: var(--doity-color-background-primary, #fff);
  color: var(--doity-color-text-primary, #0a0a0a);
  box-shadow: var(--doity-shadow-xs, 0 1px 2px rgb(0 0 0 / 10%));
}

.doity-pagination--light .doity-pagination__arrow:hover:not(:disabled) {
  background: #f5f5f5;
}

/* —— Indicators —— */
.doity-pagination__indicators {
  align-items: center;
  display: inline-flex;
  gap: 12px;
}

.doity-pagination--lg .doity-pagination__indicators {
  gap: 16px;
}

.doity-pagination--framed .doity-pagination__indicators {
  border-radius: 12px;
  padding: 8px;
}

.doity-pagination--framed.doity-pagination--lg .doity-pagination__indicators {
  border-radius: 17px;
  padding: 12px;
}

.doity-pagination--framed.doity-pagination--primary .doity-pagination__indicators {
  background: var(--doity-color-action-primary-hover, #ed151e);
}

.doity-pagination--framed.doity-pagination--dark .doity-pagination__indicators {
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background: var(--doity-color-background-overlay, #171717);
}

.doity-pagination--framed.doity-pagination--light .doity-pagination__indicators {
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background: var(--doity-color-background-primary, #fff);
  box-shadow: var(--doity-shadow-xs, 0 1px 2px rgb(0 0 0 / 10%));
}

.doity-pagination__indicator {
  appearance: none;
  background: var(--doity-color-background-brand, #fff1f2);
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  flex-shrink: 0;
  height: 8px;
  margin: 0;
  padding: 0;
  transition:
    width 0.35s var(--doity-pag-ease),
    height 0.35s var(--doity-pag-ease),
    background-color 0.3s var(--doity-pag-ease),
    transform 0.2s var(--doity-pag-ease),
    opacity 0.2s ease;
  width: 8px;
}

.doity-pagination--lg .doity-pagination__indicator {
  border-radius: 6px;
  height: 10px;
  width: 10px;
}

.doity-pagination--dots .doity-pagination__indicator--current {
  transform: scale(1.15);
}

.doity-pagination--lines .doity-pagination__indicator {
  border-radius: 3px;
  height: 6px;
  width: 16px;
}

.doity-pagination--lines.doity-pagination--lg .doity-pagination__indicator {
  border-radius: 4px;
  height: 8px;
  width: 20px;
}

.doity-pagination--lines .doity-pagination__indicator--current {
  width: 40px;
}

.doity-pagination--primary .doity-pagination__indicator--current {
  background: var(--doity-color-action-primary-default, #ff2b34);
}

.doity-pagination--framed.doity-pagination--primary .doity-pagination__indicator {
  background: var(--doity-color-background-brand, #fff1f2);
}

.doity-pagination--framed.doity-pagination--primary .doity-pagination__indicator--current {
  background: #fff;
}

.doity-pagination--dark .doity-pagination__indicator {
  background: #717680;
}

.doity-pagination--dark .doity-pagination__indicator--current {
  background: #fff;
}

.doity-pagination--light .doity-pagination__indicator {
  background: #d5d7da;
}

.doity-pagination--light .doity-pagination__indicator--current {
  background: var(--doity-color-background-overlay, #171717);
}

.doity-pagination__indicator:hover:not(.doity-pagination__indicator--current) {
  opacity: 0.85;
  transform: scale(1.08);
}

.doity-pagination__indicator:active {
  transform: scale(0.92);
}

@media (prefers-reduced-motion: reduce) {
  .doity-pagination__btn,
  .doity-pagination__nav,
  .doity-pagination__arrow,
  .doity-pagination__chevron,
  .doity-pagination__indicator {
    transition: none;
  }

  .doity-pagination__btn:hover:not(:disabled) .doity-pagination__chevron--left,
  .doity-pagination__nav:hover:not(:disabled) .doity-pagination__chevron--left,
  .doity-pagination__arrow:hover:not(:disabled) .doity-pagination__chevron--left,
  .doity-pagination__btn:hover:not(:disabled) .doity-pagination__chevron--right,
  .doity-pagination__nav:hover:not(:disabled) .doity-pagination__chevron--right,
  .doity-pagination__arrow:hover:not(:disabled) .doity-pagination__chevron--right,
  .doity-pagination__arrow--pressed:not(:disabled) .doity-pagination__chevron--left,
  .doity-pagination__arrow--pressed:not(:disabled) .doity-pagination__chevron--right {
    transform: none;
  }
}
</style>
