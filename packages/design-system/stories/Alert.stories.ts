import type { Meta, StoryObj } from '@storybook/vue3'
import Alert from '../src/runtime/components/Alert.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Alert', Alert, {
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'warning', 'error', 'info'] },
    dismissible: { control: 'boolean' },
    icon: { control: 'boolean' },
  },
}),
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    title: 'Heads up!',
    description: 'You can add components to your app using the cli.',
    variant: 'default',
    icon: true,
  },
  parameters: storyUsage(`<DoityAlert
  variant="default"
  title="Heads up!"
  description="You can add components to your app using the cli."
  :icon="true"
/>`),
  render: args => ({
    components: { Alert },
    setup: () => ({ args }),
    template: '<Alert v-bind="args" />',
  }),
}

export const AllVariants: Story = {
  parameters: storyUsage(`<DoityAlert variant="default" title="Default" description="Mensagem padrão" :icon="true" />
<DoityAlert variant="success" title="Success" description="Operação concluída" :icon="true" />
<DoityAlert variant="warning" title="Warning" description="Atenção necessária" :icon="true" />
<DoityAlert variant="error" title="Error" description="Algo deu errado" :icon="true" />
<DoityAlert variant="info" title="Info" description="Informação adicional" :icon="true" />`),
  render: () => ({
    components: { Alert },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:480px">
        <Alert variant="default" title="Default" description="Mensagem padrão" icon />
        <Alert variant="success" title="Success" description="Operação concluída" icon />
        <Alert variant="warning" title="Warning" description="Atenção necessária" icon />
        <Alert variant="error" title="Error" description="Algo deu errado" icon />
        <Alert variant="info" title="Info" description="Informação adicional" icon />
      </div>
    `,
  }),
}
