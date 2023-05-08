import { uuid } from '@/utils'
import type { Metadata } from '@/types'

/**
 * 多选框组件元数据
 */
export default <Metadata>{
  name: '多选框',
  component: 'widget-checkbox',
  category: 'input',
  props: {
    modelValue: {
      label: '默认值',
      setter: 'el-input',
      attrs: {
        readonly: true
      },
      tips: '只读，在画布中设置该组件的默认值'
    },
    options: {
      label: '选项',
      setter: 'setter-options',
      value: [
        {
          label: '选项一',
          value: 'option1',
          id: uuid()
        },
        {
          label: '选项二',
          value: 'option2',
          id: uuid()
        }
      ],
      tips: '选项值为空的选项会被忽略'
    },
    linkage: {
      setter: 'setter-linkage',
      label: '选项联动',
      value: null,
      unbind: true
    },
    disabled: {
      label: '是否禁用',
      setter: 'el-switch',
      value: false
    },
    vertical: {
      label: '选项是否垂直显示',
      setter: 'el-switch',
      tips: '选项类型为默认时生效'
    },
    type: {
      value: 'default',
      label: '选项的样式类型',
      setter: 'setter-radio-button',
      attrs: {
        options: [
          {
            value: 'default',
            name: '默认'
          },
          {
            value: 'button',
            name: '按钮'
          }
        ]
      }
    },
    textColor: {
      label: '选中状态时的字体颜色',
      setter: 'el-color-picker',
      attrs: {
        showAlpha: true
      },
      tips: '选项类型为按钮时生效'
    },
    fill: {
      label: '选中状态时的边框和背景颜色',
      setter: 'el-color-picker',
      attrs: {
        showAlpha: true
      },
      tips: '选项类型为按钮时生效'
    },
    min: {
      label: '可选的最小数量',
      setter: 'el-input-number',
      attrs: {
        min: 0,
        stepStrictly: true
      }
    },
    max: {
      label: '可选的最大数量',
      setter: 'el-input-number',
      attrs: {
        min: 0,
        stepStrictly: true
      }
    }
  }
}
