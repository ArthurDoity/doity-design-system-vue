import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Modal from '../src/runtime/components/Modal.vue'
import Button from '../src/runtime/components/Button.vue'
import Input from '../src/runtime/components/Input.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Modal', Modal, {
    argTypes: {
      size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'xxl'] },
      layout: { control: 'select', options: ['default', 'centered', 'horizontal'] },
      actions: { control: 'select', options: ['end', 'stretch', 'stack'] },
      showClose: { control: 'boolean' },
      featuredIcon: { control: 'boolean' },
    },
  }),
  title: 'Components/Overlay/Modal',
} satisfies Meta

export default meta
type Story = StoryObj

/** Confirmação simples — ícone centralizado */
export const Default: Story = {
  parameters: storyUsage(`<DoityModal
  v-model:open="open"
  title="Blog post published"
  description="This blog post has been published. Team members will be able to edit this post and republish changes."
  size="sm"
  layout="centered"
  featured-icon
  actions="stretch"
  :show-close="false"
>
  <template #footer>
    <DoityButton hierarchy="outline">Cancel</DoityButton>
    <DoityButton hierarchy="primary">Confirm</DoityButton>
  </template>
</DoityModal>`),
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button hierarchy="primary" @click="open = true">Abrir modal</Button>
        <Modal
          v-model:open="open"
          title="Blog post published"
          description="This blog post has been published. Team members will be able to edit this post and republish changes."
          size="sm"
          layout="centered"
          featured-icon
          actions="stretch"
          :show-close="false"
        >
          <template #footer>
            <Button hierarchy="outline" @click="open = false">Cancel</Button>
            <Button hierarchy="primary" @click="open = false">Confirm</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

/** Formulário com campos */
export const Form: Story = {
  name: 'Formulário',
  parameters: storyUsage(`<DoityModal v-model:open="open" title="Título do formulário" description="…" size="lg" actions="stretch">
  <DoityInput label="Campo" placeholder="exemplo@email.com" />
  <template #footer>…</template>
</DoityModal>`),
  render: () => ({
    components: { Modal, Button, Input },
    setup() {
      const open = ref(false)
      const email = ref('')
      const email2 = ref('')
      return { open, email, email2 }
    },
    template: `
      <div>
        <Button hierarchy="primary" @click="open = true">Abrir formulário</Button>
        <Modal
          v-model:open="open"
          title="Título do formulário"
          description="Descrição breve sobre o que será preenchido neste formulário."
          size="lg"
          actions="stretch"
        >
          <Input v-model="email" label="Campo" placeholder="exemplo@email.com" />
          <Input v-model="email2" placeholder="exemplo@email.com" />
          <button
            type="button"
            style="align-self:flex-start;background:none;border:none;color:#ff2b34;cursor:pointer;display:inline-flex;align-items:center;gap:6px;font:600 12px/16px Inter,system-ui;padding:0"
          >
            + Adicionar outro
          </button>
          <template #footer>
            <Button hierarchy="outline" @click="open = false">Cancelar</Button>
            <Button hierarchy="primary" @click="open = false">Confirmar</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

/** Verificação / confirmação com ícone */
export const Verification: Story = {
  name: 'Verificação',
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button hierarchy="primary" @click="open = true">Abrir verificação</Button>
        <Modal
          v-model:open="open"
          title="Verificação necessária"
          description="Enviamos um código para seu endereço de e-mail cadastrado."
          size="md"
          layout="centered"
          featured-icon
          actions="stretch"
          :show-close="false"
        >
          <p style="margin:0;text-align:center;color:#737373;font:400 14px/20px Inter,system-ui">
            Não recebeu um código? Clique para reenviar.
          </p>
          <template #footer>
            <Button hierarchy="outline" @click="open = false">Cancelar</Button>
            <Button hierarchy="primary" @click="open = false">Confirmar</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

/** Layout horizontal — ícone à esquerda */
export const Horizontal: Story = {
  name: 'Layout horizontal',
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button hierarchy="primary" @click="open = true">Abrir horizontal</Button>
        <Modal
          v-model:open="open"
          title="Blog post published"
          description="This blog post has been published. Team members will be able to edit this post and republish changes."
          size="xl"
          layout="horizontal"
          featured-icon
          actions="stretch"
        >
          <template #footer>
            <Button hierarchy="outline" @click="open = false">Cancel</Button>
            <Button hierarchy="primary" @click="open = false">Confirm</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

/** Tamanhos sm / md / lg / xl / xxl */
export const Sizes: Story = {
  name: 'Tamanhos',
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      const size = ref('md')
      function openSize(s) {
        size.value = s
        open.value = true
      }
      return { open, size, openSize }
    },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <Button hierarchy="outline" size="sm" @click="openSize('sm')">SM · 350</Button>
        <Button hierarchy="outline" size="sm" @click="openSize('md')">MD · 408</Button>
        <Button hierarchy="outline" size="sm" @click="openSize('lg')">LG · 512</Button>
        <Button hierarchy="outline" size="sm" @click="openSize('xl')">XL · 544</Button>
        <Button hierarchy="outline" size="sm" @click="openSize('xxl')">XXL · 644</Button>
        <Modal
          v-model:open="open"
          :size="size"
          title="Tamanho do modal"
          :description="'size=&quot;' + size + '&quot;'"
          actions="end"
        >
          <template #footer>
            <Button hierarchy="outline" @click="open = false">Fechar</Button>
            <Button hierarchy="primary" @click="open = false">Ok</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

/** Ações empilhadas (mobile / vertical) */
export const StackedActions: Story = {
  name: 'Ações empilhadas',
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button hierarchy="primary" @click="open = true">Abrir stack</Button>
        <Modal
          v-model:open="open"
          title="Confirmar ação"
          description="As ações ficam empilhadas com gap de 12px — padrão mobile ou actions=&quot;stack&quot;."
          size="sm"
          layout="centered"
          featured-icon
          actions="stack"
          :show-close="false"
        >
          <template #footer>
            <Button hierarchy="primary" @click="open = false">Confirmar ação</Button>
            <Button hierarchy="link" @click="open = false">Voltar ao painel</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const Fullscreen: Story = {
  parameters: storyUsage(`<DoityModal
  v-model:open="open"
  title="Edição em tela cheia"
  description="Mesmo padding, tipografia e ações do Modal — ocupando a viewport."
  fullscreen
  actions="end"
>
  <template #footer>
    <DoityButton hierarchy="outline">Cancelar</DoityButton>
    <DoityButton hierarchy="primary">Salvar</DoityButton>
  </template>
</DoityModal>`),
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button hierarchy="outline" @click="open = true">Fullscreen</Button>
        <Modal
          v-model:open="open"
          title="Edição em tela cheia"
          description="Mesmo padding, tipografia e ações do Modal — ocupando a viewport."
          fullscreen
          actions="end"
        >
          <p style="margin:0;color:#737373;font:400 14px/20px Inter,system-ui;max-width:640px">
            Use fullscreen para fluxos longos (edição, preview). O rodapé fica fixo na base,
            com o mesmo gap e botões dos demais tamanhos.
          </p>
          <template #footer>
            <Button hierarchy="outline" @click="open = false">Cancelar</Button>
            <Button hierarchy="primary" @click="open = false">Salvar</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}
