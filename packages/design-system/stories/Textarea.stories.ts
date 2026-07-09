import type { Meta, StoryObj } from '@storybook/vue3'
import Textarea from '../src/runtime/components/Textarea.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Textarea', Textarea, {
  title: 'Components/Text Area',
}),
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    label: 'Descrição',
    placeholder: 'Digite uma descrição...',
    hint: 'Máximo 500 caracteres',
  },
  parameters: storyUsage(`<DoityTextarea
  label="Descrição"
  placeholder="Digite uma descrição..."
  hint="Máximo 500 caracteres"
/>`),
  render: args => ({
    components: { Textarea },
    setup: () => ({ args }),
    template: '<Textarea v-bind="args" style="max-width:480px" />',
  }),
}

export const AllStates: Story = {
  parameters: storyUsage(`<DoityTextarea label="Padrão" placeholder="Digite aqui..." />
<DoityTextarea label="Com erro" error="Campo obrigatório" />
<DoityTextarea label="Desabilitado" disabled />
<DoityTextarea label="Sem resize" resize="none" :rows="3" />`),
  render: () => ({
    components: { Textarea },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:480px">
        <Textarea label="Padrão" placeholder="Digite aqui..." />
        <Textarea label="Com erro" error="Campo obrigatório" />
        <Textarea label="Desabilitado" disabled />
        <Textarea label="Sem resize" resize="none" rows="3" />
      </div>
    `,
  }),
}
