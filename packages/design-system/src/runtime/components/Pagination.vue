<script setup>
import { computed, toRefs } from 'vue'
const props = defineProps({
  page: { type: Number, required: false, default: 1 },
  totalPages: { type: Number, required: false, default: 1 },
  siblingCount: { type: Number, required: false, default: 1 },
  showEdges: { type: Boolean, required: false, default: true }
});
const { page, totalPages } = toRefs(props);
const emit = defineEmits(["update:page"]);
const pages = computed(() => {
  const result = [];
  const { page: page2, totalPages: totalPages2, siblingCount } = props;
  if (totalPages2 <= 7) {
    for (let i = 1; i <= totalPages2; i++) result.push(i);
    return result;
  }
  result.push(1);
  const start = Math.max(2, page2 - siblingCount);
  const end = Math.min(totalPages2 - 1, page2 + siblingCount);
  if (start > 2) result.push("ellipsis");
  for (let i = start; i <= end; i++) result.push(i);
  if (end < totalPages2 - 1) result.push("ellipsis");
  result.push(totalPages2);
  return result;
});
function goTo(p) {
  if (p >= 1 && p <= props.totalPages && p !== props.page) {
    emit("update:page", p);
  }
}
</script>

<template>
  <nav class="doity-pagination">
    <button type="button" class="doity-pagination__btn" :disabled="page <= 1" @click="goTo(page - 1)">‹</button>
    <template v-for="(p, i) in pages" :key="`page-${i}`">
      <span v-if="p === 'ellipsis'" class="doity-pagination__ellipsis">...</span>
      <button
        v-else
        type="button"
        class="doity-pagination__btn"
        :class="{ 'doity-pagination__btn--active': p === page }"
        @click="goTo(p)"
      >
        {{ p }}
      </button>
    </template>
    <button type="button" class="doity-pagination__btn" :disabled="page >= totalPages" @click="goTo(page + 1)">›</button>
  </nav>
</template>

<style scoped>
.doity-pagination{align-items:center;border-top:1px solid var(--doity-color-border-secondary);display:inline-flex;font-family:var(--doity-font-family-sans);gap:var(--doity-spacing-1);padding-top:var(--doity-spacing-5)}.doity-pagination__btn{align-items:center;background:var(--doity-color-background-primary);border:1px solid transparent;border-radius:var(--doity-component-pagination-radius,8px);color:var(--doity-color-text-secondary);cursor:pointer;display:inline-flex;font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-medium);height:var(--doity-component-pagination-buttonSize,40px);justify-content:center;line-height:var(--doity-font-lineHeight-xs);padding:0;transition:all .15s ease;width:var(--doity-component-pagination-buttonSize,40px)}.doity-pagination__btn--active,.doity-pagination__btn:hover:not(:disabled):not(.doity-pagination__btn--active){background:var(--doity-color-background-tertiary)}.doity-pagination__btn--active{color:var(--doity-color-text-primary)}.doity-pagination__btn:disabled{cursor:not-allowed;opacity:.45}.doity-pagination__ellipsis{color:var(--doity-color-text-tertiary);font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-medium);text-align:center;width:var(--doity-component-pagination-buttonSize,40px)}
</style>
