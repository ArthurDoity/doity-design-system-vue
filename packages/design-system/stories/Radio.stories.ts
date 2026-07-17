import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Radio from '../src/runtime/components/Radio.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Radio', Radio),
  title: 'Components/Forms/Radio',
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj

export const Default: Story = {
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

export const Interactive: Story = {
  parameters: storyUsage(`<DoityRadio v-model="selected" name="figma" value="1">Radio 1</DoityRadio>
<DoityRadio v-model="selected" name="figma" value="2">Radio 2</DoityRadio>`),
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('1')
      return { selected }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px">
        <Radio v-model="selected" name="figma" value="1">Radio 1</Radio>
        <Radio v-model="selected" name="figma" value="2">Radio 2</Radio>
      </div>
    `,
  }),
}

export const Sizes: Story = {
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

export const WithHint: Story = {
  parameters: storyUsage(`<DoityRadio
  v-model="selected"
  name="remember"
  value="yes"
  label="Lembre-se de mim"
  hint="Salve meus dados de login para a próxima vez."
/>`),
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('yes')
      return { selected }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:360px">
        <Radio
          v-model="selected"
          name="remember"
          value="yes"
          label="Lembre-se de mim"
          hint="Salve meus dados de login para a próxima vez."
        />
        <Radio
          v-model="selected"
          name="remember"
          value="no"
          size="sm"
          label="Não lembrar"
          hint="Você precisará fazer login novamente."
        />
      </div>
    `,
  }),
}
