import type { Metadata } from '@/types'

/**
 * 时间输入框组件元数据
 */
export default <Metadata>{
  name: '时间输入框',
  component: 'widget-time-picker',
  category: 'form',
  props: {
    modelValue: {
      label: '默认值',
      setter: 'el-input',
      attrs: {
        readonly: true
      },
      tips: '只读，在画布中设置组件的默认值'
    },
    readonly: {
      label: '是否只读',
      setter: 'el-switch'
    },
    editable: {
      label: '是否可键盘输入',
      setter: 'el-switch',
      value: true
    },
    clearable: {
      label: '是否显示清除按钮',
      setter: 'el-switch',
      value: true
    },
    disabled: {
      label: '是否禁用',
      setter: 'el-switch'
    },
    placeholder: {
      label: '占位文本',
      setter: 'el-input',
      attrs: {
        clearable: true
      }
    },
    arrowControl: {
      label: '是否使用箭头进行时间选择',
      setter: 'el-switch'
    },
    isRange: {
      label: '是否为时间范围选择',
      setter: 'el-switch'
    },
    rangeSeparator: {
      label: '选择范围时的分隔符',
      setter: 'el-input',
      value: '-',
      attrs: {
        clearable: true
      }
    },
    startPlaceholder: {
      label: '范围选择时开始日期的占位内容',
      setter: 'el-input',
      attrs: {
        clearable: true
      }
    },
    endPlaceholder: {
      label: '范围选择时结束日期的占位内容',
      setter: 'el-input',
      attrs: {
        clearable: true
      }
    }
  }
}
