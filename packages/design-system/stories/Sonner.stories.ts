import type { Meta, StoryObj } from '@storybook/vue3'
import Sonner from '../src/runtime/components/Sonner.vue'
import Button from '../src/runtime/components/Button.vue'
import { useDoityToast } from '../src/runtime/composables/useDoityToast'
import { doityStoryMeta } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Sonner', Sonner),
} satisfies Meta

export default meta
type Story = StoryObj

export const AllVariants: Story = {
  render: () => ({
    components: { Sonner, Button },
    setup() {
      const { success, error, warning, info } = useDoityToast()
      return { success, error, warning, info }
    },
    template: `
      <div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          <Button size="sm" @click="success('Salvo com sucesso!')">Success</Button>
          <Button size="sm" hierarchy="outline" @click="error('Erro ao salvar')">Error</Button>
          <Button size="sm" hierarchy="outline" @click="warning('Verifique os dados')">Warning</Button>
          <Button size="sm" hierarchy="outline" @click="info('Nova atualização disponível')">Info</Button>
        </div>
        <Sonner />
      </div>
    `,
  }),
}
