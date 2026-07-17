<script setup>
/**
 * Alias de ChoiceOption alinhado ao Figma "Checkbox group item".
 * Preferir DoityCheckboxGroupItem em código novo; DoityChoiceOption permanece por compatibilidade.
 */
import ChoiceOption from './ChoiceOption.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: { type: [String, Number, Array], required: false, default: '' },
  value: { type: [String, Number], required: true },
  label: { type: String, required: false },
  description: { type: String, required: false, default: '' },
  name: { type: String, required: false },
  /** control | icon | card | default */
  variant: { type: String, required: false, default: 'control' },
  icon: { type: String, required: false, default: '' },
  type: { type: String, required: false, default: 'checkbox' },
  control: { type: String, required: false, default: '' },
  size: { type: String, required: false, default: 'sm' },
  showCheck: { type: Boolean, required: false, default: true },
  price: { type: String, required: false, default: '' },
  priceSuffix: { type: String, required: false, default: '' },
  tag: { type: String, required: false, default: '' },
  disabled: { type: Boolean, required: false, default: false },
  id: { type: String, required: false },
})

defineEmits(['update:modelValue', 'select'])
</script>

<template>
  <ChoiceOption
    v-bind="{ ...props, ...$attrs }"
    @update:model-value="$emit('update:modelValue', $event)"
    @select="$emit('select', $event)"
  >
    <template
      v-for="(_, name) in $slots"
      :key="name"
      #[name]="slotData"
    >
      <slot
        :name="name"
        v-bind="slotData || {}"
      />
    </template>
  </ChoiceOption>
</template>
