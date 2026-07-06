<script setup>
const props = defineProps({
  modelValue: { type: String, required: false, default: "" },
  items: { type: Array, required: false, default: () => [] }
});
const { items } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
const active = computed({
  get: () => props.modelValue || props.items[0]?.value || "",
  set: (v) => emit("update:modelValue", v)
});
provide("doity-tab-active", active);
function select(value, disabled) {
  if (!disabled) active.value = value;
}
</script>

<template>
  <div class="doity-tabs">
    <div class="doity-tabs__list" role="tablist">
      <slot name="tabs">
        <button
          v-for="item in items"
          :key="item.value"
          type="button"
          role="tab"
          :class="['doity-tabs__tab', { 'doity-tabs__tab--active': active === item.value }]"
          :disabled="item.disabled"
          @click="select(item.value, item.disabled)"
        >
          {{ item.label }}
        </button>
      </slot>
    </div>
    <div class="doity-tabs__panels">
      <slot :active="active" />
    </div>
  </div>
</template>

<style scoped>
.doity-tabs{font-family:var(--doity-font-family-sans)}.doity-tabs__list{align-items:center;background:var(--doity-color-background-tertiary);border-radius:var(--doity-radius-dropdown);display:flex;gap:2px;height:var(--doity-component-tabs-height,36px);padding:2px;width:-moz-fit-content;width:fit-content}.doity-tabs__tab{background:none;border:none;border-radius:var(--doity-radius-tag);color:var(--doity-color-text-secondary);cursor:pointer;font-family:inherit;font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-medium);height:100%;padding:0 var(--doity-spacing-3);transition:all .15s ease}.doity-tabs__tab--active,.doity-tabs__tab:hover:not(:disabled){color:var(--doity-color-text-primary)}.doity-tabs__tab--active{background:var(--doity-color-background-primary);box-shadow:var(--doity-shadow-sm)}.doity-tabs__tab:disabled{color:var(--doity-color-text-disabled);cursor:not-allowed}
</style>
