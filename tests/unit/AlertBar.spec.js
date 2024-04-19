import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import AlertBar from '@/components/AlertBar/AlertBar.vue'
import VueI18n from 'vue-i18n'

describe('AlertBar.vue', () => {
  const localVue = createLocalVue()

  let vuetify
  let wrapper

  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(VueI18n)

    wrapper = shallowMount(AlertBar, {
      localVue,
      vuetify,
    })
  })

  test('Checking if alertbar is displayed or renderized with content', async () => {
    const message = {
      title: 'title test1',
      description: 'description test1',
      type: 'success',
    }

    wrapper.vm.displayAlert(message)
    wrapper.vm.handleShow()

    const alertbar = wrapper.find('#alertbar')
    expect(alertbar.exists()).toBe(true)
  })

  test('Checking if alertbar is displayed success', async () => {
    const message = {
      title: 'title test2',
      description: 'description test2',
      type: 'success',
      hasIconTitle: true,
    }

    await wrapper.vm.displayAlert(message)
    await wrapper.vm.handleShow()
    await wrapper.vm.handleTimer()

    const successIcon = wrapper.find('#successIcon')
    expect(successIcon.exists()).toBe(true)
  })

  test('Checking if alertbar is displayed error', async () => {
    const message = {
      title: 'title test3',
      description: 'description test4',
      type: 'error',
      hasIconTitle: true,
    }

    await wrapper.vm.displayAlert(message)
    await wrapper.vm.handleShow()
    await wrapper.vm.handleTimer()

    const errorIcon = wrapper.find('#errorIcon')
    expect(errorIcon.exists()).toBe(true)
  })

  test('Checking close alert', async () => {
    await wrapper.setData({ show: false })
    await wrapper.vm.handleShow()
  })

  test('test', async () => {
    await wrapper.setData({ currentTime: 10000 })
    await wrapper.vm.handleTimer()
  })

  test('Checking $root.$off', async () => {
    let localWrapper = shallowMount(AlertBar, {
      localVue,
      vuetify,
    })

    localWrapper.destroy()
    localWrapper = null
  })
})
