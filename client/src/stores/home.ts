import { useStorage } from '@vueuse/core'
import type { DictInfo, RuleData, SubmitForm } from '@/types'

export const useHomeStore = defineStore('homeStore', () => {
  const search = ref('')
  const activeMenu = useStorage('activeMenu', 'form', sessionStorage)
  const dictList = ref<DictInfo[]>([])
  const ruleList = ref<RuleData[]>([])
  const submitFormList = ref<SubmitForm[]>([])
  const formInputItemList = ref<
    { label: string; prop: string; formatter: (row: Record<string, any>) => string }[]
  >([])

  const searchPlaceholder = computed(() => {
    if (activeMenu.value === 'form') {
      return '搜索表单名称'
    } else if (activeMenu.value === 'dict') {
      return '搜索字典名称'
    } else if (activeMenu.value === 'rule') {
      return '搜索规则名称'
    } else if (activeMenu.value === 'template') {
      return '搜索模板名称'
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
    submitFormList,
    formInputItemList,
    // 计算属性
    searchPlaceholder
  }
})
