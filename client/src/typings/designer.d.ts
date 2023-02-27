/**
 * 组件元数据
 */
declare interface Metadata {
  component: string
  name: string
  props: Record<string, PropConfig>
}

/**
 * 组件属性配置
 */
declare interface PropConfig<T> {
  type: string
  value: T
}

/**
 * 组件数据
 */
declare interface ComponentData extends Metadata {
  id: string
}
