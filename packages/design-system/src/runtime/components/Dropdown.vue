<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { closeOverlay, openOverlay } from '../utils/overlayCoordinator'
const props = defineProps({
  items: { type: Array, required: false, default: () => [] },
  align: { type: String, required: false, default: "left" }
});
const emit = defineEmits(["select"]);
const open = ref(false);
const root = ref();
const triggerRef = ref();
const menuRef = ref();
const menuStyle = ref({});

function closeMenu() {
  open.value = false
}

function updateMenuPosition() {
  const el = triggerRef.value;
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const style = {
    position: "fixed",
    top: `${rect.bottom + 5}px`,
    minWidth: `${Math.max(rect.width, 180)}px`,
    zIndex: 1000
  };

  if (props.align === "right") {
    style.right = `${window.innerWidth - rect.right}px`;
    style.left = "auto";
  } else {
    style.left = `${rect.left}px`;
    style.right = "auto";
  }

  menuStyle.value = style;
}

function toggle() {
  if (open.value) {
    closeMenu()
    closeOverlay(closeMenu)
    return
  }

  openOverlay(closeMenu)
  open.value = true
  nextTick(() => updateMenuPosition())
}

function select(item) {
  if (item.disabled || item.section) return;
  emit("select", item);
  closeMenu()
  closeOverlay(closeMenu)
}

function onClickOutside(e) {
  if (root.value?.contains(e.target) || menuRef.value?.contains(e.target)) return;
  closeMenu()
  closeOverlay(closeMenu)
}

watch(open, (isOpen, _, onCleanup) => {
  if (!isOpen) return;

  updateMenuPosition();
  window.addEventListener("scroll", updateMenuPosition, true);
  window.addEventListener("resize", updateMenuPosition);

  onCleanup(() => {
    window.removeEventListener("scroll", updateMenuPosition, true);
    window.removeEventListener("resize", updateMenuPosition);
  });
});

onMounted(() => document.addEventListener("click", onClickOutside));
onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
  closeOverlay(closeMenu);
  window.removeEventListener("scroll", updateMenuPosition, true);
  window.removeEventListener("resize", updateMenuPosition);
});
</script>

<template>
  <div ref="root" :class="['doity-dropdown', { 'doity-dropdown--open': open }]">
    <div ref="triggerRef" class="doity-dropdown__trigger" @click.stop="toggle">
      <slot name="trigger">
        <button type="button" class="doity-dropdown__trigger-btn">
          <span>Menu</span>
          <span class="doity-chevron-down" aria-hidden="true" />
        </button>
      </slot>
    </div>
    <Teleport to="body">
      <div
        v-if="open"
        ref="menuRef"
        :class="['doity-dropdown__menu', `doity-dropdown__menu--${props.align}`]"
        :style="menuStyle"
        role="menu"
      >
      <slot>
        <template v-for="(item, i) in props.items" :key="i">
          <div
            v-if="item.section"
            class="doity-dropdown__section"
            role="presentation"
          >
            {{ item.label }}
          </div>
          <button
            v-else
            type="button"
            class="doity-dropdown__item"
            :class="{
  'doity-dropdown__item--disabled': item.disabled,
  'doity-dropdown__item--destructive': item.destructive,
  'doity-dropdown__item--selected': item.selected
}"
            role="menuitem"
            :disabled="item.disabled"
            @click="select(item)"
          >
            <span class="doity-dropdown__item-label">{{ item.label }}</span>
            <svg
              v-if="item.selected"
              class="doity-dropdown__check"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </template>
      </slot>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.doity-dropdown{display:inline-block;font-family:var(--doity-font-family-sans);position:relative}.doity-dropdown__trigger-btn{align-items:center;background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-strong);border-radius:var(--doity-radius-button-md);box-shadow:var(--doity-shadow-xs);color:var(--doity-color-text-primary);cursor:pointer;display:inline-flex;font-family:inherit;font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-medium);gap:var(--doity-spacing-2);height:var(--doity-component-button-height-md);line-height:var(--doity-font-lineHeight-xs);padding:0 var(--doity-spacing-3);transition:border-color .15s ease}.doity-dropdown__trigger-btn:hover{background:var(--doity-color-background-secondary)}.doity-dropdown__trigger-btn:focus,.doity-dropdown--open .doity-dropdown__trigger-btn{border-color:#717680;outline:none}.doity-dropdown__menu{background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-default);border-radius:var(--doity-radius-md);box-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);box-sizing:border-box;min-width:var(--doity-component-dropdown-width);padding:var(--doity-spacing-1);width:var(--doity-component-dropdown-width)}.doity-dropdown__section{color:var(--doity-color-text-secondary);font-size:10px}.doity-dropdown__item,.doity-dropdown__section{font-weight:var(--doity-font-weight-regular);line-height:var(--doity-font-lineHeight-xs);padding:6px var(--doity-spacing-2)}.doity-dropdown__item{align-items:center;background:none;border:none;border-radius:var(--doity-radius-sm);box-sizing:border-box;color:var(--doity-color-text-primary);cursor:pointer;display:flex;font-family:inherit;font-size:var(--doity-font-size-xs);gap:var(--doity-spacing-2);justify-content:space-between;min-height:var(--doity-component-dropdown-itemHeight);padding-right:var(--doity-spacing-8);text-align:left;width:100%}.doity-dropdown__item-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.doity-dropdown__item:hover:not(:disabled){background:var(--doity-color-background-tertiary)}.doity-dropdown__item--selected,.doity-dropdown__item--selected:hover{background:var(--doity-color-background-tertiary);padding-right:var(--doity-spacing-2)}.doity-dropdown__check{color:var(--doity-color-text-primary);flex-shrink:0}.doity-dropdown__item--destructive{color:var(--doity-color-error-600)}.doity-dropdown__item--disabled{color:var(--doity-color-text-disabled);cursor:not-allowed}
</style>
