import type { Metadata } from '@/types'
/**
 * 评分组件元数据
 */
export default <Metadata>{
  name: '评分',
  component: 'el-rate',
  category: 'input',
  props: {
    modelValue: {
      label: '默认值',
      value: 0,
      setter: 'el-input',
      attrs: {
        readonly: true
      },
      tips: '只读，在画布中设置组件的默认值'
    },
    max: {
      value: 5,
      label: '最大分值',
      setter: 'el-input-number',
      attrs: {
        min: 1,
        stepStrictly: true
      }
    },
    disabled: {
      label: '是否禁用',
      setter: 'el-switch',
      value: false
    },
    allowHalf: {
      label: '是否允许半选',
      setter: 'el-switch',
      value: false
    },
    showScore: {
      label: '是否显示当前分数',
      setter: 'el-switch',
      value: false
    },
    clearable:{
      label: '是否可以重置值为0',
      setter: 'el-switch',
      value: false,
      tips: '当你再次点击相同的值时，可以将值重置为0'
    },
    scoreTemplate: {
      setter: 'none',
      value: '{value} 分'
    }
  }
}
