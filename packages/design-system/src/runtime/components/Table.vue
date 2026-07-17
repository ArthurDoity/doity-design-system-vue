<script setup>
import { computed, useSlots } from 'vue'
import TableHeaderCell from './TableHeaderCell.vue'
import Badge from './Badge.vue'

const props = defineProps({
  columns: { type: Array, required: false, default: () => [] },
  data: { type: Array, required: false, default: () => [] },
  /**
   * line — divisores horizontais
   * alternating — linhas zebradas (Figma “Alternating fills”)
   */
  dividers: { type: String, required: false, default: 'line' },
  /** Alias legado de dividers="alternating" */
  striped: { type: Boolean, required: false, default: false },
  /**
   * white | gray — fundo do thead (Figma Table header cell)
   */
  headerTone: { type: String, required: false, default: 'gray' },
  /** Bordas verticais entre células (legado; Figma usa só horizontais) */
  bordered: { type: Boolean, required: false, default: false },
  hoverable: { type: Boolean, required: false, default: true },
  /** Título do card (header) */
  title: { type: String, required: false, default: '' },
  /** Texto de apoio do card */
  description: { type: String, required: false, default: '' },
  /** Texto do badge ao lado do título (renderiza DoityBadge) */
  badge: { type: String, required: false, default: '' },
})

const emit = defineEmits(['sort'])
const slots = useSlots()

const isAlternating = computed(() => props.striped || props.dividers === 'alternating')
const tone = computed(() => (props.headerTone === 'white' ? 'white' : 'gray'))

const hasCardHeader = computed(() =>
  Boolean(
    props.title
    || props.description
    || props.badge
    || slots['card-header']
    || slots.title
    || slots.description
    || slots.badge
    || slots.actions,
  ),
)

const hasFilters = computed(() => Boolean(slots.filters))
const hasFooter = computed(() => Boolean(slots.footer))
const useDeclarative = computed(() => props.columns.length > 0 && !slots.default)

const tableClasses = computed(() => [
  'doity-table',
  `doity-table--header-${tone.value}`,
  {
    'doity-table--striped': isAlternating.value,
    'doity-table--bordered': props.bordered,
    'doity-table--hoverable': props.hoverable,
  },
])

function onSort(col, direction) {
  emit('sort', { key: col.key, direction, column: col })
}
</script>

<template>
  <div class="doity-table-card">
    <div
      v-if="hasCardHeader"
      class="doity-table-card__header"
    >
      <slot name="card-header">
        <div class="doity-table-card__header-main">
          <div class="doity-table-card__titles">
            <div
              v-if="title || badge || $slots.title || $slots.badge"
              class="doity-table-card__title-row"
            >
              <h3
                v-if="title || $slots.title"
                class="doity-table-card__title"
              >
                <slot name="title">{{ title }}</slot>
              </h3>
              <slot name="badge">
                <Badge
                  v-if="badge"
                  variant="primary"
                  size="sm"
                >
                  {{ badge }}
                </Badge>
              </slot>
            </div>
            <p
              v-if="description || $slots.description"
              class="doity-table-card__description"
            >
              <slot name="description">{{ description }}</slot>
            </p>
          </div>
          <div
            v-if="$slots.actions"
            class="doity-table-card__actions"
          >
            <slot name="actions" />
          </div>
        </div>
      </slot>
    </div>

    <div
      v-if="hasFilters"
      class="doity-table-card__filters"
    >
      <slot name="filters" />
    </div>

    <div class="doity-table-card__body">
      <table :class="tableClasses">
        <slot>
          <thead v-if="useDeclarative">
            <tr>
              <TableHeaderCell
                v-for="col in columns"
                :key="col.key"
                :label="col.label"
                :tone="tone"
                :sortable="!!col.sortable"
                :sort="col.sort || 'none'"
                :help="!!col.help"
                :align="col.align || 'left'"
                :checkbox-only="!!col.checkboxOnly"
                @sort="dir => onSort(col, dir)"
              >
                <template
                  v-if="$slots[`header-${col.key}`]"
                  #default
                >
                  <slot
                    :name="`header-${col.key}`"
                    :column="col"
                  />
                </template>
                <template
                  v-if="$slots[`header-checkbox-${col.key}`] || ((col.checkbox || col.checkboxOnly) && $slots['header-checkbox'])"
                  #checkbox
                >
                  <slot
                    :name="`header-checkbox-${col.key}`"
                    :column="col"
                  >
                    <slot
                      name="header-checkbox"
                      :column="col"
                    />
                  </slot>
                </template>
              </TableHeaderCell>
            </tr>
          </thead>
          <tbody v-if="useDeclarative">
            <tr
              v-for="(row, ri) in data"
              :key="row.id ?? ri"
              :class="{ 'doity-table__row--selected': row.selected }"
            >
              <td
                v-for="col in columns"
                :key="col.key"
                :class="[
                  'doity-td',
                  {
                    'doity-td--checkbox': col.checkboxOnly || col.checkbox,
                    'doity-td--actions': col.actions,
                    'doity-td--tags': col.tags,
                  },
                ]"
                :style="{ textAlign: col.align || 'left' }"
              >
                <slot
                  :name="`cell-${col.key}`"
                  :row="row"
                  :column="col"
                  :value="row[col.key]"
                  :index="ri"
                >
                  {{ row[col.key] }}
                </slot>
              </td>
            </tr>
          </tbody>
        </slot>
      </table>
    </div>

    <div
      v-if="hasFooter"
      class="doity-table-card__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.doity-table-card {
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e5e5e5);
  border-radius: var(--doity-radius-xl, 12px);
  box-shadow: var(--doity-shadow-xs, 0 1px 2px 0 rgb(0 0 0 / 5%));
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  overflow: hidden;
  width: 100%;
}

.doity-table-card__header {
  border-bottom: 1px solid var(--doity-color-border-default, #e5e5e5);
  padding: 20px 24px;
}

.doity-table-card__header-main {
  align-items: flex-start;
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

.doity-table-card__titles {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.doity-table-card__title-row {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.doity-table-card__title {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-size: 18px;
  font-weight: var(--doity-font-weight-semibold, 600);
  line-height: 28px;
  margin: 0;
}

.doity-table-card__description {
  color: var(--doity-color-text-secondary, #737373);
  font-size: 14px;
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: 20px;
  margin: 0;
}

.doity-table-card__actions {
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
  gap: 12px;
}

.doity-table-card__filters {
  align-items: center;
  border-bottom: 1px solid var(--doity-color-border-default, #e5e5e5);
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  padding: 12px 16px;
}

.doity-table-card__body {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
}

.doity-table-card__footer {
  border-top: 1px solid var(--doity-color-border-default, #e5e5e5);
  padding: 12px 24px 16px;
}

.doity-table-card__footer :deep(.doity-pagination--default),
.doity-table-card__footer :deep(.doity-pagination--compact) {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.doity-table {
  border-collapse: collapse;
  font-family: var(--doity-font-family-sans);
  font-size: 12px;
  min-width: 100%;
  width: 100%;
}

.doity-table th:not(.doity-th) {
  background: var(--doity-color-background-primary, #fff);
  border-bottom: 1px solid var(--doity-color-border-default, #e5e5e5);
  color: var(--doity-color-text-secondary, #737373);
  font-size: 12px;
  font-weight: var(--doity-font-weight-medium, 500);
  height: 44px;
  line-height: 18px;
  padding: 12px 24px;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
}

.doity-table--header-gray th:not(.doity-th),
.doity-table--header-gray :deep(.doity-th--white) {
  background: var(--doity-color-background-secondary, #fafafa);
}

.doity-td,
.doity-table td {
  border-bottom: 1px solid var(--doity-color-border-default, #e5e5e5);
  color: var(--doity-color-text-secondary, #737373);
  font-size: 12px;
  height: var(--doity-component-table-rowHeight, 72px);
  line-height: 16px;
  padding: 16px 24px;
  transition: background-color 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  vertical-align: middle;
}

.doity-td--tags {
  white-space: nowrap;
  width: 1%;
}

.doity-td--checkbox {
  padding-inline: 16px;
  width: 68px;
}

.doity-td--actions {
  padding-inline: 16px;
  white-space: nowrap;
  width: 1%;
}

/* Tags sempre lado a lado (Figma Tags column) — :slotted para conteúdo das stories */
.doity-table__tags,
:slotted(.doity-table__tags) {
  align-items: center;
  display: inline-flex;
  flex-wrap: nowrap;
  gap: 4px;
  max-width: none;
  white-space: nowrap;
}

.doity-table__tags :deep(.doity-badge),
:slotted(.doity-table__tags) :deep(.doity-badge) {
  flex-shrink: 0;
}

.doity-table__actions,
:slotted(.doity-table__actions) {
  align-items: center;
  display: inline-flex;
  flex-wrap: nowrap;
  gap: 4px;
}

.doity-table tbody tr:last-child td {
  border-bottom: none;
}

.doity-table--bordered td,
.doity-table--bordered th {
  border-right: 1px solid var(--doity-color-border-default, #e5e5e5);
}

.doity-table--bordered td:last-child,
.doity-table--bordered th:last-child {
  border-right: none;
}

.doity-table--striped tbody tr:nth-child(even) {
  background: var(--doity-color-background-secondary, #fafafa);
}

.doity-table--hoverable tbody tr:hover td {
  background: var(--doity-color-background-tertiary, #f5f5f5);
}

.doity-table--striped.doity-table--hoverable tbody tr:nth-child(even):hover td {
  background: var(--doity-color-background-tertiary, #f5f5f5);
}

.doity-table__row--selected td {
  background: color-mix(in srgb, var(--doity-color-action-primary-default, #ff2b34) 4%, white);
}

@media (prefers-reduced-motion: reduce) {
  .doity-td,
  .doity-table td {
    transition: none;
  }
}
</style>

<style>
/* Utilitários usados dentro dos slots (fora do scoped) */
.doity-table__tags {
  align-items: center;
  display: inline-flex;
  flex-wrap: nowrap;
  gap: 4px;
  white-space: nowrap;
}

.doity-table__tags .doity-badge {
  flex-shrink: 0;
}

.doity-table__actions {
  align-items: center;
  display: inline-flex;
  flex-wrap: nowrap;
  gap: 4px;
}

.doity-table__actions .doity-btn--link.doity-btn--icon-only {
  border-radius: 8px;
}

.doity-table__actions .doity-btn--link.doity-btn--icon-only:hover:not(:disabled) {
  background: var(--doity-color-background-secondary, #f5f5f5);
}

.doity-table__actions .doity-btn--link.doity-btn--icon-only:active:not(:disabled) {
  background: var(--doity-color-background-tertiary, #ececec);
  transform: scale(0.84);
}

@media (prefers-reduced-motion: reduce) {
  .doity-table__actions .doity-btn--link.doity-btn--icon-only:active:not(:disabled) {
    transform: none;
  }
}
</style>
