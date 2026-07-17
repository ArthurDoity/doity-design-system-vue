<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Texto do cabeçalho */
  label: { type: String, required: false, default: '' },
  /**
   * white — fundo branco
   * gray — fundo sutil (#fafafa)
   */
  tone: { type: String, required: false, default: 'white' },
  /** Coluna ordenável (mostra seta) */
  sortable: { type: Boolean, required: false, default: false },
  /**
   * none | asc | desc
   * Com sortable, `none` ainda exibe seta para baixo (disponível).
   */
  sort: { type: String, required: false, default: 'none' },
  /** Ícone de ajuda (?) */
  help: { type: Boolean, required: false, default: false },
  helpLabel: { type: String, required: false, default: 'Mais informações' },
  disabled: { type: Boolean, required: false, default: false },
  /** Célula só com checkbox (select-all) */
  checkboxOnly: { type: Boolean, required: false, default: false },
  align: { type: String, required: false, default: 'left' },
})

const emit = defineEmits(['sort', 'help'])

const sortKey = computed(() => {
  if (props.sort === 'asc' || props.sort === 'desc') return props.sort
  return 'none'
})

const classes = computed(() => [
  'doity-th',
  `doity-th--${props.tone === 'gray' ? 'gray' : 'white'}`,
  `doity-th--align-${props.align === 'center' || props.align === 'right' ? props.align : 'left'}`,
  {
    'doity-th--sortable': props.sortable && !props.disabled,
    'doity-th--disabled': props.disabled,
    'doity-th--checkbox-only': props.checkboxOnly,
  },
])

function onSort() {
  if (!props.sortable || props.disabled) return
  const next = sortKey.value === 'asc' ? 'desc' : sortKey.value === 'desc' ? 'none' : 'asc'
  emit('sort', next)
}

function onHelp() {
  if (props.disabled) return
  emit('help')
}

function onKeydown(e) {
  if (!props.sortable || props.disabled) return
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    onSort()
  }
}
</script>

<template>
  <th
    :class="classes"
    :aria-sort="sortable ? (sortKey === 'asc' ? 'ascending' : sortKey === 'desc' ? 'descending' : 'none') : undefined"
  >
    <div class="doity-th__inner">
      <span
        v-if="$slots.checkbox || checkboxOnly"
        class="doity-th__checkbox"
      >
        <slot name="checkbox" />
      </span>

      <div
        v-if="!checkboxOnly && (label || $slots.default || sortable || help)"
        class="doity-th__label"
        :class="{ 'doity-th__label--interactive': sortable && !disabled }"
        :role="sortable && !disabled ? 'button' : undefined"
        :tabindex="sortable && !disabled ? 0 : undefined"
        @click="onSort"
        @keydown="onKeydown"
      >
        <span
          v-if="label || $slots.default"
          class="doity-th__text"
        >
          <slot>{{ label }}</slot>
        </span>

        <button
          v-if="help"
          type="button"
          class="doity-th__help"
          :aria-label="helpLabel"
          :disabled="disabled"
          @click.stop="onHelp"
        >
          <slot name="help-icon">
            <svg
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z"
                stroke="currentColor"
                stroke-width="1.33"
              />
              <path
                d="M6.06 6a2 2 0 0 1 3.89.67c0 1.33-2 2-2 2M8 11.33h.007"
                stroke="currentColor"
                stroke-width="1.33"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </slot>
        </button>

        <span
          v-if="sortable"
          class="doity-th__sort"
          aria-hidden="true"
        >
          <svg
            v-if="sortKey === 'asc'"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
          >
            <path
              d="M8 12.667V3.333M8 3.333 4.667 6.667M8 3.333l3.333 3.334"
              stroke="currentColor"
              stroke-width="1.33"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            v-else
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
          >
            <path
              d="M8 3.333v9.334M8 12.667 4.667 9.333M8 12.667l3.333-3.334"
              stroke="currentColor"
              stroke-width="1.33"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  </th>
</template>

<style scoped>
.doity-th {
  border-bottom: 1px solid var(--doity-color-border-default, #e5e5e5);
  box-sizing: border-box;
  font-family: var(--doity-font-family-sans);
  font-size: 12px;
  font-weight: var(--doity-font-weight-medium, 500);
  height: 44px;
  line-height: 18px;
  padding: 12px 24px;
  text-align: left;
  transition:
    background-color 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  vertical-align: middle;
  white-space: nowrap;
}

.doity-th--white {
  background: var(--doity-color-background-primary, #fff);
}

.doity-th--gray {
  background: var(--doity-color-background-secondary, #fafafa);
}

.doity-th--align-center {
  text-align: center;
}

.doity-th--align-right {
  text-align: right;
}

.doity-th--checkbox-only {
  padding-inline: 16px;
  width: 68px;
}

.doity-th--disabled {
  color: var(--doity-color-text-disabled, #d4d4d4);
  pointer-events: none;
}

.doity-th__inner {
  align-items: center;
  display: inline-flex;
  gap: 12px;
  max-width: 100%;
}

.doity-th__checkbox {
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
}

.doity-th__label {
  align-items: center;
  color: var(--doity-color-text-secondary, #737373);
  display: inline-flex;
  gap: 4px;
  transition: color 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-th__label--interactive {
  border-radius: 4px;
  cursor: pointer;
  margin: -2px;
  padding: 2px;
  transition:
    color 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.45s cubic-bezier(0.34, 1.7, 0.42, 1);
}

.doity-th__label--interactive:hover,
.doity-th--sortable:hover .doity-th__label {
  color: var(--doity-color-text-primary, #0a0a0a);
}

.doity-th__label--interactive:active {
  transform: scale(0.96);
  transition-duration: 0.1s;
  transition-timing-function: cubic-bezier(0.33, 0, 0.67, 1);
}

.doity-th--disabled .doity-th__label {
  color: var(--doity-color-text-disabled, #d4d4d4);
}

.doity-th__text {
  min-width: 0;
}

.doity-th__help {
  align-items: center;
  background: none;
  border: 0;
  border-radius: 4px;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  height: 16px;
  padding: 0;
  transform: scale(1);
  transition:
    color 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.45s cubic-bezier(0.34, 1.7, 0.42, 1);
  width: 16px;
}

.doity-th__help:hover:not(:disabled) {
  color: var(--doity-color-text-primary, #0a0a0a);
}

.doity-th__help:active:not(:disabled) {
  transform: scale(0.82);
  transition-duration: 0.1s;
  transition-timing-function: cubic-bezier(0.33, 0, 0.67, 1);
}

.doity-th__sort {
  align-items: center;
  color: inherit;
  display: inline-flex;
  flex-shrink: 0;
  height: 16px;
  opacity: 0.85;
  transform: scale(1);
  transition:
    opacity 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.45s cubic-bezier(0.34, 1.7, 0.42, 1);
  width: 16px;
}

.doity-th--sortable:hover .doity-th__sort {
  opacity: 1;
}

.doity-th__label--interactive:active .doity-th__sort {
  transform: scale(0.86) translateY(1px);
  transition-duration: 0.1s;
  transition-timing-function: cubic-bezier(0.33, 0, 0.67, 1);
}

@media (prefers-reduced-motion: reduce) {
  .doity-th,
  .doity-th__label,
  .doity-th__label--interactive,
  .doity-th__help,
  .doity-th__sort {
    transition: none;
  }

  .doity-th__label--interactive:active,
  .doity-th__help:active:not(:disabled),
  .doity-th__label--interactive:active .doity-th__sort {
    transform: none;
  }
}
</style>
