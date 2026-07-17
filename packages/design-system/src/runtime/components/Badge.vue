<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  /**
   * Cor do badge (Figma Tags).
   * Aliases: brand → primary · info → blue · default → gray
   */
  variant: { type: String, required: false, default: 'gray' },
  size: { type: String, required: false, default: 'md' },
  /**
   * none | dot | leading | trailing | close | only
   */
  icon: { type: String, required: false, default: 'none' },
  /** Atalho para icon="dot" (API legada) */
  dot: { type: Boolean, required: false, default: false },
})

const emit = defineEmits(['close'])
const slots = useSlots()

const colorKey = computed(() => {
  const map = {
    default: 'gray',
    brand: 'primary',
    info: 'blue',
    bluegray: 'blue-gray',
    bluelight: 'blue-light',
  }
  const raw = (props.variant || 'gray').toLowerCase().replace(/\s+/g, '-')
  return map[raw] || raw
})

const iconMode = computed(() => {
  if (props.dot || props.icon === 'dot') return 'dot'
  const allowed = ['none', 'leading', 'trailing', 'close', 'only']
  return allowed.includes(props.icon) ? props.icon : 'none'
})

const showLabel = computed(() => iconMode.value !== 'only')
const hasLeadingSlot = computed(() => !!(slots['icon-leading'] || slots.avatar || slots.country || slots.icon))
const hasTrailingSlot = computed(() => !!slots['icon-trailing'])

const layoutClass = computed(() => {
  if (iconMode.value === 'only') return 'doity-badge--icon-only'
  if (iconMode.value === 'dot') return 'doity-badge--icon-dot'
  if (iconMode.value === 'close' || iconMode.value === 'trailing' || hasTrailingSlot.value) {
    return 'doity-badge--icon-trailing'
  }
  if (iconMode.value === 'leading' || hasLeadingSlot.value) {
    if (slots.avatar || slots.country) return 'doity-badge--icon-media'
    return 'doity-badge--icon-leading'
  }
  return 'doity-badge--icon-none'
})

const classes = computed(() => [
  'doity-badge',
  `doity-badge--${colorKey.value}`,
  `doity-badge--${props.size === 'sm' || props.size === 'lg' ? props.size : 'md'}`,
  layoutClass.value,
])

function onClose(e) {
  e.stopPropagation()
  emit('close')
}
</script>

<template>
  <span :class="classes">
    <span v-if="iconMode === 'dot'" class="doity-badge__dot" aria-hidden="true" />

    <span
      v-else-if="iconMode === 'leading' || slots['icon-leading'] || slots.avatar || slots.country || slots.icon"
      class="doity-badge__media"
      :class="{
        'doity-badge__media--avatar': !!slots.avatar,
        'doity-badge__media--country': !!slots.country && !slots.avatar,
        'doity-badge__media--icon': !slots.avatar && !slots.country,
      }"
    >
      <slot name="avatar">
        <slot name="country">
          <slot name="icon-leading">
            <slot name="icon" />
          </slot>
        </slot>
      </slot>
    </span>

    <span v-if="showLabel" class="doity-badge__label">
      <slot />
    </span>

    <button
      v-if="iconMode === 'close'"
      type="button"
      class="doity-badge__close"
      aria-label="Remover"
      @click="onClose"
    >
      <slot name="icon-trailing">
        <svg viewBox="0 0 12 12" width="12" height="12" fill="none" aria-hidden="true">
          <path
            d="M9 3L3 9M3 3L9 9"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </slot>
    </button>

    <span
      v-else-if="iconMode === 'trailing' || (hasTrailingSlot && iconMode !== 'leading')"
      class="doity-badge__media doity-badge__media--icon"
    >
      <slot name="icon-trailing" />
    </span>

    <span v-else-if="iconMode === 'only'" class="doity-badge__media doity-badge__media--icon">
      <slot name="icon">
        <slot />
      </slot>
    </span>
  </span>
</template>

<style scoped>
.doity-badge {
  align-items: center;
  border-radius: var(--doity-radius-badge, 9999px);
  box-sizing: border-box;
  display: inline-flex;
  font-family: var(--doity-font-family-sans);
  font-weight: var(--doity-font-weight-medium, 500);
  justify-content: center;
  max-width: 100%;
  vertical-align: middle;
  white-space: nowrap;
}

.doity-badge__label {
  line-height: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
}

.doity-badge__dot {
  background: currentColor;
  border-radius: var(--doity-radius-full, 9999px);
  flex-shrink: 0;
  height: 8px;
  width: 8px;
}

.doity-badge__media {
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  overflow: hidden;
}

.doity-badge__media--icon {
  height: 12px;
  width: 12px;
}

.doity-badge__media--icon :deep(svg),
.doity-badge__media--icon :deep(img) {
  display: block;
  height: 100%;
  width: 100%;
}

.doity-badge__media--avatar {
  border-radius: 8px;
  height: 16px;
  width: 16px;
}

.doity-badge__media--country {
  border-radius: 9999px;
  height: 16px;
  width: 16px;
}

.doity-badge__media :deep(img) {
  border-radius: inherit;
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.doity-badge__close {
  align-items: center;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  height: 12px;
  justify-content: center;
  margin: 0;
  opacity: 0.85;
  padding: 0;
  width: 12px;
}

.doity-badge__close:hover {
  opacity: 1;
}

/* —— Layouts (Figma Tags Base) —— */
.doity-badge--icon-none {
  gap: 0;
}

.doity-badge--icon-dot {
  gap: 6px;
}

.doity-badge--icon-media {
  gap: 6px;
}

.doity-badge--icon-leading {
  gap: 4px;
}

.doity-badge--icon-trailing {
  gap: 4px;
}

.doity-badge--icon-only {
  gap: 0;
}

.doity-badge--sm {
  font-size: 12px;
  line-height: 18px;
}

.doity-badge--sm.doity-badge--icon-none {
  padding: 2px 8px;
}

.doity-badge--sm.doity-badge--icon-dot {
  padding: 2px 8px 2px 6px;
}

.doity-badge--sm.doity-badge--icon-media {
  padding: 2px 8px 2px 3px;
}

.doity-badge--sm.doity-badge--icon-leading {
  padding: 2px 8px 2px 6px;
}

.doity-badge--sm.doity-badge--icon-trailing {
  padding: 2px 6px 2px 8px;
}

.doity-badge--sm.doity-badge--icon-only {
  padding: 4px;
}

.doity-badge--md {
  font-size: 14px;
  line-height: 20px;
}

.doity-badge--md.doity-badge--icon-none {
  padding: 2px 10px;
}

.doity-badge--md.doity-badge--icon-dot {
  padding: 2px 10px 2px 8px;
}

.doity-badge--md.doity-badge--icon-media {
  padding: 2px 10px 2px 4px;
}

.doity-badge--md.doity-badge--icon-leading {
  padding: 2px 10px 2px 8px;
}

.doity-badge--md.doity-badge--icon-trailing {
  padding: 2px 8px 2px 10px;
}

.doity-badge--md.doity-badge--icon-only {
  padding: 6px;
}

.doity-badge--lg {
  font-size: 14px;
  line-height: 20px;
}

.doity-badge--lg.doity-badge--icon-none {
  padding: 4px 12px;
}

.doity-badge--lg.doity-badge--icon-dot {
  padding: 4px 12px 4px 10px;
}

.doity-badge--lg.doity-badge--icon-media {
  padding: 4px 12px 4px 6px;
}

.doity-badge--lg.doity-badge--icon-leading {
  padding: 4px 12px 4px 10px;
}

.doity-badge--lg.doity-badge--icon-trailing {
  padding: 4px 10px 4px 12px;
}

.doity-badge--lg.doity-badge--icon-only {
  padding: 8px;
}

/* —— Cores (Figma Tags) —— */
.doity-badge--gray {
  background: var(--doity-color-gray-100, #f5f5f5);
  color: var(--doity-color-text-secondary, #737373);
}

.doity-badge--primary {
  background: var(--doity-color-background-brand, #fff1f2);
  color: var(--doity-color-text-brand, #ff2b34);
}

.doity-badge--error {
  background: var(--doity-color-error-50, #fef3f2);
  color: var(--doity-color-error-700, #b42318);
}

.doity-badge--warning {
  background: var(--doity-color-warning-50, #fffaeb);
  color: var(--doity-color-warning-600, #dc6803);
}

.doity-badge--success {
  background: var(--doity-color-success-50, #ecfdf3);
  color: var(--doity-color-success-700, #027a48);
}

.doity-badge--blue {
  background: var(--doity-color-info-50, #eff8ff);
  color: var(--doity-color-info-700, #175cd3);
}

.doity-badge--blue-gray {
  background: #f8f9fc;
  color: #363f72;
}

.doity-badge--blue-light {
  background: #f0f9ff;
  color: #026aa2;
}

.doity-badge--indigo {
  background: #eef4ff;
  color: #3538cd;
}

.doity-badge--purple {
  background: #f4f3ff;
  color: #5925dc;
}

.doity-badge--pink {
  background: #fdf2fa;
  color: #c11574;
}

.doity-badge--rose {
  background: #fff1f3;
  color: #c01048;
}

.doity-badge--orange {
  background: #fff6ed;
  color: #c4320a;
}

.doity-badge--outline {
  background: transparent;
  border: 1px solid var(--doity-color-border-secondary, #e5e5e5);
  color: var(--doity-color-text-secondary, #737373);
}
</style>
