import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Input from '../src/runtime/components/Input.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const MailIcon = {
  template: `<svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M14.6667 4C14.6667 3.26667 14.0667 2.66667 13.3333 2.66667H2.66667C1.93333 2.66667 1.33333 3.26667 1.33333 4M14.6667 4V12C14.6667 12.7333 14.0667 13.3333 13.3333 13.3333H2.66667C1.93333 13.3333 1.33333 12.7333 1.33333 12V4M14.6667 4L8 8.66667L1.33333 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

const HelpIcon = {
  template: `<svg viewBox="0 0 16 16" fill="none" width="16" height="16"><path d="M6.06 6C6.21674 5.55444 6.5261 5.17874 6.9333 4.93942C7.3405 4.70011 7.81926 4.61263 8.28478 4.69247C8.7503 4.77232 9.17254 5.01435 9.47672 5.37569C9.78089 5.73702 9.94737 6.19435 9.94667 6.66667C9.94667 8 7.94667 8.66667 7.94667 8.66667M8 11.3333H8.00667M14.6667 8C14.6667 11.6819 11.6819 14.6667 8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}

const fieldStyle = 'max-width:320px'

const meta = {
  ...doityStoryMeta('Input', Input, {
    argTypes: {
      size: { control: 'select', options: ['sm', 'md', 'lg'] },
      variant: { control: 'select', options: ['default', 'search'] },
      disabled: { control: 'boolean' },
      error: { control: 'text' },
      hint: { control: 'text' },
      leadingText: { control: 'text' },
    },
  }),
  title: 'Components/Forms/Input',
  args: {
    label: 'Email',
    placeholder: 'Digite aqui...',
    size: 'md',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof Input>

/** Playground — use os Controls para label, hint, error, size, etc. */
export const Default: Story = {
  parameters: storyUsage('<DoityInput label="Email" placeholder="Digite aqui..." />'),
  render: (args) => ({
    components: { Input },
    setup: () => ({ args }),
    template: `<Input v-bind="args" style="${fieldStyle}" />`,
  }),
}

/** Só escala — estados ficam em States */
export const Sizes: Story = {
  parameters: storyUsage(`<DoityInput size="sm" label="Small" placeholder="Small" />
<DoityInput size="md" label="Medium" placeholder="Medium" />
<DoityInput size="lg" label="Large" placeholder="Large" />`),
  render: () => ({
    components: { Input },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:360px">
        <Input size="sm" label="Small" placeholder="Small" />
        <Input size="md" label="Medium" placeholder="Medium" />
        <Input size="lg" label="Large" placeholder="Large" />
      </div>
    `,
  }),
}

/**
 * Estados do campo (independentes de ícone/prefixo).
 * Hint e erro são mutuamente exclusivos na UI — erro substitui o hint.
 */
export const States: Story = {
  name: 'Estados',
  parameters: storyUsage(`<DoityInput label="Email" placeholder="…" hint="…" />
<DoityInput label="Email" model-value="…" />
<DoityInput label="Email" model-value="…" error="…" />
<DoityInput label="Email" model-value="…" disabled />`),
  render: () => ({
    components: { Input },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px;max-width:720px">
        <Input label="Placeholder" placeholder="Digite aqui..." hint="Texto de ajuda opcional" />
        <Input label="Preenchido" model-value="olivia@untitledui.com" hint="Texto de ajuda opcional" />
        <Input label="Erro" model-value="invalido" error="Este campo é obrigatório" />
        <Input label="Desabilitado" model-value="olivia@untitledui.com" disabled />
      </div>
    `,
  }),
}

/**
 * Extensões do campo — ícones, prefixo e search.
 * Não precisa de matriz de estados: erro/disabled se comportam igual.
 */
export const Variants: Story = {
  name: 'Variantes',
  parameters: storyUsage(`<DoityInput label="Email">
  <template #icon-leading>…</template>
  <template #icon-trailing>…</template>
</DoityInput>
<DoityInput label="Website" leading-text="http://" />
<DoityInput variant="search" placeholder="Buscar" />`),
  render: () => ({
    components: { Input, MailIcon, HelpIcon },
    setup() {
      const q = ref('')
      const filled = ref('Eventos')
      return { q, filled }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:320px">
        <Input label="Com ícones" placeholder="olivia@untitledui.com" hint="Slots icon-leading e icon-trailing">
          <template #icon-leading><MailIcon /></template>
          <template #icon-trailing><HelpIcon /></template>
        </Input>
        <Input
          label="Com prefixo"
          leading-text="http://"
          placeholder="www.untitledui.com"
          hint="Prop leading-text"
        />
        <div style="display:flex;flex-direction:column;gap:12px">
          <p style="margin:0;font:500 13px/18px Inter,system-ui;color:#737373">Search</p>
          <Input v-model="q" variant="search" placeholder="Buscar" />
          <Input v-model="filled" variant="search" placeholder="Buscar" />
        </div>
      </div>
    `,
  }),
}
