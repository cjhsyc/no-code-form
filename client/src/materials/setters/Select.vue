<template>
  <el-select v-model="value">
    <el-option
      v-for="option in options"
      :key="option.value"
      :label="option.name"
      :value="option.value"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
import type { Option } from '@/types'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array as PropType<Option[]>,
    default: new Array()
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})
</script>

<style scoped lang="scss">
.el-select {
  width: 100%;
}
</style>
