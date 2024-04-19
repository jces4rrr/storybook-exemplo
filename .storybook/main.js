const path = require('path')

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

/** @type { import('@storybook/types').StorybookConfig } */
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    'storybook-addon-rem',
  ],

  framework: '@storybook/vue',
  core: {
    builder: '@storybook/builder-webpack5',
  },

  webpackFinal: async (config) => {
    config.plugins.push(new VuetifyLoaderPlugin())

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '..', 'src'),
    }

    config.module.rules.push({
      test: /\.s[ac]ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    })

    return config
  },
}
