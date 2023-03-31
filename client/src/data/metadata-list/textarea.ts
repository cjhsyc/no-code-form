/**
 * 文本域组件元数据
 */
export default <Metadata>{
  name: '文本域',
  component: 'widget-textarea',
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
      setter: 'el-input-number'
    },
    minlength: {
      label: '最小输入长度',
      setter: 'el-input-number'
    },
    placeholder: {
      label: '占位文本',
      setter: 'el-input',
      attrs: {
        clearable: true
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
    rows: {
      value: 4,
      label: '输入框行数',
      setter: 'el-input-number',
      attrs: {
        min: 1,
        stepStrictly: true
      }
    },
    autosize: {
      label: '文本域高度是否自适应',
      setter: 'el-switch'
    },
    resize: {
      label: '是否能被用户缩放',
      setter: 'el-switch'
    }
  }
}
