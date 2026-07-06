import type { Meta, StoryObj } from '@storybook/vue3'
import Button from '../src/runtime/components/Button.vue'
import { doityStoryMeta } from './helpers/doityStoryMeta'

const sizes = ['sm', 'md', 'lg', 'xl', '2xl'] as const
const hierarchies = ['primary', 'secondary', 'outline', 'link'] as const
const icons = ['none', 'dot', 'leading', 'trailing', 'only'] as const

const meta = {
  ...doityStoryMeta('Button', Button, {
    argTypes: {
      hierarchy: { control: 'select', options: hierarchies },
      size: { control: 'select', options: sizes },
      icon: { control: 'select', options: icons },
      destructive: { control: 'boolean' },
      disabled: { control: 'boolean' },
      loading: { control: 'boolean' },
    },
    args: {
      hierarchy: 'primary',
      size: 'md',
      icon: 'none',
      destructive: false,
      disabled: false,
      loading: false,
    },
  }),
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { hierarchy: 'primary' },
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Button</Button>',
  }),
}

export const Secondary: Story = {
  args: { hierarchy: 'secondary' },
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Button</Button>',
  }),
}

export const Outline: Story = {
  args: { hierarchy: 'outline' },
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Button</Button>',
  }),
}

export const Link: Story = {
  args: { hierarchy: 'link' },
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Button</Button>',
  }),
}

export const Destructive: Story = {
  args: { hierarchy: 'primary', destructive: true },
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Delete</Button>',
  }),
}

export const WithLeadingIcon: Story = {
  args: { icon: 'leading' },
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: `<Button v-bind="args">
      <template #icon-leading>+</template>
      Add item
    </Button>`,
  }),
}

export const IconOnly: Story = {
  args: { icon: 'only', hierarchy: 'outline' },
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">⚙</Button>',
  }),
}

export const Loading: Story = {
  args: { loading: true },
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Saving...</Button>',
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Button },
    setup: () => ({ sizes }),
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <Button v-for="s in sizes" :key="s" :size="s" hierarchy="primary">{{ s }}</Button>
      </div>
    `,
  }),
}

export const AllHierarchies: Story = {
  render: () => ({
    components: { Button },
    setup: () => ({ hierarchies }),
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <Button v-for="h in hierarchies" :key="h" :hierarchy="h">{{ h }}</Button>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    setup: () => ({ sizes, hierarchies }),
    template: `
      <div style="display:flex;flex-direction:column;gap:24px">
        <div v-for="h in hierarchies" :key="h">
          <p style="margin:0 0 8px;font-size:12px;color:#737373;text-transform:capitalize">{{ h }}</p>
          <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
            <Button v-for="s in sizes" :key="s" :size="s" :hierarchy="h">{{ s }}</Button>
            <Button :hierarchy="h" destructive>destructive</Button>
            <Button :hierarchy="h" disabled>disabled</Button>
          </div>
        </div>
      </div>
    `,
  }),
}
