import type { Meta, StoryObj } from '@storybook/vue3'
import Empty from '../src/runtime/components/Empty.vue'
import Button from '../src/runtime/components/Button.vue'
import Input from '../src/runtime/components/Input.vue'
import Avatar from '../src/runtime/components/Avatar.vue'
import AvatarGroup from '../src/runtime/components/AvatarGroup.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Empty', Empty, {
    argTypes: {
      variant: { control: 'select', options: ['default', 'outline', 'muted'] },
      size: { control: 'select', options: ['sm', 'md', 'lg'] },
    },
    args: {
      variant: 'default',
      size: 'md',
      title: 'No Projects Yet',
      description: "You haven't created any projects yet. Get started by creating your first project.",
      primaryLabel: 'Create Project',
      secondaryLabel: 'Import Project',
      linkLabel: 'Learn More',
    },
  }),
  title: 'Components/Feedback/Empty',
} satisfies Meta

export default meta
type Story = StoryObj

const IconFolder = {
  template: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4.379a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 12.121 8H19.5A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}
const IconCloud = {
  template: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.03 8.4 4.5 4.5 0 0 0 7 18Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}
const IconBell = {
  template: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M6 9a6 6 0 1 1 12 0c0 3.5 1.5 5 1.5 5H4.5S6 12.5 6 9ZM10 19a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}
const IconRefresh = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M13.333 6.667A5.333 5.333 0 1 0 12 12M13.333 3.333V6.667H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
}
const IconPlus = {
  template: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true"><path d="M8 3.333V12.667M3.333 8H12.667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
}

export const Default: Story = {
  name: 'Projects (default)',
  parameters: storyUsage(`<DoityEmpty
  title="No Projects Yet"
  description="You haven't created any projects yet. Get started by creating your first project."
  primary-label="Create Project"
  secondary-label="Import Project"
  link-label="Learn More"
/>`),
  render: args => ({
    components: { Empty, IconFolder },
    setup: () => ({ args }),
    template: `
      <Empty v-bind="args">
        <template #icon><IconFolder /></template>
      </Empty>
    `,
  }),
}

export const Outline: Story = {
  name: 'Outline (cloud)',
  parameters: storyUsage(`<DoityEmpty
  variant="outline"
  title="Cloud Storage Empty"
  description="Upload files to your cloud storage to access them anywhere."
  primary-label=""
  secondary-label="Upload Files"
/>`),
  render: () => ({
    components: { Empty, IconCloud },
    template: `
      <Empty
        variant="outline"
        title="Cloud Storage Empty"
        description="Upload files to your cloud storage to access them anywhere."
        primary-label=""
        secondary-label="Upload Files"
      >
        <template #icon><IconCloud /></template>
      </Empty>
    `,
  }),
}

export const Muted: Story = {
  name: 'Muted (notifications)',
  parameters: storyUsage(`<DoityEmpty
  variant="muted"
  title="No Notifications"
  description="You're all caught up. New notifications will appear here."
/>`),
  render: () => ({
    components: { Empty, Button, IconBell, IconRefresh },
    template: `
      <Empty
        variant="muted"
        title="No Notifications"
        description="You're all caught up. New notifications will appear here."
        primary-label=""
        secondary-label=""
      >
        <template #icon><IconBell /></template>
        <template #actions>
          <Button hierarchy="outline" size="sm" icon="leading">
            <template #icon-leading><IconRefresh /></template>
            Refresh
          </Button>
        </template>
      </Empty>
    `,
  }),
}

export const WithAvatar: Story = {
  name: 'Avatar (offline)',
  parameters: storyUsage(`<DoityEmpty title="User Offline" primary-label="Leave Message">
  <template #media><DoityAvatar ... /></template>
</DoityEmpty>`),
  render: () => ({
    components: { Empty, Avatar },
    template: `
      <Empty
        title="User Offline"
        description="This user is currently offline. You can leave a message to notify them or try again later."
        primary-label="Leave Message"
        secondary-label=""
      >
        <template #media>
          <Avatar
            src="https://i.pravatar.cc/96?u=offline"
            name="User"
            size="lg"
          />
        </template>
      </Empty>
    `,
  }),
}

export const WithAvatarGroup: Story = {
  name: 'Avatar group (team)',
  parameters: storyUsage(`<DoityEmpty title="No Team Members" primary-label="Invite Members">
  <template #media><DoityAvatarGroup>...</DoityAvatarGroup></template>
</DoityEmpty>`),
  render: () => ({
    components: { Empty, Avatar, AvatarGroup, Button, IconPlus },
    template: `
      <Empty
        title="No Team Members"
        description="Invite your team to collaborate on this project."
        primary-label=""
        secondary-label=""
      >
        <template #media>
          <AvatarGroup :max="3" :show-more="false" size="md">
            <Avatar src="https://i.pravatar.cc/96?u=t1" name="A" size="md" />
            <Avatar src="https://i.pravatar.cc/96?u=t2" name="B" size="md" />
            <Avatar src="https://i.pravatar.cc/96?u=t3" name="C" size="md" />
          </AvatarGroup>
        </template>
        <template #actions>
          <Button hierarchy="primary" size="sm" icon="leading">
            <template #icon-leading><IconPlus /></template>
            Invite Members
          </Button>
        </template>
      </Empty>
    `,
  }),
}

export const WithSearch: Story = {
  name: '404 + search',
  parameters: storyUsage(`<DoityEmpty
  title="404 - Not Found"
  description="The page you're looking for doesn't exist."
  :hide-icon="true"
  :hide-actions="true"
>
  <DoityInput variant="search" placeholder="Try searching for pages..." />
  <template #footer>Need help? <a href="#">Contact support</a></template>
</DoityEmpty>`),
  render: () => ({
    components: { Empty, Input },
    template: `
      <Empty
        title="404 - Not Found"
        description="The page you're looking for doesn't exist. Try searching for what you need below."
        :hide-icon="true"
        :hide-actions="true"
      >
        <Input
          variant="search"
          placeholder="Try searching for pages..."
          :clearable="false"
          style="width:288px;max-width:100%"
        />
        <template #footer>
          <span style="color:var(--doity-color-text-secondary);font-size:14px;font-weight:500;line-height:20px">
            Need help?
            <a href="#" style="margin-left:4px;text-decoration:underline;text-underline-offset:2px">Contact support</a>
          </span>
        </template>
      </Empty>
    `,
  }),
}
