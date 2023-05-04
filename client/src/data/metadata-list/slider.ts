import type { Metadata } from '@/types'
/**
 * 滑块组件元数据
 */
export default <Metadata>{
  name: '滑块',
  component: 'widget-slider',
  category: 'input',
  props: {
    modelValue: {
      label: '默认值',
      value: 0,
      setter: 'el-input',
      attrs: {
        readonly: true
      },
      tips: '只读，在画布中设置该组件的默认值'
    },
    min: {
      label: '最小值',
      setter: 'el-input-number',
      value: 0
    },
    max: {
      label: '最大值',
      setter: 'el-input-number',
      value: 100
    },
    step: {
      label: '步长',
      setter: 'el-input-number',
      value: 1
    },
    showInput: {
      label: '是否显示输入框',
      setter: 'el-switch'
    },
    showInputControls: {
      label: '是否显示输入框的控制按钮',
      setter: 'el-switch',
      value: true
    },
    showStops: {
      label: '是否显示间断点',
      setter: 'el-switch'
    },
    showTooltip: {
      label: '是否显示提示信息',
      setter: 'el-switch',
      value: true
    },
    range: {
      label: '是否开启选择范围',
      setter: 'el-switch'
    },
    vertical: {
      label: '垂直模式',
      setter: 'el-switch'
    },
    height: {
      label: '垂直模式时的高度',
      setter: 'setter-input-with-unit',
      value: '120px',
      attrs: {
        unit: 'px',
        stringValue: true
      }
    },
    disabled: {
      label: '是否禁用',
      setter: 'el-switch',
      value: false
    }
  }
}
