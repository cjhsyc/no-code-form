import type { RuleData } from './rule'

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

/**
 * 对齐方式
 */
export type Align = 'left' | 'center' | 'right'

/**
 * 规则信息
 */
export type Rule = Pick<RuleData, 'name' | 'rule' | 'message'>

/**
 * 联动信息
 */
export interface Linkage {
  [id: string]: string[]
}