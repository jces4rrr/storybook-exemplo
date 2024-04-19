import { createLocalVue, mount, shallowMount } from '@vue/test-utils'

import Vuetify from 'vuetify/lib/framework'
import VueI18n from 'vue-i18n'
const br = require('@/locales/br.json')

import VueRouter from 'vue-router'
import Vuex from 'vuex'

export function customLocalVue(options) {
  const { i18n, vuex } = { i18n: true, vuex: false, ...options }

  const localVue = createLocalVue()

  localVue.directive('mask', jest.fn())

  if (i18n) {
    localVue.use(VueI18n)
  }

  if (vuex) {
    localVue.use(Vuex)
  }

  return localVue
}

export function customPluginVue_Vuetify() {
  const breakpoint = {
    init: jest.fn(),
    framework: {},
    smAndDown: true,
  }

  const vuetify = new Vuetify()
  vuetify.framework.breakpoint = breakpoint

  return vuetify
}

export function customPluginVue_VueI18n() {
  const i18n = new VueI18n({
    locale: 'br',
    fallbackLocale: 'br',
    messages: {
      br: br,
    },
  })

  return i18n
}

export function customPluginVue_VueRouter() {
  const router = new VueRouter()

  return router
}

function buildDefaultOptions(localVueOptions = {}) {
  const localVue = customLocalVue(localVueOptions)

  const vuetify = customPluginVue_Vuetify()
  const i18n = customPluginVue_VueI18n()
  const router = customPluginVue_VueRouter()

  return {
    localVue,
    vuetify,
    router,
    i18n,
  }
}

export function customShallowMount(component, options) {
  return shallowMount(component, {
    ...buildDefaultOptions(),
    ...options,
  })
}

export function customMount(component, options) {
  document.body.setAttribute('data-app', true)

  return mount(component, {
    ...buildDefaultOptions({
      vuex: true,
    }),
    ...options,
  })
}

/** Helpers */

/**
 * Generates mock data based on the original data.
 *
 * @param {Object} itemSample - The original data to generate mock data from.
 * @param {number} quantityOfItens - The number of mock data to generate.
 * @param {Array} itemIncrementableFields - The fields that can be incremented in the mock data.
 * @return {Array} An array of mock data generated from the original data.
 */
export function generateMockData(
  itemSample,
  quantityOfItens,
  itemIncrementableFields = ['id', 'name']
) {
  return Array.from(Array(quantityOfItens), (_, index) => {
    let mockedItem = structuredClone(itemSample)

    itemIncrementableFields.forEach((field) => {
      mockedItem[field] = `${itemSample[field] || 0}_${index}`
    })

    return mockedItem
  })
}
