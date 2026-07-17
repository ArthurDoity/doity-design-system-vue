<script setup>
import { computed } from 'vue'
import Modal from './Modal.vue'
import Button from './Button.vue'

const props = defineProps({
  open: { type: Boolean, required: false, default: false },
  title: { type: String, required: true },
  description: { type: String, required: false },
  cancelLabel: { type: String, required: false, default: 'Cancelar' },
  confirmLabel: { type: String, required: false, default: 'Continuar' },
  destructive: { type: Boolean, required: false, default: false },
})

const emit = defineEmits(['update:open', 'confirm', 'cancel'])

const isOpen = computed({
  get: () => props.open,
  set: (v) => emit('update:open', v),
})

/** Evita emitir "cancel" duas vezes quando o fechamento vem de um botão */
let handled = false

function onCancel() {
  handled = true
  emit('cancel')
  isOpen.value = false
}

function onConfirm() {
  handled = true
  emit('confirm')
  isOpen.value = false
}

/** Fechamento via backdrop conta como cancelamento */
function onModalClose() {
  if (!handled) emit('cancel')
  handled = false
}
</script>

<template>
  <Modal
    v-model:open="isOpen"
    role="alertdialog"
    :title="title"
    :description="description"
    size="lg"
    :show-close="false"
    actions="end"
    @close="onModalClose"
  >
    <!-- Só encaminha body se houver conteúdo — evita gap vazio entre texto e botões -->
    <template v-if="$slots.default" #default>
      <slot />
    </template>

    <template #footer>
      <Button hierarchy="outline" size="md" @click="onCancel">
        {{ cancelLabel }}
      </Button>
      <Button
        hierarchy="primary"
        size="md"
        :destructive="destructive"
        @click="onConfirm"
      >
        {{ confirmLabel }}
      </Button>
    </template>
  </Modal>
</template>
