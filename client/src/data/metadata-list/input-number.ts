import type { Metadata } from '@/types'
/**
 * 计数器组件元数据
 */
export default <Metadata>{
  name: '数字输入框',
  component: 'el-input-number',
  category: 'input',
  props: {
    modelValue: {
      value: 0,
      label: '默认值',
      setter: 'el-input',
      attrs: {
        readonly: true
      },
      tips: '只读，在画布中设置组件的默认值'
    },
    min: {
      label: '允许的最小值',
      setter: 'el-input-number',
      tips: '不填则默认为负无穷大'
    },
    max: {
      label: '允许的最大值',
      setter: 'el-input-number',
      tips: '不填则默认为无穷大'
    },
    step: {
      value: 1,
      label: '计数器步长',
      setter: 'el-input-number'
    },
    stepStrictly: {
      label: '是否只能输入步长的倍数',
      setter: 'el-switch'
    },
    precision: {
      value: 0,
      label: '保留小数点位数',
      setter: 'el-input-number',
      attrs: {
        min: 0
      }
    },
    readonly: {
      label: '是否只读',
      setter: 'el-switch'
    },
    disabled: {
      label: '是否禁用',
      setter: 'el-switch'
    },
    controls: {
      value: true,
      label: '是否使用控制按钮',
      setter: 'el-switch'
    },
    controlsPosition: {
      label: '控制按钮的位置',
      setter: 'setter-radio-button',
      attrs: {
        options: [
          {
            value: '',
            name: '默认'
          },
          {
            value: 'right',
            name: '右侧'
          }
        ]
      }
    },
    placeholder: {
      label: '占位文本',
      setter: 'el-input',
      attrs: {
        clearable: true
      }
    }
  }
}
