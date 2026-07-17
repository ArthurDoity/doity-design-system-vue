import type { Meta, StoryObj } from '@storybook/vue3'
import Textarea from '../src/runtime/components/Textarea.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Textarea', Textarea),
  title: 'Components/Forms/Textarea',
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: 'Type your message here.',
  },
  parameters: storyUsage(`<DoityTextarea placeholder="Type your message here." />`),
  render: (args) => ({
    components: { Textarea },
    setup: () => ({ args }),
    template: '<Textarea v-bind="args" style="max-width:480px" />',
  }),
}

export const WithLabel: Story = {
  args: {
    label: 'Your message',
    placeholder: 'Type your message here.',
  },
  parameters: storyUsage(`<DoityTextarea
  label="Your message"
  placeholder="Type your message here."
/>`),
  render: (args) => ({
    components: { Textarea },
    setup: () => ({ args }),
    template: '<Textarea v-bind="args" style="max-width:480px" />',
  }),
}

export const WithHint: Story = {
  name: 'With label + hint',
  args: {
    label: 'Your message',
    placeholder: 'Type your message here.',
    hint: 'Your message will be copied to the support team.',
  },
  parameters: storyUsage(`<DoityTextarea
  label="Your message"
  placeholder="Type your message here."
  hint="Your message will be copied to the support team."
/>`),
  render: (args) => ({
    components: { Textarea },
    setup: () => ({ args }),
    template: '<Textarea v-bind="args" style="max-width:480px" />',
  }),
}

export const Disabled: Story = {
  args: {
    placeholder: 'Type your message here.',
    disabled: true,
  },
  render: (args) => ({
    components: { Textarea },
    setup: () => ({ args }),
    template: '<Textarea v-bind="args" style="max-width:480px" />',
  }),
}

export const AllStates: Story = {
  render: () => ({
    components: { Textarea },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:480px">
        <Textarea placeholder="Type your message here." />
        <Textarea label="Your message" placeholder="Type your message here." />
        <Textarea
          label="Your message"
          placeholder="Type your message here."
          hint="Your message will be copied to the support team."
        />
        <Textarea placeholder="Type your message here." disabled />
        <Textarea label="Com erro" error="Campo obrigatório" placeholder="Type your message here." />
      </div>
    `,
  }),
}
