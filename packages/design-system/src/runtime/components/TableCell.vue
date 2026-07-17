<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Texto principal */
  text: { type: String, required: false, default: '' },
  /** Texto de apoio (segunda linha) */
  supportingText: { type: String, required: false, default: '' },
  /**
   * lead — tipografia de destaque (nome/empresa)
   * text — tipografia secundária (metadados)
   */
  emphasis: { type: String, required: false, default: 'lead' },
  disabled: { type: Boolean, required: false, default: false },
  /**
   * Barra de progresso 0–100. Quando definida, renderiza track + valor.
   */
  progress: { type: Number, required: false, default: undefined },
  /**
   * Tendência: positive | negative
   */
  trend: { type: String, required: false, default: undefined },
  trendLabel: { type: String, required: false, default: '' },
})

const hasProgress = computed(() => props.progress !== undefined && props.progress !== null)
const progressValue = computed(() => Math.min(100, Math.max(0, Number(props.progress) || 0)))
const trendKey = computed(() => {
  if (props.trend === 'positive' || props.trend === 'negative') return props.trend
  return null
})

const classes = computed(() => [
  'doity-td-content',
  `doity-td-content--${props.emphasis === 'text' ? 'text' : 'lead'}`,
  {
    'doity-td-content--disabled': props.disabled,
    'doity-td-content--with-leading': false,
  },
])
</script>

<template>
  <div
    :class="[
      classes,
      { 'doity-td-content--with-leading': !!$slots.leading },
    ]"
  >
    <span
      v-if="$slots.leading"
      class="doity-td-content__leading"
    >
      <slot name="leading" />
    </span>

    <div
      v-if="hasProgress || trendKey || text || supportingText || $slots.default || $slots.trailing"
      class="doity-td-content__body"
    >
      <div
        v-if="hasProgress"
        class="doity-td-content__progress"
      >
        <div
          class="doity-td-content__progress-track"
          role="progressbar"
          :aria-valuenow="progressValue"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <span
            class="doity-td-content__progress-fill"
            :style="{ width: `${progressValue}%` }"
          />
        </div>
        <span class="doity-td-content__progress-value">{{ Math.round(progressValue) }}%</span>
        <span
          v-if="trendKey"
          class="doity-td-content__trend"
          :class="`doity-td-content__trend--${trendKey}`"
        >
          <svg
            viewBox="0 0 12 12"
            width="12"
            height="12"
            fill="none"
            aria-hidden="true"
          >
            <path
              v-if="trendKey === 'positive'"
              d="M6 9.5V2.5M6 2.5 3.5 5M6 2.5 8.5 5"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              v-else
              d="M6 2.5v7M6 9.5 3.5 7M6 9.5 8.5 7"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {{ trendLabel || (trendKey === 'positive' ? '+20%' : '-20%') }}
        </span>
      </div>

      <div
        v-else-if="trendKey && !hasProgress"
        class="doity-td-content__trend"
        :class="`doity-td-content__trend--${trendKey}`"
      >
        <svg
          viewBox="0 0 12 12"
          width="12"
          height="12"
          fill="none"
          aria-hidden="true"
        >
          <path
            v-if="trendKey === 'positive'"
            d="M6 9.5V2.5M6 2.5 3.5 5M6 2.5 8.5 5"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            v-else
            d="M6 2.5v7M6 9.5 3.5 7M6 9.5 8.5 7"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span v-if="text || trendLabel">{{ trendLabel || text }}</span>
      </div>

      <div
        v-else-if="text || supportingText || $slots.default"
        class="doity-td-content__stack"
      >
        <span
          v-if="text || $slots.default"
          class="doity-td-content__text"
        >
          <slot>{{ text }}</slot>
        </span>
        <span
          v-if="supportingText || $slots.supporting"
          class="doity-td-content__supporting"
        >
          <slot name="supporting">{{ supportingText }}</slot>
        </span>
      </div>

      <div
        v-if="$slots.trailing"
        class="doity-td-content__trailing"
      >
        <slot name="trailing" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.doity-td-content {
  align-items: center;
  display: flex;
  gap: 12px;
  min-width: 0;
  width: 100%;
}

.doity-td-content--disabled {
  opacity: 0.45;
  pointer-events: none;
}

.doity-td-content__leading {
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
}

.doity-td-content__body {
  align-items: center;
  display: flex;
  flex: 1;
  gap: 8px;
  min-width: 0;
}

.doity-td-content__stack {
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
}

.doity-td-content__text {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-family: var(--doity-font-family-sans);
  font-size: 12px;
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doity-td-content--text .doity-td-content__text {
  color: var(--doity-color-text-secondary, #737373);
  font-weight: var(--doity-font-weight-regular, 400);
}

.doity-td-content__supporting {
  color: var(--doity-color-text-secondary, #737373);
  font-family: var(--doity-font-family-sans);
  font-size: 12px;
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doity-td-content__trailing {
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
  gap: 4px;
  margin-left: auto;
}

.doity-td-content__progress {
  align-items: center;
  display: flex;
  flex: 1;
  gap: 12px;
  min-width: 0;
}

.doity-td-content__progress-track {
  background: var(--doity-color-background-tertiary, #f5f5f5);
  border-radius: var(--doity-radius-full, 9999px);
  flex: 1;
  height: 8px;
  max-width: 120px;
  min-width: 64px;
  overflow: hidden;
}

.doity-td-content__progress-fill {
  background: var(--doity-color-success-500, #17b26a);
  border-radius: inherit;
  display: block;
  height: 100%;
  transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-td-content__progress-value {
  color: var(--doity-color-text-secondary, #737373);
  flex-shrink: 0;
  font-family: var(--doity-font-family-sans);
  font-size: 12px;
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: 16px;
}

.doity-td-content__trend {
  align-items: center;
  border-radius: var(--doity-radius-full, 9999px);
  display: inline-flex;
  flex-shrink: 0;
  font-family: var(--doity-font-family-sans);
  font-size: 12px;
  font-weight: var(--doity-font-weight-medium, 500);
  gap: 4px;
  line-height: 16px;
  padding: 2px 8px 2px 6px;
}

.doity-td-content__trend--positive {
  background: color-mix(in srgb, var(--doity-color-success-500, #17b26a) 12%, white);
  color: var(--doity-color-success-700, #067647);
}

.doity-td-content__trend--negative {
  background: color-mix(in srgb, var(--doity-color-error-500, #f04438) 12%, white);
  color: var(--doity-color-error-700, #b42318);
}
</style>
