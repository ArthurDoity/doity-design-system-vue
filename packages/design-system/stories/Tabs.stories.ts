import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Tabs from '../src/runtime/components/Tabs.vue'
import TabPanel from '../src/runtime/components/TabPanel.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const items = [
  { label: 'Geral', value: 'general' },
  { label: 'Configurações', value: 'settings' },
  { label: 'Desabilitado', value: 'disabled', disabled: true },
]

const meta = {
  ...doityStoryMeta('Tabs', Tabs),
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityTabs v-model="tab" :items="items">
  <DoityTabPanel value="general">Conteúdo da aba Geral</DoityTabPanel>
  <DoityTabPanel value="settings">Conteúdo da aba Configurações</DoityTabPanel>
</DoityTabs>`),
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      const tab = ref('general')
      return { tab, items }
    },
    template: `
      <Tabs v-model="tab" :items="items">
        <TabPanel value="general">Conteúdo da aba Geral</TabPanel>
        <TabPanel value="settings">Conteúdo da aba Configurações</TabPanel>
      </Tabs>
    `,
  }),
}
