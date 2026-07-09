<script setup>
import { provide, ref } from 'vue'
const props = defineProps({
  multiple: { type: Boolean, required: false, default: false }
});
const openItems = ref(/* @__PURE__ */ new Set());
function toggle(value, open) {
  const next = new Set(openItems.value);
  if (open) {
    if (!props.multiple) next.clear();
    next.add(value);
  } else {
    next.delete(value);
  }
  openItems.value = next;
}
provide("doity-accordion", { openItems, toggle, multiple: props.multiple });
</script>

<template>
  <div class="doity-accordion" role="presentation">
    <slot />
  </div>
</template>

<style scoped>
.doity-accordion{background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-secondary);border-radius:var(--doity-radius-lg);display:flex;flex-direction:column;overflow:hidden}
</style>
