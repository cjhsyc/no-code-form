import type { FormProps } from '@/types'
export default <FormProps>{
  labelPosition: {
    label: '表单项标签的位置',
    setter: 'setter-radio-button',
    value: 'right',
    attrs: {
      options: [
        {
          value: 'left',
          name: '左对齐'
        },
        {
          value: 'right',
          name: '右对齐'
        },
        {
          value: 'top',
          name: '顶部对齐'
        }
      ]
    }
  },
  labelWidth: {
    setter: 'setter-input-with-unit',
    label: '标签宽度',
    value: 100,
    attrs: {
      unit: 'px',
      min: 0,
      max: 1000
    },
    tips: '标签为顶部对齐时不生效',
    unbind: true
  },
  size: {
    label: '组件的尺寸',
    setter: 'setter-radio-button',
    value: 'default',
    attrs: {
      options: [
        {
          value: 'large',
          name: '较大'
        },
        {
          value: 'default',
          name: '默认'
        },
        {
          value: 'small',
          name: '较小'
        }
      ]
    }
  },
  hideRequiredAsterisk: {
    label: '是否隐藏必填字段的星号',
    setter: 'el-switch'
  },
  requireAsteriskPosition: {
    label: '必填星号的位置',
    setter: 'setter-radio-button',
    value: 'left',
    attrs: {
      options: [
        {
          value: 'left',
          name: '标签左侧'
        },
        {
          value: 'right',
          name: '标签右侧'
        }
      ]
    }
  },
  scrollToError: {
    label: '校验失败时，滚动到第一个错误表单项',
    setter: 'el-switch'
  },
  disabled: {
    label: '是否禁用所有组件',
    setter: 'el-switch'
  }
}
