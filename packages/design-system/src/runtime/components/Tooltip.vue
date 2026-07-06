<script setup>
const props = defineProps({
  content: { type: String, required: false },
  position: { type: String, required: false, default: "top" },
  delay: { type: Number, required: false, default: 200 },
  theme: { type: String, required: false, default: "light" }
});
const visible = ref(false);
let timer = null;
function show() {
  timer = setTimeout(() => {
    visible.value = true;
  }, props.delay);
}
function hide() {
  if (timer) clearTimeout(timer);
  visible.value = false;
}
</script>

<template>
  <span class="doity-tooltip" @mouseenter="show" @mouseleave="hide" @focusin="show" @focusout="hide">
    <span class="doity-tooltip__trigger" tabindex="0">
      <slot />
    </span>
    <span
      v-if="visible"
      :class="[
  'doity-tooltip__content',
  `doity-tooltip__content--${props.position}`,
  `doity-tooltip__content--${props.theme}`
]"
      role="tooltip"
    >
      <slot name="content">{{ props.content }}</slot>
    </span>
  </span>
</template>

<style scoped>
.doity-tooltip{position:relative}.doity-tooltip,.doity-tooltip__trigger{display:inline-flex}.doity-tooltip__content{background:var(--doity-color-background-primary);border:1px solid var(--doity-color-border-default);border-radius:var(--doity-radius-md);box-shadow:var(--doity-shadow-lg);color:var(--doity-color-text-secondary);font-family:var(--doity-font-family-sans);font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-semibold);line-height:var(--doity-font-lineHeight-sm);padding:var(--doity-spacing-2) var(--doity-spacing-3);pointer-events:none;position:absolute;white-space:nowrap;z-index:1000}.doity-tooltip__content--dark{background:var(--doity-color-gray-900);border-color:var(--doity-color-gray-900);color:var(--doity-color-base-white)}.doity-tooltip__content--light{background:var(--doity-color-background-primary);border-color:var(--doity-color-border-default);color:var(--doity-color-text-secondary)}.doity-tooltip__content--top{bottom:calc(100% + 6px);left:50%;transform:translateX(-50%)}.doity-tooltip__content--bottom{left:50%;top:calc(100% + 6px);transform:translateX(-50%)}.doity-tooltip__content--left{right:calc(100% + 6px);top:50%;transform:translateY(-50%)}.doity-tooltip__content--right{left:calc(100% + 6px);top:50%;transform:translateY(-50%)}
</style>
