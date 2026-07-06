<script setup>
import Button from './Button.vue'

const props = defineProps({
  title: { type: String, required: false, default: "Nenhum dado encontrado" },
  description: { type: String, required: false, default: "N\xE3o h\xE1 itens para exibir no momento." },
  size: { type: String, required: false, default: "md" },
  primaryLabel: { type: String, required: false, default: "Criar item" },
  secondaryLabel: { type: String, required: false, default: "Voltar" },
  hideActions: { type: Boolean, required: false, default: false }
});
const emit = defineEmits(["primary", "secondary"]);
</script>

<template>
  <div :class="['doity-empty', `doity-empty--${props.size}`]">
    <div class="doity-empty__icon">
      <slot name="icon">📭</slot>
    </div>
    <h3 class="doity-empty__title">{{ props.title }}</h3>
    <p class="doity-empty__description">{{ props.description }}</p>
    <div v-if="!props.hideActions" class="doity-empty__action">
      <slot>
        <Button hierarchy="primary" size="md" @click="emit('primary')">
          {{ props.primaryLabel }}
        </Button>
        <Button hierarchy="outline" size="md" @click="emit('secondary')">
          {{ props.secondaryLabel }}
        </Button>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.doity-empty{flex-direction:column;font-family:var(--doity-font-family-sans);padding:var(--doity-spacing-12);text-align:center}.doity-empty,.doity-empty__icon{align-items:center;display:flex;justify-content:center}.doity-empty__icon{background:var(--doity-color-background-tertiary);border-radius:var(--doity-radius-lg);color:var(--doity-color-text-secondary);font-size:20px;height:40px;margin-bottom:var(--doity-spacing-4);width:40px}.doity-empty--sm{padding:var(--doity-spacing-10)}.doity-empty__title{color:var(--doity-color-text-primary);font-size:var(--doity-font-size-lg);font-weight:var(--doity-font-weight-medium);line-height:var(--doity-font-lineHeight-xl);margin:0 0 var(--doity-spacing-2)}.doity-empty__description{color:var(--doity-color-text-secondary);font-size:var(--doity-font-size-sm);line-height:var(--doity-font-lineHeight-sm);margin:0 0 var(--doity-spacing-6);max-width:360px}.doity-empty__action{display:flex;gap:var(--doity-spacing-3)}
</style>
