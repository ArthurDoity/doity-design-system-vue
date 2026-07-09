<script setup>
import { computed, ref, useId } from 'vue'
const props = defineProps({
  modelValue: { type: String, required: false, default: "" },
  type: { type: String, required: false, default: "text" },
  size: { type: String, required: false, default: "md" },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  hint: { type: String, required: false },
  error: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  required: { type: Boolean, required: false, default: false },
  id: { type: String, required: false }
});
const emit = defineEmits(["update:modelValue"]);
const slots = defineSlots();
const inputId = computed(() => props.id ?? `doity-input-${useId()}`);
const fieldRef = ref(null);

function onInput(event) {
  emit("update:modelValue", event.target.value);
}

function focusField(event) {
  if (event.target === fieldRef.value) {
    return;
  }

  fieldRef.value?.focus();
}
</script>

<template>
  <div :class="['doity-input', `doity-input--${props.size}`, props.error && 'doity-input--error', props.disabled && 'doity-input--disabled']">
    <label v-if="props.label" :for="inputId" class="doity-input__label">
      {{ props.label }}
      <span v-if="props.required" class="doity-input__required">*</span>
    </label>
    <div
      class="doity-input__field-shell"
      @click="focusField"
    >
      <span v-if="slots['icon-leading']" class="doity-input__icon doity-input__icon--leading">
        <slot name="icon-leading" />
      </span>
      <input
        ref="fieldRef"
        :id="inputId"
        :type="props.type"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :required="props.required"
        class="doity-input__field"
        @input="onInput"
      >
      <span v-if="slots['icon-trailing']" class="doity-input__icon doity-input__icon--trailing">
        <slot name="icon-trailing" />
      </span>
    </div>
    <p v-if="props.error" :id="`${inputId}-hint`" class="doity-input__hint doity-input__hint--error">{{ props.error }}</p>
    <p v-else-if="props.hint" :id="`${inputId}-hint`" class="doity-input__hint">{{ props.hint }}</p>
  </div>
</template>

<style scoped>
.doity-input{display:flex;flex-direction:column;font-family:var(--doity-font-family-sans);gap:var(--doity-spacing-1)}.doity-input__label{color:var(--doity-color-text-primary);font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-medium);line-height:var(--doity-font-lineHeight-xs)}.doity-input__required{color:var(--doity-color-error-500)}.doity-input__field-shell{align-items:stretch;background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-default);border-radius:var(--doity-radius-input);box-shadow:var(--doity-shadow-xs);box-sizing:border-box;cursor:text;display:flex;gap:var(--doity-spacing-2);padding-inline:var(--doity-component-input-paddingX);transition:border-color .15s ease;width:100%}.doity-input__field{align-self:stretch;background:transparent;border:none;box-sizing:border-box;color:var(--doity-color-text-primary);flex:1;font-family:inherit;font-size:var(--doity-component-input-fontSize);height:100%;line-height:var(--doity-component-input-lineHeight);min-height:0;min-width:0;padding:0;width:100%}.doity-input__field:focus{outline:none}.doity-input__field::-moz-placeholder{color:var(--doity-color-text-secondary)}.doity-input__field::placeholder{color:var(--doity-color-text-secondary)}.doity-input__icon{align-items:center;align-self:center;color:var(--doity-color-text-secondary);display:inline-flex;flex-shrink:0;justify-content:center}.doity-input--sm .doity-input__field-shell{height:var(--doity-component-input-height-sm)}.doity-input--md .doity-input__field-shell{height:var(--doity-component-input-height-md)}.doity-input--lg .doity-input__field-shell{height:var(--doity-component-input-height-lg)}.doity-input:focus-within .doity-input__field-shell{border-color:#717680}.doity-input--error .doity-input__field-shell{border-color:var(--doity-color-border-error)}.doity-input--disabled .doity-input__field-shell{background:var(--doity-color-background-secondary)}.doity-input--disabled .doity-input__field{color:var(--doity-color-text-disabled);cursor:not-allowed}.doity-input__hint{color:var(--doity-color-text-secondary);font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-regular);line-height:var(--doity-font-lineHeight-xs);margin:0}.doity-input__hint--error{color:var(--doity-color-error-600)}
</style>
