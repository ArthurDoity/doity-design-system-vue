import type { Meta, StoryObj } from '@storybook/vue3'
import Card from '../src/runtime/components/Card.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Card', Card),
  title: 'Components/Data/Card',
} satisfies Meta

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  parameters: storyUsage(`<DoityCard>
  <h3>Card Title</h3>
  <p>Card description goes here.</p>
</DoityCard>`),
  render: () => ({
    components: { Card },
    template: `
      <Card style="max-width:360px;padding:24px">
        <h3 style="margin:0 0 8px;font-size:18px">Card Title</h3>
        <p style="margin:0;color:#737373">Card description goes here.</p>
      </Card>
    `,
  }),
}
