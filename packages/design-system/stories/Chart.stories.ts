import type { Meta, StoryObj } from '@storybook/vue3'
import Chart from '../src/runtime/components/Chart.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const sampleData = [
  { label: 'Jan', value: 40 },
  { label: 'Fev', value: 65 },
  { label: 'Mar', value: 50 },
  { label: 'Abr', value: 80 },
  { label: 'Mai', value: 55 },
]

const meta = {
  ...doityStoryMeta('Chart', Chart, {
  title: 'Components/Charts',
}),
} satisfies Meta<typeof Chart>

export default meta
type Story = StoryObj<typeof Chart>

export const Bar: Story = {
  args: { data: sampleData, type: 'bar', height: 220 },
  parameters: storyUsage(`<DoityChart
  :data="[
    { label: 'Jan', value: 40 },
    { label: 'Fev', value: 65 },
    { label: 'Mar', value: 50 },
    { label: 'Abr', value: 80 },
    { label: 'Mai', value: 55 },
  ]"
  type="bar"
  :height="220"
/>`),
}

export const Line: Story = {
  args: { data: sampleData, type: 'line', height: 220 },
  parameters: storyUsage(`<DoityChart
  :data="[
    { label: 'Jan', value: 40 },
    { label: 'Fev', value: 65 },
    { label: 'Mar', value: 50 },
    { label: 'Abr', value: 80 },
    { label: 'Mai', value: 55 },
  ]"
  type="line"
  :height="220"
/>`),
}
