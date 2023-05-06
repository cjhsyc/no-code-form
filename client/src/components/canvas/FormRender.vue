<template>
  <div class="render-form">
    <component
      :is="port === 'pc' ? 'el-card' : 'div'"
      :class="[port === 'pc' ? 'form-card' : 'form-div']"
    >
      <el-form
        :model="formModel"
        ref="formRef"
        v-bind="toRealProps(formProps)"
        :label-position="port === 'pc' ? formProps.labelPosition.value : 'top'"
        :rules="rules"
        class="form"
        @submit.prevent
      >
        <el-row :gutter="10">
          <el-col
            v-for="component in componentList"
            :key="component.id"
            class="item-col"
            :span="port === 'pc' ? component.props.span.value : 24"
            v-show="
              showMap[component.id]?.reduce((pre, now) => now || pre) ??
              !component.props.hidden.value
            "
          >
            <form-item
              :prop="component.id"
              :label-width="formProps.labelWidth.value"
              :label="component.props.label.value"
              :show-label="component.props.showLabel.value"
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
import type { ComponentData, FormProps, Linkage, Rule, SelectOption } from '@/types'
import { deepClone, toRealProps } from '@/utils'
import { stringToRegExp } from '@/utils'
import type { FormRules, FormItemRule } from 'element-plus'

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

const formRef = ref()
const formData = ref<Record<string, any>>({})
watch(
  () => props.componentList,
  (componentList) => {
    formData.value = deepClone(componentList).reduce((formData, component) => {
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
const formModel = computed(() => {
  const formModel: Record<string, any> = {}
  for (const key in formData.value) {
    formModel[key] = formData.value[key].value
  }
  return formModel
})

// 显隐联动Map
const showMap = computed(() => {
  const map: Record<string, boolean[]> = {}
  props.componentList.forEach((component) => {
    const linkage: Linkage | null = component.props.linkage?.value
    if (linkage !== null) {
      for (const key in linkage) {
        linkage[key].forEach((id) => {
          const optionValue = component.props.options.value.find(
            (option: SelectOption) => option.id === key
          )?.value
          const show = Array.isArray(formModel.value[component.id])
            ? formModel.value[component.id].indexOf(optionValue) > -1
            : formModel.value[component.id] === optionValue
          map[id] = [...(map[id] || []), show]
        })
      }
    }
  })
  return map
})

const rules = computed<FormRules>(() => {
  return props.componentList.reduce((rules, component) => {
    const ruleData: Rule = component.props.rule?.value
    const ruleItems: FormItemRule[] = []
    if (component.props.required?.value) {
      ruleItems.push({
        required: true,
        message: `请输入${component.props.label?.value}`,
        trigger: 'change'
      })
    }
    if (ruleData) {
      const validatePass = (rule: any, value: any, callback: any) => {
        if (!value || stringToRegExp(ruleData.rule).test(value)) {
          callback()
        } else {
          callback(new Error(ruleData.message || `请输入正确的${ruleData.name}`))
        }
      }
      ruleItems.push({ validator: validatePass, trigger: 'change' })
    }
    if (ruleItems.length) {
      return {
        ...rules,
        [component.id]: ruleItems
      }
    }
    return rules
  }, {})
})

const maxWidth = computed(() => (props.width === 'auto' ? 'unset' : `${props.width}px`))
const bgc = computed(() =>
  props.port === 'pc' ? 'var(--color-background-blue)' : 'var(--color-background)'
)

const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log(formData.value)
    })
    .catch(() => {})
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
