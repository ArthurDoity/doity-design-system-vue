<script setup>
import { computed, toRefs } from 'vue'
const props = defineProps({
  data: { type: Array, required: false, default: () => [] },
  type: { type: String, required: false, default: "bar" },
  height: { type: Number, required: false, default: 240 },
  showValues: { type: Boolean, required: false, default: true }
});
const { data, height, showValues } = toRefs(props);
const max = computed(() => Math.max(...props.data.map((d) => d.value), 1));
const chartColors = [
  "var(--doity-color-brand-200, #FFC5C7)",
  "var(--doity-color-brand-400, #FF646B)",
  "var(--doity-color-brand-600, #ED151E)"
];
</script>

<template>
  <div class="doity-chart" :style="{ height: `${height}px` }">
    <slot>
      <div class="doity-chart__plot">
        <div class="doity-chart__bars">
          <div v-for="(item, i) in data" :key="i" class="doity-chart__bar-group">
            <span v-if="showValues" class="doity-chart__value">{{ item.value }}</span>
            <div
              class="doity-chart__bar"
              :style="{
  height: `${Math.max(6, item.value / max * 100)}%`,
  background: item.color ?? chartColors[i % chartColors.length]
}"
            />
            <span class="doity-chart__label">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<style scoped>
.doity-chart{font-family:var(--doity-font-family-sans);width:100%}.doity-chart__plot{border-bottom:1px solid var(--doity-color-border-secondary);height:100%;padding-bottom:var(--doity-spacing-3);width:100%}.doity-chart__bars{align-items:flex-end;display:flex;gap:var(--doity-spacing-3);height:100%;justify-content:space-between;padding-top:var(--doity-spacing-2)}.doity-chart__bar-group{align-items:center;display:flex;flex:1;flex-direction:column;gap:var(--doity-spacing-1);height:100%}.doity-chart__bar{border-radius:var(--doity-radius-sm) var(--doity-radius-sm) 0 0;margin-top:auto;max-width:56px;min-height:6px;transition:height .3s ease;width:100%}.doity-chart__label{color:var(--doity-color-chart-axis-label,#535862);font-size:var(--doity-font-size-xs);line-height:var(--doity-font-lineHeight-xs);text-align:center}.doity-chart__value{color:var(--doity-color-text-primary);font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-medium)}
</style>
