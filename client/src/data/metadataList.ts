/**
 * 素材组件元数据列表
 */
export const metadataList: Metadata[] = [
  {
    name: '输入框',
    component: 'el-input',
    category: 'form',
    props: {
      modelValue: {
        value: ''
      }
    }
  },
  {
    name: '数字输入框',
    component: 'el-input-number',
    category: 'form',
    props: {
      modelValue: {
        value: 0
      }
    }
  },
  {
    name: '选择器',
    component: 'widget-select',
    category: 'form',
    props: {
      modelValue: {
        value: ''
      },
      options: {
        value: []
      }
    }
  },
  {
    name: '颜色选择器',
    component: 'el-color-picker',
    category: 'form',
    props: {
      modelValue: {
        value: ''
      }
    }
  },
  {
    name: '评分',
    component: 'el-rate',
    category: 'form',
    props: {
      modelValue: {
        value: 0
      }
    }
  },
  {
    name: '滑块',
    component: 'el-slider',
    category: 'form',
    props: {
      modelValue: {
        value: 0
      }
    }
  },
  {
    name: '开关',
    component: 'el-switch',
    category: 'form',
    props: {
      modelValue: {
        value: false
      }
    }
  },
  {
    name: '时间输入框',
    component: 'el-time-picker',
    category: 'form',
    props: {
      modelValue: {
        value: ''
      }
    }
  },
  {
    name: '时间选择器',
    component: 'el-time-select',
    category: 'form',
    props: {
      modelValue: {
        value: ''
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
