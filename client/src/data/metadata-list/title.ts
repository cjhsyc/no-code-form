import type { Metadata } from '@/types'
/**
 * 标题组件元数据
 */
export default <Metadata>{
  name: '标题',
  component: 'widget-title',
  category: 'basic',
  only: true,
  props: {
    content: {
      setter: 'el-input',
      label: '标题',
      value: '',
      attrs: {
        clearable: true
      }
    },
    level: {
      setter: 'setter-select',
      label: '级别',
      value: 'h1',
      attrs: {
        options: [
          {
            value: 'h1',
            name: '一级标题'
          },
          {
            value: 'h2',
            name: '二级标题'
          },
          {
            value: 'h3',
            name: '三级标题'
          }
        ]
      }
    },
    align: {
      setter: 'setter-radio-button',
      label: '对齐方式',
      value: 'center',
      attrs: {
        options: [
          {
            value: 'left',
            name: '左对齐'
          },
          {
            value: 'center',
            name: '居中对齐'
          },
          {
            value: 'right',
            name: '右对齐'
          }
        ]
      }
    }
  }
}
