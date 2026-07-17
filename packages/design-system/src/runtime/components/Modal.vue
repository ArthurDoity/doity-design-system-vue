<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  open: { type: Boolean, required: false, default: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  /**
   * sm ≈ 350 · md ≈ 408 · lg ≈ 512 · xl ≈ 544
   */
  size: { type: String, required: false, default: 'md' },
  /**
   * default — título à esquerda
   * centered — ícone + texto centralizados (confirmação)
   * horizontal — ícone à esquerda do conteúdo (layout 544)
   */
  layout: { type: String, required: false, default: 'default' },
  /** Exibe featured icon (slot featured-icon) */
  featuredIcon: { type: Boolean, required: false, default: false },
  /** Botão X no canto */
  showClose: { type: Boolean, required: false, default: true },
  /** Fecha ao clicar no backdrop */
  closeOnBackdrop: { type: Boolean, required: false, default: true },
  /** Ações do footer: end | stretch (preenche) | stack (empilha) */
  actions: { type: String, required: false, default: 'end' },
  fullscreen: { type: Boolean, required: false, default: false },
  /** ARIA role do diálogo — dialog (padrão) ou alertdialog */
  role: { type: String, required: false, default: 'dialog' },
})

const emit = defineEmits(['update:open', 'close'])
const titleId = `doity-modal-title-${useId()}`

const isOpen = computed({
  get: () => props.open,
  set: (v) => emit('update:open', v),
})

const sizeClass = computed(() => {
  if (props.fullscreen) return 'doity-modal--fullscreen'
  const map = { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }
  return `doity-modal--${map[props.size] || 'md'}`
})

function close() {
  isOpen.value = false
  emit('close')
}

function onBackdrop(e) {
  if (!props.closeOnBackdrop) return
  if (e.target === e.currentTarget) close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="doity-modal">
      <div
        v-if="isOpen"
        class="doity-modal__backdrop"
        :class="{ 'doity-modal__backdrop--fullscreen': fullscreen }"
        @click="onBackdrop"
      >
        <div
          :class="[
            'doity-modal',
            sizeClass,
            `doity-modal--layout-${layout}`,
            `doity-modal--actions-${actions}`,
            { 'doity-modal--has-icon': featuredIcon || $slots['featured-icon'] },
            { 'doity-modal--show-close': showClose },
          ]"
          :role="role"
          aria-modal="true"
          :aria-labelledby="title ? titleId : undefined"
          :aria-describedby="description ? `${titleId}-desc` : undefined"
        >
          <button
            v-if="showClose"
            type="button"
            class="doity-modal__close"
            aria-label="Fechar"
            @click="close"
          >
            <slot name="close-icon">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </slot>
          </button>

          <div class="doity-modal__main">
            <div
              v-if="featuredIcon || $slots['featured-icon']"
              class="doity-modal__featured-icon"
              aria-hidden="true"
            >
              <slot name="featured-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </slot>
            </div>

            <div class="doity-modal__content">
              <header v-if="title || description || $slots.header" class="doity-modal__header">
                <slot name="header">
                  <h2 v-if="title" :id="titleId" class="doity-modal__title">
                    {{ title }}
                  </h2>
                  <p
                    v-if="description"
                    :id="`${titleId}-desc`"
                    class="doity-modal__description"
                  >
                    {{ description }}
                  </p>
                </slot>
              </header>

              <div v-if="$slots.default" class="doity-modal__body">
                <slot />
              </div>
            </div>
          </div>

          <footer
            v-if="$slots.footer"
            class="doity-modal__footer"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.doity-modal__backdrop {
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: var(--doity-spacing-4, 16px);
  position: fixed;
  z-index: 9997;
}

.doity-modal__backdrop--fullscreen {
  padding: 0;
}

/* Desktop: p-24, radius 12, gap content→actions 32, shadow-xl */
.doity-modal {
  --doity-modal-pad: 24px;
  --doity-modal-gap: 32px;
  --doity-modal-content-gap: 20px;
  background: var(--doity-color-background-primary, #fff);
  border-radius: var(--doity-radius-xl, 12px);
  box-shadow: var(--doity-shadow-xl);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  gap: var(--doity-modal-gap);
  max-height: min(85vh, 100%);
  padding: var(--doity-modal-pad);
  position: relative;
  transform-origin: center bottom;
  width: 100%;
  will-change: transform, opacity;
}

.doity-modal--sm {
  max-width: 350px;
}

.doity-modal--md {
  max-width: 408px;
}

.doity-modal--lg {
  max-width: 512px;
}

.doity-modal--xl {
  max-width: 544px;
}

/* Fullscreen: mesmos tokens internos; conteúdo cresce e footer cola embaixo */
.doity-modal--fullscreen {
  border-radius: 0;
  box-shadow: none;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  min-height: 100%;
  width: 100%;
}

.doity-modal--fullscreen .doity-modal__main {
  flex: 1 1 auto;
  min-height: 0;
}

.doity-modal--fullscreen .doity-modal__content {
  flex: 1 1 auto;
  min-height: 0;
}

.doity-modal--fullscreen .doity-modal__body {
  flex: 1 1 auto;
}

.doity-modal--fullscreen .doity-modal__footer {
  border-top: 1px solid var(--doity-color-border-default, #e5e5e5);
  margin-left: calc(-1 * var(--doity-modal-pad));
  margin-right: calc(-1 * var(--doity-modal-pad));
  margin-bottom: calc(-1 * var(--doity-modal-pad));
  padding: var(--doity-spacing-4, 16px) var(--doity-modal-pad);
}

.doity-modal--fullscreen .doity-modal__close {
  right: 16px;
  top: 16px;
}

.doity-modal__close {
  align-items: center;
  background: none;
  border: none;
  color: var(--doity-color-text-tertiary, #737373);
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  justify-content: center;
  padding: 0;
  position: absolute;
  right: 12px;
  top: 12px;
  width: 32px;
  z-index: 1;
}

.doity-modal__close:hover {
  color: var(--doity-color-text-primary, #0a0a0a);
}

.doity-modal__close:focus-visible {
  outline: 2px solid var(--doity-color-border-brand, #ff2b34);
  outline-offset: 2px;
}

.doity-modal__main {
  display: flex;
  flex-direction: column;
  gap: var(--doity-modal-content-gap);
  min-width: 0;
  width: 100%;
}

.doity-modal--layout-horizontal .doity-modal__main {
  align-items: flex-start;
  flex-direction: row;
  gap: var(--doity-spacing-4, 16px);
}

.doity-modal--layout-centered .doity-modal__main {
  align-items: center;
  text-align: center;
}

.doity-modal__featured-icon {
  align-items: center;
  background: var(--doity-color-brand-50, #fff1f2);
  border: 8px solid var(--doity-color-brand-50, #fff1f2);
  border-radius: 28px;
  box-sizing: content-box;
  color: var(--doity-color-brand-500, #ff2b34);
  display: inline-flex;
  flex-shrink: 0;
  height: 24px;
  justify-content: center;
  width: 24px;
}

.doity-modal__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--doity-modal-content-gap);
  min-width: 0;
  width: 100%;
}

.doity-modal__header {
  display: flex;
  flex-direction: column;
  gap: var(--doity-spacing-2, 8px);
  width: 100%;
}

.doity-modal--layout-centered .doity-modal__header {
  align-items: center;
  text-align: center;
}

.doity-modal__title {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-size: var(--doity-font-size-lg, 18px);
  font-weight: var(--doity-font-weight-semibold, 600);
  line-height: var(--doity-font-lineHeight-lg, 28px);
  margin: 0;
  padding-right: 24px;
}

.doity-modal--layout-centered .doity-modal__title,
.doity-modal:not(.doity-modal--show-close) .doity-modal__title {
  padding-right: 0;
}

.doity-modal__description {
  color: var(--doity-color-text-secondary, #737373);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: var(--doity-font-lineHeight-sm, 20px);
  margin: 0;
}

.doity-modal__body {
  display: flex;
  flex-direction: column;
  gap: var(--doity-spacing-3, 12px);
  min-height: 0;
  overflow-y: auto;
  width: 100%;
}

.doity-modal__footer {
  display: flex;
  flex-shrink: 0;
  gap: 12px;
  width: 100%;
}

.doity-modal--actions-end .doity-modal__footer {
  justify-content: flex-end;
}

.doity-modal--actions-stretch .doity-modal__footer > :deep(*) {
  flex: 1 1 0;
}

.doity-modal--actions-stack .doity-modal__footer {
  flex-direction: column;
}

.doity-modal--actions-stack .doity-modal__footer > :deep(*) {
  width: 100%;
}

/* Mobile */
@media (max-width: 480px) {
  .doity-modal:not(.doity-modal--fullscreen) {
    --doity-modal-pad: 16px 16px 20px;
    --doity-modal-gap: 24px;
    --doity-modal-content-gap: 16px;
    max-width: min(350px, 100%);
  }

  .doity-modal--actions-end .doity-modal__footer,
  .doity-modal--actions-stretch .doity-modal__footer {
    flex-direction: column;
  }

  .doity-modal--actions-end .doity-modal__footer > :deep(*),
  .doity-modal--actions-stretch .doity-modal__footer > :deep(*) {
    flex: none;
    width: 100%;
  }

  .doity-modal--layout-horizontal .doity-modal__main {
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  .doity-modal--layout-horizontal .doity-modal__header {
    align-items: center;
    text-align: center;
  }
}

/* Animação — igual Alert Dialog (sobe + fade) */
.doity-modal-enter-active {
  transition: opacity 0.32s ease;
}

.doity-modal-leave-active {
  transition: opacity 0.22s ease;
}

.doity-modal-enter-active .doity-modal {
  transition:
    opacity 0.42s cubic-bezier(0.22, 1.2, 0.36, 1),
    transform 0.42s cubic-bezier(0.22, 1.2, 0.36, 1);
}

.doity-modal-leave-active .doity-modal {
  transition:
    opacity 0.2s ease,
    transform 0.22s cubic-bezier(0.4, 0, 0.7, 0.2);
}

.doity-modal-enter-from {
  opacity: 0;
}

.doity-modal-enter-from .doity-modal {
  opacity: 0;
  transform: translateY(28px) scale(0.98);
}

.doity-modal-enter-to,
.doity-modal-leave-from {
  opacity: 1;
}

.doity-modal-enter-to .doity-modal,
.doity-modal-leave-from .doity-modal {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.doity-modal-leave-to {
  opacity: 0;
}

.doity-modal-leave-to .doity-modal {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .doity-modal-enter-active,
  .doity-modal-leave-active,
  .doity-modal-enter-active .doity-modal,
  .doity-modal-leave-active .doity-modal {
    transition: none;
  }
}
</style>
