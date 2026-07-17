<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'

/**
 * Stepper horizontal com ícones (checkout / inscrição).
 * A trilha fica vermelha conforme o progresso; ao chegar num passo,
 * o ícone dá bounce elástico.
 */
const props = defineProps({
  /** Índice do passo ativo (0-based) — v-model */
  modelValue: { type: Number, required: false, default: 0 },
  /**
   * Passos: string[] (ícone padrão) ou
   * { label?, icon?: 'check' | 'card' | 'dot' }[]
   */
  steps: {
    type: Array,
    required: false,
    default: () => [{ icon: 'check' }, { icon: 'card' }, { icon: 'check' }],
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

/** Deve bater com `transition: width` da trilha */
const TRAIL_DURATION_MS = 550
const BOUNCE_DURATION_MS = 640

const bounceIndex = ref(-1)
const fillProgress = ref(0)

let trailTimer = null
let bounceTimer = null

const normalized = computed(() =>
  props.steps.map((s, i) => {
    if (typeof s === 'string') return { label: s, icon: 'check', index: i }
    return {
      label: s?.label ?? '',
      icon: s?.icon ?? (i === 0 ? 'check' : i === 1 ? 'card' : 'check'),
      index: i,
    }
  }),
)

const current = computed(() =>
  Math.min(Math.max(0, props.modelValue), Math.max(0, normalized.value.length - 1)),
)

/** Fração 0–1 do preenchimento vermelho das trilhas (até o passo ativo) */
const targetFill = computed(() => {
  const n = normalized.value.length
  if (n <= 1) return 1
  return current.value / (n - 1)
})

function stateOf(index) {
  if (index < current.value) return 'complete'
  if (index === current.value) return 'active'
  return 'inactive'
}

function trailFilled(trailIndex) {
  // trail entre step trailIndex e trailIndex+1
  return trailIndex < current.value
}

function clearAnimTimers() {
  if (trailTimer != null) {
    window.clearTimeout(trailTimer)
    trailTimer = null
  }
  if (bounceTimer != null) {
    window.clearTimeout(bounceTimer)
    bounceTimer = null
  }
}

function triggerBounce(index) {
  bounceIndex.value = index
  bounceTimer = window.setTimeout(() => {
    if (bounceIndex.value === index) bounceIndex.value = -1
    bounceTimer = null
  }, BOUNCE_DURATION_MS)
}

watch(
  current,
  (next, prev) => {
    fillProgress.value = targetFill.value
    clearAnimTimers()
    bounceIndex.value = -1

    // Montagem: trilha já no estado final, sem bounce
    if (prev === undefined || next === prev) return

    // Avanço: espera a linha vermelha chegar no ícone; volta: bounce imediato
    const delay = next > prev ? TRAIL_DURATION_MS : 0
    trailTimer = window.setTimeout(() => {
      trailTimer = null
      triggerBounce(next)
    }, delay)
  },
  { immediate: true },
)

onBeforeUnmount(clearAnimTimers)

function select(index) {
  emit('update:modelValue', index)
  emit('change', index)
}
</script>

<template>
  <nav
    class="doity-stepper"
    aria-label="Progresso"
  >
    <ol class="doity-stepper__list">
      <template
        v-for="(step, i) in normalized"
        :key="step.index"
      >
        <li
          class="doity-stepper__step"
          :class="[
            `doity-stepper__step--${stateOf(i)}`,
            { 'doity-stepper__step--bounce': bounceIndex === i },
          ]"
        >
          <button
            type="button"
            class="doity-stepper__symbol"
            :aria-label="step.label || `Passo ${i + 1}`"
            :aria-current="stateOf(i) === 'active' ? 'step' : undefined"
            @click="select(i)"
          >
            <!-- complete: círculo vermelho + check -->
            <template v-if="stateOf(i) === 'complete'">
              <span class="doity-stepper__circle doity-stepper__circle--filled" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path
                    d="M5 12.5 10 17.5 19 7"
                    stroke="#fff"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </template>

            <!-- active: borda vermelha + ícone -->
            <template v-else-if="stateOf(i) === 'active'">
              <span class="doity-stepper__circle doity-stepper__circle--active" aria-hidden="true">
                <svg
                  v-if="step.icon === 'card'"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    rx="2"
                    stroke="var(--doity-color-action-primary-default, #ff2b34)"
                    stroke-width="1.8"
                  />
                  <path
                    d="M3 10h18"
                    stroke="var(--doity-color-action-primary-default, #ff2b34)"
                    stroke-width="1.8"
                  />
                  <circle
                    cx="18.5"
                    cy="7.5"
                    r="3.5"
                    fill="var(--doity-color-action-primary-default, #ff2b34)"
                  />
                  <path
                    d="M17 7.5h3M18.5 6v3"
                    stroke="#fff"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                >
                  <path
                    d="M5 12.5 10 17.5 19 7"
                    stroke="var(--doity-color-action-primary-default, #ff2b34)"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </template>

            <!-- inactive -->
            <template v-else>
              <span class="doity-stepper__circle" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path
                    d="M5 12.5 10 17.5 19 7"
                    stroke="#d5d7da"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </template>
          </button>
        </li>

        <li
          v-if="i < normalized.length - 1"
          class="doity-stepper__trail"
          :class="{ 'doity-stepper__trail--filled': trailFilled(i) }"
          aria-hidden="true"
        >
          <span class="doity-stepper__trail-track" />
          <span class="doity-stepper__trail-fill" />
        </li>
      </template>
    </ol>
  </nav>
</template>

<style scoped>
.doity-stepper {
  font-family: var(--doity-font-family-sans);
  width: 100%;
}

.doity-stepper__list {
  align-items: center;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.doity-stepper__step {
  flex-shrink: 0;
}

.doity-stepper__symbol {
  align-items: center;
  background: none;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  justify-content: center;
  padding: 0;
  width: 32px;
}

.doity-stepper__circle {
  align-items: center;
  background: #fff;
  border: 2px solid #d5d7da;
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-flex;
  height: 32px;
  justify-content: center;
  transition:
    border-color 0.4s cubic-bezier(0.33, 1, 0.68, 1),
    background 0.4s cubic-bezier(0.33, 1, 0.68, 1),
    box-shadow 0.4s cubic-bezier(0.33, 1, 0.68, 1),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  width: 32px;
}

.doity-stepper__circle--filled {
  background: var(--doity-color-action-primary-default, #ff2b34);
  border-color: var(--doity-color-action-primary-default, #ff2b34);
}

.doity-stepper__circle--active {
  border-color: var(--doity-color-action-primary-default, #ff2b34);
  box-shadow: 0 0 0 3px rgb(255 43 52 / 12%);
}

.doity-stepper__step--bounce .doity-stepper__circle {
  animation: doity-icon-soft 0.64s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-stepper__trail {
  flex: 1 1 0;
  height: 32px;
  min-width: 24px;
  position: relative;
}

.doity-stepper__trail-track,
.doity-stepper__trail-fill {
  border-radius: 1px;
  height: 2px;
  left: 0;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.doity-stepper__trail-track {
  background: #d5d7da;
}

.doity-stepper__trail-fill {
  background: var(--doity-color-action-primary-default, #ff2b34);
  right: auto;
  transform-origin: left center;
  transition: width 0.55s cubic-bezier(0.33, 1, 0.68, 1);
  width: 0;
}

.doity-stepper__trail--filled .doity-stepper__trail-fill {
  width: 100%;
}

@keyframes doity-icon-soft {
  0% { transform: scale(1); }
  40% { transform: scale(1.08); }
  70% { transform: scale(0.98); }
  100% { transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .doity-stepper__circle,
  .doity-stepper__trail-fill {
    transition: none;
  }
  .doity-stepper__step--bounce .doity-stepper__circle {
    animation: none;
  }
}
</style>
