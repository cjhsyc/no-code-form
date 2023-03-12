import SetterRadioButtonVue from './SetterRadioButton.vue'
import SetterSelectIcon from './SetterSelectIcon.vue'

import type { Plugin } from 'vue'

let installed = false

export default <Plugin>{
  install(app) {
    if (!installed) {
      installed = true
      app.component('setter-radio-button', SetterRadioButtonVue)
      app.component('setter-select-icon', SetterSelectIcon)
    }
  }
}
