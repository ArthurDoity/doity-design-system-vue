import type { Meta, StoryObj } from '@storybook/vue3'
import Tooltip from '../src/runtime/components/Tooltip.vue'
import Button from '../src/runtime/components/Button.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Tooltip', Tooltip),
} satisfies Meta

export default meta
type Story = StoryObj

export const Positions: Story = {
  parameters: storyUsage(`<DoityTooltip content="Tooltip no topo" position="top">
  <DoityButton hierarchy="outline" size="sm">Top</DoityButton>
</DoityTooltip>
<DoityTooltip content="Tooltip à direita" position="right">
  <DoityButton hierarchy="outline" size="sm">Right</DoityButton>
</DoityTooltip>
<DoityTooltip content="Tooltip embaixo" position="bottom">
  <DoityButton hierarchy="outline" size="sm">Bottom</DoityButton>
</DoityTooltip>
<DoityTooltip content="Tooltip à esquerda" position="left">
  <DoityButton hierarchy="outline" size="sm">Left</DoityButton>
</DoityTooltip>`),
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px;padding:40px">
        <Tooltip content="Tooltip no topo" position="top">
          <Button hierarchy="outline" size="sm">Top</Button>
        </Tooltip>
        <Tooltip content="Tooltip à direita" position="right">
          <Button hierarchy="outline" size="sm">Right</Button>
        </Tooltip>
        <Tooltip content="Tooltip embaixo" position="bottom">
          <Button hierarchy="outline" size="sm">Bottom</Button>
        </Tooltip>
        <Tooltip content="Tooltip à esquerda" position="left">
          <Button hierarchy="outline" size="sm">Left</Button>
        </Tooltip>
      </div>
    `,
  }),
}

export const DarkTheme: Story = {
  parameters: storyUsage(`<DoityTooltip content="Tema escuro" theme="dark" position="top">
  <DoityButton hierarchy="outline" size="sm">Hover me</DoityButton>
</DoityTooltip>`),
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <Tooltip content="Tema escuro" theme="dark" position="top">
        <Button hierarchy="outline" size="sm">Hover me</Button>
      </Tooltip>
    `,
  }),
}
