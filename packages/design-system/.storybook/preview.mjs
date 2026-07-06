import { setup } from '@storybook/vue3'
import { defineComponent, h } from 'vue'
import '../src/runtime/assets/css/tokens.css'
import '../src/runtime/assets/css/base.css'
import '../src/runtime/assets/css/components.css'

const NuxtLink = defineComponent({
  name: 'NuxtLink',
  props: {
    to: { type: [String, Object], default: '#' },
  },
  setup(props, { slots }) {
    const href = typeof props.to === 'string' ? props.to : '#'
    return () => h('a', { href, style: 'text-decoration:none;color:inherit' }, slots.default?.())
  },
})

setup((app) => {
  app.component('NuxtLink', NuxtLink)
  app.component('RouterLink', NuxtLink)
})

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
      source: {
        type: 'code',
        language: 'html',
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default preview
