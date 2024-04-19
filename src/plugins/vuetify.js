import Vue from 'vue'

import Vuetify from 'vuetify/lib'

import en from 'vuetify/lib/locale/en'
import es from 'vuetify/lib/locale/es'
import pt from 'vuetify/lib/locale/pt'

Vue.use(Vuetify)

// import variables from '@/styles/scss/_colors.scss'

import LRU from 'lru-cache'
const themeCache = new LRU({
  max: 10,
  ttl: 1000 * 60 * 60, // 1 hour
})

/** @type {import('vuetify/types').UserVuetifyPreset} */
export const options = {
  rtl: false,
  lang: {
    locales: {
      en,
      es,
      br: pt,
    },
    current: 'br',
  },
  breakpoint: {
    thresholds: {
      xs: 515,
      sm: 768,
      md: 992,
      lg: 1280,
    },
    scrollBarWidth: 10,
  },
  theme: {
    dark: false,
    options: {
      customProperties: true,
      themeCache,
    },
    themes: {
      light: {
        primary: '#dd0041',
        redcolor: '#e71616',
        successcolor: '#09b930',
      },
    },
  },
}

Vuetify.config.silent = true

export default new Vuetify(options)
