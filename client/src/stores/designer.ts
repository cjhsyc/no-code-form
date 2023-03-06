import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDesignerStore = defineStore('designerStore', () => {
  // 画布表单中的组件列表
  const componentList = ref<ComponentData[]>([
    {
      id: 'component',
      component: 'el-button',
      name: 'button',
      props: {},
      category: 'basic',
      formItemProps: {}
    }
  ])
  // 当前选中的组件
  const currComponent = ref<CurrComponent>(null)
  // 表单属性配置
  const formProps = ref<FormProps>({})

  return { componentList, currComponent, formProps }
})
