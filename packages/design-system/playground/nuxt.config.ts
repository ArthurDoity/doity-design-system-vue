export default defineNuxtConfig({
  modules: ['../src/module'],
  doityDesignSystem: {
    prefix: 'Doity',
    injectTokens: true,
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-01-01',
  app: {
    head: {
      title: 'Doity Design System',
      meta: [
        { name: 'description', content: 'Documentação visual do Doity Design System para Vue/Nuxt' },
      ],
    },
  },
})
