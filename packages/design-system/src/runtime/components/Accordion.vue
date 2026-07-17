<script setup>
import { provide, ref } from 'vue'

const props = defineProps({
  /** Permite vários itens abertos ao mesmo tempo */
  multiple: { type: Boolean, required: false, default: false },
})

const openItems = ref(new Set())

function toggle(value, open) {
  const next = new Set(openItems.value)
  if (open) {
    if (!props.multiple) next.clear()
    next.add(value)
  } else {
    next.delete(value)
  }
  openItems.value = next
}

provide('doity-accordion', { openItems, toggle, multiple: props.multiple })
</script>

<template>
  <div class="doity-accordion" role="presentation">
    <slot />
  </div>
</template>

<style scoped>
/* Lista flush — só divisores nos itens (sem card) */
.doity-accordion {
  background: var(--doity-color-background-primary, #fff);
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
