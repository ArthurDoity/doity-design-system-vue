<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  /** Força estado ativo (drag-over). Se omitido, controla internamente no drag. */
  active: { type: Boolean, required: false, default: undefined },
  actionLabel: { type: String, required: false, default: 'Clique para adicionar' },
  dropLabel: { type: String, required: false, default: 'ou arraste e solte' },
  hint: { type: String, required: false, default: '.doc ou .docx (Máx. 10MB)' },
  accept: { type: String, required: false, default: '.doc,.docx' },
  multiple: { type: Boolean, required: false, default: false },
  disabled: { type: Boolean, required: false, default: false },
})

const emit = defineEmits(['select', 'dragenter', 'dragleave', 'drop'])

const inputRef = ref(null)
const dragging = ref(false)

const isActive = computed(() => {
  if (props.disabled) return false
  if (props.active !== undefined) return props.active
  return dragging.value
})

function openPicker() {
  if (props.disabled) return
  inputRef.value?.click()
}

function onFiles(fileList) {
  const files = Array.from(fileList || [])
  if (!files.length) return
  emit('select', props.multiple ? files : files[0])
}

function onInputChange(event) {
  onFiles(event.target.files)
  event.target.value = ''
}

function onDragEnter(event) {
  event.preventDefault()
  if (props.disabled) return
  dragging.value = true
  emit('dragenter', event)
}

function onDragOver(event) {
  event.preventDefault()
}

function onDragLeave(event) {
  event.preventDefault()
  if (props.disabled) return
  dragging.value = false
  emit('dragleave', event)
}

function onDrop(event) {
  event.preventDefault()
  if (props.disabled) return
  dragging.value = false
  emit('drop', event)
  onFiles(event.dataTransfer?.files)
}
</script>

<template>
  <div
    :class="[
      'doity-file-dropzone',
      {
        'doity-file-dropzone--active': isActive,
        'doity-file-dropzone--disabled': disabled,
      },
    ]"
    role="button"
    tabindex="0"
    :aria-disabled="disabled || undefined"
    @click="openPicker"
    @keydown.enter.prevent="openPicker"
    @keydown.space.prevent="openPicker"
    @dragenter="onDragEnter"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <input
      ref="inputRef"
      type="file"
      class="doity-file-dropzone__input"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      tabindex="-1"
      @change="onInputChange"
      @click.stop
    >

    <div class="doity-file-dropzone__content">
      <div class="doity-file-dropzone__icon" aria-hidden="true">
        <slot name="icon">
          <svg
            class="doity-file-dropzone__icon-svg"
            viewBox="0 0 20.335 16.998"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="doity-file-dropzone__icon-path"
              d="M6.83778 11.8313L10.1711 8.49795L13.5044 11.8313M10.1711 8.49795V15.998M17.1628 13.823C17.9756 13.3798 18.6176 12.6787 18.9877 11.8301C19.3577 10.9816 19.4346 10.034 19.2063 9.13686C18.9779 8.23974 18.4573 7.44421 17.7267 6.87582C16.996 6.30744 16.0968 5.99856 15.1711 5.99795H14.1211C13.8689 5.02232 13.3987 4.11656 12.7461 3.34878C12.0934 2.58099 11.2751 1.97116 10.3529 1.56513C9.43057 1.15909 8.42823 0.967418 7.42121 1.00452C6.41418 1.04162 5.42867 1.30654 4.53876 1.77934C3.64885 2.25214 2.8777 2.92054 2.28329 3.73427C1.68889 4.548 1.28668 5.4859 1.10693 6.47745C0.927168 7.469 0.97453 8.48839 1.24545 9.459C1.51638 10.4296 2.00381 11.3262 2.67111 12.0813"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </slot>
      </div>

      <div class="doity-file-dropzone__labels">
        <p class="doity-file-dropzone__title">
          <slot name="title">
            <span class="doity-file-dropzone__action">{{ actionLabel }}</span>{{ ' ' }}<span class="doity-file-dropzone__drop">{{ dropLabel }}</span>
          </slot>
        </p>
        <p class="doity-file-dropzone__hint">
          <slot name="hint">{{ hint }}</slot>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doity-file-dropzone {
  background: var(--doity-color-background-primary, #fff);
  border: 1px dashed var(--doity-color-border-strong, #d4d4d4);
  border-radius: var(--doity-radius-input, 10px);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  max-width: 100%;
  padding: var(--doity-spacing-6, 24px);
  position: relative;
  transition:
    background-color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  width: 350px;
}
.doity-file-dropzone:focus-visible {
  outline: 2px solid var(--doity-color-border-focus, #ff2b34);
  outline-offset: 2px;
}
.doity-file-dropzone:hover:not(.doity-file-dropzone--disabled),
.doity-file-dropzone--active:not(.doity-file-dropzone--disabled),
.doity-file-dropzone:focus-visible:not(.doity-file-dropzone--disabled) {
  /* Figma: Dropzone Container — estado ativo */
  background: #fff5f6;
  border-color: #ffd1d4;
}
.doity-file-dropzone--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.doity-file-dropzone__input {
  height: 1px;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 1px;
}
.doity-file-dropzone__content {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--doity-spacing-4, 16px);
  width: 100%;
}
.doity-file-dropzone__icon {
  align-items: center;
  background: var(--doity-color-background-tertiary, #f5f5f5);
  border: 6px solid var(--doity-color-background-secondary, #fafafa);
  border-radius: 28px;
  box-sizing: border-box;
  color: var(--doity-color-text-secondary, #737373);
  display: flex;
  flex-shrink: 0;
  height: 40px;
  justify-content: center;
  transform: scale(1);
  transition:
    background-color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1);
  width: 40px;
  will-change: transform;
}
.doity-file-dropzone:hover:not(.doity-file-dropzone--disabled) .doity-file-dropzone__icon,
.doity-file-dropzone--active:not(.doity-file-dropzone--disabled) .doity-file-dropzone__icon,
.doity-file-dropzone:focus-visible:not(.doity-file-dropzone--disabled) .doity-file-dropzone__icon {
  /* Figma: Featured icon — transição suave (sem keyframes/border-width) */
  background: #ffd6d9;
  border-color: #ffebed;
  color: #f25961;
  transform: scale(1.06);
}
.doity-file-dropzone__icon-svg {
  display: block;
  height: 20px;
  width: 20px;
}
.doity-file-dropzone__icon-path {
  transition: stroke 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.doity-file-dropzone__labels {
  display: flex;
  flex-direction: column;
  gap: var(--doity-spacing-2, 8px);
  text-align: center;
  width: 100%;
  word-break: break-word;
}
.doity-file-dropzone__title {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-semibold, 600);
  line-height: var(--doity-font-lineHeight-md, 20px);
  margin: 0;
}
.doity-file-dropzone__action {
  color: var(--doity-color-text-brand, #ff2b34);
}
.doity-file-dropzone__drop {
  color: var(--doity-color-text-primary, #0a0a0a);
}
.doity-file-dropzone__hint {
  color: var(--doity-color-text-secondary, #737373);
  font-size: var(--doity-font-size-xs, 12px);
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: var(--doity-font-lineHeight-xs, 16px);
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  .doity-file-dropzone,
  .doity-file-dropzone__icon,
  .doity-file-dropzone__icon-path {
    transition: none;
  }
  .doity-file-dropzone:hover:not(.doity-file-dropzone--disabled) .doity-file-dropzone__icon,
  .doity-file-dropzone--active:not(.doity-file-dropzone--disabled) .doity-file-dropzone__icon,
  .doity-file-dropzone:focus-visible:not(.doity-file-dropzone--disabled) .doity-file-dropzone__icon {
    transform: none;
  }
}
</style>
