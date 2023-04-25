/**
 * 组件数据
 */
export interface ComponentData extends Metadata {
  id: string
}

/**
 * 组件元数据
 */
export interface Metadata {
  component: string
  name: string
  props: Record<string, PropConfig<any>>
  /**
   * 分类
   */
  category: 'input' | 'basic'
  /**
   * 是否唯一
   */
  only?: boolean
}

/**
 * 组件属性配置
 */
export interface PropConfig<T> {
  /**
   * 初始值
   */
  value?: T
  label?: string
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
  /**
   * 是否是组件不需要绑定的属性
   */
  unbind?: boolean
}

/**
 * 表单项属性
 */
export interface FormItemProps extends Record<string, PropConfig<any> | undefined> {
  /**
   * 标签文本
   */
  label?: PropConfig<string>
  /**
   * 标签宽度
   */
  labelWidth?: PropConfig<number | string>
  /**
   * 是否为必填项
   */
  required?: PropConfig<boolean>
  /**
   * 是否显示标签
   */
  showLabel?: PropConfig<boolean>
  /**
   * 表单域验证错误时的提示信息
   */
  error?: PropConfig<string>
  /**
   * 是否显示校验错误信息
   */
  showMessage?: PropConfig<boolean>
  /**
   * 是否以行内形式展示校验信息
   */
  inlineMessage?: PropConfig<boolean>
}

/**
 * 表单属性
 */
export interface FormProps extends Record<string, PropConfig<any>> {
  /**
   * 表单域标签的位置
   */
  labelPosition: PropConfig<'left' | 'right' | 'top'>
  /**
   * 标签宽度
   */
  labelWidth: PropConfig<number>
  /**
   * 是否隐藏必填字段标签旁边的红色星号
   */
  hideRequiredAsterisk: PropConfig<boolean>
  /**
   * 星号的位置
   */
  requireAsteriskPosition: PropConfig<'left' | 'right'>
  /**
   * 用于控制该表单内组件的尺寸
   */
  size: PropConfig<'large' | 'default' | 'small'>
  /**
   * 是否禁用该表单内的所有组件
   */
  disabled: PropConfig<boolean>
  /**
   * 当校验失败时，滚动到第一个错误表单项
   */
  scrollToError: PropConfig<boolean>
}
