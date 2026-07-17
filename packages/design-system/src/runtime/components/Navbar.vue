<script setup>
import AvatarLabelGroup from './AvatarLabelGroup.vue'
import Dropdown from './Dropdown.vue'

const props = defineProps({
  type: { type: String, required: false, default: "default" },
  contextLabel: { type: String, required: false, default: "Liga Acad\xEAmica de Cl\xEDnica M\xE9dica" },
  title: { type: String, required: false, default: "Meus Ingressos" },
  pageLabel: { type: String, required: false, default: "\xC1rea do participante" },
  roles: { type: Array, required: false, default: () => [
    { label: "Participante", value: "participant" },
    { label: "Organizador", value: "organizer" },
    { label: "Patrocinador", value: "sponsor" },
    { label: "Avaliador", value: "reviewer" }
  ] },
  activeRole: { type: String, required: false, default: "participant" },
  user: { type: Object, required: false, default: () => ({
    name: "Eduardo Leandro",
    email: "eduardo@doity.com.br"
  }) },
  sticky: { type: Boolean, required: false, default: false },
  showHelp: { type: Boolean, required: false, default: true },
  showNotifications: { type: Boolean, required: false, default: true },
  /** Itens do menu do usuário (Dropdown) */
  userMenuItems: { type: Array, required: false, default: () => [
    { label: "Perfil", value: "profile" },
    { label: "Sair", value: "logout", destructive: true }
  ] }
});
const emit = defineEmits(["update:activeRole", "role-change", "help-click", "notifications-click", "user-menu-click"]);
function selectRole(value) {
  emit("update:activeRole", value);
  emit("role-change", value);
}
function onUserMenuSelect(item) {
  emit("user-menu-click", item);
}
</script>

<template>
  <header :class="['doity-navbar', { 'doity-navbar--sticky': sticky }]">
    <div class="doity-navbar__inner">
      <div class="doity-navbar__start">
        <slot name="start">
          <p
            v-if="type === 'default'"
            class="doity-navbar__context"
          >
            {{ contextLabel }}
          </p>

          <h1
            v-else-if="type === 'title'"
            class="doity-navbar__title"
          >
            {{ title }}
          </h1>

          <nav
            v-else-if="type === 'user'"
            class="doity-navbar__roles"
            aria-label="Perfis de acesso"
          >
            <template v-for="role in roles" :key="role.value">
              <NuxtLink
                v-if="role.to"
                :to="role.to"
                :class="['doity-navbar__role', { 'doity-navbar__role--active': role.value === activeRole }]"
                @click="selectRole(role.value)"
              >
                {{ role.label }}
              </NuxtLink>
              <a
                v-else-if="role.href"
                :href="role.href"
                :class="['doity-navbar__role', { 'doity-navbar__role--active': role.value === activeRole }]"
                @click="selectRole(role.value)"
              >
                {{ role.label }}
              </a>
              <button
                v-else
                type="button"
                :class="['doity-navbar__role', { 'doity-navbar__role--active': role.value === activeRole }]"
                @click="selectRole(role.value)"
              >
                {{ role.label }}
              </button>
            </template>
          </nav>

          <p
            v-else-if="type === 'page'"
            class="doity-navbar__page-label"
          >
            {{ pageLabel }}
          </p>
        </slot>
      </div>

      <div class="doity-navbar__end">
        <slot name="actions" />

        <button
          v-if="showHelp"
          type="button"
          class="doity-navbar__icon-btn"
          aria-label="Ajuda"
          @click="emit('help-click')"
        >
          <svg class="doity-navbar__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="8.25" stroke="currentColor" stroke-width="1.5" />
            <path d="M7.75 7.5c.25-1.25 1.35-2 2.75-2 1.65 0 2.75 1.05 2.75 2.35 0 1.45-1.1 2-2.2 2.55-.75.4-1.05.8-1.05 1.6v.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <circle cx="10" cy="14.75" r="1" fill="currentColor" />
          </svg>
        </button>

        <button
          v-if="showNotifications"
          type="button"
          class="doity-navbar__icon-btn"
          aria-label="Notificações"
          @click="emit('notifications-click')"
        >
          <svg class="doity-navbar__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M6.5 14.5h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M4.75 7.75a5.25 5.25 0 0 1 10.5 0c0 4.25 1.25 5.25 2.25 6.75H2.5c1-1.5 2.25-2.5 2.25-6.75Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
          </svg>
        </button>

        <slot name="user">
          <Dropdown
            class="doity-navbar__user-dropdown"
            align="right"
            :items="userMenuItems"
            @select="onUserMenuSelect"
          >
            <template #trigger>
              <span class="doity-navbar__user">
                <AvatarLabelGroup
                  class="doity-navbar__user-main"
                  :src="user?.avatarSrc"
                  :name="user?.name"
                  :description="user?.email"
                  size="sm"
                />
                <svg class="doity-navbar__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </template>
          </Dropdown>
        </slot>
      </div>
    </div>
  </header>
</template>

<style scoped>
.doity-navbar{background:var(--doity-color-background-navbar);border-bottom:1px solid var(--doity-color-border-navbar);font-family:var(--doity-font-family-sans);width:100%}.doity-navbar--sticky{position:sticky;top:0;z-index:100}.doity-navbar__inner{align-items:center;display:flex;gap:var(--doity-spacing-6);height:var(--doity-component-navbar-height);justify-content:space-between;padding:0 var(--doity-component-navbar-paddingX)}.doity-navbar__start{align-items:center;display:flex;min-width:0}.doity-navbar__context{font-size:var(--doity-component-navbar-contextFontSize);font-weight:var(--doity-font-weight-regular);line-height:normal;text-decoration:underline;text-transform:uppercase;text-underline-position:from-font}.doity-navbar__context,.doity-navbar__title{color:var(--doity-color-text-primary);margin:0;white-space:nowrap}.doity-navbar__title{font-size:var(--doity-font-size-2xl);font-weight:var(--doity-font-weight-semibold);line-height:var(--doity-font-lineHeight-2xl)}.doity-navbar__page-label{color:var(--doity-color-text-primary);font-size:var(--doity-font-size-md);font-weight:var(--doity-font-weight-medium);line-height:var(--doity-font-lineHeight-lg);margin:0;white-space:nowrap}.doity-navbar__roles{align-items:center;display:flex;gap:var(--doity-component-navbar-rolesGap)}.doity-navbar__role{background:none;border:none;color:var(--doity-color-text-tertiary);cursor:pointer;font-family:inherit;font-size:var(--doity-font-size-xs);font-weight:var(--doity-font-weight-medium);line-height:var(--doity-font-lineHeight-xs);padding:0;text-decoration:none;white-space:nowrap}.doity-navbar__role--active{color:var(--doity-color-text-primary)}.doity-navbar__end{align-items:center;display:flex;flex-shrink:0;gap:var(--doity-component-navbar-actionsGap)}.doity-navbar__icon-btn{align-items:center;background:none;border:none;color:var(--doity-color-text-primary);cursor:pointer;display:inline-flex;height:var(--doity-component-navbar-iconSize);justify-content:center;padding:0;width:var(--doity-component-navbar-iconSize)}.doity-navbar__icon{height:100%;width:100%}.doity-navbar__user{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;font-family:inherit;gap:var(--doity-component-navbar-userGap);padding:0}.doity-navbar__user-main{align-items:center;display:inline-flex;gap:var(--doity-component-navbar-avatarTextGap)}.doity-navbar__user-text{align-items:flex-start;display:flex;flex-direction:column;justify-content:center;text-align:left}.doity-navbar__user-name{color:var(--doity-color-text-primary);font-weight:var(--doity-font-weight-medium)}.doity-navbar__user-email,.doity-navbar__user-name{font-size:var(--doity-font-size-xs);line-height:var(--doity-font-lineHeight-xs)}.doity-navbar__user-email{color:var(--doity-color-text-tertiary);font-weight:var(--doity-font-weight-regular)}.doity-navbar__chevron{color:var(--doity-color-text-brand);flex-shrink:0;height:var(--doity-component-navbar-chevronSize);width:var(--doity-component-navbar-chevronSize)}.doity-navbar__user-dropdown{display:inline-flex}.doity-navbar__user-main{cursor:pointer}.doity-navbar__user-main :deep(.doity-avatar-label__name){font-weight:var(--doity-font-weight-medium)}.doity-navbar__user-main :deep(.doity-avatar-label__description){color:var(--doity-color-text-tertiary)}@media (max-width:1024px){.doity-navbar__inner{padding:0 var(--doity-spacing-6)}.doity-navbar__user-main :deep(.doity-avatar-label__text){display:none}}
</style>
