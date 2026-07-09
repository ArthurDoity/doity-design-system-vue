import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addImportsDir,
  addPlugin,
} from '@nuxt/kit'

export interface ModuleOptions {
  /** Prefixo dos componentes auto-registrados (padrão: Doity) */
  prefix?: string
  /** Injeta tokens.css, base.css e components.css globalmente */
  injectTokens?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@arthurdoity/design-system',
    configKey: 'doityDesignSystem',
    compatibility: {
      nuxt: '>=3.0.0 || ^4.0.0',
    },
  },
  defaults: {
    prefix: 'Doity',
    injectTokens: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const runtimeDir = resolver.resolve('./runtime')

    if (options.injectTokens) {
      nuxt.options.css.push(
        resolver.resolve('./runtime/assets/css/tokens.css'),
        resolver.resolve('./runtime/assets/css/base.css'),
        resolver.resolve('./runtime/assets/css/components.css'),
      )
    }

    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      prefix: options.prefix,
      pathPrefix: false,
      global: true,
    })

    addImportsDir(resolver.resolve('./runtime/composables'))
    addPlugin(resolver.resolve('./runtime/plugins/toast.client'))

    nuxt.options.alias['#doity-design-system'] = runtimeDir
  },
})
