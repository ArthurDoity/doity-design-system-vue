import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Countdown from '../src/runtime/components/Countdown.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Countdown', Countdown),
  title: 'Components/Feedback/Countdown',
  args: {
    modelValue: 899,
    variant: 'plain',
    format: 'auto',
    auto: false,
    paused: false,
    endingThreshold: 10,
    prefix: '',
    hint: '',
    showIcon: true,
    blink: true,
    tone: 'neutral',
  },
} satisfies Meta<typeof Countdown>

export default meta
type Story = StoryObj

export const Plain: Story = {
  parameters: storyUsage(`<DoityCountdown v-model="seconds" auto />`),
  args: { modelValue: 125, variant: 'plain', auto: true, tone: 'neutral' },
  render: (args) => ({
    components: { Countdown },
    setup() {
      const seconds = ref(args.modelValue)
      return { args, seconds }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <Countdown v-bind="args" v-model="seconds" />
        <p style="margin:0;color:#737373;font:14px/20px system-ui">{{ seconds }}s</p>
      </div>
    `,
  }),
}

export const Badge: Story = {
  parameters: storyUsage(`<DoityCountdown v-model="seconds" variant="badge" auto />`),
  args: { modelValue: 899, variant: 'badge', tone: 'brand' },
  render: (args) => ({
    components: { Countdown },
    setup: () => ({ args }),
    template: '<Countdown v-bind="args" />',
  }),
}

export const BadgeEnding: Story = {
  name: 'Badge (urgente)',
  parameters: storyUsage(`<DoityCountdown v-model="seconds" variant="badge" auto />`),
  args: { modelValue: 9, variant: 'badge', auto: true },
  render: (args) => ({
    components: { Countdown },
    setup() {
      const seconds = ref(args.modelValue)
      return { args, seconds }
    },
    template: '<Countdown v-bind="args" v-model="seconds" />',
  }),
}

export const WithPrefix: Story = {
  name: 'Text + prefix/hint',
  parameters: storyUsage(`<DoityCountdown
  v-model="seconds"
  variant="text"
  prefix="Expira em "
  hint="Se expirar, será necessário realizar uma nova inscrição."
  auto
/>`),
  args: {
    modelValue: 884,
    variant: 'text',
    prefix: 'Expira em ',
    hint: 'Se expirar, será necessário realizar uma nova inscrição.',
    auto: true,
  },
  render: (args) => ({
    components: { Countdown },
    setup() {
      const seconds = ref(args.modelValue)
      return { args, seconds }
    },
    template: `
      <div style="max-width:420px">
        <Countdown v-bind="args" v-model="seconds" />
      </div>
    `,
  }),
}

export const Hours: Story = {
  name: 'Formato hh:mm:ss',
  parameters: storyUsage(`<DoityCountdown v-model="seconds" format="hh:mm:ss" />`),
  args: { modelValue: 3723, format: 'hh:mm:ss', variant: 'plain' },
  render: (args) => ({
    components: { Countdown },
    setup: () => ({ args }),
    template: '<Countdown v-bind="args" />',
  }),
}

export const Neutral: Story = {
  parameters: storyUsage(`<DoityCountdown v-model="seconds" variant="badge" tone="neutral" />`),
  args: { modelValue: 300, variant: 'badge', tone: 'neutral' },
  render: (args) => ({
    components: { Countdown },
    setup: () => ({ args }),
    template: '<Countdown v-bind="args" />',
  }),
}
