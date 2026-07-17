import type { Meta, StoryObj } from '@storybook/vue3'
import Dropdown from '../src/runtime/components/Dropdown.vue'
import Button from '../src/runtime/components/Button.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const avatar = 'https://i.pravatar.cc/64?u=doity-dropdown'

const defaultItems = [
  { section: true, label: 'Section' },
  { label: 'Text', value: 'a' },
  { label: 'Text', value: 'b', selected: true },
  { label: 'Text', value: 'c' },
  { label: 'Text', value: 'd' },
  { label: 'Text', value: 'e' },
]

const iconItems = [
  { section: true, label: 'Section' },
  { label: 'Banana', value: 'a', icon: true },
  { label: 'Banana', value: 'b', icon: true, selected: true },
  { label: 'Banana', value: 'c', icon: true },
  { label: 'Banana', value: 'd', icon: true },
  { label: 'Banana', value: 'e', icon: true },
]

const avatarItems = [
  { section: true, label: 'Section' },
  { label: 'José', value: 'a', avatar },
  { label: 'Eduardo', value: 'b', avatar, selected: true },
  { label: 'José', value: 'c', avatar },
  { label: 'José', value: 'd', avatar },
  { label: 'José', value: 'e', avatar },
]

const checkboxItems = [
  { section: true, label: 'Section' },
  { label: 'Banana', value: 'a', checkbox: true },
  { label: 'Banana', value: 'b', checkbox: true, selected: true },
  { label: 'Banana', value: 'c', checkbox: true },
  { label: 'Banana', value: 'd', checkbox: true },
  { label: 'Banana', value: 'e', checkbox: true },
]

const dividerItems = [
  { label: 'Estados Unidos', value: '1' },
  { label: 'Estados Unidos', value: '2' },
  { label: 'Estados Unidos', value: '3' },
  { label: 'Estados Unidos', value: '4' },
  { divider: true },
  { label: 'Estados Unidos', value: '5' },
  { label: 'Estados Unidos', value: '6' },
  { label: 'Estados Unidos', value: '7' },
  { label: 'Estados Unidos', value: '8' },
  { divider: true },
  { label: 'Estados Unidos', value: '9' },
  { label: 'Estados Unidos', value: '10' },
]

const scrollableItems = [
  { section: true, label: 'South America' },
  { label: 'Brasil', value: 'br' },
  { label: 'Argentina', value: 'ar' },
  { label: 'Chile', value: 'cl' },
  { label: 'Uruguai', value: 'uy' },
  { label: 'Bolívia', value: 'bo' },
  { section: true, label: 'Europe' },
  { label: 'Alemanha', value: 'de' },
  { label: 'Inglaterra', value: 'uk' },
  { label: 'Bélgica', value: 'be' },
  { label: 'França', value: 'fr' },
  { label: 'Itália', value: 'it' },
  { label: 'Espanha', value: 'es' },
]

const meta = {
  ...doityStoryMeta('Dropdown', Dropdown),
  title: 'Components/Forms/Dropdown',
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityDropdown :items="items" />`),
  render: () => ({
    components: { Dropdown },
    setup: () => ({ items: defaultItems }),
    template: '<div style="min-height:260px"><Dropdown :items="items" /></div>',
  }),
}

export const WithIcon: Story = {
  parameters: storyUsage(`<DoityDropdown :items="[{ label: 'Banana', icon: true }]" />`),
  render: () => ({
    components: { Dropdown },
    setup: () => ({ items: iconItems }),
    template: '<div style="min-height:260px"><Dropdown :items="items" /></div>',
  }),
}

export const WithAvatar: Story = {
  parameters: storyUsage(`<DoityDropdown :items="[{ label: 'Eduardo', avatar: '...' }]" />`),
  render: () => ({
    components: { Dropdown },
    setup: () => ({ items: avatarItems }),
    template: '<div style="min-height:260px"><Dropdown :items="items" /></div>',
  }),
}

export const WithCheckbox: Story = {
  parameters: storyUsage(`<DoityDropdown :items="[{ label: 'Banana', checkbox: true, selected: true }]" />`),
  render: () => ({
    components: { Dropdown },
    setup: () => ({ items: checkboxItems }),
    template: '<div style="min-height:260px"><Dropdown :items="items" /></div>',
  }),
}

export const WithDividers: Story = {
  parameters: storyUsage(`<DoityDropdown :items="[{ label: 'A' }, { divider: true }, { label: 'B' }]" />`),
  render: () => ({
    components: { Dropdown },
    setup: () => ({ items: dividerItems }),
    template: '<div style="min-height:320px"><Dropdown :items="items" /></div>',
  }),
}

export const Scrollable: Story = {
  parameters: storyUsage(`<DoityDropdown :items="items" max-height="220px" />`),
  render: () => ({
    components: { Dropdown },
    setup: () => ({ items: scrollableItems }),
    template: '<div style="min-height:320px"><Dropdown :items="items" max-height="220px" /></div>',
  }),
}

export const CustomTrigger: Story = {
  parameters: storyUsage(`<DoityDropdown :items="items">
  <template #trigger>
    <DoityButton hierarchy="outline" icon="trailing">Opções ▾</DoityButton>
  </template>
</DoityDropdown>`),
  render: () => ({
    components: { Dropdown, Button },
    setup: () => ({ items: defaultItems }),
    template: `
      <div style="min-height:260px">
        <Dropdown :items="items">
          <template #trigger>
            <Button hierarchy="outline" icon="trailing">Opções ▾</Button>
          </template>
        </Dropdown>
      </div>
    `,
  }),
}
