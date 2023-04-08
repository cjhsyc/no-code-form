<template>
  <el-checkbox-group
    v-model="selectedValue"
    v-bind="$attrs"
    :class="{ vertical: vertical && type === 'default' }"
  >
    <template v-if="type === 'default'">
      <el-checkbox v-for="option in noEmptyOptions" :key="option.id" :label="option.value">
        {{ option.label || option.value }}
      </el-checkbox>
    </template>
    <template v-if="type === 'button'">
      <el-checkbox-button v-for="option in noEmptyOptions" :key="option.id" :label="option.value">
        {{ option.label || option.value }}
      </el-checkbox-button>
    </template>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import type { SelectOption } from '@/types'
const props = defineProps({
  options: {
    type: Array as PropType<SelectOption[]>,
    default: new Array()
  },
  modelValue: {
    type: Array as PropType<string[]>,
    default: new Array()
  },
  type: {
    type: String as PropType<'default' | 'button'>,
    default: 'default'
  },
  vertical: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedValue = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emit('update:modelValue', newValue)
  }
})

// 过滤value值为空的选项
const noEmptyOptions = computed(() => props.options?.filter((item) => item.value))

// 当删除了选项时,过滤modelValue中已经被删除的值
watch(
  () => noEmptyOptions.value?.length,
  () => {
    emit(
      'update:modelValue',
      props.modelValue.filter((item) =>
        noEmptyOptions.value?.find((option) => option.value === item)
      )
    )
  }
)
</script>

<style scoped lang="scss">
.el-checkbox-group.vertical {
  display: flex;
  flex-direction: column;
}
</style>
