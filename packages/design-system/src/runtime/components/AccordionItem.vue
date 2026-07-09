<script setup>
import { computed, toRefs, useId } from 'vue'
const props = defineProps({
  title: { type: String, required: true },
  value: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  open: { type: Boolean, required: false, default: false }
});
const { title, disabled } = toRefs(props);
const emit = defineEmits(["update:open"]);
const itemId = `accordion-${useId()}`;
const isOpen = computed({
  get: () => props.open,
  set: (value) => emit("update:open", value)
});
</script>

<template>
  <div class="doity-accordion-item" :class="{ 'doity-accordion-item--open': isOpen, 'doity-accordion-item--disabled': disabled }">
    <button
      :id="`${itemId}-trigger`"
      type="button"
      class="doity-accordion-item__trigger"
      :disabled="disabled"
      @click="isOpen = !isOpen"
    >
      <span class="doity-accordion-item__title">{{ title }}</span>
      <span class="doity-accordion-item__icon">⌄</span>
    </button>
    <div
      v-show="isOpen"
      :id="`${itemId}-panel`"
      class="doity-accordion-item__panel"
    >
      <div class="doity-accordion-item__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.doity-accordion-item{background:var(--doity-color-background-primary);border-bottom:1px solid var(--doity-color-border-secondary)}.doity-accordion-item:last-child{border-bottom:0}.doity-accordion-item__trigger{align-items:center;background:none;border:none;color:var(--doity-color-text-primary);cursor:pointer;display:flex;font-family:var(--doity-font-family-sans);font-size:var(--doity-font-size-sm);font-weight:var(--doity-font-weight-medium);gap:var(--doity-spacing-3);justify-content:space-between;line-height:var(--doity-font-lineHeight-md);padding:var(--doity-component-accordion-paddingY,16px) var(--doity-spacing-4);text-align:left;width:100%}.doity-accordion-item__trigger:hover:not(:disabled){background:var(--doity-color-background-secondary)}.doity-accordion-item--disabled .doity-accordion-item__trigger{color:var(--doity-color-text-disabled);cursor:not-allowed}.doity-accordion-item__icon{align-items:center;color:var(--doity-color-text-tertiary);display:inline-flex;font-size:var(--doity-font-size-sm);height:16px;justify-content:center;line-height:1;transition:transform .2s ease;width:16px}.doity-accordion-item--open .doity-accordion-item__icon{transform:rotate(180deg)}.doity-accordion-item__content{color:var(--doity-color-text-secondary);font-size:var(--doity-font-size-sm);line-height:var(--doity-font-lineHeight-sm);padding:0 var(--doity-spacing-4) var(--doity-spacing-4)}
</style>
