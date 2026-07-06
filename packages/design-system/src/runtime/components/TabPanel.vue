<script setup>
const props = defineProps({
  value: { type: String, required: true }
});
const active = inject("doity-tab-active", ref(""));
const isActive = computed(() => active.value === props.value);
</script>

<template>
  <div v-show="isActive" class="doity-tab-panel" role="tabpanel">
    <slot />
  </div>
</template>

<style scoped>
.doity-tab-panel{color:var(--doity-color-text-primary);font-family:var(--doity-font-family-sans);font-size:var(--doity-font-size-sm)}
</style>
