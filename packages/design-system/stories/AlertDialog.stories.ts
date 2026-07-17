import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import AlertDialog from '../src/runtime/components/AlertDialog.vue'
import Button from '../src/runtime/components/Button.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('AlertDialog', AlertDialog),
  title: 'Components/Feedback/Alert Dialog',
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityButton hierarchy="primary" @click="open = true">Abrir diálogo</DoityButton>
<DoityAlertDialog
  v-model:open="open"
  title="Você tem certeza absoluta?"
  description="Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados de nossos servidores."
  cancel-label="Cancelar"
  confirm-label="Continuar"
/>`),
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
          title="Você tem certeza absoluta?"
          description="Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados de nossos servidores."
          cancel-label="Cancelar"
          confirm-label="Continuar"
        />
      </div>
    `,
  }),
}

export const Destructive: Story = {
  parameters: storyUsage(`<DoityButton hierarchy="outline" destructive @click="open = true">Excluir conta</DoityButton>
<DoityAlertDialog
  v-model:open="open"
  title="Você tem certeza absoluta?"
  description="Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados de nossos servidores."
  confirm-label="Continuar"
  destructive
/>`),
  render: () => ({
    components: { AlertDialog, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button hierarchy="outline" destructive @click="open = true">Excluir conta</Button>
        <AlertDialog
          v-model:open="open"
          title="Você tem certeza absoluta?"
          description="Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados de nossos servidores."
          confirm-label="Continuar"
          destructive
        />
      </div>
    `,
  }),
}
