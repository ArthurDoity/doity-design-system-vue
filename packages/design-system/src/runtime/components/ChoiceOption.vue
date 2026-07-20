<script setup>
import { computed, useId, useSlots } from 'vue'
import Checkbox from './Checkbox.vue'
import Radio from './Radio.vue'
import Badge from './Badge.vue'

const props = defineProps({
  /** Valor selecionado do grupo (v-model). Array se type="checkbox". */
  modelValue: { type: [String, Number, Array], required: false, default: '' },
  /** Valor desta opção */
  value: { type: [String, Number], required: true },
  label: { type: String, required: false },
  /** Texto secundário abaixo do label */
  description: { type: String, required: false, default: '' },
  name: { type: String, required: false },
  /**
   * Layout do item (Figma Checkbox group item):
   * - default — estilo legado (ícone opcional + check sólido à direita)
   * - control — checkbox/radio à esquerda + texto
   * - icon — featured icon à esquerda + controle à direita
   * - card — cabeçalho (ícone + título + check) + corpo (preço / descrição / tag)
   */
  variant: { type: String, required: false, default: 'default' },
  /**
   * Ícones de conveniência (opcional). Prefira o slot `icon`.
   * pix | credit-card
   */
  icon: { type: String, required: false, default: '' },
  /** radio = seleção única · checkbox = múltipla (modelValue array) */
  type: { type: String, required: false, default: 'radio' },
  /** Estilo do indicador: checkbox | radio | check-circle */
  control: { type: String, required: false, default: '' },
  size: { type: String, required: false, default: 'sm' },
  /** Exibe o indicador de check (variantes default/icon/card) */
  showCheck: { type: Boolean, required: false, default: true },
  /** Preço (variant=card) */
  price: { type: String, required: false, default: '' },
  /** Sufixo do preço, ex: "por mês" */
  priceSuffix: { type: String, required: false, default: '' },
  /** Badge no corpo do card */
  tag: { type: String, required: false, default: '' },
  disabled: { type: Boolean, required: false, default: false },
  id: { type: String, required: false },
})

const emit = defineEmits(['update:modelValue', 'select'])
const slots = useSlots()
const inputId = computed(() => props.id ?? `choice-option-${useId()}`)
const isCheckbox = computed(() => props.type === 'checkbox')

const selected = computed(() => {
  if (isCheckbox.value && Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue === props.value
})

const showIcon = computed(() => Boolean(slots.icon || props.icon))
const showDescription = computed(() => Boolean(props.description || slots.description))
const showPrice = computed(() => Boolean(props.price || slots.price))
const showTag = computed(() => Boolean(props.tag || slots.tag))

/** Controle visual: default → check-circle à direita; control → type; icon → check-circle */
const controlStyle = computed(() => {
  if (props.control) return props.control
  if (props.variant === 'control') return isCheckbox.value ? 'checkbox' : 'radio'
  return 'check-circle'
})

const isControlLeft = computed(() => props.variant === 'control')
const isCard = computed(() => props.variant === 'card')
const isIcon = computed(() => props.variant === 'icon')
const isDefault = computed(() => props.variant === 'default' || (!isControlLeft.value && !isCard.value && !isIcon.value))

function onChange() {
  if (props.disabled) return

  if (isCheckbox.value) {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const idx = current.indexOf(props.value)
    if (idx >= 0) current.splice(idx, 1)
    else current.push(props.value)
    emit('update:modelValue', current)
    emit('select', current)
    return
  }

  emit('update:modelValue', props.value)
  emit('select', props.value)
}
</script>

<template>
  <label
    :class="[
      'doity-choice-option',
      `doity-choice-option--${props.variant}`,
      `doity-choice-option--${props.size}`,
      {
        'doity-choice-option--selected': selected,
        'doity-choice-option--disabled': props.disabled,
        'doity-choice-option--with-description': showDescription,
        'doity-choice-option--with-icon': showIcon,
      },
    ]"
  >
    <input
      :id="inputId"
      :type="isCheckbox ? 'checkbox' : 'radio'"
      class="doity-choice-option__input"
      :name="props.name"
      :value="props.value"
      :checked="selected"
      :disabled="props.disabled"
      @change="onChange"
    >

    <!-- ─── Card (icon card) ─── -->
    <template v-if="isCard">
      <span class="doity-choice-option__card">
        <span class="doity-choice-option__card-header">
          <span class="doity-choice-option__card-header-main">
            <span
              v-if="showIcon"
              class="doity-choice-option__featured-icon"
              aria-hidden="true"
            >
              <slot name="icon">
                <svg
                  v-if="props.icon === 'pix'"
                  viewBox="0 0 20 20"
                  fill="none"
                ><!-- pix paths kept via default slot usage --></svg>
              </slot>
            </span>
            <span class="doity-choice-option__label">
              <slot>{{ props.label }}</slot>
            </span>
          </span>
          <span
            v-if="props.showCheck"
            class="doity-choice-option__indicator doity-choice-option__indicator--check-circle"
            aria-hidden="true"
          >
            <svg viewBox="0 0 12 9" fill="none">
              <path
                d="M10.333 1L3.917 7.417L1 4.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </span>
        <span class="doity-choice-option__card-body">
          <span class="doity-choice-option__card-body-main">
            <span
              v-if="showPrice"
              class="doity-choice-option__price-row"
            >
              <slot name="price">
                <span class="doity-choice-option__price">{{ props.price }}</span>
                <span
                  v-if="props.priceSuffix"
                  class="doity-choice-option__price-suffix"
                >{{ props.priceSuffix }}</span>
              </slot>
            </span>
            <span
              v-if="showDescription"
              class="doity-choice-option__description"
            >
              <slot name="description">{{ props.description }}</slot>
            </span>
          </span>
          <Badge
            v-if="showTag"
            variant="success"
            size="sm"
            class="doity-choice-option__tag"
          >
            <slot name="tag">{{ props.tag }}</slot>
          </Badge>
        </span>
      </span>
    </template>

    <!-- ─── Control / Icon / Default ─── -->
    <span
      v-else
      class="doity-choice-option__body"
    >
      <!-- Controle à esquerda (variant=control): Checkbox/Radio apenas apresentacional -->
      <template v-if="isControlLeft">
        <span
          v-if="controlStyle === 'checkbox' || controlStyle === 'radio'"
          class="doity-choice-option__control"
          aria-hidden="true"
          inert
        >
          <Checkbox
            v-if="controlStyle === 'checkbox'"
            :model-value="selected"
            :size="props.size"
            :disabled="props.disabled"
          />
          <Radio
            v-else
            :model-value="selected ? props.value : undefined"
            :value="props.value"
            :size="props.size"
            :disabled="props.disabled"
          />
        </span>
        <span
          v-else
          class="doity-choice-option__indicator"
          :class="`doity-choice-option__indicator--${controlStyle}`"
          aria-hidden="true"
        >
          <svg viewBox="0 0 12 9" fill="none">
            <path
              d="M10.333 1L3.917 7.417L1 4.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </template>

      <span class="doity-choice-option__leading">
        <span
          v-if="showIcon && (isIcon || isDefault)"
          :class="isIcon ? 'doity-choice-option__featured-icon' : 'doity-choice-option__icon'"
          aria-hidden="true"
        >
          <slot name="icon">
            <svg
              v-if="props.icon === 'pix'"
              class="doity-choice-option__icon-svg"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g transform="translate(4.05 0)">
                <path
                  d="M8.93652 14.9697C9.27849 15.3128 9.68529 15.5842 10.1328 15.7695C10.1904 15.7934 10.249 15.8151 10.3076 15.8359L7.56543 18.5801C6.6726 19.4729 5.22291 19.4729 4.33008 18.5801L1.6543 15.9043C1.77218 15.8689 1.88878 15.8285 2.00293 15.7812C2.45046 15.5959 2.85637 15.3236 3.19824 14.9805L3.19922 14.9814L6.07324 12.1064L8.93652 14.9697ZM5.94824 0.75C6.55481 0.750089 7.13636 0.991158 7.56543 1.41992L10.3066 4.16113C10.2484 4.18186 10.191 4.20483 10.1338 4.22852C9.6865 4.41383 9.28018 4.68631 8.93848 5.0293L6.07422 7.89258L3.19922 5.01758C2.76224 4.5806 2.23266 4.2669 1.65527 4.09375L4.33008 1.41992C4.75923 0.991067 5.34154 0.75 5.94824 0.75Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </g>
              <g transform="translate(0 5.54)">
                <path
                  d="M4.64062 0.780273L4.76953 0.787109C5.02661 0.813124 5.27056 0.913733 5.4707 1.07715L5.56738 1.16406L8.57617 4.17383V4.1748C8.68502 4.28422 8.80583 4.3801 8.93457 4.46387C8.81187 4.54149 8.6955 4.63089 8.58887 4.73242L8.58301 4.73926L8.57617 4.74609L5.56543 7.75879C5.32379 8.0001 4.98672 8.13954 4.64258 8.13965H3.47949L1.41992 6.08008C0.52649 5.18557 0.527268 3.73543 1.41992 2.84277L3.48145 0.780273H4.64062ZM15.5967 0.792969H16.5293L18.5791 2.84277C19.4719 3.73558 19.4718 5.18529 18.5791 6.07812L16.5303 8.12695H15.5967C15.253 8.12695 14.9144 7.98654 14.6748 7.74609L11.6611 4.73242L11.499 4.59277C11.44 4.54647 11.3785 4.50376 11.3154 4.46387C11.4446 4.37992 11.5656 4.28357 11.6748 4.17383L14.6738 1.17578L14.6748 1.1748C14.9153 0.933432 15.2544 0.792969 15.5967 0.792969Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
              </g>
            </svg>

            <svg
              v-else-if="props.icon === 'credit-card'"
              class="doity-choice-option__icon-svg"
              viewBox="0 0 20 15"
              fill="none"
            >
              <path
                d="M0.75 5.75H19.0833M2.41667 0.75H17.4167C18.3371 0.75 19.0833 1.49619 19.0833 2.41667V12.4167C19.0833 13.3371 18.3371 14.0833 17.4167 14.0833H2.41667C1.49619 14.0833 0.75 13.3371 0.75 12.4167V2.41667C0.75 1.49619 1.49619 0.75 2.41667 0.75Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </slot>
        </span>

        <span class="doity-choice-option__content">
          <span class="doity-choice-option__label">
            <slot>{{ props.label }}</slot>
          </span>
          <span
            v-if="showDescription"
            class="doity-choice-option__description"
          >
            <slot name="description">{{ props.description }}</slot>
          </span>
        </span>
      </span>

      <!-- Controle / check à direita (default + icon) -->
      <span
        v-if="!isControlLeft && (props.showCheck || slots.check || slots.trailing)"
        class="doity-choice-option__trailing"
        aria-hidden="true"
      >
        <slot name="trailing">
          <span
            v-if="props.showCheck"
            class="doity-choice-option__indicator"
            :class="[
              `doity-choice-option__indicator--${controlStyle}`,
              { 'doity-choice-option__check': isDefault },
            ]"
          >
            <slot name="check">
              <svg
                v-if="controlStyle !== 'radio'"
                viewBox="0 0 12 9"
                fill="none"
              >
                <path
                  d="M10.333 1L3.917 7.417L1 4.5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <!-- radio: dot via radial-gradient no CSS (sem nó + scale) -->
            </slot>
          </span>
        </slot>
      </span>
    </span>
  </label>
</template>

<style scoped>
@property --doity-choice-radio-dot-r {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@property --doity-choice-radio-dot {
  syntax: '<color>';
  inherits: false;
  initial-value: transparent;
}

.doity-choice-option {
  --doity-choice-bg: var(--doity-color-background-primary, #fff);
  --doity-choice-border: var(--doity-color-border-default, #e5e5e5);
  --doity-choice-fg: var(--doity-color-text-primary, #0a0a0a);
  --doity-choice-selected-bg: var(--doity-color-background-brand, #fff1f2);
  --doity-choice-selected-border: var(--doity-color-border-brand, #ff9da1);
  --doity-choice-selected-fg: var(--doity-color-text-brand, #ff2b34);
  --doity-choice-check-bg: var(--doity-color-action-primary-hover, #ed151e);
  cursor: pointer;
  display: block;
  font-family: var(--doity-font-family-sans);
  user-select: none;
  width: 100%;
}

.doity-choice-option--disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.doity-choice-option__input {
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
}

/* ── Body (default / control / icon) ── */
.doity-choice-option__body {
  align-items: flex-start;
  background: var(--doity-choice-bg);
  border: 1px solid var(--doity-choice-border);
  border-radius: var(--doity-radius-md, 8px);
  box-sizing: border-box;
  color: var(--doity-choice-fg);
  display: flex;
  gap: var(--doity-spacing-1, 4px);
  justify-content: space-between;
  padding: var(--doity-spacing-4, 16px);
  transform: scale(1);
  transition:
    background-color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    border-color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.45s cubic-bezier(0.34, 1.7, 0.42, 1);
  width: 100%;
}

.doity-choice-option--default .doity-choice-option__body {
  align-items: center;
  gap: var(--doity-spacing-2, 8px);
  min-height: 52px;
  padding: 0 var(--doity-spacing-4, 16px);
}

.doity-choice-option--default.doity-choice-option--with-description .doity-choice-option__body {
  min-height: 64px;
  padding-bottom: 12px;
  padding-top: 12px;
}

.doity-choice-option--control .doity-choice-option__body {
  gap: var(--doity-spacing-2, 8px);
}

.doity-choice-option--icon .doity-choice-option__body {
  gap: var(--doity-spacing-1, 4px);
}

.doity-choice-option--md .doity-choice-option__label {
  font-size: var(--doity-font-size-sm, 14px);
  line-height: var(--doity-font-lineHeight-sm, 20px);
}

.doity-choice-option--md .doity-choice-option__description {
  font-size: var(--doity-font-size-sm, 14px);
  line-height: var(--doity-font-lineHeight-sm, 20px);
}

.doity-choice-option__leading {
  align-items: flex-start;
  display: inline-flex;
  flex: 1 1 auto;
  gap: var(--doity-spacing-4, 16px);
  min-width: 0;
}

.doity-choice-option--default .doity-choice-option__leading {
  align-items: center;
  gap: var(--doity-spacing-2, 8px);
}

.doity-choice-option--control .doity-choice-option__leading {
  gap: 0;
}

.doity-choice-option__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--doity-spacing-1, 4px);
  min-width: 0;
}

.doity-choice-option--default .doity-choice-option__content {
  gap: 2px;
}

.doity-choice-option__icon {
  align-items: center;
  color: currentColor;
  display: inline-flex;
  flex-shrink: 0;
  height: 20px;
  justify-content: center;
  transition: color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1);
  width: 20px;
}

.doity-choice-option__featured-icon {
  align-items: center;
  background: var(--doity-color-background-brand, #fff1f2);
  border-radius: 999px;
  box-shadow: 0 0 0 4px var(--doity-color-background-brand, #fff1f2);
  color: var(--doity-color-brand-500, #ff2b34);
  display: inline-flex;
  flex-shrink: 0;
  height: 28px;
  justify-content: center;
  transition: color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1);
  width: 28px;
}

.doity-choice-option__featured-icon :deep(svg),
.doity-choice-option__icon-svg,
.doity-choice-option__icon :deep(svg) {
  display: block;
  height: 16px;
  width: 16px;
}

.doity-choice-option__label {
  font-size: var(--doity-font-size-xs, 12px);
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: var(--doity-font-lineHeight-xs, 16px);
  overflow: hidden;
  text-overflow: ellipsis;
}

.doity-choice-option--default .doity-choice-option__label {
  font-size: var(--doity-font-size-sm, 14px);
  line-height: var(--doity-font-lineHeight-sm, 20px);
  white-space: nowrap;
}

.doity-choice-option__description {
  color: var(--doity-color-text-secondary, #737373);
  font-size: var(--doity-font-size-xs, 12px);
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: var(--doity-font-lineHeight-xs, 16px);
  transition: color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.doity-choice-option--default .doity-choice-option__description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doity-choice-option--selected .doity-choice-option__description {
  color: currentColor;
  opacity: 0.85;
}

.doity-choice-option__trailing {
  align-items: flex-start;
  display: inline-flex;
  flex-shrink: 0;
  padding-top: 2px;
}

.doity-choice-option--default .doity-choice-option__trailing {
  align-items: center;
  padding-top: 0;
}

/* ── Indicators ── */
.doity-choice-option__indicator {
  align-items: center;
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-strong, #d4d4d4);
  box-sizing: border-box;
  color: transparent;
  display: inline-flex;
  flex-shrink: 0;
  height: 16px;
  justify-content: center;
  transition:
    background-color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    border-color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    box-shadow 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    opacity 0.22s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.4s cubic-bezier(0.34, 1.7, 0.42, 1),
    width 0.22s cubic-bezier(0.25, 0.1, 0.25, 1);
  width: 16px;
}

.doity-choice-option--md .doity-choice-option__indicator {
  height: 20px;
  width: 20px;
}

.doity-choice-option__indicator--checkbox {
  border-radius: var(--doity-radius-sm, 6px);
  box-shadow: var(--doity-shadow-xs);
  color: var(--doity-color-brand-500, #ff2b34);
  margin-top: 2px;
}

.doity-choice-option__indicator--radio {
  --doity-choice-radio-dot-r: 0px;
  --doity-choice-radio-dot: transparent;
  --doity-choice-radio-ring: var(--doity-color-border-strong, #d4d4d4);
  background-clip: padding-box;
  background-color: var(--doity-color-background-primary, #fff);
  background-image: radial-gradient(
    circle at center,
    var(--doity-choice-radio-dot) 0,
    var(--doity-choice-radio-dot) var(--doity-choice-radio-dot-r),
    transparent calc(var(--doity-choice-radio-dot-r) + 0.5px)
  );
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px var(--doity-choice-radio-ring);
  margin-top: 2px;
  transition:
    background-color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    box-shadow 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    --doity-choice-radio-dot-r 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    --doity-choice-radio-dot 0.2s ease,
    --doity-choice-radio-ring 0.2s ease;
}

.doity-choice-option__indicator--check-circle {
  border-radius: 8px;
  color: #fff;
}

.doity-choice-option__indicator svg {
  display: block;
  height: 8px;
  opacity: 0;
  transform: scale(0.3);
  transition:
    opacity 0.22s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.4s cubic-bezier(0.34, 1.7, 0.42, 1);
  width: 10px;
}

.doity-choice-option--selected .doity-choice-option__indicator--checkbox {
  background: var(--doity-color-background-brand, #fff1f2);
  border-color: var(--doity-color-border-brand, #ff9da1);
}

.doity-choice-option--selected .doity-choice-option__indicator--radio {
  --doity-choice-radio-dot: var(--doity-color-brand-500, #ff2b34);
  --doity-choice-radio-dot-r: 3px;
  --doity-choice-radio-ring: var(--doity-color-border-focus, #ff2b34);
  background-color: var(--doity-color-background-brand, #fff1f2);
}

.doity-choice-option--md.doity-choice-option--selected .doity-choice-option__indicator--radio {
  --doity-choice-radio-dot-r: 4px;
}

.doity-choice-option--selected .doity-choice-option__indicator--check-circle {
  background: var(--doity-choice-check-bg);
  border-color: var(--doity-color-border-brand, #ff9da1);
}

.doity-choice-option--selected .doity-choice-option__indicator svg {
  opacity: 1;
  transform: scale(1);
}

/* Legado: check colapsa quando não selecionado */
.doity-choice-option--default .doity-choice-option__check {
  background: var(--doity-choice-check-bg);
  border: none;
  border-radius: 8px;
  color: #fff;
  height: 16px;
  opacity: 0;
  overflow: hidden;
  transform: scale(0.3);
  width: 0;
}

.doity-choice-option--default.doity-choice-option--selected .doity-choice-option__check {
  opacity: 1;
  transform: scale(1);
  width: 16px;
}

.doity-choice-option--default .doity-choice-option__check svg {
  opacity: 1;
  transform: none;
}

/* Hover / press / selected */
.doity-choice-option:hover:not(.doity-choice-option--disabled):not(.doity-choice-option--selected)
  .doity-choice-option__body {
  border-color: var(--doity-color-gray-300, #d5d7da);
}

.doity-choice-option:active:not(.doity-choice-option--disabled) .doity-choice-option__body,
.doity-choice-option:active:not(.doity-choice-option--disabled) .doity-choice-option__card {
  transform: scale(0.97);
  transition:
    background-color 0.12s cubic-bezier(0.33, 0, 0.67, 1),
    border-color 0.12s cubic-bezier(0.33, 0, 0.67, 1),
    transform 0.12s cubic-bezier(0.33, 0, 0.67, 1);
}

.doity-choice-option--selected .doity-choice-option__body {
  background: var(--doity-choice-selected-bg);
  border-color: var(--doity-choice-selected-border);
  color: var(--doity-choice-selected-fg);
}

.doity-choice-option__input:focus-visible + .doity-choice-option__body,
.doity-choice-option__input:focus-visible + .doity-choice-option__card {
  box-shadow: var(--doity-shadow-focused);
}

/* ── Card variant ── */
.doity-choice-option__card {
  background: var(--doity-choice-bg);
  border: 1px solid var(--doity-choice-border);
  border-radius: var(--doity-radius-md, 8px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: scale(1);
  transition:
    border-color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.45s cubic-bezier(0.34, 1.7, 0.42, 1);
  width: 100%;
}

.doity-choice-option__card-header {
  align-items: center;
  background: var(--doity-choice-bg);
  border-bottom: 1px solid var(--doity-choice-border);
  display: flex;
  gap: var(--doity-spacing-1, 4px);
  justify-content: space-between;
  padding: var(--doity-spacing-4, 16px) 20px var(--doity-spacing-4, 16px) var(--doity-spacing-4, 16px);
  transition:
    background-color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    border-color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1),
    color 0.28s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.doity-choice-option--selected .doity-choice-option__card {
  border-color: var(--doity-choice-selected-border);
}

.doity-choice-option--selected .doity-choice-option__card-header {
  background: var(--doity-choice-selected-bg);
  border-bottom-color: var(--doity-choice-selected-border);
  color: var(--doity-choice-selected-fg);
}

.doity-choice-option__card-header-main {
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  gap: var(--doity-spacing-4, 16px);
  min-width: 0;
}

.doity-choice-option__card-header .doity-choice-option__label {
  font-size: var(--doity-font-size-sm, 14px);
  line-height: var(--doity-font-lineHeight-sm, 20px);
}

.doity-choice-option__card-body {
  display: flex;
  gap: var(--doity-spacing-1, 4px);
  padding: var(--doity-spacing-4, 16px);
}

.doity-choice-option__card-body-main {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--doity-spacing-1, 4px);
  min-width: 0;
}

.doity-choice-option__price-row {
  align-items: flex-end;
  display: flex;
  gap: var(--doity-spacing-1, 4px);
}

.doity-choice-option__price {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-size: var(--doity-font-size-display-xs, 24px);
  font-weight: var(--doity-font-weight-semibold, 600);
  line-height: var(--doity-font-lineHeight-display-xs, 32px);
}

.doity-choice-option__price-suffix {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-size: var(--doity-font-size-xs, 12px);
  line-height: var(--doity-font-lineHeight-xs, 16px);
  padding-bottom: 3px;
}

/* Controle apresentacional (Checkbox/Radio) — não recebe clique próprio */
.doity-choice-option__control {
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
  pointer-events: none;
}

.doity-choice-option__tag {
  flex-shrink: 0;
}

@media (prefers-reduced-motion: reduce) {
  .doity-choice-option__body,
  .doity-choice-option__card,
  .doity-choice-option__indicator,
  .doity-choice-option__indicator svg,
  .doity-choice-option__icon,
  .doity-choice-option__featured-icon {
    transition: none;
  }

  .doity-choice-option:active:not(.doity-choice-option--disabled) .doity-choice-option__body,
  .doity-choice-option:active:not(.doity-choice-option--disabled) .doity-choice-option__card {
    transform: none;
  }
}
</style>
