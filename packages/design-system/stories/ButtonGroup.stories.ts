import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import ButtonGroup from '../src/runtime/components/ButtonGroup.vue'
import Button from '../src/runtime/components/Button.vue'
import Input from '../src/runtime/components/Input.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('ButtonGroup', ButtonGroup, {
    argTypes: {
      orientation: { control: 'select', options: ['horizontal', 'vertical'] },
      size: { control: 'select', options: ['sm', 'md', 'lg'] },
      variant: { control: 'select', options: ['default', 'secondary'] },
    },
    args: {
      orientation: 'horizontal',
      size: 'md',
      variant: 'default',
    },
  }),
  title: 'Components/Actions/Button Group',
} satisfies Meta

export default meta
type Story = StoryObj

const IconArrowLeft = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}
const IconArrowRight = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}
const IconPlus = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M8 3.333V12.667M3.333 8H12.667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
}
const IconMinus = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M3.333 8H12.667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
}
const IconEllipsis = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><circle cx="3.5" cy="8" r="1.25" fill="currentColor"/><circle cx="8" cy="8" r="1.25" fill="currentColor"/><circle cx="12.5" cy="8" r="1.25" fill="currentColor"/></svg>`,
}
const IconSearch = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M14 14L11.1 11.1M12.667 7.333A5.333 5.333 0 1 1 2 7.333a5.333 5.333 0 0 1 10.667 0Z" stroke="currentColor" stroke-width="1.33" stroke-linecap="round"/></svg>`,
}

export const Default: Story = {
  parameters: storyUsage(`<DoityButtonGroup>
  <DoityButton hierarchy="outline">Archive</DoityButton>
  <DoityButton hierarchy="outline">Report</DoityButton>
</DoityButtonGroup>`),
  render: args => ({
    components: { ButtonGroup, Button },
    setup: () => ({ args }),
    template: `
      <ButtonGroup v-bind="args">
        <Button hierarchy="outline">Archive</Button>
        <Button hierarchy="outline">Report</Button>
      </ButtonGroup>
    `,
  }),
}

export const Toolbar: Story = {
  name: 'Toolbar (nested)',
  parameters: storyUsage(`<DoityButtonGroup>
  <DoityButtonGroup>
    <DoityButton hierarchy="outline" icon="only" aria-label="Voltar">…</DoityButton>
  </DoityButtonGroup>
  <DoityButtonGroup>
    <DoityButton hierarchy="outline">Archive</DoityButton>
    <DoityButton hierarchy="outline">Report</DoityButton>
  </DoityButtonGroup>
  <DoityButtonGroup>
    <DoityButton hierarchy="outline">Snooze</DoityButton>
    <DoityButton hierarchy="outline" icon="only" aria-label="Mais">…</DoityButton>
  </DoityButtonGroup>
</DoityButtonGroup>`),
  render: () => ({
    components: { ButtonGroup, Button, IconArrowLeft, IconEllipsis },
    template: `
      <ButtonGroup>
        <ButtonGroup>
          <Button hierarchy="outline" icon="only" aria-label="Voltar">
            <IconArrowLeft />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button hierarchy="outline">Archive</Button>
          <Button hierarchy="outline">Report</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button hierarchy="outline">Snooze</Button>
          <Button hierarchy="outline" icon="only" aria-label="Mais">
            <IconEllipsis />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    `,
  }),
}

export const Sizes: Story = {
  parameters: storyUsage(`<DoityButtonGroup size="sm">…</DoityButtonGroup>
<DoityButtonGroup size="md">…</DoityButtonGroup>
<DoityButtonGroup size="lg">…</DoityButtonGroup>`),
  render: () => ({
    components: { ButtonGroup, Button, IconPlus },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <ButtonGroup size="sm">
          <Button hierarchy="outline">Small</Button>
          <Button hierarchy="outline">Button</Button>
          <Button hierarchy="outline">Group</Button>
          <Button hierarchy="outline" icon="only" aria-label="Adicionar"><IconPlus /></Button>
        </ButtonGroup>
        <ButtonGroup size="md">
          <Button hierarchy="outline">Default</Button>
          <Button hierarchy="outline">Button</Button>
          <Button hierarchy="outline">Group</Button>
          <Button hierarchy="outline" icon="only" aria-label="Adicionar"><IconPlus /></Button>
        </ButtonGroup>
        <ButtonGroup size="lg">
          <Button hierarchy="outline">Large</Button>
          <Button hierarchy="outline">Button</Button>
          <Button hierarchy="outline">Group</Button>
          <Button hierarchy="outline" icon="only" aria-label="Adicionar"><IconPlus /></Button>
        </ButtonGroup>
      </div>
    `,
  }),
}

export const Orientation: Story = {
  parameters: storyUsage(`<DoityButtonGroup orientation="vertical">
  <DoityButton hierarchy="outline" icon="only">+</DoityButton>
  <DoityButton hierarchy="outline" icon="only">−</DoityButton>
</DoityButtonGroup>`),
  render: () => ({
    components: { ButtonGroup, Button, IconPlus, IconMinus },
    template: `
      <ButtonGroup orientation="vertical">
        <Button hierarchy="outline" icon="only" aria-label="Aumentar"><IconPlus /></Button>
        <Button hierarchy="outline" icon="only" aria-label="Diminuir"><IconMinus /></Button>
      </ButtonGroup>
    `,
  }),
}

export const Nested: Story = {
  parameters: storyUsage(`<DoityButtonGroup>
  <DoityButtonGroup size="sm">…páginas…</DoityButtonGroup>
  <DoityButtonGroup size="sm">…setas…</DoityButtonGroup>
</DoityButtonGroup>`),
  render: () => ({
    components: { ButtonGroup, Button, IconArrowLeft, IconArrowRight },
    template: `
      <ButtonGroup>
        <ButtonGroup size="sm">
          <Button hierarchy="outline">1</Button>
          <Button hierarchy="outline">2</Button>
          <Button hierarchy="outline">3</Button>
          <Button hierarchy="outline">4</Button>
          <Button hierarchy="outline">5</Button>
        </ButtonGroup>
        <ButtonGroup size="sm">
          <Button hierarchy="outline" icon="only" aria-label="Anterior"><IconArrowLeft /></Button>
          <Button hierarchy="outline" icon="only" aria-label="Próximo"><IconArrowRight /></Button>
        </ButtonGroup>
      </ButtonGroup>
    `,
  }),
}

export const Secondary: Story = {
  name: 'Secondary (Copy / Paste)',
  parameters: storyUsage(`<DoityButtonGroup variant="secondary" size="sm">
  <DoityButton hierarchy="secondary">Copy</DoityButton>
  <DoityButton hierarchy="secondary">Paste</DoityButton>
</DoityButtonGroup>`),
  render: () => ({
    components: { ButtonGroup, Button },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <ButtonGroup variant="secondary" size="sm">
          <Button hierarchy="secondary">Copy</Button>
          <Button hierarchy="secondary">Paste</Button>
        </ButtonGroup>
        <ButtonGroup variant="secondary">
          <Button hierarchy="secondary">Button</Button>
          <Button hierarchy="secondary" icon="only" aria-label="Adicionar">+</Button>
        </ButtonGroup>
      </div>
    `,
  }),
}

export const Selectable: Story = {
  name: 'Selectable (highlight)',
  parameters: storyUsage(`<DoityButtonGroup v-model="active" variant="secondary">
  <DoityButton hierarchy="outline">Dia</DoityButton>
  <DoityButton hierarchy="outline">Semana</DoityButton>
  <DoityButton hierarchy="outline">Mês</DoityButton>
</DoityButtonGroup>`),
  render: () => ({
    components: { ButtonGroup, Button },
    setup() {
      const active = ref(0)
      return { active }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">
        <ButtonGroup v-model="active" variant="secondary">
          <Button hierarchy="outline">Dia</Button>
          <Button hierarchy="outline">Semana</Button>
          <Button hierarchy="outline">Mês</Button>
        </ButtonGroup>
        <ButtonGroup v-model="active">
          <Button hierarchy="outline">Dia</Button>
          <Button hierarchy="outline">Semana</Button>
          <Button hierarchy="outline">Mês</Button>
        </ButtonGroup>
        <p style="margin:0;font:12px/16px Inter,sans-serif;color:#717680">Ativo: {{ active }}</p>
      </div>
    `,
  }),
}

export const WithInput: Story = {
  name: 'Com Input',
  parameters: storyUsage(`<DoityButtonGroup>
  <DoityInput v-model="q" placeholder="Search..." />
  <DoityButton hierarchy="outline" icon="only" aria-label="Buscar">…</DoityButton>
</DoityButtonGroup>`),
  render: () => ({
    components: { ButtonGroup, Button, Input, IconSearch },
    setup() {
      const q = ref('')
      return { q }
    },
    template: `
      <ButtonGroup style="width:240px">
        <Input v-model="q" placeholder="Search..." :clearable="false" />
        <Button hierarchy="outline" icon="only" aria-label="Buscar"><IconSearch /></Button>
      </ButtonGroup>
    `,
  }),
}
