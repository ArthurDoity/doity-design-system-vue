<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Number, required: false, default: 0 },
  /**
   * Passos: string[] ou { label, description }[]
   */
  steps: {
    type: Array,
    required: false,
    default: () => [
      { label: 'Step Name', description: 'Short step description' },
      { label: 'Step Name', description: 'Short step description' },
      { label: 'Step Name', description: 'Short step description' },
    ],
  },
  /** Título opcional acima */
  title: { type: String, required: false, default: '' },
  /** Esconde description quando true (útil em 5–6 passos) */
  compact: { type: Boolean, required: false, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])

/** Passo que acaba de ficar ativo — dispara enter */
const enterIndex = ref(-1)
/** Passo que acabou de completar (ao avançar) */
const settleIndex = ref(-1)
/** 1 = avançando, -1 = voltando */
const enterDir = ref(0)

const normalized = computed(() =>
  props.steps.map((s, i) => {
    if (typeof s === 'string') return { label: s, description: '', index: i }
    return {
      label: s?.label ?? `Step ${i + 1}`,
      description: s?.description ?? '',
      index: i,
    }
  }),
)

const current = computed(() =>
  Math.min(Math.max(0, props.modelValue), Math.max(0, normalized.value.length - 1)),
)

const showDescription = computed(
  () => !props.compact && normalized.value.some(s => s.description) && normalized.value.length <= 4,
)

function stateOf(index) {
  if (index < current.value) return 'complete'
  if (index === current.value) return 'active'
  return 'inactive'
}

function positionOf(index) {
  if (index === 0) return 'start'
  if (index === normalized.value.length - 1) return 'end'
  return 'middle'
}

watch(current, (next, prev) => {
  if (prev === undefined || next === prev) return

  const dir = next > prev ? 1 : -1
  enterDir.value = dir
  enterIndex.value = next
  settleIndex.value = dir === 1 ? prev : -1

  window.setTimeout(() => {
    if (enterIndex.value === next) {
      enterIndex.value = -1
      enterDir.value = 0
    }
    if (settleIndex.value === prev) settleIndex.value = -1
  }, 680)
})

function select(index) {
  emit('update:modelValue', index)
  emit('change', index)
}
</script>

<template>
  <nav class="doity-arrow-stepper" aria-label="Progresso">
    <p
      v-if="title"
      class="doity-arrow-stepper__title"
    >
      {{ title }}
    </p>
    <ol class="doity-arrow-stepper__list">
      <li
        v-for="step in normalized"
        :key="step.index"
        class="doity-arrow-stepper__item"
        :class="[
          `doity-arrow-stepper__item--${stateOf(step.index)}`,
          `doity-arrow-stepper__item--${positionOf(step.index)}`,
          {
            'doity-arrow-stepper__item--enter': enterIndex === step.index,
            'doity-arrow-stepper__item--enter-forward': enterIndex === step.index && enterDir === 1,
            'doity-arrow-stepper__item--enter-back': enterIndex === step.index && enterDir === -1,
            'doity-arrow-stepper__item--settle': settleIndex === step.index,
          },
        ]"
      >
        <button
          type="button"
          class="doity-arrow-stepper__btn"
          :aria-current="stateOf(step.index) === 'active' ? 'step' : undefined"
          @click="select(step.index)"
        >
          <span class="doity-arrow-stepper__content">
            <span class="doity-arrow-stepper__label">{{ step.label }}</span>
            <span
              v-if="showDescription && step.description"
              class="doity-arrow-stepper__desc"
            >
              {{ step.description }}
            </span>
          </span>
        </button>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.doity-arrow-stepper {
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  gap: 3px;
  width: 100%;
}

.doity-arrow-stepper__title {
  color: #2a2f45;
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  margin: 0;
}

.doity-arrow-stepper__list {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.doity-arrow-stepper__item {
  flex: 1 1 0;
  min-width: 0;
}

.doity-arrow-stepper__btn {
  align-items: flex-start;
  background: #fff;
  border: 0;
  box-sizing: border-box;
  color: #3c4257;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0 0 0.6px #d2d6dc) drop-shadow(0 0 0.6px #d2d6dc);
  height: 56px;
  justify-content: center;
  padding: 0 16px 0 24px;
  text-align: left;
  transform-origin: center center;
  transition:
    background 0.45s cubic-bezier(0.33, 1, 0.68, 1),
    color 0.4s cubic-bezier(0.33, 1, 0.68, 1),
    filter 0.45s cubic-bezier(0.33, 1, 0.68, 1),
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;
}

.doity-arrow-stepper__btn:hover {
  filter: drop-shadow(0 0 0.8px #aab2bd) drop-shadow(0 1px 2px rgb(42 47 69 / 0.08));
}

.doity-arrow-stepper__btn:active {
  transform: scale(0.985);
}

/* Chevron shapes via clip-path */
.doity-arrow-stepper__item--start .doity-arrow-stepper__btn {
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%);
  padding-left: 24px;
  padding-right: 24px;
}

.doity-arrow-stepper__item--middle .doity-arrow-stepper__btn {
  clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%, 14px 50%);
  padding-left: 32px;
  padding-right: 16px;
}

.doity-arrow-stepper__item--end .doity-arrow-stepper__btn {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 14px 50%);
  padding-left: 32px;
  padding-right: 16px;
}

.doity-arrow-stepper__item--active .doity-arrow-stepper__btn {
  background: #fff1f2;
  color: var(--doity-color-action-primary-default, #ff2b34);
  filter: drop-shadow(0 0 0.7px var(--doity-color-action-primary-default, #ff2b34)) drop-shadow(0 0 0.7px var(--doity-color-action-primary-default, #ff2b34));
}

.doity-arrow-stepper__item--active .doity-arrow-stepper__btn:hover {
  filter:
    drop-shadow(0 0 0.9px var(--doity-color-action-primary-default, #ff2b34))
    drop-shadow(0 0 0.9px var(--doity-color-action-primary-default, #ff2b34))
    drop-shadow(0 2px 6px rgb(255 43 52 / 0.14));
}

.doity-arrow-stepper__item--complete .doity-arrow-stepper__btn {
  background: var(--doity-color-action-primary-default, #ff2b34);
  color: #fff;
  filter: none;
}

.doity-arrow-stepper__item--complete .doity-arrow-stepper__btn:hover {
  filter: drop-shadow(0 2px 6px rgb(255 43 52 / 0.28));
}

.doity-arrow-stepper__content {
  display: flex;
  flex-direction: column;
  min-width: 0;
  width: 100%;
}

.doity-arrow-stepper__label {
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.doity-arrow-stepper__desc {
  color: #697386;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.35s cubic-bezier(0.33, 1, 0.68, 1);
  white-space: nowrap;
  width: 100%;
}

.doity-arrow-stepper__item--active .doity-arrow-stepper__desc {
  color: var(--doity-color-action-primary-default, #ff2b34);
}

.doity-arrow-stepper__item--complete .doity-arrow-stepper__desc {
  color: #fff;
}

/* Enter: passo que acaba de ficar ativo — nibble na direção do fluxo */
.doity-arrow-stepper__item--enter-forward .doity-arrow-stepper__btn {
  animation: doity-arrow-enter-forward 0.68s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-arrow-stepper__item--enter-back .doity-arrow-stepper__btn {
  animation: doity-arrow-enter-back 0.68s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-arrow-stepper__item--enter .doity-arrow-stepper__content {
  animation: doity-arrow-content 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.04s both;
}

/* Settle: passo que acabou de completar ao avançar */
.doity-arrow-stepper__item--settle .doity-arrow-stepper__btn {
  animation: doity-arrow-settle 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes doity-arrow-enter-forward {
  0% {
    filter:
      drop-shadow(0 0 0.7px var(--doity-color-action-primary-default, #ff2b34))
      drop-shadow(0 0 8px rgb(255 43 52 / 0));
    transform: translateX(-10px) scale(0.96);
  }
  45% {
    filter:
      drop-shadow(0 0 0.9px var(--doity-color-action-primary-default, #ff2b34))
      drop-shadow(0 0 10px rgb(255 43 52 / 0.22));
    transform: translateX(3px) scale(1.025);
  }
  100% {
    filter:
      drop-shadow(0 0 0.7px var(--doity-color-action-primary-default, #ff2b34))
      drop-shadow(0 0 0.7px var(--doity-color-action-primary-default, #ff2b34));
    transform: translateX(0) scale(1);
  }
}

@keyframes doity-arrow-enter-back {
  0% {
    filter:
      drop-shadow(0 0 0.7px var(--doity-color-action-primary-default, #ff2b34))
      drop-shadow(0 0 8px rgb(255 43 52 / 0));
    transform: translateX(10px) scale(0.96);
  }
  45% {
    filter:
      drop-shadow(0 0 0.9px var(--doity-color-action-primary-default, #ff2b34))
      drop-shadow(0 0 10px rgb(255 43 52 / 0.22));
    transform: translateX(-3px) scale(1.025);
  }
  100% {
    filter:
      drop-shadow(0 0 0.7px var(--doity-color-action-primary-default, #ff2b34))
      drop-shadow(0 0 0.7px var(--doity-color-action-primary-default, #ff2b34));
    transform: translateX(0) scale(1);
  }
}

@keyframes doity-arrow-content {
  0% {
    opacity: 0.25;
    transform: translateY(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes doity-arrow-settle {
  0% {
    transform: scale(1.03);
  }
  55% {
    transform: scale(0.985);
  }
  100% {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .doity-arrow-stepper__btn,
  .doity-arrow-stepper__desc {
    transition: none;
  }

  .doity-arrow-stepper__btn:active {
    transform: none;
  }

  .doity-arrow-stepper__item--enter-forward .doity-arrow-stepper__btn,
  .doity-arrow-stepper__item--enter-back .doity-arrow-stepper__btn,
  .doity-arrow-stepper__item--enter .doity-arrow-stepper__content,
  .doity-arrow-stepper__item--settle .doity-arrow-stepper__btn {
    animation: none;
  }
}
</style>
