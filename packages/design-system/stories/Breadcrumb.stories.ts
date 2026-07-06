import type { Meta, StoryObj } from '@storybook/vue3'
import Breadcrumb from '../src/runtime/components/Breadcrumb.vue'
import { doityStoryMeta } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Breadcrumb', Breadcrumb),
} satisfies Meta

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Eventos', href: '#' },
      { label: 'Meu evento', href: '#' },
      { label: 'Participantes' },
    ],
  },
}
