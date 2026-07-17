import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import StarRating from '../src/runtime/components/StarRating.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('StarRating', StarRating),
  title: 'Components/Feedback/Star Rating',
  args: {
    modelValue: 0,
    max: 5,
    size: 29,
    readonly: false,
    disabled: false,
    demo: false,
    label: 'Avaliação',
  },
} satisfies Meta<typeof StarRating>

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityStarRating v-model="rating" />`),
  render: (args) => ({
    components: { StarRating },
    setup() {
      const rating = ref(args.modelValue ?? 0)
      return { args, rating }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <StarRating v-bind="args" v-model="rating" />
        <p style="margin:0;color:#737373;font:14px/20px system-ui">Nota: {{ rating }}</p>
      </div>
    `,
  }),
}

export const Filled: Story = {
  parameters: storyUsage(`<DoityStarRating :model-value="5" readonly />`),
  args: { modelValue: 5, readonly: true },
  render: (args) => ({
    components: { StarRating },
    setup: () => ({ args }),
    template: '<StarRating v-bind="args" />',
  }),
}

export const Partial: Story = {
  parameters: storyUsage(`<DoityStarRating :model-value="3" readonly />`),
  args: { modelValue: 3, readonly: true },
  render: (args) => ({
    components: { StarRating },
    setup: () => ({ args }),
    template: '<StarRating v-bind="args" />',
  }),
}

export const DemoAnimation: Story = {
  name: 'Demo (loop)',
  parameters: storyUsage(`<DoityStarRating demo />`),
  args: { demo: true },
  render: (args) => ({
    components: { StarRating },
    setup: () => ({ args }),
    template: '<StarRating v-bind="args" />',
  }),
}

export const Disabled: Story = {
  parameters: storyUsage(`<DoityStarRating :model-value="2" disabled />`),
  args: { modelValue: 2, disabled: true },
  render: (args) => ({
    components: { StarRating },
    setup: () => ({ args }),
    template: '<StarRating v-bind="args" />',
  }),
}
