import type { Meta, StoryObj } from '@storybook/vue3'
import Empty from '../src/runtime/components/Empty.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Empty', Empty),
} satisfies Meta

export default meta
type Story = StoryObj<typeof Empty>

export const Default: Story = {
  parameters: storyUsage('<DoityEmpty />'),
}

export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Lista vazia',
    description: 'Adicione o primeiro item para começar.',
    hideActions: true,
  },
  parameters: storyUsage(`<DoityEmpty
  size="sm"
  title="Lista vazia"
  description="Adicione o primeiro item para começar."
  :hide-actions="true"
/>`),
}

export const WithActions: Story = {
  args: {
    title: 'Nenhum evento',
    description: 'Crie seu primeiro evento para começar.',
    primaryLabel: 'Criar evento',
    secondaryLabel: 'Saiba mais',
  },
  parameters: storyUsage(`<DoityEmpty
  title="Nenhum evento"
  description="Crie seu primeiro evento para começar."
  primary-label="Criar evento"
  secondary-label="Saiba mais"
/>`),
}
