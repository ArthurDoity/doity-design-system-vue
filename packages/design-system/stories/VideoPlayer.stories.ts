import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import VideoPlayer from '../src/runtime/components/VideoPlayer.vue'
import PlayButton from '../src/runtime/components/PlayButton.vue'
import { doityStoryMeta, storyUsage } from './helpers/doityStoryMeta'

const meta = {
  ...doityStoryMeta('VideoPlayer', VideoPlayer, {
    argTypes: {
      size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    },
    args: {
      size: 'md',
      playing: false,
      progress: 35,
      buffered: 70,
    },
  }),
  title: 'Components/Data/Video Player',
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: storyUsage(`<DoityVideoPlayer size="md" :progress="35" :buffered="70" />`),
  render: args => ({
    components: { VideoPlayer },
    setup() {
      const playing = ref(args.playing)
      return { args, playing }
    },
    template: `
      <VideoPlayer
        v-bind="args"
        v-model:playing="playing"
      />
    `,
  }),
}

export const Sizes: Story = {
  name: 'Tamanhos',
  render: () => ({
    components: { VideoPlayer },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:24px;align-items:flex-start">
        <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-end">
          <VideoPlayer size="xs" />
          <VideoPlayer size="sm" />
          <VideoPlayer size="md" :progress="20" />
          <VideoPlayer size="lg" :progress="20" :buffered="40" />
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-end">
          <VideoPlayer size="xs" playing :progress="40" />
          <VideoPlayer size="sm" playing :progress="40" />
          <VideoPlayer size="md" playing :progress="40" :buffered="75" />
          <VideoPlayer size="lg" playing :progress="40" :buffered="75" />
        </div>
      </div>
    `,
  }),
}

export const PlayButtons: Story = {
  name: 'Play Button',
  render: () => ({
    components: { PlayButton },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:32px;background:#171717;border-radius:12px">
        <div style="display:flex;gap:16px;align-items:center">
          <PlayButton v-for="s in ['xs','sm','md','lg','xl','2xl']" :key="s" :size="s" variant="glass" />
        </div>
        <div style="display:flex;gap:16px;align-items:center">
          <PlayButton v-for="s in ['xs','sm','md','lg','xl','2xl']" :key="s" :size="s" variant="outline" />
        </div>
      </div>
    `,
  }),
}
