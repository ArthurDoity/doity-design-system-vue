<script setup>
const props = defineProps({
  items: { type: Array, required: false, default: () => [] }
});
const { items } = toRefs(props);
</script>

<template>
  <nav class="doity-breadcrumb">
    <ol class="doity-breadcrumb__list">
      <slot>
        <li
          v-for="(item, index) in items"
          :key="index"
          class="doity-breadcrumb__item"
          :class="{ 'doity-breadcrumb__item--current': index === items.length - 1 }"
        >
          <NuxtLink v-if="item.to && index < items.length - 1" :to="item.to" class="doity-breadcrumb__link">
            {{ item.label }}
          </NuxtLink>
          <a v-else-if="item.href && index < items.length - 1" :href="item.href" class="doity-breadcrumb__link">
            {{ item.label }}
          </a>
          <span v-else class="doity-breadcrumb__current">{{ item.label }}</span>
          <span v-if="index < items.length - 1" class="doity-breadcrumb__sep">›</span>
        </li>
      </slot>
    </ol>
  </nav>
</template>

<style scoped>
.doity-breadcrumb__list{display:flex;flex-wrap:wrap;font-family:var(--doity-font-family-sans);font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-regular);line-height:var(--doity-font-lineHeight-xs);list-style:none;margin:0;padding:0}.doity-breadcrumb__item,.doity-breadcrumb__list{align-items:center;gap:var(--doity-component-breadcrumb-gap,6px)}.doity-breadcrumb__item{display:inline-flex}.doity-breadcrumb__link{color:var(--doity-color-text-secondary);text-decoration:none}.doity-breadcrumb__link:hover{text-decoration:underline}.doity-breadcrumb__current{color:var(--doity-color-text-primary)}.doity-breadcrumb__sep{color:var(--doity-color-text-tertiary);font-size:var(--doity-component-breadcrumb-chevronSize,14px);line-height:1}
</style>
