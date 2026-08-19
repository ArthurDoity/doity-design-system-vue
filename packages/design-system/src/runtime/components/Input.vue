<script setup>
import { computed, ref, useId, useSlots } from 'vue'

const props = defineProps({
  modelValue: { type: String, required: false, default: '' },
  type: { type: String, required: false, default: 'text' },
  /** default | search */
  variant: { type: String, required: false, default: 'default' },
  size: { type: String, required: false, default: 'md' },
  label: { type: String, required: false },
  placeholder: { type: String, required: false },
  hint: { type: String, required: false },
  error: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  required: { type: Boolean, required: false, default: false },
  /** Prefixo à esquerda (ex.: "http://") */
  leadingText: { type: String, required: false, default: '' },
  /** Mostra botão limpar (default true no variant search) */
  clearable: { type: Boolean, required: false, default: undefined },
  id: { type: String, required: false },
})

const emit = defineEmits(['update:modelValue', 'clear'])
const slots = useSlots()
const inputId = computed(() => props.id ?? `doity-input-${useId()}`)
const fieldRef = ref(null)
const isFocused = ref(false)

const isSearch = computed(() => props.variant === 'search')
const hasLeadingText = computed(() => Boolean(props.leadingText))
const showClear = computed(() => {
  if (props.clearable === false) return false
  if (props.clearable === true) return true
  return isSearch.value
})
const hasValue = computed(() => Boolean(props.modelValue))
const showErrorIcon = computed(
  () => Boolean(props.error) && !slots['icon-trailing'] && !isSearch.value,
)

function onInput(event) {
  emit('update:modelValue', event.target.value)
}

function clear() {
  emit('update:modelValue', '')
  emit('clear')
  fieldRef.value?.focus()
}

function focusField(event) {
  if (props.disabled) return
  if (event.target === fieldRef.value) return
  fieldRef.value?.focus()
}
</script>

<template>
  <div
    :class="[
      'doity-input',
      `doity-input--${props.size}`,
      `doity-input--${props.variant}`,
      {
        'doity-input--error': !!props.error,
        'doity-input--disabled': props.disabled,
        'doity-input--leading-text': hasLeadingText,
        'doity-input--focused': isFocused,
        'doity-input--filled': hasValue,
      },
    ]"
  >
    <label v-if="props.label" :for="inputId" class="doity-input__label">
      {{ props.label }}
      <span v-if="props.required" class="doity-input__required">*</span>
    </label>

    <div class="doity-input__control" @click="focusField">
      <!-- Search: ícone em célula separada -->
      <span v-if="isSearch" class="doity-input__search-addon" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none" class="doity-input__svg">
          <path
            d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
            stroke="currentColor"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>

      <span v-if="hasLeadingText" class="doity-input__leading-text">{{ props.leadingText }}</span>

      <div class="doity-input__field-shell">
        <span v-if="slots['icon-leading'] && !isSearch" class="doity-input__icon doity-input__icon--leading">
          <slot name="icon-leading" />
        </span>

        <input
          :id="inputId"
          ref="fieldRef"
          :type="isSearch ? 'search' : props.type"
          :value="props.modelValue"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :required="props.required"
          class="doity-input__field"
          :aria-invalid="props.error ? 'true' : undefined"
          :aria-describedby="props.hint || props.error ? `${inputId}-hint` : undefined"
          @input="onInput"
          @focus="isFocused = true"
          @blur="isFocused = false"
        >

        <button
          v-if="showClear"
          type="button"
          class="doity-input__clear"
          :class="{ 'doity-input__clear--active': hasValue }"
          :disabled="props.disabled || !hasValue"
          aria-label="Limpar"
          @click.stop="clear"
        >
          <svg viewBox="0 0 10 10" fill="none" class="doity-input__svg doity-input__svg--sm">
            <path
              d="M9 1L1.00054 8.99943M8.99946 9L1 1.00057"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <span
          v-else-if="showErrorIcon"
          class="doity-input__icon doity-input__icon--trailing doity-input__icon--error"
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" fill="none" class="doity-input__svg">
            <path
              d="M8 5.33333V8M8 10.6667H8.00667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z"
              stroke="currentColor"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>

        <span v-else-if="slots['icon-trailing']" class="doity-input__icon doity-input__icon--trailing">
          <slot name="icon-trailing" />
        </span>
      </div>
    </div>

    <p v-if="props.error" :id="`${inputId}-hint`" class="doity-input__hint doity-input__hint--error">
      {{ props.error }}
    </p>
    <p v-else-if="props.hint" :id="`${inputId}-hint`" class="doity-input__hint">
      {{ props.hint }}
    </p>
  </div>
</template>

<style scoped>
.doity-input {
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  gap: var(--doity-spacing-1, 4px);
  width: 100%;
}

.doity-input__label {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-size: var(--doity-font-size-xs, 12px);
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: var(--doity-font-lineHeight-xs, 16px);
  margin-bottom: var(--doity-spacing-1, 4px);
}

.doity-input__required {
  color: var(--doity-color-error-500, #f04438);
}

.doity-input__control {
  align-items: stretch;
  display: flex;
  width: 100%;
}

/* —— Default / leading-text shell —— */
.doity-input__field-shell {
  align-items: center;
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e5e5e5);
  border-radius: var(--doity-radius-input, 10px);
  box-shadow: var(--doity-shadow-xs);
  box-sizing: border-box;
  cursor: text;
  display: flex;
  flex: 1;
  gap: var(--doity-spacing-2, 8px);
  min-width: 0;
  padding-inline: var(--doity-component-input-paddingX, 12px);
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease,
    box-shadow 0.15s ease;
}

.doity-input--leading-text .doity-input__field-shell {
  border-bottom-left-radius: 0;
  border-left: 0;
  border-top-left-radius: 0;
  box-shadow: none;
  padding-left: 0;
}

.doity-input--leading-text .doity-input__control {
  border-radius: var(--doity-radius-input, 10px);
  box-shadow: var(--doity-shadow-xs);
}

.doity-input--leading-text .doity-input__leading-text {
  box-shadow: none;
}

.doity-input__leading-text {
  align-items: center;
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e5e5e5);
  border-bottom-left-radius: var(--doity-radius-input, 10px);
  border-right: 0;
  border-top-left-radius: var(--doity-radius-input, 10px);
  box-shadow: var(--doity-shadow-xs);
  color: var(--doity-color-text-tertiary, #737373);
  display: inline-flex;
  flex-shrink: 0;
  font-size: var(--doity-font-size-xs, 12px);
  line-height: var(--doity-font-lineHeight-xs, 16px);
  padding: 0 8px 0 14px;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.doity-input--sm .doity-input__field-shell,
.doity-input--sm .doity-input__leading-text {
  height: var(--doity-component-input-height-sm, 32px);
}

.doity-input--md .doity-input__field-shell,
.doity-input--md .doity-input__leading-text {
  height: var(--doity-component-input-height-md, 36px);
}

.doity-input--lg .doity-input__field-shell,
.doity-input--lg .doity-input__leading-text {
  height: var(--doity-component-input-height-lg, 40px);
}

.doity-input__field {
  background: transparent;
  border: none;
  box-sizing: border-box;
  color: var(--doity-color-text-primary, #0a0a0a);
  flex: 1;
  font-family: inherit;
  font-size: max(16px, var(--doity-component-input-fontSize, 12px));
  height: 100%;
  line-height: var(--doity-component-input-lineHeight, 16px);
  min-width: 0;
  padding: 0;
  width: 100%;
}

.doity-input__field:focus {
  outline: none;
}

.doity-input__field::placeholder {
  color: var(--doity-color-text-tertiary, #737373);
}

.doity-input__field::-webkit-search-cancel-button {
  appearance: none;
  display: none;
}

.doity-input__icon {
  align-items: center;
  color: var(--doity-color-text-secondary, #737373);
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
}

.doity-input__icon--error {
  color: var(--doity-color-error-500, #f04438);
}

.doity-input__svg {
  display: block;
  height: 16px;
  width: 16px;
}

.doity-input__svg--sm {
  height: 10px;
  width: 10px;
}

.doity-input__hint {
  color: var(--doity-color-text-secondary, #737373);
  font-size: var(--doity-font-size-xs, 12px);
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: var(--doity-font-lineHeight-xs, 16px);
  margin: 0;
}

.doity-input__hint--error {
  color: var(--doity-color-error-700, #b42318);
}

/* Focus — Gray/500 #717680 */
.doity-input:focus-within:not(.doity-input--error):not(.doity-input--disabled) .doity-input__field-shell,
.doity-input:focus-within:not(.doity-input--error):not(.doity-input--disabled) .doity-input__leading-text {
  border-color: #717680;
}

/* Error — border/danger #fda29b + texto #b42318 */
.doity-input--error .doity-input__field-shell,
.doity-input--error .doity-input__leading-text {
  border-color: var(--doity-color-error-300, #fda29b);
}

.doity-input--error .doity-input__field,
.doity-input--error .doity-input__leading-text {
  color: var(--doity-color-error-700, #b42318);
}

.doity-input--error .doity-input__icon--leading {
  color: var(--doity-color-error-500, #f04438);
}

/* Disabled */
.doity-input--disabled .doity-input__field-shell,
.doity-input--disabled .doity-input__leading-text,
.doity-input--disabled .doity-input__search-addon {
  background: var(--doity-color-background-secondary, #fafafa);
  border-color: var(--doity-color-border-default, #e5e5e5);
  box-shadow: none;
  cursor: not-allowed;
}

.doity-input--disabled .doity-input__field,
.doity-input--disabled .doity-input__leading-text,
.doity-input--disabled .doity-input__icon,
.doity-input--disabled .doity-input__search-addon {
  color: var(--doity-color-text-disabled, #d4d4d4);
  cursor: not-allowed;
}

/* —— Search variant —— */
.doity-input--search .doity-input__control {
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e5e5e5);
  border-radius: var(--doity-radius-md, 8px);
  box-shadow: 0 1px 1px rgba(10, 13, 18, 0.1);
  overflow: hidden;
}

.doity-input--search .doity-input__search-addon {
  align-items: center;
  color: var(--doity-color-text-primary, #0a0a0a);
  display: inline-flex;
  flex-shrink: 0;
  height: 36px;
  justify-content: center;
  width: 36px;
}

.doity-input--search .doity-input__field-shell {
  border: none;
  border-left: 1px solid var(--doity-color-border-default, #e5e5e5);
  border-radius: 0;
  box-shadow: none;
  height: 36px;
}

.doity-input--search:focus-within:not(.doity-input--disabled) .doity-input__control {
  border-color: #717680;
}

.doity-input__clear {
  align-items: center;
  background: none;
  border: none;
  color: var(--doity-color-text-tertiary, #737373);
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  height: 16px;
  justify-content: center;
  opacity: 0.45;
  padding: 0;
  width: 16px;
}

.doity-input__clear--active {
  color: var(--doity-color-text-primary, #0a0a0a);
  opacity: 1;
}

.doity-input__clear:disabled {
  cursor: default;
}
</style>
