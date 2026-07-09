import type { Meta, StoryObj } from '@storybook/vue3'
import Sidebar from '../src/runtime/components/Sidebar.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const items = [
  { label: 'Dashboard', icon: '▦', active: true },
  { label: 'Eventos', icon: '◉' },
  { label: 'Participantes', icon: '◎' },
  { label: 'Configurações', icon: '⚙' },
]

const roles = [
  { label: 'Org.', value: 'organizer' },
  { label: 'Part.', value: 'participant' },
]

const meta = {
  ...doityStoryMeta('Sidebar', Sidebar),
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoitySidebar
  :roles="roles"
  active-role="organizer"
  :items="items"
  show-cta
  :profile-card="{
    title: 'Perfil 80%',
    subtitle: 'Complete seu cadastro',
    progress: 80,
    progressLabel: '80% concluído',
  }"
/>`),
  render: () => ({
    components: { Sidebar },
    setup: () => ({ items, roles }),
    template: `
      <div style="display:flex;height:480px;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden">
        <Sidebar
          :roles="roles"
          active-role="organizer"
          :items="items"
          show-cta
          :profile-card="{ title: 'Perfil 80%', subtitle: 'Complete seu cadastro', progress: 80, progressLabel: '80% concluído' }"
        />
        <div style="flex:1;padding:24px;background:#fafafa">Área de conteúdo</div>
      </div>
    `,
  }),
}

export const Collapsed: Story = {
  parameters: storyUsage('<DoitySidebar :items="items" collapsed />'),
  render: () => ({
    components: { Sidebar },
    setup: () => ({ items }),
    template: `
      <div style="display:flex;height:320px;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden">
        <Sidebar :items="items" collapsed />
        <div style="flex:1;padding:24px;background:#fafafa">Sidebar colapsada</div>
      </div>
    `,
  }),
}
