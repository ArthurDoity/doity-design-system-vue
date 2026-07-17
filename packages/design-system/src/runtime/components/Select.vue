<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, useId, watch } from 'vue'
import { closeOverlay, openOverlay } from '../utils/overlayCoordinator'

const props = defineProps({
  modelValue: { type: [String, Number], required: false, default: '' },
  options: { type: Array, required: false, default: () => [] },
  size: { type: String, required: false, default: 'md' },
  /** default | icon | search — Figma Select triggers */
  variant: { type: String, required: false, default: 'default' },
  label: { type: String, required: false },
  placeholder: { type: String, required: false, default: 'Selecione...' },
  hint: { type: String, required: false },
  error: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  required: { type: Boolean, required: false, default: false },
  id: { type: String, required: false },
})

const emit = defineEmits(['update:modelValue'])
const inputId = computed(() => props.id ?? `select-${useId()}`)
const open = ref(false)
const root = ref()
const triggerRef = ref()
const menuRef = ref()
const menuStyle = ref({})

const selectedOption = computed(() =>
  props.options.find(opt => opt.value === props.modelValue),
)

const isPlaceholder = computed(() =>
  props.modelValue === '' || props.modelValue === void 0 || props.modelValue === null,
)

const displayText = computed(() => {
  if (isPlaceholder.value) return props.placeholder
  return selectedOption.value?.label ?? String(props.modelValue)
})

const showBuiltInLeading = computed(() =>
  props.variant === 'icon' || props.variant === 'search',
)

function closeMenu() {
  open.value = false
}

function updateMenuPosition() {
  const el = triggerRef.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  menuStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 5}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    zIndex: 1000,
  }
}

function toggle() {
  if (props.disabled) return

  if (open.value) {
    closeMenu()
    closeOverlay(closeMenu)
    return
  }

  openOverlay(closeMenu)
  open.value = true
  nextTick(() => updateMenuPosition())
}

function selectOption(opt) {
  if (opt.disabled) return
  emit('update:modelValue', opt.value)
  closeMenu()
  closeOverlay(closeMenu)
}

function onClickOutside(e) {
  if (root.value?.contains(e.target) || menuRef.value?.contains(e.target)) return
  closeMenu()
  closeOverlay(closeMenu)
}

function onKeydown(e) {
  if (props.disabled) return

  if (e.key === 'Escape') {
    closeMenu()
    closeOverlay(closeMenu)
    return
  }

  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    toggle()
  }
}

watch(open, (isOpen, _, onCleanup) => {
  if (!isOpen) return

  updateMenuPosition()
  window.addEventListener('scroll', updateMenuPosition, true)
  window.addEventListener('resize', updateMenuPosition)

  onCleanup(() => {
    window.removeEventListener('scroll', updateMenuPosition, true)
    window.removeEventListener('resize', updateMenuPosition)
  })
})

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  closeOverlay(closeMenu)
  window.removeEventListener('scroll', updateMenuPosition, true)
  window.removeEventListener('resize', updateMenuPosition)
})
</script>

<template>
  <div
    ref="root"
    :class="[
      'doity-select',
      `doity-select--${props.size}`,
      `doity-select--${props.variant}`,
      props.error && 'doity-select--error',
      props.disabled && 'doity-select--disabled',
      open && 'doity-select--open',
    ]"
  >
    <label v-if="props.label" :for="inputId" class="doity-select__label">
      {{ props.label }}
      <span v-if="props.required" class="doity-select__required">*</span>
    </label>
    <div class="doity-select__wrapper">
      <span
        v-if="$slots['icon-leading'] || showBuiltInLeading"
        class="doity-select__icon-leading"
        aria-hidden="true"
      >
        <slot name="icon-leading">
          <svg
            v-if="props.variant === 'search'"
            class="doity-select__leading-svg"
            viewBox="0 0 18 18"
            fill="none"
          >
            <circle
              cx="8"
              cy="8"
              r="5.25"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M12.5 12.5L15.5 15.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <svg
            v-else
            class="doity-select__leading-svg"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M9 9a3.25 3.25 0 1 0 0-6.5A3.25 3.25 0 0 0 9 9Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M3 15c.9-2.4 3.1-3.75 6-3.75S14.1 12.6 15 15"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </slot>
      </span>
      <button
        :id="inputId"
        ref="triggerRef"
        type="button"
        role="combobox"
        class="doity-select__field"
        :class="{ 'doity-select__field--placeholder': isPlaceholder }"
        :disabled="props.disabled"
        :aria-expanded="open"
        aria-haspopup="listbox"
        :aria-required="props.required || void 0"
        :aria-invalid="props.error ? true : void 0"
        :aria-describedby="props.hint || props.error ? `${inputId}-hint` : void 0"
        @click.stop="toggle"
        @keydown="onKeydown"
      >
        <span class="doity-select__value">{{ displayText }}</span>
      </button>
    </div>
    <Teleport to="body">
      <ul
        v-if="open"
        ref="menuRef"
        class="doity-select__menu"
        :style="menuStyle"
        role="listbox"
        :aria-labelledby="inputId"
      >
        <li
          v-for="opt in props.options"
          :key="String(opt.value)"
          role="option"
          :class="[
            'doity-select__option',
            opt.value === props.modelValue && 'doity-select__option--selected',
            opt.disabled && 'doity-select__option--disabled',
          ]"
          :aria-selected="opt.value === props.modelValue"
          :aria-disabled="opt.disabled || void 0"
          @click="selectOption(opt)"
        >
          <span class="doity-select__option-label">{{ opt.label }}</span>
          <svg
            v-if="opt.value === props.modelValue"
            class="doity-select__check"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.5 8.5L6.5 11.5L12.5 4.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </li>
      </ul>
    </Teleport>
    <p
      v-if="props.error"
      :id="`${inputId}-hint`"
      class="doity-select__hint doity-select__hint--error"
    >
      {{ props.error }}
    </p>
    <p
      v-else-if="props.hint"
      :id="`${inputId}-hint`"
      class="doity-select__hint"
    >
      {{ props.hint }}
    </p>
  </div>
</template>

<style scoped>
.doity-select {
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  gap: var(--doity-spacing-2);
}
.doity-select__label {
  color: var(--doity-color-text-primary);
  font-size: var(--doity-font-size-xs);
  font-weight: var(--doity-font-weight-medium);
  line-height: var(--doity-font-lineHeight-xs);
}
.doity-select__required {
  color: var(--doity-color-error-500);
}
.doity-select__wrapper {
  align-items: center;
  display: flex;
  position: relative;
}
.doity-select__wrapper:after {
  background-image: var(--doity-icon-chevron-down);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  content: '';
  height: 5px;
  pointer-events: none;
  position: absolute;
  right: var(--doity-spacing-3);
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.28s cubic-bezier(0.34, 1.45, 0.64, 1);
  width: 9px;
}
.doity-select--search .doity-select__wrapper:after {
  content: none;
}
.doity-select--open .doity-select__wrapper:after {
  transform: translateY(-50%) rotate(180deg);
}
.doity-select__icon-leading {
  align-items: center;
  color: var(--doity-color-text-secondary, #737373);
  display: inline-flex;
  height: 18px;
  justify-content: center;
  left: var(--doity-spacing-3);
  pointer-events: none;
  position: absolute;
  width: 18px;
  z-index: 1;
}
.doity-select__leading-svg {
  display: block;
  height: 18px;
  width: 18px;
}
.doity-select__field {
  align-items: center;
  background: var(--doity-color-background-primary);
  border: 1px solid var(--doity-color-border-default);
  border-radius: var(--doity-radius-md);
  box-shadow: 0 1px 2px rgb(10 13 18 / 10%);
  box-sizing: border-box;
  color: var(--doity-color-text-primary);
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: var(--doity-font-size-xs);
  font-weight: var(--doity-font-weight-regular);
  line-height: var(--doity-font-lineHeight-xs);
  padding: 0 calc(var(--doity-spacing-3) + 9px + var(--doity-spacing-2)) 0 var(--doity-component-input-paddingX);
  text-align: left;
  transition:
    border-color 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.22s cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;
}
.doity-select--search .doity-select__field {
  padding-right: var(--doity-spacing-3);
}
.doity-select__wrapper:has(.doity-select__icon-leading) .doity-select__field {
  padding-left: calc(var(--doity-spacing-3) + 18px + var(--doity-spacing-2));
}
.doity-select--sm .doity-select__field {
  height: var(--doity-component-input-height-sm);
}
.doity-select--md .doity-select__field {
  height: var(--doity-component-input-height-md);
}
.doity-select--lg .doity-select__field {
  height: var(--doity-component-input-height-lg);
}
.doity-select__value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.doity-select__field--placeholder {
  color: var(--doity-color-text-secondary, #737373);
}
.doity-select__field:focus,
.doity-select--open .doity-select__field {
  border-color: #717680;
  outline: none;
}
.doity-select--error .doity-select__field {
  border-color: var(--doity-color-border-error);
}
.doity-select--disabled .doity-select__field {
  background: var(--doity-color-background-secondary);
  color: var(--doity-color-text-disabled);
  cursor: not-allowed;
}
.doity-select--disabled .doity-select__wrapper:after {
  opacity: 0.5;
}

.doity-select__menu {
  animation: doity-select-menu-in 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  background: var(--doity-color-background-primary);
  border: 1px solid var(--doity-color-border-default);
  border-radius: var(--doity-radius-md);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 10%),
    0 2px 4px -2px rgb(0 0 0 / 10%);
  box-sizing: border-box;
  list-style: none;
  margin: 0;
  max-height: 240px;
  overflow-y: auto;
  padding: var(--doity-spacing-1);
  transform-origin: top center;
}
.doity-select__option {
  align-items: center;
  border-radius: var(--doity-radius-sm);
  box-sizing: border-box;
  color: var(--doity-color-text-primary);
  cursor: pointer;
  display: flex;
  font-size: var(--doity-font-size-xs);
  gap: var(--doity-spacing-2);
  justify-content: space-between;
  line-height: var(--doity-font-lineHeight-xs);
  min-height: var(--doity-component-dropdown-itemHeight);
  padding: 6px var(--doity-spacing-2);
  text-align: left;
  transition: background-color 0.18s ease;
  width: 100%;
}
.doity-select__option-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.doity-select__option:hover:not(.doity-select__option--disabled):not(.doity-select__option--selected) {
  background: #fafafa;
}
.doity-select__option--selected,
.doity-select__option--selected:hover {
  background: #f5f5f5;
}
.doity-select__option--disabled {
  color: var(--doity-color-text-disabled);
  cursor: not-allowed;
}
.doity-select__check {
  color: var(--doity-color-text-primary);
  flex-shrink: 0;
}
.doity-select__hint {
  color: var(--doity-color-text-secondary);
  font-size: var(--doity-font-size-xs);
  font-weight: var(--doity-font-weight-regular);
  line-height: var(--doity-font-lineHeight-xs);
  margin: 0;
}
.doity-select__hint--error {
  color: var(--doity-color-error-600);
}

@keyframes doity-select-menu-in {
  0% {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .doity-select__menu {
    animation: none;
  }
  .doity-select__option,
  .doity-select__field,
  .doity-select__wrapper:after {
    transition: none;
  }
}
</style>
