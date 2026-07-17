<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  /** Texto principal (título) */
  content: { type: String, required: false, default: '' },
  /** Texto de apoio — ativa variante rich (Figma supportingText) */
  description: { type: String, required: false, default: '' },
  /**
   * Onde o tooltip aparece relativo ao trigger
   * top | bottom | left | right
   */
  position: { type: String, required: false, default: 'top' },
  /**
   * Seta apontando para o trigger
   * true / center | start | end | false / none
   */
  arrow: { type: [Boolean, String], required: false, default: true },
  /** light | dark */
  theme: { type: String, required: false, default: 'light' },
  /** Atraso em ms antes de exibir */
  delay: { type: Number, required: false, default: 200 },
  /** Força aberto (stories / demos) */
  forceOpen: { type: Boolean, required: false, default: false },
})

const visible = ref(false)
let timer = null

const positionKey = computed(() => {
  const allowed = ['top', 'bottom', 'left', 'right']
  return allowed.includes(props.position) ? props.position : 'top'
})

const arrowKey = computed(() => {
  const raw = props.arrow
  if (raw === false || raw === 'none') return 'none'
  if (raw === 'start' || raw === 'end') return raw
  return 'center'
})

const themeKey = computed(() => (props.theme === 'dark' ? 'dark' : 'light'))
const hasDescription = computed(() => Boolean(props.description))
const showTooltip = computed(() => props.forceOpen || visible.value)
const transitionName = computed(() => `doity-tooltip-${positionKey.value}`)

const contentClasses = computed(() => [
  'doity-tooltip__content',
  `doity-tooltip__content--${positionKey.value}`,
  `doity-tooltip__content--${themeKey.value}`,
  `doity-tooltip__content--arrow-${arrowKey.value}`,
  {
    'doity-tooltip__content--rich': hasDescription.value,
    'doity-tooltip__content--simple': !hasDescription.value,
  },
])

watch(
  () => props.forceOpen,
  (v) => {
    if (v) visible.value = true
  },
  { immediate: true },
)

function show() {
  if (props.forceOpen) return
  timer = setTimeout(() => {
    visible.value = true
  }, props.delay)
}

function hide() {
  if (props.forceOpen) return
  if (timer) clearTimeout(timer)
  timer = null
  visible.value = false
}
</script>

<template>
  <span
    class="doity-tooltip"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
  >
    <span class="doity-tooltip__trigger">
      <slot />
    </span>

    <Transition :name="transitionName">
      <span
        v-if="showTooltip"
        :class="contentClasses"
        role="tooltip"
      >
        <span class="doity-tooltip__body">
          <slot name="content">
            <span
              v-if="content || $slots.title"
              class="doity-tooltip__title"
            >
              <slot name="title">{{ content }}</slot>
            </span>
            <span
              v-if="description || $slots.description"
              class="doity-tooltip__description"
            >
              <slot name="description">{{ description }}</slot>
            </span>
          </slot>
        </span>

        <span
          v-if="arrowKey !== 'none'"
          class="doity-tooltip__arrow"
          aria-hidden="true"
        >
          <svg
            class="doity-tooltip__arrow-svg"
            viewBox="0 0 16 8.515"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M14.0711 0C14.962 0 15.4081 1.07714 14.7782 1.70711L8.70711 7.77818C8.31658 8.16871 7.68342 8.16871 7.29289 7.77818L1.22183 1.70711C0.591867 1.07714 1.03803 0 1.92894 0H14.0711Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.doity-tooltip {
  display: inline-flex;
  position: relative;
  vertical-align: middle;
}

.doity-tooltip__trigger {
  display: inline-flex;
  max-width: 100%;
}

.doity-tooltip__content {
  --doity-tooltip-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --doity-tooltip-bg: var(--doity-color-background-primary, #fff);
  --doity-tooltip-fg: var(--doity-color-text-secondary, #737373);
  box-sizing: border-box;
  display: flex;
  filter: drop-shadow(0 12px 8px rgb(10 13 18 / 8%)) drop-shadow(0 4px 3px rgb(10 13 18 / 3%));
  font-family: var(--doity-font-family-sans);
  pointer-events: none;
  position: absolute;
  z-index: 1000;
}

.doity-tooltip__content--light {
  --doity-tooltip-bg: var(--doity-color-background-primary, #fff);
  --doity-tooltip-fg: var(--doity-color-text-secondary, #737373);
}

.doity-tooltip__content--dark {
  --doity-tooltip-bg: var(--doity-color-background-overlay, #171717);
  --doity-tooltip-fg: var(--doity-color-text-inverse, #fff);
}

.doity-tooltip__body {
  background: var(--doity-tooltip-bg);
  border-radius: var(--doity-radius-md, 8px);
  color: var(--doity-tooltip-fg);
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 320px;
  position: relative;
  z-index: 1;
}

.doity-tooltip__content--simple .doity-tooltip__body {
  padding: 8px 12px;
}

.doity-tooltip__content--rich .doity-tooltip__body {
  padding: 12px;
  width: 320px;
}

.doity-tooltip__title {
  font-size: 12px;
  font-weight: var(--doity-font-weight-semibold, 600);
  line-height: 18px;
}

.doity-tooltip__content--simple .doity-tooltip__title {
  text-align: center;
  white-space: nowrap;
}

.doity-tooltip__content--rich .doity-tooltip__title {
  text-align: left;
  white-space: normal;
  width: 100%;
}

.doity-tooltip__description {
  font-size: 12px;
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: 18px;
  text-align: left;
  white-space: normal;
  width: 100%;
}

/* —— Posição —— */
.doity-tooltip__content--top {
  align-items: center;
  bottom: calc(100% + 8px);
  flex-direction: column;
  left: 50%;
  transform: translateX(-50%);
}

.doity-tooltip__content--bottom {
  align-items: center;
  flex-direction: column;
  left: 50%;
  top: calc(100% + 8px);
  transform: translateX(-50%);
}

.doity-tooltip__content--left {
  align-items: center;
  flex-direction: row;
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

.doity-tooltip__content--right {
  align-items: center;
  flex-direction: row;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

.doity-tooltip__content--top.doity-tooltip__content--arrow-start,
.doity-tooltip__content--bottom.doity-tooltip__content--arrow-start {
  align-items: flex-start;
  left: 0;
  transform: none;
}

.doity-tooltip__content--top.doity-tooltip__content--arrow-end,
.doity-tooltip__content--bottom.doity-tooltip__content--arrow-end {
  align-items: flex-end;
  left: auto;
  right: 0;
  transform: none;
}

/* —— Seta (SVG Figma — base sob o body) —— */
.doity-tooltip__arrow {
  color: var(--doity-tooltip-bg);
  flex-shrink: 0;
  height: 6px;
  line-height: 0;
  overflow: visible;
  position: relative;
  width: 16px;
  z-index: 0;
}

.doity-tooltip__arrow-svg {
  display: block;
  height: 8.515px;
  left: 0;
  overflow: visible;
  position: absolute;
  top: -2.515px;
  width: 16px;
}

/* top → seta na base, apontando para baixo */
.doity-tooltip__content--top .doity-tooltip__arrow {
  margin-top: -1px;
  order: 2;
}

.doity-tooltip__content--top.doity-tooltip__content--arrow-start .doity-tooltip__arrow {
  margin-left: 12px;
}

.doity-tooltip__content--top.doity-tooltip__content--arrow-end .doity-tooltip__arrow {
  margin-right: 12px;
}

/* bottom → seta no topo, apontando para cima */
.doity-tooltip__content--bottom .doity-tooltip__arrow {
  margin-bottom: -1px;
  order: -1;
  transform: rotate(180deg);
}

.doity-tooltip__content--bottom.doity-tooltip__content--arrow-start .doity-tooltip__arrow {
  margin-left: 12px;
}

.doity-tooltip__content--bottom.doity-tooltip__content--arrow-end .doity-tooltip__arrow {
  margin-right: 12px;
}

/* left → seta à direita */
.doity-tooltip__content--left .doity-tooltip__arrow {
  margin-left: -1px;
  order: 2;
  transform: rotate(-90deg);
}

/* right → seta à esquerda */
.doity-tooltip__content--right .doity-tooltip__arrow {
  margin-right: -1px;
  order: -1;
  transform: rotate(90deg);
}

/* —— Animações —— */
.doity-tooltip-top-enter-active,
.doity-tooltip-top-leave-active,
.doity-tooltip-bottom-enter-active,
.doity-tooltip-bottom-leave-active,
.doity-tooltip-left-enter-active,
.doity-tooltip-left-leave-active,
.doity-tooltip-right-enter-active,
.doity-tooltip-right-leave-active {
  transition:
    opacity 0.2s var(--doity-tooltip-ease),
    transform 0.2s var(--doity-tooltip-ease);
}

.doity-tooltip-top-enter-from,
.doity-tooltip-top-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px) scale(0.96);
}

.doity-tooltip__content--top.doity-tooltip__content--arrow-start.doity-tooltip-top-enter-from,
.doity-tooltip__content--top.doity-tooltip__content--arrow-start.doity-tooltip-top-leave-to,
.doity-tooltip__content--top.doity-tooltip__content--arrow-end.doity-tooltip-top-enter-from,
.doity-tooltip__content--top.doity-tooltip__content--arrow-end.doity-tooltip-top-leave-to {
  transform: translateY(6px) scale(0.96);
}

.doity-tooltip-bottom-enter-from,
.doity-tooltip-bottom-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px) scale(0.96);
}

.doity-tooltip__content--bottom.doity-tooltip__content--arrow-start.doity-tooltip-bottom-enter-from,
.doity-tooltip__content--bottom.doity-tooltip__content--arrow-start.doity-tooltip-bottom-leave-to,
.doity-tooltip__content--bottom.doity-tooltip__content--arrow-end.doity-tooltip-bottom-enter-from,
.doity-tooltip__content--bottom.doity-tooltip__content--arrow-end.doity-tooltip-bottom-leave-to {
  transform: translateY(-6px) scale(0.96);
}

.doity-tooltip-left-enter-from,
.doity-tooltip-left-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(6px) scale(0.96);
}

.doity-tooltip-right-enter-from,
.doity-tooltip-right-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(-6px) scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .doity-tooltip-top-enter-active,
  .doity-tooltip-top-leave-active,
  .doity-tooltip-bottom-enter-active,
  .doity-tooltip-bottom-leave-active,
  .doity-tooltip-left-enter-active,
  .doity-tooltip-left-leave-active,
  .doity-tooltip-right-enter-active,
  .doity-tooltip-right-leave-active {
    transition: none;
  }
}
</style>
