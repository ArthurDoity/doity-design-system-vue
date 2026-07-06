<script setup>
const props = defineProps({
  variant: { type: String, required: false, default: "gray" },
  size: { type: String, required: false, default: "md" },
  dot: { type: Boolean, required: false, default: false }
});
const { variant, size, dot } = toRefs(props);
</script>

<template>
  <span :class="['doity-badge', `doity-badge--${variant}`, `doity-badge--${size}`, { 'doity-badge--dot': dot }]">
    <span v-if="dot" class="doity-badge__dot" />
    <slot />
  </span>
</template>

<style scoped>
.doity-badge{align-items:center;border-radius:var(--doity-radius-full);display:inline-flex;font-family:var(--doity-font-family-sans);font-weight:var(--doity-font-weight-medium);gap:var(--doity-spacing-1);justify-content:center;white-space:nowrap}.doity-badge--sm{font-size:var(--doity-component-badge-fontSize-sm,12px);line-height:var(--doity-component-badge-lineHeight-sm,16px);padding:var(--doity-component-badge-paddingY-sm,2px) var(--doity-component-badge-paddingX-sm,8px)}.doity-badge--md{font-size:var(--doity-component-badge-fontSize-md,14px);line-height:var(--doity-component-badge-lineHeight-md,20px);padding:var(--doity-component-badge-paddingY-md,2px) var(--doity-component-badge-paddingX-md,10px)}.doity-badge--lg{font-size:var(--doity-component-badge-fontSize-lg,14px);line-height:var(--doity-component-badge-lineHeight-lg,20px);padding:var(--doity-component-badge-paddingY-lg,4px) var(--doity-component-badge-paddingX-lg,12px)}.doity-badge__dot{background:currentColor;border-radius:var(--doity-radius-full);height:6px;width:6px}.doity-badge--default,.doity-badge--gray{background:var(--doity-color-background-tertiary);color:var(--doity-color-text-secondary)}.doity-badge--primary{background:var(--doity-color-background-brand);color:var(--doity-color-brand-700)}.doity-badge--success{background:var(--doity-color-success-50);color:var(--doity-color-success-700)}.doity-badge--warning{background:var(--doity-color-warning-50);color:var(--doity-color-warning-700)}.doity-badge--error{background:var(--doity-color-error-50);color:var(--doity-color-error-700)}.doity-badge--outline{background:transparent;border:1px solid var(--doity-color-border-secondary);color:var(--doity-color-text-secondary)}
</style>
