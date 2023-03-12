import WidgetSelect from './WidgetSelect.vue'
import WidgetButton from './WidgetButton.vue'
import WidgetTextarea from './WidgetTextarea.vue'

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
