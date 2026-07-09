<script setup>
import { toRefs, useSlots } from 'vue'
const props = defineProps({
  title: { type: String, required: false, default: void 0 },
  subtitle: { type: String, required: false, default: void 0 }
});
const { title, subtitle } = toRefs(props);
const slots = useSlots();
</script>

<template>
  <div class="doity-card">
    <header v-if="title || slots.header" class="doity-card__header">
      <slot name="header">
        <h3 v-if="title" class="doity-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="doity-card__subtitle">{{ subtitle }}</p>
      </slot>
    </header>
    <div class="doity-card__body">
      <slot />
    </div>
    <footer v-if="slots.footer" class="doity-card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.doity-card{background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-secondary);border-radius:var(--doity-radius-card,10px);box-shadow:var(--doity-shadow-sm);font-family:var(--doity-font-family-sans);padding:var(--doity-component-dialog-padding,24px)}.doity-card__header{margin-bottom:var(--doity-spacing-4)}.doity-card__title{color:var(--doity-color-text-primary);font-size:var(--doity-font-size-lg);font-weight:var(--doity-font-weight-semibold);line-height:var(--doity-font-lineHeight-lg);margin:0}.doity-card__subtitle{color:var(--doity-color-text-secondary);font-size:var(--doity-font-size-sm);line-height:var(--doity-font-lineHeight-sm);margin:var(--doity-spacing-1) 0 0}.doity-card__footer{border-top:1px solid var(--doity-color-border-secondary);margin-top:var(--doity-spacing-4);padding-top:var(--doity-spacing-4)}
</style>
