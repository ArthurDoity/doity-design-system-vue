import type { Meta, StoryObj } from '@storybook/vue3'
import Select from '../src/runtime/components/Select.vue'
import { doityStoryMeta } from './helpers/doityStoryMeta'

const options = [
  { label: 'São Paulo', value: 'sp' },
  { label: 'Rio de Janeiro', value: 'rj' },
  { label: 'Minas Gerais', value: 'mg' },
  { label: 'Bahia', value: 'ba' },
]

const meta = {
  ...doityStoryMeta('Select', Select),
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
  render: args => ({
    components: { Select },
    setup: () => ({ args }),
    template: '<div style="min-height:280px;max-width:320px"><Select v-bind="args" /></div>',
  }),
}

export const AllSizes: Story = {
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
