import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import ChoiceOption from '../src/runtime/components/ChoiceOption.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('ChoiceOption', ChoiceOption),
  title: 'Components/Forms/Checkbox Group',
} satisfies Meta<typeof ChoiceOption>

export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default (legado)',
  parameters: storyUsage(`<DoityChoiceOption
  v-model="plan"
  name="plan"
  value="pro"
  label="Plano Pro"
/>`),
  render: () => ({
    components: { ChoiceOption },
    setup() {
      const plan = ref('pro')
      return { plan }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:360px">
        <ChoiceOption v-model="plan" name="plan" value="free" label="Gratuito" />
        <ChoiceOption v-model="plan" name="plan" value="pro" label="Plano Pro" />
        <ChoiceOption v-model="plan" name="plan" value="enterprise" label="Enterprise" />
      </div>
    `,
  }),
}

export const Control: Story = {
  name: 'Control (checkbox à esquerda)',
  parameters: storyUsage(`<DoityCheckboxGroupItem
  v-model="plan"
  variant="control"
  type="checkbox"
  value="basic"
  label="Plano básico R$10/mês"
  description="Inclui até 10 usuários..."
/>`),
  render: () => ({
    components: { ChoiceOption },
    setup() {
      const plan = ref(['basic'])
      return { plan }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:480px">
        <ChoiceOption
          v-model="plan"
          variant="control"
          type="checkbox"
          name="plans"
          value="basic"
          label="Plano básico R$10/mês"
          description="Inclui até 10 usuários, 20GB de dados individuais e acesso a todos os recursos."
        />
        <ChoiceOption
          v-model="plan"
          variant="control"
          type="checkbox"
          name="plans"
          value="business"
          label="Business R$20/mês"
          description="Inclui até 20 usuários e 40GB de dados."
        />
      </div>
    `,
  }),
}

export const ControlRadio: Story = {
  name: 'Control (radio)',
  parameters: storyUsage(`<DoityChoiceOption
  v-model="plan"
  variant="control"
  type="radio"
  control="radio"
  value="basic"
  label="Plano básico"
/>`),
  render: () => ({
    components: { ChoiceOption },
    setup() {
      const plan = ref('basic')
      return { plan }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:480px">
        <ChoiceOption
          v-model="plan"
          variant="control"
          type="radio"
          control="radio"
          name="radio-plans"
          value="basic"
          label="Plano básico R$10/mês"
          description="Inclui até 10 usuários, 20GB de dados individuais e acesso a todos os recursos."
        />
        <ChoiceOption
          v-model="plan"
          variant="control"
          type="radio"
          control="radio"
          name="radio-plans"
          value="business"
          label="Business R$20/mês"
          description="Inclui até 20 usuários e 40GB de dados."
        />
      </div>
    `,
  }),
}

export const Icon: Story = {
  name: 'Icon simple',
  parameters: storyUsage(`<DoityChoiceOption
  v-model="person"
  variant="icon"
  type="checkbox"
  value="olivia"
  label="Olivia Silva"
  description="Inclui até 10 usuários..."
>
  <template #icon><!-- SVG --></template>
</DoityChoiceOption>`),
  render: () => ({
    components: { ChoiceOption },
    setup() {
      const person = ref(['olivia'])
      return { person }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:480px">
        <ChoiceOption
          v-model="person"
          variant="icon"
          type="checkbox"
          name="people"
          value="olivia"
          label="Olivia Silva"
          description="Inclui até 10 usuários, 20GB de dados individuais e acesso a todos os recursos."
        >
          <template #icon>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M2 10.5 5.5 7 8 9.5 14 3.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 13h12" stroke-linecap="round"/>
            </svg>
          </template>
        </ChoiceOption>
        <ChoiceOption
          v-model="person"
          variant="icon"
          type="checkbox"
          name="people"
          value="phoenix"
          label="Phoenix Baker"
          description="Inclui até 20 usuários e suporte prioritário."
        >
          <template #icon>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="2.5" y="3.5" width="11" height="9" rx="1.5"/>
              <path d="M2.5 6.5h11" stroke-linecap="round"/>
            </svg>
          </template>
        </ChoiceOption>
      </div>
    `,
  }),
}

export const Card: Story = {
  name: 'Icon card',
  parameters: storyUsage(`<DoityChoiceOption
  v-model="plan"
  variant="card"
  type="radio"
  value="basic"
  label="Plano básico"
  price="$10"
  price-suffix="por mês"
  tag="Somente por tempo limitado"
  description="Inclui até 10 usuários..."
/>`),
  render: () => ({
    components: { ChoiceOption },
    setup() {
      const plan = ref('basic')
      return { plan }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:480px">
        <ChoiceOption
          v-model="plan"
          variant="card"
          type="radio"
          name="card-plans"
          value="basic"
          label="Plano básico"
          price="$10"
          price-suffix="por mês"
          tag="Somente por tempo limitado"
          description="Inclui até 10 usuários, 20GB de dados individuais e acesso a todos os recursos."
        >
          <template #icon>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 11 6.5 7.5 9 10 13 5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
        </ChoiceOption>
        <ChoiceOption
          v-model="plan"
          variant="card"
          type="radio"
          name="card-plans"
          value="business"
          label="Business"
          price="$20"
          price-suffix="por mês"
          description="Inclui até 20 usuários e 40GB de dados."
        >
          <template #icon>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="8" cy="8" r="5.25"/>
            </svg>
          </template>
        </ChoiceOption>
      </div>
    `,
  }),
}

export const WithDescription: Story = {
  parameters: storyUsage(`<DoityChoiceOption
  v-model="shipping"
  name="shipping"
  value="express"
  label="Entrega expressa"
  description="1–2 dias úteis"
/>`),
  render: () => ({
    components: { ChoiceOption },
    setup() {
      const shipping = ref('standard')
      return { shipping }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:360px">
        <ChoiceOption
          v-model="shipping"
          name="shipping"
          value="standard"
          label="Entrega padrão"
          description="5–7 dias úteis"
        />
        <ChoiceOption
          v-model="shipping"
          name="shipping"
          value="express"
          label="Entrega expressa"
          description="1–2 dias úteis"
        />
      </div>
    `,
  }),
}

export const PaymentExample: Story = {
  name: 'Exemplo (pagamento)',
  parameters: storyUsage(`<DoityChoiceOption
  v-model="method"
  name="payment"
  value="pix"
  icon="pix"
  label="Pix"
/>`),
  render: () => ({
    components: { ChoiceOption },
    setup() {
      const method = ref('pix')
      return { method }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:360px">
        <ChoiceOption
          v-model="method"
          name="payment"
          value="pix"
          icon="pix"
          label="Pix"
        />
        <ChoiceOption
          v-model="method"
          name="payment"
          value="credit"
          icon="credit-card"
          label="Cartão de crédito"
        />
      </div>
    `,
  }),
}
