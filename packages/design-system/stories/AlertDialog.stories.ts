import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import AlertDialog from '../src/runtime/components/AlertDialog.vue'
import Button from '../src/runtime/components/Button.vue'
import { doityStoryMeta } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('AlertDialog', AlertDialog, {
  title: 'Components/Alert Dialog',
}),
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: { AlertDialog, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button hierarchy="primary" @click="open = true">Abrir diálogo</Button>
        <AlertDialog
          v-model:open="open"
          title="Confirmar ação"
          description="Deseja continuar com esta operação?"
          confirm-label="Continuar"
        />
      </div>
    `,
  }),
}

export const Destructive: Story = {
  render: () => ({
    components: { AlertDialog, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button hierarchy="outline" destructive @click="open = true">Excluir item</Button>
        <AlertDialog
          v-model:open="open"
          title="Excluir item?"
          description="Esta ação não pode ser desfeita."
          confirm-label="Excluir"
          destructive
        />
      </div>
    `,
  }),
}
