<template>
  <div class="render-form">
    <component
      :is="port === 'pc' ? 'el-card' : 'div'"
      :class="[port === 'pc' ? 'form-card' : 'form-div']"
    >
      <el-form
        :model="formData"
        ref="formRef"
        v-bind="toRealProps(formProps)"
        :label-position="port === 'pc' ? formProps.labelPosition.value : 'top'"
        class="form"
        @submit.prevent
      >
        <el-row :gutter="10">
          <el-col
            v-for="component in componentList"
            :key="component.id"
            class="item-col"
            :span="port === 'pc' ? component.props.span.value : 24"
            v-show="!component.props.hidden.value"
          >
            <form-item
              :prop="component.id"
              :label-width="formProps.labelWidth.value"
              :label="component.props.label.value"
              :show-label="component.props.showLabel.value"
              :required="component.props.required.value"
              class="form-item"
            >
              <component
                :is="component.component"
                v-bind="{
                  ...toRealProps(component.props),
                  modelValue: formData[component.id]?.value,
                  'onUpdate:modelValue': (newValue:any) => {formData[component.id].value = newValue},
                  onSubmit: component.component === 'widget-submit-button' ? onSubmit : undefined
                }"
              ></component>
            </form-item>
          </el-col>
        </el-row>
      </el-form>
    </component>
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
    type: [String, Number],
    default: 'auto'
  },
  port: {
    type: String as PropType<'pc' | 'mobile'>,
    default: 'pc'
  },
  containerWidth: {
    type: String,
    default: 'auto'
  }
})

const formData = ref<Record<string, any>>({})
const formRef = ref()

const maxWidth = computed(() => (props.width === 'auto' ? 'unset' : `${props.width}px`))
const bgc = computed(() =>
  props.port === 'pc' ? 'var(--color-background-blue)' : 'var(--color-background)'
)

watch(
  () => props.componentList,
  (componentList) => {
    formData.value = componentList.reduce((formData, component) => {
      if (component.props.modelValue) {
        return Object.assign(formData, {
          [component.id]: {
            name: component.props.label?.value,
            value: component.props.modelValue.value
          }
        })
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
  padding: 10px;
  background-color: v-bind(bgc);
  width: v-bind(containerWidth);
  .form-card {
    width: 100%;
    max-width: v-bind(maxWidth);
    :deep(.el-card__body) {
      padding: 6px;
      .el-form {
        padding: 12px;
      }
    }
  }
  .form-div {
    width: 100%;
    .el-form {
      padding: 8px;
    }
  }
}
</style>
