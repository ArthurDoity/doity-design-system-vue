import type { Meta, StoryObj } from '@storybook/vue3'
import Badge from '../src/runtime/components/Badge.vue'
import { doityStoryMeta } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Badge', Badge, {
  argTypes: {
    variant: { control: 'select', options: ['default', 'gray', 'primary', 'success', 'warning', 'error', 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    dot: { control: 'boolean' },
  },
  args: { variant: 'gray', size: 'md', dot: false },
}),
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: args => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          <Badge variant="gray">Gray</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
          <Badge dot variant="success">With dot</Badge>
        </div>
      </div>
    `,
  }),
}
