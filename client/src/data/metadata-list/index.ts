import input from './input'
import textarea from './textarea'
import inputNumber from './input-number'

/**
 * 素材组件元数据列表
 */
export const metadataList: Metadata[] = [
  input,
  textarea,
  inputNumber,
  {
    name: '选择器',
    component: 'widget-select',
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
      },
      options: {
        label: '选项',
        value: [],
        setter: 'el-input'
      }
    }
  },
  {
    name: '颜色选择器',
    component: 'el-color-picker',
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
    name: '评分',
    component: 'el-rate',
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
