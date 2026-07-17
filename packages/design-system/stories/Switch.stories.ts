import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Switch from '../src/runtime/components/Switch.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Switch', Switch),
  title: 'Components/Forms/Switch',
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoitySwitch />
<DoitySwitch :model-value="true" />
<DoitySwitch disabled />`),
  render: () => ({
    components: { Switch },
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <Switch />
        <Switch :model-value="true" />
        <Switch disabled />
      </div>
    `,
  }),
}

export const Interactive: Story = {
  parameters: storyUsage(`<DoitySwitch v-model="on">Notificações</DoitySwitch>
<DoitySwitch v-model="alerts">Alertas</DoitySwitch>`),
  render: () => ({
    components: { Switch },
    setup() {
      const on = ref(false)
      const alerts = ref(true)
      return { on, alerts }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <Switch v-model="on">Notificações</Switch>
        <Switch v-model="alerts">Alertas</Switch>
      </div>
    `,
  }),
}

export const WithHint: Story = {
  parameters: storyUsage(`<DoitySwitch
  v-model="remember"
  label="Lembre-se de mim"
  hint="Salve meus dados de login para a próxima vez."
/>`),
  render: () => ({
    components: { Switch },
    setup() {
      const remember = ref(true)
      return { remember }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:360px">
        <Switch
          v-model="remember"
          size="md"
          label="Lembre-se de mim"
          hint="Salve meus dados de login para a próxima vez."
        />
        <Switch
          size="sm"
          label="Lembre-se de mim"
          hint="Salve meus dados de login para a próxima vez."
        />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: storyUsage(`<DoitySwitch size="sm" />
<DoitySwitch size="md" :model-value="true" />`),
  render: () => ({
    components: { Switch },
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <Switch size="sm" />
        <Switch size="sm" :model-value="true" />
        <Switch size="md" />
        <Switch size="md" :model-value="true" />
      </div>
    `,
  }),
}
