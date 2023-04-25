import type { Metadata } from '@/types'
/**
 * 提交按钮组件元数据
 */
export default <Metadata>{
  name: '提交按钮',
  component: 'widget-submit-button',
  category: 'basic',
  only: true,
  props: {
    content: {
      label: '按钮文字',
      setter: 'el-input',
      value: '提交'
    },
    width: {
      label: '宽度',
      setter: 'setter-input-with-unit',
      value: 120,
      attrs: {
        unit: 'px'
      }
    },
    size: {
      setter: 'setter-select',
      label: '按钮尺寸',
      attrs: {
        options: [
          {
            value: '',
            name: '继承'
          },
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
    type: {
      setter: 'setter-select',
      label: '按钮样式',
      value: 'primary',
      attrs: {
        options: [
          {
            value: '',
            name: '纯洁白'
          },
          {
            value: 'primary',
            name: '清新蓝'
          },
          {
            value: 'success',
            name: '成功绿'
          },
          {
            value: 'warning',
            name: '警告黄'
          },
          {
            value: 'danger',
            name: '危险红'
          },
          {
            value: 'info',
            name: '平静灰'
          }
        ]
      }
    },
    plain: {
      setter: 'el-switch',
      label: '是否为朴素按钮'
    },
    text: {
      setter: 'el-switch',
      label: '是否为文字按钮'
    },
    bg: {
      setter: 'el-switch',
      label: '是否显示文字按钮背景颜色'
    },
    link: {
      setter: 'el-switch',
      label: '是否为链接按钮'
    },
    round: {
      setter: 'el-switch',
      label: '是否为圆角按钮'
    },
    autoInsertSpace: {
      setter: 'el-switch',
      label: '是否在两个中文字符之间插入空格'
    },
    disabled: {
      label: '是否禁用',
      setter: 'el-switch',
      value: false
    }
  }
}
