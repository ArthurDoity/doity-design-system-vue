<script setup>
import { computed, onMounted, ref, watch, useId } from 'vue'

/** Path exacto do Figma (hugeicons/star — node 1:21369) */
const STAR_PATH =
  'M15.1729 2.74505L17.2993 7.03306C17.5893 7.62997 18.3625 8.20251 19.0149 8.31215L22.8691 8.95779C25.3338 9.37197 25.9138 11.1749 24.1377 12.9534L21.1414 15.9745C20.6339 16.4862 20.356 17.4729 20.5131 18.1794L21.3709 21.9193C22.0475 24.8795 20.4889 26.0245 17.8913 24.4775L14.2788 22.3213C13.6264 21.9314 12.5511 21.9314 11.8866 22.3213L8.27404 24.4775C5.68849 26.0245 4.11783 24.8673 4.79442 21.9193L5.65224 18.1794C5.80931 17.4729 5.53142 16.4862 5.02398 15.9745L2.02764 12.9534C0.263672 11.1749 0.831526 9.37197 3.29625 8.95779L7.15041 8.31215C7.79076 8.20251 8.564 7.62997 8.85397 7.03306L10.9804 2.74505C12.1403 0.418317 14.0251 0.418317 15.1729 2.74505Z'

/** Stagger de entrada (ms) — ritmo do Figma comprimido p/ interação */
const STAGGER_MS = [0, 90, 170, 240, 300]

const props = defineProps({
  /** Nota atual (0–max). Use v-model. */
  modelValue: { type: Number, required: false, default: 0 },
  /** Número de estrelas */
  max: { type: Number, required: false, default: 5 },
  /** Somente leitura (exibe valor, sem interação) */
  readonly: { type: Boolean, required: false, default: false },
  disabled: { type: Boolean, required: false, default: false },
  /**
   * Loop de demonstração do Figma (outline → pop filled em sequência).
   * Não interativo enquanto ativo.
   */
  demo: { type: Boolean, required: false, default: false },
  /** Tamanho do hit/ícone em px (Figma: 29) */
  size: { type: Number, required: false, default: 29 },
  label: { type: String, required: false, default: 'Avaliação' },
  id: { type: String, required: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

const rootId = computed(() => props.id ?? `star-rating-${useId()}`)
const hoverValue = ref(0)
/** Estrelas que devem tocar a animação de fill neste ciclo */
const animatingStars = ref(/** @type {Set<number>} */ (new Set()))
const reducedMotion = ref(false)
let animClearTimer = 0

const stars = computed(() =>
  Array.from({ length: Math.max(1, Math.floor(props.max)) }, (_, i) => i + 1),
)

const displayValue = computed(() => {
  if (props.demo) return props.max
  if (props.readonly || props.disabled) return props.modelValue
  return hoverValue.value || props.modelValue
})

const interactive = computed(
  () => !props.readonly && !props.disabled && !props.demo,
)

function isFilled(n) {
  return n <= displayValue.value
}

function isAnimating(n) {
  return animatingStars.value.has(n)
}

function queueFillAnimation(from, to) {
  if (reducedMotion.value || props.demo) return
  if (to <= from) {
    animatingStars.value = new Set()
    return
  }
  const next = new Set()
  for (let i = from + 1; i <= to; i++) next.add(i)
  animatingStars.value = next
  window.clearTimeout(animClearTimer)
  const lastDelay = STAGGER_MS[Math.min(to - 1, STAGGER_MS.length - 1)] ?? 300
  animClearTimer = window.setTimeout(() => {
    animatingStars.value = new Set()
  }, lastDelay + 560)
}

function select(n) {
  if (!interactive.value) return
  const next = props.modelValue === n ? 0 : n
  emit('update:modelValue', next)
  emit('change', next)
}

function onMouseEnter(n) {
  if (!interactive.value) return
  hoverValue.value = n
}

function onMouseLeave() {
  hoverValue.value = 0
}

function onKeydown(event) {
  if (!interactive.value) return
  const max = stars.value.length
  let next = props.modelValue

  if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
    event.preventDefault()
    next = Math.min(max, (props.modelValue || 0) + 1)
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
    event.preventDefault()
    next = Math.max(0, props.modelValue - 1)
  } else if (event.key === 'Home') {
    event.preventDefault()
    next = 1
  } else if (event.key === 'End') {
    event.preventDefault()
    next = max
  } else {
    return
  }

  emit('update:modelValue', next)
  emit('change', next)
}

watch(
  () => props.modelValue,
  (next, prev) => {
    queueFillAnimation(prev ?? 0, next ?? 0)
  },
)

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (props.modelValue > 0 && !props.demo) {
    queueFillAnimation(0, props.modelValue)
  }
})
</script>

<template>
  <div
    :id="rootId"
    :class="[
      'doity-star-rating',
      {
        'doity-star-rating--readonly': props.readonly,
        'doity-star-rating--disabled': props.disabled,
        'doity-star-rating--demo': props.demo,
        'doity-star-rating--interactive': interactive,
      },
    ]"
    role="slider"
    :aria-label="props.label"
    :aria-valuemin="0"
    :aria-valuemax="stars.length"
    :aria-valuenow="props.demo ? stars.length : props.modelValue"
    :aria-valuetext="`${props.demo ? stars.length : props.modelValue} de ${stars.length}`"
    :aria-disabled="props.disabled || undefined"
    :aria-readonly="props.readonly || props.demo || undefined"
    :tabindex="interactive ? 0 : -1"
    :style="{ '--doity-star-size': `${props.size}px` }"
    @mouseleave="onMouseLeave"
    @keydown="onKeydown"
  >
    <button
      v-for="n in stars"
      :key="n"
      type="button"
      class="doity-star-rating__star"
      :class="{
        'doity-star-rating__star--filled': isFilled(n),
        'doity-star-rating__star--animating': isAnimating(n),
        'doity-star-rating__star--odd': n % 2 === 1,
        'doity-star-rating__star--even': n % 2 === 0,
      }"
      :style="{
        '--star-delay': `${STAGGER_MS[n - 1] ?? (n - 1) * 80}ms`,
        '--star-index': n,
      }"
      :tabindex="-1"
      :disabled="!interactive"
      :aria-label="`${n} ${n === 1 ? 'estrela' : 'estrelas'}`"
      @mouseenter="onMouseEnter(n)"
      @click="select(n)"
    >
      <span class="doity-star-rating__glyph doity-star-rating__glyph--empty" aria-hidden="true">
        <svg viewBox="0 0 26.1706 26.1687" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            :d="STAR_PATH"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <span class="doity-star-rating__glyph doity-star-rating__glyph--filled" aria-hidden="true">
        <svg viewBox="0 0 26.1706 26.1687" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            :d="STAR_PATH"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<style scoped>
.doity-star-rating {
  --doity-star-color: #fec84b;
  align-items: center;
  color: var(--doity-star-color);
  display: inline-flex;
  /* Figma: gap 11.6px */
  gap: 11.6px;
  outline: none;
  user-select: none;
}

.doity-star-rating:focus-visible {
  border-radius: var(--doity-radius-sm, 6px);
  outline: 2px solid var(--doity-color-border-focus, #ff2b34);
  outline-offset: 4px;
}

.doity-star-rating--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.doity-star-rating--interactive .doity-star-rating__star {
  cursor: pointer;
}

.doity-star-rating__star {
  --star-rotate: -14deg;
  align-items: center;
  background: none;
  border: none;
  color: inherit;
  display: inline-flex;
  flex-shrink: 0;
  height: var(--doity-star-size, 29px);
  justify-content: center;
  padding: 0;
  position: relative;
  width: var(--doity-star-size, 29px);
}

.doity-star-rating__star--even {
  --star-rotate: 14deg;
}

.doity-star-rating__glyph {
  display: block;
  height: 83.34%;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 83.34%;
}

.doity-star-rating__glyph svg {
  display: block;
  height: 100%;
  overflow: visible;
  width: 100%;
}

.doity-star-rating__glyph--empty {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  transition: opacity 0.12s ease, transform 0.12s ease;
}

.doity-star-rating__glyph--filled {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.55);
  transition: opacity 0.12s ease, transform 0.12s ease;
}

/* Estado filled (inclui hover preview) — sem keyframes */
.doity-star-rating__star--filled .doity-star-rating__glyph--empty {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.55);
}

.doity-star-rating__star--filled .doity-star-rating__glyph--filled {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1) rotate(0deg);
}

/* Animação de seleção (só estrelas novas) — valores do Figma */
.doity-star-rating__star--animating .doity-star-rating__glyph--empty {
  animation: doity-star-empty-out 0.18s ease-in both;
  animation-delay: var(--star-delay, 0ms);
  transition: none;
}

.doity-star-rating__star--animating .doity-star-rating__glyph--filled {
  animation: doity-star-fill 0.52s both;
  animation-delay: var(--star-delay, 0ms);
  transition: none;
}

/* Demo loop — timeline Figma ~5.392s, stagger ~0.4s */
.doity-star-rating--demo .doity-star-rating__star--filled .doity-star-rating__glyph--empty {
  animation: doity-star-empty-demo 5.392s linear infinite;
  animation-delay: calc((var(--star-index) - 1) * 0.4s);
  transition: none;
}

.doity-star-rating--demo .doity-star-rating__star--filled .doity-star-rating__glyph--filled {
  animation: doity-star-fill-demo 5.392s linear infinite;
  animation-delay: calc((var(--star-index) - 1) * 0.4s);
  transition: none;
}

@keyframes doity-star-empty-out {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  45% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.06);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.55);
  }
}

@keyframes doity-star-fill {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.55) rotate(var(--star-rotate, -14deg));
  }
  45% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
  70% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.12) rotate(0deg);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
}

@keyframes doity-star-empty-demo {
  0%,
  14% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  16% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.06);
  }
  18%,
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.55);
  }
}

@keyframes doity-star-fill-demo {
  0%,
  14% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.55) rotate(var(--star-rotate, -14deg));
  }
  18% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.55) rotate(var(--star-rotate, -14deg));
  }
  26% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
  58% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
  62% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.12) rotate(0deg);
  }
  72%,
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .doity-star-rating__star--animating .doity-star-rating__glyph--empty,
  .doity-star-rating__star--animating .doity-star-rating__glyph--filled,
  .doity-star-rating--demo .doity-star-rating__star--filled .doity-star-rating__glyph--empty,
  .doity-star-rating--demo .doity-star-rating__star--filled .doity-star-rating__glyph--filled {
    animation: none;
  }

  .doity-star-rating__glyph--empty,
  .doity-star-rating__glyph--filled {
    transition: none;
  }
}
</style>
