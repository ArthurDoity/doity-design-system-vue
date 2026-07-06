import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Modal from '../src/runtime/components/Modal.vue'
import Button from '../src/runtime/components/Button.vue'
import { doityStoryMeta } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Modal', Modal),
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button hierarchy="primary" @click="open = true">Abrir modal</Button>
        <Modal v-model:open="open" title="Modal de exemplo" description="Conteúdo do modal com overlay." featured-icon>
          <p style="margin:0;color:#737373">Slot para conteúdo customizado.</p>
        </Modal>
      </div>
    `,
  }),
}

export const Fullscreen: Story = {
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button hierarchy="outline" @click="open = true">Fullscreen</Button>
        <Modal v-model:open="open" title="Modal fullscreen" fullscreen>
          <p>Conteúdo em tela cheia.</p>
        </Modal>
      </div>
    `,
  }),
}
