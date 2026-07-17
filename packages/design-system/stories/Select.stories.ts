import type { Meta, StoryObj } from '@storybook/vue3'
import Select from '../src/runtime/components/Select.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const options = [
  { label: 'São Paulo', value: 'sp' },
  { label: 'Rio de Janeiro', value: 'rj' },
  { label: 'Minas Gerais', value: 'mg' },
  { label: 'Bahia', value: 'ba' },
]

const meta = {
  ...doityStoryMeta('Select', Select),
  title: 'Components/Forms/Select',
} satisfies Meta

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    label: 'Estado',
    placeholder: 'Selecione...',
    options,
    hint: 'Escolha seu estado',
  },
  parameters: storyUsage(`<DoitySelect
  label="Estado"
  placeholder="Selecione..."
  :options="options"
  hint="Escolha seu estado"
/>`),
  render: args => ({
    components: { Select },
    setup: () => ({ args }),
    template: '<div style="min-height:280px;max-width:320px"><Select v-bind="args" /></div>',
  }),
}

export const AllSizes: Story = {
  parameters: storyUsage(`<DoitySelect size="sm" placeholder="Small" :options="options" />
<DoitySelect size="md" placeholder="Medium" :options="options" />
<DoitySelect size="lg" placeholder="Large" :options="options" />
<DoitySelect label="Com erro" error="Seleção obrigatória" :options="options" />
<DoitySelect label="Desabilitado" disabled :options="options" />`),
  render: () => ({
    components: { Select },
    setup: () => ({ options }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;min-height:320px;max-width:320px">
        <Select size="sm" placeholder="Small" :options="options" />
        <Select size="md" placeholder="Medium" :options="options" />
        <Select size="lg" placeholder="Large" :options="options" />
        <Select label="Com erro" error="Seleção obrigatória" :options="options" />
        <Select label="Desabilitado" disabled :options="options" />
      </div>
    `,
  }),
}

export const Variants: Story = {
  parameters: storyUsage(`<DoitySelect label="Label" variant="default" placeholder="Selecione um membro de equipe" :options="options" />
<DoitySelect label="Label" variant="icon" placeholder="Selecione um membro de equipe" :options="options" />
<DoitySelect label="Label" variant="search" placeholder="Pesquisar" :options="options" />`),
  render: () => ({
    components: { Select },
    setup: () => ({
      options: [
        { label: 'Eduardo Leandro', value: 'eduardo' },
        { label: 'Ana Silva', value: 'ana' },
        { label: 'Bruno Costa', value: 'bruno' },
      ],
    }),
    template: `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;min-height:280px;max-width:780px">
        <Select label="Label" variant="default" placeholder="Selecione um membro de equipe" :options="options" />
        <Select label="Label" variant="icon" placeholder="Selecione um membro de equipe" :options="options" />
        <Select label="Label" variant="search" placeholder="Pesquisar" :options="options" />
        <Select label="Label" variant="default" model-value="eduardo" :options="options" />
        <Select label="Label" variant="icon" model-value="eduardo" :options="options" />
        <Select label="Label" variant="search" model-value="eduardo" placeholder="Pesquisar" :options="options" />
      </div>
    `,
  }),
}

