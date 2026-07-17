<script setup>
import { computed, useId, useSlots } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: false, default: false },
  label: { type: String, required: false },
  hint: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  indeterminate: { type: Boolean, required: false, default: false },
  size: { type: String, required: false, default: 'md' },
  id: { type: String, required: false },
})

const emit = defineEmits(['update:modelValue'])
const slots = useSlots()
const inputId = computed(() => props.id ?? `checkbox-${useId()}`)
const hasText = computed(() => Boolean(props.label || props.hint || slots.default || slots.hint))
const hasHint = computed(() => Boolean(props.hint || slots.hint))

function onChange(e) {
  emit('update:modelValue', e.target.checked)
}
</script>

<template>
  <label
    :class="[
      'doity-checkbox',
      `doity-checkbox--${props.size}`,
      {
        'doity-checkbox--disabled': props.disabled,
        'doity-checkbox--checked': props.modelValue && !props.indeterminate,
        'doity-checkbox--indeterminate': props.indeterminate,
        'doity-checkbox--with-hint': hasHint,
      },
    ]"
  >
    <input
      :id="inputId"
      type="checkbox"
      class="doity-checkbox__input"
      :checked="props.modelValue"
      :disabled="props.disabled"
      :indeterminate.prop="props.indeterminate"
      @change="onChange"
    >
    <span class="doity-checkbox__box" aria-hidden="true">
      <svg
        class="doity-checkbox__check"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6673 3.5L5.25065 9.91667L2.33398 7"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="doity-checkbox__dash" />
    </span>
    <span
      v-if="hasText"
      class="doity-checkbox__content"
    >
      <span v-if="props.label || slots.default" class="doity-checkbox__label">
        <slot>{{ props.label }}</slot>
      </span>
      <span v-if="hasHint" class="doity-checkbox__hint">
        <slot name="hint">{{ props.hint }}</slot>
      </span>
    </span>
  </label>
</template>

<style scoped>
.doity-checkbox {
  align-items: center;
  color: var(--doity-color-text-primary);
  cursor: pointer;
  display: inline-flex;
  font-family: var(--doity-font-family-sans);
  gap: var(--doity-spacing-3, 12px);
  user-select: none;
}

.doity-checkbox--sm {
  gap: var(--doity-spacing-2, 8px);
}

.doity-checkbox--with-hint {
  align-items: flex-start;
}

.doity-checkbox--disabled {
  color: var(--doity-color-text-disabled);
  cursor: not-allowed;
}

.doity-checkbox__input {
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
}

.doity-checkbox__box {
  align-items: center;
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-strong, #d4d4d4);
  border-radius: var(--doity-radius-sm, 6px);
  box-shadow: var(--doity-shadow-xs);
  box-sizing: border-box;
  display: inline-flex;
  flex-shrink: 0;
  height: var(--doity-component-checkbox-size-md);
  justify-content: center;
  position: relative;
  transform: scale(1);
  transition:
    background-color 0.22s cubic-bezier(0.25, 0.1, 0.25, 1),
    border-color 0.22s cubic-bezier(0.25, 0.1, 0.25, 1),
    box-shadow 0.22s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.45s cubic-bezier(0.34, 1.7, 0.42, 1);
  width: var(--doity-component-checkbox-size-md);
}

.doity-checkbox--with-hint .doity-checkbox__box {
  margin-top: 2px;
}

.doity-checkbox:hover:not(.doity-checkbox--disabled):not(.doity-checkbox--checked):not(.doity-checkbox--indeterminate)
  .doity-checkbox__box {
  background: var(--doity-color-background-brand, #fff1f2);
  border-color: var(--doity-color-border-focus, #ff2b34);
}

.doity-checkbox:active:not(.doity-checkbox--disabled) .doity-checkbox__box {
  transform: scale(0.82);
  transition:
    background-color 0.12s cubic-bezier(0.33, 0, 0.67, 1),
    border-color 0.12s cubic-bezier(0.33, 0, 0.67, 1),
    transform 0.12s cubic-bezier(0.33, 0, 0.67, 1);
}

.doity-checkbox__input:checked + .doity-checkbox__box,
.doity-checkbox__input:indeterminate + .doity-checkbox__box {
  background: var(--doity-color-background-brand, #fff1f2);
  border-color: var(--doity-color-border-focus, #ff2b34);
}

.doity-checkbox__check {
  color: var(--doity-color-brand-500, #ff2b34);
  display: block;
  height: 70%;
  opacity: 0;
  transform: scale(0);
  transition:
    opacity 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.38s cubic-bezier(0.34, 1.7, 0.42, 1);
  width: 70%;
}

.doity-checkbox__input:checked + .doity-checkbox__box .doity-checkbox__check {
  opacity: 1;
  transform: scale(1);
}

.doity-checkbox__dash {
  background: var(--doity-color-brand-500, #ff2b34);
  border-radius: 1px;
  display: none;
  height: 2px;
  left: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) scaleX(0);
  transition:
    opacity 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.38s cubic-bezier(0.34, 1.7, 0.42, 1);
  width: 60%;
}

.doity-checkbox__input:indeterminate + .doity-checkbox__box .doity-checkbox__check {
  opacity: 0;
  transform: scale(0);
}

.doity-checkbox__input:indeterminate + .doity-checkbox__box .doity-checkbox__dash {
  display: block;
  opacity: 1;
  transform: translate(-50%, -50%) scaleX(1);
}

.doity-checkbox__input:focus-visible + .doity-checkbox__box {
  box-shadow: var(--doity-shadow-focus);
  outline: none;
}

.doity-checkbox--disabled .doity-checkbox__box {
  background: var(--doity-color-background-secondary);
  border-color: var(--doity-color-border-disabled);
  box-shadow: none;
}

.doity-checkbox--disabled .doity-checkbox__input:checked + .doity-checkbox__box,
.doity-checkbox--disabled .doity-checkbox__input:indeterminate + .doity-checkbox__box {
  background: var(--doity-color-background-secondary);
  border-color: var(--doity-color-border-disabled);
}

.doity-checkbox--disabled .doity-checkbox__check {
  color: var(--doity-color-text-disabled);
}

.doity-checkbox--disabled .doity-checkbox__dash {
  background: var(--doity-color-text-disabled);
}

.doity-checkbox--sm .doity-checkbox__box {
  border-radius: var(--doity-radius-xs, 4px);
  height: var(--doity-component-checkbox-size-sm);
  width: var(--doity-component-checkbox-size-sm);
}

.doity-checkbox--md .doity-checkbox__box {
  border-radius: var(--doity-radius-sm, 6px);
  height: var(--doity-component-checkbox-size-md);
  width: var(--doity-component-checkbox-size-md);
}

.doity-checkbox--lg .doity-checkbox__box {
  border-radius: var(--doity-radius-sm, 6px);
  height: var(--doity-component-checkbox-size-lg);
  width: var(--doity-component-checkbox-size-lg);
}

.doity-checkbox--sm .doity-checkbox__check {
  height: 10px;
  width: 10px;
}

.doity-checkbox--sm .doity-checkbox__dash {
  height: 1.5px;
  width: 6px;
}

.doity-checkbox__content {
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.doity-checkbox__label {
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: var(--doity-font-lineHeight-sm, 20px);
}

.doity-checkbox--sm .doity-checkbox__label {
  font-size: var(--doity-font-size-xs, 12px);
  line-height: var(--doity-font-lineHeight-xs, 16px);
}

.doity-checkbox__hint {
  color: var(--doity-color-text-secondary);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-regular);
  line-height: var(--doity-font-lineHeight-sm, 20px);
}

.doity-checkbox--sm .doity-checkbox__hint {
  font-size: var(--doity-font-size-xs, 12px);
  line-height: var(--doity-font-lineHeight-xs, 16px);
}

@media (prefers-reduced-motion: reduce) {
  .doity-checkbox__box,
  .doity-checkbox__check,
  .doity-checkbox__dash {
    transition: none;
  }

  .doity-checkbox:active:not(.doity-checkbox--disabled) .doity-checkbox__box {
    transform: none;
  }
}
</style>
