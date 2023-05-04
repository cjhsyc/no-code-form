import type { Metadata } from '@/types'
/**
 * 单选框组件元数据
 */
export default <Metadata>{
  name: '日期选择器',
  component: 'widget-date-picker',
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
    type: {
      label: '选择类型',
      setter: 'setter-radio-button',
      value: 'date',
      attrs: {
        options: [
          {
            value: 'date',
            name: '日期'
          },
          {
            value: 'datetime',
            name: '日期时间'
          }
        ]
      }
    },
    clearable: {
      label: '是否显示清除按钮',
      setter: 'el-switch',
      value: true
    },
    editable: {
      label: '文本框是否可输入',
      setter: 'el-switch',
      value: true
    },
    readonly: {
      label: '是否只读',
      setter: 'el-switch'
    },
    placeholder: {
      label: '占位文本',
      setter: 'el-input',
      attrs: {
        clearable: true
      }
    },
    disabled: {
      label: '是否禁用',
      setter: 'el-switch'
    }
  }
}
