<script setup>
import { toRefs } from 'vue'
const props = defineProps({
  roles: { type: Array, required: false, default: () => [] },
  activeRole: { type: String, required: false, default: "" },
  items: { type: Array, required: false, default: () => [] },
  showCta: { type: Boolean, required: false, default: false },
  profileCard: { type: [Object, null], required: false, default: null },
  collapsed: { type: Boolean, required: false, default: false }
});
const { roles, activeRole, items, showCta, profileCard, collapsed } = toRefs(props);
const emit = defineEmits(["update:activeRole", "update:collapsed", "cta-click", "logout-click"]);
function selectRole(role) {
  if (role.to || role.href) return;
  emit("update:activeRole", role.value);
}
function toggleCollapsed() {
  emit("update:collapsed", !props.collapsed);
}
function onCtaClick() {
  emit("cta-click");
}
function onLogoutClick() {
  emit("logout-click");
}
</script>

<template>
  <aside :class="['doity-sidebar', { 'doity-sidebar--collapsed': collapsed }]">
    <header class="doity-sidebar__header">
      <slot name="logo" />
      <button
        type="button"
        class="doity-sidebar__collapse"
        @click="toggleCollapsed"
      >
        ‹
      </button>
    </header>

    <div v-if="roles.length && !collapsed" class="doity-sidebar__roles">
      <template v-for="role in roles" :key="role.value">
        <NuxtLink
          v-if="role.to"
          :to="role.to"
          class="doity-sidebar__role"
          :class="{ 'doity-sidebar__role--active': role.value === activeRole }"
        >
          {{ role.label }}
        </NuxtLink>
        <a
          v-else-if="role.href"
          :href="role.href"
          class="doity-sidebar__role"
          :class="{ 'doity-sidebar__role--active': role.value === activeRole }"
        >
          {{ role.label }}
        </a>
        <button
          v-else
          type="button"
          class="doity-sidebar__role"
          :class="{ 'doity-sidebar__role--active': role.value === activeRole }"
          @click="selectRole(role)"
        >
          {{ role.label }}
        </button>
      </template>
    </div>

    <nav class="doity-sidebar__nav">
      <slot>
        <template v-for="item in items" :key="item.label">
          <NuxtLink v-if="item.to" :to="item.to" class="doity-sidebar__item" :class="{ 'doity-sidebar__item--active': item.active }">
            <span class="doity-sidebar__icon">{{ item.icon }}</span>
            <span v-if="!collapsed" class="doity-sidebar__label">{{ item.label }}</span>
          </NuxtLink>
          <a v-else-if="item.href" :href="item.href" class="doity-sidebar__item" :class="{ 'doity-sidebar__item--active': item.active }">
            <span class="doity-sidebar__icon">{{ item.icon }}</span>
            <span v-if="!collapsed" class="doity-sidebar__label">{{ item.label }}</span>
          </a>
          <button v-else type="button" class="doity-sidebar__item" :class="{ 'doity-sidebar__item--active': item.active }">
            <span class="doity-sidebar__icon">{{ item.icon }}</span>
            <span v-if="!collapsed" class="doity-sidebar__label">{{ item.label }}</span>
          </button>
        </template>
      </slot>
    </nav>

    <div class="doity-sidebar__bottom">
      <div v-if="!collapsed" class="doity-sidebar__divider" />

      <button v-if="showCta && !collapsed" type="button" class="doity-sidebar__cta" @click="onCtaClick">
        <slot name="cta-label">Criar novo</slot>
      </button>

      <div v-if="profileCard && !collapsed" class="doity-sidebar__card">
        <p class="doity-sidebar__card-title">{{ profileCard.title }}</p>
        <p v-if="profileCard.subtitle" class="doity-sidebar__card-subtitle">{{ profileCard.subtitle }}</p>
        <div class="doity-sidebar__progress-track">
          <span class="doity-sidebar__progress-fill" :style="{ width: `${Math.min(100, Math.max(0, profileCard.progress ?? 0))}%` }" />
        </div>
        <p v-if="profileCard.progressLabel" class="doity-sidebar__card-progress">{{ profileCard.progressLabel }}</p>
      </div>

      <button type="button" class="doity-sidebar__item doity-sidebar__logout" @click="onLogoutClick">
        <span class="doity-sidebar__icon">↪</span>
        <span v-if="!collapsed" class="doity-sidebar__label"><slot name="logout-label">Sair</slot></span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.doity-sidebar{background:var(--doity-color-background-primary);border-right:1px solid var(--doity-color-border-secondary);display:flex;flex-direction:column;font-family:var(--doity-font-family-sans);min-height:100%;transition:width .2s ease;width:var(--doity-component-sidebar-width,260px)}.doity-sidebar--collapsed{width:var(--doity-component-sidebar-widthCollapsed,48px)}.doity-sidebar__header{align-items:center;display:flex;height:var(--doity-component-sidebar-headerHeight,80px);justify-content:space-between;padding:var(--doity-spacing-5)}.doity-sidebar__collapse{align-items:center;background:transparent;border:0;color:var(--doity-color-text-secondary);cursor:pointer;display:inline-flex;height:20px;justify-content:center;padding:0;width:20px}.doity-sidebar__roles{background:var(--doity-color-background-tertiary);border-radius:var(--doity-radius-lg);display:grid;gap:2px;grid-auto-columns:1fr;grid-auto-flow:column;height:var(--doity-component-sidebar-tabsHeight,36px);margin:0 var(--doity-spacing-3) var(--doity-spacing-4);padding:2px}.doity-sidebar__role{align-items:center;background:transparent;border:0;border-radius:var(--doity-radius-md);color:var(--doity-color-text-secondary);cursor:pointer;display:inline-flex;font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-regular);justify-content:center;line-height:var(--doity-font-lineHeight-xs);padding:0 var(--doity-spacing-2);text-decoration:none}.doity-sidebar__role--active{background:var(--doity-color-background-primary);box-shadow:var(--doity-shadow-sm);color:var(--doity-color-text-primary);font-weight:var(--doity-font-weight-medium)}.doity-sidebar__nav{display:flex;flex:1;flex-direction:column;gap:var(--doity-component-sidebar-itemGap,4px);padding:0 var(--doity-spacing-3)}.doity-sidebar__item{align-items:center;background:transparent;border:0;border-radius:var(--doity-radius-md);color:var(--doity-color-text-secondary);cursor:pointer;display:flex;gap:var(--doity-spacing-2);height:var(--doity-component-sidebar-itemHeight,32px);padding:0 var(--doity-spacing-2);text-decoration:none}.doity-sidebar__item--active,.doity-sidebar__item:hover{background:var(--doity-color-background-tertiary)}.doity-sidebar__item--active .doity-sidebar__label{font-weight:var(--doity-font-weight-medium)}.doity-sidebar__icon{align-items:center;color:inherit;display:inline-flex;font-size:var(--doity-font-size-xs);height:var(--doity-component-sidebar-iconSize,16px);justify-content:center;line-height:1;width:var(--doity-component-sidebar-iconSize,16px)}.doity-sidebar__label{font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-regular);line-height:var(--doity-font-lineHeight-xs);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.doity-sidebar__bottom{display:flex;flex-direction:column;gap:var(--doity-spacing-3);padding:var(--doity-spacing-4) var(--doity-spacing-3) var(--doity-spacing-5)}.doity-sidebar__divider{background:var(--doity-color-border-secondary);height:1px}.doity-sidebar__cta{background:var(--doity-color-action-primary-default);border:0;border-radius:var(--doity-radius-button-md,10px);color:var(--doity-color-text-on-primary);cursor:pointer;font-size:var(--doity-component-button-fontSize-md,14px);font-weight:var(--doity-font-weight-medium);height:var(--doity-component-button-height-md,36px);width:100%}.doity-sidebar__card{background:var(--doity-color-background-secondary);border-radius:var(--doity-radius-lg);padding:var(--doity-spacing-3)}.doity-sidebar__card-title{color:var(--doity-color-text-primary);font-size:var(--doity-font-size-sm);font-weight:var(--doity-font-weight-medium);line-height:var(--doity-font-lineHeight-sm);margin:0}.doity-sidebar__card-progress,.doity-sidebar__card-subtitle{color:var(--doity-color-text-secondary);font-size:var(--doity-font-size-xs);line-height:var(--doity-font-lineHeight-xs);margin:var(--doity-spacing-1) 0 0}.doity-sidebar__progress-track{background:var(--doity-color-border-secondary);border-radius:var(--doity-radius-full);height:6px;margin-top:var(--doity-spacing-2);overflow:hidden;width:100%}.doity-sidebar__progress-fill{background:var(--doity-color-action-primary-default);border-radius:inherit;display:block;height:100%}.doity-sidebar__logout{margin-top:auto}.doity-sidebar--collapsed .doity-sidebar__bottom,.doity-sidebar--collapsed .doity-sidebar__header,.doity-sidebar--collapsed .doity-sidebar__nav{padding-left:var(--doity-spacing-2);padding-right:var(--doity-spacing-2)}
</style>
