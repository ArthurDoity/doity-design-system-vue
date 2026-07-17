<script setup>
import { computed, inject, ref } from 'vue'

const props = defineProps({
  /** Valor correspondente ao item da aba */
  value: { type: String, required: true },
})

const active = inject('doity-tab-active', ref(''))
const isActive = computed(() => active.value === props.value)
</script>

<template>
  <Transition name="doity-tab-panel" mode="out-in">
    <div
      v-if="isActive"
      :key="value"
      class="doity-tab-panel"
      role="tabpanel"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.doity-tab-panel {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-family: var(--doity-font-family-sans);
  font-size: var(--doity-font-size-sm, 14px);
  line-height: 20px;
}

.doity-tab-panel-enter-active {
  transition:
    opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-tab-panel-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.doity-tab-panel-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.doity-tab-panel-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .doity-tab-panel-enter-active,
  .doity-tab-panel-leave-active {
    transition: none;
  }

  .doity-tab-panel-enter-from,
  .doity-tab-panel-leave-to {
    transform: none;
  }
}
</style>
