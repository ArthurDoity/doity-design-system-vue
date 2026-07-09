import type { Meta, StoryObj } from '@storybook/vue3'
import Checkbox from '../src/runtime/components/Checkbox.vue'
import Switch from '../src/runtime/components/Switch.vue'
import Radio from '../src/runtime/components/Radio.vue'
import { ref } from 'vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('CheckboxToggle', Checkbox, {
  title: 'Components/Checkbox & Toggle',
}),
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj

export const CheckboxDefault: Story = {
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

export const SwitchDefault: Story = {
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

export const CheckboxSizes: Story = {
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

export const RadioSizes: Story = {
  parameters: storyUsage(`<DoityRadio v-model="selected" name="sizes" value="sm" size="sm">Small</DoityRadio>
<DoityRadio v-model="selected" name="sizes" value="md" size="md">Medium</DoityRadio>
<DoityRadio v-model="selected" name="sizes" value="lg" size="lg">Large</DoityRadio>`),
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('md')
      return { selected }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <Radio v-model="selected" name="sizes" value="sm" size="sm">Small</Radio>
        <Radio v-model="selected" name="sizes" value="md" size="md">Medium</Radio>
        <Radio v-model="selected" name="sizes" value="lg" size="lg">Large</Radio>
      </div>
    `,
  }),
}

export const RadioDefault: Story = {
  parameters: storyUsage(`<DoityRadio v-model="selected" name="demo" value="a">Option A</DoityRadio>
<DoityRadio v-model="selected" name="demo" value="b">Option B</DoityRadio>
<DoityRadio name="demo" value="c" disabled>Option C (disabled)</DoityRadio>`),
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
