<script setup>
const props = defineProps({
  modelValue: { type: Boolean, required: false, default: false },
  label: { type: String, required: false },
  hint: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  indeterminate: { type: Boolean, required: false, default: false },
  size: { type: String, required: false, default: "md" },
  id: { type: String, required: false }
});
const emit = defineEmits(["update:modelValue"]);
const slots = useSlots();
const inputId = computed(() => props.id ?? `checkbox-${useId()}`);
function onChange(e) {
  emit("update:modelValue", e.target.checked);
}
</script>

<template>
  <label :class="['doity-checkbox', `doity-checkbox--${props.size}`, { 'doity-checkbox--disabled': props.disabled }]">
    <input
      :id="inputId"
      type="checkbox"
      class="doity-checkbox__input"
      :checked="props.modelValue"
      :disabled="props.disabled"
      :indeterminate.prop="props.indeterminate"
      @change="onChange"
    >
    <span class="doity-checkbox__box" />
    <span v-if="props.label || props.hint || slots.default || slots.hint" class="doity-checkbox__content">
      <span v-if="props.label || slots.default" class="doity-checkbox__label">
        <slot>{{ props.label }}</slot>
      </span>
      <span v-if="props.hint || slots.hint" class="doity-checkbox__hint">
        <slot name="hint">{{ props.hint }}</slot>
      </span>
    </span>
  </label>
</template>

<style scoped>
.doity-checkbox{align-items:flex-start;color:var(--doity-color-text-primary);cursor:pointer;display:inline-flex;font-family:var(--doity-font-family-sans);gap:var(--doity-spacing-2)}.doity-checkbox--disabled{color:var(--doity-color-text-disabled);cursor:not-allowed}.doity-checkbox__input{height:0;opacity:0;position:absolute;width:0}.doity-checkbox__box{align-items:center;background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-primary);border-radius:var(--doity-radius-sm);box-shadow:var(--doity-shadow-xs);display:flex;flex-shrink:0;height:var(--doity-component-checkbox-size-md);justify-content:center;transition:background-color .15s ease,border-color .15s ease,box-shadow .15s ease;width:var(--doity-component-checkbox-size-md)}.doity-checkbox__input:checked+.doity-checkbox__box{background:var(--doity-color-action-primary-default);border-color:var(--doity-color-action-primary-default)}.doity-checkbox__input:checked+.doity-checkbox__box:after{color:#fff;content:"✓";font-size:12px;font-weight:var(--doity-font-weight-bold)}.doity-checkbox__input:focus-visible+.doity-checkbox__box{box-shadow:var(--doity-shadow-focus)}.doity-checkbox--disabled .doity-checkbox__box{background:var(--doity-color-background-secondary);border-color:var(--doity-color-border-disabled)}.doity-checkbox--sm .doity-checkbox__box{height:var(--doity-component-checkbox-size-sm);width:var(--doity-component-checkbox-size-sm)}.doity-checkbox--sm .doity-checkbox__input:checked+.doity-checkbox__box:after{font-size:10px}.doity-checkbox__content{display:inline-flex;flex-direction:column;gap:var(--doity-spacing-1)}.doity-checkbox__label{font-weight:var(--doity-font-weight-medium)}.doity-checkbox__hint,.doity-checkbox__label{font-size:var(--doity-font-size-xs);line-height:var(--doity-font-lineHeight-xs)}.doity-checkbox__hint{color:var(--doity-color-text-secondary);font-weight:var(--doity-font-weight-regular)}
</style>
