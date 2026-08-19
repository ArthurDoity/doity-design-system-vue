<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  modelValue: { type: String, required: false, default: '' },
  size: { type: String, required: false, default: 'md' },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  hint: { type: String, required: false },
  error: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  required: { type: Boolean, required: false, default: false },
  rows: { type: Number, required: false, default: 3 },
  resize: { type: String, required: false, default: 'vertical' },
  id: { type: String, required: false },
})

const emit = defineEmits(['update:modelValue'])
const inputId = computed(() => props.id ?? `textarea-${useId()}`)

function onInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div
    :class="[
      'doity-textarea',
      `doity-textarea--${props.size}`,
      {
        'doity-textarea--error': !!props.error,
        'doity-textarea--disabled': props.disabled,
      },
    ]"
  >
    <label v-if="props.label" :for="inputId" class="doity-textarea__label">
      {{ props.label }}
      <span v-if="props.required" class="doity-textarea__required">*</span>
    </label>

    <textarea
      :id="inputId"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :required="props.required"
      :rows="props.rows"
      :style="{ resize: props.resize }"
      class="doity-textarea__field"
      :aria-invalid="props.error ? 'true' : undefined"
      :aria-describedby="props.hint || props.error ? `${inputId}-hint` : undefined"
      @input="onInput"
    />

    <p
      v-if="props.error"
      :id="`${inputId}-hint`"
      class="doity-textarea__hint doity-textarea__hint--error"
    >
      {{ props.error }}
    </p>
    <p v-else-if="props.hint" :id="`${inputId}-hint`" class="doity-textarea__hint">
      {{ props.hint }}
    </p>
  </div>
</template>

<style scoped>
/* Textarea: radius-md 8px, text 16/24, focus ring shadow-focused */
.doity-textarea {
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  gap: var(--doity-spacing-3, 12px);
  width: 100%;
}

.doity-textarea__label {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: var(--doity-font-lineHeight-sm, 20px);
}

.doity-textarea__required {
  color: var(--doity-color-error-500, #f04438);
}

.doity-textarea__field {
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e5e5e5);
  border-radius: var(--doity-radius-md, 8px);
  box-shadow: none;
  box-sizing: border-box;
  color: var(--doity-color-text-primary, #0a0a0a);
  font-family: inherit;
  font-size: var(--doity-font-size-md, 16px);
  line-height: var(--doity-font-lineHeight-md, 24px);
  min-height: 80px;
  padding: var(--doity-spacing-2, 8px) var(--doity-spacing-3, 12px);
  transition: border-color 0.15s ease;
  width: 100%;
}

.doity-textarea__field::placeholder {
  color: var(--doity-color-text-tertiary, #737373);
}

.doity-textarea__field:focus {
  border-color: var(--doity-color-border-strong, #d4d4d4);
  box-shadow: none;
  outline: none;
}

.doity-textarea--error .doity-textarea__field {
  border-color: var(--doity-color-error-300, #fda29b);
}

.doity-textarea--error .doity-textarea__field:focus {
  border-color: var(--doity-color-error-500, #f04438);
  box-shadow: none;
}

.doity-textarea--disabled {
  opacity: 0.5;
}

.doity-textarea--disabled .doity-textarea__field {
  cursor: not-allowed;
}

.doity-textarea__hint {
  color: var(--doity-color-text-secondary, #737373);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: var(--doity-font-lineHeight-sm, 20px);
  margin: 0;
}

.doity-textarea__hint--error {
  color: var(--doity-color-error-700, #b42318);
}

.doity-textarea--sm {
  gap: var(--doity-spacing-2, 8px);
}

.doity-textarea--sm .doity-textarea__field {
  font-size: var(--doity-font-size-sm, 14px);
  line-height: var(--doity-font-lineHeight-sm, 20px);
  min-height: 64px;
}

.doity-textarea--lg .doity-textarea__field {
  min-height: 120px;
}

@media (max-width: 480px) {
  .doity-textarea--sm .doity-textarea__field {
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
