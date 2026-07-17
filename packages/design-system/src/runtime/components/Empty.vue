<script setup>
import { computed, useSlots } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  title: { type: String, required: false, default: 'Nenhum dado encontrado' },
  description: { type: String, required: false, default: 'Não há itens para exibir no momento.' },
  /**
   * default — sem borda
   * outline — borda tracejada
   * muted — fundo em gradiente suave
   */
  variant: { type: String, required: false, default: 'default' },
  size: { type: String, required: false, default: 'md' },
  primaryLabel: { type: String, required: false, default: 'Criar item' },
  secondaryLabel: { type: String, required: false, default: '' },
  /** Link de apoio abaixo das ações (ex.: “Learn More”) */
  linkLabel: { type: String, required: false, default: '' },
  linkHref: { type: String, required: false, default: undefined },
  hideIcon: { type: Boolean, required: false, default: false },
  hideActions: { type: Boolean, required: false, default: false },
  /** Fade/slide ao montar (default true) */
  animated: { type: Boolean, required: false, default: true },
})

const emit = defineEmits(['primary', 'secondary', 'link'])
const slots = useSlots()

const surface = computed(() => {
  if (props.variant === 'outline' || props.variant === 'muted') return props.variant
  return 'default'
})

const hasMedia = computed(() => !!slots.media)
const showIcon = computed(() => !props.hideIcon && !hasMedia.value)
const hasDefaultSlot = computed(() => !!slots.default)
const hasActionsSlot = computed(() => !!slots.actions)
const hasFooterSlot = computed(() => !!slots.footer)

const showPrimary = computed(() => !props.hideActions && !!props.primaryLabel)
const showSecondary = computed(() => !props.hideActions && !!props.secondaryLabel)
const showBuiltinActions = computed(
  () => !hasActionsSlot.value && (showPrimary.value || showSecondary.value),
)
const showActionsRow = computed(
  () => hasActionsSlot.value || showBuiltinActions.value,
)

const showLink = computed(() => !!props.linkLabel)
const showFooter = computed(() => hasFooterSlot.value || showLink.value)

function onLink(e) {
  if (!props.linkHref) e.preventDefault()
  emit('link')
}
</script>

<template>
  <div
    :class="[
      'doity-empty',
      `doity-empty--${surface}`,
      `doity-empty--${props.size === 'sm' || props.size === 'lg' ? props.size : 'md'}`,
      { 'doity-empty--animated': props.animated },
    ]"
  >
    <div class="doity-empty__inner">
      <div class="doity-empty__header">
        <div v-if="hasMedia" class="doity-empty__media doity-empty__enter doity-empty__enter--1">
          <slot name="media" />
        </div>
        <div
          v-else-if="showIcon"
          class="doity-empty__icon doity-empty__enter doity-empty__enter--1"
          aria-hidden="true"
        >
          <slot name="icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
              <path
                d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4.379a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 12.121 8H19.5A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-10Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </slot>
        </div>

        <h3
          v-if="title || $slots.title"
          class="doity-empty__title doity-empty__enter doity-empty__enter--2"
        >
          <slot name="title">{{ title }}</slot>
        </h3>
        <p
          v-if="description || $slots.description"
          class="doity-empty__description doity-empty__enter doity-empty__enter--3"
        >
          <slot name="description">{{ description }}</slot>
        </p>
      </div>

      <div
        v-if="hasDefaultSlot"
        class="doity-empty__body doity-empty__enter doity-empty__enter--4"
      >
        <slot />
      </div>

      <div
        v-if="showActionsRow"
        class="doity-empty__actions doity-empty__enter doity-empty__enter--4"
      >
        <slot name="actions">
          <Button
            v-if="showPrimary"
            hierarchy="primary"
            size="sm"
            @click="emit('primary')"
          >
            {{ primaryLabel }}
          </Button>
          <Button
            v-if="showSecondary"
            hierarchy="outline"
            size="sm"
            @click="emit('secondary')"
          >
            {{ secondaryLabel }}
          </Button>
        </slot>
      </div>

      <div
        v-if="showFooter"
        class="doity-empty__footer doity-empty__enter doity-empty__enter--5"
      >
        <slot name="footer">
          <a
            v-if="showLink"
            class="doity-empty__link"
            :href="linkHref || '#'"
            @click="onLink"
          >
            {{ linkLabel }}
            <slot name="link-icon">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
                <path
                  d="M4.667 11.333L11.333 4.667M11.333 4.667H6M11.333 4.667V10"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </slot>
          </a>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doity-empty {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  justify-content: center;
  text-align: center;
  width: 100%;
}

.doity-empty--md {
  padding: 48px;
}

.doity-empty--sm {
  padding: 32px;
}

.doity-empty--lg {
  padding: 64px 48px;
}

.doity-empty--outline {
  border: 1px dashed var(--doity-color-border-default, #e4e4e7);
  border-radius: var(--doity-radius-lg, 10px);
}

.doity-empty--muted {
  background: linear-gradient(
    180deg,
    rgba(245, 245, 245, 0.5) 0%,
    rgba(245, 245, 245, 0.3) 100%
  );
  border-radius: var(--doity-radius-lg, 10px);
}

.doity-empty__inner {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 384px;
  width: 100%;
}

.doity-empty__header {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.doity-empty__icon {
  align-items: center;
  background: var(--doity-color-gray-100, #f4f4f5);
  border-radius: var(--doity-radius-lg, 10px);
  color: var(--doity-color-text-primary, #09090b);
  display: inline-flex;
  flex-shrink: 0;
  height: 40px;
  justify-content: center;
  width: 40px;
}

.doity-empty__icon :deep(svg) {
  display: block;
  height: 24px;
  width: 24px;
}

.doity-empty__media {
  align-items: center;
  display: flex;
  justify-content: center;
}

.doity-empty__title {
  color: var(--doity-color-text-primary, #09090b);
  font-size: 18px;
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: 28px;
  margin: 0;
  width: 100%;
}

.doity-empty__description {
  color: var(--doity-color-text-secondary, #71717b);
  font-size: 14px;
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: 20px;
  margin: 0;
  white-space: pre-line;
  width: 100%;
}

.doity-empty__body {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.doity-empty__actions {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.doity-empty__footer {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
}

.doity-empty__link {
  align-items: center;
  color: var(--doity-color-text-secondary, #71717b);
  display: inline-flex;
  font-size: 14px;
  font-weight: var(--doity-font-weight-medium, 500);
  gap: 6px;
  line-height: 20px;
  text-decoration: none;
}

.doity-empty__link:hover {
  color: var(--doity-color-text-primary, #09090b);
}

.doity-empty__footer :deep(a) {
  color: inherit;
  font-weight: var(--doity-font-weight-medium, 500);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.doity-empty--animated .doity-empty__enter {
  animation: doity-empty-enter 0.48s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.doity-empty--animated .doity-empty__enter--1 { animation-delay: 0.02s; }
.doity-empty--animated .doity-empty__enter--2 { animation-delay: 0.08s; }
.doity-empty--animated .doity-empty__enter--3 { animation-delay: 0.14s; }
.doity-empty--animated .doity-empty__enter--4 { animation-delay: 0.2s; }
.doity-empty--animated .doity-empty__enter--5 { animation-delay: 0.26s; }

@keyframes doity-empty-enter {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .doity-empty--animated .doity-empty__enter {
    animation: none;
  }
}
</style>
