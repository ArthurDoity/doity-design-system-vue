import type { Meta, StoryObj } from '@storybook/vue3'
import Navbar from '../src/runtime/components/Navbar.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Navbar', Navbar),
} satisfies Meta

export default meta
type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  args: { type: 'default' },
  parameters: storyUsage('<DoityNavbar type="default" />'),
  decorators: [() => ({ template: '<div style="border:1px solid #e5e5e5;border-radius:8px;overflow:hidden"><story /></div>' })],
}

export const Title: Story = {
  args: { type: 'title', title: 'Dashboard' },
  parameters: storyUsage('<DoityNavbar type="title" title="Dashboard" />'),
  decorators: [() => ({ template: '<div style="border:1px solid #e5e5e5;border-radius:8px;overflow:hidden"><story /></div>' })],
}

export const UserRoles: Story = {
  args: { type: 'user' },
  parameters: storyUsage('<DoityNavbar type="user" />'),
  decorators: [() => ({ template: '<div style="border:1px solid #e5e5e5;border-radius:8px;overflow:hidden"><story /></div>' })],
}

export const PageLabel: Story = {
  args: { type: 'page', pageLabel: 'Área do participante' },
  parameters: storyUsage('<DoityNavbar type="page" page-label="Área do participante" />'),
  decorators: [() => ({ template: '<div style="border:1px solid #e5e5e5;border-radius:8px;overflow:hidden"><story /></div>' })],
}
