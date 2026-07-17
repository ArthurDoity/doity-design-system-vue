import type { Meta, StoryObj } from '@storybook/vue3'
import Breadcrumb from '../src/runtime/components/Breadcrumb.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Breadcrumb', Breadcrumb),
  title: 'Components/Navigation/Breadcrumb',
} satisfies Meta

export default meta
type Story = StoryObj

const defaultItems = [
  { label: 'Home', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Breadcrumb' },
]

export const Default: Story = {
  parameters: storyUsage(`<DoityBreadcrumb
  separator="chevron"
  :items="[
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Breadcrumb' },
  ]"
/>`),
  render: () => ({
    components: { Breadcrumb },
    setup: () => ({ items: defaultItems }),
    template: `<Breadcrumb separator="chevron" :items="items" />`,
  }),
}

export const Slash: Story = {
  parameters: storyUsage(`<DoityBreadcrumb separator="slash" :items="items" />`),
  render: () => ({
    components: { Breadcrumb },
    setup: () => ({ items: defaultItems }),
    template: `<Breadcrumb separator="slash" :items="items" />`,
  }),
}

export const Dropdown: Story = {
  parameters: storyUsage(`<DoityBreadcrumb
  separator="slash"
  :items="[
    { label: 'Home', href: '#' },
    {
      label: 'Components',
      dropdown: [
        { label: 'Button', href: '#' },
        { label: 'Input', href: '#' },
        { label: 'Breadcrumb', href: '#' },
      ],
    },
    { label: 'Breadcrumb' },
  ]"
/>`),
  render: () => ({
    components: { Breadcrumb },
    setup: () => ({
      items: [
        { label: 'Home', href: '#' },
        {
          label: 'Components',
          dropdown: [
            { label: 'Button', value: 'button' },
            { label: 'Input', value: 'input' },
            { label: 'Breadcrumb', value: 'breadcrumb' },
          ],
        },
        { label: 'Breadcrumb' },
      ],
    }),
    template: `<Breadcrumb separator="slash" :items="items" />`,
  }),
}

export const Collapsed: Story = {
  parameters: storyUsage(`<DoityBreadcrumb
  :max-items="3"
  :items="[
    { label: 'Home', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'Guides', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Breadcrumb' },
  ]"
/>`),
  render: () => ({
    components: { Breadcrumb },
    setup: () => ({
      items: [
        { label: 'Home', href: '#' },
        { label: 'Docs', href: '#' },
        { label: 'Guides', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Breadcrumb' },
      ],
    }),
    template: `<Breadcrumb :max-items="3" :items="items" />`,
  }),
}

export const Truncated: Story = {
  parameters: storyUsage(`<DoityBreadcrumb
  :max-items="3"
  :items="[
    { label: 'Home', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'Data Fetching', href: '#' },
    { label: 'Caching and Revalidating' },
  ]"
/>`),
  render: () => ({
    components: { Breadcrumb },
    setup: () => ({
      items: [
        { label: 'Home', href: '#' },
        { label: 'Docs', href: '#' },
        { label: 'Data Fetching', href: '#' },
        { label: 'Caching and Revalidating' },
      ],
    }),
    template: `<Breadcrumb :max-items="3" :items="items" />`,
  }),
}
