import type { Meta, StoryObj } from '@storybook/vue3'
import Spinner from '../src/runtime/components/Spinner.vue'
import { doityStoryMeta } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Spinner', Spinner, {
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: { control: 'select', options: ['brand', 'success', 'error', 'warning'] },
  },
}),
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: { size: 'md', color: 'brand' },
}

export const AllSizes: Story = {
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    `,
  }),
}

export const AllColors: Story = {
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <Spinner color="brand" />
        <Spinner color="success" />
        <Spinner color="warning" />
        <Spinner color="error" />
      </div>
    `,
  }),
}
