import '@/styles/main.scss'

import * as components from './components'

const TcComponents = {
  install(Vue) {
    for (const componentName in components) {
      const component = components[componentName]

      Vue.component(component.name, component)
    }
  },
}

export default TcComponents
export * from './components'
