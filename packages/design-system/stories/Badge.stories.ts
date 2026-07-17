import type { Meta, StoryObj } from '@storybook/vue3'
import Badge from '../src/runtime/components/Badge.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const colors = [
  'gray',
  'primary',
  'error',
  'warning',
  'success',
  'blue-gray',
  'blue-light',
  'blue',
  'indigo',
  'purple',
  'pink',
  'rose',
  'orange',
]

const meta = {
  ...doityStoryMeta('Badge', Badge),
  title: 'Components/Data/Badge',
  argTypes: {
    variant: { control: 'select', options: [...colors, 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    icon: {
      control: 'select',
      options: ['none', 'dot', 'leading', 'trailing', 'close', 'only'],
    },
    dot: { control: 'boolean' },
  },
  args: { variant: 'primary', size: 'md', icon: 'none', dot: false },
} satisfies Meta

export default meta
type Story = StoryObj

const IconPlus = {
  template: `<svg viewBox="0 0 12 12" width="12" height="12" fill="none" aria-hidden="true"><path d="M6 2.5V9.5M2.5 6H9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
}
const IconArrowRight = {
  template: `<svg viewBox="0 0 12 12" width="12" height="12" fill="none" aria-hidden="true"><path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}
const IconArrowUp = {
  template: `<svg viewBox="0 0 12 12" width="12" height="12" fill="none" aria-hidden="true"><path d="M6 9.5V2.5M6 2.5L3 5.5M6 2.5L9 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

export const Default: Story = {
  parameters: storyUsage('<DoityBadge variant="primary" size="md">Label</DoityBadge>'),
  render: args => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">Label</Badge>',
  }),
}

export const Colors: Story = {
  parameters: storyUsage(`<DoityBadge variant="gray">Label</DoityBadge>
<DoityBadge variant="primary">Label</DoityBadge>
<DoityBadge variant="success">Label</DoityBadge>`),
  render: () => ({
    components: { Badge },
    setup: () => ({ colors }),
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <Badge v-for="c in colors" :key="c" :variant="c" size="sm">{{ c }}</Badge>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: storyUsage(`<DoityBadge size="sm">Label</DoityBadge>
<DoityBadge size="md">Label</DoityBadge>
<DoityBadge size="lg">Label</DoityBadge>`),
  render: () => ({
    components: { Badge },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
        <Badge variant="primary" size="sm">Label</Badge>
        <Badge variant="primary" size="md">Label</Badge>
        <Badge variant="primary" size="lg">Label</Badge>
      </div>
    `,
  }),
}

export const IconLayouts: Story = {
  name: 'Layouts (Figma)',
  parameters: storyUsage(`<DoityBadge>Label</DoityBadge>
<DoityBadge icon="dot">Label</DoityBadge>
<DoityBadge icon="leading">...</DoityBadge>
<DoityBadge icon="close">Label</DoityBadge>
<DoityBadge icon="only">...</DoityBadge>`),
  render: () => ({
    components: { Badge, IconPlus, IconArrowRight, IconArrowUp },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
        <Badge variant="primary" size="sm">Label</Badge>
        <Badge variant="primary" size="sm" icon="dot">Label</Badge>
        <Badge variant="primary" size="sm" icon="leading">
          <template #country>
            <span style="font-size:10px;line-height:16px;width:16px;text-align:center" aria-hidden="true">BR</span>
          </template>
          Label
        </Badge>
        <Badge variant="primary" size="sm" icon="leading">
          <template #avatar>
            <img src="https://i.pravatar.cc/32?u=badge" alt="" />
          </template>
          Label
        </Badge>
        <Badge variant="primary" size="sm" icon="close">Label</Badge>
        <Badge variant="primary" size="sm" icon="trailing">
          Label
          <template #icon-trailing><IconArrowRight /></template>
        </Badge>
        <Badge variant="primary" size="sm" icon="leading">
          <template #icon-leading><IconArrowUp /></template>
          Label
        </Badge>
        <Badge variant="primary" size="sm" icon="only" aria-label="Adicionar">
          <IconPlus />
        </Badge>
      </div>
    `,
  }),
}
