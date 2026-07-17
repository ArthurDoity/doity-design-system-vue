<script setup>
import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'
import Badge from './Badge.vue'

const props = defineProps({
  /** Segundos restantes (v-model) */
  modelValue: { type: Number, required: false, default: 0 },
  /**
   * plain — só o tempo (padrão, mais reutilizável)
   * badge — pill com ícone
   * text — prefixo + tempo (+ hint opcional)
   */
  variant: { type: String, required: false, default: 'plain' },
  /**
   * mm:ss — minutos:segundos
   * hh:mm:ss — horas:minutos:segundos
   * auto — hh:mm:ss se ≥1h, senão mm:ss
   */
  format: { type: String, required: false, default: 'auto' },
  /** Decrementa 1s automaticamente */
  auto: { type: Boolean, required: false, default: false },
  paused: { type: Boolean, required: false, default: false },
  /**
   * Segundos restantes para estado urgente (pulse/shake no badge).
   * Use 0 para desligar.
   */
  endingThreshold: { type: Number, required: false, default: 10 },
  /** Texto antes do tempo (variant text) — vazio por padrão */
  prefix: { type: String, required: false, default: '' },
  /** Texto de apoio — só renderiza se houver valor ou slot hint */
  hint: { type: String, required: false, default: '' },
  showIcon: { type: Boolean, required: false, default: true },
  /** Piscar o separador `:` */
  blink: { type: Boolean, required: false, default: true },
  /** brand | neutral — default neutro (preto); brand fica no badge/CTA */
  tone: { type: String, required: false, default: 'neutral' },
  label: { type: String, required: false, default: 'Tempo restante' },
})

const emit = defineEmits(['update:modelValue', 'end', 'tick'])
const slots = useSlots()

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
let intervalId = 0
const ended = ref(false)

const remaining = computed(() => Math.max(0, Math.floor(props.modelValue || 0)))

const showHours = computed(() => {
  if (props.format === 'hh:mm:ss') return true
  if (props.format === 'mm:ss') return false
  return remaining.value >= 3600
})

/** Unidades de 2 dígitos, da maior para a menor */
const units = computed(() => {
  const total = remaining.value
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n) => String(Math.min(99, n)).padStart(2, '0')

  const list = []
  if (showHours.value) list.push(pad(h))
  list.push(pad(m), pad(s))
  return list
})

const displayLabel = computed(() => units.value.join(':'))

const isEnding = computed(
  () =>
    props.endingThreshold > 0 &&
    remaining.value > 0 &&
    remaining.value <= props.endingThreshold,
)
const isExpired = computed(() => remaining.value <= 0)

const showHint = computed(() => Boolean(props.hint || slots.hint))
const variant = computed(() => {
  const v = props.variant
  if (v === 'badge' || v === 'text') return v
  return 'plain'
})

function digitPair(str) {
  return { tens: Number(str[0]), ones: Number(str[1]) }
}

function tick() {
  if (props.paused || ended.value) return
  const next = Math.max(0, remaining.value - 1)
  emit('update:modelValue', next)
  emit('tick', next)
  if (next === 0 && !ended.value) {
    ended.value = true
    emit('end')
  }
}

function startAuto() {
  stopAuto()
  if (!props.auto || props.paused) return
  intervalId = window.setInterval(tick, 1000)
}

function stopAuto() {
  if (intervalId) {
    window.clearInterval(intervalId)
    intervalId = 0
  }
}

watch(
  () => [props.auto, props.paused],
  () => {
    if (props.auto && !props.paused && remaining.value > 0) startAuto()
    else stopAuto()
  },
)

watch(
  () => props.modelValue,
  (v) => {
    if (v > 0) ended.value = false
    if (v <= 0) stopAuto()
  },
)

onMounted(() => {
  if (props.auto && !props.paused && props.modelValue > 0) startAuto()
})

onBeforeUnmount(stopAuto)
</script>

<template>
  <div
    :class="[
      'doity-countdown',
      `doity-countdown--${variant}`,
      `doity-countdown--tone-${props.tone}`,
      {
        'doity-countdown--ending': isEnding,
        'doity-countdown--expired': isExpired,
        'doity-countdown--blink': props.blink && !isExpired,
      },
    ]"
    role="timer"
    :aria-live="isEnding ? 'assertive' : 'polite'"
    :aria-atomic="true"
    :aria-label="`${props.label}: ${displayLabel}`"
  >
    <!-- Badge variant: reusa Badge como casca (pílula), preservando ícone + dígitos animados -->
    <Badge
      v-if="variant === 'badge'"
      class="doity-countdown__badge"
      :variant="props.tone === 'brand' ? 'primary' : 'gray'"
      size="md"
    >
      <span
        v-if="props.showIcon || slots.icon"
        class="doity-countdown__icon"
        aria-hidden="true"
      >
        <slot name="icon">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 4V8L10.6667 9.33333M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </slot>
      </span>

      <span class="doity-countdown__time" aria-hidden="true">
        <template v-for="(unit, ui) in units" :key="`b-${ui}`">
          <span class="doity-countdown__digit">
            <span
              class="doity-countdown__strip"
              :style="{ '--digit': digitPair(unit).tens }"
            >
              <span
                v-for="d in DIGITS"
                :key="`bt-${ui}-${d}`"
                class="doity-countdown__cell"
              >{{ d }}</span>
            </span>
          </span>
          <span class="doity-countdown__digit">
            <span
              class="doity-countdown__strip"
              :style="{ '--digit': digitPair(unit).ones }"
            >
              <span
                v-for="d in DIGITS"
                :key="`bo-${ui}-${d}`"
                class="doity-countdown__cell"
              >{{ d }}</span>
            </span>
          </span>
          <span
            v-if="ui < units.length - 1"
            class="doity-countdown__colon"
          >:</span>
        </template>
      </span>
    </Badge>

    <div
      v-else
      class="doity-countdown__row"
    >
      <p
        v-if="variant === 'text'"
        class="doity-countdown__title"
      >
        <span v-if="props.prefix || slots.prefix" class="doity-countdown__prefix">
          <slot name="prefix">{{ props.prefix }}</slot>
        </span>

        <span class="doity-countdown__time" aria-hidden="true">
          <template v-for="(unit, ui) in units" :key="`u-${ui}`">
            <span class="doity-countdown__digit">
              <span
                class="doity-countdown__strip"
                :style="{ '--digit': digitPair(unit).tens }"
              >
                <span
                  v-for="d in DIGITS"
                  :key="`t-${ui}-${d}`"
                  class="doity-countdown__cell"
                >{{ d }}</span>
              </span>
            </span>
            <span class="doity-countdown__digit">
              <span
                class="doity-countdown__strip"
                :style="{ '--digit': digitPair(unit).ones }"
              >
                <span
                  v-for="d in DIGITS"
                  :key="`o-${ui}-${d}`"
                  class="doity-countdown__cell"
                >{{ d }}</span>
              </span>
            </span>
            <span
              v-if="ui < units.length - 1"
              class="doity-countdown__colon"
            >:</span>
          </template>
        </span>
      </p>

      <span
        v-else
        class="doity-countdown__time"
        aria-hidden="true"
      >
        <template v-for="(unit, ui) in units" :key="`p-${ui}`">
          <span class="doity-countdown__digit">
            <span
              class="doity-countdown__strip"
              :style="{ '--digit': digitPair(unit).tens }"
            >
              <span
                v-for="d in DIGITS"
                :key="`pt-${ui}-${d}`"
                class="doity-countdown__cell"
              >{{ d }}</span>
            </span>
          </span>
          <span class="doity-countdown__digit">
            <span
              class="doity-countdown__strip"
              :style="{ '--digit': digitPair(unit).ones }"
            >
              <span
                v-for="d in DIGITS"
                :key="`po-${ui}-${d}`"
                class="doity-countdown__cell"
              >{{ d }}</span>
            </span>
          </span>
          <span
            v-if="ui < units.length - 1"
            class="doity-countdown__colon"
          >:</span>
        </template>
      </span>
    </div>

    <p v-if="variant === 'text' && showHint" class="doity-countdown__hint">
      <slot name="hint">{{ props.hint }}</slot>
    </p>
  </div>
</template>

<style scoped>
.doity-countdown {
  --doity-countdown-fg: var(--doity-color-text-primary, #0a0a0a);
  --doity-countdown-bg: var(--doity-color-background-tertiary, #f5f5f5);
  --doity-countdown-title: #151515;
  --doity-digit-h: 24px;
  --doity-digit-w: 11px;
  --doity-colon-w: 5px;
  font-family: var(--doity-font-family-sans);
  font-variant-numeric: tabular-nums;
}

.doity-countdown--tone-brand {
  --doity-countdown-fg: var(--doity-color-brand-500, #ff2b34);
  --doity-countdown-bg: #ffdfe0;
}

.doity-countdown--tone-neutral {
  --doity-countdown-fg: var(--doity-color-text-primary, #0a0a0a);
  --doity-countdown-bg: var(--doity-color-background-tertiary, #f5f5f5);
  --doity-countdown-title: var(--doity-color-text-primary, #0a0a0a);
}

/* —— Plain —— */
.doity-countdown--plain {
  --doity-digit-h: 24px;
  --doity-digit-w: 11px;
  color: var(--doity-countdown-fg);
  display: inline-flex;
}

.doity-countdown--plain .doity-countdown__row {
  align-items: center;
  display: inline-flex;
}

.doity-countdown--plain .doity-countdown__time {
  color: inherit;
  font-size: var(--doity-font-size-md, 16px);
  font-weight: var(--doity-font-weight-semibold, 600);
}

.doity-countdown--plain.doity-countdown--ending {
  color: var(--doity-color-brand-500, #ff2b34);
}

/* —— Badge (reusa Badge como casca; overrides mantêm o visual do countdown) —— */
.doity-countdown--badge .doity-countdown__badge.doity-badge {
  align-items: center;
  background: var(--doity-countdown-bg);
  border-radius: 33px;
  color: var(--doity-countdown-fg);
  display: inline-flex;
  gap: 5px;
  padding: 0 var(--doity-spacing-2, 8px);
  transition: opacity 0.35s ease;
}

/* Conteúdo (ícone + dígitos) vive no label do Badge — evita clip/ellipsis */
.doity-countdown--badge .doity-countdown__badge :deep(.doity-badge__label) {
  align-items: center;
  display: inline-flex;
  gap: 5px;
  overflow: visible;
}

.doity-countdown--badge .doity-countdown__icon {
  display: block;
  flex-shrink: 0;
  height: 16px;
  width: 16px;
}

.doity-countdown--badge .doity-countdown__icon svg {
  display: block;
  height: 100%;
  width: 100%;
}

.doity-countdown--badge .doity-countdown__time {
  color: inherit;
  font-size: var(--doity-font-size-md, 16px);
  font-weight: var(--doity-font-weight-semibold, 600);
}

.doity-countdown--badge.doity-countdown--ending .doity-countdown__badge {
  animation: doity-countdown-pulse 1.5s ease-in-out infinite;
}

.doity-countdown--badge.doity-countdown--ending .doity-countdown__icon,
.doity-countdown--badge.doity-countdown--ending .doity-countdown__time {
  animation: doity-countdown-shake 5.392s linear infinite;
}

.doity-countdown--badge.doity-countdown--expired .doity-countdown__badge {
  opacity: 0.7;
}

/* —— Text —— */
.doity-countdown--text {
  --doity-digit-h: 28px;
  --doity-digit-w: 14px;
  --doity-colon-w: 6px;
  display: flex;
  flex-direction: column;
  gap: var(--doity-spacing-3, 12px);
}

.doity-countdown--text .doity-countdown__row {
  display: block;
}

.doity-countdown--text .doity-countdown__title {
  align-items: center;
  color: var(--doity-countdown-title);
  display: inline-flex;
  flex-wrap: wrap;
  font-size: var(--doity-font-size-xl, 20px);
  font-weight: var(--doity-font-weight-bold, 700);
  line-height: var(--doity-digit-h);
  margin: 0;
  overflow: hidden;
}

.doity-countdown--text .doity-countdown__prefix {
  white-space: pre;
}

.doity-countdown--text .doity-countdown__time {
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.doity-countdown--text .doity-countdown__hint {
  color: var(--doity-color-text-secondary, #737373);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: var(--doity-font-lineHeight-sm, 20px);
  margin: 0;
}

.doity-countdown--text.doity-countdown--ending .doity-countdown__title {
  color: var(--doity-color-brand-500, #ff2b34);
}

.doity-countdown--text.doity-countdown--expired .doity-countdown__title {
  color: var(--doity-color-text-secondary, #737373);
}

/* —— Shared time / digits —— */
.doity-countdown__time {
  align-items: flex-start;
  display: inline-flex;
  font-variant-numeric: tabular-nums;
  line-height: var(--doity-digit-h);
  overflow: hidden;
}

.doity-countdown__digit {
  display: inline-block;
  flex-shrink: 0;
  height: var(--doity-digit-h);
  overflow: hidden;
  position: relative;
  text-align: center;
  width: var(--doity-digit-w);
}

.doity-countdown__strip {
  --digit: 0;
  display: flex;
  flex-direction: column;
  left: 0;
  position: absolute;
  top: 0;
  transform: translateY(calc(var(--digit) * var(--doity-digit-h) * -1));
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.doity-countdown__cell {
  display: block;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
  height: var(--doity-digit-h);
  line-height: var(--doity-digit-h);
  text-align: center;
  width: var(--doity-digit-w);
}

.doity-countdown__colon {
  display: inline-block;
  flex-shrink: 0;
  height: var(--doity-digit-h);
  text-align: center;
  width: var(--doity-colon-w);
}

.doity-countdown--blink .doity-countdown__colon {
  animation: doity-countdown-colon 1s ease-in-out infinite;
}

@keyframes doity-countdown-colon {
  0%,
  45% {
    opacity: 1;
  }
  50%,
  95% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}

@keyframes doity-countdown-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes doity-countdown-shake {
  0%,
  92% {
    transform: translateX(0);
  }
  93.5% {
    transform: translateX(-1.8px);
  }
  94.5% {
    transform: translateX(1.08px);
  }
  95.5% {
    transform: translateX(-0.54px);
  }
  97%,
  100% {
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .doity-countdown__strip {
    transition: none;
  }

  .doity-countdown--blink .doity-countdown__colon,
  .doity-countdown--badge.doity-countdown--ending .doity-countdown__badge,
  .doity-countdown--badge.doity-countdown--ending .doity-countdown__icon,
  .doity-countdown--badge.doity-countdown--ending .doity-countdown__time {
    animation: none;
  }
}
</style>
