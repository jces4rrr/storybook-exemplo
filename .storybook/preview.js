import Vue from 'vue'

import i18n from '@/plugins/i18n'

import vuetify from './vuetify'

import 'floating-vue/dist/style.css'

import '@/styles/main.scss'
import '@/styles/styles.scss'

import '@/styles/vendors/_storybook.scss'

import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

/** @type { import('@storybook/vue').Decorator } */
const decorators = [
  (story, context) => {
    i18n.locale = context.globals.locale

    const wrapped = story(context)

    return Vue.extend({
      name: 'StorybookApp',
      vuetify,
      i18n,
      components: { wrapped },
      template: `
      <v-app>
        <v-main class="page storybook">
          <v-container fluid>
            <wrapped></wrapped>
          </v-container>
        </v-main>
      </v-app>
      `,
    })
  },
]

/** @type { import('@storybook/vue').Parameters } */
const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'blue',
        value: '#f3f6fb',
      },
    ],
  },
}

/** @type { import('@storybook/vue').GlobalTypes } */
const globalTypes = {
  locale: {
    name: 'locale',
    description: 'vue-i18n locale',
    defaultValue: 'br',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'br', right: '🇧🇷', title: 'Português' },
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'es', right: '🇪🇸', title: 'Español' },
      ],
      title: true,
      dynamicTitle: true,
    },
  },
}

/** @type { import('@storybook/vue').ArgTypes } */
const argTypes = {}

/** @type { import('@storybook/vue').Args } */
const args = {}

export { decorators, parameters, globalTypes, argTypes, args }
