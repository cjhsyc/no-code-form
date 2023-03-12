/**
 * 输入框组件元数据
 */
export default <Metadata>{
  name: '输入框',
  component: 'el-input',
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
    showWordLimit: {
      label: '是否显示统计字数',
      setter: 'el-switch'
    },
    maxlength: {
      label: '最大输入长度',
      setter: 'el-input-number',
      attrs: {
        min: 0
      }
    },
    minlength: {
      label: '最小输入长度',
      setter: 'el-input-number',
      attrs: {
        min: 0
      }
    },
    placeholder: {
      label: '占位文本',
      setter: 'el-input'
    },
    clearable: {
      label: '是否显示清除按钮',
      setter: 'el-switch'
    },
    showPassword: {
      label: '是否显示切换密码图标',
      setter: 'el-switch'
    },
    readonly: {
      label: '是否只读',
      setter: 'el-switch'
    },
    disabled: {
      label: '是否禁用',
      setter: 'el-switch'
    },
    prefixIcon: {
      label: '前缀图标',
      setter: 'setter-select-icon'
    },
    suffixIcon: {
      label: '后缀图标',
      setter: 'setter-select-icon'
    }
  }
}
