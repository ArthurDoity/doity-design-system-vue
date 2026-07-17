import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import MinimalStepper from '../src/runtime/components/MinimalStepper.vue'
import ArrowStepper from '../src/runtime/components/ArrowStepper.vue'
import Stepper from '../src/runtime/components/Stepper.vue'
import Button from '../src/runtime/components/Button.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('MinimalStepper', MinimalStepper, {
    args: {
      modelValue: 1,
      steps: ['Dados', 'Pagamento', 'Confirmação', 'Revisão', 'Conclusão'],
    },
  }),
  title: 'Components/Navigation/Stepper',
} satisfies Meta

export default meta
type Story = StoryObj

export const Minimal: Story = {
  name: 'Minimal',
  parameters: storyUsage(`<DoityMinimalStepper v-model="step" :steps="['Dados', 'Pagamento', 'Confirmação']" />`),
  render: args => ({
    components: { MinimalStepper, Button },
    setup() {
      const step = ref(args.modelValue ?? 1)
      return { args, step }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:32px;max-width:900px">
        <MinimalStepper v-model="step" :steps="args.steps" />
        <div style="display:flex;gap:8px">
          <Button hierarchy="outline" size="sm" :disabled="step<=0" @click="step--">Anterior</Button>
          <Button size="sm" :disabled="step>=args.steps.length-1" @click="step++">Próximo</Button>
        </div>
      </div>
    `,
  }),
}

export const Arrow: Story = {
  name: 'Arrow',
  parameters: storyUsage(`<DoityArrowStepper v-model="step" title="Title" :steps="steps" />`),
  render: () => ({
    components: { ArrowStepper, Button },
    setup() {
      const step = ref(1)
      const steps = [
        { label: 'Step Name', description: 'Short step description' },
        { label: 'Step Name', description: 'Short step description' },
        { label: 'Step Name', description: 'Short step description' },
        { label: 'Step Name', description: 'Short step description' },
      ]
      return { step, steps }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:32px">
        <ArrowStepper v-model="step" title="Title" :steps="steps" />
        <div style="display:flex;gap:8px">
          <Button hierarchy="outline" size="sm" :disabled="step<=0" @click="step--">Anterior</Button>
          <Button size="sm" :disabled="step>=steps.length-1" @click="step++">Próximo</Button>
        </div>
      </div>
    `,
  }),
}

export const Icon: Story = {
  name: 'Ícones (checkout)',
  parameters: storyUsage(`<DoityStepper v-model="step" :steps="[{ icon: 'check' }, { icon: 'card' }, { icon: 'check' }]" />`),
  render: () => ({
    components: { Stepper, Button },
    setup() {
      const step = ref(1)
      const steps = [{ icon: 'check' }, { icon: 'card' }, { icon: 'check' }]
      return { step, steps }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:48px;max-width:480px">
        <Stepper v-model="step" :steps="steps" />
        <p style="color:#737373;font-size:13px;margin:0">
          A trilha fica vermelha conforme avança; o ícone do passo ativo dá um bounce elástico.
        </p>
        <div style="display:flex;gap:8px">
          <Button hierarchy="outline" size="sm" :disabled="step<=0" @click="step--">Anterior</Button>
          <Button size="sm" :disabled="step>=steps.length-1" @click="step++">Próximo</Button>
        </div>
      </div>
    `,
  }),
}

export const Facade: Story = {
  name: 'Facade (variant)',
  parameters: storyUsage(`<DoityStepper variant="minimal | arrow | icons" v-model="step" :steps="steps" />`),
  render: () => ({
    components: { Stepper, Button },
    setup() {
      const variant = ref<'minimal' | 'arrow' | 'icons'>('minimal')
      const step = ref(1)
      const steps = [
        { label: 'Dados', description: 'Seus dados', icon: 'check' },
        { label: 'Pagamento', description: 'Forma de pagamento', icon: 'card' },
        { label: 'Confirmação', description: 'Revise e confirme', icon: 'check' },
      ]
      const variants = ['minimal', 'arrow', 'icons']
      return { variant, variants, step, steps }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:32px;max-width:720px">
        <div style="display:flex;gap:8px">
          <Button
            v-for="v in variants"
            :key="v"
            size="sm"
            :hierarchy="variant === v ? 'primary' : 'outline'"
            @click="variant = v"
          >{{ v }}</Button>
        </div>
        <Stepper :variant="variant" v-model="step" title="Title" :steps="steps" />
        <div style="display:flex;gap:8px">
          <Button hierarchy="outline" size="sm" :disabled="step<=0" @click="step--">Anterior</Button>
          <Button size="sm" :disabled="step>=steps.length-1" @click="step++">Próximo</Button>
        </div>
      </div>
    `,
  }),
}

export const Counts: Story = {
  name: 'Contagens',
  render: () => ({
    components: { MinimalStepper, ArrowStepper },
    template: `
      <div style="display:flex;flex-direction:column;gap:40px;padding:32px">
        <MinimalStepper :model-value="1" :steps="['A','B']" />
        <MinimalStepper :model-value="1" :steps="['A','B','C']" />
        <MinimalStepper :model-value="1" :steps="['A','B','C','D','E']" />
        <ArrowStepper :model-value="0" :steps="[{label:'Step Name',description:'Short step description'},{label:'Step Name',description:'Short step description'}]" />
        <ArrowStepper :model-value="0" compact :steps="['S1','S2','S3','S4','S5']" />
      </div>
    `,
  }),
}
