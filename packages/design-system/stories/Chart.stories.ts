import type { Meta, StoryObj } from '@storybook/vue3'
import Chart from '../src/runtime/components/Chart.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dez']

const barData = [
  { label: 'Jan', value: 420 },
  { label: 'Feb', value: 680 },
  { label: 'Mar', value: 310 },
  { label: 'Apr', value: 540 },
  { label: 'May', value: 390 },
  { label: 'Jun', value: 720 },
  { label: 'Jul', value: 480 },
  { label: 'Aug', value: 560 },
  { label: 'Sep', value: 450 },
  { label: 'Oct', value: 640 },
  { label: 'Nov', value: 710 },
  { label: 'Dez', value: 390 },
]

const multiSeries = [
  { name: 'Series 1', values: [720, 760, 700, 680, 740, 780, 640, 700, 760, 800, 820, 840] },
  { name: 'Series 2', values: [480, 500, 460, 440, 490, 520, 400, 460, 500, 530, 540, 560] },
  { name: 'Series 3', values: [120, 180, 220, 260, 300, 340, 280, 360, 400, 440, 470, 500] },
]

const stackedData = months.map((label, i) => ({
  label,
  values: [
    multiSeries[2].values[i] * 0.4,
    multiSeries[1].values[i] * 0.35,
    multiSeries[0].values[i] * 0.25,
  ],
}))

const pieData = [
  { label: 'Series 1', value: 24 },
  { label: 'Series 2', value: 38 },
  { label: 'Series 3', value: 38 },
]

const activityData = [
  { label: 'Series 1', value: 78 },
  { label: 'Series 2', value: 55 },
  { label: 'Series 3', value: 32 },
]

const radarData = [
  { label: 'Seg', value: 70 },
  { label: 'Ter', value: 55 },
  { label: 'Qua', value: 80 },
  { label: 'Qui', value: 45 },
  { label: 'Sex', value: 90 },
  { label: 'Sáb', value: 60 },
  { label: 'Dom', value: 40 },
]

const meta = {
  ...doityStoryMeta('Chart', Chart),
  title: 'Components/Data/Chart',
} satisfies Meta

export default meta
type Story = StoryObj

export const Bar: Story = {
  parameters: storyUsage(`<DoityChart
  type="bar"
  :data="barData"
  :height="240"
  y-axis-label="Usuários ativos"
  x-axis-label="Mês"
/>`),
  render: () => ({
    components: { Chart },
    setup: () => ({ barData }),
    template: `
      <Chart
        type="bar"
        :data="barData"
        :height="260"
        y-axis-label="Usuários ativos"
        x-axis-label="Mês"
      />
    `,
  }),
}

export const BarStacked: Story = {
  parameters: storyUsage(`<DoityChart type="bar" stacked legend="top" :data="stackedData" />`),
  render: () => ({
    components: { Chart },
    setup: () => ({ stackedData }),
    template: `
      <Chart
        type="bar"
        stacked
        legend="top"
        :data="stackedData"
        :height="260"
        y-axis-label="Usuários ativos"
        x-axis-label="Mês"
      />
    `,
  }),
}

export const Line: Story = {
  parameters: storyUsage(`<DoityChart
  type="line"
  legend="top"
  :categories="months"
  :series="multiSeries"
  y-axis-label="Usuários ativos"
  x-axis-label="Mês"
/>`),
  render: () => ({
    components: { Chart },
    setup: () => ({ months, multiSeries }),
    template: `
      <Chart
        type="line"
        legend="top"
        :categories="months"
        :series="multiSeries"
        :height="260"
        y-axis-label="Usuários ativos"
        x-axis-label="Mês"
      />
    `,
  }),
}

export const Area: Story = {
  parameters: storyUsage(`<DoityChart type="area" :categories="months" :series="[multiSeries[0]]" />`),
  render: () => ({
    components: { Chart },
    setup: () => ({ months, series: [multiSeries[0]] }),
    template: `
      <Chart
        type="area"
        :categories="months"
        :series="series"
        :height="240"
        y-axis-label="Usuários ativos"
        x-axis-label="Mês"
      />
    `,
  }),
}

export const Pie: Story = {
  parameters: storyUsage(`<DoityChart type="pie" :hole="0" legend="right" :data="pieData" size="md" />`),
  render: () => ({
    components: { Chart },
    setup: () => ({ pieData }),
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:32px;align-items:center">
        <Chart type="pie" :hole="0" legend="right" :data="pieData" size="md" />
        <Chart type="donut" :hole="0.5" legend="right" :data="pieData" size="md" />
        <Chart type="donut" :hole="0.75" :data="pieData" size="sm" />
      </div>
    `,
  }),
}

export const Progress: Story = {
  parameters: storyUsage(`<DoityChart type="progress" :value="40" progress-variant="floating-top" />`),
  render: () => ({
    components: { Chart },
    template: `
      <div style="display:flex;flex-direction:column;gap:28px;max-width:420px">
        <Chart type="progress" :value="40" progress-variant="plain" />
        <Chart type="progress" :value="40" progress-variant="trailing" />
        <Chart type="progress" :value="40" progress-variant="bottom" />
        <Chart type="progress" :value="40" progress-variant="floating-top" />
        <Chart type="progress" :value="40" progress-variant="floating-bottom" />
      </div>
    `,
  }),
}

export const Circle: Story = {
  parameters: storyUsage(`<DoityChart type="circle" :value="40" label="Usuários ativos" size="md" />`),
  render: () => ({
    components: { Chart },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-end">
        <Chart type="circle" :value="40" size="xs" />
        <Chart type="circle" :value="40" label="Usuários ativos" size="sm" />
        <Chart type="circle" :value="40" label="Usuários ativos" size="md" />
        <Chart type="half-circle" :value="40" label="Usuários ativos" size="md" />
        <Chart type="half-circle" :value="40" size="lg" />
      </div>
    `,
  }),
}

export const Activity: Story = {
  parameters: storyUsage(`<DoityChart
  type="activity"
  :data="activityData"
  label="Usuários ativos"
  center-value="1,000"
  legend="right"
  size="md"
/>`),
  render: () => ({
    components: { Chart },
    setup: () => ({ activityData }),
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:32px;align-items:center">
        <Chart
          type="activity"
          :data="activityData"
          label="Usuários ativos"
          center-value="1,000"
          size="md"
        />
        <Chart
          type="activity"
          :data="activityData"
          center-value="1,000"
          legend="right"
          size="md"
        />
        <Chart
          type="activity"
          :data="activityData"
          label="Usuários ativos"
          center-value="1,000"
          legend="bottom"
          size="sm"
        />
      </div>
    `,
  }),
}

export const Radar: Story = {
  parameters: storyUsage(`<DoityChart type="radar" :data="radarData" />`),
  render: () => ({
    components: { Chart },
    setup: () => ({ radarData }),
    template: `<Chart type="radar" :data="radarData" style="max-width:360px" />`,
  }),
}
