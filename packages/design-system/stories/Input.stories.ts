import type { Meta, StoryObj } from '@storybook/vue3'
import Input from '../src/runtime/components/Input.vue'
import { doityStoryMeta } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Input', Input, {
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
}),
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { placeholder: 'Digite aqui...', size: 'md' },
  render: args => ({
    components: { Input },
    setup: () => ({ args }),
    template: '<Input v-bind="args" style="max-width:320px" />',
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:360px">
        <Input size="sm" label="Small" placeholder="Small" />
        <Input size="md" label="Medium" placeholder="Medium" />
        <Input size="lg" label="Large" placeholder="Large" />
        <Input label="Disabled" placeholder="Disabled" disabled />
        <Input label="Com erro" error="Este campo é obrigatório" />
        <Input label="Com hint" hint="Texto de ajuda" placeholder="Com hint" />
      </div>
    `,
  }),
}
