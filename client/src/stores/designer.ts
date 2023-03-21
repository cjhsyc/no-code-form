import { deepClone } from '@/utils'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDesignerStore = defineStore('designerStore', () => {
  /* state */

  // 画布表单中的组件列表
  const componentList = ref<ComponentData[]>([])
  // 初始组件列表
  const initialComponentList = ref<ComponentData[]>([])
  // 当前选中的组件
  const currentComponent = ref<ComponentData | null>(null)
  // 表单属性配置
  const formProps = ref<FormProps>({
    labelPosition: 'right',
    size: 'default',
    requireAsteriskPosition: 'left'
  })
  // 历史记录
  const history = ref<ComponentData[][]>([[]])
  // 历史记录指针
  const historyIndex = ref<number>(0)
  // 属性配置面板显示的tab页
  const propPanelTab = ref<'component' | 'form'>('component')
  // 表单宽度
  const width = ref('auto')

  /* getter */

  // 是否为最新的记录
  const latestHistory = computed(() => historyIndex.value === history.value.length - 1)
  // 是否为最老的记录
  const oldestHistory = computed(() => historyIndex.value === 0)

  /* action */

  /**
   * 添加历史记录
   */
  const pushHistory = () => {
    history.value.length = ++historyIndex.value
    history.value.push(deepClone(componentList.value))
    console.log('pushHistory')
  }
  /**
   * 切换至上一级历史记录
   */
  const lastHistory = () => {
    if (historyIndex.value > 0) {
      componentList.value = history.value[--historyIndex.value]
      if (!componentList.value.some((component) => component.id === currentComponent.value?.id)) {
        currentComponent.value = null
      }
    }
  }
  /**
   * 切换至下一级历史记录
   */
  const nextHistory = () => {
    if (historyIndex.value < history.value.length - 1) {
      componentList.value = history.value[++historyIndex.value]
      if (!componentList.value.some((component) => component.id === currentComponent.value?.id)) {
        currentComponent.value = null
      }
    }
  }
  /**
   * 清空历史记录
   */
  const clearHistory = () => {
    history.value = [[]]
    historyIndex.value = 0
  }

  return {
    /* state */
    componentList,
    initialComponentList,
    currentComponent,
    formProps,
    propPanelTab,
    width,
    /* getter */
    latestHistory,
    oldestHistory,
    /* action */
    pushHistory,
    lastHistory,
    nextHistory,
    clearHistory
  }
})
