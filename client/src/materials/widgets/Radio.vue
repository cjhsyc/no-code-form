<template>
  <el-radio-group v-bind="$attrs">
    <component
      :is="buttonType ? 'el-radio-button' : 'el-radio'"
      v-for="option in noEmptyOptions"
      :key="option.id"
      :label="option.value"
    >{{ option.label || option.value }}</component>
  </el-radio-group>
</template>

<script setup lang="ts">
import type { SelectOption } from '@/types'
const props = defineProps({
  options: {
    type: Array as PropType<SelectOption[]>,
    default: new Array()
  },
  buttonType: {
    type: Boolean,
    default: false
  }
})

// 过滤value值为空的选项
const noEmptyOptions = computed(() => props.options?.filter((item) => item.value))
</script>

<style scoped></style>
