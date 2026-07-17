import type { Meta, StoryObj } from '@storybook/vue3'
import Menubar from '../src/runtime/components/Menubar.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const items = [
  {
    label: 'File',
    items: [
      { label: 'New Tab', shortcut: '⌘T' },
      { label: 'New Window', shortcut: '⌘N' },
      { label: 'New Incognito Window', disabled: true },
      { divider: true },
      { label: 'Share', submenu: true },
      { divider: true },
      { label: 'Print..', shortcut: '⌘P' },
    ],
  },
  { label: 'Edit', items: [{ label: 'Undo', shortcut: '⌘Z' }, { label: 'Redo', shortcut: '⇧⌘Z' }] },
  { label: 'View', items: [{ label: 'Zoom In' }, { label: 'Zoom Out' }] },
  { label: 'Profiles', items: [{ label: 'Default' }, { label: 'Guest' }] },
]

const meta = {
  ...doityStoryMeta('Menubar', Menubar),
  title: 'Components/Navigation/Menubar',
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityMenubar :items="items" />`),
  render: () => ({
    components: { Menubar },
    setup: () => ({ items }),
    template: `
      <div style="min-height:280px;padding:24px">
        <Menubar :items="items" />
      </div>
    `,
  }),
}

export const Open: Story = {
  parameters: storyUsage(`<DoityMenubar :items="items" default-open="File" />`),
  render: () => ({
    components: { Menubar },
    setup: () => ({ items }),
    template: `
      <div style="min-height:280px;padding:24px">
        <Menubar :items="items" default-open="File" />
      </div>
    `,
  }),
}
