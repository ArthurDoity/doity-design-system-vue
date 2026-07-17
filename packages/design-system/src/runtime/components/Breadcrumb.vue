<script setup>
import { computed } from 'vue'
import Dropdown from './Dropdown.vue'

/**
 * Breadcrumb (Figma).
 * items: { label, href?, to?, dropdown?: [{ label, href?, value? }], current? }[]
 * separator: slash | chevron
 * maxItems: colapsa o meio com ellipsis quando items.length > maxItems
 */
const props = defineProps({
  items: { type: Array, required: false, default: () => [] },
  /** slash | chevron */
  separator: { type: String, required: false, default: 'chevron' },
  /**
   * Máximo de itens visíveis. Ex.: 3 → Home / … / penúltimo / atual
   * Sem valor = mostra todos.
   */
  maxItems: { type: Number, required: false, default: undefined },
})

const emit = defineEmits(['select', 'ellipsis-select'])

const isSlash = computed(() => props.separator === 'slash')

const visible = computed(() => {
  const list = props.items || []
  const max = props.maxItems
  if (!max || list.length <= max || max < 2) {
    return list.map((item, index) => ({ item, index, type: 'item' }))
  }

  // Mantém o primeiro + (maxItems - 2) últimos, com ellipsis no meio
  const tailCount = Math.max(1, max - 2)
  const head = { item: list[0], index: 0, type: 'item' }
  const hidden = list.slice(1, list.length - tailCount).map((item, i) => ({
    ...item,
    value: item.value ?? item.href ?? item.label,
    _index: i + 1,
  }))
  const tail = list.slice(list.length - tailCount).map((item, i) => ({
    item,
    index: list.length - tailCount + i,
    type: 'item',
  }))

  return [
    head,
    { type: 'ellipsis', hidden },
    ...tail,
  ]
})

function isCurrent(index) {
  const list = props.items || []
  const item = list[index]
  if (item?.current) return true
  return index === list.length - 1
}

function onSelect(item, index) {
  emit('select', { item, index })
}

function onEllipsisSelect(entry) {
  emit('ellipsis-select', entry)
  emit('select', { item: entry, index: entry._index })
}

function onDropdownSelect(parent, entry) {
  emit('select', { item: entry, parent })
}
</script>

<template>
  <nav
    class="doity-breadcrumb"
    :class="{ 'doity-breadcrumb--slash': isSlash }"
    aria-label="Breadcrumb"
  >
    <ol class="doity-breadcrumb__list">
      <slot>
        <template
          v-for="(node, ni) in visible"
          :key="node.type === 'ellipsis' ? 'ellipsis' : node.index"
        >
          <!-- Ellipsis (itens colapsados) -->
          <li
            v-if="node.type === 'ellipsis'"
            class="doity-breadcrumb__item"
          >
            <Dropdown
              v-if="node.hidden?.length"
              :items="node.hidden"
              @select="onEllipsisSelect"
            >
              <template #trigger>
                <button
                  type="button"
                  class="doity-breadcrumb__ellipsis"
                  aria-label="Mostrar mais"
                >
                  <svg viewBox="0 0 14 14" width="14" height="14" fill="none" aria-hidden="true">
                    <circle cx="3" cy="7" r="1.25" fill="currentColor" />
                    <circle cx="7" cy="7" r="1.25" fill="currentColor" />
                    <circle cx="11" cy="7" r="1.25" fill="currentColor" />
                  </svg>
                </button>
              </template>
            </Dropdown>
            <span
              v-else
              class="doity-breadcrumb__ellipsis"
              aria-hidden="true"
            >
              <svg viewBox="0 0 14 14" width="14" height="14" fill="none">
                <circle cx="3" cy="7" r="1.25" fill="currentColor" />
                <circle cx="7" cy="7" r="1.25" fill="currentColor" />
                <circle cx="11" cy="7" r="1.25" fill="currentColor" />
              </svg>
            </span>
            <span class="doity-breadcrumb__sep" aria-hidden="true">
              <svg
                v-if="isSlash"
                viewBox="0 0 14 14"
                width="14"
                height="14"
                fill="none"
              >
                <path d="M9.5 2.5 4.5 11.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
              </svg>
              <svg
                v-else
                viewBox="0 0 14 14"
                width="14"
                height="14"
                fill="none"
              >
                <path d="M5 3.5 9 7 5 10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </li>

          <!-- Item normal -->
          <li
            v-else
            class="doity-breadcrumb__item"
            :class="{ 'doity-breadcrumb__item--current': isCurrent(node.index) }"
          >
            <!-- Item com dropdown -->
            <Dropdown
              v-if="node.item.dropdown?.length && !isCurrent(node.index)"
              :items="node.item.dropdown"
              @select="onDropdownSelect(node.item, $event)"
            >
              <template #trigger>
                <button
                  type="button"
                  class="doity-breadcrumb__link doity-breadcrumb__link--dropdown"
                >
                  <span>{{ node.item.label }}</span>
                  <svg
                    class="doity-breadcrumb__chevron-down"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6.5 8 10.5 12 6.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </template>
            </Dropdown>

            <!-- Link -->
            <a
              v-else-if="(node.item.href || node.item.to) && !isCurrent(node.index)"
              :href="node.item.href || node.item.to"
              class="doity-breadcrumb__link"
              @click="onSelect(node.item, node.index)"
            >
              {{ node.item.label }}
            </a>

            <!-- Atual / texto -->
            <span
              v-else
              class="doity-breadcrumb__current"
              :aria-current="isCurrent(node.index) ? 'page' : undefined"
            >
              {{ node.item.label }}
            </span>

            <!-- Separador (exceto no último visível) -->
            <span
              v-if="ni < visible.length - 1"
              class="doity-breadcrumb__sep"
              aria-hidden="true"
            >
              <svg
                v-if="isSlash"
                viewBox="0 0 14 14"
                width="14"
                height="14"
                fill="none"
              >
                <path d="M9.5 2.5 4.5 11.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
              </svg>
              <svg
                v-else
                viewBox="0 0 14 14"
                width="14"
                height="14"
                fill="none"
              >
                <path d="M5 3.5 9 7 5 10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </li>
        </template>
      </slot>
    </ol>
  </nav>
</template>

<style scoped>
.doity-breadcrumb {
  font-family: var(--doity-font-family-sans);
}

.doity-breadcrumb__list {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.doity-breadcrumb__item {
  align-items: center;
  display: inline-flex;
  gap: 6px;
}

.doity-breadcrumb__link {
  background: none;
  border: 0;
  color: var(--doity-color-text-secondary, #737373);
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  padding: 0;
  text-decoration: none;
  transition: color 0.18s cubic-bezier(0.22, 1, 0.36, 1);
  white-space: nowrap;
}

.doity-breadcrumb__link:hover {
  color: var(--doity-color-text-primary, #0a0a0a);
}

.doity-breadcrumb__link--dropdown {
  align-items: center;
  display: inline-flex;
  gap: 4px;
}

.doity-breadcrumb__chevron-down {
  color: var(--doity-color-text-secondary, #737373);
  display: block;
  flex-shrink: 0;
  transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-breadcrumb__link--dropdown:hover .doity-breadcrumb__chevron-down,
:deep(.doity-dropdown--open) .doity-breadcrumb__chevron-down {
  transform: rotate(180deg);
}

.doity-breadcrumb__current {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
}

.doity-breadcrumb__sep {
  align-items: center;
  color: var(--doity-color-action-primary-default, #ff2b34);
  display: inline-flex;
  flex-shrink: 0;
  height: 14px;
  width: 14px;
}

.doity-breadcrumb__sep svg {
  display: block;
}

.doity-breadcrumb__ellipsis {
  align-items: center;
  background: none;
  border: 0;
  border-radius: 4px;
  color: var(--doity-color-text-secondary, #737373);
  cursor: pointer;
  display: inline-flex;
  height: 14px;
  justify-content: center;
  padding: 0;
  transition: color 0.18s cubic-bezier(0.22, 1, 0.36, 1);
  width: 14px;
}

.doity-breadcrumb__ellipsis:hover {
  color: var(--doity-color-text-primary, #0a0a0a);
}

.doity-breadcrumb__ellipsis svg {
  display: block;
}

@media (prefers-reduced-motion: reduce) {
  .doity-breadcrumb__link,
  .doity-breadcrumb__chevron-down,
  .doity-breadcrumb__ellipsis {
    transition: none;
  }
}
</style>
