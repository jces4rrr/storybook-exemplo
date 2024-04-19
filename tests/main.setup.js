import { config } from '@vue/test-utils'

config.mocks['$t'] = (msg) => msg
config.mocks['$can'] = () => true
config.mocks['$store'] = {
  dispatch: jest.fn().mockReturnValue(Promise.resolve()),
}
config.mocks['$router'] = {
  push: jest.fn().mockReturnValue(Promise.resolve()),
  replace: jest.fn().mockReturnValue(Promise.resolve()),
}

config.stubs['router-view'] = true
config.stubs['router-link'] = {
  template: `<div><slot name="default" v-bind="{navigate}" /></div>`,
  methods: {
    navigate: jest.fn(),
  },
}

config.stubs['can'] = true
config.stubs['treeselect'] = true
config.stubs['apexchart'] = {
  render: () => {},
  methods: {
    resetSeries: () => {},
    updateOptions: () => {},
    updateSeries: () => {},
    addPointAnnotation: () => {},
  },
}

config.stubs['v-lazy'] = {
  template: `<div><slot name="default" /></div>`,
}

jest.mock('@/plugins/i18n', () => ({
  t: (msg) => msg,
}))

/** Vue */
import Vue from 'vue'

Vue.prototype.CDN_BASE_URL = ''
document.body.setAttribute('data-app', true)

import Vuetify from 'vuetify'
Vue.use(Vuetify)

/** Javascript */
/** Mocks */
// DragEvent ClipboardEvent [https://github.com/jsdom/jsdom/issues/1568]
class ClipboardEventMock extends Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict)
    this.clipboardData = {
      getData: jest.fn(),
      setData: jest.fn(),
    }
  }
}
global.ClipboardEvent = ClipboardEventMock

class DragEventMock extends Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict)
    this.dataTransfer = {
      getData: jest.fn(),
      setData: jest.fn(),
    }
  }
}
global.DragEvent = DragEventMock
