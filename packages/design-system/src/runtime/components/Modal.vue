<script setup>
import { computed } from 'vue'
const props = defineProps({
  open: { type: Boolean, required: false, default: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  fullscreen: { type: Boolean, required: false, default: false },
  featuredIcon: { type: Boolean, required: false, default: false }
});
const emit = defineEmits(["update:open", "close"]);
const isOpen = computed({
  get: () => props.open,
  set: (v) => emit("update:open", v)
});
function close() {
  isOpen.value = false;
  emit("close");
}
function onBackdrop(e) {
  if (e.target === e.currentTarget) close();
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="doity-modal__backdrop" @click="onBackdrop">
      <div :class="['doity-modal', { 'doity-modal--fullscreen': props.fullscreen }]" role="dialog">
        <header class="doity-modal__header">
          <button
            v-if="props.featuredIcon || $slots['featured-icon']"
            type="button"
            class="doity-modal__featured-icon"
          >
            <slot name="featured-icon">✓</slot>
          </button>

          <slot name="header">
            <h2 v-if="props.title" class="doity-modal__title">{{ props.title }}</h2>
          </slot>

          <button type="button" class="doity-modal__close" @click="close">×</button>
        </header>

        <div class="doity-modal__body">
          <p v-if="props.description" class="doity-modal__description">{{ props.description }}</p>
          <slot />
        </div>

        <footer v-if="$slots.footer" class="doity-modal__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.doity-modal__backdrop{align-items:center;background:rgba(16,24,40,.6);inset:0;justify-content:center;position:fixed;z-index:9997}.doity-modal,.doity-modal__backdrop{display:flex;padding:var(--doity-spacing-6)}.doity-modal{background:var(--doity-color-background-primary);border-radius:var(--doity-radius-xl);box-shadow:var(--doity-shadow-xl);flex-direction:column;font-family:var(--doity-font-family-sans);gap:var(--doity-spacing-4);max-height:85vh;max-width:900px;width:100%}.doity-modal--fullscreen{border-radius:0;height:100%;max-height:100%;max-width:100%;width:100%}.doity-modal__header{align-items:flex-start;display:flex;gap:var(--doity-spacing-3)}.doity-modal__featured-icon{align-items:center;background:var(--doity-color-success-50);border:none;border-radius:var(--doity-radius-full);color:var(--doity-color-success-600);display:inline-flex;flex-shrink:0;font-size:var(--doity-font-size-lg);height:48px;justify-content:center;padding:0;width:48px}.doity-modal__title{color:var(--doity-color-text-primary);font-size:var(--doity-font-size-lg);font-weight:var(--doity-font-weight-semibold);line-height:var(--doity-font-lineHeight-xl);margin:var(--doity-spacing-2) 0 0}.doity-modal__close{background:none;border:none;color:var(--doity-color-text-tertiary);cursor:pointer;font-size:24px;line-height:1;margin-left:auto;padding:0}.doity-modal__body{flex:1;overflow-y:auto}.doity-modal__description{color:var(--doity-color-text-secondary);font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-regular);line-height:var(--doity-font-lineHeight-sm);margin:0 0 var(--doity-spacing-2)}.doity-modal__footer{display:flex;gap:var(--doity-spacing-3);justify-content:flex-end}
</style>
