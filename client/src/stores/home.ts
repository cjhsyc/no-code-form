import { useStorage } from '@vueuse/core'
import type { DictInfo, RuleData } from '@/types'

export const useHomeStore = defineStore('homeStore', () => {
  const search = ref('')
  const activeMenu = useStorage('activeMenu', 'form', sessionStorage)
  const dictList = ref<DictInfo[]>([])
  const ruleList = ref<RuleData[]>([])

  const searchPlaceholder = computed(() => {
    if (activeMenu.value === 'form') {
      return '搜索表单名称'
    } else if (activeMenu.value === 'dict') {
      return '搜索字典名称'
    } else if (activeMenu.value === 'rule') {
      return '搜索规则名称'
    }
    return ''
  })

  watch(activeMenu, () => {
    search.value = ''
  })

  return {
    search,
    activeMenu,
    dictList,
    ruleList,
    // 计算属性
    searchPlaceholder
  }
})
