import input from './input'
import textarea from './textarea'
import inputNumber from './inputNumber'
import select from './select'
import checkbox from './checkbox'
import colorPicker from './colorPicker'
import rate from './rate'

/**
 * 素材组件元数据列表
 */
export const metadataList: Metadata[] = [
  input,
  textarea,
  inputNumber,
  select,
  checkbox,
  colorPicker,
  rate,
  {
    name: '滑块',
    component: 'el-slider',
    category: 'form',
    props: {
      modelValue: {
        label: '默认值',
        value: 0,
        setter: 'el-input',
        attrs: {
          readonly: true
        },
        tips: '只读，在画布中设置组件的默认值'
      }
    }
  },
  {
    name: '开关',
    component: 'el-switch',
    category: 'form',
    props: {
      modelValue: {
        label: '默认值',
        value: false,
        setter: 'el-input',
        attrs: {
          readonly: true
        },
        tips: '只读，在画布中设置组件的默认值'
      }
    }
  },
  {
    name: '时间输入框',
    component: 'el-time-picker',
    category: 'form',
    props: {
      modelValue: {
        label: '默认值',
        value: '',
        setter: 'el-input',
        attrs: {
          readonly: true
        },
        tips: '只读，在画布中设置组件的默认值'
      }
    }
  },
  {
    name: '时间选择器',
    component: 'el-time-select',
    category: 'form',
    props: {
      modelValue: {
        label: '默认值',
        value: '',
        setter: 'el-input',
        attrs: {
          readonly: true
        },
        tips: '只读，在画布中设置组件的默认值'
      }
    }
  },
  {
    name: '按钮',
    component: 'widget-button',
    category: 'basic',
    props: {}
  }
]
