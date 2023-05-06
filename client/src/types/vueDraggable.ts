import type { SelectOption } from './materials'

/**
 * vueDraggable组件change事件的参数
 */
export interface ChangeEvent {
  moved?: { element: SelectOption; newIndex: number; oldIndex: number }
}
