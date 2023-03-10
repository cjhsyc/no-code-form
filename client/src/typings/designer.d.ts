/**
 * 组件数据
 */
declare interface ComponentData extends Metadata {
  id: string
  /**
   * 栅格占据的列数
   */
  span?: number
  formItemProps?: FormItemProps
}

/**
 * 组件元数据
 */
declare interface Metadata {
  component: string
  name: string
  props: Record<string, PropConfig>
  /**
   * 分类
   */
  category: 'form' | 'basic'
}

/**
 * 组件属性配置
 */
declare interface PropConfig {
  /**
   * 初始值
   */
  value?: any
  label: string
  /**
   * 属性设置器
   */
  setter: string
  /**
   * 设置器属性
   */
  attrs?: Record<string, any>
  required?: boolean
  /**
   * 提示
   */
  tips?: string
}

/**
 * 组件属性可选项
 */
declare interface Option {
  /**
   * 值
   */
  value: string
  /**
   * 中文名
   */
  name: string
}

/**
 * 表单属性
 */
declare interface FormProps {
  /**
   * 表单域标签的位置
   */
  labelPosition: 'left' | 'right' | 'top'
  /**
   * 是否隐藏必填字段标签旁边的红色星号
   */
  hideRequiredAsterisk?: boolean
  /**
   * 星号的位置
   */
  requireAsteriskPosition: 'left' | 'right'
  /**
   * 是否显示校验错误信息
   */
  showMessage?: boolean
  /**
   * 是否以行内形式展示校验信息
   */
  inlineMessage?: boolean
  /**
   * 是否在输入框中显示校验结果反馈图标
   */
  statusIcon?: boolean
  /**
   * 用于控制该表单内组件的尺寸
   */
  size: 'large' | 'default' | 'small'
  /**
   * 是否禁用该表单内的所有组件
   */
  disabled?: boolean
  /**
   * 当校验失败时，滚动到第一个错误表单项
   */
  scrollToError?: boolean
}

/**
 * 表单项属性
 */
declare interface FormItemProps {
  /**
   * 标签文本
   */
  label?: string
  /**
   * 标签宽度
   */
  labelWidth?: number | string
  /**
   * 是否为必填项
   */
  required?: boolean
  /**
   * 表单域验证错误时的提示信息
   */
  error?: string
  /**
   * 是否显示校验错误信息
   */
  showMessage?: boolean
  /**
   * 是否以行内形式展示校验信息
   */
  inlineMessage?: boolean
}
