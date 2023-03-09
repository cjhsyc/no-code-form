import { deepClone } from '@/utils'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDesignerStore = defineStore('designerStore', () => {
  // 画布表单中的组件列表
  const componentList = ref<ComponentData[]>([])
  // 初始组件列表
  const initialComponentList = ref<ComponentData[]>([])
  // 当前选中的组件
  const currentComponent = ref<CurrComponent>(null)
  // 表单属性配置
  const formProps = ref<FormProps>({})
  // 历史记录
  const history = ref<ComponentData[][]>([[]])
  // 历史记录指针
  const historyIndex = ref<number>(0)

  // 是否为最新的记录
  const latestHistory = computed(() => historyIndex.value === history.value.length - 1)
  // 是否为最老的记录
  const oldestHistory = computed(() => historyIndex.value === 0)

  /**
   * 添加历史记录
   */
  const pushHistory = () => {
    historyIndex.value++
    history.value.splice(historyIndex.value, 0, deepClone(componentList.value))
    history.value.length = historyIndex.value + 1
  }
  /**
   * 切换至上一级历史记录
   */
  const lastHistory = () => {
    if (historyIndex.value > 0) {
      componentList.value = history.value[--historyIndex.value]
    }
  }
  /**
   * 切换至下一级历史记录
   */
  const nextHistory = () => {
    if (historyIndex.value < history.value.length - 1) {
      componentList.value = history.value[++historyIndex.value]
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
