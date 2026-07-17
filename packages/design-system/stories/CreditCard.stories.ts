import type { Meta, StoryObj } from '@storybook/vue3'
import CreditCard from '../src/runtime/components/CreditCard.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const THEMES = [
  'transparent',
  'transparent-gradient',
  'primary-dark',
  'primary-light',
  'gray-light',
  'gray-dark',
  'primary-light-gradient',
  'gray-light-gradient',
  'transparent-strip',
  'gray-strip',
  'gradient-strip',
  'salmon-strip',
  'gray-strip-vertical',
  'gradient-strip-vertical',
  'salmon-strip-vertical',
  'transparent-gradient-strip',
  'transparent-gradient-strip-vertical',
]

const meta = {
  ...doityStoryMeta('CreditCard', CreditCard, {
    argTypes: {
      theme: { control: 'select', options: THEMES },
    },
    args: {
      theme: 'transparent',
      brand: 'Doity',
      holder: 'OLIVIA SILVA',
      number: '1234 1234 1234 1234',
      expiry: '06/24',
    },
  }),
  title: 'Components/Data/Credit Card',
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityCreditCard theme="transparent" holder="OLIVIA SILVA" />`),
  render: args => ({
    components: { CreditCard },
    setup: () => ({ args }),
    template: `<CreditCard v-bind="args" />`,
  }),
}

export const Themes: Story = {
  name: 'Temas',
  render: () => ({
    components: { CreditCard },
    setup: () => ({ THEMES }),
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:24px;padding:24px">
        <div v-for="t in THEMES" :key="t" style="display:flex;flex-direction:column;gap:8px">
          <CreditCard :theme="t" />
          <span style="color:#737373;font-size:11px">{{ t }}</span>
        </div>
      </div>
    `,
  }),
}
