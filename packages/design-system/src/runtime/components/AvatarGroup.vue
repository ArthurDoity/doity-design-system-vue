<script setup>
import { Comment, Fragment, Text, cloneVNode, computed, useSlots } from 'vue'
import Tooltip from './Tooltip.vue'

const props = defineProps({
  /** xs 24 · sm 32 · md 40 (tamanhos do Figma Avatar group) */
  size: { type: String, required: false, default: 'md' },
  /** Máximo de avatares visíveis antes do +N */
  max: { type: Number, required: false, default: 5 },
  /** Contagem total (se maior que os filhos, sobrescreve o overflow) */
  total: { type: Number, required: false, default: undefined },
  showAdd: { type: Boolean, required: false, default: false },
  showMore: { type: Boolean, required: false, default: true },
  addLabel: { type: String, required: false, default: 'Adicionar usuário' },
  disabledAdd: { type: Boolean, required: false, default: false },
})

const emit = defineEmits(['add'])
const slots = useSlots()

const sizeKey = computed(() => {
  if (props.size === 'xs' || props.size === 'sm' || props.size === 'md') return props.size
  return 'md'
})

function flatten(nodes) {
  const result = []
  for (const vnode of nodes ?? []) {
    if (!vnode || vnode.type === Comment || vnode.type === Text) continue
    if (vnode.type === Fragment) {
      result.push(...flatten(vnode.children))
      continue
    }
    result.push(vnode)
  }
  return result
}

const children = computed(() => flatten(slots.default?.() ?? []))

const visible = computed(() =>
  children.value.slice(0, props.max).map((vnode, i) =>
    cloneVNode(vnode, {
      size: sizeKey.value,
      key: vnode.key ?? `avatar-${i}`,
      class: [
        vnode.props?.class,
        'doity-avatar-group__item',
        i > 0 ? 'doity-avatar-group__item--overlap' : null,
      ],
    }),
  ),
)

const overflow = computed(() => {
  if (props.total != null) return Math.max(0, props.total - props.max)
  return Math.max(0, children.value.length - props.max)
})

const showOverflow = computed(() => props.showMore && overflow.value > 0)

function onAdd() {
  if (props.disabledAdd) return
  emit('add')
}
</script>

<template>
  <div
    class="doity-avatar-group"
    :class="[
      `doity-avatar-group--${sizeKey}`,
      {
        'doity-avatar-group--with-add': showAdd,
        'doity-avatar-group--with-more': showOverflow,
      },
    ]"
    role="group"
  >
    <div class="doity-avatar-group__stack">
      <component
        :is="vnode"
        v-for="vnode in visible"
        :key="vnode.key"
      />

      <span
        v-if="showOverflow"
        class="doity-avatar-group__more"
        :aria-label="`${overflow} usuários a mais`"
      >
        +{{ overflow }}
      </span>
    </div>

    <Tooltip
      v-if="showAdd"
      :content="addLabel"
      theme="dark"
      position="top"
      :delay="100"
    >
      <button
        type="button"
        class="doity-avatar-group__add"
        :disabled="disabledAdd"
        :aria-label="addLabel"
        @click="onAdd"
      >
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 3.333v9.334M3.333 8h9.334"
            stroke="currentColor"
            stroke-width="1.33"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </Tooltip>
  </div>
</template>

<style scoped>
.doity-avatar-group {
  align-items: center;
  display: inline-flex;
  vertical-align: middle;
}

.doity-avatar-group--with-add {
  gap: 8px;
}

.doity-avatar-group--xs.doity-avatar-group--with-add:not(.doity-avatar-group--with-more) {
  gap: 12px;
}

.doity-avatar-group--sm.doity-avatar-group--with-add:not(.doity-avatar-group--with-more) {
  gap: 16px;
}

.doity-avatar-group--md.doity-avatar-group--with-add:not(.doity-avatar-group--with-more) {
  gap: 20px;
}

.doity-avatar-group--xs.doity-avatar-group--with-add.doity-avatar-group--with-more {
  gap: 8px;
}

.doity-avatar-group--sm.doity-avatar-group--with-add.doity-avatar-group--with-more {
  gap: 12px;
}

.doity-avatar-group--md.doity-avatar-group--with-add.doity-avatar-group--with-more {
  gap: 16px;
}

.doity-avatar-group__stack {
  align-items: center;
  display: flex;
}

.doity-avatar-group__stack :deep(.doity-avatar) {
  border: 1.5px solid var(--doity-color-background-primary, #fff);
  box-sizing: border-box;
}

.doity-avatar-group--xs :deep(.doity-avatar-group__item--overlap),
.doity-avatar-group--xs .doity-avatar-group__more {
  margin-left: -4px;
}

.doity-avatar-group--sm :deep(.doity-avatar-group__item--overlap),
.doity-avatar-group--sm .doity-avatar-group__more {
  margin-left: -8px;
}

.doity-avatar-group--md :deep(.doity-avatar-group__item--overlap),
.doity-avatar-group--md .doity-avatar-group__more {
  margin-left: -12px;
}

.doity-avatar-group__more {
  align-items: center;
  background: var(--doity-color-background-secondary, #f5f5f5);
  border: 1.5px solid var(--doity-color-background-primary, #fff);
  border-radius: var(--doity-radius-full, 9999px);
  box-sizing: border-box;
  color: var(--doity-color-text-primary, #0a0a0a);
  display: inline-flex;
  flex-shrink: 0;
  font-family: var(--doity-font-family-sans);
  font-weight: var(--doity-font-weight-medium, 500);
  justify-content: center;
  user-select: none;
}

.doity-avatar-group--xs .doity-avatar-group__more {
  font-size: 12px;
  height: 24px;
  line-height: 18px;
  width: 24px;
}

.doity-avatar-group--sm .doity-avatar-group__more {
  font-size: 14px;
  height: 32px;
  line-height: 20px;
  width: 32px;
}

.doity-avatar-group--md .doity-avatar-group__more {
  font-size: 16px;
  height: 40px;
  line-height: 24px;
  width: 40px;
}

.doity-avatar-group__add {
  align-items: center;
  background: var(--doity-color-background-primary, #fff);
  border: 1px dashed var(--doity-color-border-strong, #d4d4d4);
  border-radius: var(--doity-radius-full, 9999px);
  box-sizing: border-box;
  color: #a4a7ae;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  margin: 0;
  padding: 0;
  transition:
    background-color 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.2s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-avatar-group--xs .doity-avatar-group__add {
  height: 24px;
  width: 24px;
}

.doity-avatar-group--sm .doity-avatar-group__add {
  height: 32px;
  width: 32px;
}

.doity-avatar-group--md .doity-avatar-group__add {
  height: 40px;
  width: 40px;
}

.doity-avatar-group__add:hover:not(:disabled) {
  background: var(--doity-color-background-secondary, #fafafa);
  color: var(--doity-color-text-primary, #0a0a0a);
}

.doity-avatar-group__add:focus-visible {
  box-shadow: 0 0 0 4px #f2f3f5;
  outline: none;
}

.doity-avatar-group__add:disabled {
  background: var(--doity-color-background-secondary, #fafafa);
  border-color: var(--doity-color-border-default, #e5e5e5);
  color: var(--doity-color-text-disabled, #d4d4d4);
  cursor: not-allowed;
}

.doity-avatar-group__add svg {
  display: block;
  height: 16px;
  width: 16px;
}
</style>
