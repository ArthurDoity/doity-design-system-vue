<script setup>
import { computed } from 'vue'
import Spinner from './Spinner.vue'
const props = defineProps({
  hierarchy: { type: String, required: false, default: "primary" },
  size: { type: String, required: false, default: "md" },
  icon: { type: String, required: false, default: "none" },
  destructive: { type: Boolean, required: false, default: false },
  disabled: { type: Boolean, required: false, default: false },
  loading: { type: Boolean, required: false, default: false },
  type: { type: String, required: false, default: "button" },
  href: { type: String, required: false },
  target: { type: String, required: false }
});
const emit = defineEmits(["click"]);
const tag = computed(() => props.href ? "a" : "button");
const spinnerSize = computed(() => (props.size === 'lg' ? 'md' : 'sm'))
const spinnerColor = computed(() => {
  if (props.hierarchy === 'primary' && !props.destructive) return 'white'
  return 'default'
})
const classes = computed(() => [
  "doity-btn",
  `doity-btn--${props.hierarchy}`,
  `doity-btn--${props.size}`,
  props.icon !== "none" && `doity-btn--icon-${props.icon}`,
  props.destructive && "doity-btn--destructive",
  props.loading && "doity-btn--loading"
]);
function onClick(event) {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  emit("click", event);
}
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :type="tag === 'button' ? type : void 0"
    :href="tag === 'a' ? href : void 0"
    :target="tag === 'a' ? target : void 0"
    :disabled="tag === 'button' ? disabled || loading : void 0"
    :aria-disabled="disabled || loading || void 0"
    :aria-busy="loading || void 0"
    @click="onClick"
  >
    <Spinner
      v-if="loading"
      class="doity-btn__spinner"
      :size="spinnerSize"
      :color="spinnerColor"
      label=""
    />
    <span v-if="icon === 'dot'" class="doity-btn__dot" aria-hidden="true" />
    <span v-else-if="icon === 'leading' || icon === 'only' && ($slots['icon-leading'] || $slots.icon)" class="doity-btn__icon">
      <slot name="icon-leading">
        <slot name="icon" />
      </slot>
    </span>
    <span v-if="icon !== 'only'" class="doity-btn__label">
      <slot />
    </span>
    <span v-if="icon === 'trailing'" class="doity-btn__icon">
      <slot name="icon-trailing" />
    </span>
    <span v-else-if="icon === 'only' && !$slots['icon-leading'] && !$slots.icon" class="doity-btn__icon">
      <slot />
    </span>
  </component>
</template>

<style scoped>
.doity-btn {
  align-items: center;
  border: 1px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  font-family: var(--doity-font-family-sans);
  font-size: var(--doity-component-button-fontSize-md);
  font-weight: var(--doity-font-weight-medium);
  gap: var(--doity-spacing-2);
  justify-content: center;
  position: relative;
  text-decoration: none;
  transform: scale(1);
  transition:
    background-color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.45s cubic-bezier(0.34, 1.7, 0.42, 1);
  white-space: nowrap;
  will-change: transform;
}
.doity-btn:disabled,
.doity-btn[aria-disabled='true'] {
  cursor: not-allowed;
  pointer-events: none;
}
.doity-btn--sm {
  border-radius: var(--doity-radius-button-sm);
  font-size: var(--doity-component-button-fontSize-sm);
  height: var(--doity-component-button-height-sm);
  line-height: var(--doity-component-button-lineHeight-sm);
  padding: var(--doity-component-button-paddingY-sm) var(--doity-component-button-paddingX-sm);
}
.doity-btn--md {
  border-radius: var(--doity-radius-button-md);
  height: var(--doity-component-button-height-md);
  line-height: var(--doity-component-button-lineHeight-md);
  padding: var(--doity-component-button-paddingY-md) var(--doity-component-button-paddingX-md);
}
.doity-btn--lg {
  border-radius: var(--doity-radius-button-lg);
  height: var(--doity-component-button-height-lg);
  line-height: var(--doity-component-button-lineHeight-lg);
  padding: var(--doity-component-button-paddingY-lg) var(--doity-component-button-paddingX-lg);
}
.doity-btn--xl {
  border-radius: var(--doity-radius-button-xl);
  height: var(--doity-component-button-height-xl);
  line-height: var(--doity-component-button-lineHeight-xl);
  padding: var(--doity-component-button-paddingY-xl) var(--doity-component-button-paddingX-xl);
}
.doity-btn--2xl {
  border-radius: var(--doity-radius-button-2xl);
  height: var(--doity-component-button-height-2xl);
  line-height: var(--doity-component-button-lineHeight-2xl);
  padding: var(--doity-component-button-paddingY-2xl) var(--doity-component-button-paddingX-2xl);
}
.doity-btn__label {
  line-height: inherit;
}
.doity-btn--icon-only.doity-btn--sm {
  padding: 0;
  width: var(--doity-component-button-iconOnlySize-sm);
}
.doity-btn--icon-only.doity-btn--md {
  padding: 0;
  width: var(--doity-component-button-iconOnlySize-md);
}
.doity-btn--icon-only.doity-btn--lg {
  padding: 0;
  width: var(--doity-component-button-iconOnlySize-lg);
}
.doity-btn--icon-only.doity-btn--xl {
  padding: 0;
  width: var(--doity-component-button-iconOnlySize-xl);
}
.doity-btn--icon-only.doity-btn--2xl {
  padding: 0;
  width: var(--doity-component-button-iconOnlySize-2xl);
}
.doity-btn__icon {
  align-items: center;
  display: inline-flex;
  flex-shrink: 0;
  height: var(--doity-component-button-iconSize-md);
  justify-content: center;
  width: var(--doity-component-button-iconSize-md);
}
.doity-btn--sm .doity-btn__icon {
  height: var(--doity-component-button-iconSize-sm);
  width: var(--doity-component-button-iconSize-sm);
}
.doity-btn--lg .doity-btn__icon,
.doity-btn--xl .doity-btn__icon {
  height: var(--doity-component-button-iconSize-lg);
  width: var(--doity-component-button-iconSize-lg);
}
.doity-btn--2xl .doity-btn__icon {
  height: var(--doity-component-button-iconSize-2xl);
  width: var(--doity-component-button-iconSize-2xl);
}
.doity-btn__dot {
  background: currentColor;
  border-radius: var(--doity-radius-full);
  flex-shrink: 0;
  height: 8px;
  width: 8px;
}
.doity-btn__spinner {
  flex-shrink: 0;
}

/* Loading: mantém a hierarquia visual com opacity, sem o “wash” de disabled */
.doity-btn--loading {
  cursor: default;
  opacity: 0.5;
  pointer-events: none;
}
.doity-btn--primary.doity-btn--loading:disabled {
  background: var(--doity-color-action-primary-default);
  border-color: transparent;
  box-shadow: var(--doity-shadow-button-primary, none);
  color: var(--doity-color-text-on-action, #fafafa);
  opacity: 0.5;
}
.doity-btn--secondary.doity-btn--loading:disabled {
  background: var(--doity-color-action-secondary-default);
  box-shadow: var(--doity-shadow-button-secondary);
  color: var(--doity-color-text-primary);
  opacity: 0.5;
}
.doity-btn--outline.doity-btn--loading:disabled {
  background: var(--doity-color-background-primary);
  border-color: var(--doity-color-border-strong);
  color: var(--doity-color-text-primary);
  opacity: 0.5;
}

/* Figma press — mais elástico no release */
.doity-btn:active:not(:disabled):not([aria-disabled='true']):not(.doity-btn--link) {
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 12%);
  transform: scale(0.955);
  transition:
    background-color 0.12s ease-out,
    border-color 0.12s ease-out,
    box-shadow 0.12s ease-out,
    transform 0.12s cubic-bezier(0.33, 0, 0.67, 1);
}

.doity-btn--primary {
  background: var(--doity-color-action-primary-default);
  border-color: var(--doity-color-border-focus);
  box-shadow: var(--doity-shadow-button-primary);
  color: var(--doity-color-text-on-primary);
}
.doity-btn--primary:hover:not(:disabled) {
  background: var(--doity-color-action-primary-hover);
  border-color: var(--doity-color-action-primary-hover);
}
.doity-btn--primary:active:not(:disabled) {
  /* Figma 868:12643 — #D11A24 */
  background: #d11a24;
  border-color: #d11a24;
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 12%);
}
.doity-btn--primary:focus-visible {
  box-shadow: var(--doity-shadow-focus);
}
.doity-btn--primary:disabled {
  background: var(--doity-color-background-tertiary);
  border-color: var(--doity-color-background-tertiary);
  box-shadow: none;
  color: var(--doity-color-text-disabled);
}

.doity-btn--secondary {
  background: var(--doity-color-action-secondary-default);
  border-color: transparent;
  box-shadow: var(--doity-shadow-button-secondary);
  color: var(--doity-color-text-primary);
}
.doity-btn--secondary:hover:not(:disabled) {
  background: #efefef;
  opacity: 1;
}
.doity-btn--secondary:active:not(:disabled) {
  /* Figma 868:12645 — #E0E0E0 */
  background: #e0e0e0;
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 12%);
  opacity: 1;
}
.doity-btn--secondary:focus-visible {
  box-shadow: var(--doity-shadow-button-secondary), var(--doity-shadow-focus);
}
.doity-btn--secondary:disabled {
  background: var(--doity-color-action-secondary-default);
  box-shadow: var(--doity-shadow-button-secondary);
  color: var(--doity-color-text-disabled);
  opacity: 1;
}

.doity-btn--outline {
  background: var(--doity-color-background-primary);
  border-color: var(--doity-color-border-strong);
  box-shadow: none;
  color: var(--doity-color-text-primary);
}
.doity-btn--outline:hover:not(:disabled) {
  background: var(--doity-color-background-tertiary);
}
.doity-btn--outline:active:not(:disabled) {
  background: #e8e8e8;
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 12%);
}
.doity-btn--outline:focus-visible {
  box-shadow: var(--doity-shadow-focus);
}
.doity-btn--outline:disabled {
  background: var(--doity-color-background-primary);
  border-color: var(--doity-color-border-default);
  color: var(--doity-color-text-disabled);
}

.doity-btn--link {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
  color: var(--doity-color-text-primary);
}
.doity-btn--link:not(.doity-btn--icon-only) {
  height: auto;
  min-height: 0;
  padding: 0;
}
.doity-btn--link:hover:not(:disabled) {
  color: var(--doity-color-text-brand);
  text-decoration: none;
}
.doity-btn--link:active:not(:disabled) {
  opacity: 0.75;
  transform: none;
}
.doity-btn--link.doity-btn--icon-only {
  color: var(--doity-color-text-tertiary, #a3a3a3);
}
.doity-btn--link.doity-btn--icon-only:hover:not(:disabled) {
  background: var(--doity-color-background-secondary, #f5f5f5);
  color: var(--doity-color-text-primary, #0a0a0a);
}
.doity-btn--link.doity-btn--icon-only:active:not(:disabled) {
  background: var(--doity-color-background-tertiary, #f5f5f5);
  color: var(--doity-color-text-primary, #0a0a0a);
  opacity: 1;
  transform: scale(0.86);
  transition-duration: 0.1s;
  transition-timing-function: cubic-bezier(0.33, 0, 0.67, 1);
}
.doity-btn--link:focus-visible {
  box-shadow: none;
  outline: 2px solid var(--doity-color-border-focus);
  outline-offset: 2px;
}
.doity-btn--link:disabled {
  color: var(--doity-color-text-disabled);
}

.doity-btn--destructive.doity-btn--primary {
  background: var(--doity-color-action-destructive-default);
  border-color: var(--doity-color-action-destructive-default);
}
.doity-btn--destructive.doity-btn--primary:hover:not(:disabled) {
  background: var(--doity-color-action-destructive-hover);
  border-color: var(--doity-color-action-destructive-hover);
}
.doity-btn--destructive.doity-btn--primary:active:not(:disabled) {
  background: var(--doity-color-action-destructive-pressed);
  border-color: var(--doity-color-action-destructive-pressed);
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 12%);
}
.doity-btn--destructive.doity-btn--primary:disabled {
  background: var(--doity-color-background-tertiary);
  border-color: var(--doity-color-background-tertiary);
  color: var(--doity-color-text-disabled);
}
.doity-btn--destructive.doity-btn--outline,
.doity-btn--destructive.doity-btn--secondary {
  border-color: var(--doity-color-action-destructive-default);
  color: var(--doity-color-action-destructive-default);
}
.doity-btn--destructive.doity-btn--link {
  color: var(--doity-color-action-destructive-default);
}
.doity-btn--destructive.doity-btn--link:hover:not(:disabled) {
  color: var(--doity-color-action-destructive-hover);
}

@media (prefers-reduced-motion: reduce) {
  .doity-btn {
    transition: none;
  }
  .doity-btn:active:not(:disabled):not([aria-disabled='true']):not(.doity-btn--link),
  .doity-btn--link.doity-btn--icon-only:active:not(:disabled) {
    transform: none;
  }
}
</style>
