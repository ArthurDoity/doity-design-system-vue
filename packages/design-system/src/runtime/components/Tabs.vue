<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue'

const props = defineProps({
  /** Valor da aba ativa (v-model) */
  modelValue: { type: String, required: false, default: '' },
  /**
   * Abas: `{ label, value, disabled? }[]`
   */
  items: { type: Array, required: false, default: () => [] },
})

const emit = defineEmits(['update:modelValue', 'change'])

const listRef = ref(null)
const tabRefs = ref([])
const indicator = ref({ left: 0, width: 0, ready: false })
const pressValue = ref('')
const reducedMotion = ref(false)

const active = computed({
  get: () => props.modelValue || props.items[0]?.value || '',
  set: (v) => {
    emit('update:modelValue', v)
    emit('change', v)
  },
})

provide('doity-tab-active', active)

function setTabRef(el, index) {
  if (el) tabRefs.value[index] = el
  else tabRefs.value[index] = undefined
}

function measureIndicator() {
  const list = listRef.value
  const index = props.items.findIndex(item => item.value === active.value)
  const tab = tabRefs.value[index]
  if (!list || !tab) {
    indicator.value = { left: 0, width: 0, ready: false }
    return
  }

  const listBox = list.getBoundingClientRect()
  const tabBox = tab.getBoundingClientRect()
  indicator.value = {
    left: tabBox.left - listBox.left,
    width: tabBox.width,
    ready: true,
  }
}

function select(value, disabled) {
  if (disabled) return
  pressValue.value = value
  window.setTimeout(() => {
    if (pressValue.value === value) pressValue.value = ''
  }, 220)
  active.value = value
}

let resizeObserver = null

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  nextTick(measureIndicator)
  if (typeof ResizeObserver !== 'undefined' && listRef.value) {
    resizeObserver = new ResizeObserver(() => measureIndicator())
    resizeObserver.observe(listRef.value)
  }
  window.addEventListener('resize', measureIndicator)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', measureIndicator)
})

watch(
  () => [active.value, props.items],
  async () => {
    await nextTick()
    measureIndicator()
  },
  { deep: true },
)

const indicatorStyle = computed(() => ({
  left: `${indicator.value.left}px`,
  width: `${indicator.value.width}px`,
  opacity: indicator.value.ready ? 1 : 0,
  transition: reducedMotion.value
    ? 'none'
    : 'left 0.42s cubic-bezier(0.22, 1, 0.36, 1), width 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease',
}))
</script>

<template>
  <div class="doity-tabs">
    <div
      ref="listRef"
      class="doity-tabs__list"
      role="tablist"
    >
      <span
        class="doity-tabs__indicator"
        :class="{ 'doity-tabs__indicator--press': pressValue && pressValue === active }"
        :style="indicatorStyle"
        aria-hidden="true"
      />

      <slot name="tabs">
        <button
          v-for="(item, index) in items"
          :key="item.value"
          :ref="el => setTabRef(el, index)"
          type="button"
          role="tab"
          class="doity-tabs__tab"
          :class="{
            'doity-tabs__tab--active': active === item.value,
            'doity-tabs__tab--press': pressValue === item.value,
          }"
          :aria-selected="active === item.value"
          :tabindex="active === item.value ? 0 : -1"
          :disabled="item.disabled"
          @click="select(item.value, item.disabled)"
        >
          <span class="doity-tabs__label">{{ item.label }}</span>
        </button>
      </slot>
    </div>

    <div class="doity-tabs__panels">
      <slot :active="active" />
    </div>
  </div>
</template>

<style scoped>
.doity-tabs {
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  gap: var(--doity-spacing-4, 16px);
  width: fit-content;
  max-width: 100%;
}

.doity-tabs__list {
  align-items: center;
  background: var(--doity-color-background-tertiary, #f5f5f5);
  border-radius: var(--doity-component-tabs-radius, var(--doity-radius-dropdown, 10px));
  box-sizing: border-box;
  display: flex;
  gap: var(--doity-spacing-3, 12px);
  height: var(--doity-component-tabs-height, 36px);
  max-width: 100%;
  overflow-x: auto;
  padding: 4px 5px;
  position: relative;
  scrollbar-width: none;
  width: fit-content;
}

.doity-tabs__list::-webkit-scrollbar {
  display: none;
}

.doity-tabs__indicator {
  background: var(--doity-color-background-primary, #fff);
  border-radius: var(--doity-component-tabs-tabRadius, var(--doity-radius-tag, 8px));
  box-shadow: var(
    --doity-shadow-sm,
    0px 1px 3px 0px rgba(10, 13, 18, 0.1),
    0px 1px 2px 0px rgba(10, 13, 18, 0.06)
  );
  height: 29px;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 4px;
  transform-origin: center center;
  will-change: left, width;
  z-index: 0;
}

.doity-tabs__indicator--press {
  animation: doity-tabs-indicator-press 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-tabs__tab {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: var(--doity-component-tabs-tabRadius, var(--doity-radius-tag, 8px));
  box-sizing: border-box;
  color: var(--doity-color-text-primary, #0a0a0a);
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-family: inherit;
  font-size: var(--doity-font-size-xs, 12px);
  font-weight: var(--doity-font-weight-medium, 500);
  height: 29px;
  justify-content: center;
  line-height: 16px;
  padding: 0 var(--doity-spacing-4, 16px);
  position: relative;
  transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
  white-space: nowrap;
  z-index: 1;
}

.doity-tabs__label {
  display: block;
  transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease;
}

.doity-tabs__tab:hover:not(:disabled):not(.doity-tabs__tab--active) .doity-tabs__label {
  opacity: 0.72;
}

.doity-tabs__tab--press {
  transform: scale(0.97);
}

.doity-tabs__tab--press .doity-tabs__label {
  transform: scale(0.98);
}

.doity-tabs__tab:disabled {
  color: var(--doity-color-text-disabled, #a3a3a3);
  cursor: not-allowed;
}

.doity-tabs__panels {
  min-width: 0;
  width: 100%;
}

@keyframes doity-tabs-indicator-press {
  0% {
    transform: scale(1);
  }
  45% {
    transform: scale(0.96, 0.92);
  }
  100% {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .doity-tabs__tab,
  .doity-tabs__label {
    transition: none;
  }

  .doity-tabs__indicator,
  .doity-tabs__indicator--press {
    animation: none;
    transition: none !important;
  }

  .doity-tabs__tab--press {
    transform: none;
  }
}
</style>
