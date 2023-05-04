import type { Metadata } from '@/types'
/**
 * 颜色选择器组件元数据
 */
export default <Metadata>{
  name: '颜色选择器',
  component: 'el-color-picker',
  category: 'input',
  props: {
    modelValue: {
      label: '默认值',
      value: '',
      setter: 'el-input',
      attrs: {
        readonly: true
      },
      tips: '只读，在画布中设置该组件的默认值'
    },
    disabled: {
      label: '是否禁用',
      setter: 'el-switch',
      value: false
    },
    showAlpha: {
      setter: 'none',
      value: true
    }
  }
}
