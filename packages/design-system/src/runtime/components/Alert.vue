<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  /**
   * default — ícone neutro + título/descrição
   * destructive | error — texto/ícone vermelho
   * success | warning | info — ícones semânticos
   */
  variant: { type: String, required: false, default: 'default' },
  title: { type: String, required: false },
  description: { type: String, required: false },
  /** Exibe ícone built-in (ou slot icon) */
  icon: { type: Boolean, required: false, default: true },
  dismissible: { type: Boolean, required: false, default: false },
  /**
   * Animação de entrada/saída (útil quando o alert surge após uma ação).
   * Desligue para alerts estáticos/persistentes na página.
   */
  animated: { type: Boolean, required: false, default: true },
})

const emit = defineEmits(['dismiss'])
/** Controle externo de visibilidade (v-model) — permite animar a saída */
const open = defineModel({ type: Boolean, default: true })
const slots = useSlots()

const resolvedVariant = computed(() => {
  if (props.variant === 'error') return 'destructive'
  return props.variant || 'default'
})

const showIcon = computed(() => props.icon || !!slots.icon)
const hasBody = computed(
  () => !!(props.description || slots.default),
)
const transitionName = computed(() => (props.animated ? 'doity-alert' : undefined))

function dismiss() {
  open.value = false
  emit('dismiss')
}
</script>

<template>
  <Transition :name="transitionName" :appear="props.animated">
  <div
    v-if="open"
    :class="['doity-alert', `doity-alert--${resolvedVariant}`]"
    role="alert"
  >
    <span
      v-if="showIcon"
      class="doity-alert__icon"
      aria-hidden="true"
    >
      <slot name="icon">
        <!-- success / default: circle-check -->
        <svg
          v-if="resolvedVariant === 'success' || resolvedVariant === 'default'"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M6 8L7.33333 9.33333L10 6.66667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z"
            stroke="currentColor"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <!-- destructive: CircleAlert (Figma 2119:9514) -->
        <svg
          v-else-if="resolvedVariant === 'destructive'"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 5.33333V8M8 10.6667H8.00667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z"
            stroke="currentColor"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <!-- warning: triangle -->
        <svg
          v-else-if="resolvedVariant === 'warning'"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 6V8.66667M8 11.3333H8.00667M14.4866 12L9.15329 2.66665C9.037 2.46146 8.86836 2.29078 8.66457 2.17203C8.46078 2.05329 8.22915 1.99072 7.99329 1.99072C7.75743 1.99072 7.52579 2.05329 7.322 2.17203C7.11822 2.29078 6.94958 2.46146 6.83329 2.66665L1.49995 12C1.38241 12.2036 1.32077 12.4346 1.32129 12.6697C1.32181 12.9047 1.38447 13.1355 1.50292 13.3385C1.62136 13.5416 1.79138 13.7097 1.99575 13.8259C2.20011 13.942 2.43156 14.0021 2.66662 14H13.3333C13.5672 13.9997 13.797 13.938 13.9995 13.8208C14.202 13.7037 14.3701 13.5354 14.487 13.3327C14.6038 13.1301 14.6653 12.9002 14.6653 12.6663C14.6652 12.4324 14.6036 12.2026 14.4866 12Z"
            stroke="currentColor"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <!-- info -->
        <svg
          v-else
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 10.6667V8M8 5.33333H8.00667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z"
            stroke="currentColor"
            stroke-width="1.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </slot>
    </span>

    <div class="doity-alert__content">
      <p v-if="props.title" class="doity-alert__title">{{ props.title }}</p>
      <div v-if="hasBody" class="doity-alert__body">
        <div v-if="slots.default" class="doity-alert__description">
          <slot />
        </div>
        <p v-else-if="props.description" class="doity-alert__description">
          {{ props.description }}
        </p>
      </div>
    </div>

    <button
      v-if="props.dismissible"
      type="button"
      class="doity-alert__dismiss"
      aria-label="Fechar"
      @click="dismiss"
    >
      ×
    </button>
  </div>
  </Transition>
</template>

<style scoped>
/* Figma Alert card: white, border #e4e4e7, radius 10, px-16 py-12, gap 12 */
.doity-alert {
  --doity-alert-fg: var(--doity-color-text-primary, #09090b);
  --doity-alert-muted: var(--doity-color-text-secondary, #737373);
  align-items: flex-start;
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e4e4e7);
  border-radius: var(--doity-radius-lg, 10px);
  color: var(--doity-alert-fg);
  display: flex;
  font-family: var(--doity-font-family-sans);
  gap: var(--doity-spacing-3, 12px);
  padding: 12px 16px;
  width: 100%;
}

.doity-alert__icon {
  color: var(--doity-alert-fg);
  display: block;
  flex-shrink: 0;
  height: 16px;
  margin-top: 2px;
  width: 16px;
}

.doity-alert__icon svg {
  display: block;
  height: 100%;
  overflow: visible;
  width: 100%;
}

.doity-alert__content {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.doity-alert__title {
  color: var(--doity-alert-fg);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: var(--doity-font-lineHeight-sm, 20px);
  margin: 0;
}

.doity-alert__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.doity-alert__description {
  color: var(--doity-alert-muted);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: var(--doity-font-lineHeight-sm, 20px);
  margin: 0;
}

.doity-alert__description :deep(ul) {
  list-style: disc;
  margin: 0;
  padding-left: 21px;
}

.doity-alert__description :deep(li) {
  margin: 0;
}

.doity-alert__dismiss {
  background: none;
  border: none;
  color: var(--doity-alert-muted);
  cursor: pointer;
  flex-shrink: 0;
  font-size: 18px;
  line-height: 1;
  margin-left: auto;
  padding: 0;
}

/* Title-only: center icon with single line */
.doity-alert:not(:has(.doity-alert__body)) {
  align-items: center;
}

.doity-alert:not(:has(.doity-alert__body)) .doity-alert__icon {
  margin-top: 0;
}

.doity-alert--destructive {
  /* Figma Alert --destructive */
  --doity-alert-fg: #e7000b;
  --doity-alert-muted: #e7000b;
}

.doity-alert--success {
  --doity-alert-fg: var(--doity-color-text-primary, #09090b);
}

.doity-alert--warning {
  --doity-alert-fg: var(--doity-color-text-primary, #09090b);
}

.doity-alert--info {
  --doity-alert-fg: var(--doity-color-text-primary, #09090b);
}

/* Entrada: sobe levemente + fade — alerta in-flow após uma ação */
.doity-alert-enter-active {
  transition:
    opacity 0.38s cubic-bezier(0.22, 1.15, 0.36, 1),
    transform 0.42s cubic-bezier(0.22, 1.15, 0.36, 1);
}

.doity-alert-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.24s cubic-bezier(0.4, 0, 0.7, 0.2);
}

.doity-alert-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.doity-alert-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.99);
}

@media (prefers-reduced-motion: reduce) {
  .doity-alert-enter-active,
  .doity-alert-leave-active {
    transition: none;
  }
}
</style>
