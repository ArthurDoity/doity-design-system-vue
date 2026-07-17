<script setup>
import { useDoityToast } from '../composables/useDoityToast'
import Spinner from './Spinner.vue'
import Button from './Button.vue'

const { toasts, dismiss } = useDoityToast()

const ICON_VARIANTS = new Set(['success', 'info', 'warning', 'error', 'loading'])

function hasIcon(variant) {
  return ICON_VARIANTS.has(variant ?? 'default')
}

function message(toast) {
  // Variantes com ícone: uma linha (description ou title)
  if (hasIcon(toast.variant) && !toast.action) {
    return toast.description || toast.title || ''
  }
  return toast.title || toast.description || ''
}

function showDescription(toast) {
  // Título + description (variant com action ou default rico)
  return Boolean(toast.title && toast.description && (toast.action || toast.variant === 'default'))
}

function onAction(toast) {
  toast.action?.onClick?.()
  dismiss(toast.id)
}
</script>

<template>
  <Teleport to="body">
    <div class="doity-sonner" aria-live="polite" aria-relevant="additions">
      <TransitionGroup name="doity-toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'doity-sonner__toast',
            `doity-sonner__toast--${toast.variant ?? 'default'}`,
            { 'doity-sonner__toast--with-action': !!toast.action },
          ]"
          role="status"
        >
          <!-- Ícones Figma (lucide) -->
          <span
            v-if="hasIcon(toast.variant)"
            class="doity-sonner__icon"
            aria-hidden="true"
          >
            <Spinner
              v-if="toast.variant === 'loading'"
              type="circle"
              size="sm"
              color="default"
              label=""
            />
            <svg
              v-else-if="toast.variant === 'success'"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6 8L7.33333 9.33333L10 6.66667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-else-if="toast.variant === 'info'"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 10.6667V8M8 5.33333H8.00667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-else-if="toast.variant === 'warning'"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 6V8.66667M8 11.3333H8.00667M14.4866 12L9.15329 2.66665C9.037 2.46146 8.86836 2.29078 8.66457 2.17203C8.46078 2.05329 8.22915 1.99072 7.99329 1.99072C7.75743 1.99072 7.52579 2.05329 7.322 2.17203C7.11822 2.29078 6.94958 2.46146 6.83329 2.66665L1.49995 12C1.38241 12.2036 1.32077 12.4346 1.32129 12.6697C1.32181 12.9047 1.38447 13.1355 1.50292 13.3385C1.62136 13.5416 1.79138 13.7097 1.99575 13.8259C2.20011 13.942 2.43156 14.0021 2.66662 14H13.3333C13.5672 13.9997 13.797 13.938 13.9995 13.8208C14.202 13.7037 14.3701 13.5354 14.487 13.3327C14.6038 13.1301 14.6653 12.9002 14.6653 12.6663C14.6652 12.4324 14.6036 12.2026 14.4866 12Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              v-else-if="toast.variant === 'error'"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10 6L6 10M6 6L10 10M5.24 1.33333H10.76L14.6667 5.24V10.76L10.76 14.6667H5.24L1.33333 10.76V5.24L5.24 1.33333Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>

          <div class="doity-sonner__body">
            <template v-if="showDescription(toast)">
              <p class="doity-sonner__title">{{ toast.title }}</p>
              <p class="doity-sonner__description">{{ toast.description }}</p>
            </template>
            <p v-else class="doity-sonner__message">{{ message(toast) }}</p>
          </div>

          <div v-if="toast.action" class="doity-sonner__action-wrap">
            <Button
              hierarchy="primary"
              size="sm"
              class="doity-sonner__action"
              @click="onAction(toast)"
            >
              {{ toast.action.label }}
            </Button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.doity-sonner {
  bottom: var(--doity-spacing-6, 24px);
  display: flex;
  flex-direction: column;
  gap: var(--doity-spacing-2, 8px);
  max-width: 356px;
  pointer-events: none;
  position: fixed;
  right: var(--doity-spacing-6, 24px);
  width: 100%;
  z-index: 10000;
}

/* Figma Sonner: white, border #e5e5e5, radius 10, p-16, gap 6, shadow-lg */
.doity-sonner__toast {
  align-items: center;
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e5e5e5);
  border-radius: var(--doity-radius-lg, 10px);
  box-shadow: var(--doity-shadow-lg);
  display: flex;
  font-family: var(--doity-font-family-sans);
  gap: 6px;
  max-width: 356px;
  min-width: min(356px, 100%);
  padding: var(--doity-spacing-4, 16px);
  pointer-events: auto;
  transform-origin: right bottom;
  width: 100%;
  will-change: transform, opacity;
}

.doity-sonner__icon {
  color: var(--doity-color-text-primary, #0a0a0a);
  display: block;
  flex-shrink: 0;
  height: 16px;
  width: 16px;
}

.doity-sonner__icon svg {
  display: block;
  height: 100%;
  overflow: visible;
  width: 100%;
}

.doity-sonner__body {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.doity-sonner__title {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: var(--doity-font-lineHeight-sm, 20px);
  margin: 0;
}

.doity-sonner__description {
  color: var(--doity-color-text-secondary, #737373);
  font-size: var(--doity-font-size-xs, 12px);
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: var(--doity-font-lineHeight-xs, 16px);
  margin: 0;
}

.doity-sonner__message {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: var(--doity-font-lineHeight-sm, 20px);
  margin: 0;
}

.doity-sonner__action-wrap {
  flex-shrink: 0;
  margin-left: 18px;
  padding-left: 0;
}

/* Reusa Button, mas força o visual escuro/compacto (h-24) do toast do Figma */
.doity-sonner__action.doity-btn {
  background: var(--doity-color-gray-900, #171717);
  border-color: var(--doity-color-gray-900, #171717);
  border-radius: var(--doity-radius-lg, 10px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  color: #fafafa;
  font-size: var(--doity-font-size-xs, 12px);
  height: 24px;
  line-height: 16px;
  min-height: 24px;
  padding: 0 8px;
}

.doity-sonner__action.doity-btn:hover:not(:disabled),
.doity-sonner__action.doity-btn:active:not(:disabled) {
  background: #000;
  border-color: #000;
  color: #fafafa;
}

/* Enter: suave + elástico leve */
.doity-toast-enter-active {
  transition:
    opacity 0.4s cubic-bezier(0.22, 1.2, 0.36, 1),
    transform 0.45s cubic-bezier(0.22, 1.2, 0.36, 1);
}

.doity-toast-leave-active {
  position: absolute;
  right: 0;
  transition:
    opacity 0.22s ease,
    transform 0.28s cubic-bezier(0.4, 0, 0.7, 0.2);
  width: 100%;
}

.doity-toast-move {
  transition: transform 0.35s cubic-bezier(0.22, 1.15, 0.36, 1);
}

.doity-toast-enter-from {
  opacity: 0;
  transform: translateY(16px) translateX(12px) scale(0.97);
}

.doity-toast-leave-to {
  opacity: 0;
  transform: translateY(8px) translateX(16px) scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .doity-toast-enter-active,
  .doity-toast-leave-active,
  .doity-toast-move {
    animation: none;
    transition: none;
  }
}
</style>
