<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import Spinner from './Spinner.vue'
import Button from './Button.vue'

const props = defineProps({
  /** `uploading` — spinner + barra + cancelar; `complete` — ícone arquivo + remover */
  status: { type: String, required: false, default: 'uploading' },
  fileName: { type: String, required: false, default: 'documento.docx' },
  meta: { type: String, required: false, default: '' },
  progress: { type: Number, required: false, default: 0 },
  /** Texto do botão cancelar (uploading) */
  cancelLabel: { type: String, required: false, default: 'Cancelar' },
  removeLabel: { type: String, required: false, default: 'Remover arquivo' },
  /** Exibe % ao lado da barra */
  showPercentage: { type: Boolean, required: false, default: false },
})

const emit = defineEmits(['cancel', 'remove'])

const isUploading = computed(() => props.status === 'uploading')
const clampedProgress = computed(() => {
  const value = Number(props.progress) || 0
  return Math.min(100, Math.max(0, value))
})
const progressLabel = computed(() => `${Math.round(clampedProgress.value)}%`)

/** Progresso visual — sobe a 100% ao completar, depois some a barra */
const displayProgress = ref(clampedProgress.value)
const showProgress = ref(isUploading.value)
let completeTimer

watch(
  () => [props.status, clampedProgress.value],
  ([status, progress], prev) => {
    clearTimeout(completeTimer)
    if (status === 'uploading') {
      showProgress.value = true
      displayProgress.value = progress
      return
    }
    // Já montou como complete — sem animação de barra
    const wasUploading = prev?.[0] === 'uploading'
    displayProgress.value = Math.max(Number(progress) || 0, 100)
    if (!wasUploading && prev === undefined) {
      showProgress.value = false
      return
    }
    // Transição uploading → complete: preenche e colapsa
    showProgress.value = true
    completeTimer = setTimeout(() => {
      showProgress.value = false
    }, 380)
  },
  { immediate: true },
)

onUnmounted(() => clearTimeout(completeTimer))
</script>

<template>
  <div
    :class="[
      'doity-file-upload',
      `doity-file-upload--${status}`,
      { 'doity-file-upload--settling': status === 'complete' && showProgress },
    ]"
  >
    <div class="doity-file-upload__core">
      <div class="doity-file-upload__file-icon" aria-hidden="true">
        <slot name="icon">
          <Transition name="doity-fu-icon" mode="out-in">
            <Spinner
              v-if="isUploading"
              key="spinner"
              size="sm"
              color="default"
              label=""
            />
            <svg
              v-else
              key="file"
              class="doity-file-upload__file-svg"
              viewBox="0 0 18 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1V5C11 5.53043 11.2107 6.03914 11.5858 6.41421C11.9609 6.78929 12.4696 7 13 7H17M7 8H5M13 12H5M13 16H5M12 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V6L12 1Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Transition>
        </slot>
      </div>

      <div class="doity-file-upload__meta">
        <p class="doity-file-upload__name" :title="fileName">{{ fileName }}</p>
        <p v-if="meta" class="doity-file-upload__size">{{ meta }}</p>
      </div>

      <Transition name="doity-fu-action" mode="out-in">
        <Button
          v-if="isUploading"
          key="cancel"
          class="doity-file-upload__cancel"
          hierarchy="outline"
          size="sm"
          type="button"
          @click.stop="emit('cancel')"
        >
          <slot name="cancel">{{ cancelLabel }}</slot>
        </Button>
        <Button
          v-else
          key="remove"
          class="doity-file-upload__action"
          hierarchy="link"
          size="sm"
          icon="only"
          type="button"
          :aria-label="removeLabel"
          @click.stop="emit('remove')"
        >
          <slot name="remove-icon">
            <svg
              class="doity-file-upload__action-svg doity-file-upload__action-svg--delete"
              viewBox="0 0 13.4 14.7333"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M11.7 3.03334L11.2868 9.71673C11.1813 11.4243 11.1285 12.2781 10.7005 12.8919C10.4889 13.1954 10.2164 13.4515 9.90047 13.644C9.26141 14.0333 8.40599 14.0333 6.69516 14.0333C4.98208 14.0333 4.12554 14.0333 3.48604 13.6433C3.16987 13.4505 2.89733 13.1939 2.68579 12.8899C2.25792 12.2751 2.2063 11.4201 2.10307 9.7101L1.7 3.03334"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
              />
              <path
                d="M0.7 3.03334H12.7M9.40382 3.03334L8.9487 2.09449C8.64638 1.47084 8.49522 1.15902 8.23448 0.964539C8.17664 0.921402 8.1154 0.88303 8.05135 0.849803C7.76261 0.700002 7.41608 0.700002 6.72302 0.700002C6.01255 0.700002 5.65732 0.700002 5.36379 0.856082C5.29873 0.890674 5.23666 0.930599 5.1782 0.975447C4.91443 1.1778 4.76709 1.50104 4.4724 2.14751L4.06862 3.03334"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
              />
              <path
                d="M5.03333 10.3667L5.03333 6.36667"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
              />
              <path
                d="M8.36667 10.3667L8.36667 6.36667"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
              />
            </svg>
          </slot>
        </Button>
      </Transition>
    </div>

    <div
      class="doity-file-upload__progress-wrap"
      :class="{ 'doity-file-upload__progress-wrap--open': showProgress }"
    >
      <div class="doity-file-upload__progress-wrap-inner">
        <div class="doity-file-upload__progress-data-row">
          <div
            class="doity-file-upload__progress-track"
            role="progressbar"
            :aria-valuenow="displayProgress"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="progressLabel"
            :aria-hidden="!showProgress"
          >
            <div
              class="doity-file-upload__active-progress"
              :style="{ width: `${displayProgress}%` }"
            />
          </div>
          <span
            v-if="showPercentage"
            class="doity-file-upload__percentage"
          >{{ Math.round(displayProgress) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doity-file-upload {
  background: var(--doity-color-background-primary, #fff);
  border: 1px solid var(--doity-color-border-default, #e5e5e5);
  border-radius: var(--doity-radius-md, 8px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: var(--doity-font-family-sans);
  gap: 0;
  max-width: 100%;
  padding: var(--doity-spacing-4, 16px);
  transition:
    border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  width: 448px;
}

.doity-file-upload:hover {
  border-color: var(--doity-color-border-strong, #d4d4d4);
  box-shadow: var(--doity-shadow-sm, 0 1px 2px rgb(0 0 0 / 6%));
}

.doity-file-upload__core {
  align-items: center;
  display: flex;
  gap: var(--doity-spacing-4, 16px);
  width: 100%;
}

.doity-file-upload__file-icon {
  align-items: center;
  background: var(--doity-color-background-tertiary, #f5f5f5);
  border-radius: var(--doity-radius-sm, 6px);
  color: var(--doity-color-text-secondary, #737373);
  display: flex;
  flex-shrink: 0;
  height: 32px;
  justify-content: center;
  overflow: hidden;
  width: 32px;
}

.doity-file-upload__file-svg {
  display: block;
  height: 18px;
  width: 16px;
}

.doity-file-upload__meta {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 0;
  min-width: 0;
}

.doity-file-upload__name {
  color: var(--doity-color-text-primary, #0a0a0a);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-medium, 500);
  line-height: var(--doity-font-lineHeight-md, 20px);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doity-file-upload__size {
  color: var(--doity-color-text-secondary, #737373);
  font-size: var(--doity-font-size-sm, 14px);
  font-weight: var(--doity-font-weight-regular, 400);
  line-height: var(--doity-font-lineHeight-md, 20px);
  margin: 0;
}

.doity-file-upload__cancel {
  flex-shrink: 0;
}

/* Reusa Button (icon-only/link), mas mantém o botão compacto 24x24 do Figma */
.doity-file-upload__core .doity-file-upload__action.doity-btn {
  background: var(--doity-color-background-tertiary, #f5f5f5);
  border: none;
  border-radius: var(--doity-radius-md, 8px);
  color: var(--doity-color-text-secondary, #737373);
  flex-shrink: 0;
  height: 24px;
  min-height: 24px;
  width: 24px;
}

.doity-file-upload__core .doity-file-upload__action.doity-btn:hover:not(:disabled) {
  background: var(--doity-color-action-secondary-pressed, #ebebeb);
  color: var(--doity-color-text-secondary, #737373);
}

.doity-file-upload__action-svg {
  display: block;
}

.doity-file-upload__action-svg--delete {
  height: 12px;
  width: 12px;
}

/* Barra: colapsa com grid ao ir para complete */
.doity-file-upload__progress-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.36s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-file-upload__progress-wrap--open {
  grid-template-rows: 1fr;
}

.doity-file-upload__progress-wrap-inner {
  min-height: 0;
  overflow: hidden;
}

.doity-file-upload__progress-data-row {
  align-items: center;
  display: flex;
  gap: var(--doity-spacing-3, 12px);
  opacity: 0;
  padding-top: 0;
  transition:
    opacity 0.28s ease,
    padding-top 0.36s cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;
}

.doity-file-upload__progress-wrap--open .doity-file-upload__progress-data-row {
  opacity: 1;
  padding-top: var(--doity-spacing-4, 16px);
}

.doity-file-upload__progress-track {
  background: color-mix(in srgb, var(--doity-color-text-primary, #171717) 20%, transparent);
  border-radius: 9999px;
  flex: 1 1 0;
  height: 8px;
  min-width: 0;
  overflow: hidden;
  position: relative;
}

.doity-file-upload__active-progress {
  background: var(--doity-color-text-primary, #171717);
  border-radius: 9999px;
  height: 100%;
  max-width: 100%;
  transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-file-upload__percentage {
  color: var(--doity-color-text-secondary, #737373);
  flex-shrink: 0;
  font-size: var(--doity-font-size-xs, 12px);
  font-weight: var(--doity-font-weight-semibold, 600);
  line-height: var(--doity-font-lineHeight-xs, 16px);
  white-space: nowrap;
}

/* Troca spinner ↔ arquivo */
.doity-fu-icon-enter-active,
.doity-fu-icon-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-fu-icon-enter-from {
  opacity: 0;
  transform: scale(0.7);
}

.doity-fu-icon-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

/* Troca Cancel ↔ remover */
.doity-fu-action-enter-active,
.doity-fu-action-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.doity-fu-action-enter-from {
  opacity: 0;
  transform: translateX(6px) scale(0.96);
}

.doity-fu-action-leave-to {
  opacity: 0;
  transform: translateX(-4px) scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .doity-file-upload,
  .doity-file-upload__action,
  .doity-file-upload__active-progress,
  .doity-file-upload__progress-wrap,
  .doity-file-upload__progress-data-row,
  .doity-fu-icon-enter-active,
  .doity-fu-icon-leave-active,
  .doity-fu-action-enter-active,
  .doity-fu-action-leave-active {
    transition: none;
  }
}
</style>
