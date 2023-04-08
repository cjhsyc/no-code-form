<template>
  <el-select v-model="selectedValue" v-bind="{ ...$attrs, multiple }">
    <el-option
      v-for="option in noEmptyOptions"
      :key="option.id"
      :label="option.label"
      :value="option.value"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
import type { SelectOption } from '@/types'
const props = defineProps({
  options: {
    type: Array as PropType<SelectOption[]>,
    default: new Array()
  },
  multiple: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})
// 过滤value值为空的选项
const noEmptyOptions = computed(() => props.options?.filter((item) => item.value))

// 当是否多选属性修改时，需要转换modelValue的类型
watch(
  () => props.multiple,
  (newValue) => {
    if (newValue) {
      // 转成数组
      emit('update:modelValue', props.modelValue ? [props.modelValue] : [])
    } else {
      // 保留多选的第一个选项
      emit('update:modelValue', Array.isArray(props.modelValue) ? props.modelValue[0] || '' : '')
    }
  }
)

// 当删除了选项时,过滤modelValue中已经被删除的值
watch(
  () => noEmptyOptions.value?.length,
  () => {
    if (Array.isArray(props.modelValue)) {
      emit(
        'update:modelValue',
        props.modelValue.filter((item) =>
          noEmptyOptions.value?.find((option) => option.value === item)
        )
      )
    } else {
      emit(
        'update:modelValue',
        noEmptyOptions.value?.find((option) => option.value === props.modelValue)
          ? props.modelValue
          : ''
      )
    }
  }
)
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>
