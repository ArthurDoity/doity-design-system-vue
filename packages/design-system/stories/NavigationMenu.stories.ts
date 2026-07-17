import type { Meta, StoryObj } from '@storybook/vue3'
import NavigationMenu from '../src/runtime/components/NavigationMenu.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const items = [
  {
    label: 'Home',
    children: [
      { title: 'Overview', description: 'Resumo geral da plataforma.' },
      { title: 'Getting started', description: 'Primeiros passos para começar.' },
    ],
  },
  {
    label: 'Components',
    columns: [
      [
        {
          title: 'Alert Dialog',
          description: 'A modal dialog that interrupts the user with important content and expects a response.',
        },
        {
          title: 'Progress',
          description: 'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
        },
        {
          title: 'Tabs',
          description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
        },
      ],
      [
        {
          title: 'Hover Card',
          description: 'For sighted users to preview content available behind a link.',
        },
        {
          title: 'Scroll-area',
          description: 'Visually or semantically separates content.',
        },
        {
          title: 'Tooltip',
          description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
        },
      ],
    ],
  },
  { label: 'Docs', href: '#' },
  {
    label: 'List',
    children: [
      { title: 'Item A', description: 'Descrição curta do item A.' },
      { title: 'Item B', description: 'Descrição curta do item B.' },
    ],
  },
  {
    label: 'Simple',
    children: [{ title: 'Link', description: 'Entrada simples do menu.' }],
  },
  {
    label: 'With Icon',
    children: [{ title: 'Featured', description: 'Entrada com destaque visual.' }],
  },
]

const meta = {
  ...doityStoryMeta('NavigationMenu', NavigationMenu),
  title: 'Components/Navigation/Navigation Menu',
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityNavigationMenu :items="items" />`),
  render: () => ({
    components: { NavigationMenu },
    setup: () => ({ items }),
    template: `
      <div style="min-height:360px;padding:24px">
        <NavigationMenu :items="items" />
      </div>
    `,
  }),
}

export const Open: Story = {
  parameters: storyUsage(`<DoityNavigationMenu :items="items" default-open="Components" />`),
  render: () => ({
    components: { NavigationMenu },
    setup: () => ({ items }),
    template: `
      <div style="min-height:420px;padding:24px">
        <NavigationMenu :items="items" default-open="Components" />
      </div>
    `,
  }),
}
