import type { Metadata, PropConfig } from '@/types'
import { deepClone } from '@/utils'
export const getFormItemProps = (metadata: Metadata): Record<string, PropConfig<any>> => {
  return {
    label: {
      setter: 'el-input',
      label: '标签',
      value: metadata.name,
      attrs: {
        type: 'textarea',
        autosize: true,
        resize: 'none'
      },
      unbind: true
    },
    showLabel: {
      setter: 'el-switch',
      label: '是否显示标签',
      value: metadata.category === 'input',
      unbind: true
    },
    required: {
      setter: metadata.category === 'input' ? 'el-switch' : 'none',
      label: '是否必填',
      unbind: true
    },
    span: {
      setter: 'setter-col-span',
      label: '栅格宽度',
      value: 24,
      unbind: true
    },
    ...deepClone(metadata.props),
    hidden: {
      setter: 'el-switch',
      label: '是否隐藏',
      tips: '仅在预览或发布后生效',
      unbind: true
    }
  }
}
