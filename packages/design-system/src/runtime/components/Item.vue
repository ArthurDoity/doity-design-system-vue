<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  /** Título */
  title: { type: String, required: false, default: '' },
  /** Descrição / texto secundário */
  description: { type: String, required: false, default: '' },
  /**
   * default — sem borda
   * outline — borda
   * muted — fundo suave
   */
  variant: { type: String, required: false, default: 'outline' },
  /** default | sm */
  size: { type: String, required: false, default: 'default' },
  /**
   * horizontal — media | content | actions (padrão)
   * vertical — media em cima, content embaixo (cards)
   */
  layout: { type: String, required: false, default: 'horizontal' },
  /** Torna o item clicável (hover + cursor) */
  clickable: { type: Boolean, required: false, default: false },
  /** Renderiza como link (âncora) */
  href: { type: String, required: false, default: undefined },
  target: { type: String, required: false, default: undefined },
})

const emit = defineEmits(['click'])
const slots = useSlots()

const variantKey = computed(() => {
  if (props.variant === 'muted' || props.variant === 'default') return props.variant
  return 'outline'
})

const sizeKey = computed(() => (props.size === 'sm' ? 'sm' : 'default'))
const layoutKey = computed(() => (props.layout === 'vertical' ? 'vertical' : 'horizontal'))

const tag = computed(() => (props.href ? 'a' : props.clickable ? 'button' : 'div'))

const hasMedia = computed(() => Boolean(slots.media || slots.leading))
const hasActions = computed(() => Boolean(slots.actions || slots.trailing))
const hasTitle = computed(() => Boolean(props.title || slots.title))
const hasDescription = computed(() => Boolean(props.description || slots.description))
const hasContent = computed(() => hasTitle.value || hasDescription.value || Boolean(slots.default))

const rootClasses = computed(() => [
  'doity-item',
  `doity-item--${variantKey.value}`,
  `doity-item--${sizeKey.value}`,
  `doity-item--${layoutKey.value}`,
  {
    'doity-item--clickable': props.clickable || Boolean(props.href),
    'doity-item--has-media': hasMedia.value,
    'doity-item--has-actions': hasActions.value,
  },
])

function onClick(e) {
  if (tag.value === 'button' || props.href) emit('click', e)
}
</script>

<template>
  <component
    :is="tag"
    :class="rootClasses"
    :href="tag === 'a' ? href : undefined"
    :target="tag === 'a' ? target : undefined"
    :type="tag === 'button' ? 'button' : undefined"
    @click="onClick"
  >
    <div
      v-if="hasMedia"
      class="doity-item__media"
    >
      <slot name="media">
        <slot name="leading" />
      </slot>
    </div>

    <div
      v-if="hasContent"
      class="doity-item__content"
    >
      <div
        v-if="hasTitle || hasDescription"
        class="doity-item__text"
      >
        <div
          v-if="hasTitle"
          class="doity-item__title"
        >
          <slot name="title">{{ title }}</slot>
        </div>
        <div
          v-if="hasDescription"
          class="doity-item__description"
        >
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
      <slot />
    </div>

    <div
      v-if="hasActions"
      class="doity-item__actions"
    >
      <slot name="actions">
        <slot name="trailing" />
      </slot>
    </div>
  </component>
</template>

<style scoped>
.doity-item {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: var(--doity-radius-md, 8px);
  box-sizing: border-box;
  color: inherit;
  display: flex;
  font-family: var(--doity-font-family-sans);
  gap: 16px;
  overflow: hidden;
  padding: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition:
    background 0.18s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.18s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.18s cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;
}

.doity-item--outline {
  border: 1px solid var(--doity-color-border-default, #e4e4e7);
}

.doity-item--muted {
  background: var(--doity-color-background-tertiary, #f4f4f5);
}

.doity-item--sm {
  gap: 10px;
  padding: 12px 16px;
}

.doity-item--vertical {
  align-items: stretch;
  flex-direction: column;
  gap: 16px;
}

.doity-item--clickable {
  cursor: pointer;
}

.doity-item--clickable:hover {
  background: var(--doity-color-background-secondary, #fafafa);
}

.doity-item--outline.doity-item--clickable:hover {
  background: var(--doity-color-background-secondary, #fafafa);
}

.doity-item--muted.doity-item--clickable:hover {
  background: var(--doity-color-background-secondary, #ebebef);
}

.doity-item--clickable:active {
  transform: scale(0.995);
}

.doity-item__media {
  align-items: center;
  display: flex;
  flex-shrink: 0;
}

.doity-item--vertical .doity-item__media {
  width: 100%;
}

.doity-item__content {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.doity-item__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  width: 100%;
}

.doity-item__title {
  color: var(--doity-color-text-primary, #09090b);
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  font-weight: 500;
  gap: 2px;
  line-height: 20px;
  min-width: 0;
}

.doity-item__description {
  color: var(--doity-color-text-secondary, #71717b);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  min-width: 0;
}

.doity-item__actions {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: 8px;
}

.doity-item--vertical .doity-item__actions {
  width: 100%;
}

/* Helpers usados nas stories / composição */
.doity-item :deep(.doity-item__icon-box) {
  align-items: center;
  background: var(--doity-color-background-tertiary, #f4f4f5);
  border: 1px solid var(--doity-color-border-default, #e4e4e7);
  border-radius: 6px;
  box-sizing: border-box;
  color: var(--doity-color-text-primary, #09090b);
  display: inline-flex;
  height: 32px;
  justify-content: center;
  width: 32px;
}

.doity-item :deep(.doity-item__thumb) {
  border-radius: 10px;
  display: block;
  height: 40px;
  object-fit: cover;
  width: 40px;
}

.doity-item :deep(.doity-item__cover) {
  border-radius: 6px;
  display: block;
  height: 146px;
  object-fit: cover;
  width: 100%;
}

.doity-item :deep(.doity-item__meta) {
  color: var(--doity-color-text-secondary, #71717b);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  white-space: nowrap;
}

.doity-item :deep(.doity-item__title-muted) {
  color: var(--doity-color-text-secondary, #71717b);
  font-weight: 400;
}

@media (prefers-reduced-motion: reduce) {
  .doity-item {
    transition: none;
  }
  .doity-item--clickable:active {
    transform: none;
  }
}
</style>
