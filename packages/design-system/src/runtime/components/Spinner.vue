<script setup>
const props = defineProps({
  size: { type: String, required: false, default: "md" },
  color: { type: String, required: false, default: "brand" },
  label: { type: String, required: false, default: "Carregando..." }
});
</script>

<template>
  <span
    :class="['doity-spinner', `doity-spinner--${props.size}`, `doity-spinner--${props.color}`]"
    role="status"
    :aria-label="props.label"
  >
    <span class="doity-spinner__ring" />
  </span>
</template>

<style scoped>
.doity-spinner{--doity-spinner-color:var(--doity-color-brand-500);align-items:center;display:inline-flex;justify-content:center}.doity-spinner__ring{animation:doity-spin .7s linear infinite;border:2px solid var(--doity-color-border-default);border-radius:var(--doity-radius-full);border-top-color:var(--doity-spinner-color);display:block}.doity-spinner--xs .doity-spinner__ring{height:12px;width:12px}.doity-spinner--sm .doity-spinner__ring{height:16px;width:16px}.doity-spinner--md .doity-spinner__ring{border-width:3px;height:24px;width:24px}.doity-spinner--lg .doity-spinner__ring{border-width:3px;height:32px;width:32px}.doity-spinner--brand{--doity-spinner-color:var(--doity-color-brand-500)}.doity-spinner--success{--doity-spinner-color:var(--doity-color-success-500)}.doity-spinner--error{--doity-spinner-color:var(--doity-color-error-500)}.doity-spinner--warning{--doity-spinner-color:var(--doity-color-warning-500)}@keyframes doity-spin{to{transform:rotate(1turn)}}
</style>
