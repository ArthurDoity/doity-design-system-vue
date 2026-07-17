import type { Meta, StoryObj } from '@storybook/vue3'
import Avatar from '../src/runtime/components/Avatar.vue'
import AvatarGroup from '../src/runtime/components/AvatarGroup.vue'
import AvatarLabelGroup from '../src/runtime/components/AvatarLabelGroup.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Avatar', Avatar, {
    argTypes: {
      size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
      status: { control: 'select', options: [false, true, 'online', 'offline'] },
    },
    args: {
      name: 'Olívia Silva',
      size: 'md',
      online: false,
      placeholder: false,
    },
  }),
  title: 'Components/Data/Avatar',
} satisfies Meta

export default meta
type Story = StoryObj

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

export const Default: Story = {
  parameters: storyUsage(`<DoityAvatar name="Olívia Silva" size="md" />`),
  render: args => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
}

export const ContentTypes: Story = {
  name: 'Image / Icon / Initials',
  parameters: storyUsage(`<DoityAvatar src="..." size="md" />
<DoityAvatar placeholder size="md" />
<DoityAvatar name="Olívia Rhye" size="md" />`),
  render: () => ({
    components: { Avatar },
    setup: () => ({ sizes }),
    template: `
      <div style="display:grid;gap:24px">
        <div>
          <p style="color:#737373;font-size:12px;margin:0 0 12px">Imagem</p>
          <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
            <Avatar
              v-for="s in sizes"
              :key="'img-'+s"
              src="https://i.pravatar.cc/128?u=olivia"
              :size="s"
            />
          </div>
        </div>
        <div>
          <p style="color:#737373;font-size:12px;margin:0 0 12px">Ícone (placeholder)</p>
          <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
            <Avatar v-for="s in sizes" :key="'ph-'+s" placeholder :size="s" />
          </div>
        </div>
        <div>
          <p style="color:#737373;font-size:12px;margin:0 0 12px">Iniciais</p>
          <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
            <Avatar v-for="s in sizes" :key="'tx-'+s" name="Olívia Rhye" :size="s" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const OnlineIndicator: Story = {
  name: 'Online / Offline',
  parameters: storyUsage(`<DoityAvatar name="Olívia" size="md" online />
<DoityAvatar name="Olívia" size="md" status="offline" />`),
  render: () => ({
    components: { Avatar },
    setup: () => ({ sizes }),
    template: `
      <div style="display:grid;gap:24px">
        <div>
          <p style="color:#737373;font-size:12px;margin:0 0 12px">Online</p>
          <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
            <Avatar v-for="s in sizes" :key="'on-'+s" name="Olívia Silva" :size="s" online />
          </div>
        </div>
        <div>
          <p style="color:#737373;font-size:12px;margin:0 0 12px">Offline</p>
          <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
            <Avatar v-for="s in sizes" :key="'off-'+s" name="Olívia Silva" :size="s" status="offline" />
          </div>
        </div>
        <div>
          <p style="color:#737373;font-size:12px;margin:0 0 12px">Com imagem + online</p>
          <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
            <Avatar
              v-for="s in sizes"
              :key="'img-on-'+s"
              src="https://i.pravatar.cc/128?u=olivia"
              :size="s"
              online
            />
          </div>
        </div>
        <div>
          <p style="color:#737373;font-size:12px;margin:0 0 12px">Placeholder + online</p>
          <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap">
            <Avatar v-for="s in sizes" :key="'ph-on-'+s" placeholder :size="s" online />
          </div>
        </div>
      </div>
    `,
  }),
}

export const LabelGroup: Story = {
  name: 'Avatar label group',
  parameters: storyUsage(`<DoityAvatarLabelGroup
  name="Olívia Silva"
  description="olivia@doity.com.br"
  size="md"
  online
/>`),
  render: () => ({
    components: { AvatarLabelGroup },
    template: `
      <div style="display:grid;gap:32px">
        <div>
          <p style="color:#737373;font-size:12px;margin:0 0 16px">Sem status</p>
          <div style="display:flex;flex-wrap:wrap;gap:24px;align-items:center">
            <AvatarLabelGroup
              v-for="s in ['sm','md','lg','xl']"
              :key="'lbl-'+s"
              name="Olívia Silva"
              description="olivia@doity.com.br"
              src="https://i.pravatar.cc/128?u=olivia"
              :size="s"
            />
          </div>
        </div>
        <div>
          <p style="color:#737373;font-size:12px;margin:0 0 16px">Com online</p>
          <div style="display:flex;flex-wrap:wrap;gap:24px;align-items:center">
            <AvatarLabelGroup
              v-for="s in ['sm','md','lg','xl']"
              :key="'lbl-on-'+s"
              name="Olívia Silva"
              description="olivia@doity.com.br"
              src="https://i.pravatar.cc/128?u=olivia"
              :size="s"
              online
            />
          </div>
        </div>
      </div>
    `,
  }),
}

export const Group: Story = {
  name: 'Avatar group',
  parameters: storyUsage(`<DoityAvatarGroup size="md" :max="5" show-add>
  <DoityAvatar name="A" />
  ...
</DoityAvatarGroup>`),
  render: () => ({
    components: { Avatar, AvatarGroup },
    setup() {
      const names = ['Ana', 'Bruno', 'Carla', 'Daniel', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', 'Igor', 'Julia']
      return { names }
    },
    template: `
      <div style="display:grid;gap:28px">
        <div v-for="s in ['xs','sm','md']" :key="s" style="display:grid;gap:12px">
          <p style="color:#737373;font-size:12px;margin:0">size={{ s }}</p>
          <AvatarGroup :size="s" :max="5" show-add>
            <Avatar v-for="n in names" :key="n+s+'a'" :name="n" />
          </AvatarGroup>
          <AvatarGroup :size="s" :max="5" show-add :show-more="false">
            <Avatar v-for="n in names.slice(0,5)" :key="n+s+'b'" :name="n" />
          </AvatarGroup>
          <AvatarGroup :size="s" :max="5">
            <Avatar v-for="n in names" :key="n+s+'c'" :name="n" />
          </AvatarGroup>
          <AvatarGroup :size="s" :max="5" :show-more="false">
            <Avatar v-for="n in names.slice(0,5)" :key="n+s+'d'" :name="n" />
          </AvatarGroup>
        </div>
      </div>
    `,
  }),
}

export const AddButton: Story = {
  name: 'Add button (tooltip)',
  parameters: storyUsage(`<DoityAvatarGroup size="md" show-add @add="..." />`),
  render: () => ({
    components: { Avatar, AvatarGroup },
    template: `
      <div style="display:flex;gap:24px;align-items:center;padding-top:48px">
        <AvatarGroup size="xs" show-add :show-more="false">
          <Avatar name="A" /><Avatar name="B" /><Avatar name="C" />
        </AvatarGroup>
        <AvatarGroup size="sm" show-add :show-more="false">
          <Avatar name="A" /><Avatar name="B" /><Avatar name="C" />
        </AvatarGroup>
        <AvatarGroup size="md" show-add :show-more="false">
          <Avatar name="A" /><Avatar name="B" /><Avatar name="C" />
        </AvatarGroup>
      </div>
    `,
  }),
}
