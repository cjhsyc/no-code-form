const widgets = import.meta.glob('./*.vue')

import type { Plugin } from 'vue'

let installed = false

export default <Plugin>{
  install(app) {
    if (!installed) {
      installed = true
      Object.keys(widgets).forEach((key) => {
        const componentName = key.match(/.\/(\w+).vue/)?.[1]
        if (componentName) {
          app.component(
            'widget' + componentName,
            defineAsyncComponent(widgets[key] as () => Promise<Component>)
          )
        }
      })
    }
  }
}
