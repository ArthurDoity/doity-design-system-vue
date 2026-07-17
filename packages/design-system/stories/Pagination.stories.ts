import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Pagination from '../src/runtime/components/Pagination.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Pagination', Pagination, {
    argTypes: {
      variant: {
        control: 'select',
        options: ['default', 'card', 'compact', 'dots', 'lines'],
      },
      shape: { control: 'select', options: ['square', 'circle'] },
      theme: { control: 'select', options: ['primary', 'dark', 'light'] },
      size: { control: 'select', options: ['md', 'lg'] },
      showLabels: { control: 'boolean' },
      framed: { control: 'boolean' },
      showArrows: { control: 'boolean' },
    },
    args: {
      totalPages: 10,
      variant: 'default',
      shape: 'square',
      theme: 'primary',
      size: 'md',
      showLabels: false,
      framed: false,
      showArrows: true,
    },
  }),
  title: 'Components/Navigation/Pagination',
} satisfies Meta

export default meta
type Story = StoryObj

function usePage(initial = 1) {
  const page = ref(initial)
  return { page }
}

export const Default: Story = {
  parameters: storyUsage(`<DoityPagination v-model:page="page" :total-pages="10" />`),
  render: () => ({
    components: { Pagination },
    setup: () => usePage(3),
    template: `
      <div>
        <Pagination v-model:page="page" :total-pages="10" />
        <p style="margin:12px 0 0;font-size:12px;color:#737373">Página {{ page }} de 10</p>
      </div>
    `,
  }),
}

export const Circle: Story = {
  name: 'Números (circle)',
  parameters: storyUsage(`<DoityPagination v-model:page="page" :total-pages="10" shape="circle" />`),
  render: () => ({
    components: { Pagination },
    setup: () => usePage(1),
    template: '<Pagination v-model:page="page" :total-pages="10" shape="circle" />',
  }),
}

export const WithLabels: Story = {
  name: 'Anterior / Próxima',
  parameters: storyUsage(`<DoityPagination v-model:page="page" :total-pages="10" show-labels />`),
  render: () => ({
    components: { Pagination },
    setup: () => usePage(2),
    template: '<Pagination v-model:page="page" :total-pages="10" show-labels />',
  }),
}

export const Card: Story = {
  name: 'Card (button group)',
  parameters: storyUsage(`<DoityPagination v-model:page="page" :total-pages="5" variant="card" />`),
  render: () => ({
    components: { Pagination },
    setup: () => usePage(1),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <Pagination v-model:page="page" :total-pages="5" variant="card" />
        <Pagination v-model:page="page" :total-pages="5" variant="card" show-labels />
      </div>
    `,
  }),
}

export const Compact: Story = {
  parameters: storyUsage(`<DoityPagination v-model:page="page" :total-pages="10" variant="compact" />`),
  render: () => ({
    components: { Pagination },
    setup: () => usePage(1),
    template: '<Pagination v-model:page="page" :total-pages="10" variant="compact" />',
  }),
}

export const Dots: Story = {
  name: 'Dots (carrossel)',
  parameters: storyUsage(`<DoityPagination
  v-model:page="page"
  :total-pages="3"
  variant="dots"
  theme="primary"
  framed
/>`),
  render: () => ({
    components: { Pagination },
    setup: () => usePage(1),
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;align-items:center">
        <Pagination v-model:page="page" :total-pages="3" variant="dots" theme="primary" framed />
        <Pagination v-model:page="page" :total-pages="3" variant="dots" theme="dark" framed />
        <Pagination v-model:page="page" :total-pages="3" variant="dots" theme="light" framed />
      </div>
    `,
  }),
}

export const Lines: Story = {
  name: 'Lines (carrossel)',
  parameters: storyUsage(`<DoityPagination v-model:page="page" :total-pages="4" variant="lines" theme="primary" />`),
  render: () => ({
    components: { Pagination },
    setup: () => usePage(1),
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;align-items:center">
        <Pagination v-model:page="page" :total-pages="4" variant="lines" theme="primary" :show-arrows="false" />
        <Pagination v-model:page="page" :total-pages="4" variant="lines" theme="dark" size="lg" :show-arrows="false" />
        <Pagination v-model:page="page" :total-pages="4" variant="lines" theme="light" :show-arrows="false" />
      </div>
    `,
  }),
}

export const Carousel: Story = {
  name: 'Carousel (overlay)',
  parameters: storyUsage(`<DoityPagination
  v-model:page="page"
  :total-pages="3"
  variant="dots"
  theme="primary"
  :show-indicators="false"
/>
<DoityPagination
  v-model:page="page"
  :total-pages="3"
  variant="dots"
  theme="primary"
  framed
  :show-arrows="false"
/>`),
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(1)
      const themes = [
        { theme: 'primary' as const, bg: 'linear-gradient(135deg,#ff2b34,#c80d15)' },
        { theme: 'dark' as const, bg: 'linear-gradient(135deg,#171717,#404040)' },
        { theme: 'light' as const, bg: 'linear-gradient(135deg,#d4d4d4,#f5f5f5)' },
      ]
      return { page, themes }
    },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px">
        <div
          v-for="item in themes"
          :key="item.theme"
          style="position:relative;width:320px;height:200px;border-radius:8px;overflow:hidden"
          :style="{ background: item.bg }"
        >
          <div style="position:absolute;left:16px;right:16px;top:50%;transform:translateY(-50%)">
            <Pagination
              v-model:page="page"
              :total-pages="3"
              variant="dots"
              :theme="item.theme"
              :show-indicators="false"
            />
          </div>
          <div style="position:absolute;left:0;right:0;bottom:16px;display:flex;justify-content:center">
            <Pagination
              v-model:page="page"
              :total-pages="3"
              variant="dots"
              :theme="item.theme"
              framed
              :show-arrows="false"
            />
          </div>
        </div>
      </div>
      <p style="margin:12px 0 0;font-size:12px;color:#737373">Slide {{ page }}/3 — clique nas setas (press + chevron)</p>
    `,
  }),
}

