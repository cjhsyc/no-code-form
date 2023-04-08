<template>
  <el-radio-group v-model="value" v-bind="$attrs">
    <el-radio-button v-for="option in options" :key="option.value" :label="option.value">
      {{ option.name }}
    </el-radio-button>
  </el-radio-group>
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

<style scoped></style>
