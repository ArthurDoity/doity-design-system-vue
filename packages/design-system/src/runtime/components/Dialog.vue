<script setup>
import { computed } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  open: { type: Boolean, required: false, default: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  size: { type: String, required: false, default: "md" },
  cancelLabel: { type: String, required: false, default: "Cancelar" },
  saveLabel: { type: String, required: false, default: "Salvar" }
});
const emit = defineEmits(["update:open", "close", "cancel", "save"]);
const isOpen = computed({
  get: () => props.open,
  set: (v) => emit("update:open", v)
});
function close() {
  isOpen.value = false;
  emit("close");
}
function onCancel() {
  close();
  emit("cancel");
}
function onSave() {
  emit("save");
}
function onBackdrop(e) {
  if (e.target === e.currentTarget) close();
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="doity-dialog__backdrop" @click="onBackdrop">
      <div :class="['doity-dialog', `doity-dialog--${props.size}`]" role="dialog">
        <header class="doity-dialog__header">
          <slot name="header">
            <h2 v-if="props.title" class="doity-dialog__title">{{ props.title }}</h2>
          </slot>
          <button type="button" class="doity-dialog__close" @click="close">×</button>
        </header>

        <div class="doity-dialog__body">
          <p v-if="props.description" class="doity-dialog__description">{{ props.description }}</p>
          <slot />
        </div>

        <footer class="doity-dialog__footer">
          <slot name="footer">
            <Button hierarchy="secondary" size="md" @click="onCancel">
              {{ props.cancelLabel }}
            </Button>
            <Button hierarchy="primary" size="md" @click="onSave">
              {{ props.saveLabel }}
            </Button>
          </slot>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.doity-dialog__backdrop{align-items:center;background:rgba(0,0,0,.3);display:flex;inset:0;justify-content:center;padding:var(--doity-spacing-4);position:fixed;z-index:9998}.doity-dialog{background:var(--doity-color-background-primary);border-radius:var(--doity-radius-lg);box-shadow:var(--doity-shadow-lg);display:flex;flex-direction:column;font-family:var(--doity-font-family-sans);gap:var(--doity-spacing-4);max-height:90vh;padding:var(--doity-spacing-6);width:100%}.doity-dialog--sm{max-width:400px}.doity-dialog--md{max-width:560px}.doity-dialog--lg{max-width:720px}.doity-dialog__header{align-items:center;display:flex;justify-content:space-between}.doity-dialog__title{font-size:var(--doity-font-size-lg);font-weight:var(--doity-font-weight-semibold);line-height:var(--doity-font-lineHeight-xl);margin:0}.doity-dialog__description{color:var(--doity-color-text-secondary);font-size:var(--doity-font-size-sm);line-height:var(--doity-font-lineHeight-sm);margin:0 0 var(--doity-spacing-2)}.doity-dialog__close{background:none;border:none;color:var(--doity-color-text-tertiary);cursor:pointer;font-size:24px;line-height:1;padding:0}.doity-dialog__close:hover{color:var(--doity-color-text-primary)}.doity-dialog__body{flex:1;overflow-y:auto}.doity-dialog__footer{display:flex;gap:var(--doity-spacing-3);justify-content:flex-end}
</style>
