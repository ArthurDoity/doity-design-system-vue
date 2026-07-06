import type { Meta, StoryObj } from '@storybook/vue3'
import Table from '../src/runtime/components/Table.vue'
import { doityStoryMeta } from './helpers/doityStoryMeta'

const columns = [
  { key: 'name', label: 'Nome' },
  { key: 'email', label: 'E-mail' },
  { key: 'status', label: 'Status' },
]

const data = [
  { name: 'Ana Silva', email: 'ana@doity.com', status: 'Ativo' },
  { name: 'Bruno Costa', email: 'bruno@doity.com', status: 'Pendente' },
  { name: 'Carla Dias', email: 'carla@doity.com', status: 'Ativo' },
  { name: 'Daniel Lima', email: 'daniel@doity.com', status: 'Inativo' },
]

const meta = {
  ...doityStoryMeta('Table', Table),
} satisfies Meta

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  args: { columns, data },
}

export const Striped: Story = {
  args: { columns, data, striped: true },
}

export const Plain: Story = {
  args: { columns, data, bordered: false, hoverable: false },
}
