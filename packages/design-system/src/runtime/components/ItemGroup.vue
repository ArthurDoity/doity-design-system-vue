<script setup>
defineProps({
  /** outline — borda ao redor do grupo */
  variant: { type: String, required: false, default: 'default' },
})
</script>

<template>
  <div
    class="doity-item-group"
    :class="{ 'doity-item-group--outline': variant === 'outline' }"
    role="list"
  >
    <slot />
  </div>
</template>

<style scoped>
.doity-item-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.doity-item-group--outline {
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e4e4e7);
  border-radius: var(--doity-radius-md, 8px);
  overflow: hidden;
}

.doity-item-group > :deep(.doity-item) {
  border-radius: 0;
  border-width: 0;
}

.doity-item-group > :deep(.doity-item + .doity-item) {
  border-top: 1px solid var(--doity-color-border-default, #e4e4e7);
}
</style>
