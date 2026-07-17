<script setup>
import { computed, useId, useSlots } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: false, default: false },
  label: { type: String, required: false },
  hint: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  size: { type: String, required: false, default: 'md' },
  id: { type: String, required: false },
})

const emit = defineEmits(['update:modelValue'])
const slots = useSlots()
const inputId = computed(() => props.id ?? `switch-${useId()}`)
const hasText = computed(() => Boolean(props.label || props.hint || slots.default || slots.hint))
const hasHint = computed(() => Boolean(props.hint || slots.hint))

function toggle() {
  if (!props.disabled) emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <label
    :class="[
      'doity-switch',
      `doity-switch--${props.size}`,
      {
        'doity-switch--disabled': props.disabled,
        'doity-switch--on': props.modelValue,
        'doity-switch--with-hint': hasHint,
      },
    ]"
  >
    <input
      :id="inputId"
      type="checkbox"
      role="switch"
      class="doity-switch__input"
      :checked="props.modelValue"
      :disabled="props.disabled"
      :aria-checked="props.modelValue"
      @change="toggle"
    >
    <span class="doity-switch__track" aria-hidden="true">
      <span class="doity-switch__thumb" />
    </span>
    <span
      v-if="hasText"
      class="doity-switch__content"
    >
      <span v-if="props.label || slots.default" class="doity-switch__label">
        <slot>{{ props.label }}</slot>
      </span>
      <span v-if="hasHint" class="doity-switch__hint">
        <slot name="hint">{{ props.hint }}</slot>
      </span>
    </span>
  </label>
</template>

<style scoped>
.doity-switch {
  align-items: center;
  color: var(--doity-color-text-primary);
  cursor: pointer;
  display: inline-flex;
  font-family: var(--doity-font-family-sans);
  gap: var(--doity-spacing-3, 12px);
  user-select: none;
}

.doity-switch--sm {
  gap: var(--doity-spacing-2, 8px);
}

.doity-switch--with-hint {
  align-items: flex-start;
}

.doity-switch--disabled {
  color: var(--doity-color-text-disabled);
  cursor: not-allowed;
  opacity: 0.5;
}

.doity-switch__input {
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
}

.doity-switch__track {
  background: var(--doity-color-gray-200, #e9eaeb);
  border-radius: var(--doity-radius-full, 999px);
  box-sizing: border-box;
  display: inline-block;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  transform: scale(1);
  transition:
    background-color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.doity-switch--with-hint .doity-switch__track {
  margin-top: 2px;
}

.doity-switch--sm .doity-switch__track {
  height: var(--doity-component-toggle-height-sm, 20px);
  width: var(--doity-component-toggle-width-sm, 36px);
}

.doity-switch--md .doity-switch__track {
  height: var(--doity-component-toggle-height-md, 24px);
  width: var(--doity-component-toggle-width-md, 44px);
}

.doity-switch:hover:not(.doity-switch--disabled):not(.doity-switch--on) .doity-switch__track {
  background: var(--doity-color-gray-300, #d5d7da);
}

.doity-switch--on .doity-switch__track {
  background: var(--doity-color-success-500, #12b76a);
}

.doity-switch:active:not(.doity-switch--disabled) .doity-switch__track {
  transform: scale(0.96);
  transition:
    background-color 0.12s cubic-bezier(0.33, 0, 0.67, 1),
    transform 0.12s cubic-bezier(0.33, 0, 0.67, 1);
}

.doity-switch__thumb {
  background: var(--doity-color-base-white, #fff);
  border-radius: var(--doity-radius-full, 999px);
  box-shadow: var(--doity-shadow-sm);
  left: 2px;
  position: absolute;
  top: 2px;
  transform: translateX(0);
  transition:
    transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.28s cubic-bezier(0.25, 0.1, 0.25, 1);
  will-change: transform;
}

.doity-switch--sm .doity-switch__thumb {
  height: 16px;
  width: 16px;
}

.doity-switch--md .doity-switch__thumb {
  height: 20px;
  width: 20px;
}

.doity-switch--sm.doity-switch--on .doity-switch__thumb {
  transform: translateX(16px);
}

.doity-switch--md.doity-switch--on .doity-switch__thumb {
  transform: translateX(20px);
}

.doity-switch__input:focus-visible + .doity-switch__track {
  box-shadow: var(--doity-shadow-focused);
}

.doity-switch__content {
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.doity-switch__label {
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: var(--doity-font-lineHeight-sm, 20px);
}

.doity-switch--sm .doity-switch__label {
  font-size: var(--doity-font-size-xs, 12px);
  line-height: var(--doity-font-lineHeight-xs, 16px);
}

.doity-switch__hint {
  color: var(--doity-color-text-secondary);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-regular);
  line-height: var(--doity-font-lineHeight-sm, 20px);
}

.doity-switch--sm .doity-switch__hint {
  font-size: var(--doity-font-size-xs, 12px);
  line-height: var(--doity-font-lineHeight-xs, 16px);
}

@media (prefers-reduced-motion: reduce) {
  .doity-switch__track,
  .doity-switch__thumb {
    transition: none;
  }

  .doity-switch:active:not(.doity-switch--disabled) .doity-switch__track {
    transform: none;
  }
}
</style>
