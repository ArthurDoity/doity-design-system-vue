import type { Meta, StoryObj } from '@storybook/vue3'
import Tooltip from '../src/runtime/components/Tooltip.vue'
import Button from '../src/runtime/components/Button.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Tooltip', Tooltip, {
    argTypes: {
      position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
      arrow: { control: 'select', options: [true, false, 'center', 'start', 'end', 'none'] },
      theme: { control: 'select', options: ['light', 'dark'] },
    },
    args: {
      content: 'Este é um tooltip',
      theme: 'dark',
      position: 'top',
      arrow: true,
      delay: 100,
    },
  }),
  title: 'Components/Feedback/Tooltip',
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityTooltip content="Este é um tooltip" theme="dark">
  <DoityButton hierarchy="outline" size="sm">Hover</DoityButton>
</DoityTooltip>`),
  render: args => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <div style="display:flex;padding:80px;justify-content:center">
        <Tooltip v-bind="args">
          <Button hierarchy="outline" size="sm">Hover</Button>
        </Tooltip>
      </div>
    `,
  }),
}

export const Showcase: Story = {
  name: 'Temas',
  parameters: storyUsage(`<DoityTooltip content="Este é um tooltip" theme="dark">
  <DoityButton hierarchy="outline" size="sm">Hover</DoityButton>
</DoityTooltip>`),
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div style="display:flex;gap:96px;padding:96px 48px;flex-wrap:wrap;justify-content:center;align-items:flex-end">
        <Tooltip content="Este é um tooltip" theme="light">
          <Button hierarchy="outline" size="sm">Light</Button>
        </Tooltip>
        <Tooltip content="Este é um tooltip" theme="dark">
          <Button hierarchy="outline" size="sm">Dark</Button>
        </Tooltip>
        <Tooltip
          content="Este é um tooltip"
          description="Tooltips descrevem ou identificam um elemento."
          theme="dark"
        >
          <Button hierarchy="outline" size="sm">Com descrição</Button>
        </Tooltip>
      </div>
    `,
  }),
}
