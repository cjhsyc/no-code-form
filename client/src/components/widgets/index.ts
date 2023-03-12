import WidgetSelect from './Select.vue'
import WidgetButton from './Button.vue'
import WidgetTextarea from './Textarea.vue'

import type { Plugin } from 'vue'

let installed = false

export default <Plugin>{
  install(app) {
    if (!installed) {
      installed = true
      app.component('widget-select', WidgetSelect)
      app.component('widget-button', WidgetButton)
      app.component('widget-textarea', WidgetTextarea)
    }
  }
}
