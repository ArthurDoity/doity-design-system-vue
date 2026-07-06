<script setup>
const props = defineProps({
  src: { type: String, required: false },
  alt: { type: String, required: false },
  name: { type: String, required: false },
  size: { type: String, required: false, default: "md" },
  online: { type: Boolean, required: false, default: false },
  placeholder: { type: Boolean, required: false, default: false }
});
const { src, alt, name, size, online, placeholder } = toRefs(props);
const initials = computed(() => {
  if (!props.name) return "?";
  return props.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
});
</script>

<template>
  <span :class="['doity-avatar', `doity-avatar--${size}`, { 'doity-avatar--placeholder': placeholder || !src && !name }]">
    <img v-if="src && !placeholder" :src="src" :alt="alt ?? name ?? ''" class="doity-avatar__img">
    <span v-else-if="name && !placeholder" class="doity-avatar__text">{{ initials }}</span>
    <span v-else class="doity-avatar__placeholder" />
    <span v-if="online" class="doity-avatar__status" />
  </span>
</template>

<style scoped>
.doity-avatar{align-items:center;background:var(--doity-color-background-tertiary);border-radius:var(--doity-radius-full);color:var(--doity-color-text-secondary);display:inline-flex;flex-shrink:0;font-family:var(--doity-font-family-sans);font-weight:var(--doity-font-weight-medium);justify-content:center;overflow:hidden;position:relative}.doity-avatar--xs{font-size:10px;height:24px;width:24px}.doity-avatar--sm{font-size:11px;height:32px;width:32px}.doity-avatar--md{font-size:12px;height:40px;width:40px}.doity-avatar--lg{font-size:14px;height:48px;width:48px}.doity-avatar--xl{font-size:16px;height:56px;width:56px}.doity-avatar--2xl{font-size:18px;height:64px;width:64px}.doity-avatar__img{height:100%;-o-object-fit:cover;object-fit:cover;width:100%}.doity-avatar__text{line-height:1}.doity-avatar__placeholder{background:var(--doity-color-border-secondary);border-radius:var(--doity-radius-full);height:60%;width:60%}.doity-avatar__status{background:var(--doity-color-success-500);border:2px solid var(--doity-color-background-primary);border-radius:var(--doity-radius-full);bottom:0;height:25%;min-height:6px;min-width:6px;position:absolute;right:0;width:25%}
</style>
