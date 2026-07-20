<script setup>
import { computed, useId, useSlots } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], required: false },
  value: { type: [String, Number], required: true },
  label: { type: String, required: false },
  hint: { type: String, required: false },
  name: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  size: { type: String, required: false, default: 'md' },
  id: { type: String, required: false },
})

const emit = defineEmits(['update:modelValue'])
const slots = useSlots()
const inputId = computed(() => props.id ?? `radio-${useId()}`)
const checked = computed(() => props.modelValue === props.value)
const hasText = computed(() => Boolean(props.label || props.hint || slots.default || slots.hint))
const hasHint = computed(() => Boolean(props.hint || slots.hint))

function onChange() {
  emit('update:modelValue', props.value)
}
</script>

<template>
  <label
    :class="[
      'doity-radio',
      `doity-radio--${props.size}`,
      {
        'doity-radio--disabled': props.disabled,
        'doity-radio--checked': checked,
        'doity-radio--with-hint': hasHint,
      },
    ]"
  >
    <input
      :id="inputId"
      type="radio"
      class="doity-radio__input"
      :name="props.name"
      :value="props.value"
      :checked="checked"
      :disabled="props.disabled"
      @change="onChange"
    >
    <!--
      Sem elemento interno para o dot.
      Filho + transform:scale + flex + zoom/DPR (ex. Windows 125%)
      gera oval e offset — bug conhecido (Chromium/shadcn/WordPress).
      O indicador é um radial-gradient no próprio círculo.
    -->
    <span class="doity-radio__circle" aria-hidden="true" />
    <span
      v-if="hasText"
      class="doity-radio__content"
    >
      <span v-if="props.label || slots.default" class="doity-radio__label">
        <slot>{{ props.label }}</slot>
      </span>
      <span v-if="hasHint" class="doity-radio__hint">
        <slot name="hint">{{ props.hint }}</slot>
      </span>
    </span>
  </label>
</template>

<style scoped>
/*
 * Dot = radial-gradient no anel (sem filho + scale → evita oval/DPR).
 * Animação monotônica do raio (sem spring/overshoot).
 * Press usa scale leve (0.94) no anel inteiro — sem filho, sem oval/DPR.
 * Anel via box-shadow inset (1px fixo) — border+drop-shadow mudava o
 * peso visual entre estados/itens (selecionado parecia mais fino).
 */
@property --doity-radio-dot-r {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@property --doity-radio-dot-color {
  syntax: '<color>';
  inherits: false;
  initial-value: transparent;
}

.doity-radio {
  align-items: center;
  color: var(--doity-color-text-primary);
  cursor: pointer;
  display: inline-flex;
  font-family: var(--doity-font-family-sans);
  gap: var(--doity-spacing-3, 12px);
  user-select: none;
}

.doity-radio--sm {
  gap: var(--doity-spacing-2, 8px);
}

.doity-radio--with-hint {
  align-items: flex-start;
}

.doity-radio--disabled {
  color: var(--doity-color-text-disabled);
  cursor: not-allowed;
}

.doity-radio__input {
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
}

.doity-radio__circle {
  --doity-radio-dot-r: 0px;
  --doity-radio-dot-color: transparent;
  --doity-radio-ring: var(--doity-color-border-strong, #d4d4d4);
  background-color: var(--doity-color-background-primary, #fff);
  background-image: radial-gradient(
    circle at center,
    var(--doity-radio-dot-color) 0,
    var(--doity-radio-dot-color) var(--doity-radio-dot-r),
    transparent calc(var(--doity-radio-dot-r) + 0.5px)
  );
  background-clip: padding-box;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px var(--doity-radio-ring);
  box-sizing: border-box;
  display: block;
  flex-shrink: 0;
  height: var(--doity-component-radio-size-md, 16px);
  transform: scale(1);
  transform-origin: center center;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    --doity-radio-dot-r 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    --doity-radio-dot-color 0.2s ease,
    --doity-radio-ring 0.2s ease;
  width: var(--doity-component-radio-size-md, 16px);
}

.doity-radio--with-hint .doity-radio__circle {
  margin-top: 2px;
}

.doity-radio:hover:not(.doity-radio--disabled):not(.doity-radio--checked) .doity-radio__circle {
  --doity-radio-ring: var(--doity-color-border-focus, #ff2b34);
  background-color: var(--doity-color-background-brand, #fff1f2);
}

/* Press no anel (sem filho) — scale leve; o dot já não tem overshoot */
.doity-radio:active:not(.doity-radio--disabled) .doity-radio__circle {
  --doity-radio-ring: var(--doity-color-border-focus, #ff2b34);
  background-color: var(--doity-color-background-brand, #fff1f2);
  transform: scale(0.94);
  transition:
    background-color 0.1s ease,
    box-shadow 0.1s ease,
    transform 0.1s cubic-bezier(0.33, 0, 0.67, 1),
    --doity-radio-dot-r 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    --doity-radio-dot-color 0.2s ease,
    --doity-radio-ring 0.1s ease;
}

.doity-radio__input:checked + .doity-radio__circle,
.doity-radio--checked .doity-radio__circle {
  --doity-radio-dot-color: var(--doity-color-brand-500, #ff2b34);
  --doity-radio-dot-r: 3px;
  --doity-radio-ring: var(--doity-color-border-focus, #ff2b34);
  background-color: var(--doity-color-background-brand, #fff1f2);
}

.doity-radio--sm .doity-radio__input:checked + .doity-radio__circle,
.doity-radio--sm.doity-radio--checked .doity-radio__circle {
  --doity-radio-dot-r: 2px;
}

.doity-radio--lg .doity-radio__input:checked + .doity-radio__circle,
.doity-radio--lg.doity-radio--checked .doity-radio__circle {
  --doity-radio-dot-r: 4px;
}

.doity-radio__input:focus-visible + .doity-radio__circle {
  box-shadow:
    inset 0 0 0 1px var(--doity-radio-ring),
    var(--doity-shadow-focus, 0 0 0 3px rgba(161, 161, 161, 0.5));
  outline: none;
}

.doity-radio--disabled .doity-radio__circle {
  --doity-radio-ring: var(--doity-color-border-disabled);
  background-color: var(--doity-color-background-secondary);
}

.doity-radio--disabled.doity-radio--checked .doity-radio__circle,
.doity-radio--disabled .doity-radio__input:checked + .doity-radio__circle {
  --doity-radio-dot-color: var(--doity-color-text-disabled);
  --doity-radio-ring: var(--doity-color-border-disabled);
  background-color: var(--doity-color-background-secondary);
}

.doity-radio--sm .doity-radio__circle {
  height: var(--doity-component-radio-size-sm, 12px);
  width: var(--doity-component-radio-size-sm, 12px);
}

.doity-radio--md .doity-radio__circle {
  height: var(--doity-component-radio-size-md, 16px);
  width: var(--doity-component-radio-size-md, 16px);
}

.doity-radio--lg .doity-radio__circle {
  height: var(--doity-component-radio-size-lg, 20px);
  width: var(--doity-component-radio-size-lg, 20px);
}

.doity-radio__content {
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.doity-radio__label {
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: var(--doity-font-lineHeight-sm, 20px);
}

.doity-radio--sm .doity-radio__label {
  font-size: var(--doity-font-size-xs, 12px);
  line-height: var(--doity-font-lineHeight-xs, 16px);
}

.doity-radio__hint {
  color: var(--doity-color-text-secondary);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-regular);
  line-height: var(--doity-font-lineHeight-sm, 20px);
}

.doity-radio--sm .doity-radio__hint {
  font-size: var(--doity-font-size-xs, 12px);
  line-height: var(--doity-font-lineHeight-xs, 16px);
}

@media (prefers-reduced-motion: reduce) {
  .doity-radio__circle {
    transition: none;
  }

  .doity-radio:active:not(.doity-radio--disabled) .doity-radio__circle {
    transform: none;
  }
}
</style>
