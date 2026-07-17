import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Tabs from '../src/runtime/components/Tabs.vue'
import TabPanel from '../src/runtime/components/TabPanel.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const menuItems = [
  { label: 'Ingressos', value: 'ingressos' },
  { label: 'Eventos', value: 'eventos' },
  { label: 'Cursos', value: 'cursos' },
  { label: 'Trabalhos', value: 'trabalhos' },
  { label: 'Minha Conta', value: 'conta' },
  { label: 'Ajuda', value: 'ajuda' },
]

const meta = {
  ...doityStoryMeta('Tabs', Tabs),
  title: 'Components/Navigation/Tabs',
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Menu Tabs',
  parameters: storyUsage(`<DoityTabs v-model="tab" :items="items">
  <DoityTabPanel value="ingressos">…</DoityTabPanel>
</DoityTabs>`),
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      const tab = ref('ingressos')
      return { tab, items: menuItems }
    },
    template: `
      <Tabs v-model="tab" :items="items">
        <TabPanel value="ingressos">Conteúdo de Ingressos</TabPanel>
        <TabPanel value="eventos">Conteúdo de Eventos</TabPanel>
        <TabPanel value="cursos">Conteúdo de Cursos</TabPanel>
        <TabPanel value="trabalhos">Conteúdo de Trabalhos</TabPanel>
        <TabPanel value="conta">Conteúdo de Minha Conta</TabPanel>
        <TabPanel value="ajuda">Conteúdo de Ajuda</TabPanel>
      </Tabs>
    `,
  }),
}

export const WithDisabled: Story = {
  parameters: storyUsage(`<DoityTabs v-model="tab" :items="items" />`),
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      const tab = ref('geral')
      const items = [
        { label: 'Geral', value: 'geral' },
        { label: 'Configurações', value: 'config' },
        { label: 'Desabilitado', value: 'disabled', disabled: true },
      ]
      return { tab, items }
    },
    template: `
      <Tabs v-model="tab" :items="items">
        <TabPanel value="geral">Conteúdo da aba Geral</TabPanel>
        <TabPanel value="config">Conteúdo da aba Configurações</TabPanel>
      </Tabs>
    `,
  }),
}

/** Estados Active / Not Active do item (Figma 2579:5481) */
export const TabStates: Story = {
  render: () => ({
    components: { Tabs },
    setup() {
      const active = ref('ingressos')
      const inactive = ref('outros')
      const items = [
        { label: 'Ingressos', value: 'ingressos' },
        { label: 'Eventos', value: 'eventos' },
      ]
      return { active, inactive, items }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;align-items:flex-start">
        <div>
          <p style="margin:0 0 8px;font:500 12px/16px Inter,sans-serif;color:#717680">Active</p>
          <Tabs v-model="active" :items="[{ label: 'Ingressos', value: 'ingressos' }]" />
        </div>
        <div>
          <p style="margin:0 0 8px;font:500 12px/16px Inter,sans-serif;color:#717680">Not Active</p>
          <Tabs v-model="inactive" :items="items" />
        </div>
      </div>
    `,
  }),
}
