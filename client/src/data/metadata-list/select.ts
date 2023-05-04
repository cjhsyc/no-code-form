import { uuid } from '@/utils'
import type { Metadata } from '@/types'

/**
 * 下拉框组件元数据
 */
export default <Metadata>{
  name: '下拉框',
  component: 'widget-select',
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
    disabled: {
      label: '是否禁用',
      setter: 'el-switch',
      value: false
    },
    clearable: {
      label: '是否可以清空选项',
      setter: 'el-switch',
      value: false
    },
    filterable: {
      label: '是否可搜索',
      setter: 'el-switch',
      value: false
    },
    multiple: {
      label: '是否多选',
      setter: 'el-switch',
      value: false
    },
    collapseTags: {
      label: '多选时是否展示为折叠标签',
      setter: 'el-switch',
      value: false
    },
    collapseTagsTooltip: {
      label: '当鼠标悬停于折叠标签时，是否显示所有选中的标签',
      setter: 'el-switch',
      value: false
    },
    multipleLimit: {
      label: '最多可以选择的选项数',
      setter: 'el-input-number',
      value: 0,
      attrs: {
        min: 0
      },
      tips: '为0则表示不限制'
    },
    placeholder: {
      label: '占位文本',
      setter: 'el-input',
      value: '请选择',
      attrs: {
        clearable: true
      }
    },
    allowCreate: {
      label: '是否允许用户创建新选项',
      setter: 'el-switch',
      value: false,
      tips: '只有在设置为可搜索时生效'
    }
  }
}
