/**
 * 选择器选项
 */
export interface SelectOption {
  label?: string
  value: string
  id: string
}

/**
 * 单选按钮可选项
 */
export interface Option {
  /**
   * 值
   */
  value: string
  /**
   * 中文名
   */
  name: string
}
