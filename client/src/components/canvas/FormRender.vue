<template>
  <div class="render-form">
    <el-card class="form-card" :style="style">
      <el-form
        :model="formData"
        ref="formRef"
        v-bind="toRealProps(formProps)"
        class="form"
        @submit.prevent
      >
        <el-row :gutter="10">
          <el-col
            v-for="component in componentList"
            :key="component.id"
            :span="component.span.value || 24"
            class="item-col"
          >
            <form-item
              :prop="component.id"
              v-bind="toRealProps(component.formItemProps)"
              class="form-item"
            >
              <component
                :is="component.component"
                v-bind="{
                  ...toRealProps(component.props),
                  modelValue: formData[component.id],
                  'onUpdate:modelValue': (newValue:any) => {formData[component.id] = newValue},
                  onSubmit: component.component === 'widget-submit-button' ? onSubmit : undefined
                }"
              ></component>
            </form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { ComponentData, FormProps } from '@/types'
import { toRealProps } from '@/utils'

const props = defineProps({
  formProps: {
    type: Object as PropType<FormProps>,
    default: () => ({})
  },
  componentList: {
    type: Array as PropType<ComponentData[]>,
    default: () => []
  },
  width: {
    type: String,
    default: 'auto'
  }
})

const formData = ref<Record<string, any>>({})
const formRef = ref()

const style = computed(() => {
  return {
    maxWidth: props.width === 'auto' ? 'unset' : props.width
  }
})

watch(
  () => props.componentList,
  (componentList) => {
    formData.value = componentList.reduce((formData, component) => {
      if (component.props.modelValue) {
        return Object.assign(formData, { [component.id]: component.props.modelValue.value })
      }
      return formData
    }, {})
  },
  { deep: true, immediate: true }
)

const onSubmit = () => {
  console.log(formData.value)
}
</script>

<style scoped lang="scss">
.render-form {
  display: flex;
  justify-content: center;
  min-height: 100%;
  .form-card {
    width: 100%;
  }
}
</style>
