import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Pagination from '../src/runtime/components/Pagination.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Pagination', Pagination),
} satisfies Meta

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  parameters: storyUsage(`<DoityPagination v-model:page="page" :total-pages="10" />`),
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(3)
      return { page }
    },
    template: `
      <div>
        <Pagination v-model:page="page" :total-pages="10" />
        <p style="margin:12px 0 0;font-size:12px;color:#737373">Página {{ page }} de 10</p>
      </div>
    `,
  }),
}

export const FewPages: Story = {
  parameters: storyUsage('<DoityPagination v-model:page="page" :total-pages="5" />'),
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(1)
      return { page }
    },
    template: '<Pagination v-model:page="page" :total-pages="5" />',
  }),
}
