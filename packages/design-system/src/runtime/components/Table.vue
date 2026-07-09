<script setup>
import { toRefs } from 'vue'
const props = defineProps({
  columns: { type: Array, required: false, default: () => [] },
  data: { type: Array, required: false, default: () => [] },
  striped: { type: Boolean, required: false, default: false },
  bordered: { type: Boolean, required: false, default: true },
  hoverable: { type: Boolean, required: false, default: true }
});
const { columns, data, striped, bordered, hoverable } = toRefs(props);
</script>

<template>
  <div class="doity-table-wrapper">
    <table
      :class="[
  'doity-table',
  { 'doity-table--striped': striped, 'doity-table--bordered': bordered, 'doity-table--hoverable': hoverable }
]"
    >
      <slot>
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              :style="{ textAlign: col.align ?? 'left' }"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, ri) in data" :key="ri">
            <td
              v-for="col in columns"
              :key="col.key"
              :style="{ textAlign: col.align ?? 'left' }"
            >
              {{ row[col.key] }}
            </td>
          </tr>
        </tbody>
      </slot>
    </table>
  </div>
</template>

<style scoped>
.doity-table-wrapper{background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-secondary);border-radius:var(--doity-radius-lg);overflow-x:auto}.doity-table{border-collapse:collapse;font-family:var(--doity-font-family-sans);font-size:var(--doity-font-size-sm);width:100%}.doity-table th{background:var(--doity-color-background-primary);color:var(--doity-color-text-secondary);font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-regular);line-height:var(--doity-font-lineHeight-xs);text-align:left}.doity-table td,.doity-table th{border-bottom:1px solid var(--doity-color-border-secondary);height:var(--doity-component-table-rowHeight,72px);padding:var(--doity-component-table-cellPaddingY,16px) var(--doity-component-table-cellPaddingX,24px);vertical-align:middle}.doity-table td{color:var(--doity-color-text-primary);font-size:var(--doity-font-size-sm);line-height:var(--doity-font-lineHeight-sm)}.doity-table--bordered td,.doity-table--bordered th{border-right:1px solid var(--doity-color-border-secondary)}.doity-table--bordered td:last-child,.doity-table--bordered th:last-child{border-right:none}.doity-table--striped tbody tr:nth-child(2n){background:var(--doity-color-background-secondary)}.doity-table--hoverable tbody tr:hover{background:var(--doity-color-background-tertiary)}.doity-table tbody tr:last-child td{border-bottom:none}
</style>
