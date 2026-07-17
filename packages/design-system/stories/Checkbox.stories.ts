import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Checkbox from '../src/runtime/components/Checkbox.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Checkbox', Checkbox),
  title: 'Components/Forms/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityCheckbox>Unchecked</DoityCheckbox>
<DoityCheckbox :model-value="true">Checked</DoityCheckbox>
<DoityCheckbox disabled>Disabled</DoityCheckbox>`),
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <Checkbox>Unchecked</Checkbox>
        <Checkbox :model-value="true">Checked</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
      </div>
    `,
  }),
}

export const Interactive: Story = {
  parameters: storyUsage(`<DoityCheckbox v-model="a">Check 1</DoityCheckbox>
<DoityCheckbox v-model="b">Check 2</DoityCheckbox>`),
  render: () => ({
    components: { Checkbox },
    setup() {
      const a = ref(true)
      const b = ref(false)
      return { a, b }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <Checkbox v-model="a">Check 1</Checkbox>
        <Checkbox v-model="b">Check 2</Checkbox>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: storyUsage(`<DoityCheckbox size="sm" :model-value="true">Small</DoityCheckbox>
<DoityCheckbox size="md" :model-value="true">Medium</DoityCheckbox>
<DoityCheckbox size="lg" :model-value="true">Large</DoityCheckbox>`),
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <Checkbox size="sm" :model-value="true">Small</Checkbox>
        <Checkbox size="md" :model-value="true">Medium</Checkbox>
        <Checkbox size="lg" :model-value="true">Large</Checkbox>
      </div>
    `,
  }),
}

export const WithHint: Story = {
  parameters: storyUsage(`<DoityCheckbox
  v-model="remember"
  label="Lembre-se de mim"
  hint="Salve meus dados de login para a próxima vez."
/>`),
  render: () => ({
    components: { Checkbox },
    setup() {
      const remember = ref(true)
      const other = ref(false)
      return { remember, other }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:360px">
        <Checkbox
          v-model="remember"
          label="Lembre-se de mim"
          hint="Salve meus dados de login para a próxima vez."
        />
        <Checkbox
          v-model="other"
          size="sm"
          label="Lembre-se de mim"
          hint="Salve meus dados de login para a próxima vez."
        />
        <Checkbox
          :model-value="true"
          indeterminate
          label="Seleção parcial"
          hint="Alguns itens do grupo estão marcados."
        />
      </div>
    `,
  }),
}
