const { defineConfig } = require('@vue/cli-service')

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = defineConfig({
  filenameHashing: false,

  css: {
    extract: false,
  },

  pluginOptions: {
    i18n: {
      locale: 'br',
      fallbackLocale: 'br',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },

  transpileDependencies: ['vuetify'],

  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/assets/',
            to: './',
          },
        ],
      }),
    ],
  },

  /** @param {import('webpack-chain')} config */
  chainWebpack: (config) => {
    let types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) => {
      config.module.rule('sass').oneOf(type).use('sass-loader')
    })

    config.externals({
      vue: {
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
        root: 'Vue',
      },
      vuetify: {
        commonjs: 'vuetify',
        commonjs2: 'vuetify',
        amd: 'vuetify',
        root: 'Vuetify',
      },
    })
  },
})
