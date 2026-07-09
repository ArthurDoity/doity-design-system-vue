import type { Meta, StoryObj } from '@storybook/vue3'
import Dropdown from '../src/runtime/components/Dropdown.vue'
import Button from '../src/runtime/components/Button.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const items = [
  { label: 'Editar', value: 'edit' },
  { label: 'Duplicar', value: 'duplicate' },
  { section: true, label: 'Ações' },
  { label: 'Excluir', value: 'delete', destructive: true },
]

const meta = {
  ...doityStoryMeta('Dropdown', Dropdown),
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityDropdown :items="items" />`),
  render: () => ({
    components: { Dropdown },
    setup: () => ({ items }),
    template: '<div style="min-height:200px"><Dropdown :items="items" /></div>',
  }),
}

export const CustomTrigger: Story = {
  parameters: storyUsage(`<DoityDropdown :items="items">
  <template #trigger>
    <DoityButton hierarchy="outline" icon="trailing">Opções ▾</DoityButton>
  </template>
</DoityDropdown>`),
  render: () => ({
    components: { Dropdown, Button },
    setup: () => ({ items }),
    template: `
      <div style="min-height:200px">
        <Dropdown :items="items">
          <template #trigger>
            <Button hierarchy="outline" icon="trailing">Opções ▾</Button>
          </template>
        </Dropdown>
      </div>
    `,
  }),
}
