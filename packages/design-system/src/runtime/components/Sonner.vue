<script setup>
import { useDoityToast } from '../composables/useDoityToast'

const { toasts, dismiss } = useDoityToast()
</script>

<template>
  <Teleport to="body">
    <div class="doity-sonner">
      <TransitionGroup name="doity-toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="['doity-sonner__toast', `doity-sonner__toast--${toast.variant ?? 'default'}`]"
          role="status"
        >
          <span class="doity-sonner__indicator" />
          <div class="doity-sonner__content">
            <p v-if="toast.title" class="doity-sonner__title">{{ toast.title }}</p>
            <p v-if="toast.description" class="doity-sonner__description">{{ toast.description }}</p>
          </div>
          <button type="button" class="doity-sonner__dismiss" @click="dismiss(toast.id)">×</button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.doity-sonner{bottom:var(--doity-spacing-6);display:flex;flex-direction:column;gap:var(--doity-spacing-2);max-width:356px;pointer-events:none;position:fixed;right:var(--doity-spacing-6);width:100%;z-index:10000}.doity-sonner__toast{--doity-toast-accent:var(--doity-color-border-strong);align-items:flex-start;background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-default);border-left:4px solid var(--doity-toast-accent);border-radius:var(--doity-radius-lg);box-shadow:var(--doity-shadow-lg);display:flex;font-family:var(--doity-font-family-sans);gap:var(--doity-spacing-3);padding:var(--doity-spacing-4);pointer-events:auto}.doity-sonner__indicator{background:var(--doity-toast-accent);border-radius:var(--doity-radius-full);flex-shrink:0;height:10px;margin-top:4px;width:10px}.doity-sonner__content{flex:1;min-width:0}.doity-sonner__title{font-size:var(--doity-font-size-sm);font-weight:var(--doity-font-weight-semibold);margin:0 0 var(--doity-spacing-1)}.doity-sonner__description{color:var(--doity-color-text-secondary);font-size:var(--doity-font-size-sm);margin:0}.doity-sonner__dismiss{background:none;border:none;color:var(--doity-color-text-tertiary);cursor:pointer;font-size:18px;line-height:1;margin-left:auto;padding:0}.doity-sonner__toast--default{--doity-toast-accent:var(--doity-color-border-strong)}.doity-sonner__toast--success{--doity-toast-accent:var(--doity-color-success-500)}.doity-sonner__toast--info{--doity-toast-accent:var(--doity-color-brand-500)}.doity-sonner__toast--warning{--doity-toast-accent:var(--doity-color-warning-500)}.doity-sonner__toast--error{--doity-toast-accent:var(--doity-color-error-500)}.doity-toast-enter-active,.doity-toast-leave-active{transition:all .3s ease}.doity-toast-enter-from,.doity-toast-leave-to{opacity:0;transform:translateX(100%)}
</style>
