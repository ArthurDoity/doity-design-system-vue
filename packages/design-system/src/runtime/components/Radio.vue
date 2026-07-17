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
    <span class="doity-radio__circle" aria-hidden="true">
      <span class="doity-radio__dot" />
    </span>
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
  align-items: center;
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-strong, #d4d4d4);
  border-radius: 999px;
  box-shadow: var(--doity-shadow-xs);
  box-sizing: border-box;
  display: inline-flex;
  flex-shrink: 0;
  height: var(--doity-component-radio-size-md);
  justify-content: center;
  position: relative;
  transform: scale(1);
  transition:
    background-color 0.22s cubic-bezier(0.25, 0.1, 0.25, 1),
    border-color 0.22s cubic-bezier(0.25, 0.1, 0.25, 1),
    box-shadow 0.22s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.45s cubic-bezier(0.34, 1.7, 0.42, 1);
  width: var(--doity-component-radio-size-md);
}

.doity-radio--with-hint .doity-radio__circle {
  margin-top: 2px;
}

.doity-radio:hover:not(.doity-radio--disabled):not(.doity-radio--checked) .doity-radio__circle {
  background: var(--doity-color-background-brand, #fff1f2);
  border-color: var(--doity-color-border-focus, #ff2b34);
}

.doity-radio:active:not(.doity-radio--disabled) .doity-radio__circle {
  transform: scale(0.82);
  transition:
    background-color 0.12s cubic-bezier(0.33, 0, 0.67, 1),
    border-color 0.12s cubic-bezier(0.33, 0, 0.67, 1),
    transform 0.12s cubic-bezier(0.33, 0, 0.67, 1);
}

.doity-radio__input:checked + .doity-radio__circle {
  background: var(--doity-color-background-brand, #fff1f2);
  border-color: var(--doity-color-border-focus, #ff2b34);
}

.doity-radio__dot {
  background: var(--doity-color-brand-500, #ff2b34);
  border-radius: 999px;
  display: block;
  height: 40%;
  opacity: 0;
  transform: scale(0);
  transition:
    opacity 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.38s cubic-bezier(0.34, 1.7, 0.42, 1);
  width: 40%;
}

.doity-radio__input:checked + .doity-radio__circle .doity-radio__dot {
  opacity: 1;
  transform: scale(1);
}

.doity-radio__input:focus-visible + .doity-radio__circle {
  box-shadow: var(--doity-shadow-focus);
  outline: none;
}

.doity-radio--disabled .doity-radio__circle {
  background: var(--doity-color-background-secondary);
  border-color: var(--doity-color-border-disabled);
  box-shadow: none;
}

.doity-radio--disabled .doity-radio__input:checked + .doity-radio__circle {
  background: var(--doity-color-background-secondary);
  border-color: var(--doity-color-border-disabled);
}

.doity-radio--disabled .doity-radio__dot {
  background: var(--doity-color-text-disabled);
}

.doity-radio--sm .doity-radio__circle {
  height: var(--doity-component-radio-size-sm);
  width: var(--doity-component-radio-size-sm);
}

.doity-radio--md .doity-radio__circle {
  height: var(--doity-component-radio-size-md);
  width: var(--doity-component-radio-size-md);
}

.doity-radio--lg .doity-radio__circle {
  height: var(--doity-component-radio-size-lg);
  width: var(--doity-component-radio-size-lg);
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
  .doity-radio__circle,
  .doity-radio__dot {
    transition: none;
  }

  .doity-radio:active:not(.doity-radio--disabled) .doity-radio__circle {
    transform: none;
  }
}
</style>
