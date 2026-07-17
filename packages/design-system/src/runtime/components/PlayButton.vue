<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** xs | sm | md | lg | xl | 2xl */
  size: { type: String, required: false, default: 'md' },
  /** glass | outline */
  variant: { type: String, required: false, default: 'glass' },
  label: { type: String, required: false, default: 'Reproduzir' },
})

const emit = defineEmits(['click'])

const sizeKey = computed(() => {
  const allowed = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
  return allowed.includes(props.size) ? props.size : 'md'
})

const variantKey = computed(() => (props.variant === 'outline' ? 'outline' : 'glass'))

const rootClasses = computed(() => [
  'doity-play-button',
  `doity-play-button--${sizeKey.value}`,
  `doity-play-button--${variantKey.value}`,
])
</script>

<template>
  <button
    type="button"
    :class="rootClasses"
    :aria-label="label"
    @click="emit('click', $event)"
  >
    <span class="doity-play-button__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M8.2 5.86c0-1.25 1.37-2.02 2.44-1.36l8.35 5.14c1.02.62 1.02 2.1 0 2.72l-8.35 5.14c-1.07.66-2.44-.11-2.44-1.36V5.86Z"
          fill="currentColor"
        />
      </svg>
    </span>
  </button>
</template>

<style scoped>
.doity-play-button {
  align-items: center;
  background: rgb(23 23 23 / 48%);
  border: 0;
  border-radius: 50%;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  padding: 0;
  transition:
    background 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-play-button--glass {
  backdrop-filter: blur(16px);
  background: rgb(23 23 23 / 48%);
  box-shadow: 0 0 0 1px rgb(255 255 255 / 18%);
  color: #fff;
}

.doity-play-button--outline {
  background: transparent;
  border: 1.5px solid #fff;
  color: #fff;
}

.doity-play-button:hover {
  background: rgb(23 23 23 / 72%);
  transform: scale(1.04);
}

.doity-play-button--outline:hover {
  background: rgb(255 255 255 / 12%);
}

.doity-play-button:active {
  transform: scale(0.96);
}

.doity-play-button--xs { height: 48px; width: 48px; }
.doity-play-button--sm { height: 56px; width: 56px; }
.doity-play-button--md { height: 64px; width: 64px; }
.doity-play-button--lg { height: 72px; width: 72px; }
.doity-play-button--xl { height: 80px; width: 80px; }
.doity-play-button--2xl { height: 88px; width: 88px; }

.doity-play-button__icon {
  display: inline-flex;
  margin-left: 2px;
}

.doity-play-button--xs .doity-play-button__icon { height: 18px; width: 18px; }
.doity-play-button--sm .doity-play-button__icon { height: 20px; width: 20px; }
.doity-play-button--md .doity-play-button__icon { height: 22px; width: 22px; }
.doity-play-button--lg .doity-play-button__icon { height: 24px; width: 24px; }
.doity-play-button--xl .doity-play-button__icon { height: 26px; width: 26px; }
.doity-play-button--2xl .doity-play-button__icon { height: 28px; width: 28px; }

.doity-play-button__icon svg {
  display: block;
  height: 100%;
  width: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .doity-play-button {
    transition: none;
  }
}
</style>
