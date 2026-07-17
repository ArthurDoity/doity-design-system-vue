<script setup>
import { computed } from 'vue'
import MinimalStepper from './MinimalStepper.vue'
import ArrowStepper from './ArrowStepper.vue'
import IconStepper from './IconStepper.vue'

/**
 * Facade de Stepper — escolhe a variação visual.
 * Demais props (modelValue, steps, title, compact, ...) e eventos
 * são repassados via $attrs para o componente escolhido.
 */
const props = defineProps({
  /** minimal | arrow | icons */
  variant: { type: String, required: false, default: 'icons' },
})

defineOptions({ inheritAttrs: false })

const resolved = computed(() => {
  const map = {
    minimal: MinimalStepper,
    arrow: ArrowStepper,
    icons: IconStepper,
  }
  return map[props.variant] || IconStepper
})
</script>

<template>
  <component :is="resolved" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </component>
</template>
