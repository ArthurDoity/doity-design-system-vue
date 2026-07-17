<script setup>
import { computed, useSlots } from 'vue'
import Badge from './Badge.vue'

const props = defineProps({
  /** primary | gray | error | warning | success */
  variant: { type: String, required: false, default: 'primary' },
  /** leading = badge à esquerda · trailing = badge à direita */
  badgePosition: { type: String, required: false, default: 'leading' },
  /** Texto do badge (ex.: “Sucesso”, “Erro”) */
  badge: { type: String, required: false, default: '' },
  /** Mensagem principal */
  message: { type: String, required: false, default: '' },
  size: { type: String, required: false, default: 'md' },
  /** Seta à direita do conteúdo (leading+arrow) ou no badge (trailing) */
  showArrow: { type: Boolean, required: false, default: false },
  href: { type: String, required: false },
  /**
   * Animação de entrada/saída (útil quando o banner surge após uma ação).
   * Desligue para banners estáticos/persistentes.
   */
  animated: { type: Boolean, required: false, default: true },
})

const emit = defineEmits(['click'])
/** Controle externo de visibilidade (v-model) — permite animar a saída */
const open = defineModel({ type: Boolean, default: true })
const slots = useSlots()

const isTrailing = computed(() => props.badgePosition === 'trailing')
const showBadge = computed(() => !!(props.badge || slots.badge))
const isInteractive = computed(() => Boolean(props.href || props.showArrow))
const transitionName = computed(() => (props.animated ? 'doity-alert-banner' : undefined))

/** primary→primary · gray→gray · error→error · warning→warning · success→success */
const badgeVariant = computed(() => props.variant)
/** Badge sm no banner md · md no banner lg */
const badgeSize = computed(() => (props.size === 'lg' ? 'md' : 'sm'))

const tag = computed(() => {
  if (props.href) return 'a'
  if (props.showArrow) return 'button'
  return 'div'
})

function onClick(event) {
  if (!isInteractive.value) return
  emit('click', event)
}
</script>

<template>
  <Transition :name="transitionName" :appear="props.animated">
    <component
      :is="tag"
      v-if="open"
      :href="props.href"
      :type="tag === 'button' ? 'button' : undefined"
      :class="[
        'doity-alert-banner',
        `doity-alert-banner--${props.variant}`,
        `doity-alert-banner--${props.size}`,
        {
          'doity-alert-banner--trailing': isTrailing,
          'doity-alert-banner--leading': !isTrailing,
          'doity-alert-banner--interactive': isInteractive,
        },
      ]"
      @click="onClick"
    >
      <span v-if="showBadge && !isTrailing" class="doity-alert-banner__badge">
        <Badge :variant="badgeVariant" :size="badgeSize">
          <slot name="badge">{{ props.badge }}</slot>
        </Badge>
      </span>

      <span class="doity-alert-banner__message">
        <slot>{{ props.message }}</slot>
        <svg
          v-if="props.showArrow && !isTrailing"
          class="doity-alert-banner__arrow"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3.33333 8H12.6667M8 12.6667L12.6667 8L8 3.33333"
            stroke="currentColor"
            stroke-width="1.3333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>

      <span v-if="showBadge && isTrailing" class="doity-alert-banner__badge">
        <Badge :variant="badgeVariant" :size="badgeSize">
          <slot name="badge">{{ props.badge }}</slot>
        </Badge>
        <svg
          v-if="props.showArrow"
          class="doity-alert-banner__arrow doity-alert-banner__arrow--sm"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3.33333 8H12.6667M8 12.6667L12.6667 8L8 3.33333"
            stroke="currentColor"
            stroke-width="1.3333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </component>
  </Transition>
</template>

<style scoped>
.doity-alert-banner {
  --doity-banner-bg: #fff1f1;
  --doity-banner-fg: var(--doity-color-brand-700, #c01048);
  --doity-banner-badge-border: var(--doity-color-brand-200, #ffc7c9);
  --doity-banner-badge-fg: var(--doity-color-brand-500, #ff2b34);
  --doity-banner-hover-bg: color-mix(in srgb, var(--doity-banner-bg) 88%, var(--doity-banner-fg) 12%);
  align-items: center;
  background: var(--doity-banner-bg);
  border: none;
  border-radius: 9999px;
  color: var(--doity-banner-fg);
  display: inline-flex;
  font-family: var(--doity-font-family-sans);
  gap: 8px;
  mix-blend-mode: multiply;
  padding: 4px 12px 4px 4px;
  text-align: left;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    transform 0.2s cubic-bezier(0.22, 1.15, 0.36, 1),
    box-shadow 0.2s ease;
}

.doity-alert-banner--trailing {
  padding: 4px 4px 4px 12px;
}

.doity-alert-banner--lg {
  gap: 12px;
}

.doity-alert-banner--lg.doity-alert-banner--leading {
  padding: 4px 10px 4px 4px;
}

.doity-alert-banner--lg.doity-alert-banner--trailing {
  padding: 4px 4px 4px 14px;
}

.doity-alert-banner--primary {
  --doity-banner-bg: var(--doity-color-background-brand, #fff1f1);
  --doity-banner-fg: var(--doity-color-brand-700, #c01048);
  --doity-banner-badge-border: var(--doity-color-brand-200, #ffc7c9);
  --doity-banner-badge-fg: var(--doity-color-brand-500, #ff2b34);
}

.doity-alert-banner--gray {
  --doity-banner-bg: var(--doity-color-background-secondary, #fafafa);
  --doity-banner-fg: var(--doity-color-text-secondary, #737373);
  --doity-banner-badge-border: var(--doity-color-border-default, #e5e5e5);
  --doity-banner-badge-fg: var(--doity-color-text-secondary, #737373);
}

.doity-alert-banner--error {
  --doity-banner-bg: var(--doity-color-error-50, #fef3f2);
  --doity-banner-fg: var(--doity-color-error-700, #b42318);
  --doity-banner-badge-border: #fecdca;
  --doity-banner-badge-fg: var(--doity-color-error-700, #b42318);
}

.doity-alert-banner--warning {
  --doity-banner-bg: var(--doity-color-warning-50, #fffaeb);
  --doity-banner-fg: var(--doity-color-warning-600, #dc6803);
  --doity-banner-badge-border: #fedf89;
  --doity-banner-badge-fg: var(--doity-color-warning-600, #dc6803);
}

.doity-alert-banner--success {
  --doity-banner-bg: var(--doity-color-success-50, #ecfdf3);
  --doity-banner-fg: var(--doity-color-success-700, #039855);
  --doity-banner-badge-border: #a6f4c5;
  --doity-banner-badge-fg: var(--doity-color-success-700, #039855);
}

.doity-alert-banner__badge {
  align-items: center;
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-banner-badge-border);
  border-radius: 9999px;
  color: var(--doity-banner-badge-fg);
  display: inline-flex;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: var(--doity-font-weight-medium, 500);
  gap: 4px;
  justify-content: center;
  line-height: 16px;
  padding: 1px 8px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
  white-space: nowrap;
}

.doity-alert-banner--lg .doity-alert-banner__badge {
  font-size: 14px;
  line-height: 18px;
  padding: 2px 10px;
}

/* Badge interno herda o visual do banner (fundo branco + borda colorida) */
.doity-alert-banner__badge :deep(.doity-badge) {
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: inherit;
  padding: 0;
}

.doity-alert-banner__badge :deep(.doity-badge__label) {
  line-height: inherit;
  overflow: visible;
}

.doity-alert-banner--trailing.doity-alert-banner--md .doity-alert-banner__badge:has(.doity-alert-banner__arrow) {
  padding-right: 6px;
}

.doity-alert-banner--trailing.doity-alert-banner--lg .doity-alert-banner__badge:has(.doity-alert-banner__arrow) {
  padding-right: 8px;
}

.doity-alert-banner__message {
  align-items: center;
  color: var(--doity-banner-fg);
  display: inline-flex;
  font-size: 12px;
  font-weight: var(--doity-font-weight-medium, 500);
  gap: 4px;
  line-height: 18px;
  min-width: 0;
  white-space: nowrap;
}

.doity-alert-banner--lg .doity-alert-banner__message {
  font-size: 14px;
  line-height: 20px;
}

.doity-alert-banner__arrow {
  display: block;
  flex-shrink: 0;
  height: 16px;
  transition: transform 0.22s cubic-bezier(0.22, 1.15, 0.36, 1);
  width: 16px;
}

.doity-alert-banner__arrow--sm {
  height: 12px;
  width: 12px;
}

/* Acionáveis (href ou seta): hover */
.doity-alert-banner--interactive {
  cursor: pointer;
}

.doity-alert-banner--interactive:hover {
  background: var(--doity-banner-hover-bg);
}

.doity-alert-banner--interactive:hover .doity-alert-banner__arrow {
  transform: translateX(3px);
}

.doity-alert-banner--interactive:hover .doity-alert-banner__badge {
  border-color: color-mix(in srgb, var(--doity-banner-badge-border) 55%, var(--doity-banner-badge-fg) 45%);
  box-shadow: 0 1px 2px rgb(0 0 0 / 6%);
}

.doity-alert-banner--interactive:active {
  transform: scale(0.985);
}

.doity-alert-banner--interactive:focus-visible {
  outline: 2px solid var(--doity-banner-badge-fg);
  outline-offset: 2px;
}

/* Entrada/saída — mesmo espírito do Alert, um pouco mais leve (pill) */
.doity-alert-banner-enter-active {
  transition:
    opacity 0.34s cubic-bezier(0.22, 1.15, 0.36, 1),
    transform 0.38s cubic-bezier(0.22, 1.15, 0.36, 1);
}

.doity-alert-banner-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.22s cubic-bezier(0.4, 0, 0.7, 0.2);
}

.doity-alert-banner-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}

.doity-alert-banner-leave-to {
  opacity: 0;
  transform: translateY(-3px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .doity-alert-banner,
  .doity-alert-banner__badge,
  .doity-alert-banner__arrow,
  .doity-alert-banner-enter-active,
  .doity-alert-banner-leave-active {
    transition: none;
  }

  .doity-alert-banner--interactive:hover .doity-alert-banner__arrow {
    transform: none;
  }

  .doity-alert-banner--interactive:active {
    transform: none;
  }
}
</style>
