<script setup>
const props = defineProps({
  modelValue: { type: Boolean, required: false, default: false },
  label: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  size: { type: String, required: false, default: "md" },
  id: { type: String, required: false }
});
const emit = defineEmits(["update:modelValue"]);
const slots = useSlots();
const inputId = computed(() => props.id ?? `switch-${useId()}`);
function toggle() {
  if (!props.disabled) emit("update:modelValue", !props.modelValue);
}
</script>

<template>
  <label :class="['doity-switch', `doity-switch--${props.size}`, { 'doity-switch--disabled': props.disabled, 'doity-switch--on': props.modelValue }]">
    <input
      :id="inputId"
      type="checkbox"
      role="switch"
      class="doity-switch__input"
      :checked="props.modelValue"
      :disabled="props.disabled"
      @change="toggle"
    >
    <span class="doity-switch__track">
      <span class="doity-switch__thumb" />
    </span>
    <span v-if="props.label || slots.default" class="doity-switch__label">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.doity-switch{align-items:center;color:var(--doity-color-text-primary);cursor:pointer;display:inline-flex;font-family:var(--doity-font-family-sans);font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-medium);gap:var(--doity-spacing-2);line-height:var(--doity-font-lineHeight-xs)}.doity-switch--disabled{cursor:not-allowed;opacity:.6}.doity-switch__input{height:0;opacity:0;position:absolute;width:0}.doity-switch__track{background:var(--doity-color-border-default);border-radius:var(--doity-radius-full);position:relative;transition:background-color .2s ease,box-shadow .2s ease}.doity-switch--sm .doity-switch__track{height:var(--doity-component-toggle-height-sm);width:var(--doity-component-toggle-width-sm)}.doity-switch--md .doity-switch__track{height:var(--doity-component-toggle-height-md);width:var(--doity-component-toggle-width-md)}.doity-switch--on .doity-switch__track{background:var(--doity-color-action-primary-default)}.doity-switch__thumb{background:#fff;border-radius:var(--doity-radius-full);box-shadow:var(--doity-shadow-xs);left:2px;position:absolute;top:2px;transition:transform .2s ease}.doity-switch--sm .doity-switch__thumb{height:16px;width:16px}.doity-switch--md .doity-switch__thumb{height:20px;width:20px}.doity-switch--sm.doity-switch--on .doity-switch__thumb{transform:translateX(16px)}.doity-switch--md.doity-switch--on .doity-switch__thumb{transform:translateX(20px)}.doity-switch__input:focus-visible+.doity-switch__track{box-shadow:var(--doity-shadow-focus)}
</style>
