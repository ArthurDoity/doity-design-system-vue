import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Dialog from '../src/runtime/components/Dialog.vue'
import Button from '../src/runtime/components/Button.vue'
import Input from '../src/runtime/components/Input.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Dialog', Dialog),
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityButton hierarchy="primary" @click="open = true">Abrir dialog</DoityButton>
<DoityDialog v-model:open="open" title="Editar perfil" description="Atualize suas informações.">
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
        <Dialog v-model:open="open" title="Editar perfil" description="Atualize suas informações.">
          <Input label="Nome" placeholder="Seu nome" style="width:100%" />
        </Dialog>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: storyUsage(`<DoityButton hierarchy="outline" @click="openSm = true">Small</DoityButton>
<DoityButton hierarchy="outline" @click="openLg = true">Large</DoityButton>
<DoityDialog v-model:open="openSm" title="Dialog SM" size="sm" />
<DoityDialog v-model:open="openLg" title="Dialog LG" size="lg" description="Dialog maior para mais conteúdo." />`),
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const openSm = ref(false)
      const openLg = ref(false)
      return { openSm, openLg }
    },
    template: `
      <div style="display:flex;gap:12px">
        <Button hierarchy="outline" @click="openSm = true">Small</Button>
        <Button hierarchy="outline" @click="openLg = true">Large</Button>
        <Dialog v-model:open="openSm" title="Dialog SM" size="sm" />
        <Dialog v-model:open="openLg" title="Dialog LG" size="lg" description="Dialog maior para mais conteúdo." />
      </div>
    `,
  }),
}
