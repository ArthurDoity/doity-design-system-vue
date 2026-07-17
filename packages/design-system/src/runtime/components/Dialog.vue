<script setup>
import { computed } from 'vue'
import Modal from './Modal.vue'
import Button from './Button.vue'

const props = defineProps({
  open: { type: Boolean, required: false, default: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  /** sm ≈ 350 · md ≈ 408 · lg ≈ 512 (mesmo do Modal) */
  size: { type: String, required: false, default: 'md' },
  cancelLabel: { type: String, required: false, default: 'Cancelar' },
  saveLabel: { type: String, required: false, default: 'Salvar' },
  showClose: { type: Boolean, required: false, default: true },
  closeOnBackdrop: { type: Boolean, required: false, default: true },
})

const emit = defineEmits(['update:open', 'close', 'cancel', 'save'])

const isOpen = computed({
  get: () => props.open,
  set: (v) => emit('update:open', v),
})

const modalSize = computed(() => {
  const map = { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }
  return map[props.size] || 'md'
})

function onClose() {
  emit('close')
}

function onCancel() {
  isOpen.value = false
  emit('cancel')
  emit('close')
}

function onSave() {
  emit('save')
}
</script>

<template>
  <Modal
    v-model:open="isOpen"
    :title="title"
    :description="description"
    :size="modalSize"
    :show-close="showClose"
    :close-on-backdrop="closeOnBackdrop"
    actions="end"
    @close="onClose"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>

    <template #footer>
      <slot name="footer">
        <Button hierarchy="outline" size="md" @click="onCancel">
          {{ cancelLabel }}
        </Button>
        <Button hierarchy="primary" size="md" @click="onSave">
          {{ saveLabel }}
        </Button>
      </slot>
    </template>
  </Modal>
</template>
