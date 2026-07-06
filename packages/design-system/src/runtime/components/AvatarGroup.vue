<script setup>
const props = defineProps({
  size: { type: String, required: false, default: "md" },
  max: { type: Number, required: false, default: 4 },
  showAdd: { type: Boolean, required: false, default: false },
  showMore: { type: Boolean, required: false, default: true }
});
const emit = defineEmits(["add"]);
const slots = useSlots();
const children = computed(() => slots.default?.() ?? []);
const visibleCount = computed(() => Math.min(children.value.length, props.max));
const overflow = computed(() => Math.max(0, children.value.length - props.max));
</script>

<template>
  <div class="doity-avatar-group">
    <div class="doity-avatar-group__list">
      <slot />
      <button
        v-if="showAdd"
        type="button"
        class="doity-avatar-group__add"
        :class="`doity-avatar-group__add--${size}`"
        aria-label="Adicionar usuário"
        @click="emit('add')"
      >
        +
      </button>
      <span
        v-if="showMore && overflow > 0"
        class="doity-avatar-group__more"
        :class="`doity-avatar-group__more--${size}`"
      >
        +{{ overflow }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.doity-avatar-group__list{align-items:center;display:flex}.doity-avatar-group__list :deep(.doity-avatar){border:2px solid var(--doity-color-background-primary);margin-left:-8px}.doity-avatar-group__list :deep(.doity-avatar:first-child){margin-left:0}.doity-avatar-group__add,.doity-avatar-group__more{align-items:center;background:var(--doity-color-background-primary);border:2px dashed var(--doity-color-border-primary);border-radius:var(--doity-radius-full);color:var(--doity-color-text-secondary);display:inline-flex;font-family:var(--doity-font-family-sans);font-weight:var(--doity-font-weight-medium);justify-content:center;margin-left:-8px}.doity-avatar-group__add{cursor:pointer}.doity-avatar-group__add:hover{border-color:var(--doity-color-border-focus);color:var(--doity-color-text-link)}.doity-avatar-group__add--xs,.doity-avatar-group__more--xs{font-size:10px;height:24px;width:24px}.doity-avatar-group__add--sm,.doity-avatar-group__more--sm{font-size:11px;height:32px;width:32px}.doity-avatar-group__add--md,.doity-avatar-group__more--md{font-size:12px;height:40px;width:40px}
</style>
