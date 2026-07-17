<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  /** Índice do passo ativo (0-based) — v-model */
  modelValue: { type: Number, required: false, default: 0 },
  /**
   * Passos: string[] ou { label: string }[]
   */
  steps: { type: Array, required: false, default: () => ['Step Name', 'Step Name', 'Step Name'] },
})

const emit = defineEmits(['update:modelValue', 'change'])

const pulseIndex = ref(-1)

const normalized = computed(() =>
  props.steps.map((s, i) => {
    if (typeof s === 'string') return { label: s, index: i }
    return { label: s?.label ?? `Step ${i + 1}`, index: i }
  }),
)

const current = computed(() =>
  Math.min(Math.max(0, props.modelValue), Math.max(0, normalized.value.length - 1)),
)

function stateOf(index) {
  if (index < current.value) return 'complete'
  if (index === current.value) return 'active'
  return 'inactive'
}

watch(current, (next, prev) => {
  if (prev === undefined || next === prev) return
  pulseIndex.value = next
  window.setTimeout(() => {
    if (pulseIndex.value === next) pulseIndex.value = -1
  }, 700)
})

function select(index) {
  emit('update:modelValue', index)
  emit('change', index)
}
</script>

<template>
  <nav
    class="doity-minimal-stepper"
    aria-label="Progresso"
  >
    <ol class="doity-minimal-stepper__list">
      <li
        v-for="step in normalized"
        :key="step.index"
        class="doity-minimal-stepper__item"
        :class="[
          `doity-minimal-stepper__item--${stateOf(step.index)}`,
          { 'doity-minimal-stepper__item--pulse': pulseIndex === step.index },
        ]"
      >
        <button
          type="button"
          class="doity-minimal-stepper__btn"
          :aria-current="stateOf(step.index) === 'active' ? 'step' : undefined"
          @click="select(step.index)"
        >
          <span
            class="doity-minimal-stepper__bar"
            aria-hidden="true"
          >
            <span class="doity-minimal-stepper__bar-track" />
            <span class="doity-minimal-stepper__bar-fill" />
          </span>

          <span class="doity-minimal-stepper__meta">
            <span
              class="doity-minimal-stepper__icon"
              aria-hidden="true"
            >
              <span class="doity-minimal-stepper__glyph doity-minimal-stepper__glyph--inactive">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </span>

              <span class="doity-minimal-stepper__glyph doity-minimal-stepper__glyph--active">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                  <circle
                    class="doity-minimal-stepper__ring"
                    cx="8"
                    cy="8"
                    r="8"
                    fill="currentColor"
                  />
                  <circle
                    class="doity-minimal-stepper__dot"
                    cx="8"
                    cy="8"
                    r="3"
                    fill="#fff"
                  />
                </svg>
              </span>

              <span class="doity-minimal-stepper__glyph doity-minimal-stepper__glyph--complete">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                  <circle
                    cx="8"
                    cy="8"
                    r="8"
                    fill="currentColor"
                  />
                  <path
                    class="doity-minimal-stepper__check"
                    d="M4.8 8.2 7 10.4l4.4-4.8"
                    stroke="#fff"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                  />
                </svg>
              </span>
            </span>

            <span class="doity-minimal-stepper__label">{{ step.label }}</span>
          </span>
        </button>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.doity-minimal-stepper {
  font-family: var(--doity-font-family-sans);
  width: 100%;
}

.doity-minimal-stepper__list {
  display: flex;
  gap: 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.doity-minimal-stepper__item {
  flex: 1 1 0;
  min-width: 0;
}

.doity-minimal-stepper__btn {
  background: none;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0;
  text-align: left;
  width: 100%;
}

/* —— Bar: track + fill that expands —— */
.doity-minimal-stepper__bar {
  display: block;
  height: 4px;
  position: relative;
  width: 100%;
}

.doity-minimal-stepper__bar-track,
.doity-minimal-stepper__bar-fill {
  border-radius: 100px;
  height: 4px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.doity-minimal-stepper__bar-track {
  background: #c1c9d2;
}

.doity-minimal-stepper__bar-fill {
  background: var(--doity-color-action-primary-default, #ff2b34);
  transform: scaleX(0);
  transform-origin: left center;
  transition:
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.4s cubic-bezier(0.33, 1, 0.68, 1);
}

.doity-minimal-stepper__item--active .doity-minimal-stepper__bar-fill,
.doity-minimal-stepper__item--complete .doity-minimal-stepper__bar-fill {
  transform: scaleX(1);
}

.doity-minimal-stepper__item--complete .doity-minimal-stepper__bar-fill {
  background: #697386;
}

/* —— Meta / label —— */
.doity-minimal-stepper__meta {
  align-items: center;
  display: flex;
  gap: 4px;
  min-width: 0;
  transition: gap 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-minimal-stepper__item--complete .doity-minimal-stepper__meta {
  gap: 8px;
}

.doity-minimal-stepper__label {
  color: #4f566b;
  flex: 1 1 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.35s cubic-bezier(0.33, 1, 0.68, 1);
  white-space: nowrap;
}

.doity-minimal-stepper__item--active .doity-minimal-stepper__label {
  color: #3c4257;
}

.doity-minimal-stepper__item--complete .doity-minimal-stepper__label {
  color: #697386;
}

/* —— Icons: stacked crossfade —— */
.doity-minimal-stepper__icon {
  color: #c1c9d2;
  display: inline-grid;
  flex-shrink: 0;
  height: 16px;
  place-items: center;
  position: relative;
  width: 16px;
}

.doity-minimal-stepper__glyph {
  display: inline-flex;
  grid-area: 1 / 1;
  height: 16px;
  opacity: 0;
  transform: scale(0.72);
  transition:
    opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  width: 16px;
}

.doity-minimal-stepper__glyph svg {
  display: block;
}

.doity-minimal-stepper__glyph--inactive {
  color: #c1c9d2;
  opacity: 1;
  transform: scale(1);
}

.doity-minimal-stepper__glyph--active {
  color: var(--doity-color-action-primary-default, #ff2b34);
}

.doity-minimal-stepper__glyph--complete {
  color: #697386;
}

.doity-minimal-stepper__item--active .doity-minimal-stepper__glyph--inactive,
.doity-minimal-stepper__item--complete .doity-minimal-stepper__glyph--inactive {
  opacity: 0;
  transform: scale(0.72);
}

.doity-minimal-stepper__item--active .doity-minimal-stepper__glyph--active {
  opacity: 1;
  transform: scale(1);
}

.doity-minimal-stepper__item--complete .doity-minimal-stepper__glyph--active {
  opacity: 0;
  transform: scale(0.72);
}

.doity-minimal-stepper__item--complete .doity-minimal-stepper__glyph--complete {
  opacity: 1;
  transform: scale(1);
}

.doity-minimal-stepper__dot {
  transform-origin: center;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-minimal-stepper__check {
  stroke-dasharray: 14;
  stroke-dashoffset: 14;
  transition: stroke-dashoffset 0.4s 0.08s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-minimal-stepper__item--complete .doity-minimal-stepper__check {
  stroke-dashoffset: 0;
}

/* Pulse suave ao entrar no passo ativo */
.doity-minimal-stepper__item--pulse.doity-minimal-stepper__item--active
  .doity-minimal-stepper__glyph--active {
  animation: doity-minimal-enter 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-minimal-stepper__item--pulse.doity-minimal-stepper__item--active
  .doity-minimal-stepper__dot {
  animation: doity-minimal-dot 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-minimal-stepper__item--pulse.doity-minimal-stepper__item--active
  .doity-minimal-stepper__bar-fill {
  animation: doity-minimal-bar-enter 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes doity-minimal-enter {
  0% {
    opacity: 0.4;
    transform: scale(0.78);
  }
  55% {
    opacity: 1;
    transform: scale(1.08);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes doity-minimal-dot {
  0% { transform: scale(0.4); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

@keyframes doity-minimal-bar-enter {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}

@media (prefers-reduced-motion: reduce) {
  .doity-minimal-stepper__bar-fill,
  .doity-minimal-stepper__glyph,
  .doity-minimal-stepper__label,
  .doity-minimal-stepper__meta,
  .doity-minimal-stepper__check,
  .doity-minimal-stepper__dot {
    transition: none;
  }

  .doity-minimal-stepper__item--pulse.doity-minimal-stepper__item--active
    .doity-minimal-stepper__glyph--active,
  .doity-minimal-stepper__item--pulse.doity-minimal-stepper__item--active
    .doity-minimal-stepper__dot,
  .doity-minimal-stepper__item--pulse.doity-minimal-stepper__item--active
    .doity-minimal-stepper__bar-fill {
    animation: none;
  }

  .doity-minimal-stepper__item--complete .doity-minimal-stepper__check {
    stroke-dashoffset: 0;
  }
}
</style>
