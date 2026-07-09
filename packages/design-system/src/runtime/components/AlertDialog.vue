<script setup>
import { computed } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  open: { type: Boolean, required: false, default: false },
  title: { type: String, required: true },
  description: { type: String, required: false },
  cancelLabel: { type: String, required: false, default: "Cancelar" },
  confirmLabel: { type: String, required: false, default: "Continuar" },
  destructive: { type: Boolean, required: false, default: false }
});
const emit = defineEmits(["update:open", "confirm", "cancel"]);
const isOpen = computed({
  get: () => props.open,
  set: (v) => emit("update:open", v)
});
function onCancel() {
  isOpen.value = false;
  emit("cancel");
}
function onConfirm() {
  isOpen.value = false;
  emit("confirm");
}
function onBackdrop(e) {
  if (e.target === e.currentTarget) onCancel();
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="doity-alert-dialog__backdrop" @click="onBackdrop">
      <div class="doity-alert-dialog" role="alertdialog">
        <h2 class="doity-alert-dialog__title">{{ props.title }}</h2>
        <p v-if="props.description" class="doity-alert-dialog__description">{{ props.description }}</p>
        <div class="doity-alert-dialog__actions">
          <Button hierarchy="outline" size="md" @click="onCancel">{{ props.cancelLabel }}</Button>
          <Button hierarchy="primary" size="md" :destructive="props.destructive" @click="onConfirm">{{ props.confirmLabel }}</Button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.doity-alert-dialog__backdrop{align-items:center;background:rgba(0,0,0,.3);display:flex;inset:0;justify-content:center;padding:var(--doity-spacing-4);position:fixed;z-index:9999}.doity-alert-dialog{background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-default);border-radius:var(--doity-radius-lg);box-shadow:var(--doity-shadow-lg);font-family:var(--doity-font-family-sans);max-width:512px;padding:var(--doity-spacing-6);width:100%}.doity-alert-dialog__title{color:var(--doity-color-text-primary);font-size:var(--doity-font-size-lg);font-weight:var(--doity-font-weight-semibold);line-height:var(--doity-font-lineHeight-xl);margin:0 0 var(--doity-spacing-2)}.doity-alert-dialog__description{color:var(--doity-color-text-secondary);font-size:var(--doity-font-size-sm);line-height:var(--doity-font-lineHeight-sm);margin:0 0 var(--doity-spacing-6)}.doity-alert-dialog__actions{display:flex;gap:var(--doity-spacing-3);justify-content:flex-end}
</style>
