import type { Meta, StoryObj } from '@storybook/vue3'
import Checkbox from '../src/runtime/components/Checkbox.vue'
import Switch from '../src/runtime/components/Switch.vue'
import Radio from '../src/runtime/components/Radio.vue'
import { ref } from 'vue'
import { doityStoryMeta } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('CheckboxToggle', Checkbox, {
  title: 'Components/Checkbox & Toggle',
}),
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj

export const CheckboxDefault: Story = {
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

export const SwitchDefault: Story = {
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

export const RadioDefault: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('b')
      return { selected }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px">
        <Radio v-model="selected" name="demo" value="a">Option A</Radio>
        <Radio v-model="selected" name="demo" value="b">Option B</Radio>
        <Radio name="demo" value="c" disabled>Option C (disabled)</Radio>
      </div>
    `,
  }),
}
