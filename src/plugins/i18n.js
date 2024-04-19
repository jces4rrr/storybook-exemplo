import Vue from 'vue'

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import { loadLocaleMessages } from '@/helpers/locale'

export default new VueI18n({
  locale: 'br',
  fallbackLocale: 'br',
  messages: loadLocaleMessages(),
})
