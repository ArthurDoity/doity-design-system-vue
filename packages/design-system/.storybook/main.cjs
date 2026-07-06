const { mergeConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')
const autoImportModule = require('unplugin-auto-import/vite')
const AutoImport = autoImportModule.default ?? autoImportModule
const vuePlugin = vue.default ?? vue
const { join } = require('node:path')

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|js)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        vuePlugin(),
        AutoImport({
          imports: [
            'vue',
            {
              '../src/runtime/composables/useDoityToast': ['useDoityToast'],
            },
          ],
          dts: false,
        }),
      ],
      resolve: {
        alias: {
          '@doity/components': join(__dirname, '../src/runtime/components'),
        },
      },
    })
  },
}

module.exports = config
