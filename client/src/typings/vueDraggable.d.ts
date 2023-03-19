/**
 * vueDraggable组件change事件的参数
 */
declare interface ChangeEvent {
  moved?: { element: SelectOption; newIndex: number; oldIndex: number }
}
