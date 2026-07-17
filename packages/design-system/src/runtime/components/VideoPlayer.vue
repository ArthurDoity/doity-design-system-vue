<script setup>
import { computed, ref, watch } from 'vue'
import PlayButton from './PlayButton.vue'
import Button from './Button.vue'

const defaultPoster = new URL('../assets/video/poster.jpg', import.meta.url).href

const props = defineProps({
  /** xs | sm | md | lg | xl */
  size: { type: String, required: false, default: 'md' },
  /** Força estado playing (sem vídeo real) */
  playing: { type: Boolean, required: false, default: false },
  /** Poster / thumbnail */
  poster: { type: String, required: false, default: '' },
  /** 0–100 progresso reproduzido */
  progress: { type: Number, required: false, default: 0 },
  /** 0–100 buffer */
  buffered: { type: Number, required: false, default: 0 },
  /** Mostra controles inferiores (md+) */
  showControls: { type: Boolean, required: false, default: true },
})

const emit = defineEmits(['play', 'pause', 'update:playing', 'seek'])

const isPlaying = ref(props.playing)

watch(
  () => props.playing,
  v => {
    isPlaying.value = v
  },
)

const sizeKey = computed(() => {
  const allowed = ['xs', 'sm', 'md', 'lg', 'xl']
  return allowed.includes(props.size) ? props.size : 'md'
})

const playBtnSize = computed(() => {
  const map = { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' }
  return map[sizeKey.value]
})

const hasBottomControls = computed(
  () => props.showControls && ['md', 'lg', 'xl'].includes(sizeKey.value),
)

const posterSrc = computed(() => props.poster || defaultPoster)

const progressPct = computed(() => Math.min(100, Math.max(0, props.progress)))
const bufferedPct = computed(() =>
  Math.min(100, Math.max(0, Math.max(props.buffered, props.progress))),
)

const rootClasses = computed(() => [
  'doity-video-player',
  `doity-video-player--${sizeKey.value}`,
  {
    'doity-video-player--playing': isPlaying.value,
    'doity-video-player--paused': !isPlaying.value,
  },
])

function toggle() {
  isPlaying.value = !isPlaying.value
  emit('update:playing', isPlaying.value)
  emit(isPlaying.value ? 'play' : 'pause')
}

function onSeek(e) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const pct = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100))
  emit('seek', pct)
}
</script>

<template>
  <div :class="rootClasses">
    <img
      class="doity-video-player__media"
      :src="posterSrc"
      alt=""
      draggable="false"
    >

    <div
      v-if="!isPlaying"
      class="doity-video-player__overlay"
      aria-hidden="true"
    />

    <div
      v-if="hasBottomControls"
      class="doity-video-player__shade"
      aria-hidden="true"
    />

    <div
      v-if="!isPlaying"
      class="doity-video-player__play"
    >
      <PlayButton
        :size="playBtnSize"
        variant="glass"
        @click="toggle"
      />
    </div>

    <div
      v-if="hasBottomControls"
      class="doity-video-player__controls"
    >
      <Button
        class="doity-video-player__toggle"
        hierarchy="link"
        size="sm"
        icon="only"
        type="button"
        :aria-label="isPlaying ? 'Pausar' : 'Reproduzir'"
        @click="toggle"
      >
        <svg
          v-if="!isPlaying"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.2 2.86c0-1.25 1.37-2.02 2.44-1.36l8.35 5.14c1.01.62 1.01 2.1 0 2.72L4.64 14.5C3.57 15.16 2.2 14.39 2.2 13.14V2.86Z"
            fill="currentColor"
          />
        </svg>
        <svg
          v-else
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          aria-hidden="true"
        >
          <rect x="3" y="2.5" width="3.2" height="11" rx="1" fill="currentColor" />
          <rect x="9.8" y="2.5" width="3.2" height="11" rx="1" fill="currentColor" />
        </svg>
      </Button>

      <div
        class="doity-video-player__track"
        role="slider"
        :aria-valuenow="progressPct"
        aria-valuemin="0"
        aria-valuemax="100"
        tabindex="0"
        @click="onSeek"
      >
        <span class="doity-video-player__track-bg" />
        <span
          class="doity-video-player__track-buffer"
          :style="{ width: `${bufferedPct}%` }"
        />
        <span
          class="doity-video-player__track-progress"
          :style="{ width: progressPct > 0 ? `${progressPct}%` : '0%' }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.doity-video-player {
  background: #1a1a1a;
  box-sizing: border-box;
  isolation: isolate;
  overflow: hidden;
  position: relative;
}

.doity-video-player--xs { border-radius: 6px; height: 104px; width: 176px; }
.doity-video-player--sm { border-radius: 6px; height: 136px; width: 240px; }
.doity-video-player--md { border-radius: 8px; height: 192px; width: 343px; }
.doity-video-player--lg { border-radius: 8px; height: 315px; width: 560px; }
.doity-video-player--xl { border-radius: 8px; height: 432px; width: 768px; }

.doity-video-player__media {
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  pointer-events: none;
  position: absolute;
  width: 100%;
  z-index: 0;
}

.doity-video-player__overlay {
  background: rgb(23 23 23 / 52%);
  inset: 0;
  position: absolute;
  z-index: 1;
}

.doity-video-player__shade {
  background: linear-gradient(to bottom, rgb(0 0 0 / 0%), rgb(0 0 0 / 28%));
  bottom: 0;
  height: 40%;
  left: 0;
  max-height: 116px;
  pointer-events: none;
  position: absolute;
  right: 0;
  z-index: 2;
}

.doity-video-player__play {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.doity-video-player__controls {
  align-items: center;
  bottom: 12px;
  display: flex;
  gap: 12px;
  height: 16px;
  left: 12px;
  position: absolute;
  right: 20px;
  z-index: 4;
}

/* Reusa Button (link/icon-only), mas mantém o toggle branco e compacto (16px) */
.doity-video-player__controls .doity-video-player__toggle.doity-btn {
  background: none;
  border: 0;
  color: #fff;
  flex-shrink: 0;
  height: 16px;
  min-height: 16px;
  width: 16px;
}

.doity-video-player__controls .doity-video-player__toggle.doity-btn:hover:not(:disabled),
.doity-video-player__controls .doity-video-player__toggle.doity-btn:active:not(:disabled) {
  background: none;
  color: #fff;
  opacity: 0.85;
}

.doity-video-player__toggle.doity-btn :deep(.doity-btn__icon) {
  height: 16px;
  width: 16px;
}

.doity-video-player__track {
  cursor: pointer;
  flex: 1;
  height: 8px;
  position: relative;
}

.doity-video-player__track-bg,
.doity-video-player__track-buffer,
.doity-video-player__track-progress {
  border-radius: 4px;
  height: 8px;
  left: 0;
  position: absolute;
  top: 0;
}

.doity-video-player__track-bg {
  background: #fff;
  opacity: 0.3;
  right: 0;
  width: 100%;
}

.doity-video-player__track-buffer {
  background: #fff;
  opacity: 0.5;
  transition: width 0.25s ease;
}

.doity-video-player__track-progress {
  background: #fff;
  transition: width 0.25s ease;
}
</style>
