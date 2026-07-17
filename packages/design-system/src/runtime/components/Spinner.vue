<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * circle — arco Lucide loader-circle
   * spokes — 8 raios Lucide loader com fade sequencial
   */
  type: { type: String, required: false, default: 'circle' },
  /** xs=12 · sm=16 · md=24 · lg=32 */
  size: { type: String, required: false, default: 'md' },
  /**
   * default | brand | red | green | blue | yellow |
   * success | error | warning | muted | white
   */
  color: { type: String, required: false, default: 'default' },
  label: { type: String, required: false, default: 'Carregando...' },
})

const isSpokes = computed(() => props.type === 'spokes' || props.type === 'loader')
const sizePx = computed(() => {
  const map = { xs: 12, sm: 16, md: 24, lg: 32 }
  return map[props.size] ?? 24
})
const strokeWidth = computed(() => {
  if (sizePx.value <= 12) return 1.33
  if (sizePx.value <= 16) return 1.5
  if (sizePx.value <= 24) return 2
  return 2.5
})

/** Coordenadas Lucide loader (viewBox 24) — 8 raios */
const SPOKES = [
  'M12 2v4',
  'm16.2 7.8 2.9-2.9',
  'M18 12h4',
  'm16.2 16.2 2.9 2.9',
  'M12 18v4',
  'm4.9 19.1 2.9-2.9',
  'M2 12h4',
  'm4.9 4.9 2.9 2.9',
]
</script>

<template>
  <span
    :class="[
      'doity-spinner',
      `doity-spinner--${props.size}`,
      `doity-spinner--${props.color}`,
      `doity-spinner--${isSpokes ? 'spokes' : 'circle'}`,
    ]"
    :role="props.label ? 'status' : undefined"
    :aria-label="props.label || undefined"
    :aria-hidden="props.label ? undefined : true"
  >
    <!-- Circle: Lucide loader-circle — rotate suave -->
    <svg
      v-if="!isSpokes"
      class="doity-spinner__svg doity-spinner__svg--circle"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        class="doity-spinner__track"
        cx="12"
        cy="12"
        r="9"
        :stroke-width="strokeWidth"
      />
      <path
        class="doity-spinner__arc"
        d="M21 12a9 9 0 1 1-6.219-8.56"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
      />
    </svg>

    <!-- Spokes: Lucide loader — fade em cascata -->
    <svg
      v-else
      class="doity-spinner__svg doity-spinner__svg--spokes"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        v-for="(d, i) in SPOKES"
        :key="i"
        class="doity-spinner__spoke-path"
        :d="d"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        :style="{ '--doity-spoke-i': i }"
      />
    </svg>
  </span>
</template>

<style scoped>
.doity-spinner {
  --doity-spinner-color: var(--doity-color-text-primary, #0a0a0a);
  --doity-spinner-track: color-mix(in srgb, var(--doity-spinner-color) 14%, transparent);
  align-items: center;
  color: var(--doity-spinner-color);
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  line-height: 0;
}

.doity-spinner--xs {
  height: 12px;
  width: 12px;
}

.doity-spinner--sm {
  height: 16px;
  width: 16px;
}

.doity-spinner--md {
  height: 24px;
  width: 24px;
}

.doity-spinner--lg {
  height: 32px;
  width: 32px;
}

/* Cores */
.doity-spinner--default {
  --doity-spinner-color: var(--doity-color-text-primary, #0a0a0a);
}

.doity-spinner--brand {
  --doity-spinner-color: var(--doity-color-brand-500, #ff2b34);
}

.doity-spinner--red {
  --doity-spinner-color: #f43f5e;
}

.doity-spinner--green {
  --doity-spinner-color: #22c55e;
}

.doity-spinner--blue {
  --doity-spinner-color: #3b82f6;
}

.doity-spinner--yellow {
  --doity-spinner-color: #eab308;
}

.doity-spinner--success {
  --doity-spinner-color: var(--doity-color-success-500, #12b76a);
}

.doity-spinner--error {
  --doity-spinner-color: var(--doity-color-error-500, #f04438);
}

.doity-spinner--warning {
  --doity-spinner-color: var(--doity-color-warning-500, #f79009);
}

.doity-spinner--muted {
  --doity-spinner-color: var(--doity-color-text-tertiary, #737373);
}

.doity-spinner--white {
  --doity-spinner-color: #fafafa;
  --doity-spinner-track: rgba(255, 255, 255, 0.22);
}

.doity-spinner__svg {
  display: block;
  height: 100%;
  overflow: visible;
  width: 100%;
}

/* —— Circle: rotate contínuo + leve “pulse” no arco —— */
.doity-spinner__svg--circle {
  animation: doity-spinner-rotate 0.75s linear infinite;
  transform-origin: center;
  will-change: transform;
}

.doity-spinner__track {
  fill: none;
  stroke: var(--doity-spinner-track);
}

.doity-spinner__arc {
  fill: none;
  stroke: currentColor;
}

/* —— Spokes: fade sequencial (estilo iOS / Lucide) —— */
.doity-spinner__spoke-path {
  fill: none;
  stroke: currentColor;
  animation: doity-spinner-spoke 0.8s linear infinite;
  animation-delay: calc(var(--doity-spoke-i) * -0.1s);
}

@keyframes doity-spinner-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes doity-spinner-spoke {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.15;
  }
}

@media (prefers-reduced-motion: reduce) {
  .doity-spinner__svg--circle,
  .doity-spinner__spoke-path {
    animation: none;
  }

  .doity-spinner__spoke-path {
    opacity: 0.35;
  }

  .doity-spinner__spoke-path:nth-child(1),
  .doity-spinner__spoke-path:nth-child(2) {
    opacity: 1;
  }
}
</style>
