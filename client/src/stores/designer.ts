import { computed, ref } from 'vue'
import defaultFormProps from '@/data/form-props'
import type { ComponentData, FormProps } from '@/types'
import { deepClone } from '@/utils'

export const useDesignerStore = defineStore('designerStore', () => {
  /* state */

  // 画布表单中的组件列表
  const componentList = ref<ComponentData[]>([])
  // 表单属性
  const formProps = ref<FormProps>(defaultFormProps)
  // 表单宽度
  const width = ref<'auto' | number>('auto')
  // 发布状态
  const publish = ref(false)

  // 初始组件列表
  const initialComponentList = ref<ComponentData[]>([])
  // 初始表单属性
  const initialFormProps = ref<FormProps>(defaultFormProps)
  // 初始表单宽度
  const initialWidth = ref<'auto' | number>('auto')

  // 当前选中的组件
  const currentComponent = ref<ComponentData | null>(null)
  // 属性配置面板显示的tab页
  const propPanelTab = ref<'component' | 'form'>('form')

  /* getter */

  // 表单标题
  const formName = computed(() => getFormName(componentList.value))

  // 表单渲染数据
  const renderData = computed(() => ({
    componentList: componentList.value,
    formProps: formProps.value,
    width: width.value
  }))

  /* action */

  /**
   * 清空画布
   */
  const clearCanvas = () => {
    componentList.value = []
    currentComponent.value = null
  }

  /**
   * 根据表单中的标题获取表单名称
   */
  const getFormName = (componentList: ComponentData[]) => {
    return (
      componentList.find((component) => component.component === 'widget-title')?.props.content
        .value || '未命名表单'
    )
  }

  /**
   * 设置当前数据
   */
  const setFormData = (
    newComponentList: ComponentData[],
    newFormProps: FormProps,
    newWidth: 'auto' | number,
    newPublish: boolean
  ) => {
    componentList.value = newComponentList
    formProps.value = newFormProps
    width.value = newWidth
    publish.value = newPublish
    currentComponent.value = null
    propPanelTab.value = 'form'
    setInitial(newComponentList, newFormProps, newWidth)
  }

  /**
   * 重做
   */
  const reset = () => {
    componentList.value = deepClone(initialComponentList.value)
    formProps.value = deepClone(initialFormProps.value)
    width.value = initialWidth.value
    currentComponent.value = null
    propPanelTab.value = 'form'
  }

  /**
   * 设置初始数据
   */
  const setInitial = (
    componentList: ComponentData[],
    formProps: FormProps,
    width: 'auto' | number
  ) => {
    initialComponentList.value = deepClone(componentList)
    initialFormProps.value = deepClone(formProps)
    initialWidth.value = width
  }

  return {
    /* state */
    componentList,
    initialComponentList,
    currentComponent,
    initialFormProps,
    formProps,
    propPanelTab,
    width,
    initialWidth,
    publish,
    /* getter */
    formName,
    renderData,
    /* action */
    clearCanvas,
    getFormName,
    setFormData,
    reset,
    setInitial
  }
})
