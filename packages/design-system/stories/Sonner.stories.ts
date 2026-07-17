import type { Meta, StoryObj } from '@storybook/vue3'
import Sonner from '../src/runtime/components/Sonner.vue'
import Button from '../src/runtime/components/Button.vue'
import { useDoityToast } from '../src/runtime/composables/useDoityToast'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('Sonner', Sonner),
  title: 'Components/Feedback/Sonner',
} satisfies Meta

export default meta
type Story = StoryObj

export const AllVariants: Story = {
  parameters: storyUsage(`<script setup>
const { toast, success, error, warning, info, loading } = useDoityToast()
</script>

<template>
  <DoityButton size="sm" @click="toast('Event has been created')">Default</DoityButton>
  <DoityButton size="sm" @click="success('Event has been created')">Success</DoityButton>
  <DoityButton size="sm" hierarchy="outline" @click="info('Be at the area 10 minutes before the event')">Info</DoityButton>
  <DoityButton size="sm" hierarchy="outline" @click="warning('Event start time cannot be earlier than 8am')">Warning</DoityButton>
  <DoityButton size="sm" hierarchy="outline" @click="error('Event has not been created')">Error</DoityButton>
  <DoityButton size="sm" hierarchy="outline" @click="loading()">Loading</DoityButton>
  <DoityButton
    size="sm"
    hierarchy="outline"
    @click="toast({
      title: 'Event has been created',
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: { label: 'Undo' },
    })"
  >Com ação</DoityButton>
  <DoitySonner />
</template>`),
  render: () => ({
    components: { Sonner, Button },
    setup() {
      const { toast, success, error, warning, info, loading, dismissAll } = useDoityToast()
      return {
        toast,
        success,
        error,
        warning,
        info,
        loading,
        dismissAll,
        withAction: () =>
          toast({
            title: 'Event has been created',
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: { label: 'Undo' },
          }),
      }
    },
    template: `
      <div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          <Button size="sm" hierarchy="outline" @click="toast('Event has been created')">Default</Button>
          <Button size="sm" @click="success('Event has been created')">Success</Button>
          <Button size="sm" hierarchy="outline" @click="info('Be at the area 10 minutes before the event')">Info</Button>
          <Button size="sm" hierarchy="outline" @click="warning('Event start time cannot be earlier than 8am')">Warning</Button>
          <Button size="sm" hierarchy="outline" @click="error('Event has not been created')">Error</Button>
          <Button size="sm" hierarchy="outline" @click="loading()">Loading</Button>
          <Button size="sm" hierarchy="outline" @click="withAction">Com ação</Button>
          <Button size="sm" hierarchy="ghost" @click="dismissAll">Limpar</Button>
        </div>
        <Sonner />
      </div>
    `,
  }),
}
