import { uuid } from '@/utils'
import type { Metadata } from '@/types'

/**
 * 单选框组件元数据
 */
export default <Metadata>{
  name: '单选框',
  component: 'widget-radio',
  category: 'input',
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
    buttonType: {
      setter: 'el-switch',
      label: '是否为按钮样式'
    },
    disabled: {
      label: '是否禁用',
      setter: 'el-switch'
    }
  }
}
