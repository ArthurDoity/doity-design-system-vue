import type { Meta, StoryObj } from '@storybook/vue3'
import Badge from '../src/runtime/components/Badge.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

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
  parameters: storyUsage('<DoityBadge variant="gray" size="md">Badge</DoityBadge>'),
  render: args => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
}

export const AllVariants: Story = {
  parameters: storyUsage(`<DoityBadge variant="gray">Gray</DoityBadge>
<DoityBadge variant="primary">Primary</DoityBadge>
<DoityBadge variant="success">Success</DoityBadge>
<DoityBadge variant="warning">Warning</DoityBadge>
<DoityBadge variant="error">Error</DoityBadge>
<DoityBadge variant="outline">Outline</DoityBadge>
<DoityBadge size="sm">Small</DoityBadge>
<DoityBadge size="md">Medium</DoityBadge>
<DoityBadge size="lg">Large</DoityBadge>
<DoityBadge dot variant="success">With dot</DoityBadge>`),
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
