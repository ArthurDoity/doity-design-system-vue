import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import DatePicker from '../src/runtime/components/DatePicker.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('DatePicker', DatePicker, {
    argTypes: {
      mode: { control: 'select', options: ['range', 'single'] },
    },
    args: {
      mode: 'range',
      cancelLabel: 'Cancelar',
      confirmLabel: 'Aplicar',
    },
  }),
  title: 'Components/Forms/Date Picker',
} satisfies Meta

export default meta
type Story = StoryObj

export const Range: Story = {
  name: 'Range (Figma)',
  parameters: storyUsage(`<DoityDatePicker
  v-model="range"
  mode="range"
  @confirm="aplicar"
/>`),
  render: () => ({
    components: { DatePicker },
    setup() {
      const range = ref({
        start: '2025-01-06',
        end: '2025-01-13',
      })
      return { range }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <DatePicker v-model="range" mode="range" />
        <pre style="margin:0;font:12px/16px ui-monospace,monospace;color:#717680">{{ range }}</pre>
      </div>
    `,
  }),
}

export const Single: Story = {
  parameters: storyUsage(`<DoityDatePicker v-model="date" mode="single" />`),
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref('2025-01-24')
      return { date }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <DatePicker v-model="date" mode="single" />
        <pre style="margin:0;font:12px/16px ui-monospace,monospace;color:#717680">{{ date }}</pre>
      </div>
    `,
  }),
}

export const WithoutActions: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const range = ref({ start: null, end: null })
      return { range }
    },
    template: `<DatePicker v-model="range" mode="range" hide-actions />`,
  }),
}
