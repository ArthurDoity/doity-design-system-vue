import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Dialog from '../src/runtime/components/Dialog.vue'
import Button from '../src/runtime/components/Button.vue'
import Input from '../src/runtime/components/Input.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Dialog', Dialog, {
    argTypes: {
      size: { control: 'select', options: ['sm', 'md', 'lg'] },
    },
  }),
  title: 'Components/Overlay/Dialog',
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityButton hierarchy="primary" @click="open = true">Abrir dialog</DoityButton>
<DoityDialog
  v-model:open="open"
  title="Editar perfil"
  description="Atualize suas informações."
  @save="salvar"
>
  <DoityInput label="Nome" placeholder="Seu nome" />
</DoityDialog>`),
  render: () => ({
    components: { Dialog, Button, Input },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button hierarchy="primary" @click="open = true">Abrir dialog</Button>
        <Dialog
          v-model:open="open"
          title="Editar perfil"
          description="Atualize suas informações."
          @save="open = false"
        >
          <Input label="Nome" placeholder="Seu nome" style="width:100%" />
        </Dialog>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: storyUsage(`<DoityDialog v-model:open="openSm" title="Dialog SM" size="sm" />
<DoityDialog v-model:open="openLg" title="Dialog LG" size="lg" description="…" />`),
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const openSm = ref(false)
      const openMd = ref(false)
      const openLg = ref(false)
      return { openSm, openMd, openLg }
    },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <Button hierarchy="outline" @click="openSm = true">SM · 350</Button>
        <Button hierarchy="outline" @click="openMd = true">MD · 408</Button>
        <Button hierarchy="outline" @click="openLg = true">LG · 512</Button>
        <Dialog v-model:open="openSm" title="Dialog SM" size="sm" @save="openSm = false" />
        <Dialog
          v-model:open="openMd"
          title="Dialog MD"
          size="md"
          description="Tamanho padrão para formulários curtos."
          @save="openMd = false"
        />
        <Dialog
          v-model:open="openLg"
          title="Dialog LG"
          size="lg"
          description="Dialog maior para mais conteúdo."
          @save="openLg = false"
        />
      </div>
    `,
  }),
}
