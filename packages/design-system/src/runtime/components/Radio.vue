<script setup>
const props = defineProps({
  modelValue: { type: [String, Number], required: false },
  value: { type: [String, Number], required: true },
  label: { type: String, required: false },
  name: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
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
  <label :class="['doity-radio', { 'doity-radio--disabled': props.disabled }]">
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
.doity-radio{align-items:center;color:var(--doity-color-text-primary);cursor:pointer;display:inline-flex;font-family:var(--doity-font-family-sans);font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-medium);gap:var(--doity-spacing-2);line-height:var(--doity-font-lineHeight-xs)}.doity-radio--disabled{color:var(--doity-color-text-disabled);cursor:not-allowed}.doity-radio__input{height:0;opacity:0;position:absolute;width:0}.doity-radio__circle{align-items:center;background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-strong);border-radius:var(--doity-radius-full);display:flex;flex-shrink:0;height:16px;justify-content:center;transition:border-color .15s ease,box-shadow .15s ease;width:16px}.doity-radio__input:checked+.doity-radio__circle{border-color:var(--doity-color-action-primary-default)}.doity-radio__input:checked+.doity-radio__circle:after{background:var(--doity-color-action-primary-default);border-radius:var(--doity-radius-full);content:"";height:8px;width:8px}.doity-radio__input:focus-visible+.doity-radio__circle{box-shadow:var(--doity-shadow-focus)}.doity-radio--disabled .doity-radio__circle{border-color:var(--doity-color-border-disabled)}
</style>
