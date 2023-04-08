import type { Metadata } from '@/types'
/**
 * 开关组件元数据
 */
export default <Metadata>{
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
    },
    width: {
      label: '宽度',
      setter: 'setter-input-with-unit',
      attrs: {
        unit: 'px',
        min: 0
      },
      tips: '为0则表示自适应宽度'
    },
    activeText: {
      label: '开启状态的文字描述',
      setter: 'el-input'
    },
    inactiveText: {
      label: '关闭状态的文字描述',
      setter: 'el-input'
    },
    activeIcon: {
      label: '开启状态的图标',
      setter: 'setter-select-icon',
      tips: '会覆盖开启状态的文字描述'
    },
    inactiveIcon: {
      label: '关闭状态的图标',
      setter: 'setter-select-icon',
      tips: '会覆盖关闭状态的文字描述'
    },
    inlinePrompt: {
      setter: 'el-switch',
      label: '图标或文本是否显示在点内',
      tips: '只会呈现文本的第一个字符'
    },
    disabled: {
      label: '是否禁用',
      setter: 'el-switch'
    }
  }
}
