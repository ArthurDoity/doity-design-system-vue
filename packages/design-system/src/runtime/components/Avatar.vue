<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, required: false },
  alt: { type: String, required: false },
  name: { type: String, required: false },
  /** xs 24 · sm 32 · md 40 · lg 48 · xl 56 · 2xl 64 */
  size: { type: String, required: false, default: 'md' },
  /**
   * Indicador de presença (Figma Online indicator).
   * true / 'online' — verde · 'offline' — cinza · false — oculto
   * Alias: `online` boolean
   */
  status: { type: [Boolean, String], required: false, default: false },
  /** Alias de status=true (API legada) */
  online: { type: Boolean, required: false, default: false },
  /** Força ícone de usuário (placeholder) em vez de iniciais */
  placeholder: { type: Boolean, required: false, default: false },
})

const sizeKey = computed(() => {
  const allowed = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
  return allowed.includes(props.size) ? props.size : 'md'
})

const statusKey = computed(() => {
  if (props.online === true || props.status === true || props.status === 'online') return 'online'
  if (props.status === 'offline') return 'offline'
  return null
})

const initials = computed(() => {
  if (!props.name) return ''
  return props.name
    .split(/\s+/)
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

const mode = computed(() => {
  if (props.src && !props.placeholder) return 'image'
  if (props.placeholder || (!props.src && !props.name)) return 'icon'
  return 'text'
})

const classes = computed(() => [
  'doity-avatar',
  `doity-avatar--${sizeKey.value}`,
  `doity-avatar--${mode.value}`,
])
</script>

<template>
  <span
    :class="classes"
    role="img"
    :aria-label="alt || name || 'Avatar'"
  >
    <span class="doity-avatar__media">
      <img
        v-if="mode === 'image'"
        :src="src"
        :alt="alt || name || ''"
        class="doity-avatar__img"
      >

      <span
        v-else-if="mode === 'text'"
        class="doity-avatar__text"
        aria-hidden="true"
      >{{ initials }}</span>

      <span
        v-else
        class="doity-avatar__icon"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          class="doity-avatar__icon-svg"
        >
          <path
            d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.5 19.5a7.5 7.5 0 0 1 15 0"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </span>

    <span
      v-if="statusKey"
      class="doity-avatar__status"
      :class="`doity-avatar__status--${statusKey}`"
      :aria-label="statusKey === 'online' ? 'Online' : 'Offline'"
    />
  </span>
</template>

<style scoped>
.doity-avatar {
  display: inline-flex;
  flex-shrink: 0;
  position: relative;
  vertical-align: middle;
}

.doity-avatar__media {
  align-items: center;
  background: var(--doity-color-background-secondary, #f5f5f5);
  border-radius: var(--doity-radius-full, 9999px);
  box-sizing: border-box;
  color: var(--doity-color-text-primary, #0a0a0a);
  display: inline-flex;
  font-family: var(--doity-font-family-sans);
  font-weight: var(--doity-font-weight-medium, 500);
  height: 100%;
  justify-content: center;
  overflow: hidden;
  width: 100%;
}

.doity-avatar--image .doity-avatar__media {
  background: transparent;
}

.doity-avatar--xs {
  font-size: 10px;
  height: 24px;
  line-height: 14px;
  width: 24px;
}

.doity-avatar--sm {
  font-size: 12px;
  height: 32px;
  line-height: 16px;
  width: 32px;
}

.doity-avatar--md {
  font-size: 14px;
  height: 40px;
  line-height: 20px;
  width: 40px;
}

.doity-avatar--lg {
  font-size: 16px;
  height: 48px;
  line-height: 24px;
  width: 48px;
}

.doity-avatar--xl {
  font-size: 18px;
  height: 56px;
  line-height: 28px;
  width: 56px;
}

.doity-avatar--2xl {
  font-size: 20px;
  height: 64px;
  line-height: 30px;
  width: 64px;
}

.doity-avatar__img {
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.doity-avatar__text {
  letter-spacing: -0.02em;
  line-height: 1;
  user-select: none;
}

.doity-avatar__icon {
  align-items: center;
  color: var(--doity-color-text-secondary, #737373);
  display: inline-flex;
  height: 55%;
  justify-content: center;
  width: 55%;
}

.doity-avatar__icon-svg {
  display: block;
  height: 100%;
  width: 100%;
}

.doity-avatar__status {
  border: 1.5px solid var(--doity-color-background-primary, #fff);
  border-radius: var(--doity-radius-full, 9999px);
  bottom: 0;
  box-sizing: border-box;
  position: absolute;
  right: 0;
  z-index: 1;
}

.doity-avatar__status--online {
  background: #12b76a;
}

.doity-avatar__status--offline {
  background: #d5d7da;
}

.doity-avatar--xs .doity-avatar__status {
  height: 6px;
  width: 6px;
}

.doity-avatar--sm .doity-avatar__status {
  height: 8px;
  width: 8px;
}

.doity-avatar--md .doity-avatar__status {
  height: 10px;
  width: 10px;
}

.doity-avatar--lg .doity-avatar__status {
  height: 12px;
  width: 12px;
}

.doity-avatar--xl .doity-avatar__status {
  height: 14px;
  width: 14px;
}

.doity-avatar--2xl .doity-avatar__status {
  height: 16px;
  width: 16px;
}
</style>
