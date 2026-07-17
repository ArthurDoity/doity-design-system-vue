import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Alert from '../src/runtime/components/Alert.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Alert', Alert),
  title: 'Components/Feedback/Alert',
  args: {
    icon: true,
    dismissible: false,
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityAlert
  title="Success! Your changes have been saved"
  description="This is an alert with icon, title and description."
/>`),
  args: {
    title: 'Success! Your changes have been saved',
    description: 'This is an alert with icon, title and description.',
    variant: 'default',
  },
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: '<div style="max-width:731px"><Alert v-bind="args" /></div>',
  }),
}

export const TitleOnly: Story = {
  parameters: storyUsage(`<DoityAlert title="This Alert has a title and an icon. No description." />`),
  args: {
    title: 'This Alert has a title and an icon. No description.',
    variant: 'default',
  },
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: '<div style="max-width:731px"><Alert v-bind="args" /></div>',
  }),
}

export const Destructive: Story = {
  parameters: storyUsage(`<DoityAlert variant="destructive" title="Unable to process your payment.">
  <p>Please verify your billing information and try again.</p>
  <ul>
    <li>Check your card details</li>
    <li>Ensure sufficient funds</li>
    <li>Verify billing address</li>
  </ul>
</DoityAlert>`),
  args: {
    title: 'Unable to process your payment.',
    variant: 'destructive',
  },
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: `
      <div style="max-width:731px">
        <Alert v-bind="args">
          <p style="margin:0">Please verify your billing information and try again.</p>
          <ul>
            <li>Check your card details</li>
            <li>Ensure sufficient funds</li>
            <li>Verify billing address</li>
          </ul>
        </Alert>
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:731px">
        <Alert title="Success! Your changes have been saved" description="This is an alert with icon, title and description." />
        <Alert variant="success" title="Saved successfully" description="Your profile was updated." />
        <Alert variant="warning" title="Please review" description="This action may take a few minutes." />
        <Alert variant="destructive" title="Unable to process your payment." description="Please verify your billing information and try again." />
        <Alert variant="info" title="New update available" description="Refresh to get the latest version." />
      </div>
    `,
  }),
}

/** Simula alert surgindo após uma ação — use para avaliar a animação */
export const AppearAfterAction: Story = {
  parameters: storyUsage(`<script setup>
const show = ref(false)
</script>

<template>
  <button @click="show = true">Salvar</button>
  <DoityAlert
    v-model="show"
    variant="success"
    title="Alterações salvas"
    description="Seu perfil foi atualizado com sucesso."
    dismissible
  />
</template>`),
  render: () => ({
    components: { Alert },
    setup() {
      const show = ref(false)
      const variant = ref<'success' | 'destructive' | 'warning' | 'info'>('success')

      async function trigger(next: typeof variant.value) {
        variant.value = next
        if (show.value) {
          show.value = false
          await new Promise((r) => setTimeout(r, 240))
        }
        show.value = true
      }

      return { show, variant, trigger }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:731px;min-height:120px">
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          <button type="button" style="cursor:pointer;padding:8px 12px;border-radius:8px;border:1px solid #e4e4e7;background:#fff" @click="trigger('success')">
            Salvar (sucesso)
          </button>
          <button type="button" style="cursor:pointer;padding:8px 12px;border-radius:8px;border:1px solid #e4e4e7;background:#fff" @click="trigger('warning')">
            Revisar (aviso)
          </button>
          <button type="button" style="cursor:pointer;padding:8px 12px;border-radius:8px;border:1px solid #e4e4e7;background:#fff" @click="trigger('destructive')">
            Erro no pagamento
          </button>
          <button type="button" style="cursor:pointer;padding:8px 12px;border-radius:8px;border:1px solid #e4e4e7;background:#fff" @click="trigger('info')">
            Info
          </button>
          <button v-if="show" type="button" style="cursor:pointer;padding:8px 12px;border-radius:8px;border:1px solid #e4e4e7;background:#fafafa" @click="show = false">
            Esconder
          </button>
        </div>
        <Alert
          v-model="show"
          :variant="variant"
          :title="variant === 'success' ? 'Alterações salvas' : variant === 'warning' ? 'Revise antes de continuar' : variant === 'destructive' ? 'Não foi possível processar' : 'Atualização disponível'"
          :description="variant === 'success' ? 'Seu perfil foi atualizado com sucesso.' : variant === 'warning' ? 'Esta ação pode levar alguns minutos.' : variant === 'destructive' ? 'Verifique os dados de cobrança e tente de novo.' : 'Atualize a página para a versão mais recente.'"
          dismissible
        />
      </div>
    `,
  }),
}

export const Dismissible: Story = {
  parameters: storyUsage(`<DoityAlert
  title="Cookie notice"
  description="We use cookies to improve your experience."
  dismissible
/>`),
  args: {
    title: 'Cookie notice',
    description: 'We use cookies to improve your experience. Dismiss to see the leave animation.',
    dismissible: true,
    variant: 'info',
  },
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: '<div style="max-width:731px"><Alert v-bind="args" /></div>',
  }),
}
