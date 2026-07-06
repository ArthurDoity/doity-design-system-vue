<script setup>
const props = defineProps({
  variant: { type: String, required: false, default: "default" },
  title: { type: String, required: false },
  description: { type: String, required: false },
  dismissible: { type: Boolean, required: false, default: false },
  icon: { type: Boolean, required: false, default: false }
});
const emit = defineEmits(["dismiss"]);
const visible = ref(true);
function dismiss() {
  visible.value = false;
  emit("dismiss");
}
</script>

<template>
  <div v-if="visible" :class="['doity-alert', `doity-alert--${props.variant}`]" role="alert">
    <div v-if="$slots.icon || props.icon" class="doity-alert__icon">
      <slot name="icon">!</slot>
    </div>

    <div class="doity-alert__content">
      <p v-if="props.title" class="doity-alert__title">{{ props.title }}</p>
      <p v-if="props.description || $slots.default" class="doity-alert__description">
        <slot>{{ props.description }}</slot>
      </p>
    </div>

    <button
      v-if="props.dismissible"
      type="button"
      class="doity-alert__dismiss"
      @click="dismiss"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.doity-alert{--doity-alert-accent:var(--doity-color-text-secondary);align-items:flex-start;background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-default);border-radius:var(--doity-radius-lg);display:flex;font-family:var(--doity-font-family-sans);gap:var(--doity-spacing-3);padding:var(--doity-spacing-3) var(--doity-spacing-4)}.doity-alert__icon{align-items:center;background:var(--doity-color-background-tertiary);border-radius:var(--doity-radius-full);color:var(--doity-alert-accent);display:flex;flex-shrink:0;font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-semibold);height:20px;justify-content:center;line-height:1;margin-top:1px;width:20px}.doity-alert__content{flex:1;min-width:0}.doity-alert__title{color:var(--doity-color-text-primary);font-weight:var(--doity-font-weight-medium);margin:0}.doity-alert__description,.doity-alert__title{font-size:var(--doity-font-size-sm);line-height:var(--doity-font-lineHeight-sm)}.doity-alert__description{color:var(--doity-color-text-secondary);font-weight:var(--doity-font-weight-regular);margin:var(--doity-spacing-1) 0 0}.doity-alert__dismiss{background:none;border:none;color:var(--doity-color-text-secondary);cursor:pointer;font-size:20px;line-height:1;margin-left:auto;padding:0}.doity-alert--default{--doity-alert-accent:var(--doity-color-text-secondary)}.doity-alert--primary{--doity-alert-accent:var(--doity-color-brand-500)}.doity-alert--success{--doity-alert-accent:var(--doity-color-success-600)}.doity-alert--warning{--doity-alert-accent:var(--doity-color-warning-600)}.doity-alert--destructive,.doity-alert--error{--doity-alert-accent:var(--doity-color-error-600)}.doity-alert--info{--doity-alert-accent:var(--doity-color-brand-500)}
</style>
