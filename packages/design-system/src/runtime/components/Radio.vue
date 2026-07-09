<script setup>
import { computed, useId, useSlots } from 'vue'
const props = defineProps({
  modelValue: { type: [String, Number], required: false },
  value: { type: [String, Number], required: true },
  label: { type: String, required: false },
  name: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  size: { type: String, required: false, default: "md" },
  id: { type: String, required: false }
});
const emit = defineEmits(["update:modelValue"]);
const slots = useSlots();
const inputId = computed(() => props.id ?? `radio-${useId()}`);
const checked = computed(() => props.modelValue === props.value);
function onChange() {
  emit("update:modelValue", props.value);
}
</script>

<template>
  <label :class="['doity-radio', `doity-radio--${props.size}`, { 'doity-radio--disabled': props.disabled }]">
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
    <span class="doity-radio__circle" />
    <span v-if="props.label || slots.default" class="doity-radio__label">
      <slot>{{ props.label }}</slot>
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
  font-size: var(--doity-font-size-xs);
  font-weight: var(--doity-font-weight-medium);
  gap: var(--doity-spacing-2);
  line-height: var(--doity-font-lineHeight-xs);
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
  background: var(--doity-color-background-primary);
  border: 1px solid var(--doity-color-border-strong);
  border-radius: var(--doity-radius-full);
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--doity-component-radio-size-md);
  position: relative;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  width: var(--doity-component-radio-size-md);
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

.doity-radio__input:checked + .doity-radio__circle {
  border-color: var(--doity-color-action-primary-default);
}

.doity-radio__input:checked + .doity-radio__circle::after {
  background: var(--doity-color-action-primary-default);
  border-radius: var(--doity-radius-full);
  content: "";
  height: 50%;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
}

.doity-radio__input:focus-visible + .doity-radio__circle {
  border-color: #717680;
  box-shadow: none;
}

.doity-radio--disabled .doity-radio__circle {
  border-color: var(--doity-color-border-disabled);
}

.doity-radio--disabled .doity-radio__input:checked + .doity-radio__circle::after {
  background: var(--doity-color-text-disabled);
}
</style>
