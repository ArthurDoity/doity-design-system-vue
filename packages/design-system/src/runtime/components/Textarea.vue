<script setup>
import { computed, useId } from 'vue'
const props = defineProps({
  modelValue: { type: String, required: false, default: "" },
  size: { type: String, required: false, default: "md" },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  hint: { type: String, required: false },
  error: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  required: { type: Boolean, required: false, default: false },
  rows: { type: Number, required: false, default: 4 },
  resize: { type: String, required: false, default: "vertical" },
  id: { type: String, required: false }
});
const emit = defineEmits(["update:modelValue"]);
const inputId = computed(() => props.id ?? `textarea-${useId()}`);
function onInput(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<template>
  <div :class="['doity-textarea', `doity-textarea--${props.size}`, props.error && 'doity-textarea--error', props.disabled && 'doity-textarea--disabled']">
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
      @input="onInput"
    />
    <p v-if="props.error" :id="`${inputId}-hint`" class="doity-textarea__hint doity-textarea__hint--error">{{ props.error }}</p>
    <p v-else-if="props.hint" :id="`${inputId}-hint`" class="doity-textarea__hint">{{ props.hint }}</p>
  </div>
</template>

<style scoped>
.doity-textarea{display:flex;flex-direction:column;font-family:var(--doity-font-family-sans);gap:var(--doity-spacing-1)}.doity-textarea__label{color:var(--doity-color-text-primary);font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-medium);line-height:var(--doity-font-lineHeight-xs)}.doity-textarea__required{color:var(--doity-color-error-500)}.doity-textarea__field{background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-default);border-radius:var(--doity-radius-md);box-shadow:var(--doity-shadow-xs);box-sizing:border-box;color:var(--doity-color-text-primary);font-family:inherit;font-size:var(--doity-component-input-fontSize);line-height:var(--doity-component-input-lineHeight);min-height:80px;padding:var(--doity-spacing-2) var(--doity-component-input-paddingX);transition:border-color .15s ease;width:100%}.doity-textarea__field:focus{border-color:#717680;outline:none}.doity-textarea--error .doity-textarea__field{border-color:var(--doity-color-border-error)}.doity-textarea--disabled .doity-textarea__field{background:var(--doity-color-background-secondary);color:var(--doity-color-text-disabled);cursor:not-allowed}.doity-textarea__hint{color:var(--doity-color-text-secondary);font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-regular);line-height:var(--doity-font-lineHeight-xs);margin:0}.doity-textarea__hint--error{color:var(--doity-color-error-600)}
</style>
