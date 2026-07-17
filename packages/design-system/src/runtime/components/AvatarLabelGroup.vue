<script setup>
import { computed } from 'vue'
import Avatar from './Avatar.vue'

const props = defineProps({
  src: { type: String, required: false },
  name: { type: String, required: false, default: '' },
  /** Texto de apoio (e-mail, handle, etc.) */
  description: { type: String, required: false, default: '' },
  /** sm 32 · md 40 · lg 48 · xl 56 */
  size: { type: String, required: false, default: 'md' },
  status: { type: [Boolean, String], required: false, default: false },
  online: { type: Boolean, required: false, default: false },
  placeholder: { type: Boolean, required: false, default: false },
})

const sizeKey = computed(() => {
  const allowed = ['sm', 'md', 'lg', 'xl']
  return allowed.includes(props.size) ? props.size : 'md'
})

const avatarSize = computed(() => sizeKey.value)

const classes = computed(() => [
  'doity-avatar-label',
  `doity-avatar-label--${sizeKey.value}`,
])
</script>

<template>
  <div :class="classes">
    <slot name="avatar">
      <Avatar
        :src="src"
        :name="name"
        :size="avatarSize"
        :status="status"
        :online="online"
        :placeholder="placeholder"
      />
    </slot>

    <div
      v-if="name || description || $slots.default || $slots.description"
      class="doity-avatar-label__text"
    >
      <p
        v-if="name || $slots.default"
        class="doity-avatar-label__name"
      >
        <slot>{{ name }}</slot>
      </p>
      <p
        v-if="description || $slots.description"
        class="doity-avatar-label__description"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
  </div>
</template>

<style scoped>
.doity-avatar-label {
  align-items: center;
  display: inline-flex;
  font-family: var(--doity-font-family-sans);
  max-width: 100%;
  min-width: 0;
  vertical-align: middle;
}

.doity-avatar-label--sm {
  gap: 10px;
}

.doity-avatar-label--md {
  gap: 12px;
}

.doity-avatar-label--lg {
  gap: 12px;
}

.doity-avatar-label--xl {
  gap: 16px;
}

.doity-avatar-label__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.doity-avatar-label__name {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-weight: var(--doity-font-weight-semibold, 600);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doity-avatar-label__description {
  color: var(--doity-color-text-secondary, #737373);
  font-weight: var(--doity-font-weight-regular, 400);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doity-avatar-label--sm .doity-avatar-label__name,
.doity-avatar-label--md .doity-avatar-label__name {
  font-size: 12px;
  line-height: 16px;
}

.doity-avatar-label--sm .doity-avatar-label__description {
  font-size: 12px;
  line-height: 18px;
}

.doity-avatar-label--md .doity-avatar-label__description {
  font-size: 12px;
  line-height: 16px;
}

.doity-avatar-label--lg .doity-avatar-label__name {
  font-size: 14px;
  line-height: 20px;
}

.doity-avatar-label--lg .doity-avatar-label__description {
  font-size: 14px;
  line-height: 20px;
}

.doity-avatar-label--xl .doity-avatar-label__name {
  font-size: 16px;
  line-height: 24px;
}

.doity-avatar-label--xl .doity-avatar-label__description {
  font-size: 14px;
  line-height: 20px;
}
</style>
