import type { Meta, StoryObj } from '@storybook/vue3'
import Avatar from '../src/runtime/components/Avatar.vue'
import AvatarGroup from '../src/runtime/components/AvatarGroup.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Avatar', Avatar),
} satisfies Meta

export default meta
type Story = StoryObj

export const AllSizes: Story = {
  parameters: storyUsage(`<DoityAvatar name="Ana Silva" size="xs" />
<DoityAvatar name="Bruno Costa" size="sm" />
<DoityAvatar name="Carla Dias" size="md" />
<DoityAvatar name="Daniel Lima" size="lg" />
<DoityAvatar name="Eduardo Leandro" size="xl" />
<DoityAvatar name="Fernanda Rocha" size="2xl" />`),
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <Avatar name="Ana Silva" size="xs" />
        <Avatar name="Bruno Costa" size="sm" />
        <Avatar name="Carla Dias" size="md" />
        <Avatar name="Daniel Lima" size="lg" />
        <Avatar name="Eduardo Leandro" size="xl" />
        <Avatar name="Fernanda Rocha" size="2xl" />
      </div>
    `,
  }),
}

export const OnlineAndPlaceholder: Story = {
  parameters: storyUsage(`<DoityAvatar name="Online User" size="md" :online="true" />
<DoityAvatar placeholder size="md" />`),
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <Avatar name="Online User" size="md" online />
        <Avatar placeholder size="md" />
      </div>
    `,
  }),
}

export const Group: Story = {
  parameters: storyUsage(`<DoityAvatarGroup size="md" show-add>
  <DoityAvatar name="Ana Silva" size="md" />
  <DoityAvatar name="Bruno Costa" size="md" />
  <DoityAvatar name="Carla Dias" size="md" />
  <DoityAvatar name="Daniel Lima" size="md" />
  <DoityAvatar name="Eduardo Leandro" size="md" />
</DoityAvatarGroup>`),
  render: () => ({
    components: { Avatar, AvatarGroup },
    template: `
      <AvatarGroup size="md" show-add>
        <Avatar name="Ana Silva" size="md" />
        <Avatar name="Bruno Costa" size="md" />
        <Avatar name="Carla Dias" size="md" />
        <Avatar name="Daniel Lima" size="md" />
        <Avatar name="Eduardo Leandro" size="md" />
      </AvatarGroup>
    `,
  }),
}
