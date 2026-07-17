import type { Meta, StoryObj } from '@storybook/vue3'
import Item from '../src/runtime/components/Item.vue'
import ItemGroup from '../src/runtime/components/ItemGroup.vue'
import Button from '../src/runtime/components/Button.vue'
import Avatar from '../src/runtime/components/Avatar.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Item', Item, {
    argTypes: {
      variant: { control: 'select', options: ['default', 'outline', 'muted'] },
      size: { control: 'select', options: ['default', 'sm'] },
      layout: { control: 'select', options: ['horizontal', 'vertical'] },
    },
    args: {
      title: 'Default Variant',
      description: 'Standard styling with subtle background and borders.',
      variant: 'outline',
      size: 'default',
    },
  }),
  title: 'Components/Data/Item',
} satisfies Meta

export default meta
type Story = StoryObj

const ChevronRight = {
  template: `
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
}

const ExternalLink = {
  template: `
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M6.5 3.5H3.5A1 1 0 0 0 2.5 4.5v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.5M9.5 2.5h4v4M6.5 9.5l7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
}

const PlusIcon = {
  template: `
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `,
}

const ShieldIcon = {
  template: `
    <span class="doity-item__icon-box">
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
        <path d="M8 2.5 12.5 4.5v3.2c0 2.7-1.8 4.6-4.5 5.8-2.7-1.2-4.5-3.1-4.5-5.8V4.5L8 2.5Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
        <path d="M8 6v2.5M8 11h.01" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
      </svg>
    </span>
  `,
}

const BadgeCheck = {
  template: `
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" stroke-width="1.5"/>
      <path d="m7 10 2 2 4-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
}

export const Default: Story = {
  parameters: storyUsage(`<DoityItem title="Default Variant" description="..." variant="outline">
  <template #actions>
    <DoityButton hierarchy="outline" size="sm">Open</DoityButton>
  </template>
</DoityItem>`),
  render: args => ({
    components: { Item, Button },
    setup: () => ({ args }),
    template: `
      <div style="max-width:512px;padding:24px">
        <Item v-bind="args">
          <template #actions>
            <Button hierarchy="outline" size="sm">Open</Button>
          </template>
        </Item>
      </div>
    `,
  }),
}

export const Variants: Story = {
  name: 'Variantes',
  render: () => ({
    components: { Item, Button },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:512px;padding:24px">
        <Item variant="default" title="Default Variant" description="Standard styling with subtle background and borders.">
          <template #actions><Button hierarchy="outline" size="sm">Open</Button></template>
        </Item>
        <Item variant="outline" title="Outline Variant" description="Outlined style with clear borders and transparent background.">
          <template #actions><Button hierarchy="outline" size="sm">Open</Button></template>
        </Item>
        <Item variant="muted" title="Muted Variant" description="Subdued appearance with muted colors for secondary content.">
          <template #actions><Button hierarchy="outline" size="sm">Open</Button></template>
        </Item>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  name: 'Tamanhos',
  render: () => ({
    components: { Item, Button, BadgeCheck, ChevronRight },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:512px;padding:24px">
        <Item title="Basic Item" description="A simple item with title and description.">
          <template #actions><Button hierarchy="outline" size="sm">Action</Button></template>
        </Item>
        <Item size="sm" title="Your profile has been verified." clickable>
          <template #media><BadgeCheck /></template>
          <template #actions><ChevronRight /></template>
        </Item>
      </div>
    `,
  }),
}

export const WithIcon: Story = {
  name: 'Com ícone',
  render: () => ({
    components: { Item, Button, ShieldIcon },
    template: `
      <div style="max-width:512px;padding:24px">
        <Item title="Security Alert" description="New login detected from unknown device.">
          <template #media><ShieldIcon /></template>
          <template #actions><Button hierarchy="outline" size="sm">Review</Button></template>
        </Item>
      </div>
    `,
  }),
}

export const WithAvatar: Story = {
  name: 'Com avatar',
  render: () => ({
    components: { Item, Button, Avatar, PlusIcon },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:512px;padding:24px">
        <Item title="Evil Rabbit" description="Last seen 5 months ago">
          <template #media>
            <Avatar name="Evil Rabbit" size="md" />
          </template>
          <template #actions>
            <Button hierarchy="outline" size="sm" icon="only" aria-label="Adicionar">
              <PlusIcon />
            </Button>
          </template>
        </Item>
        <Item title="No Team Members" description="Invite your team to collaborate on this project.">
          <template #media>
            <div style="display:flex">
              <Avatar name="A" size="sm" style="margin-right:-8px" />
              <Avatar name="B" size="sm" style="margin-right:-8px" />
              <Avatar name="C" size="sm" />
            </div>
          </template>
          <template #actions>
            <Button hierarchy="outline" size="sm">Invite</Button>
          </template>
        </Item>
      </div>
    `,
  }),
}

export const MediaList: Story = {
  name: 'Lista de mídia',
  render: () => ({
    components: { Item },
    setup() {
      const tracks = [
        { title: 'Midnight City Lights', artist: 'Electric Nights', album: 'Neon Dreams', time: '3:45' },
        { title: 'Coffee Shop Conversations', artist: 'Urban Stories', album: 'The Morning Brew', time: '4:05' },
        { title: 'Digital Rain', artist: 'Binary Beats', album: 'Cyber Symphony', time: '3:30' },
      ]
      return { tracks }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:512px;padding:24px">
        <Item
          v-for="t in tracks"
          :key="t.title"
          :description="t.album"
        >
          <template #media>
            <div class="doity-item__thumb" style="background:linear-gradient(135deg,#6366f1,#ec4899);width:40px;height:40px;border-radius:10px" />
          </template>
          <template #title>
            <span>{{ t.title }}</span>
            <span> - </span>
            <span class="doity-item__title-muted">{{ t.artist }}</span>
          </template>
          <template #actions>
            <span class="doity-item__meta">{{ t.time }}</span>
          </template>
        </Item>
      </div>
    `,
  }),
}

export const Group: Story = {
  name: 'Grupo',
  render: () => ({
    components: { Item, ItemGroup, Avatar, PlusIcon },
    template: `
      <div style="max-width:448px;padding:24px">
        <ItemGroup>
          <Item
            v-for="u in [
              { name: 'shadcn', email: 'shadcn@vercel.com' },
              { name: 'maxleiter', email: 'maxleiter@vercel.com' },
              { name: 'evilrabbit', email: 'evilrabbit@vercel.com' },
            ]"
            :key="u.name"
            variant="default"
            :title="u.name"
            :description="u.email"
          >
            <template #media>
              <Avatar :name="u.name" size="sm" />
            </template>
            <template #actions>
              <button type="button" aria-label="Adicionar" style="background:none;border:0;cursor:pointer;display:inline-flex;padding:10px;border-radius:9999px;color:#09090b">
                <PlusIcon />
              </button>
            </template>
          </Item>
        </ItemGroup>
      </div>
    `,
  }),
}

export const Links: Story = {
  name: 'Links',
  render: () => ({
    components: { Item, ChevronRight, ExternalLink },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;max-width:448px;padding:24px">
        <Item
          title="Visit our documentation"
          description="Learn how to get started with our components."
          variant="default"
          clickable
        >
          <template #actions><ChevronRight /></template>
        </Item>
        <Item
          title="External resource"
          description="Opens in a new tab with security attributes."
          variant="outline"
          href="https://ui.shadcn.com/docs/components/item"
          target="_blank"
        >
          <template #actions><ExternalLink /></template>
        </Item>
      </div>
    `,
  }),
}

export const Cards: Story = {
  name: 'Cards verticais',
  render: () => ({
    components: { Item },
    template: `
      <div style="display:flex;gap:16px;padding:24px;flex-wrap:wrap">
        <Item
          v-for="c in [
            { title: 'v0-1.5-sm', desc: 'Everyday tasks and UI generation.', hue: 'linear-gradient(135deg,#a78bfa,#f472b6)' },
            { title: 'v0-1.5-lg', desc: 'Advanced thinking or reasoning.', hue: 'linear-gradient(135deg,#60a5fa,#34d399)' },
            { title: 'v0-2.0-mini', desc: 'Open Source model for everyone.', hue: 'linear-gradient(135deg,#fbbf24,#f97316)' },
          ]"
          :key="c.title"
          layout="vertical"
          :title="c.title"
          :description="c.desc"
          style="width:181px"
        >
          <template #media>
            <div class="doity-item__cover" :style="{ background: c.hue, height: '146px', borderRadius: '6px' }" />
          </template>
        </Item>
      </div>
    `,
  }),
}
