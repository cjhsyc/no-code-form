<template>
  <div class="data-picker">
    <el-date-picker
      v-bind="{ ...$attrs, type, modelValue }"
      @update:modelValue="emit('update:modelValue', $event)"
      :value-format="type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'"
    ></el-date-picker>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String
  },
  type: {
    type: String,
    default: 'date'
  }
})
const emit = defineEmits(['update:modelValue'])

watch(
  () => props.type,
  (type) => {
    if (type === 'date') {
      emit('update:modelValue', (props.modelValue || '').split(' ')[0])
    } else if (type === 'datetime') {
      emit('update:modelValue', props.modelValue ? props.modelValue + ' 00:00:00' : '')
    }
  }
)
</script>

<style scoped lang="scss">
.data-picker {
  width: 100%;
  :deep(.el-date-editor) {
    width: 100%;
    .el-input__wrapper {
      width: 100%;
    }
  }
}
</style>
